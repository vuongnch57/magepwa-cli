const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk").default;
const ora = require("ora").default;

module.exports = async function regions({ dir = ".", dest = "src" } = {}) {
  const target = path.resolve(process.cwd(), dir);
  const destination = path.resolve(target, dest);

  // Ensure target directory exists
  await fs.ensureDir(target);
  await fs.ensureDir(destination);

  const spinner = ora(
    "Copying regions manager components scaffold files"
  ).start();

  try {
    // Source scaffold directory
    const scaffoldDir = path.join(__dirname, "../../scaffolds/regions");

    // Check if scaffold directory exists
    if (!(await fs.pathExists(scaffoldDir))) {
      throw new Error(`Scaffold directory not found: ${scaffoldDir}`);
    }

    // Copy the entire regions scaffold to destination
    await fs.copy(scaffoldDir, destination, {
      overwrite: true,
      filter: (src) => {
        // Skip copying if it's the same directory (avoid infinite recursion)
        return src !== destination;
      },
    });

    spinner.succeed(
      "Regions manager components scaffold files copied successfully"
    );

    // Print success message with details
    console.log(chalk.cyan.bold("\n" + "=".repeat(60)));
    console.log(chalk.cyan.bold("REGIONS MANAGER COMPONENTS SCAFFOLD APPLIED"));
    console.log(chalk.cyan.bold("=".repeat(60)));

    console.log(chalk.yellow.bold("\n📁 COPIED FILES:"));
    console.log(
      chalk.gray(
        "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      )
    );
    console.log(
      chalk.white(
        "   • Components: District and SubDistrict address components"
      )
    );
    console.log(
      chalk.white("   • Talons: GraphQL queries and hooks for regions")
    );
    console.log(chalk.white("   • Styles: CSS modules for component styling"));

    console.log(chalk.yellow.bold("\n🔧 USAGE:"));
    console.log(
      chalk.gray(
        "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      )
    );
    console.log(
      chalk.white("   Import and use the components in your React components:")
    );
    console.log(
      chalk.blue("   import District from '@components/Address/District';")
    );
    console.log(
      chalk.blue(
        "   import SubDistrict from '@components/Address/SubDistrict';"
      )
    );
    console.log(
      chalk.blue(
        "   import { useDistrict } from '@talons/Address/District/useDistrict';"
      )
    );
    console.log(
      chalk.blue(
        "   import { useSubDistrict } from '@talons/Address/SubDistrict/useSubDistrict';"
      )
    );

    console.log(chalk.yellow.bold("\n📋 FEATURES:"));
    console.log(
      chalk.gray(
        "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      )
    );
    console.log(
      chalk.white("   • District selection with GraphQL integration")
    );
    console.log(
      chalk.white("   • Sub-district selection based on selected district")
    );
    console.log(chalk.white("   • CSS modules for styling"));
    console.log(chalk.white("   • Custom hooks for data fetching"));

    console.log(chalk.cyan.bold("\n" + "=".repeat(60)));
    console.log(
      chalk.green.bold("✅ Regions manager components ready to use!")
    );
    console.log(chalk.cyan.bold("=".repeat(60)));
  } catch (error) {
    spinner.fail("Failed to copy regions manager components scaffold files");
    throw error;
  }
};
