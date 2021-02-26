import { interaction, animation, theme } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { sankeyLayout } from '../../utils/transform/sankey';
import { polygon, edge } from '../../adaptor/geometries';
import { transformDataToNodeLinkData } from '../../utils/data';
import { SankeyOptions } from './types';
import { X_FIELD, Y_FIELD, COLOR_FIELD } from './constant';
import { cutoffCircle } from './circle';
import { getNodePaddingRatio, getNodeWidthRatio } from './helper';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<SankeyOptions>): Params<SankeyOptions> {
  const { chart, options } = params;
  const {
    data,
    sourceField,
    targetField,
    weightField,
    color,
    nodeStyle,
    edgeStyle,
    label,
    tooltip,
    nodeAlign,
    nodePaddingRatio,
    nodePadding,
    nodeWidthRatio,
    nodeWidth,
    nodeSort,
    nodeDepth,
  } = options;

  // 1. 组件，优先设置，因为子 view 会继承配置
  chart.legend(false);
  chart.tooltip(tooltip);
  chart.axis(false);
  // y 镜像一下，防止图形顺序和数据顺序反了
  chart.coordinate().reflect('y');

  // 2. 转换出 layout 前数据
  const sankeyLayoutInputData = transformDataToNodeLinkData(
    cutoffCircle(data, sourceField, targetField),
    sourceField,
    targetField,
    weightField
  );

  // 3. layout 之后的数据
  const { nodes, links } = sankeyLayout(
    {
      nodeAlign,
      // @ts-ignore
      nodePadding: getNodePaddingRatio(nodePadding, nodePaddingRatio, chart.height),
      // @ts-ignore
      nodeWidth: getNodeWidthRatio(nodeWidth, nodeWidthRatio, chart.width),
      nodeSort,
      nodeDepth,
    },
    sankeyLayoutInputData
  );

  // 4. 生成绘图数据
  const nodesData = nodes.map((node) => {
    return {
      x: node.x,
      y: node.y,
      name: node.name,
      isNode: true,
    };
  });
  const edgesData = links.map((link) => {
    return {
      source: link.source.name,
      target: link.target.name,
      name: link.source.name || link.target.name,
      x: link.x,
      y: link.y,
      value: link.value,
      isNode: false,
    };
  });

  // 5. node edge views

  // edge view
  const edgeView = chart.createView();
  edgeView.data(edgesData);

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

  const nodeView = chart.createView();
  nodeView.data(nodesData);

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
