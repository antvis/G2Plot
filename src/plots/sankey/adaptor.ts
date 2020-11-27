import { interaction, animation, theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { sankeyLayout } from '../../utils/transform/sankey';
import { SankeyOptions } from './types';
import { transformDataToSankey } from './util/data';
import { X_FIELD, Y_FIELD, COLOR_FIELD } from './constant';

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
    nodeAlign,
    nodePaddingRatio,
    nodeWidthRatio,
    nodeSort,
  } = options;

  // 1. 组件，优先设置，因为子 view 会继承配置
  chart.legend(false);
  chart.tooltip({
    showTitle: false,
    showMarkers: false,
  });
  chart.axis(false);

  // 2. 转换出 layout 前数据
  const sankeyLayoutInputData = transformDataToSankey(data, sourceField, targetField, weightField);

  console.log(111, sankeyLayoutInputData);

  // 3. layout 之后的数据
  const { nodes, links } = sankeyLayout(
    {
      nodeAlign,
      nodePadding: nodePaddingRatio,
      nodeWidth: nodeWidthRatio,
      nodeSort,
    },
    sankeyLayoutInputData
  );

  // 4. 生成绘图数据
  const nodesData = nodes.map((node) => {
    return {
      x: node.x,
      y: node.y,
      name: node.name,
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
    };
  });

  // 5. node edge views
  const nodeView = chart.createView();
  nodeView.data(nodesData);

  nodeView
    .polygon()
    .position(`${X_FIELD}*${Y_FIELD}`)
    .color(COLOR_FIELD)
    .style({
      opacity: 1,
      fillOpacity: 1,
      lineWidth: 1,
    })
    .tooltip(false);

  // edge view
  const edgeView = chart.createView();
  edgeView.data(edgesData);

  edgeView
    .edge()
    .position(`${X_FIELD}*${Y_FIELD}`)
    .shape('arc')
    .color(COLOR_FIELD)
    .style({
      opacity: 0.3,
      lineWidth: 0,
    })
    .tooltip('target*source*value', (target, source, value) => {
      return {
        name: source + ' to ' + target,
        value,
      };
    })
    .state({
      active: {
        style: {
          opacity: 0.8,
          lineWidth: 0,
        },
      },
    });

  chart.interaction('element-active');

  // scale
  chart.scale({
    x: { sync: true, nice: true },
    y: { sync: true, nice: true },
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
