import { execSync } from "node:child_process";
import path from "path";
import { app } from "../app";

const filePaths = [path.join(__dirname, "test1.txt")];

describe("Testing with file path", () => {
  filePaths.forEach((filePath) => {
    const wcOutput = execSync(`wc ${filePath}`).toString().trim().split(/\s+/);
    const wcLineCount = wcOutput[0];
    const wcWordCount = wcOutput[1];
    const wcCharacterCount = wcOutput[2];

    test(`-c option with file path`, async () => {
      const argv = [" ", " ", "-c", filePath];
      expect(await app(argv)).toBe(`${wcCharacterCount} ${filePath}`);
    });

    test(`-l option with file path`, async () => {
      const argv = [" ", " ", "-l", filePath];
      expect(await app(argv)).toBe(`${wcLineCount} ${filePath}`);
    });
  });
});
