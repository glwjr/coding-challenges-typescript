import fs from "fs";

/**
 * This function returns the number of bytes in a file
 *
 * @param {string} fileName
 * @returns {number}
 */
function countBytes(fileName: string): number {
  const { size } = fs.statSync(fileName);
  return size;
}

/**
 * This function is the unix wc clone implementation
 *
 * @async
 * @param {string[]} argv
 * @param {?NodeJS.ReadStream | fs.ReadStream} [stream]
 * @returns {Promise<string>}
 */
export async function app(
  argv: string[],
  stream?: NodeJS.ReadStream | fs.ReadStream
): Promise<any> {
  try {
    // Option is given, file name is given
    if (argv.length === 4) {
      const option = argv[2];
      const fileName = argv[3];

      switch (option) {
        case "-c": {
          const bytes = countBytes(fileName);
          return bytes.toString() + " " + fileName;
        }
      }

      throw new Error("Invalid input or file");
    }
  } catch (error) {
    console.error(error);
  }
}
