import * as fs from "fs/promises";
import * as path from "path";
import * as Handlebars from "handlebars";

interface RouteConfig {
  headers: any[];
  params: any[];
  body: any[];
  validate: any[];
}

interface JsonConfig {
  [key: string]: RouteConfig;
}

// Register Handlebars helpers
Handlebars.registerHelper("eq", function (a: any, b: any) {
  return a === b;
});

export class Generator {
  private templatesPath: string;
  private outputPath: string;

  constructor(templatesPath: string, outputPath: string) {
    this.templatesPath = templatesPath;
    this.outputPath = outputPath;
  }

  async generate(jsonFilePath: string): Promise<void> {
    try {
      // Read JSON configuration
      const jsonContent = await fs.readFile(jsonFilePath, "utf-8");
      const config: JsonConfig = JSON.parse(jsonContent);

      // Extract folder name from JSON path
      const jsonFileName = path.basename(jsonFilePath, ".json");
      const folderPath = path.dirname(jsonFilePath);
      const folderName = path.basename(folderPath);

      // Generate files for this configuration
      await this.generateModule(folderName, config);

      console.log(`Generated module for ${folderName}`);
    } catch (error) {
      console.error("Error generating module:", error);
      throw error;
    }
  }

  private async generateModule(
    moduleName: string,
    config: JsonConfig
  ): Promise<void> {
    // Convert module name to proper naming conventions
    const basePath = `protean/${moduleName}`;
    const pascalCase = this.toPascalCase(moduleName);
    const camelCase = this.toCamelCase(moduleName);

    // Create output directory
    const moduleOutputPath = path.join(this.outputPath, moduleName);
    await fs.mkdir(moduleOutputPath, { recursive: true });

    // Prepare route data
    const routes = Object.keys(config)
      .filter((key) => key !== moduleName) // Skip the module key itself
      .map((method) => ({ method, config: config[method] }));

    // Generate route file
    await this.generateFromTemplate(
      "route.hbs",
      {
        basePath: moduleName,
        routeName: `${camelCase}Router`,
        controllerName: `${pascalCase}Controller`,
        controllerFile: `${moduleName}.controller`,
        routes,
      },
      path.join(moduleOutputPath, `${moduleName}.route.ts`)
    );

    // Generate controller file
    await this.generateFromTemplate(
      "controller.hbs",
      {
        controllerName: `${pascalCase}Controller`,
        serviceName: `${pascalCase}Service`,
        serviceFile: `${moduleName}/Custom${moduleName}.service`,
        routes,
      },
      path.join(moduleOutputPath, `${moduleName}.controller.ts`)
    );

    // Generate service file
    await this.generateFromTemplate(
      "service.hbs",
      {
        serviceName: `${pascalCase}Service`,
        configData: JSON.stringify(config, null, 2),
        routes,
      },
      path.join(moduleOutputPath, `${moduleName}.service.ts`)
    );
    const customModuleOutputPath = path.join(
      this.outputPath,
      `../customs/${moduleName}`
    );
    try {
      await fs.access(customModuleOutputPath);
      console.log("Thư mục đã tồn tại:", customModuleOutputPath);
    } catch {
      console.log("Thư mục chưa tồn tại, tạo mới...");
      await fs.mkdir(customModuleOutputPath, { recursive: true });
      await this.generateFromTemplate(
        "custom.hbs",
        {
          serviceName: `${pascalCase}Service`,
          configData: JSON.stringify(config, null, 2),
          serviceFile: `${moduleName}`,
        },
        path.join(customModuleOutputPath, `Custom${moduleName}.service.ts`)
      );
    }

    // Generate index file
    await this.generateIndexFile(moduleOutputPath, moduleName);
  }

  private async generateFromTemplate(
    templateName: string,
    data: any,
    outputPath: string
  ): Promise<void> {
    const templatePath = path.join(this.templatesPath, templateName);
    const templateContent = await fs.readFile(templatePath, "utf-8");
    const template = Handlebars.compile(templateContent);
    const result = template(data);
    await fs.writeFile(outputPath, result);
  }

  private async generateIndexFile(
    outputPath: string,
    moduleName: string
  ): Promise<void> {
    const camelCase = this.toCamelCase(moduleName);
    const indexContent = `export * from './${moduleName}.route';
export * from './${moduleName}.controller';
export * from './${moduleName}.service';
`;
    await fs.writeFile(path.join(outputPath, "index.ts"), indexContent);
  }

  private toPascalCase(str: string): string {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  }

  private toCamelCase(str: string): string {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Usage: ts-node main.ts <json-file-path>");
    process.exit(1);
  }

  const jsonFilePath = args[0];
  const templatesPath = path.join(__dirname, "templates");
  const outputPath = path.join(__dirname, "../../src/generated");

  const generator = new Generator(templatesPath, outputPath);
  generator
    .generate(jsonFilePath)
    .then(() => console.log("Generation completed successfully"))
    .catch((error) => {
      console.error("Generation failed:", error);
      process.exit(1);
    });
}
