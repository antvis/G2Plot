import { interaction, theme } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { polygon, edge } from '../../adaptor/geometries';
import { SankeyOptions } from './types';
import { X_FIELD, Y_FIELD, COLOR_FIELD } from './constant';
import { transformToViewsData } from './helper';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<SankeyOptions>): Params<SankeyOptions> {
  const { chart, options } = params;
  const { color, nodeStyle, edgeStyle, label, tooltip } = options;

  // 1. 组件，优先设置，因为子 view 会继承配置
  chart.legend(false);
  chart.tooltip(tooltip);
  chart.axis(false);
  // y 镜像一下，防止图形顺序和数据顺序反了
  chart.coordinate().reflect('y');

  // 2. node edge views
  // @ts-ignore
  const { nodes, edges } = transformToViewsData(options, chart.width, chart.height);

  // edge view
  const edgeView = chart.createView({ id: 'views' });
  edgeView.data(edges);

  edge({
    chart: edgeView,
    // @ts-ignore
    options: {
      xField: X_FIELD,
      yField: Y_FIELD,
      seriesField: COLOR_FIELD,
      edge: {
        color,
        style: edgeStyle,
        shape: 'arc',
      },
      tooltip,
      state: {
        active: {
          style: {
            opacity: 0.8,
            lineWidth: 0,
          },
        },
      },
    },
  });

  const nodeView = chart.createView({ id: 'nodes' });
  nodeView.data(nodes);

  polygon({
    chart: nodeView,
    options: {
      xField: X_FIELD,
      yField: Y_FIELD,
      seriesField: COLOR_FIELD,
      polygon: {
        color,
        style: nodeStyle,
      },
      label,
      tooltip,
    },
  });

  chart.interaction('element-active');

  // scale
  chart.scale({
    x: { sync: true, nice: true, min: 0, max: 1, minLimit: 0, maxLimit: 1 },
    y: { sync: true, nice: true, min: 0, max: 1, minLimit: 0, maxLimit: 1 },
    name: { sync: 'color' },
  });

  return params;
}

/**
 * 动画
 * @param params
 */
export function animation(params: Params<SankeyOptions>): Params<SankeyOptions> {
  const { chart, options } = params;
  const { animation } = options;

  // 同时设置整个 view 动画选项
  if (typeof animation === 'boolean') {
    chart.animate(animation);
  } else {
    chart.animate(true);
  }

  const geometries = [...chart.views[0].geometries, ...chart.views[1].geometries];

  // 所有的 Geometry 都使用同一动画（各个图形如有区别，自行覆盖）
  geometries.forEach((g) => {
    g.animate(animation);
  });

  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<SankeyOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    interaction,
    animation,
    theme
    // ... 其他的 adaptor flow
  )(params);
}
