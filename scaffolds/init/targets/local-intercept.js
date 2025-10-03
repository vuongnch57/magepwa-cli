const path = require('path');
const { Targetables } = require('@magento/pwa-buildpack');
// const defineEnvVariableIntercept = require('./define-env-variable-intercept');
const VeniaResolverPlugin = require('./VeniaResolverPlugin');
const { cachedCleverMerge } = require('webpack/lib/util/cleverMerge');
const extendConfiguredRoute = require('./extend-configured-route');

const packagesToOverride = [
  '@magento/peregrine/lib',
  '@magento/venia-ui/lib',
  '@magento/pagebuilder/lib'
];
const resolverPlugins = [];

packagesToOverride.forEach(function(pkg) {
  const parts = pkg.split('/');
  const namespace = parts[0];
  const packageName = parts[1];
  const mainFolder = parts[2];
  const pluginName = 'shopstack/' + packageName + '-override-resolver';
  const destinationDir = path.resolve(
    __dirname,
    /* '..', */ '..',
    '..',
    'src',
    'overrides',
    packageName
  );
  const sourceDir = path.resolve(
    __dirname,
    /* '..', */ '..',
    '..',
    'node_modules',
    namespace,
    packageName,
    mainFolder
  );

  const myResolverPlugin = new VeniaResolverPlugin({
    name: pluginName,
    projectPath: destinationDir,
    veniaUiModulePath: sourceDir
  });
  resolverPlugins.push(myResolverPlugin);
});

module.exports = targets => {
  const targetables = Targetables.using(targets);

  const webpackCompiler = targets.of('@magento/pwa-buildpack').webpackCompiler;
  webpackCompiler.tap(compiler =>
    compiler.resolverFactory.hooks.resolveOptions
      .for('normal')
      .tap('AddVeniaResolverToWebpackConfig', resolveOptions => {
        const plugin = Object.assign({
          plugins: resolverPlugins
        });
        return cachedCleverMerge(plugin, resolveOptions);
      })
  );

  webpackCompiler.tap(compiler =>
    compiler.resolverFactory.hooks.resolveOptions
      .for('context')
      .tap('AddVeniaResolverToWebpackConfig', resolveOptions => {
        const plugin = Object.assign({
          plugins: resolverPlugins
        });
        return cachedCleverMerge(plugin, resolveOptions);
      })
  );

  const ContextProvider = targetables.reactComponent(
    '@magento/venia-ui/lib/components/App/contextProvider.js'
  );
  const StoreContextProvider = ContextProvider.addImport(
    "StoreContextProvider from 'src/contexts/store'"
  );
  ContextProvider.insertBeforeSource(
    'const ContextProvider = ({ children }) => {',
    `contextProviders.push(${StoreContextProvider});\n`
  );

  //****** add call extend intercept
  // defineEnvVariableIntercept(targets);

  //Create reSend Confirmation Email Page
  // targets.of('@magento/venia-ui').routes.tap(routes => {
  //   routes.push({
  //     name: 'Send Confirmation Link',
  //     pattern: '/customer/account/confirmation',
  //     path: require.resolve(
  //       '../components/ConfirmationEmailPage/confirmationEmailPage'
  //     ),
  //     exact: true
  //   });
  //   return routes;
  // });

  // Create payment failed page
  // targets.of('@magento/venia-ui').routes.tap(routes => {
  //   routes.push({
  //     name: 'Payment failed',
  //     pattern: '/checkout/failed',
  //     path: require.resolve('../components/PaymentFailed'),
  //     exact: true
  //   });
  //   return routes;
  // });

  // Create thank you page
  // targets.of('@magento/venia-ui').routes.tap(routes => {
  //   routes.push({
  //     name: 'Thank you page',
  //     pattern: '/checkout/success',
  //     path: require.resolve('../components/ThankYouPage'),
  //     exact: true
  //   });
  //   return routes;
  // });

  // create router account dashboard
  // targets.of('@magento/venia-ui').routes.tap(routes => {
  //   const customRoutes = [
  //     ['My Account', '/my-account'],
  //     ['My Order', '/order-history'],
  //     ['Address Book', '/address-book'],
  //     ['Order History', '/order-history'],
  //     ['Order Detail', '/order-detail/:orderNumber'],
  //     ['Wishlist', '/wishlist'],
  //     ['Profile Information', '/account-information'],
  //   ];
  //   customRoutes.forEach(route => {
  //     const [name, pattern] = route;
  //     routes.push({
  //       name,
  //       pattern,
  //       exact: true,
  //       authed: true,
  //       path: require.resolve('../components/MyAccount'),
  //       redirectTo: '/sign-in'
  //     });
  //   });
  //   return routes;
  // });

  // Create store locator page
  // targets.of('@magento/venia-ui').routes.tap(routes => {
  //   routes.push({
  //     name: 'Retail Partners',
  //     pattern: '/retail-partners',
  //     path: require.resolve('../components/RetailPartners'),
  //     exact: true
  //   });
  //   return routes;
  // });

  // Create wishlist shared page
  // targets.of('@magento/venia-ui').routes.tap(routes => {
  //   routes.push({
  //     name: 'Wishlist Shared',
  //     pattern: '/wishlist_shared/code/:sharedCode',
  //     path: require.resolve('../components/WishlistShared'),
  //     exact: true
  //   });
  //   return routes;
  // });

  extendConfiguredRoute(targets);
};
