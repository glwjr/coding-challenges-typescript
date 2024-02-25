import fs from "fs";

/**
 * This function returns the number of bytes in a given file
 *
 * @param {string} fileName
 * @returns {number}
 */
function countBytes(fileName: string): number {
  const { size } = fs.statSync(fileName);
  return size;
}

/**
 * This function returns the number of lines in a given text
 *
 * @param {string} text
 * @returns {number}
 */
function countLines(text: string): number {
  return text.split(/\r\n|\r|\n/).length - 1;
}

/**
 * This function returns the number of words in a given text
 *
 * @param {string} text
 * @returns {number}
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * This function returns the number of characters in a given text
 *
 * @param {string} text
 * @returns {number}
 */
function countCharacters(text: string): number {
  return text.split("").length;
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

      if (fs.existsSync(fileName)) {
        const fileContents = fs.readFileSync(fileName, {
          encoding: "utf8",
          flag: "r",
        });

        switch (option) {
          case "-c": {
            const byteCount = countBytes(fileName);
            return byteCount.toString() + " " + fileName;
          }
          case "-l": {
            const lineCount = countLines(fileContents);
            return lineCount.toString() + " " + fileName;
          }
          case "-w": {
            const wordCount = countWords(fileContents);
            return wordCount.toString() + " " + fileName;
          }
          case "-m": {
            const characterCount = countCharacters(fileContents);
            return characterCount.toString() + " " + fileName;
          }
        }
      }
    }

    throw new Error("Invalid input or file");
  } catch (error) {
    throw error;
  }
}
