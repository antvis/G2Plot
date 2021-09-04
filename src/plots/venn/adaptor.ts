import { Geometry } from '@antv/g2';
import { isArray, get } from '@antv/util';
import { interaction, animation, theme, tooltip, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { schema as schemaGeometry } from '../../adaptor/geometries';
import { deepAssign, flow, getAdjustAppendPadding, normalPadding } from '../../utils';
import { Datum } from '../../types';
import { getColorMap, layoutVennData } from './utils';
import { CustomInfo, VennData, VennOptions } from './types';
import { ID_FIELD, SETS_FIELD, SIZE_FIELD, RAW_FIELDS } from './constant';
import './shape';

/** 图例默认预留空间 */
export const LEGEND_SPACE = 40;

/**
 * color options 转换
 */
function transformColor(params: Params<VennOptions>, data: VennData): VennOptions['color'] {
  const { chart, options } = params;
  const { color, blendMode = 'multiply' } = options;

  if (typeof color !== 'function') {
    let colorPalette = typeof color === 'string' ? [color] : color;
    if (!isArray(colorPalette)) {
      const { colors10, colors20 } = chart.getTheme();
      colorPalette = data.filter((d) => d[SETS_FIELD].length === 1).length <= 10 ? colors10 : colors20;
    }
    const colorMap = getColorMap(colorPalette, [...data], blendMode);
    return (datum: Datum) => colorMap.get(datum[ID_FIELD]) || colorPalette[0];
  }
  return color;
}

/**
 * 处理默认配置项
 */
function defaultOptions(params: Params<VennOptions>): Params<VennOptions> {
  const { options } = params;
  const { data } = options;
  // 进行排序，mutable。避免 图形元素遮挡
  data.sort((a, b) => a[SETS_FIELD].length - b[SETS_FIELD].length);

  // todo 可以在这里处理下非法数据输入，避免直接 crash
  return params;
}

/**
 * 处理 padding
 */
function padding(params: Params<VennOptions>): Params<VennOptions> {
  const { chart, options } = params;
  const { legend, appendPadding } = options;

  // 处理 legend 的位置. 默认预留 40px, 业务上可以通过 appendPadding 增加
  let padding: number[] = normalPadding(appendPadding);
  if (legend !== false) {
    padding = getAdjustAppendPadding(appendPadding, get(legend, 'position'), LEGEND_SPACE);
  }

  chart.appendPadding = padding;

  return params;
}

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<VennOptions>): Params<VennOptions> {
  const { chart, options } = params;
  const { data, pointStyle, label } = options;

  // 获取容器大小
  const [t, r, b, l] = normalPadding(chart.appendPadding);
  // 处理 legend 的位置. 默认预留 40px, 业务上可以通过 appendPadding 增加
  const customInfo: CustomInfo = { offsetX: l, offsetY: t, label };
  // coordinateBBox + appendPadding = viewBBox, 不需要再计算 appendPadding 部分，因此直接使用 viewBBox
  const { width, height } = chart.viewBBox;

  const vennData: VennData = layoutVennData(data, width - (r + l), height - (t + b), 0);
  chart.data(vennData);

  const { ext } = schemaGeometry(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        sizeField: SIZE_FIELD,
        seriesField: ID_FIELD,
        rawFields: RAW_FIELDS,
        // 不使用 G2 的label，直接在自定义 shape 中实现
        label: false,
        schema: {
          shape: 'venn',
          style: pointStyle,
          color: transformColor(params, vennData),
        },
      },
    })
  );

  const geometry = ext.geometry as Geometry;
  geometry.customInfo(customInfo);

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<VennOptions>): Params<VennOptions> {
  const { chart, options } = params;
  const { legend } = options;

  chart.legend(ID_FIELD, legend);
  // 强制不开启 连续图例
  chart.legend(SIZE_FIELD, false);

  return params;
}

/**
 * 默认关闭坐标轴
 * @param params
 */
export function axis(params: Params<VennOptions>): Params<VennOptions> {
  const { chart } = params;
  chart.axis(false);

  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<VennOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    // 先处理默认配置项，再处理主题
    defaultOptions,
    padding,
    theme,
    geometry,
    scale({}),
    legend,
    axis,
    tooltip,
    interaction,
    animation
    // ... 其他的 adaptor flow
  )(params);
}
