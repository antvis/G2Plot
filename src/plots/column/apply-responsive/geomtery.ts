import { getCoordinate } from '@antv/coord';
import { BBox } from '@antv/g';
import * as _ from '@antv/util';
import VariableNodes from '../../../util/responsive/node/variable-node';
import Responsive from '../../../util/responsive/responsive';
import ColumnLayer from '../layer';

export default function responsiveColumn(layer: ColumnLayer) {
  const props = layer.initialProps;
  const responsiveTheme = layer.getResponsiveTheme();
  /** 有几个column */
  const columnNum = getFieldNumber(props.data, props.xField);
  /** 创建coord */
  const padding = props.padding;
  const cartesian = getCoordinate('cartesian');
  const coord = new cartesian({
    start: { x: padding[3], y: padding[0] },
    end: { x: props.width - padding[1], y: props.height - padding[2] },
  });
  /** 计算单柱响应region */
  const regionWidth = coord.getWidth() / columnNum;
  const region = new BBox(0, 0, regionWidth, coord.getHeight());
  /** 运用响应式规则 */
  const nodes = new VariableNodes({
    nodes: [{ name: 'width', value: 0 }],
  });
  const { constraints } = responsiveTheme.column;
  new Responsive({
    nodes,
    constraints,
    region,
    plot: layer,
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
