# Coding Challenges

This repository contains my solutions to John Crickett's Coding Challenges. Each application is written in TypeScript. You can find all of the challenges at https://codingchallenges.fyi.

## Challenges

1. [Write Your Own wc Tool](https://github.com/glwjr/coding-challenges/tree/main/src/ccwc)

## Installation

The following commands will transpile all of the .ts files in the `src` folder into a new `build` folder:

```bash
npm install
npm run build
```

## Testing

The following command will run all of the tests in each `__tests__` subdirectory and create the coverage report in the `coverage` folder.

```bash
npm test
```

To run tests for a specific challenge, use the following command:

```bash
# npm test src/<directory_name>
npm test src/ccwc
```
