import { Legend } from '@antv/component';
import { BBox } from '@antv/g';
import * as _ from '@antv/util';
import ViewLayer from '../../base/view-layer';
import { getGlobalTheme } from '../../theme/global';

export function getLegendData(viewLayer: ViewLayer, props) {
  const legendItems = [];
  const view = viewLayer.view;
  const geometry = view.get('elements')[0];
  const colorAttr = geometry.getAttr('color'); // color和shape决定cat legend的生成，暂时先不考虑shape
  const markerCfg: any = {
    isInCircle: geometry.isInCircle(),
    color: colorAttr.values[0],
  };
  const marker = geometry.get('shapeFactory').getMarkerStyle(geometry.get('type'), markerCfg);
  /** 处理default不生成图例的场景 */
  if (colorAttr.scales.length === 0) {
    legendItems.push({
      value: props.name,
      checked: true,
      marker,
      isSingle: true,
      layer: viewLayer,
    });
  } else {
    /** 正常生成图例 */
    const values = colorAttr.scales[0].values;
    _.each(values, (v, index) => {
      const markerColor = colorAttr.values[index];
      const markerValue = v;
      const cfg: any = {
        isInCircle: geometry.isInCircle(),
        color: markerColor,
      };
      const markerItem = geometry.get('shapeFactory').getMarkerStyle(geometry.get('type'), cfg);
      legendItems.push({
        field: colorAttr.scales[0].field,
        value: markerValue,
        checked: true,
        marker: markerItem,
        isSingle: false,
        layer: viewLayer,
      });
    });
  }

  return legendItems;
}

export function mergeLegendData(items) {
  return items;
}

export function createLegend(items, container, width, canvas) {
  const legendTheme = getGlobalTheme().legend;
  const legendCfg = {
    type: 'category-legend',
    items,
    maxSize: width,
    container: canvas,
    textStyle: {
      fill: '#8C8C8C',
      fontSize: 12,
      textAlign: 'start',
      textBaseline: 'middle',
      lineHeight: 20,
    }, // 图例项目文本样式
    titleDistance: 10, // 标题和图例项的间距
    autoWrap: true, // 图例项是否自动换行
    itemMarginBottom: 0, // 图例项之间的底部间距
    backgroundPadding: 0, // 背景内边距
    maxLength: width, // 图例的最大高度或者宽度
  };
  const legend = new Legend.CanvasCategory(legendCfg as any);
  legend.moveTo(24, 24);
  legend.draw();
  addLegendInteraction(legend);
  /** return legend as a padding component */
  return {
    position: 'top',
    getBBox: () => {
      const bbox = legend.get('itemsGroup').getBBox();
      return new BBox(bbox.minX, bbox.minX, bbox.width, bbox.height + legendTheme.innerPadding[0]);
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
