# MagePWA CLI

A powerful CLI tool to enhance existing Magento PWA Studio projects with custom scaffolds and development features.

## 🎯 Motivation

After working on numerous Magento PWA Studio projects, we've discovered that the built-in **targetables** system, while powerful, presents significant challenges for developers:

- **Complex Debugging**: Targetables make it extremely difficult to trace and debug code execution paths
- **Poor Readability**: The abstraction layer makes it hard to understand what's actually happening in your application
- **Maintenance Overhead**: Complex targetable configurations become difficult to maintain over time
- **Developer Experience**: The learning curve is steep and the development workflow is not intuitive

**Our Solution**: After extensive real-world experience, we've concluded that **component overriding** is the most effective approach for customizing Magento PWA Studio applications. This method provides:

- ✅ **Clear Code Paths**: Direct file-based overrides that are easy to follow and debug
- ✅ **Better Maintainability**: Simple file structure that's easy to understand and modify
- ✅ **Improved Developer Experience**: Familiar patterns that any React developer can quickly grasp
- ✅ **Enhanced Debugging**: Clear stack traces and straightforward code navigation

MagePWA CLI streamlines this override-based approach by providing pre-configured scaffolds and development tools that make working with Magento PWA Studio much more enjoyable and productive.

## 🚀 Features

- **Project Enhancement**: Add pre-configured files and structure to existing Magento PWA projects
- **Thailand Regions Components**: Ready-to-use District and SubDistrict components with GraphQL integration
- **Custom Build Targets**: Enhanced webpack configuration with custom interceptors and resolvers
- **Override System**: Ready-to-use override directories for venia-ui, peregrine, and pagebuilder
- **Store Context**: Global store configuration context for easy access throughout your app
- **Tailwind Integration**: Pre-configured Tailwind CSS setup with custom theme configuration
- **Import Aliases**: Clean import paths with webpack aliases for better code organization
- **Development Server**: Enhanced development server with custom configurations
- **Environment Checks**: Built-in doctor command to verify prerequisites

## 📦 Installation

```bash
npm install -g magepwa-cli
```

## 🛠️ Usage

### Add scaffolds to existing Magento PWA project

```bash
# Navigate to your existing Magento PWA project
cd your-magento-pwa-project

# Run the init command to add scaffolds
magepwa init
```

This command will:
- Set up custom scaffolds and configurations in your existing project
- Create override directories for customizations
- Configure webpack aliases and Tailwind CSS
- Set up store context for global configuration
- Copy pre-configured build targets and interceptors
- Set up development server configuration

### Available Commands

```bash
magepwa init          # Add scaffolds to existing Magento PWA project
magepwa regions       # Copy Thailand regions scaffold files (components, talons, styles)
magepwa doctor        # Check environment prerequisites (Node.js, npx)
magepwa --help        # Show help information
```

**Note**: The `apply` command is referenced in the CLI but not yet implemented.

### Add Thailand regions components to your project

```bash
# Copy regions scaffold to current directory's src folder (default)
magepwa regions

# Copy to a specific project directory
magepwa regions --dir /path/to/project

# Copy to a custom destination folder
magepwa regions --dir /path/to/project --dest components

# Copy to current directory with custom destination
magepwa regions --dest src/components
```

This command will:
- Copy District and SubDistrict address components
- Include GraphQL queries and hooks for regions
- Add CSS modules for component styling
- Provide ready-to-use React components for Thailand address management

#### Regions Command Options

- `-d, --dir <path>` - Target directory to copy files to (default: ".")
- `--dest <path>` - Destination subdirectory within target directory (default: "src")

#### Usage Example

```javascript
// Import the components in your React components
import District from '@components/Address/District';
import SubDistrict from '@components/Address/SubDistrict';
import { useDistrict } from '@talons/Address/District/useDistrict';
import { useSubDistrict } from '@talons/Address/SubDistrict/useSubDistrict';

// Use in your component
const AddressForm = () => {
  const { districts, loading } = useDistrict();
  const { subDistricts, loading: subLoading } = useSubDistrict(selectedDistrict);
  
  return (
    <div>
      <District 
        districts={districts} 
        loading={loading}
        onSelect={setSelectedDistrict}
      />
      <SubDistrict 
        subDistricts={subDistricts}
        loading={subLoading}
        onSelect={setSelectedSubDistrict}
      />
    </div>
  );
};
```

