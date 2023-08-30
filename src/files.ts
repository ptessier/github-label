import * as fs from 'fs/promises';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Label } from './types';

function getPath(...paths: string[]): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  return path.resolve(__dirname, ...paths);
}

/**
 * Read a file from the labels folder.
 */
export function readFile(filename: string): Promise<string> {
  try {
    const filePath = getPath('..', 'labels', filename);

    console.log('Reading from', filePath);

    return fs.readFile(filePath, { encoding: 'utf-8' });
  } catch (error) {
    console.error(`Failed to read ${filename}`);
    process.exit(1);
  }
}

/**
 * Write a file to the labels folder.
 */
export function writeFile(filename: string, data: string): Promise<void> {
  try {
    const filePath = getPath('..', 'labels', filename);

    console.log('Writing to', filePath);

    return fs.writeFile(filePath, data, { encoding: 'utf-8' });
  } catch (error) {
    console.error(`Failed to write to ${filename}`);
    process.exit(1);
  }
}

/**
 * Read the labels from a file.
 */
export async function readLabels(filename: string): Promise<Label[]> {
  const data = await readFile(filename);

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to parse labels in ${filename}`);
    process.exit(1);
  }
}

/**
 * Write the labels from a file.
 */
export function writeLabels(filename: string, data: unknown): Promise<void> {
  return writeFile(filename, JSON.stringify(data, null, 2));
}
