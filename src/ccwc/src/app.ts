import { statSync } from "fs";
import { open } from "node:fs/promises";

/**
 * This function returns the number of bytes in a file
 *
 * @param {string} fileName
 * @returns {number}
 */
function countBytes(fileName: string): number {
  const { size } = statSync(fileName);
  return size;
}

/**
 * This function returns the number of lines in a file
 *
 * @param {string} fileName
 * @returns {Promise<number>}
 */
async function countLines(fileName: string): Promise<number> {
  let count: number = 0;
  const file = await open(fileName);

  for await (const line of file.readLines()) {
    count++;
  }

  return count;
}

/**
 * This function is the unix wc clone implementation
 *
 * @async
 * @param {string[]} argv
 * @returns {Promise<string>}
 */
export async function app(argv: string[]): Promise<string> {
  try {
    // Option is given, file name is given
    if (argv.length === 4) {
      const option = argv[2];
      const fileName = argv[3];

      switch (option) {
        case "-c": {
          const byteCount = countBytes(fileName);
          return byteCount.toString() + " " + fileName;
        }
        case "-l": {
          const lineCount = await countLines(fileName);
          return lineCount.toString() + " " + fileName;
        }
      }
    }

    throw new Error("Invalid input or file");
  } catch (error) {
    throw error;
  }
}
