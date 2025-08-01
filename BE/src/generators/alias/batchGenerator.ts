import * as fs from 'fs/promises';
import * as path from 'path';
import { Generator } from './main';

export interface ModuleInfo {
  name: string;
  jsonPath: string;
  hasJsonFile: boolean;
}

export class BatchGenerator {
  private baseV2Path: string;
  private generator: Generator;
  private generatedModules: ModuleInfo[] = [];

  constructor() {
    this.baseV2Path = path.join(process.cwd(), 'json/role-settings/_v2');
    const templatesPath = path.join(__dirname, 'templates');
    const outputPath = path.join(__dirname, '../../generated/alias');
    this.generator = new Generator(templatesPath, outputPath);
  }

  /**
   * Scan all folders in _v2 directory and find JSON files
   */
  async scanModules(): Promise<ModuleInfo[]> {
    console.log(`📁 Scanning modules in: ${this.baseV2Path}`);
    
    try {
      const folders = await fs.readdir(this.baseV2Path, { withFileTypes: true });
      const modules: ModuleInfo[] = [];

      for (const folder of folders) {
        if (folder.isDirectory()) {
          const moduleName = folder.name;
          const moduleFolder = path.join(this.baseV2Path, moduleName);
          
          // Look for JSON file with same name as folder
          const jsonFilePath = path.join(moduleFolder, `${moduleName}.json`);
          
          try {
            await fs.access(jsonFilePath);
            modules.push({
              name: moduleName,
              jsonPath: jsonFilePath,
              hasJsonFile: true
            });
            console.log(`✅ Found: ${moduleName}`);
          } catch (error) {
            // Check if there are other JSON files in the folder
            try {
              const files = await fs.readdir(moduleFolder);
              const jsonFiles = files.filter(file => file.endsWith('.json'));
              
              if (jsonFiles.length > 0) {
                // Use the first JSON file found
                const firstJsonFile = path.join(moduleFolder, jsonFiles[0]);
                modules.push({
                  name: moduleName,
                  jsonPath: firstJsonFile,
                  hasJsonFile: true
                });
                console.log(`✅ Found (alt): ${moduleName} -> ${jsonFiles[0]}`);
              } else {
                console.log(`⚠️  No JSON file: ${moduleName}`);
                modules.push({
                  name: moduleName,
                  jsonPath: '',
                  hasJsonFile: false
                });
              }
            } catch (err) {
              console.log(`❌ Error reading: ${moduleName}`, (err as Error).message);
            }
          }
        }
      }

      console.log(`\n📊 Total modules found: ${modules.length}`);
      console.log(`📊 Modules with JSON: ${modules.filter(m => m.hasJsonFile).length}`);
      
      return modules;
    } catch (error) {
      console.error('Error scanning modules:', error);
      return [];
    }
  }

