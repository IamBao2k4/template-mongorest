import * as fs from 'fs/promises';
import * as path from 'path';
import { ResponseGenerator } from './main';

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

export class BatchResponseGenerator {
  private generator: ResponseGenerator;
  private inputPath: string;
  private outputPath: string;

  constructor(inputPath: string, outputPath: string) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    const templatesPath = path.join(__dirname, 'templates');
    this.generator = new ResponseGenerator(templatesPath, outputPath);
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
          const config: ApiConfig = JSON.parse(content);
          
          // Validate required fields
          if (!config.title || !config.method) {
            throw new Error(`Missing required fields (title or method) in ${file}`);
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
      
      const indexContent = `// Auto-generated index file for all API configurations
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
  const inputPath = '/home/thaily/code/mge-v2-2025/mongorest/json/response';
  const outputPath = path.join(__dirname, '../../generated/response');
  
  const batchGenerator = new BatchResponseGenerator(inputPath, outputPath);
  batchGenerator.generateAll()
    .then(() => console.log('Batch generation completed successfully'))
    .catch(error => {
      console.error('Batch generation failed:', error);
      process.exit(1);
    });
}