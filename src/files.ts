import path = require("path");
import fs = require("fs");
import { Label } from "./types";

export async function readFile(filename: string): Promise<string> {
  try {
    const file = path.resolve(process.cwd(), filename);
    const resolvedPath = path.resolve(__dirname, file);
    return fs.promises.readFile(resolvedPath, { encoding: "utf-8" });
  } catch (error) {
    console.error(`Failed to read ${filename}`);
    process.exit(1);
  }
}

export async function writeLabels(filename: string, data: any): Promise<void> {
  return writeFile(filename, JSON.stringify(data, null, 2));
}

export async function writeFile(filename: string, data: string): Promise<void> {
  try {
    const file = path.resolve(process.cwd(), filename);
    const resolvedPath = path.resolve(__dirname, file);
    return fs.promises.writeFile(resolvedPath, data, { encoding: "utf-8" });
  } catch (error) {
    console.error(`Failed to write to ${filename}`);
    process.exit(1);
  }
}

export async function readLabels(filename: string): Promise<Label[]> {
  const data = await readFile(filename);

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to parse labels in ${filename}`);
    process.exit(1);
  }
}
