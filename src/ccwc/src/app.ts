import fs from "fs";
import { Buffer } from "node:buffer";

/**
 * Reads the given stream and returns a Buffer
 *
 * @async
 * @param stream - Path to the file
 * @returns Buffer
 */
async function readStream(
  stream: NodeJS.ReadStream | fs.ReadStream
): Promise<Buffer> {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}

/**
 * Returns the number of bytes in a given file
 *
 * @param filePath - Path to the file
 * @returns Number of bytes
 */
function countBytes(filePath: string): number {
  const { size } = fs.statSync(filePath);

  return size;
}

/**
 * Returns the number of lines in a given text
 *
 * @param text - Given text
 * @returns Number of lines
 */
function countLines(text: string): number {
  return text.split(/\r\n|\r|\n/).length - 1;
}

/**
 * Returns the number of words in a given text
 *
 * @param text - Given text
 * @returns Number of words
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * Returns the number of characters in a given text
 *
 * @param text - Given text
 * @returns Number of characters
 */
function countCharacters(text: string): number {
  return text.split("").length;
}

/**
 * wc clone implementation
 *
 * @async
 * @param argv - Arguments
 * @param stream - stdin or file stream
 * @returns Result to print to the console
 */
export async function app(
  argv: string[],
  stream?: NodeJS.ReadStream | fs.ReadStream
): Promise<string> {
  // Option is given, file name is given
  if (argv.length === 4) {
    const option = argv[2];
    const filePath = argv[3];

    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, {
        encoding: "utf8",
        flag: "r",
      });

      switch (option) {
        case "-c": {
          const byteCount = countBytes(filePath);
          return byteCount.toString() + " " + filePath;
        }
        case "-l": {
          const lineCount = countLines(fileContents);
          return lineCount.toString() + " " + filePath;
        }
        case "-w": {
          const wordCount = countWords(fileContents);
          return wordCount.toString() + " " + filePath;
        }
        case "-m": {
          const characterCount = countCharacters(fileContents);
          return characterCount.toString() + " " + filePath;
        }
        default: {
          throw new Error("Invalid option");
        }
      }
    }
  }

  // Only file name is given
  if (argv.length === 3) {
    const filePath = argv[2];

    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, {
        encoding: "utf8",
        flag: "r",
      });

      const lineCount = countLines(fileContents);
      const wordCount = countWords(fileContents);
      const byteCount = countBytes(filePath);

      return lineCount + " " + wordCount + " " + byteCount + " " + filePath;
    }
  }

  // Checks for stream
  if (typeof stream !== "undefined") {
    try {
      const buffer = await readStream(stream);
      const contents = buffer.toString();

      // If option is given
      if (argv.length === 3) {
        const option = argv[2];

        switch (option) {
          case "-c": {
            const byteCount = buffer.length;
            return byteCount.toString();
          }
          case "-l": {
            const lineCount = countLines(contents);
            return lineCount.toString();
          }
          case "-w": {
            const wordCount = countWords(contents);
            return wordCount.toString();
          }
          case "-m": {
            const characterCount = countCharacters(contents);
            return characterCount.toString();
          }
          default: {
            throw new Error("Invalid option");
          }
        }
      }

      // If no option is given
      if (argv.length === 2) {
        const lineCount = countLines(contents);
        const wordCount = countWords(contents);
        const byteCount = buffer.length;

        return (
          lineCount.toString() +
          " " +
          wordCount.toString() +
          " " +
          byteCount.toString()
        );
      }
    } catch (error) {
      throw error;
    }
  }

  throw new Error("Invalid input or file");
}
