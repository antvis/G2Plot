import { interaction, animation, theme } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { polygon, edge } from '../../adaptor/geometries';
import { chordLayout } from '../../utils/transform/chord';
import { transformDataToChord } from './util/data';
import { ChordOptions } from './types';
const X_FIELD = 'x';
const Y_FIELD = 'y';
const NODE_COLOR_FIELD = 'id';
const EDGE_COLOR_FIELD = 'source';
function geometry(params: Params<ChordOptions>): Params<ChordOptions> {
  const { chart, options } = params;
  const {
    data,
    sourceField,
    targetField,
    sourceWeightField,
    targetWeightField,
    weight,
    thickness,
    marginRatio,
    tooltip,
    nodeStyle,
    edgeStyle,
    color,
    label,
  } = options;
  // 1. 设置chart
  chart.axis(false);
  // chart.tooltip(tooltip);
  chart.tooltip({
    showTitle: false,
    showMarkers: false,
  });
  chart.legend(false);

  // 2. 转换chord layout需要的数据
  const chordLayoutInputData = transformDataToChord(
    data,
    sourceField,
    targetField,
    sourceWeightField,
    targetWeightField
  );
  const { nodes, links } = chordLayout({ weight, thickness, marginRatio }, chordLayoutInputData);

  // 3. 生成绘图数据
  const nodesData = nodes.map((node) => {
    return {
      id: node.id,
      x: node.x,
      y: node.y,
      name: node.name,
      // value: node.value,
    };
  });
  const edgesData = links.map((link) => {
    return {
      source: link.source,
      target: link.target,
      sourceName: link.sourceName,
      targetName: link.targetName,
      // name: link.source.name || link.target.name,
      x: link.x,
      y: link.y,
      sourceWeight: link.sourceWeight,
      targetWeight: link.targetWeight,
    };
  });

  // 4. node edge view
  // edge view
  const edgeView = chart.createView();
  // 使用edge设置未生效
  // edgeView.axis();
  edgeView.coordinate('polar').reflect('y');
  edgeView.data(edgesData);
  // edgeView.edge().position('x*y').shape('arc').color('source').tooltip('source*target*value').style({
  //   fillOpacity: 0.5,
  // });
  edge({
    chart: edgeView,
    options: {
      xField: X_FIELD,
      yField: Y_FIELD,
      seriesField: EDGE_COLOR_FIELD,
      edge: {
        color,
        style: edgeStyle,
        shape: 'arc',
      },
      tooltip,
    },
  });

  // node view
  const nodeView = chart.createView();
  nodeView.coordinate('polar').reflect('y');
  nodeView.data(nodesData);
  polygon({
    chart: nodeView,
    options: {
      xField: X_FIELD,
      yField: Y_FIELD,
      seriesField: NODE_COLOR_FIELD,
      polygon: {
        color,
        style: nodeStyle,
      },
      label,
      tooltip: false,
    },
  });

  chart.scale({
    x: { sync: true, nice: true },
    y: { sync: true, nice: true, max: 1 },
    id: { sync: 'color' },
    source: { sync: 'color' },
  });
  chart.interaction('element-active');
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
    geometry,
    interaction,
    animation,
    theme
    // ... 其他的 adaptor flow
  )(params);
}
