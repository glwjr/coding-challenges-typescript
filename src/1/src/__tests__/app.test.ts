import fs from "fs";
import { execSync } from "node:child_process";
import path from "path";
import { app } from "../app";

const filePaths = [
  path.join(__dirname, "test1.txt"),
  path.join(__dirname, "test2.txt"),
];

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

    test(`Default: No option provided with file path`, async () => {
      const argv = [" ", " ", filePath];

      expect(await app(argv)).toBe(
        `${wcLineCount} ${wcWordCount} ${wcByteCount} ${filePath}`
      );
    });
  });
});

describe("Testing without file path", () => {
  filePaths.forEach((filePath) => {
    const wcOutput = execSync(`cat ${filePath} | wc`)
      .toString()
      .trim()
      .split(/\s+/);
    const wcCharacterCount = execSync(`cat ${filePath} | wc -m`)
      .toString()
      .trim()
      .split(/\s+/)[0];
    const wcLineCount = wcOutput[0];
    const wcWordCount = wcOutput[1];
    const wcByteCount = wcOutput[2];

    test(`Byte count: -c option without file path`, async () => {
      const stream = fs.createReadStream(filePath);
      const argv = [" ", " ", "-c"];
      const result = await app(argv, stream);

      stream.destroy();
      expect(result).toBe(wcByteCount);
    });

    test(`Line count: -l option without file path`, async () => {
      const stream = fs.createReadStream(filePath);
      const argv = [" ", " ", "-l"];
      const result = await app(argv, stream);

      stream.destroy();
      expect(result).toBe(wcLineCount);
    });

    test(`Word count: -w option without file path`, async () => {
      const stream = fs.createReadStream(filePath);
      const argv = [" ", " ", "-w"];
      const result = await app(argv, stream);

      stream.destroy();
      expect(result).toBe(wcWordCount);
    });

    test(`Character count: -m option without file path`, async () => {
      const stream = fs.createReadStream(filePath);
      const argv = [" ", " ", "-m"];
      const result = await app(argv, stream);

      stream.destroy();
      expect(result).toBe(wcCharacterCount);
    });

    test(`Default: no option or file path provided`, async () => {
      const stream = fs.createReadStream(filePath);
      const argv = [" ", " "];
      const result = await app(argv, stream);

      stream.destroy();
      expect(result).toBe(`${wcLineCount} ${wcWordCount} ${wcByteCount}`);
    });
  });
});

describe("Invalid inputs or invalid file path", () => {
  const filePath = filePaths[0];

  test(`Invalid option, valid file path, no stream`, async () => {
    const argv = [" ", " ", "-x", filePath];

    expect(app(argv, undefined)).rejects.toThrow("Invalid option");
  });

  test(`Valid option, invalid file path, no stream`, async () => {
    const argv = [" ", " ", "-c", "x"];

    expect(app(argv, undefined)).rejects.toThrow("Invalid input or file");
  });

  test(`Valid option, no file path, no stream`, async () => {
    const argv = [" ", " ", "-c"];

    expect(app(argv, undefined)).rejects.toThrow("Invalid input or file");
  });

  test(`Invalid option, no file path, valid stream`, async () => {
    const stream = fs.createReadStream(filePath);
    const argv = [" ", " ", "-x"];

    await expect(app(argv, stream)).rejects.toThrow("Invalid option");
    stream.destroy();
  });

  test(`No option, no file path, no stream`, async () => {
    const argv = [" ", " "];

    expect(app(argv, undefined)).rejects.toThrow("Invalid input or file");
  });
});
