const { Command } = require("commander");
const chalk = require("chalk").default;
const pkg = require("../package.json");

const program = new Command();
program
  .name("magepwa")
  .description("Bootstrap Magento PWA Studio and apply custom scaffolds")
  .version(pkg.version);

program
  .command("init")
  .description(
    "Run the official Magento PWA Studio setup (interactive) and prepare the project for scaffolds"
  )
  .option(
    "-d, --dir <path>",
    "Target directory to run the setup in (will be created if missing)",
    "."
  )
  .action(async (opts) => {
    const runInit = require("./commands/init");
    try {
      await runInit(opts);
      console.log(
        chalk.green(
          "\n✔ Done. Project initialized and scaffold scaffolding added."
        )
      );
      console.log("\nNext:");
      console.log(
        ' • Add your custom files/config under the new "scaffolds" folder, or'
      );
      console.log(
        ' • Use "magepwa apply --scaffold <path>" (will be wired to your data later).'
      );
    } catch (err) {
      console.error(chalk.red("✖ init failed:"), err.message || err);
      process.exitCode = 1;
    }
  });

program
  .command("apply")
  .description("Apply a scaffold (files/config) on top of an existing project")
  .option(
    "-s, --scaffold <pathOrName>",
    "Path to a local folder or a known scaffold name"
  )
  .option("-d, --dir <path>", "Project directory", ".")
  .action(async (opts) => {
    const apply = require("./commands/apply");
    try {
      await apply(opts);
      console.log(chalk.green("✔ Scaffold applied."));
    } catch (err) {
      console.error(chalk.red("✖ apply failed:"), err.message || err);
      process.exitCode = 1;
    }
  });

program
  .command("doctor")
  .description("Check environment prerequisites")
  .action(async () => {
    const doctor = require("./commands/doctor");
    try {
      await doctor();
    } catch (err) {
      console.error(chalk.red("✖ doctor failed:"), err.message || err);
      process.exitCode = 1;
    }
  });

program
  .command("regions")
  .description("Copy Thailand regions scaffold files (components, talons, styles) to destination")
  .option(
    "-d, --dir <path>",
    "Target directory to copy files to (will be created if missing)",
    "."
  )
  .option(
    "--dest <path>",
    "Destination subdirectory within target directory",
    "src"
  )
  .action(async (opts) => {
    const regions = require("./commands/regions");
    try {
      await regions(opts);
    } catch (err) {
      console.error(chalk.red("✖ regions failed:"), err.message || err);
      process.exitCode = 1;
    }
  });

program
  .command("tax-invoice")
  .description("Copy tax invoice scaffold files (components, talons, utils, styles) to destination")
  .option(
    "-d, --dir <path>",
    "Target directory to copy files to (will be created if missing)",
    "."
  )
  .option(
    "--dest <path>",
    "Destination subdirectory within target directory",
    "src"
  )
  .action(async (opts) => {
    const taxInvoice = require("./commands/tax-invoice");
    try {
      await taxInvoice(opts);
    } catch (err) {
      console.error(chalk.red("✖ tax-invoice failed:"), err.message || err);
      process.exitCode = 1;
    }
  });

program.parse();
