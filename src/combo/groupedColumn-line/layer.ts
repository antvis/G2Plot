import { registerPlotType } from '../../base/global';
import { deepMix, each, contains } from '@antv/util';
import { LayerConfig } from '../../base/layer';
import ColumnLineLayer, { ColumnLineViewConfig } from '../column-line/layer';
import GroupedColumnLayer from '../../plots/grouped-column/layer';
import { getGlobalTheme } from '../../theme';

export interface GroupedColumnLineViewConfig extends ColumnLineViewConfig {
  columnGroupField?: string;
}

interface GroupedColumnLineLayerConfig extends GroupedColumnLineViewConfig, LayerConfig {}

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

export default class GroupedColumnLineLayer<
  T extends GroupedColumnLineLayerConfig = GroupedColumnLineLayerConfig
> extends ColumnLineLayer<T> {
  public static getDefaultOptions(): Partial<GroupedColumnLineLayerConfig> {
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
  protected requiredField: string[] = ['xField', 'yField', 'columnGroupField'];

  public beforeInit() {
    const { options, initialOptions } = this;
    const groupedValue = this.getValueByGroupField();
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
        const startIndex = groupedValue.length;
        each(seriesValue, (v, index) => {
          colorPlates.push(colorSeries[index + startIndex]);
        });
        options.lineConfig.color = colorPlates;
      }
    }
    const { color } = this.options.columnConfig;
    this.options.columnConfig.color = color.slice(0, groupedValue.length);
  }

  protected drawColumn() {
    const { data, xField, yField, columnGroupField, xAxis, tooltip, columnConfig, events } = this.options;
    const column = this.createLayer(GroupedColumnLayer, data[0], {
      xField,
      yField: yField[0],
      groupField: columnGroupField,
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
      } else if (geom.options.groupField) {
        const values = this.getValueByGroupField();
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
      } else if (geom.options.groupField) {
        this.multipleLegendFilter(index, geom.options.groupField);
      } else {
        this.legendFilter(index);
      }
    });
  }

  protected getValueByGroupField() {
    const { columnGroupField, data } = this.options;
    const columnData = data[0];
    const values = [];
    each(columnData, (d) => {
      const v = d[columnGroupField];
      if (!contains(values, v)) {
        values.push(v);
      }
    });
    return values;
  }

  protected getMockData(index: number) {
    const { xField, yField, columnGroupField } = this.options as any;
    const mockA = {};
    mockA[xField] = 'null_1';
    mockA[yField[index]] = 0;
    mockA[columnGroupField] = 'null_a';
    const mockB = {};
    mockB[xField] = 'null_1';
    mockB[yField[index]] = 1;
    mockB[columnGroupField] = 'null_a';
    return [mockA, mockB];
  }
}

registerPlotType('groupedColumnLine', GroupedColumnLineLayer);
