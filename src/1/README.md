# Challenge 1 - Build Your Own wc Tool

This application is my solution to the first part of the Coding Challenges series by John Crickett. The page to the challenge can be found [here](https://codingchallenges.fyi/challenges/challenge-wc).

## Description

wc (short for word count) is a command in Unix that calculates a file's word, line, character, and/or byte count. The goal was to write ccwc, a simple version of wc, where cc stands for Coding Challenges. ccwc is contained in `src/app.ts`, and the command line version is contained in `src/index.ts`.

## Usage

You can use `ts-node` to run the tool:

```bash
npx ts-node src/index.ts [option] [file-name]
```

ccwc supports the following options:

- `-c` ouputs the number of bytes in a file
- `-l` ouputs the number of lines in a file
- `-w` ouputs the number of words in a file (TODO)
- `-m` ouputs the number of characters in a file (TODO)

When no options are provided, the output is the equivalent to the -c, -l, and -w options (TODO).

## Tests

The ccwc application utilizes [Jest](https://jestjs.io/). All of the tests are made only for **LINUX** environments. To run the tests, `cd` to the root directory of this repository and use the following command:

```bash
npm test src/1
```