## 🏗️ Project Structure

After running `magepwa init` in your existing Magento PWA project, it will add:

```
src/
├── targets/           # Custom build targets and interceptors
│   ├── local-intercept.js
│   ├── VeniaResolverPlugin.js
│   └── extend-configured-route.js
├── contexts/          # Store context configuration
│   └── store.js
├── overrides/         # Component override directories
│   ├── venia-ui/     # Venia UI overrides
│   ├── peregrine/    # Peregrine overrides
│   └── pagebuilder/  # Page Builder overrides
└── ...

# Root level configuration files
├── serve.js           # Development server configuration
├── theme.js           # Theme configuration with Tailwind
├── tailwind.config.js # Tailwind CSS configuration
├── webpack.config.js  # Enhanced webpack configuration
└── upward.yml         # Upward configuration
```

## 🔧 Override System

The CLI supports overriding components from three main modules:

### 1. Venia UI Components
Create files with the exact same path as the original:
```
src/overrides/venia-ui/components/AccountChip/accountChip.js
```

### 2. Peregrine Hooks
Override talons and utilities:
```
src/overrides/peregrine/talons/AccountMenu/useAccountMenu.js
```

### 3. Page Builder Components
Customize Page Builder elements:
```
src/overrides/pagebuilder/ContentTypes/ButtonItem/buttonItem.js
```

## 🌐 Store Context

Access store configuration anywhere in your app:

```javascript
import { useStoreContext } from '@contexts/store';

const MyComponent = () => {
  const { product_url_suffix, store_code } = useStoreContext();
  // Use store configuration
};
```

## ⚙️ Build Configuration

The CLI sets up enhanced build configuration:

### Custom Webpack Configuration
- **Import Aliases**: Clean import paths for better code organization
- **Custom Resolvers**: Enhanced module resolution for Magento PWA
- **Build Targets**: Custom interceptors and route extensions

### Development Server
- **Custom Serve Configuration**: Enhanced development server setup
- **Hot Reloading**: Optimized for Magento PWA development
- **Proxy Configuration**: Ready for Magento backend integration

### Tailwind CSS Integration
- **Pre-configured Theme**: Custom theme configuration
- **Magento-specific Classes**: Tailored for Magento PWA components
- **Build Optimization**: Optimized for production builds

## 🎨 Import Aliases

Use these aliases for cleaner imports:

- `@` - src directory
- `@components` - src/components
- `@utils` - src/utils
- `@hooks` - src/hooks
- `@talons` - src/talons
- `@overrides` - src/overrides
- `@i18n` - src/i18n

## 📋 Requirements

- Node.js >= 18.0.0
- npm or yarn package manager
- npx (usually included with npm)

## 🔍 What's Included

### Pre-configured Files
- **serve.js**: Enhanced development server configuration
- **theme.js**: Tailwind CSS theme configuration
- **tailwind.config.js**: Complete Tailwind setup
- **webpack.config.js**: Enhanced webpack configuration with aliases
- **upward.yml**: Upward configuration for PWA

### Build Targets
- **local-intercept.js**: Custom request interceptor
- **VeniaResolverPlugin.js**: Enhanced module resolver
- **extend-configured-route.js**: Route extension utilities

### Store Context
- **store.js**: Global store configuration context
- Ready-to-use React context for store settings

### Thailand Regions Scaffold
- **District Component**: React component for district selection
- **SubDistrict Component**: React component for sub-district selection
- **GraphQL Queries**: Ready-to-use GraphQL queries for regions data
- **Custom Hooks**: useDistrict and useSubDistrict hooks for data fetching
- **CSS Modules**: Styled components with CSS modules

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Magento PWA Studio community
- Inspired by modern CLI development practices
- Thanks to all contributors and users

## 📞 Support

- [GitHub Issues](https://github.com/vuongnch57/magepwa-cli/issues)
- [Documentation](https://github.com/vuongnch57/magepwa-cli#readme)

---

Made with ❤️ for the Magento PWA community
