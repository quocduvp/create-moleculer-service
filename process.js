// const child_process = require("child_process");
// child_process.execSync("mkdir myapp", {
//   cwd: "./myapp",
//   env: process.env,
//   stdio: "inherit",
// });
const exec = require("child_process").exec;
const argv = require('minimist')(process.argv.slice(2));
const ROOT_PATH = process.cwd();
const src = argv.path || "";
exec(`mkdir ${src}`, async (err, stdout, stderr) => {
  const generatedBase = await require("./util").generateBaseCode(
    `${ROOT_PATH}/${src === "." ? "" : src}`
  );
  console.log("----------- Generate base-------------");
  console.log(generatedBase);
  console.log("--------------------------------------");
  console.log(stdout);
});
