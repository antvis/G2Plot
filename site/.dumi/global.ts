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