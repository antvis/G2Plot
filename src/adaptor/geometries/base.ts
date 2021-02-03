import { uniq, isFunction, isObject, isString, isNumber, isEmpty } from '@antv/util';
import { Params } from '../../core/adaptor';
import { ColorAttr, ShapeAttr, SizeAttr, StyleAttr, TooltipAttr, Options, Datum } from '../../types';
import { Label } from '../../types/label';
import { State } from '../../types/state';
import { transformLabel } from '../../utils';

/**
 * 图形映射属性，按照优先级来的
 */
export type MappingOptions = {
  /** color 映射 */
  readonly color?: ColorAttr;
  /** shape 映射 */
  readonly shape?: ShapeAttr;
  /** 大小映射, 提供回调的方式 */
  readonly size?: SizeAttr;
  /** 样式映射 */
  readonly style?: StyleAttr;
  /** tooltip 映射 */
  readonly tooltip?: TooltipAttr;
};

/**
 * 一个图形映射的逻辑，纯粹的图形语法
 * // TODO 后续需要处理 adjust 的配置，然后通过 field 信息。比如 styleField，labelField 等一定是一个数组形式
 */
export type Geometry = {
  /** geometry 类型, 'line' | 'interval' | 'point' | 'area' | 'polygon' */
  readonly type?: string;
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
  /** tooltip 的映射字段 */
  readonly tooltipFields?: string[] | false;
  /** 其他原始字段, 用于 mapping 回调参数 */
  readonly rawFields?: string[];
  /** 图形映射规则 */
  readonly mapping?: MappingOptions;
  /** label 映射通道，因为历史原因导致实现略有区别 */
  readonly label?: Label;
  /** 不同状态的样式 */
  readonly state?: State;
  /** geometry params */
  readonly args?: any;
};

/**
 * geometry options
 */
export type GeometryOptions = Geometry & Partial<Options>;

/**
 * 获得映射的字段列表
 * @param options
 * @param field
 */
export function getMappingField(o: GeometryOptions, field: 'color' | 'shape' | 'size' | 'style'): string[] {
  const { xField, yField, colorField, shapeField, sizeField, styleField, rawFields = [] } = o;

  let fields = [];

  // 因为 color 会影响到数据分组，以及最后的图形映射。所以导致 bar 图中的 widthRatio 设置不生效
  // 所以对于 color 字段，仅仅保留 colorField 好了！ + rawFields
  // shape, size 同理
  if (field === 'color') {
    fields = [colorField || xField, ...rawFields];
  } else if (field === 'shape') {
    fields = [shapeField || xField, ...rawFields];
  } else if (field === 'size') {
    fields = [sizeField || xField, ...rawFields];
  } else {
    fields = [xField, yField, colorField, shapeField, sizeField, styleField, ...rawFields];

    // 一定能找到的！
    const idx = ['x', 'y', 'color', 'shape', 'size', 'style'].indexOf(field);

    const f = fields[idx];
    // 删除当前字段
    fields.splice(idx, 1);
    // 插入到第一个
    fields.unshift(f);
  }

  return uniq(fields.filter((f) => !!f));
}

/**
 * 获得映射函数
 * @param mappingFields
 * @param func
 */
export function getMappingFunction(mappingFields: string[], func: (datum: Datum) => any) {
  if (!func) return undefined;
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
  const {
    type,
    args,
    mapping,
    xField,
    yField,
    colorField,
    shapeField,
    sizeField,
    tooltipFields,
    label,
    state,
  } = options;

  // 如果没有 mapping 信息，那么直接返回
  if (!mapping) {
    return params;
  }

  const { color, shape, size, style, tooltip } = mapping;

  // 创建 geometry
  const geometry = chart[type](args).position(`${xField}*${yField}`);

  /**
   * color 的几种情况
   * g.color('red');
   * g.color('color', ['red', 'blue']);
   * g.color('x', (x, y) => 'red');
   * g.color('color', (color, x, y) => 'red');
   */
  if (isString(color)) {
    colorField ? geometry.color(colorField, color) : geometry.color(color);
  } else if (isFunction(color)) {
    const mappingFields = getMappingField(options, 'color');
    geometry.color(mappingFields.join('*'), getMappingFunction(mappingFields, color));
  } else {
    colorField && geometry.color(colorField, color);
  }

  /**
   * shape 的几种情况
   * g.shape('rect');
   * g.shape('shape', ['rect', 'circle']);
   * g.shape('x*y', (x, y) => 'rect');
   * g.shape('shape*x*y', (shape, x, y) => 'rect');
   */
  if (isString(shape)) {
    shapeField ? geometry.shape(shapeField, [shape]) : geometry.shape(shape); // [shape] 需要在 G2 做掉
  } else if (isFunction(shape)) {
    const mappingFields = getMappingField(options, 'shape');
    geometry.shape(mappingFields.join('*'), getMappingFunction(mappingFields, shape));
  } else {
    shapeField && geometry.shape(shapeField, shape);
  }

  /**
   * size 的几种情况
   * g.size(10);
   * g.size('size', [10, 20]);
   * g.size('x*y', (x, y) => 10);
   * g.color('size*x*y', (size, x, y) => 1-);
   */
  if (isNumber(size)) {
    sizeField ? geometry.size(sizeField, size) : geometry.size(size);
  } else if (isFunction(size)) {
    const mappingFields = getMappingField(options, 'size');
    geometry.size(mappingFields.join('*'), getMappingFunction(mappingFields, size));
  } else {
    sizeField && geometry.size(sizeField, size);
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

  /**
   * tooltip 的 API
   * g.tooltip('x*y*color', (x, y, color) => ({ name, value }));
   * g.tooltip(false);
   */
  if (tooltipFields === false) {
    geometry.tooltip(false);
  } else if (!isEmpty(tooltipFields)) {
    geometry.tooltip(tooltipFields.join('*'), getMappingFunction(tooltipFields, tooltip));
  }

  /**
   * label 的映射
   */
  if (label === false) {
    geometry.label(false);
  } else if (label) {
    const { callback, fields, ...cfg } = label;
    geometry.label({
      fields: fields || [yField],
      callback,
      cfg: transformLabel(cfg),
    });
  }

  /**
   * state 状态样式
   */
  if (state) {
    geometry.state(state);
  }

  // 防止因为 x y 字段做了通道映射，导致生成图例
  [xField, yField]
    .filter((f: string) => f !== colorField)
    .forEach((f: string) => {
      chart.legend(f, false);
    });
  return {
    ...params,
    // geometry adaptor 额外需要做的事情，就是将创建好的 geometry 返回到下一层 adaptor，防止通过 type 查询的时候容易误判
    ext: { geometry },
  };
}
