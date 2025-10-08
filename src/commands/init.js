const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk").default;
const ora = require("ora").default;
const { execaStreaming } = require("../utils/run");

module.exports = async function init({ dir = "." } = {}) {
  const target = path.resolve(process.cwd(), dir);
  await fs.ensureDir(target);

  // 1) Run the official interactive installer with stdio inherited
  // so the dev can answer prompts "as normal".
//   console.log(
//     chalk.cyan("→ Launching Magento PWA Studio installer (interactive)...")
//   );
//   await execaStreaming("npx", ["@magento/create-pwa@latest"], { cwd: target });

  // 2) Add scaffolds
  const spinner = ora("Adding magepwa scaffolds").start();
  try {
    const metaDir = path.join(target, ".magepwa");
    const srcDir = path.join(target, "src");
    await fs.ensureDir(metaDir);
    await fs.ensureDir(srcDir);

    // Copy targets folder from CLI scaffolds to destination src
    const cliTargetsDir = path.join(__dirname, "../../scaffolds/init/targets");
    const cliContextDir = path.join(__dirname, "../../scaffolds/init/contexts");
    const destTargetsDir = path.join(srcDir, "targets");
    const destContextsDir = path.join(srcDir, "contexts");
    await fs.copy(cliTargetsDir, destTargetsDir);
    await fs.copy(cliContextDir, destContextsDir);
    
    // Create empty override folders
    const overrideFolders = [
      "overrides/venia-ui",
      "overrides/peregrine", 
      "overrides/pagebuilder"
    ];
    
    for (const folder of overrideFolders) {
      const overridePath = path.join(srcDir, folder);
      await fs.ensureDir(overridePath);
    }
    
    // Copy scaffold files to project root
    const scaffoldFiles = [
      "serve.js",
      "tailwind.config.js", 
      "theme.js",
      "upward.yml",
      "webpack.config.js",
      "jsconfig.json"
    ];
    
    for (const file of scaffoldFiles) {
      const sourceFile = path.join(__dirname, "../../scaffolds/init", file);
      const destFile = path.join(target, file);
      if (await fs.pathExists(sourceFile)) {
        await fs.copy(sourceFile, destFile);
      }
    }

    // Update package.json to fix local-intercept.js path
    const packageJsonPath = path.join(target, "package.json");
    console.log(`Looking for package.json at: ${packageJsonPath}`);
    
    if (await fs.pathExists(packageJsonPath)) {
      console.log('Package.json found, reading...');
      const packageJson = await fs.readJson(packageJsonPath);
      
      let updated = false;
      
      // Check pwa-studio.targets.intercept field
      if (packageJson['pwa-studio'] && packageJson['pwa-studio'].targets && packageJson['pwa-studio'].targets.intercept) {
        const currentPath = packageJson['pwa-studio'].targets.intercept;
        console.log(`Found pwa-studio.targets.intercept: ${currentPath}`);
        
        if (currentPath === './local-intercept.js' || currentPath === 'local-intercept.js') {
          packageJson['pwa-studio'].targets.intercept = 'src/targets/local-intercept.js';
          updated = true;
          console.log(`Updated pwa-studio.targets.intercept: ${currentPath} -> src/targets/local-intercept.js`);
        }
      }
      
      // Also check scripts section for any local-intercept.js references
      if (packageJson.scripts) {
        console.log('Checking scripts section...');
        for (const [scriptName, scriptCommand] of Object.entries(packageJson.scripts)) {
          if (typeof scriptCommand === 'string') {
            // Check for various patterns of local-intercept.js references
            const patterns = [
              './local-intercept.js',
              'local-intercept.js',
              './local-intercept',
              'local-intercept'
            ];
            
            for (const pattern of patterns) {
              if (scriptCommand.includes(pattern)) {
                const newCommand = scriptCommand.replace(pattern, 'src/targets/local-intercept.js');
                packageJson.scripts[scriptName] = newCommand;
                updated = true;
                console.log(`Updated script '${scriptName}': ${scriptCommand} -> ${newCommand}`);
                break; // Only replace the first match
              }
            }
          }
        }
      }
      
      if (updated) {
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        console.log('Package.json updated successfully');
      } else {
        console.log('No local-intercept.js references found in package.json');
      }
    } else {
      console.log('Package.json not found at target location');
    }

    await fs.writeFile(
      path.join(metaDir, "config.json"),
      JSON.stringify(
        { version: 1, createdAt: new Date().toISOString() },
        null,
        2
      )
    );

    spinner.succeed("Magepwa scaffolds added");
    
    // Print detailed instructions
    console.log(chalk.cyan.bold("\n" + "=".repeat(60)));
    console.log(chalk.cyan.bold("📋 USAGE INSTRUCTIONS"));
    console.log(chalk.cyan.bold("=".repeat(60)));
    
    console.log(chalk.yellow.bold("\n🔧 1. OVERRIDE METHODS"));
    console.log(chalk.gray("   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(chalk.white("   Support 3 modules: ") + chalk.green.bold("venia-ui, peregrine, pagebuilder"));
    console.log(chalk.white("   Create files with the exact same path from the original module"));
    console.log(chalk.white("   Example: To override AccountChip component:"));
    console.log(chalk.blue("   📁 src/overrides/venia-ui/components/AccountChip/accountChip.js"));
    console.log(chalk.gray("   ⚠️  It replaces the exact file (no need to override index.js)"));
    console.log(chalk.white("   📋 Copy content from node_modules and update imports to @magento modules"));
    console.log(chalk.red("   ❌ Don't use local paths in imports"));
    
    console.log(chalk.yellow.bold("\n🌐 2. STORE CONTEXT"));
    console.log(chalk.gray("   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(chalk.white("   Added context for store config - use anywhere in your app"));
    console.log(chalk.blue("   💡 Example: ") + chalk.green("const { product_url_suffix } = useStoreContext();"));
    
    console.log(chalk.yellow.bold("\n🎨 3. TAILWIND CONFIGURATION"));
    console.log(chalk.gray("   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(chalk.white("   Configure Tailwind CSS in ") + chalk.blue("theme.js") + chalk.white(" file"));
    
    console.log(chalk.yellow.bold("\n🔗 4. IMPORT ALIASES"));
    console.log(chalk.gray("   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(chalk.white("   Available aliases for cleaner imports:"));
    console.log(chalk.green("   • @") + chalk.gray("           → src directory"));
    console.log(chalk.green("   • @components") + chalk.gray("  → src/components"));
    console.log(chalk.green("   • @utils") + chalk.gray("      → src/utils"));
    console.log(chalk.green("   • @hooks") + chalk.gray("      → src/hooks"));
    console.log(chalk.green("   • @talons") + chalk.gray("     → src/talons"));
    console.log(chalk.green("   • @overrides") + chalk.gray("  → src/overrides"));
    console.log(chalk.green("   • @i18n") + chalk.gray("      → src/i18n"));
    
    console.log(chalk.cyan.bold("\n" + "=".repeat(60)));
    console.log(chalk.green.bold("🚀 Ready to start building your Magento PWA!"));
    console.log(chalk.cyan.bold("=".repeat(60)));
  } catch (e) {
    spinner.fail("Failed to add magepwa scaffolds");
    throw e;
  }
};
