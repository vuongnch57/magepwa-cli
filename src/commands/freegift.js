const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk").default;
const ora = require("ora").default;

module.exports = async function freegift({ dir = ".", dest = "src" } = {}) {
  const target = path.resolve(process.cwd(), dir);
  const destination = path.resolve(target, dest);

  // Ensure target directory exists
  await fs.ensureDir(target);
  await fs.ensureDir(destination);

  const spinner = ora(
    "Copying free gift components scaffold files"
  ).start();

  try {
    // Source scaffold directory
    const scaffoldDir = path.join(__dirname, "../../scaffolds/freegift");

    // Check if scaffold directory exists
    if (!(await fs.pathExists(scaffoldDir))) {
      throw new Error(`Scaffold directory not found: ${scaffoldDir}`);
    }

    // Copy the entire freegift scaffold to destination
    await fs.copy(scaffoldDir, destination, {
      overwrite: true,
      filter: (src) => {
        // Skip copying if it's the same directory (avoid infinite recursion)
        return src !== destination;
      },
    });

    spinner.succeed(
      "Free gift components scaffold files copied successfully"
    );

    // Print success message with details
    console.log(chalk.cyan.bold("\n" + "=".repeat(60)));
    console.log(chalk.cyan.bold("FREE GIFT COMPONENTS SCAFFOLD APPLIED"));
    console.log(chalk.cyan.bold("=".repeat(60)));

    console.log(chalk.yellow.bold("\n📁 COPIED FILES:"));
    console.log(
      chalk.gray(
        "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      )
    );
    console.log(
      chalk.white(
        "   • Components: FreeGift selection, popup, and promotion components"
      )
    );
    console.log(
      chalk.white("   • Talons: GraphQL queries and hooks for free gifts")
    );
    console.log(chalk.white("   • Utils: Formatting and time utilities"));
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
      chalk.blue("   import FreeGift from '@components/FreeGift';")
    );
    console.log(
      chalk.blue(
        "   import { useFreeGift } from '@talons/FreeGift/useFreeGift';"
      )
    );
    console.log(
      chalk.blue(
        "   import { useFreeGiftSelection } from '@talons/FreeGift/useFreeGiftSelection';"
      )
    );
    console.log(
      chalk.blue(
        "   import { useGiftPromotions } from '@talons/FreeGift/useGiftPromotions';"
      )
    );

    console.log(chalk.yellow.bold("\n📋 FEATURES:"));
    console.log(
      chalk.gray(
        "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      )
    );
    console.log(
      chalk.white("   • Free gift selection with popup interface")
    );
    console.log(
      chalk.white("   • Gift promotion management and display")
    );
    console.log(
      chalk.white("   • Applied cart rules integration")
    );
    console.log(chalk.white("   • CSS modules for styling"));
    console.log(chalk.white("   • Custom hooks for data fetching"));
    console.log(chalk.white("   • Utility functions for formatting and time"));

    console.log(chalk.cyan.bold("\n" + "=".repeat(60)));
    console.log(
      chalk.green.bold("✅ Free gift components ready to use!")
    );
    console.log(chalk.cyan.bold("=".repeat(60)));
  } catch (error) {
    spinner.fail("Failed to copy free gift components scaffold files");
    throw error;
  }
};
