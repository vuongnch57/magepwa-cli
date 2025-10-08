# MagePWA CLI

A powerful CLI tool to enhance existing Magento PWA Studio projects with custom scaffolds and development features.

## 🎯 Why MagePWA CLI?

Magento PWA Studio's **targetables** system can be complex and hard to debug. MagePWA CLI provides a simpler **component override** approach that offers:

- ✅ **Clear Code Paths**: Direct file-based overrides that are easy to follow and debug
- ✅ **Better Maintainability**: Simple file structure that's easy to understand and modify
- ✅ **Improved Developer Experience**: Familiar patterns that any React developer can quickly grasp
- ✅ **Enhanced Debugging**: Clear stack traces and straightforward code navigation

## 🚀 Features

- **Project Enhancement**: Add pre-configured files and structure to existing Magento PWA projects
- **Regions Manager Components**: Ready-to-use District and SubDistrict components with GraphQL integration
- **Override System**: Ready-to-use override directories for venia-ui, peregrine, and pagebuilder
- **Store Context**: Global store configuration context for easy access throughout your app
- **Tailwind Integration**: Pre-configured Tailwind CSS setup with custom theme configuration
- **Import Aliases**: Clean import paths with webpack aliases for better code organization

## 📦 Installation

```bash
npm install -g magepwa-cli
```

## 🛠️ Quick Start

### 1. Initialize your Magento PWA project

```bash
# Navigate to your existing Magento PWA project
cd your-magento-pwa-project

# Add scaffolds and configurations
magepwa init
```

### 2. Add regions components (optional)

```bash
# Copy regions scaffold to your project
magepwa regions
```

### 3. Available Commands

```bash
magepwa init          # Add scaffolds to existing Magento PWA project
magepwa regions       # Copy regions manager scaffold files
magepwa doctor        # Check environment prerequisites
magepwa --help        # Show help information
```

## 📋 Requirements

- Node.js >= 18.0.0
- npm or yarn package manager
- npx (usually included with npm)

## 📚 Documentation

For detailed documentation, examples, and advanced usage, visit our [GitHub Pages documentation](https://vuongnch57.github.io/magepwa-cli/).

The documentation includes:
- Complete setup guides
- Override system details
- Import aliases reference
- Build configuration options
- Regions components usage
- Store context implementation
- Troubleshooting guide

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- [GitHub Issues](https://github.com/vuongnch57/magepwa-cli/issues)
- [Documentation](https://vuongnch57.github.io/magepwa-cli/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ for the Magento PWA community
