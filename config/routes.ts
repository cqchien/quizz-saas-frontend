/**
 * Routing configuration for @name umi
 * @description only supports the configuration of path,component,routes,redirect,wrappers,title
 * @param path path only supports two placeholder configurations, the first is the dynamic parameter :id form, the second is the * wildcard, which can only appear at the end of the routing string.
 * @param component configures the React component path used for rendering after location and path match. It can be an absolute path or a relative path. If it is a relative path, it will start from src/pages.
 * @param routes Configure sub-routes, usually used when you need to add layout components for multiple routes.
 * @param redirect configure routing jump
 * @param wrappers Configure the wrapper component of the routing component, through which more functions can be combined for the current routing component. For example, it can be used for routing-level permission verification.
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/login',
    component: './Welcome',
  },
  {
    path: '*',
    component: './404',
  },
];
