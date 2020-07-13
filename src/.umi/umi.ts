// @ts-nocheck
import './core/polyfill';
import '@@/core/devScripts';
import { plugin } from './core/plugin';
import { createHistory } from './core/history';
import { ApplyPluginsType } from '/Users/lf/publicWorkspaces/G2Plot/node_modules/_@umijs_runtime@3.2.9@@umijs/runtime';
import { renderClient } from '/Users/lf/publicWorkspaces/G2Plot/node_modules/_@umijs_renderer-react@3.2.9@@umijs/renderer-react/dist/index.js';

const getClientRender = (args: { hot?: boolean } = {}) =>
  plugin.applyPlugins({
    key: 'render',
    type: ApplyPluginsType.compose,
    initialValue: () => {
      return renderClient({
        // @ts-ignore
        routes: require('./core/routes').routes,
        plugin,
        history: createHistory(args.hot),
        isServer: process.env.__IS_SERVER,
        rootElement: 'root',
        defaultTitle: `G2Plot`,
      });
    },
    args,
  });

const clientRender = getClientRender();
export default clientRender();

window.g_umi = {
  version: '3.2.9',
};

// hot module replacement
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./core/routes', () => {
    getClientRender({ hot: true })();
  });
}
