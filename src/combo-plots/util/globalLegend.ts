import { Legend } from '@antv/component';
import BBox from '../../util/bbox';
import * as _ from '@antv/util';
import ViewLayer from '../../base/view-layer';
import { getGlobalTheme } from '../../theme/global';
import ShapeNodes from '../../util/responsive/node/shape-nodes';

export function getLegendData(viewLayer: ViewLayer, props) {
  const legendItems = [];
  const view = viewLayer.view;
  const geometry = view.geometries[0];
  const colorAttr = geometry.attributes.color; // color和shape决定cat legend的生成，暂时先不考虑shape
  const markerCfg: any = {
    isInCircle: false,
    color: colorAttr.values[0],
  };

  let marker = {
    symbol: 'circle',
    style: {
      r: 4,
      fill: markerCfg.fill,
    },
  };
  // @ts-ignore
  if (geometry.shapeFactory) {
    // @ts-ignore
    marker = geometry.shapeFactory.getMarker(geometry.type, markerCfg);
  }
  /** 处理default不生成图例的场景 */
  if (colorAttr.scales.length === 1 && colorAttr.scales[0].type == 'identity') {
    legendItems.push({
      value: props.name,
      checked: true,
      marker,
      isSingle: true,
      layer: viewLayer,
      name: props.name || geometry.type,
    });
  } else {
    /** 正常生成图例 */
    const values = colorAttr.scales[0].values;
    _.each(values, (v, index) => {
      const markerColor = colorAttr.values[index];
      const markerValue = v;
      const cfg: any = {
        isInCircle: false,
        color: markerColor,
      };
      let marker = {
        symbol: 'circle',
        style: {
          r: 4,
          fill: markerCfg.fill,
        },
      };
      // @ts-ignore
      if (geometry.shapeFactory) {
        // @ts-ignore
        marker = geometry.shapeFactory.getMarker(geometry.type, markerCfg);
      }
      legendItems.push({
        field: colorAttr.scales[0].field,
        value: markerValue,
        checked: true,
        marker,
        isSingle: false,
        layer: viewLayer,
        name: markerValue,
      });
    });
  }

  return legendItems;
}

export function mergeLegendData(items) {
  return items;
}

export function createLegend(items, width, height, canvas, position) {
  const legendTheme = getGlobalTheme().legend;
  const positions = position.split('-');
  let layout = 'horizontal';
  if (positions[0] === 'left' || positions[0] === 'right') {
    layout = 'vertical';
  }
  const container = canvas.addGroup();
  const legendCfg = {
    type: 'category-legend',
    items,
    maxSize: width,
    container,
    group: container,
    layout: layout,
    textStyle: {
      fill: '#8C8C8C',
      fontSize: 12,
      textAlign: 'start',
      textBaseline: 'middle',
      lineHeight: 20,
    }, // 图例项目文本样式
    titleDistance: 10, // 标题和图例项的间距
    autoWrap: true, // 图例项是否自动换行
    itemMarginBottom: 4, // 图例项之间的底部间距
    backgroundPadding: 0, // 背景内边距
    maxLength: width, // 图例的最大高度或者宽度
  };
  const legend = new Legend.Category(legendCfg as any);
  legendLayout(width, height, legend, position);
  addLegendInteraction(legend);
  /** return legend as a padding component */
  const bbox = legend.get('container').getBBox();
  let paddingBbox;
  // merge legend inner padding
  const { innerPadding } = legendTheme;

  if (positions[0] === 'left') {
    paddingBbox = new BBox(legend.get('x') + innerPadding[3], legend.get('y'), bbox.width, bbox.height);
  } else if (positions[0] === 'right') {
    paddingBbox = new BBox(legend.get('x') - innerPadding[1], legend.get('y'), bbox.width, bbox.height);
  } else if (positions[0] === 'top') {
    paddingBbox = new BBox(legend.get('x'), legend.get('y') + innerPadding[0], bbox.width, bbox.height);
  } else if (positions[0] === 'bottom') {
    paddingBbox = new BBox(legend.get('x'), legend.get('y') - innerPadding[2], bbox.width, bbox.height);
  }
  return {
    position: positions[0],
    component: legend,
    getBBox: () => {
      return paddingBbox;
    },
  };
}

function addLegendInteraction(legend) {
  const filteredValue = [];
  legend.on('itemclick', (ev) => {
    const { item, checked } = ev;
    // 如果是单图例模式
    if (item.isSingle) {
      if (!checked) {
        item.layer.hide();
      } else {
        item.layer.show();
      }
    } else {
      // 正常的图例筛选数据逻辑
      const view = item.layer.view;
      if (!checked) {
        filteredValue.push(item.value);
        view.filter(item.field, (f) => {
          return !_.contains(filteredValue, f);
        });
        view.repaint();
        const filteredData = view.get('filteredData');
        if (filteredData.length === 0) {
          item.layer.hide();
        } else if (!item.layer.visibility) {
          item.layer.show();
        }
      } else {
        _.pull(filteredValue, item.value);
        view.filter(item.value, (f) => {
          return !_.contains(filteredValue, f);
        });
        view.repaint();
        if (!item.layer.visibility) {
          item.layer.show();
        }
      }
    }
  });
}

function legendLayout(width, height, legend, position) {
  const { bleeding } = getGlobalTheme();
  if (_.isArray(bleeding)) {
    _.each(bleeding, (it, index) => {
      if (typeof bleeding[index] === 'function') {
        bleeding[index] = bleeding[index]({});
      }
    });
  }
  const bbox = legend.get('container').getBBox();
  let x = 0;
  let y = 0;
  const positions = position.split('-');
  // 先确定x
  if (positions[0] === 'left') {
    x = bleeding[3];
  } else if (positions[0] === 'right') {
    x = width - bleeding[1] - bbox.width;
  } else if (positions[1] === 'center') {
    x = (width - bbox.width) / 2;
  } else if (positions[1] === 'left') {
    x = bleeding[3];
  } else if (positions[1] === 'right') {
    x = width - bleeding[1] - bbox.width;
  }
  // 再确定y
  if (positions[0] === 'bottom') {
    y = height - bleeding[2] - bbox.height;
  } else if (positions[0] === 'top') {
    y = bleeding[0];
  } else if (positions[1] === 'center') {
    y = (height - bbox.height) / 2;
  } else if (positions[1] === 'top') {
    y = bleeding[0];
  } else if (positions[1] === 'bottom') {
    y = height - bleeding[2] - bbox.height;
  }
  //legend.moveTo(x, y);
  legend.setLocation({ x, y });
  legend.render();
  //legend.draw();
}
