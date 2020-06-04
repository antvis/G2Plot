// // defaultTheme 必须首先注册
// import defaultTheme from './default';
//
// import Theme from './theme';
//
// export { Theme as default, defaultTheme };

// template方法
export { applyTemplate } from './template';

// 全局主题的方法
export { getGlobalTheme, registerGlobalTheme } from './global';
// 图表主题的方法
export { getTheme, registerTheme } from './theme';
// 工具函数
export { convertToG2Theme } from './utils';
// 色板方法
export { getColorPalette, registerColorPalette } from './color';
