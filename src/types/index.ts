export * from './annotation';
export * from './attr';
export * from './axis';
export * from './button';
export * from './common';
export * from './interaction';
export * from './locale';
export * from './meta';
export * from './state';
export * from './statistic';
export * from './tooltip';

/** 去除 readonly 修饰 */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };
