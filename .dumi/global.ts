/**
 * 增加自己的全局变量，用于 DEMO 中的依赖
 */

if (window) {
  (window as any).g2plot = require('../src/index.ts');
  (window as any).util = require('@antv/util');
  (window as any).G = require('@antv/g-canvas');
  (window as any).react = require('react');
  (window as any).reactDom = require('react-dom');
  (window as any).antd = require('antd');
  (window as any).chromaJs = require('chroma-js');
  (window as any).rcForPlots = require('rc-for-plots');
  require('antd/lib/alert/style/index.css');
}
