import { registerPlotType } from '../../base/global';
import { deepMix, each, contains } from '@antv/util';
import { LayerConfig } from '../../base/layer';
import ColumnLineLayer, { ColumnLineViewConfig } from '../column-line/layer';
import StackedColumnLayer from '../../plots/stacked-column/layer';
import { getGlobalTheme } from '../../theme';

export interface StackedColumnLineViewConfig extends ColumnLineViewConfig {
  columnStackField?: string;
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
  protected requiredField: string[] = ['xField', 'yField', 'columnStackField'];

  public beforeInit() {
    const stackedValue = this.getValueByStackField();
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
        const startIndex = stackedValue.length;
        each(seriesValue, (v, index) => {
          colorPlates.push(colorSeries[index + startIndex]);
        });
        options.lineConfig.color = colorPlates;
      }
    }
    const { color } = this.options.columnConfig;
    this.options.columnConfig.color = color.slice(0, stackedValue.length);
  }

  protected drawColumn() {
    const { data, xField, yField, columnStackField, xAxis, tooltip, columnConfig, events } = this.options;
    const column = this.createLayer(StackedColumnLayer, data[0], {
      xField,
      yField: yField[0],
      stackField: columnStackField,
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
      events,
      ...columnConfig,
    });
    column.render();
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
      } else if (geom.options.stackField) {
        const values = this.getValueByStackField();
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
      } else if (geom.options.stackField) {
        this.multipleLegendFilter(index, geom.options.stackField);
      } else {
        this.legendFilter(index);
      }
    });
  }

  protected getValueByStackField() {
    const { columnStackField, data } = this.options;
    const columnData = data[0];
    const values = [];
    each(columnData, (d) => {
      const v = d[columnStackField];
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

  protected getMockData(index: number) {
    const { xField, yField, columnStackField } = this.options as any;
    const mockA = {};
    mockA[xField] = 'null_1';
    mockA[yField[index]] = 0;
    mockA[columnStackField] = 'null_a';
    const mockB = {};
    mockB[xField] = 'null_1';
    mockB[yField[index]] = 1;
    mockB[columnStackField] = 'null_a';
    return [mockA, mockB];
  }
}

registerPlotType('stackedColumnLine', StackedColumnLineLayer);
