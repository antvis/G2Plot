import { getCoord } from '@antv/coord';
import { BBox } from '@antv/g';
import * as _ from '@antv/util';
// import responsiveTheme from '../../../theme/responsive';
import Responsive from '../../../util/responsive/responsive';
import VariableNodes from '../../../util/responsive/variableNode';

export default function responsiveColumn(plot) {
  const props = plot._initialProps;
  const responsiveTheme = plot.themeController.responsiveTheme;
  /** 有几个column */
  const columnNum = getFieldNumber(props.data, props.xField);
  /** 创建coord */
  const padding = props.padding;
  const cartesian = getCoord('cartesian');
  const coord = new cartesian({
    start: { x: padding[3], y: padding[0] },
    end: { x: props.width - padding[1], y: props.height - padding[2] },
  });
  /** 计算单柱响应region */
  const regionWidth = coord.width / columnNum;
  const region = new BBox(0, 0, regionWidth, coord.height);
  /** 运用响应式规则 */
  const nodes = new VariableNodes({
    nodes: [{ name: 'width', value: 0 }],
  });
  const { constraints } = responsiveTheme.column;
  new Responsive({
    nodes,
    constraints,
    region,
    plot,
    onEnd: () => {
      const columnWidth = nodes.nodes[0].value;
      props.columnSize = columnWidth;
    },
  });
}

function getFieldNumber(data, field) {
  const values = [];
  _.each(data, (d) => {
    const v = d[field];
    if (values.indexOf(v) < 0) {
      values.push(v);
    }
  });
  return values.length;
}
