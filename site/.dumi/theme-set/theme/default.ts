import { G2 } from '@antv/g2plot';
import _ from 'lodash';

// G2 白天主题 backgroud=transparent 会造成react-color组件颜色透明度为0
export const LIGHT_THEME: any = {
  // 暂时不暴露 geometries 的主题设置
  ..._.omit(G2.getTheme('light'), ['geometries']),
  background: '#ffffff',
};
export const DARK_THEME = {
  // 暂时不暴露 geometries 的主题设置
  ..._.omit(G2.getTheme('dark'), ['geometries']),
};
