import { isUndefined, isFunction, isObject, isString, isArray, isNumber } from '@antv/util';
import { Datum } from '@antv/g2/lib/interface';
import { Params } from '../../core/adaptor';
import { ColorAttr, ShapeAttr, SizeAttr, StyleAttr, Options } from '../../types';

/**
 * 图形映射属性，按照优先级来的
 */
export type MappingOptions = {
  /** point color 映射 */
  readonly color?: ColorAttr;
  /** point shape 映射 */
  readonly shape?: ShapeAttr;
  /** 大小映射, 提供回调的方式 */
  readonly size?: SizeAttr;
  /** 样式映射 */
  readonly style?: StyleAttr;
};

export interface GeometryOptions extends Options {
  /** geometry 类型 */
  readonly type: string;
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly colorField?: string;
  /** shape 的映射字段 */
  readonly shapeField?: string;
  /** size 映射字段 */
  readonly sizeField?: string;
  /** style 的映射字段 */
  readonly styleField?: string;
  /** 图形映射规则 */
  readonly mapping: MappingOptions;
  /** geometry params */
  readonly args?: any;
}

/**
 * 获得映射的字段列表
 * @param options
 * @param field
 */
export function getMappingField(o: GeometryOptions, field: 'color' | 'shape' | 'size' | 'style'): string[] {
  const { xField, yField, colorField, shapeField, sizeField, styleField } = o;
  const fields = [xField, yField, colorField, shapeField, sizeField, styleField];

  // 一定能找到的！
  const idx = ['x', 'y', 'color', 'shape', 'size', 'style'].indexOf(field);

  const f = fields[idx];
  // 删除当前字段
  fields.splice(idx, 1);
  // 插入到第一个
  fields.unshift(f);

  return fields;
}

/**
 * 获得映射函数
 * @param mappingFields
 * @param func
 */
export function getMappingFunction(mappingFields: string[], func: (datum: Datum) => any) {
  // 返回函数
  return (...args: any[]) => {
    const params: Datum = {};

    mappingFields.forEach((f: string, idx: number) => {
      params[f] = args[idx];
    });

    // 删除 undefined
    delete params['undefined'];

    return func(params);
  };
}

/**
 * 通用 geometry 的配置处理的 adaptor
 * @param params
 */
export function geometry<O extends GeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { type, args, mapping, xField, yField, colorField, shapeField, sizeField, styleField } = options;

  // 如果没有 mapping 信息，那么直接返回
  if (!mapping) {
    return params;
  }

  const { color, shape, size, style } = mapping;

  // 创建 geometry
  const geometry = chart[type](args).position(`${xField}*${yField}`);

  /**
   * color 的几种情况
   * g.color('red');
   * g.color('color', ['red', 'blue']);
   * g.color('x*y', (x, y) => 'red');
   * g.color('color*x*y', (color, x, y) => 'red');
   */
  if (isString(color)) {
    geometry.color(color);
  } else if (isFunction(color)) {
    const mappingFields = getMappingField(options, 'color');
    geometry.color(mappingFields.join('*'), getMappingFunction(mappingFields, color));
  } else if (colorField) {
    geometry.color(colorField, isArray(color) ? color : undefined);
  }

  /**
   * shape 的几种情况
   * g.shape('rect');
   * g.shape('shape', ['rect', 'circle']);
   * g.shape('x*y', (x, y) => 'rect');
   * g.shape('shape*x*y', (shape, x, y) => 'rect');
   */
  if (isString(shape)) {
    geometry.shape(shape);
  } else if (isFunction(shape)) {
    const mappingFields = getMappingField(options, 'shape');
    geometry.shape(mappingFields.join('*'), getMappingFunction(mappingFields, shape));
  } else if (shapeField) {
    geometry.shape(shapeField, isArray(shape) ? shape : undefined);
  }

  /**
   * size 的几种情况
   * g.size(10);
   * g.size('size', [10, 20]);
   * g.size('x*y', (x, y) => 10);
   * g.color('size*x*y', (size, x, y) => 1-);
   */
  if (isNumber(size)) {
    geometry.size(size);
  } else if (isFunction(size)) {
    const mappingFields = getMappingField(options, 'size');
    geometry.size(mappingFields.join('*'), getMappingFunction(mappingFields, size));
  } else if (sizeField) {
    geometry.size(sizeField, isArray(size) ? size : undefined);
  }

  /**
   * style 的几种情况
   * g.style({ fill: 'red' });
   * g.style('x*y*color', (x, y, color) => ({ fill: 'red' }));
   */
  if (isFunction(style)) {
    const mappingFields = getMappingField(options, 'style');
    geometry.style(mappingFields.join('*'), getMappingFunction(mappingFields, style));
  } else if (isObject(style)) {
    geometry.style(style);
  }

  // 防止因为 x y 字段做了通道映射，导致生成图例
  [xField, yField]
    .filter((f: string) => f !== colorField)
    .forEach((f: string) => {
      chart.legend(f, false);
    });
  return params;
}
