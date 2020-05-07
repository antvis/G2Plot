import { Legend } from '@antv/component';
import { registerPlotType } from '../../base/global';
import ComboViewLayer from '../base';
import { LayerConfig } from '../../base/layer';
import LineLayer from '../../plots/line/layer';
import ColumnLayer from '../../plots/column/layer';
import { IColumnLabel } from '../../plots/column/interface';
import { deepMix, clone, each, contains, pull, isArray } from '@antv/util';
import { ICatAxis, GraphicStyle } from '../../interface/config';
import { ComboViewConfig, LineConfig } from '../util/interface';
import { getGlobalTheme } from '../../theme';

export interface ColumnConfig {
  color?: string | string[]; //兼容groupedColumn和stackedColumn类型
  columnSize?: number;
  columnStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  label?: IColumnLabel;
}

export interface ColumnLineViewConfig extends ComboViewConfig {
  xAxis?: ICatAxis;
  tooltip?: any;
  lineSeriesField?: string;
  lineConfig?: LineConfig;
  columnConfig?: ColumnConfig;
}

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
  color: '#5B8FF9',
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

interface ColumnLineLayerConfig extends ColumnLineViewConfig, LayerConfig {}

export default class ColumnLineLayer<T extends ColumnLineLayerConfig = ColumnLineLayerConfig> extends ComboViewLayer<
  T
