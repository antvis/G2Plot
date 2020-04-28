import { Legend } from '@antv/component';
import { registerPlotType } from '../../base/global';
import { clone, deepMix, each, contains, pull } from '@antv/util';
import { LayerConfig } from '../../base/layer';
import ColumnLineLayer, { ColumnLineViewConfig } from '../column-line/layer';
import StackedColumnLayer from '../../plots/stacked-column/layer';

export interface StackedColumnLineViewConfig extends ColumnLineViewConfig {
  stackField?: string;
}

interface StackedColumnLineLayerConfig extends StackedColumnLineViewConfig, LayerConfig {}

const defaultLineConfig = {
  color: '#f5bc32',
  lineSize: 4,
  connectNull: true,
  point: {
    visible: false,
    size: 3,
    shape: 'circle',
    style: {
      stroke: '#fff',
    },
  },
  label: {
    visible: false,
  },
};

const defaultColumnConfig = {
  color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3'],
};

const defaultYAxisConfig = {
  visible: true,
  colorMapping: true,
  grid: {
    visible: true,
  },
  line: {
    visible: false,
  },
  tickLine: {
    visible: false,
  },
  label: {
    visible: true,
    autoHide: true,
    autoRotate: false,
  },
  title: {
    autoRotate: true,
    visible: false,
    offset: 12,
  },
};

export default class StackedColumnLineLayer<
  T extends StackedColumnLineLayerConfig = StackedColumnLineLayerConfig
> extends ColumnLineLayer<T> {
  public static getDefaultOptions(): Partial<StackedColumnLineLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      yAxis: {
        leftConfig: deepMix({}, defaultYAxisConfig, { colorMapping: false }),
        rightConfig: defaultYAxisConfig,
      },
      lineConfig: defaultLineConfig,
      columnConfig: defaultColumnConfig,
      legend: {
        visible: true,
      },
    });
  }

  public type: string = 'groupedColumnLine';

  public beforeInit() {
    const groupedValue = this.getValueByGroupField();
    const { color } = this.options.columnConfig;
    this.options.columnConfig.color = color.slice(0, groupedValue.length);
  }

  protected drawColumn() {
    const { data, xField, yField, stackField, xAxis, tooltip, columnConfig } = this.options;
    const column = this.createLayer(StackedColumnLayer, data[0], {
      xField,
      yField: yField[0],
      stackField,
      xAxis,
      yAxis: deepMix({}, this.yAxis(0), {
        grid: {
          visible: true,
        },
        nice: true,
      }),
      legend: {
        visible: false,
      },
      tooltip: deepMix({}, tooltip, {
        showMarkers: false,
        customContent: {
          callback: (containerDom, ev) => {
            this.tooltip(containerDom, ev);
          },
        },
      }),
      ...columnConfig,
    });
    column.render();
  }

  protected tooltip(dom, ev) {
    const { yField } = this.options;
    const originItem = clone(ev.items[0]);
    const dataItemsA = this.getDataByXField(ev.title, 1)[0];
    const unCheckedValue = this.getUnCheckedValue();
    dom.style.display = 'block';
    // 如果legend全部是unchecked的状态，tooltip不显示
    if (unCheckedValue.length === this.colors[0].length + 1) {
      dom.style.display = 'none';
      return;
    }
    if (!contains(unCheckedValue, yField[1])) {
      ev.items.push({
        ...originItem,
        mappingData: deepMix({}, originItem.mappingData, { _origin: dataItemsA }),
        data: dataItemsA,
        name: yField[1],
        value: dataItemsA[yField[1]],
        color: this.colors[1],
      });
    }
    const uniqKeys = [];
    const uniqItems = [];
    each(ev.items, (item) => {
      const { name } = item;
      if (!contains(uniqKeys, name) && !contains(unCheckedValue, name)) {
        uniqKeys.push(name);
        uniqItems.push(item);
      }
    });
    ev.items = uniqItems;
  }

  protected customLegend() {
    const { yField, legend } = this.options;
    const container = this.container.addGroup();
    const legendCfg = legend;
    const groupeValues = this.getValueByGroupField();
    const legendItems = [[], []];
    each(groupeValues, (v, index) => {
      legendItems[0].push({
        name: v,
        unchecked: false,
        marker: {
          symbol: 'square',
          style: {
            r: 5,
            fill: this.colors[0][index],
          },
        },
      });
    });
    legendItems[1].push({
      name: yField[1],
      unchecked: false,
      marker: {
        symbol: 'circle',
        style: {
          r: 5,
          fill: this.colors[1],
        },
      },
    });
    each(this.geomLayers, (geom, index) => {
      const items = legendItems[index];
      const legend = new Legend.Category({
        id: this.type,
        container,
        x: 0,
        y: 0,
        items: items,
        updateAutoRender: true,
        itemBackground: null,
        itemName: legendCfg.text,
      });
      legend.init();
      legend.render();
      this.legends.push(legend);
    });
    this.seperateLegendFilter();
  }

  protected seperateLegendFilter() {
    const { stackField } = this.options;
    /* 分组柱状图legend筛选 */
    const filteredValue = [];
    const legend_group_a = this.legends[0].get('group');
    let layerHide = false;
    legend_group_a.on('click', (ev) => {
      const view = this.geomLayers[0].view;
      const item = ev.target.get('delegateObject').item;
      if (item.unchecked) {
        if (layerHide === true) {
          this.showLayer(0);
          layerHide = false;
        }
        pull(filteredValue, item.name);
        view.filter(item.value, (f) => {
          return !contains(filteredValue, f);
        });
        view.render();
        this.legends[0].setItemState(item, 'unchecked', false);
      } else {
        this.legends[0].setItemState(item, 'unchecked', true);
        filteredValue.push(item.name);
        if (filteredValue.length === this.legends[0].get('items').length) {
          // 如果分组分类全部被uncheck了，直接隐藏图层，这样仍然可以trigger tooltip
          this.hideLayer(0);
          layerHide = true;
        } else {
          view.filter(stackField, (f) => {
            return !contains(filteredValue, f);
          });
          view.render();
        }
      }
      this.canvas.draw();
    });
    this.legendFilter(1);
  }

  protected getValueByGroupField() {
    const { stackField, data } = this.options;
    const columnData = data[0];
    const values = [];
    each(columnData, (d) => {
      const v = d[stackField];
      if (!contains(values, v)) {
        values.push(v);
      }
    });
    return values;
  }

  protected getUnCheckedValue() {
    const value = [];
    each(this.legends, (legend) => {
      const uncheckedItems = legend.getItemsByState('unchecked');
      each(uncheckedItems, (item) => {
        value.push(item.name);
      });
    });
    return value;
  }
}

registerPlotType('stackedColumnLine', StackedColumnLineLayer);