  /**
   * Generate all modules
   */
  async generateAllModules(): Promise<void> {
    const modules = await this.scanModules();
    const validModules = modules.filter(m => m.hasJsonFile);
    
    console.log(`\n🚀 Starting batch generation for ${validModules.length} modules...\n`);
    
    let successCount = 0;
    let errorCount = 0;

    for (const module of validModules) {
      try {
        console.log(`🔄 Generating: ${module.name}...`);
        await this.generator.generate(module.jsonPath);
        console.log(`✅ Generated: ${module.name}`);
        successCount++;
        this.generatedModules.push(module);
      } catch (error) {
        console.error(`❌ Failed: ${module.name}`, (error as Error).message);
        errorCount++;
      }
    }

    console.log(`\n📈 Batch Generation Summary:`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📊 Total: ${successCount + errorCount}`);
  }

  /**
   * Generate main routes registry file
   */
  async generateMainRegistry(): Promise<void> {
    console.log(`\n📝 Generating main routes registry...`);
    
    // Create imports
    const imports: string[] = [];
    const routeRegistrations: string[] = [];

    for (const module of this.generatedModules) {
      const pascalCase = this.toPascalCase(module.name);
      const camelCase = this.toCamelCase(module.name);
      
      imports.push(`import { ${camelCase}Router } from './${module.name}';`);
      routeRegistrations.push(`    await ${camelCase}Router(fastify);`);
    }

    const registryContent = `// Auto-generated main routes registry
// Generated on: ${new Date().toISOString()}
import { FastifyInstance } from 'fastify';

${imports.join('\n')}

export async function registerAllGeneratedRoutes(fastify: FastifyInstance): Promise<void> {
  console.log('🔗 Registering all generated routes...');
  
  try {
${routeRegistrations.join('\n')}
    
    console.log('✅ All generated routes registered successfully');
  } catch (error) {
    console.error('❌ Error registering routes:', error);
    throw error;
  }
}

// Individual route registration functions
export const generatedRoutes = {
${this.generatedModules.map(m => `  ${this.toCamelCase(m.name)}: ${this.toCamelCase(m.name)}Router`).join(',\n')}
};

// Module information
export const moduleInfo = ${JSON.stringify(this.generatedModules, null, 2)};

export const generatedModuleNames = [
${this.generatedModules.map(m => `  '${m.name}'`).join(',\n')}
];
`;

    const registryPath = path.join(__dirname, '../../generated/alias/index.ts');
    await fs.writeFile(registryPath, registryContent);
    
    console.log(`✅ Main registry created: ${registryPath}`);
    console.log(`📊 Total routes: ${this.generatedModules.length}`);
  }

  /**
   * Generate usage example
   */
  async generateUsageExample(): Promise<void> {
    const exampleContent = `// Example: How to use the generated routes in your main app
import Fastify from 'fastify';
import { registerAllGeneratedRoutes, generatedRoutes } from './src/generated';

const app = Fastify();

// Method 1: Register all routes at once
await registerAllGeneratedRoutes(app);

// Method 2: Register individual routes
await generatedRoutes.socialTag(app);
await generatedRoutes.group(app);
await generatedRoutes.tweet(app);

// Method 3: Register with prefix
app.register(async function (fastify) {
  await registerAllGeneratedRoutes(fastify);
}, { prefix: '/api/v2' });

await app.listen({ port: 3000 });
console.log('🚀 Server running with all generated routes!');
`;

    const examplePath = path.join(process.cwd(), 'generated-routes-example.ts');
    await fs.writeFile(examplePath, exampleContent);
    console.log(`✅ Usage example created: ${examplePath}`);
  }

  private toPascalCase(str: string): string {
    return str.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  private toCamelCase(str: string): string {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  /**
   * Full batch process
   */
  async runFullBatch(): Promise<void> {
    console.log('🎯 Starting full batch generation process...\n');
    
    try {
      // 1. Generate all modules
      await this.generateAllModules();
      
      // 2. Generate main registry
      await this.generateMainRegistry();
      
      // 3. Generate usage example
      await this.generateUsageExample();
      
      console.log('\n🎉 Full batch generation completed successfully!');
      console.log(`📦 Generated ${this.generatedModules.length} modules`);
      console.log('📁 Files created:');
      console.log('   - src/generated/index.ts (main registry)');
      console.log('   - generated-routes-example.ts (usage example)');
      console.log(`   - ${this.generatedModules.length} module folders in src/generated/`);
      
    } catch (error) {
      console.error('❌ Batch generation failed:', error);
      throw error;
    }
  }
}

// CLI usage
if (require.main === module) {
  const batchGenerator = new BatchGenerator();
  
  const command = process.argv[2] || 'full';
  
  switch (command) {
    case 'scan':
      batchGenerator.scanModules().then(modules => {
        console.log('\nScanned modules:', modules.length);
      });
      break;
      
    case 'generate':
      batchGenerator.generateAllModules();
      break;
      
    case 'registry':
      batchGenerator.generateMainRegistry();
      break;
      
    case 'full':
    default:
      batchGenerator.runFullBatch();
      break;
  }
}