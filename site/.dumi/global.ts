require('./style.css');
require('./github-markdown-light.css');
require('./prism-one-light.css');

if (window) {
  (window as any).g2plot = require('../../src');
  (window as any).util = require('@antv/util');
  (window as any).react = require('react');
  (window as any).reactDom = require('react-dom');
  (window as any).antd = require('antd');
  (window as any).chromaJs = require('chroma-js');
  (window as any).rcForPlots = require('rc-for-plots');
  require('antd/lib/alert/style/index.css');
}

if (location.origin === 'g2plot.antv.vision' || location.origin === 'antv-g2plot.gitee.io') {
  (window as any).location.href = location.href.replace(location.origin, 'https://g2plot.antv.antgroup.com');
}