> {
  public static getDefaultOptions(): Partial<ColumnLineLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      yAxis: {
        leftConfig: defaultYAxisConfig,
        rightConfig: defaultYAxisConfig,
      },
      lineConfig: defaultLineConfig,
      columnConfig: defaultColumnConfig,
      legend: {
        visible: true,
      },
    });
  }

  public type: string = 'columnLine';
  protected colors: string[];
  protected legends: any[] = [];

  public beforeInit() {
    const { options, initialOptions } = this;
    if (options.lineSeriesField) {
      options.yAxis.rightConfig.colorMapping = false;
      if (!initialOptions.lineConfig?.lineSize) {
        options.lineConfig.lineSize = 3;
      }
      if (!initialOptions.lineConfig?.color) {
        const { colors, colors_20 } = getGlobalTheme();
        const seriesValue = this.getValueBySeriesField();
        const colorSeries = seriesValue.length > colors.length ? colors_20 : colors;
        const colorPlates = [];
        each(seriesValue, (v, index) => {
          colorPlates.push(colorSeries[index + 1]);
        });
        options.lineConfig.color = colorPlates;
      }
    }
  }

  public init() {
    super.init();
    if (!this.checkData()) {
      return;
    }
    const { data, meta, xField, yField, lineSeriesField, legend, lineConfig, columnConfig, events } = this.options;
    this.colors = [columnConfig.color as string, lineConfig.color as any];
    // draw column
    this.drawColumn();
    //draw line
    const metaInfo = {};
    metaInfo[yField[1]] = { ticks: this.getTicks() };
    const line = this.createLayer(LineLayer, data[1], {
      xField,
      yField: yField[1],
      seriesField: lineSeriesField,
      meta: deepMix({}, meta, metaInfo),
      xAxis: {
        visible: false,
      },
      yAxis: deepMix({}, this.yAxis(1), {
        position: 'right',
        grid: {
          visible: false,
        },
        nice: true,
      }),
      tooltip: {
        visible: false,
      },
      legend: {
        visible: false,
      },
      events,
      ...lineConfig,
    });
    line.render();
    if (legend.visible) {
      this.customLegend();
    }
    this.adjustLayout();
  }

  protected drawColumn() {
    const { data, xField, yField, xAxis, tooltip, columnConfig, meta, events } = this.options;
    const column = this.createLayer(ColumnLayer, data[0], {
      xField,
      yField: yField[0],
      meta,
      xAxis,
      yAxis: deepMix({}, this.yAxis(0), {
        grid: {
          visible: true,
        },
        nice: true,
      }),
      tooltip: deepMix({}, tooltip, {
        showMarkers: false,
        customContent: {
          callback: (containerDom, ev) => {
            this.tooltip(containerDom, ev);
          },
        },
      }),
      events,
      ...columnConfig,
    });
    column.render();
  }

  protected tooltip(dom, ev) {
    const { yField } = this.options;
    const originItem = clone(ev.items[0]);
    const dataItemsA = this.getDataByXField(ev.title, 1);
    if (dataItemsA) {
      each(dataItemsA, (d, index) => {
        const { seriesField } = this.geomLayers[1].options as any;
        const name = seriesField ? d[seriesField] : yField[1];
        ev.items.push({
          ...originItem,
          mappingData: deepMix({}, originItem.mappingData, { _origin: dataItemsA }),
          data: d,
          name,
          value: d[yField[1]],
          color: isArray(this.colors[1]) ? this.colors[1][index] : this.colors[1],
        });
      });
    }

    if (this.options.legend.visible) {
      const unCheckedValue = this.getUnCheckedValue();
      const totalItems = this.legends[0].get('items').length + this.legends[1].get('items').length;
      // 如果legend全部是unchecked的状态，tooltip不显示
      if (unCheckedValue.length === totalItems) {
        dom.style.display = 'none';
        return;
      } else {
        dom.style.display = 'block';
      }
      // legend部分checked的时候，根据checked状态filter items
      const uniqKeys = [];
      const uniqItems = [];
      each(ev.items, (item) => {
        const { name } = item;
        if (!contains(uniqKeys, name) && !contains(unCheckedValue, name)) {
          uniqKeys.push(name);
          uniqItems.push(item);
        }
      });
      each(ev.items, (item, index) => {
        if (index < uniqItems.length) {
          ev.items[index] = uniqItems[index];
        } else {
          ev.items.pop();
        }
      });
    }
  }

  protected customLegend() {
    const { yField, legend } = this.options;
    const { colors } = this;
    const container = this.container.addGroup();
    const legendCfg = legend;
    const symbols = ['square', 'circle'];
    each(this.geomLayers, (geom, index) => {
      let legend;
      if (geom.options.seriesField) {
        const values = this.getValueBySeriesField();
        legend = this.createNormalLegend(values, symbols[index], colors[index], legendCfg, container);
      } else {
        legend = this.createSingleLegend(yField[index], symbols[index], colors[index], legendCfg, container);
      }
      this.legends.push(legend);
    });
    // 使用legend做图层筛选
    each(this.geomLayers, (geom, index) => {
      if (geom.options.seriesField) {
        this.multipleLegendFilter(index, geom.options.seriesField);
      } else {
        this.legendFilter(index);
      }
    });
  }

  protected createSingleLegend(name, symbol, color, cfg, container) {
    const markerCfg = deepMix(
      {},
      {
        symbol,
        style: {
          r: 4,
          fill: color,
        },
      },
      cfg.marker
    );
    const items = [
      {
        name,
        unchecked: false,
        marker: markerCfg,
      },
    ];
    const legend = new Legend.Category({
      id: this.type,
      container,
      x: 0,
      y: 0,
      items: items,
      updateAutoRender: true,
      itemBackground: null,
      itemName: cfg.text,
    });
    legend.init();
    legend.render();
    return legend;
  }

  protected createNormalLegend(values, symbol, color, cfg, container) {
    const legendItems = [];
    each(values, (v, index) => {
      legendItems.push({
        name: v,
        unchecked: false,
        marker: {
          symbol,
          style: {
            r: 4,
            fill: color[index],
          },
        },
      });
    });
    const legend = new Legend.Category({
      id: this.type,
      container,
      x: 0,
      y: 0,
      items: legendItems,
      updateAutoRender: true,
      itemBackground: null,
      itemName: cfg.text,
      offsetX: 0,
    });
    legend.init();
    legend.render();
    return legend;
  }

  protected multipleLegendFilter(index, field) {
    const legend = this.legends[index];
    const filteredValue = [];
    const legend_group = legend.get('group');
    let layerHide = false;
    legend_group.on('click', (ev) => {
      const view = this.geomLayers[index].view;
      const item = ev.target.get('delegateObject').item;
      if (item.unchecked) {
        if (layerHide === true) {
          this.showLayer(index);
          layerHide = false;
        }
        pull(filteredValue, item.name);
        view.filter(item.value, (f) => {
          return !contains(filteredValue, f);
        });
        view.render();
        legend.setItemState(item, 'unchecked', false);
      } else {
        legend.setItemState(item, 'unchecked', true);
        filteredValue.push(item.name);
        if (filteredValue.length === this.legends[index].get('items').length) {
          // 如果分组分类全部被uncheck了，直接隐藏图层，这样仍然可以trigger tooltip
          this.hideLayer(index);
          layerHide = true;
        } else {
          view.filter(field, (f) => {
            return !contains(filteredValue, f);
          });
          view.render();
        }
      }
      this.canvas.draw();
    });
  }

  protected getValueBySeriesField() {
    const { lineSeriesField, data } = this.options;
    const lineData = data[1];
    const values = [];
    each(lineData, (d) => {
      const v = d[lineSeriesField];
      if (!contains(values, v)) {
        values.push(v);
      }
    });
    return values;
  }
}

registerPlotType('columnLine', ColumnLineLayer);
