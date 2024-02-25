import { execSync } from "node:child_process";
import path from "path";
import { app } from "../app";

const filePaths = [path.join(__dirname, "test1.txt")];

describe("Testing with file path", () => {
  filePaths.forEach((filePath) => {
    const wcOutput = execSync(`wc ${filePath}`).toString().trim().split(/\s+/);
    const wcCharacterCount = execSync(`wc -m ${filePath}`)
      .toString()
      .trim()
      .split(/\s+/)[0];
    const wcLineCount = wcOutput[0];
    const wcWordCount = wcOutput[1];
    const wcByteCount = wcOutput[2];

    test(`Byte count: -c option with file path`, async () => {
      const argv = [" ", " ", "-c", filePath];
      expect(await app(argv)).toBe(`${wcByteCount} ${filePath}`);
    });

    test(`Line count: -l option with file path`, async () => {
      const argv = [" ", " ", "-l", filePath];
      expect(await app(argv)).toBe(`${wcLineCount} ${filePath}`);
    });

    test(`Word count: -w option with file path`, async () => {
      const argv = [" ", " ", "-w", filePath];
      expect(await app(argv)).toBe(`${wcWordCount} ${filePath}`);
    });

    test(`Character count: -m option with file path`, async () => {
      const argv = [" ", " ", "-m", filePath];
      expect(await app(argv)).toBe(`${wcCharacterCount} ${filePath}`);
    });
  });
});
