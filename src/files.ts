import * as fs from "fs";
import * as path from "path";
import { Label } from "./types";

const folder = "labels";

/**
 * Read a file from the labels folder.
 */
export async function readFile(filename: string): Promise<string> {
  try {
    const file = path.resolve(process.cwd(), folder, filename);
    const resolvedPath = path.resolve(__dirname, file);

    console.log("Reading from", resolvedPath);

    return fs.promises.readFile(resolvedPath, { encoding: "utf-8" });
  } catch (error) {
    console.error(`Failed to read ${filename}`);
    process.exit(1);
  }
}

/**
 * Write a file to the labels folder.
 */
export async function writeFile(filename: string, data: string): Promise<void> {
  try {
    const file = path.resolve(process.cwd(), folder, filename);
    const resolvedPath = path.resolve(__dirname, file);

    console.log("Writing to", resolvedPath);

    return fs.promises.writeFile(resolvedPath, data, { encoding: "utf-8" });
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
export async function writeLabels(filename: string, data: any): Promise<void> {
  return writeFile(filename, JSON.stringify(data, null, 2));
}
