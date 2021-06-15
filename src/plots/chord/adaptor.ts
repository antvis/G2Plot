import { Geometry } from '@antv/g2';
import { each } from '@antv/util';
import { interaction, theme, state } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, pick } from '../../utils';
import { polygon, edge } from '../../adaptor/geometries';
import { chordLayout } from '../../utils/transform/chord';
import { getAllGeometriesRecursively, transformDataToNodeLinkData } from '../../utils';
import { ChordOptions } from './types';
import { X_FIELD, Y_FIELD, NODE_COLOR_FIELD, EDGE_COLOR_FIELD } from './constant';

function transformData(params: Params<ChordOptions>): Params<ChordOptions> {
  // 将弦图数据放到ext中，nodeGeometry edgeGeometry使用

  const { options } = params;
  const { data, sourceField, targetField, weightField, nodePaddingRatio, nodeWidthRatio, rawFields = [] } = options;

  // 将数据转换为node link格式
  const chordLayoutInputData = transformDataToNodeLinkData(data, sourceField, targetField, weightField);

  const { nodes, links } = chordLayout({ weight: true, nodePaddingRatio, nodeWidthRatio }, chordLayoutInputData);

  // 1. 生成绘制node使用数据
  const nodesData = nodes.map((node) => {
    return {
      ...pick(node, ['id', 'x', 'y', 'name', ...rawFields]),
      isNode: true,
    };
  });

  // 2. 生成 edge 使用数据 （同桑基图）
  const edgesData = links.map((link) => {
    return {
      source: link.source.name,
      target: link.target.name,
      name: link.source.name || link.target.name,
      ...pick(link, ['x', 'y', 'value', ...rawFields]),
      isNode: false,
    };
  });

  return {
    ...params,
    ext: {
      ...params.ext,
      // 将chordData放到ext中，方便下面的geometry使用
      chordData: { nodesData, edgesData },
    },
  };
}

/**
 * scale配置
 * @param params 参数
 */
function scale(params: Params<ChordOptions>): Params<ChordOptions> {
  const { chart } = params;
  chart.scale({
    x: { sync: true, nice: true },
    y: { sync: true, nice: true, max: 1 },
    [NODE_COLOR_FIELD]: { sync: 'color' },
    [EDGE_COLOR_FIELD]: { sync: 'color' },
  });
  return params;
}

/**
 * axis配置
 * @param params 参数
 */
function axis(params: Params<ChordOptions>): Params<ChordOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

/**
 * legend配置
 * @param params 参数
 */
function legend(params: Params<ChordOptions>): Params<ChordOptions> {
  const { chart } = params;
  chart.legend(false);
  return params;
}

/**
 * tooltip配置
 * @param params 参数
 */
function tooltip(params: Params<ChordOptions>): Params<ChordOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  chart.tooltip(tooltip);
  return params;
}

/**
 * coordinate配置
 * @param params 参数
 */
function coordinate(params: Params<ChordOptions>): Params<ChordOptions> {
  const { chart } = params;
  chart.coordinate('polar').reflect('y');
  return params;
}

/**
 * nodeGeometry配置
 * @param params 参数
 */
function nodeGeometry(params: Params<ChordOptions>): Params<ChordOptions> {
  // node view
  const { chart, options } = params;
  const { nodesData } = params.ext.chordData;
  const { nodeStyle, label, tooltip } = options;

  const nodeView = chart.createView();
  nodeView.data(nodesData);

  // 面
  polygon({
    chart: nodeView,
    options: {
      xField: X_FIELD,
      yField: Y_FIELD,
      seriesField: NODE_COLOR_FIELD,
      polygon: {
        style: nodeStyle,
      },
      label,
      tooltip,
    },
  });
  return params;
}

/**
 * edgeGeometry配置
 * @param params 参数
 */
function edgeGeometry(params: Params<ChordOptions>): Params<ChordOptions> {
  const { chart, options } = params;
  const { edgesData } = params.ext.chordData;
  const { edgeStyle, tooltip } = options;

  const edgeView = chart.createView();
  edgeView.data(edgesData);

  // edge
  const edgeOptions = {
    xField: X_FIELD,
    yField: Y_FIELD,
    seriesField: EDGE_COLOR_FIELD,
    edge: {
      style: edgeStyle,
      shape: 'arc',
    },
    tooltip,
  };
  edge({
    chart: edgeView,
    options: edgeOptions,
  });
  return params;
}

function animation(params: Params<ChordOptions>): Params<ChordOptions> {
  const { chart, options } = params;
  const { animation } = options;

  // 同时设置整个 view 动画选项
  if (typeof animation === 'boolean') {
    chart.animate(animation);
  } else {
    chart.animate(true);
  }

  // 所有的 Geometry 都使用同一动画（各个图形如有区别，自行覆盖）
  each(getAllGeometriesRecursively(chart), (g: Geometry) => {
    g.animate(animation);
  });

  return params;
}

/**
 * 弦图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ChordOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    theme,
    transformData,
    coordinate,
    scale,
    axis,
    legend,
    tooltip,
    edgeGeometry,
    nodeGeometry,
    interaction,
    state,
    animation
  )(params);
}
