import { isArray, isBoolean } from '../utils';

/** new Chart options */
export const CHART_OPTIONS = ['renderer'];
/** There is only the view layer, no need to pass it down to children */
export const VIEW_OPTIONS = [
  'width',
  'height',
  'autoFit',
  'theme',
  'inset',
  'insetLeft',
  'insetRight',
  'insetTop',
  'insetBottom',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'depth',
  'title',
  'clip',
  'children',
  'type',
  'data',
  'direction',
];

/** 特殊标识，用于标识改配置来自于转换逻辑，而非用户配置 */
export const TRANSFORM_SIGN = '__transform__';

/** 特殊标识，用于跳过 删除已转换的配置项 */
export const SKIP_DEL_CUSTOM_SIGN = '__skipDelCustomKeys__';

/**
 * @title 字段转换逻辑
 * @example
 *    1. xField: 'year' -> encode: {x: 'year'}
 *    2. yField: 'scales' -> encode: {y: 'scales'}
 *    3. shape: 'smooth' -> style: {shape: 'smooth'} shapeField: 'shape' -> encode: { shape: 'shape' }
 *    4. connectNulls: {connect: true} -> style: {connect: true}
 *    5. keyField: 'key' -> encode: { key: 'key' }
 */
const commonCallback = (type: string, value: boolean | object) => {
  if (isBoolean(value)) {
    return {
      type,
      available: value,
    };
  }
  return { type, ...(value as object) };
};
export const TRANSFORM_OPTION_KEY = {
  /** encode */
  xField: 'encode.x',
  yField: 'encode.y',
  colorField: 'encode.color',
  angleField: 'encode.y',
  keyField: 'encode.key',
  sizeField: 'encode.size',
  shapeField: 'encode.shape',
  seriesField: 'encode.series',
  positionField: 'encode.position',
  textField: 'encode.text',
  valueField: 'encode.value',
  binField: 'encode.x',
  srcField: 'encode.src',
  /**
   * @title 堆叠
   * @example
   *  1. stack: true -> transform: [{type: 'stackY'}]
   */
  stack: {
    target: 'transform',
    value: (value: boolean | object) => {
      return commonCallback('stackY', value);
    },
  },
  /**
   * @title 归一化
   * @example
   *  1. normalize: true -> transform: [{type: 'normalizeY'}]
   */
  normalize: {
    target: 'transform',
    value: (value: boolean | object) => {
      return commonCallback('normalizeY', value);
    },
  },
  /**
   * @title 百分比
   * @description 同 normalize
   * @example
   *  1. percent: true -> transform: [{type: 'normalizeY'}]
   */
  percent: {
    target: 'transform',
    value: (value: boolean | object) => {
      return commonCallback('normalizeY', value);
    },
  },
  /**
   * @title 分组
   * @example
   *  1. group: true -> transform: [{type: 'dodgeX'}]
   */
  group: {
    target: 'transform',
    value: (value: boolean | object) => {
      return commonCallback('dodgeX', value);
    },
  },
  /**
   * @title 排序
   * @example
   *  1. sort: true -> transform: [{type: 'sortX'}]
   */
  sort: {
    target: 'transform',
    value: (value: boolean | object) => {
      return commonCallback('sortX', value);
    },
  },
  /**
   * @title 对称
   * @example
   *  1. symmetry: true -> transform: [{type: 'symmetryY'}]
   */
  symmetry: {
    target: 'transform',
    value: (value: boolean | object) => {
      return commonCallback('symmetryY', value);
    },
  },
  /**
   * @title 对 y 和 y1 通道求差集
   * @example
   *  1. diff: true -> transform: [{type: 'diffY'}]
   */
  diff: {
    target: 'transform',
    value: (value: boolean | object) => {
      return commonCallback('diffY', value);
    },
  },
  meta: {
    target: 'scale',
    value: (value: object) => {
      return value;
    },
  },
  label: {
    target: 'labels',
    value: (value: object) => {
      return value;
    },
  },
  /**
   * @title 折线的形状
   * @example
   *  1. shape: 'smooth' -> style: {shape: 'smooth'}
   */
  shape: 'style.shape',
  /**
   * @title 是否链接空值
   * @description 支持 boolean 和 对象类型
   */
  connectNulls: {
    target: 'style',
    value: (value: boolean | object) => {
      if (isBoolean(value)) {
        return {
          connect: value,
        };
      }
      return value;
    },
  },
};

/**
 * @title 将 CONFIG_SHAPE 中的配置项, 转换为 children
 * @example
 *    1. annotations: [{type: 'text'}] -> children: [{type: 'text'}]
 *    2. line: {shape: 'hvh'}-> children: [{type: 'line', style: { shape: 'hvh'}}]
 */
const EXTEND_KEYS = [
  'xField',
  'yField',
  'seriesField',
  'colorField',
  'keyField',
  'positionField',
  'meta',
  'tooltip',
  'animate',
  'stack',
  'normalize',
  'percent',
  'group',
  'sort',
  'symmetry',
  'diff',
];
export const CONFIG_SHAPE = [
  {
    key: 'annotations',
    extend_keys: [],
  },
  {
    key: 'line',
    type: 'line',
    extend_keys: EXTEND_KEYS,
  },
  {
    key: 'point',
    type: 'point',
    extend_keys: EXTEND_KEYS,
  },
  {
    key: 'area',
    type: 'area',
    extend_keys: EXTEND_KEYS,
  },
];

export const COORDIANTE_OPTIONS = [
  'radius',
  'innerRadius',
  'startAngle',
  'endAngle',
  'focusX',
  'focusY',
  'distortionX',
  'distortionY',
  'visual',
];

/**
 * @description 一些特殊的配置项，需要自定义转换逻辑
 */
export const SPECIAL_OPTIONS = [
  {
    key: 'transform',
    callback: (origin: object, key: string, value: { type: string; available?: boolean }) => {
      origin[key] = origin[key] || [];
      const { available = true, ...rest } = value;
      if (available) {
        origin[key].push({ [TRANSFORM_SIGN]: true, ...rest });
      } else {
        origin[key].splice(
          origin[key].indexOf((item) => item.type === value.type),
          1,
        );
      }
    },
  },
  {
    key: 'labels',
    callback: (
      origin: object,
      key: string,
      value: { available?: boolean; text?: string | Function; [key: string]: unknown } | any[],
    ) => {
      /**
       * @description 特殊情况处理
       *   1. 如果 labels 为 false，表示关闭标签
       *   2. 如果 labels 为数组，用于多 label 的场景
       * @example
       *   1. label: false -> labels: []
       *   2. label: [{x}, {xx}] -> labels: [{x}, {xx}]
       */
      if (!value || isArray(value)) {
        origin[key] = value ? value : [];
        return;
      }
      /**
       * @description 填充默认 text 逻辑
       */
      if (!(value as { text: string | Function }).text) {
        value['text'] = origin['yField'];
      }
      origin[key] = origin[key] || [];
      origin[key].push({ [TRANSFORM_SIGN]: true, ...value });
    },
  },
];

export const ANNOTATION_LIST = [
  {
    key: 'conversionTag',
    shape: 'ConversionTag',
  },
  {
    key: 'axisText',
    shape: 'BidirectionalBarAxisText',
  },
];
