export * from './common';
export * from './tooltip';
export * from './state';
export * from './attr';
export * from './statistic';
export * from './meta';
export * from './axis';
export * from './interaction';
export * from './annotation';
export * from './locale';
export * from './button';

/** 去除 readonly 修饰 */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };
