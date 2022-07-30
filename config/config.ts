// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

const { REACT_APP_ENV, API_URL } = process.env;

export default defineConfig({
  /**
   * @name enables hash mode
   * @description Make the product after build include the hash suffix.
   * Typically used for incremental publishing and to avoid browser load caching.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,
  dva: {},
  define: {
    REACT_APP_ENV,
    API_URL: API_URL || '',
  },
  /**

  /**
   * @name routing configuration, files not imported in routing will not be compiled
   * @description only supports the configuration of path, component, routes, redirect, wrappers, title
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name theme configuration
   * @description is called a theme, but it's just a variable setting of less
   * @doc antd theme settings https://ant.design/docs/react/customize-theme-cn
   * @doc umi's theme configuration https://umijs.org/docs/api/config#theme
   */
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    'root-entry-name': 'variable',
    ...theme,
  },
  title: defaultSettings.title as string,
  /**
   * Internationalization configuration for @name moment
   * @description If there is no requirement for internationalization, it can reduce the package size of js after opening
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name proxy configuration
   * @description allows your local server to proxy to your server so you can access the server's data
   * @see Note that the following proxies can only be used during local development, not after build.
   * @doc Introduction to proxy https://umijs.org/docs/guides/proxy
   * @doc proxy configuration https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  }
  /**
   * @name fast hot update configuration
   * @description A nice hot update component that preserves state when updating
   */,
  fastRefresh: true,
  //============== The following are max plugin configurations ================
  /**
   * @name dataflow plugin
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * A global initial data stream that can be used to share data between plugins
   * @description can be used to store some global data, such as user information, or some global state. The global initial state is created at the very beginning of the entire Umi project.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6% E6%80%81
   */
  initialState: {},
  /**
   * @name layout plugin
   * @doc https://umijs.org/docs/max/layout-menu
   */
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  /**
   * @name internationalization plugin
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'en-US',
    antd: false,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name antd plugin
   * @description built-in babel import plugin
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name network request configuration
   * @description It provides a unified network request and error handling scheme based on useRequest of axios and ahooks.
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name permission plugin
   * @description permission plugin based on initialState, initialState must be opened first
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  //================ pro plugin configuration ==================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI plugin configuration
   * @description Generate serve and mock based on openapi's specification, which can reduce a lot of boilerplate code
   * @doc https://pro.ant.design/en-us/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // or use the online version
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
});
