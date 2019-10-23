// // defaultTheme 必须首先注册
// import defaultTheme from './default';
//
// import Theme from './theme';
//
// export { Theme as default, defaultTheme };

// 全局主题的方法
export { getGlobalTheme, registerGlobalTheme } from './global';
// 图表主题的方法
export { getTheme, registerTheme } from './theme';
// 工具函数
export { convertToG2Theme } from './utils';
