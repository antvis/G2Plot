import { Legend } from '@antv/component';
import { registerPlotType } from '../../base/global';
import ComboViewLayer from '../base';
import { LayerConfig } from '../../base/layer';
import LineLayer from '../../plots/line/layer';
import ColumnLayer from '../../plots/column/layer';
import { IColumnLabel } from '../../plots/column/interface';
import { deepMix, clone, each } from '@antv/util';
import { ICatAxis, GraphicStyle } from '../../interface/config';
import { ComboViewConfig, LineConfig } from '../util/interface';

export interface ColumnConfig {
  color?: string | string[]; //兼容groupedColumn和stackedColumn类型
  columnSize?: number;
  columnStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  label?: IColumnLabel;
}

export interface ColumnLineViewConfig extends ComboViewConfig {
  xAxis?: ICatAxis;
  tooltip?: any;
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

  public init() {
    super.init();
    const { data, xField, yField, legend, lineConfig, columnConfig } = this.options;
    this.colors = [columnConfig.color as string, lineConfig.color];
    // draw column
    this.drawColumn();
    //draw line
    const metaInfo = {};
    metaInfo[yField[1]] = { ticks: this.getTicks() };
    const line = this.createLayer(LineLayer, data[1], {
      xField,
      yField: yField[1],
      meta: metaInfo,
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
      ...lineConfig,
    });
    line.render();
    if (legend.visible) {
      this.customLegend();
    }
    this.adjustLayout();
  }

  protected drawColumn() {
    const { data, xField, yField, xAxis, tooltip, columnConfig } = this.options;
    const column = this.createLayer(ColumnLayer, data[0], {
      xField,
      yField: yField[0],
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
            this.tooltip(ev);
          },
        },
      }),
      ...columnConfig,
    });
    column.render();
  }

  protected tooltip(ev) {
    const { yField, legend } = this.options;
    const originItem = clone(ev.items[0]);
    const dataItemsA = this.getDataByXField(ev.title, 1)[0];
    ev.items.push({
      ...originItem,
      mappingData: deepMix({}, originItem.mappingData, { _origin: dataItemsA }),
      data: dataItemsA,
      name: 'value',
      value: dataItemsA[yField[1]],
      color: this.colors[1],
    });
    if (legend.visible) {
      each(this.legends, (legend, index) => {
        const item = legend.get('items')[0];
        if (item.unchecked) {
          ev.items.splice(index, 1);
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
    each(this.geomLayers, (line, index) => {
      const markerCfg = deepMix(
        {},
        {
          symbol: symbols[index],
          style: {
            r: 4,
            fill: colors[index],
          },
        },
        legendCfg.marker
      );
      const items = [
        {
          name: yField[index],
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
        itemName: legendCfg.text,
      });
      legend.init();
      legend.render();
      this.legends.push(legend);
    });
    // 使用legend做图层筛选
    each(this.geomLayers, (line, index) => {
      this.legendFilter(index);
    });
  }
}

registerPlotType('columnLine', ColumnLineLayer);
