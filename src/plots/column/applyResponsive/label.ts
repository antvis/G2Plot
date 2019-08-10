import ShapeNodes from '../../../util/responsive/shapeNodes';
import Responsive from '../../../util/responsive/responsive';
import responsiveTheme from '../../../theme/responsive';
import * as _ from '@antv/util';

export default function responsiveLabel(plot) {
  const props = plot._initialProps;
    /** 判断是否应用响应式规则 */
  if (isTopLabel(plot)) {
    const element = plot.plot.get('elements')[0];
    const labelsContainer = element.get('labelController').labelsContainer;
    const labelFiled = plot.column.label.fields[0];
    const labelShapes = element.get('labels');
    const nodes = new ShapeNodes({
      shapes: labelShapes,
    });
    const region = plot.plot.get('panelRange');
    const { constraints, rules } = responsiveTheme.labels.column;
    new Responsive({
      nodes,
      constraints,
      rules,
      region,
      cfg: {
        labelsContainer,
        element,
        stateNodes: getStateNodes(props.data, labelFiled, nodes.nodes),
      },
    });
  }
}

function isTopLabel(plot) {
  if (plot.column.label) {
    if (!plot.column.label.position || plot.column.label.position === 'top') {
      return true;
    }
  }
  return false;
}

function getStateNodes(data, field, nodes) {
  const extract_data = [];
  _.each(data, (d) => {
    extract_data.push(d[field]);
  });
  extract_data.sort((a, b) => {
    return a - b;
  });
  const min = extract_data[0];
  const min_node = getNodeByNumber(nodes, field, min);
  const max = extract_data[extract_data.length - 1];
  const max_node = getNodeByNumber(nodes, field, max);
  const median = getMedian(extract_data);
  const median_node = getNodeByNumber(nodes, field, median);

  return { min: min_node, max: max_node, median: median_node };
}

function getMedian(array) {
  const list = _.clone(array);
  list.sort((a, b) => {
    return a - b;
  });

  const half = Math.floor(list.length / 2);

  if (list.length % 2) {
    return list[half];
  }

  return list[half];
}

function getNodeByNumber(nodes, field, num) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const d = node.shape.get('origin');
    if (d[field] === num) {
      return node;
    }
  }
}
