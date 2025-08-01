import * as fs from 'fs/promises';
import * as path from 'path';
import * as Handlebars from 'handlebars';

interface ApiConfig {
  _id: string;
  title: string;
  note?: string;
  cache_time?: string;
  method: string;
  outputEntity: string[];
  queryAdvance: string;
  categories: any[];
  tenant_id: string;
  documents: any[];
  params: Array<{ key: string; value: string }>;
  headers: Array<{ key: string; value: string }>;
  restricted: Array<{ key: string; value: string }>;
  id: string;
  postQueryAdvance?: string;
  preQueryAdvance?: string;
}

// Register Handlebars helpers
Handlebars.registerHelper('eq', function(a: any, b: any) {
  return a === b;
});

Handlebars.registerHelper('pascalCase', function(str: string) {
  return str.replace(/(?:^|[\s-_]+)(.)/g, (_, char) => char.toUpperCase());
});

Handlebars.registerHelper('camelCase', function(str: string) {
  const pascal = str.replace(/(?:^|[\s-_]+)(.)/g, (_, char) => char.toUpperCase());
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
});

Handlebars.registerHelper('constantCase', function(str: string) {
  return str.toUpperCase().replace(/[^\w\s]/g, '').replace(/[\s-_]+/g, '_').replace(/_{2,}/g, '_');
});

Handlebars.registerHelper('kebabCase', function(str: string) {
  return str.toLowerCase().replace(/[^\w\s]/g, '').replace(/[\s-_]+/g, '-').replace(/-{2,}/g, '-');
});

Handlebars.registerHelper('json', function(obj: any) {
  return JSON.stringify(obj, null, 2);
});

Handlebars.registerHelper('cleanPascalCase', function(str: string) {
  return str.replace(/[^\w\s]/g, '').replace(/(?:^|[\s-_]+)(.)/g, (_, char) => char.toUpperCase());
});

export class ResponseGenerator {
  private templatesPath: string;
  private outputPath: string;

  constructor(templatesPath: string, outputPath: string) {
    this.templatesPath = templatesPath;
    this.outputPath = outputPath;
  }

  async generateGlobalConfig(config: ApiConfig): Promise<void> {
    try {
      // Create output directory
      await fs.mkdir(this.outputPath, { recursive: true });

      // Generate global config file using _id as prefix
      const fileName = `${config._id}-${this.toKebabCase(config.title)}`;
      const outputFilePath = path.join(this.outputPath, `${fileName}-config.ts`);
      
      await this.generateFromTemplate('global-config.hbs', config, outputFilePath);

      console.log(`Generated global config: ${outputFilePath}`);
    } catch (error) {
      console.error('Error generating global config:', error);
      throw error;
    }
  }

  private async generateFromTemplate(templateName: string, data: any, outputPath: string): Promise<void> {
    const templatePath = path.join(this.templatesPath, templateName);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateContent);
    const result = template(data);
    await fs.writeFile(outputPath, result);
  }

  private toKebabCase(str: string): string {
    return str.toLowerCase().replace(/[^\w\s]/g, '').replace(/[\s-_]+/g, '-').replace(/-{2,}/g, '-');
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: ts-node main.ts <json-string-or-file>');
    process.exit(1);
  }

  const input = args[0];
  let config: ApiConfig;

  try {
    // Try to parse as JSON string first
    config = JSON.parse(input);
  } catch {
    // If not JSON, treat as file path
    try {
      const fileContent = require('fs').readFileSync(input, 'utf-8');
      config = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading or parsing input:', error);
      process.exit(1);
    }
  }

  const templatesPath = path.join(__dirname, 'templates');
  const outputPath = path.join(__dirname, '../../generated/response');

  const generator = new ResponseGenerator(templatesPath, outputPath);
  generator.generateGlobalConfig(config)
    .then(() => console.log('Generation completed successfully'))
    .catch(error => {
      console.error('Generation failed:', error);
      process.exit(1);
    });
}