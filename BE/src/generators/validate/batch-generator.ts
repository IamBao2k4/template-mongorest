import * as fs from 'fs/promises';
import * as path from 'path';
import { ValidateGenerator } from './main';

interface ValidateConfig {
  _id: string;
  title: string;
  note?: string;
  entity: string[];
  data: any;
  required: any[];
  queryMongodb: string;
  locale: string | null;
  locale_id: string | null;
  tenant_id: string;
  group_id?: string | null;
  advance?: string;
  documents: any[];
  body?: any;
  categories: any[];
  error_code?: string | null;
  headers?: any;
  logged?: boolean;
  params?: any;
  pre?: string;
}

export class BatchValidateGenerator {
  private generator: ValidateGenerator;
  private inputPath: string;
  private outputPath: string;

  constructor(inputPath: string, outputPath: string) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    const templatesPath = path.join(__dirname, 'templates');
    this.generator = new ValidateGenerator(templatesPath, outputPath);
  }

  async generateAll(): Promise<void> {
    try {
      console.log(`Reading JSON files from: ${this.inputPath}`);
      
      // Read all JSON files from input directory
      const files = await fs.readdir(this.inputPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      console.log(`Found ${jsonFiles.length} JSON files`);
      
      // Create output directory
      await fs.mkdir(this.outputPath, { recursive: true });
      
      const results = {
        success: 0,
        failed: 0,
        errors: [] as Array<{ file: string; error: string }>
      };

      // Process each file
      for (const file of jsonFiles) {
        try {
          const filePath = path.join(this.inputPath, file);
          console.log(`Processing: ${file}`);
          
          // Read and parse JSON file
          const content = await fs.readFile(filePath, 'utf-8');
          const config: ValidateConfig = JSON.parse(content);
          
          // Validate required fields
          if (!config.title || !config._id) {
            throw new Error(`Missing required fields (title or _id) in ${file}`);
          }
          
          // Generate global config
          await this.generator.generateGlobalConfig(config);
          
          results.success++;
          console.log(`✓ Generated: ${file}`);
          
        } catch (error) {
          results.failed++;
          const errorMsg = error instanceof Error ? error.message : String(error);
          results.errors.push({ file, error: errorMsg });
          console.error(`✗ Failed: ${file} - ${errorMsg}`);
        }
      }
      
      // Summary
      console.log(`\n=== Batch Generation Summary ===`);
      console.log(`Total files: ${jsonFiles.length}`);
      console.log(`Success: ${results.success}`);
      console.log(`Failed: ${results.failed}`);
      
      if (results.errors.length > 0) {
        console.log(`\nErrors:`);
        results.errors.forEach(({ file, error }) => {
          console.log(`  - ${file}: ${error}`);
        });
      }
      
      // Create index file with all exports
      await this.generateIndexFile();
      
    } catch (error) {
      console.error('Batch generation failed:', error);
      throw error;
    }
  }

  private async generateIndexFile(): Promise<void> {
    try {
      // Read all generated TypeScript files
      const files = await fs.readdir(this.outputPath);
      const tsFiles = files.filter(file => file.endsWith('-config.ts'));
      
      // Generate export statements
      const exports = tsFiles.map(file => {
        const baseName = file.replace('-config.ts', '');
        return `export * from './${baseName}-config';`;
      }).join('\n');
      
      const indexContent = `// Auto-generated index file for all validate configurations
// Generated at: ${new Date().toISOString()}

${exports}

// Export count: ${tsFiles.length} configurations
`;
      
      const indexPath = path.join(this.outputPath, 'index.ts');
      await fs.writeFile(indexPath, indexContent);
      
      console.log(`Generated index file with ${tsFiles.length} exports`);
      
    } catch (error) {
      console.error('Failed to generate index file:', error);
    }
  }
}

// CLI usage
if (require.main === module) {
  const inputPath = '/home/thaily/code/mge-v2-2025/mongorest/json/validate';
  const outputPath = path.join(__dirname, '../../generated/validate');
  
  const batchGenerator = new BatchValidateGenerator(inputPath, outputPath);
  batchGenerator.generateAll()
    .then(() => console.log('Batch generation completed successfully'))
    .catch(error => {
      console.error('Batch generation failed:', error);
      process.exit(1);
    });
}