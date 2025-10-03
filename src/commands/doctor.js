const execa = require("execa");
const chalk = require("chalk").default;

module.exports = async function doctor() {
  console.log(chalk.cyan("Checking prerequisites..."));
  try {
    const node = process.version;
    console.log(`Node: ${node}`);
  } catch {}
  try {
    const { stdout } = await execa("npx", ["--version"]);
    console.log(`npx: ${stdout}`);
  } catch {
    console.log(chalk.yellow("npx not found in PATH (npm should provide it)."));
  }
  console.log(chalk.green("Done."));
};
