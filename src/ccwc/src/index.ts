import { app } from "./app";

const main = async function () {
  const result = await app(process.argv, process.stdin);
  console.log(result);
};

main();
