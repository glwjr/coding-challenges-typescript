import fs from "fs";

/**
 * JSON parser
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
  if (argv.length === 3) {
    const filePath = argv[2];

    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, {
        encoding: "utf8",
        flag: "r",
      });

      return fileContents;
    }
  }

  throw new Error("Invalid input or file");
}
