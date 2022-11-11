import { get } from '@antv/util';
import { animation, annotation, interaction as commonInteraction, legend, theme, tooltip } from '../../adaptor/common';
import { polygon as basePolygon } from '../../adaptor/geometries/polygon';
import { pattern } from '../../adaptor/pattern';
import { Params } from '../../core/adaptor';
import { deepAssign, flow } from '../../utils';
import { getAdjustAppendPadding } from '../../utils/padding';
import { TreemapOptions } from './types';
import { enableDrillInteraction, findInteraction, transformData } from './utils';

/**
 * 获取默认 option
 * @param params
 */
function defaultOptions(params: Params<TreemapOptions>): Params<TreemapOptions> {
  const { options } = params;
  const { colorField } = options;

  return deepAssign(
    {
      options: {
        rawFields: ['value'],
        tooltip: {
          fields: ['name', 'value', colorField, 'path'],
          formatter: (data) => {
            return {
              name: data.name,
              value: data.value,
            };
          },
        },
      },
    },
    params
  );
}

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TreemapOptions>): Params<TreemapOptions> {
  const { chart, options } = params;
  const { color, colorField, rectStyle, hierarchyConfig, rawFields } = options;

  const data = transformData({
    data: options.data,
    colorField: options.colorField,
    enableDrillDown: enableDrillInteraction(options),
    hierarchyConfig,
  });

  chart.data(data);

  // geometry
  basePolygon(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        seriesField: colorField,
        rawFields: rawFields,
        polygon: {
          color,
          style: rectStyle,
        },
      },
    })
  );

  // 做一个反转，这样配合排序，可以将最大值放到左上角，最小值放到右下角
  chart.coordinate().reflect('y');

  return params;
}

/**
 * 坐标轴
 * @param params
 */
function axis(params: Params<TreemapOptions>): Params<TreemapOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

function adaptorInteraction(options: TreemapOptions): TreemapOptions {
  const { drilldown, interactions = [] } = options;

  const enableDrillDown = enableDrillInteraction(options);
  if (enableDrillDown) {
    return deepAssign({}, options, {
      interactions: [
        ...interactions,
        {
          type: 'drill-down',
          // 🚓 这不是一个规范的 API，后续会变更。慎重参考
          cfg: { drillDownConfig: drilldown, transformData },
        },
      ],
    });
  }
  return options;
}

/**
 * Interaction 配置
 * @param params
 */
export function interaction(params: Params<TreemapOptions>): Params<TreemapOptions> {
  const { chart, options } = params;
  const { interactions, drilldown } = options;

  commonInteraction({
    chart,
    options: adaptorInteraction(options),
  });

  // 适配 view-zoom
  const viewZoomInteraction = findInteraction(interactions, 'view-zoom');

  if (viewZoomInteraction) {
    // 开启缩放 interaction 后，则阻止默认滚动事件，避免整个窗口的滚动
    if (viewZoomInteraction.enable !== false) {
      chart.getCanvas().on('mousewheel', (ev) => {
        ev.preventDefault();
      });
    } else {
      // 手动关闭后，清除。仅对声明 viewZoomInteraction 的清除。
      chart.getCanvas().off('mousewheel');
    }
  }

  // 适应下钻交互面包屑
  const enableDrillDown = enableDrillInteraction(options);
  if (enableDrillDown) {
    // 为面包屑在底部留出 25px 的空间
    chart.appendPadding = getAdjustAppendPadding(chart.appendPadding, get(drilldown, ['breadCrumb', 'position']));
  }
  return params;
}

/**
 * 矩形树图
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TreemapOptions>) {
  return flow(
    defaultOptions,
    theme,
    pattern('rectStyle'),
    geometry,
    axis,
    legend,
    tooltip,
    interaction,
    animation,
    annotation()
  )(params);
}
