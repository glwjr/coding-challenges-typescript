import { app } from "./app";

const main = async function () {
  const result = await app(process.argv);
  console.log(result);
};

main();
