const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk").default;
const ora = require("ora").default;

module.exports = async function taxInvoice({ dir = ".", dest = "src" } = {}) {
  const target = path.resolve(process.cwd(), dir);
  const destination = path.resolve(target, dest);

  // Ensure target directory exists
  await fs.ensureDir(target);
  await fs.ensureDir(destination);

  const spinner = ora(
    "Copying tax invoice components scaffold files"
  ).start();

  try {
    // Source scaffold directory
    const scaffoldDir = path.join(__dirname, "../../scaffolds/tax-invoices");

    // Check if scaffold directory exists
    if (!(await fs.pathExists(scaffoldDir))) {
      throw new Error(`Scaffold directory not found: ${scaffoldDir}`);
    }

    // Copy the entire tax-invoices scaffold to destination
    await fs.copy(scaffoldDir, destination, {
      overwrite: true,
      filter: (src) => {
        // Skip copying if it's the same directory (avoid infinite recursion)
        return src !== destination;
      },
    });

    spinner.succeed(
      "Tax invoice components scaffold files copied successfully"
    );

    // Print success message with details
    console.log(chalk.cyan.bold("\n" + "=".repeat(60)));
    console.log(chalk.cyan.bold("TAX INVOICE COMPONENTS SCAFFOLD APPLIED"));
    console.log(chalk.cyan.bold("=".repeat(60)));

    console.log(chalk.yellow.bold("\n📁 COPIED FILES:"));
    console.log(
      chalk.gray(
        "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      )
    );
    console.log(
      chalk.white(
        "   • Components: TaxInvoice component for checkout page"
      )
    );
    console.log(
      chalk.white("   • Talons: GraphQL queries and hooks for tax invoice")
    );
    console.log(chalk.white("   • Utils: Form validation utilities"));
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
      chalk.blue("   import TaxInvoice from '@components/CheckoutPage/TaxInvoice';")
    );
    console.log(
      chalk.blue(
        "   import { useTaxInvoice } from '@talons/CheckoutPage/TaxInvoice/useTaxInvoice';"
      )
    );
    console.log(
      chalk.blue(
        "   import { validateTaxInvoiceForm } from '@utils/validateForm';"
      )
    );

    console.log(chalk.yellow.bold("\n📋 FEATURES:"));
    console.log(
      chalk.gray(
        "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      )
    );
    console.log(
      chalk.white("   • Tax invoice form with validation")
    );
    console.log(
      chalk.white("   • GraphQL integration for tax invoice data")
    );
    console.log(chalk.white("   • CSS modules for styling"));
    console.log(chalk.white("   • Custom hooks for data fetching"));
    console.log(chalk.white("   • Form validation utilities"));

    console.log(chalk.cyan.bold("\n" + "=".repeat(60)));
    console.log(
      chalk.green.bold("✅ Tax invoice components ready to use!")
    );
    console.log(chalk.cyan.bold("=".repeat(60)));
  } catch (error) {
    spinner.fail("Failed to copy tax invoice components scaffold files");
    throw error;
  }
};
