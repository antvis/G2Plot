import { polygon as basePolygon } from '../../adaptor/geometries/polygon';
import { Params } from '../../core/adaptor';
import { interaction as commonInteraction, animation, theme, legend, annotation, tooltip } from '../../adaptor/common';
import { flow, deepAssign } from '../../utils';
import {
  transformData,
  findInteraction,
  enableInteraction,
  getFommatInteractions,
  getAdjustAppendPadding,
} from './utils';
import { TreemapOptions } from './types';

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
        // 默认按照 name 字段对颜色进行分类
        colorField: 'name',
        rectStyle: {
          lineWidth: 1,
          stroke: '#fff',
        },
        hierarchyConfig: {
          tile: 'treemapSquarify',
        },
        label: {
          fields: ['name'],
          layout: {
            type: 'limit-in-shape',
          },
        },
        tooltip: {
          showMarkers: false,
          showTitle: false,
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
  const { color, colorField, rectStyle, hierarchyConfig } = options;

  const data = transformData({
    data: options.data,
    colorField: options.colorField,
    enableDrillDown: enableInteraction(options.interactions, 'treemap-drill-down'),
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
        rawFields: ['value'],
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

/**
 * Interaction 配置
 * @param params
 */
export function interaction(params: Params<TreemapOptions>): Params<TreemapOptions> {
  const { chart, options } = params;
  const { interactions, hierarchyConfig } = options;

  commonInteraction({
    chart,
    options: {
      interactions: getFommatInteractions(interactions, hierarchyConfig),
    },
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
  const enableDrillInteraction = enableInteraction(interactions, 'treemap-drill-down');
  if (enableDrillInteraction) {
    // 为面包屑在底部留出 25px 的空间
    chart.appendPadding = getAdjustAppendPadding(chart.appendPadding);
  }
  return params;
}

/**
 * 矩形树图
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TreemapOptions>) {
  return flow(defaultOptions, geometry, axis, theme, legend, tooltip, interaction, animation, annotation())(params);
}
