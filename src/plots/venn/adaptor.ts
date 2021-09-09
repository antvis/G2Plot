import { Geometry } from '@antv/g2';
import { isArray, get } from '@antv/util';
import { interaction, animation, theme, tooltip, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { schema as schemaGeometry } from '../../adaptor/geometries';
import { deepAssign, flow, getAdjustAppendPadding, normalPadding, resolveAllPadding } from '../../utils';
import { Datum } from '../../types';
import { getColorMap, layoutVennData } from './utils';
import { CustomInfo, VennData, VennOptions } from './types';
import { ID_FIELD } from './constant';
import './shape';

/** 图例默认预留空间 */
export const LEGEND_SPACE = 40;

/**
 * color options 转换
 */
function transformColor(params: Params<VennOptions>, data: VennData): VennOptions['color'] {
  const { chart, options } = params;
  const { color, setsField } = options;

  if (typeof color !== 'function') {
    let colorPalette = typeof color === 'string' ? [color] : color;
    if (!isArray(colorPalette)) {
      const { colors10, colors20 } = chart.getTheme();
      colorPalette = data.filter((d) => d[setsField].length === 1).length <= 10 ? colors10 : colors20;
    }
    const colorMap = getColorMap(colorPalette, data, options);
    return (datum: Datum) => colorMap.get(datum[ID_FIELD]) || colorPalette[0];
  }
  return color;
}

/**
 * 处理 padding
 */
function padding(params: Params<VennOptions>): Params<VennOptions> {
  const { chart, options } = params;
  const { legend, appendPadding, padding } = options;

  // 处理 legend 的位置. 默认预留 40px, 业务上可以通过 appendPadding 增加
  let tempPadding: number[] = normalPadding(appendPadding);
  if (legend !== false) {
    tempPadding = getAdjustAppendPadding(appendPadding, get(legend, 'position'), LEGEND_SPACE);
  }

  chart.appendPadding = resolveAllPadding([tempPadding, padding]);

  return params;
}

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<VennOptions>): Params<VennOptions> {
  const { chart, options } = params;
  const { pointStyle, label, setsField, sizeField } = options;

  // 获取容器大小
  const [t, r, b, l] = normalPadding(chart.appendPadding);
  // 处理 legend 的位置. 默认预留 40px, 业务上可以通过 appendPadding 增加
  const customInfo: CustomInfo = { offsetX: l, offsetY: t, label };
  // coordinateBBox + appendPadding = viewBBox, 不需要再计算 appendPadding 部分，因此直接使用 viewBBox
  const { width, height } = chart.viewBBox;

  const vennData: VennData = layoutVennData(options, width - (r + l), height - (t + b), 0);
  chart.data(vennData);

  const { ext } = schemaGeometry(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        sizeField: sizeField,
        seriesField: ID_FIELD,
        rawFields: [setsField, sizeField],
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
  const { legend, sizeField } = options;

  chart.legend(ID_FIELD, legend);
  // 强制不开启 连续图例
  chart.legend(sizeField, false);

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
