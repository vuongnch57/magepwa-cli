# MagePWA CLI Documentation

Welcome to the comprehensive documentation for MagePWA CLI. This guide covers everything you need to know to get started and make the most of the tool.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Override System](#override-system)
4. [Store Context](#store-context)
5. [Build Configuration](#build-configuration)
6. [Regions Components](#regions-components)
7. [Tax Invoice Components](#tax-invoice-components)
8. [Import Aliases](#import-aliases)
9. [Troubleshooting](#troubleshooting)

## Getting Started

### Installation

```bash
npm install -g magepwa-cli
```

### Quick Setup

1. Navigate to your existing Magento PWA project
2. Run the initialization command
3. Start developing with enhanced tooling

```bash
cd your-magento-pwa-project
magepwa init
```

### Available Commands

```bash
magepwa init          # Add scaffolds to existing Magento PWA project
magepwa regions       # Copy regions manager scaffold files
magepwa tax-invoice   # Copy tax invoice scaffold files
magepwa doctor        # Check environment prerequisites
magepwa --help        # Show help information
```

## Project Structure

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

## Override System

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

## Store Context

Access store configuration anywhere in your app:

```javascript
import { useStoreContext } from '@contexts/store';

const MyComponent = () => {
  const { product_url_suffix, store_code } = useStoreContext();
  // Use store configuration
};
```

## Build Configuration

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

## Regions Components

### Adding Regions Components

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

### Regions Command Options

- `-d, --dir <path>` - Target directory to copy files to (default: ".")
- `--dest <path>` - Destination subdirectory within target directory (default: "src")

### Usage Example

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

## Tax Invoice Components

### Adding Tax Invoice Components

```bash
# Copy tax invoice scaffold to current directory's src folder (default)
magepwa tax-invoice

# Copy to a specific project directory
magepwa tax-invoice --dir /path/to/project

# Copy to a custom destination folder
magepwa tax-invoice --dir /path/to/project --dest components

# Copy to current directory with custom destination
magepwa tax-invoice --dest src/components
```

### Tax Invoice Command Options

- `-d, --dir <path>` - Target directory to copy files to (default: ".")
- `--dest <path>` - Destination subdirectory within target directory (default: "src")

### Usage Example

```javascript
// Import the components in your React components
import TaxInvoice from '@components/CheckoutPage/TaxInvoice';
import { useTaxInvoice } from '@talons/CheckoutPage/TaxInvoice/useTaxInvoice';
import { validateTaxInvoiceForm } from '@utils/validateForm';

// Use in your component
const CheckoutPage = () => {
  const { taxInvoiceData, loading, submitTaxInvoice } = useTaxInvoice();
  
  return (
    <div>
      <TaxInvoice 
        data={taxInvoiceData}
        loading={loading}
        onSubmit={submitTaxInvoice}
        validate={validateTaxInvoiceForm}
      />
    </div>
  );
};
```

### Tax Invoice Features

- **Tax Invoice Form**: Complete form with validation for tax invoice data
- **GraphQL Integration**: Ready-to-use GraphQL queries for tax invoice operations
- **Form Validation**: Built-in validation utilities for tax invoice forms
- **CSS Modules**: Styled components with CSS modules
- **Custom Hooks**: useTaxInvoice hook for data fetching and form handling

## Import Aliases

Use these aliases for cleaner imports:

- `@` - src directory
- `@components` - src/components
- `@utils` - src/utils
- `@hooks` - src/hooks
- `@talons` - src/talons
- `@overrides` - src/overrides
- `@i18n` - src/i18n

## What's Included

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

### Regions Manager Scaffold
- **District Component**: React component for district selection
- **SubDistrict Component**: React component for sub-district selection
- **GraphQL Queries**: Ready-to-use GraphQL queries for regions data
- **Custom Hooks**: useDistrict and useSubDistrict hooks for data fetching
- **CSS Modules**: Styled components with CSS modules

### Tax Invoice Scaffold
- **TaxInvoice Component**: React component for tax invoice form
- **GraphQL Queries**: Ready-to-use GraphQL queries for tax invoice operations
- **Form Validation**: Built-in validation utilities for tax invoice forms
- **Custom Hooks**: useTaxInvoice hook for data fetching and form handling
- **CSS Modules**: Styled components with CSS modules

## Troubleshooting

### Common Issues

1. **Node.js Version**: Ensure you're using Node.js >= 18.0.0
2. **Permission Issues**: Use `sudo` if needed for global installation
3. **Path Issues**: Make sure you're in the correct Magento PWA project directory

### Environment Check

Use the doctor command to verify your environment:

```bash
magepwa doctor
```

This will check:
- Node.js version
- npm/npx availability
- Required dependencies

### Getting Help

- [GitHub Issues](https://github.com/vuongnch57/magepwa-cli/issues)
- [Documentation](https://vuongnch57.github.io/magepwa-cli/)

## Requirements

- Node.js >= 18.0.0
- npm or yarn package manager
- npx (usually included with npm)
