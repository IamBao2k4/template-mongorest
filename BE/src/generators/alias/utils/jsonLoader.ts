import * as fs from 'fs/promises';
import * as path from 'path';

const JSON_BASE_PATH = path.join(__dirname, '../../../mongorest');

export async function loadJsonFile(filePath: string): Promise<any> {
  try {
    const fullPath = path.join(JSON_BASE_PATH, filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading JSON file ${filePath}:`, error);
    throw new Error(`Failed to load JSON file: ${filePath}`);
  }
}

export async function loadValidateFile(validateId: string): Promise<any> {
  const filePath = `json/validate/${validateId}.json`;
  return loadJsonFile(filePath);
}

export async function loadResponseFile(responseId: string): Promise<any> {
  const filePath = `json/response/${responseId}.json`;
  return loadJsonFile(filePath);
}