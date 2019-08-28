import * as _ from '@antv/util';
import { compare } from '../../base/controller/state';

const POSITION_MAPPER = ['xField', 'yField', 'angleField'];

function onActive(plot, condition) {
  const props = plot._initialProps;
  // 获取state condition对应在画布的位置，只有在state condition对应字段为位置映射字段时，tooltip才会对齐进行响应
  if (shouldActive(props, condition)) {
    const data = props.data;
    _.each(data, (d) => {
      if (compare(d, condition)) {
        const point = plot.plot.getXY(d);
        // 调用showTooltip方法
        plot.plot.showTooltip(point);
      }
    });
  }
}

function onDisable(plot, condition) {
  plot.plot.on('tooltip:change', (e) => {
    const originItems = _.clone(e.items);
    e.items.splice(0);
    _.each(originItems, (item) => {
      const origin = item.point._origin;
      if (!compare(origin, condition)) {
        e.items.push(item);
      }
    });
  });
}

function shouldActive(props, condition) {
  const fields = getPositionField(props);
  return !_.isFunction(condition) && fields.indexOf(condition.name);
}

function getPositionField(props) {
  const fields = [];
  _.each(POSITION_MAPPER, (v) => {
    if (_.has(props, v)) {
      fields.push(v);
    }
  });
  return fields;
}


export default {
  active: onActive,
  selected: onActive,
  disable: onDisable,
};
