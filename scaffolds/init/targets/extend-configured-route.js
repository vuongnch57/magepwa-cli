const { Targetables } = require('@magento/pwa-buildpack');

module.exports = targets => {
  const targetables = Targetables.using(targets);

  const appRouter = targetables.reactComponent(
    '@magento/venia-ui/lib/components/Routes/routes.js'
  );

  appRouter.insertAfterSource('const Routes = (', `props`);

  appRouter.insertAfterSource(
    'useLocation();',
    `\n
  const { customRoutes } = props || {};\n
  `
  );

  appRouter.insertAfterSource(
    '<Switch>',
    `
    {(customRoutes || []).map((route, index) => {
      const { Component, pattern, name, exact, redirectTo, authed } = route;
      const props = {
        exact,
        redirectTo: authed && redirectTo || '' ,
        path: pattern
      };
      return authed ?  (
        <AuthRoute {...props} key={index}>
          <Component/>
        </AuthRoute>
      ) : (
        <Route {...props} key={index}>
          <Component/>
        </Route>
      )
    })}
  `
  );
};
