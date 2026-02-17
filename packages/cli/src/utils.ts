import { readFile } from "fs/promises";

export async function readJsonFile(path: string): Promise<unknown> {
  const content = await readFile(path, "utf-8");
  return JSON.parse(content) as unknown;
}
