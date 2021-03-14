import { ShapeAttrs } from '@antv/g-base';
import { Datum } from './common';

/** 图形属性 */
export type ShapeStyle = ShapeAttrs;

/** 颜色映射 */
export type ColorAttr = string | string[] | ((datum: Datum) => string);
/** 尺寸大小映射 */
export type SizeAttr = number | [number, number] | ((datum: Datum) => number);
/** 图形 shape 映射 */
export type ShapeAttr = string | string[] | ((datum: Datum) => string);
/** 图形样式 style 映射 */
export type StyleAttr = ShapeStyle | ((datum: Datum) => ShapeStyle);
/** tooltip 的回调 */
export type TooltipAttr = (datum: Datum) => { name: string; value: string | number };
