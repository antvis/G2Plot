import { Legend } from '@antv/component';
import { registerPlotType } from '../../base/global';
import ComboViewLayer from '../base';
import { LayerConfig } from '../../base/layer';
import LineLayer from '../../plots/line/layer';
import { clone, deepMix, each } from '@antv/util';
import { IValueAxis, ICatAxis, ITimeAxis } from '../../interface/config';
import { ComboViewConfig, LineConfig } from '../util/interface';

export interface DualLineViewConfig extends ComboViewConfig {
  xAxis?: IValueAxis | ICatAxis | ITimeAxis;
  tooltip?: any;
  lineConfigs?: LineConfig[];
}

const defaultLineConfig = {
  lineSize: 2,
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

interface DualLineLayerConfig extends DualLineViewConfig, LayerConfig {}

export default class DualLineLayer<T extends DualLineLayerConfig = DualLineLayerConfig> extends ComboViewLayer<T> {
  public static getDefaultOptions(): Partial<DualLineLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      legend: {
        visible: true,
      },
      yAxis: {
        leftConfig: defaultYAxisConfig,
        rightConfig: defaultYAxisConfig,
      },
      // 自古红蓝出cp....
      lineConfigs: [
        deepMix({}, defaultLineConfig, { color: '#5B8FF9' }),
        deepMix({}, defaultLineConfig, { color: '#e76c5e' }),
      ],
    });
  }

  public type: string = 'dualLine';

  public init() {
    super.init();
    if (!this.checkData()) {
      return;
    }
    const { data, meta, xField, yField, xAxis, tooltip, lineConfigs, legend, events } = this.options;
    this.colors = [lineConfigs[0].color as string, lineConfigs[1].color as string];
    const yAxisGlobalConfig = this.getYAxisGlobalConfig();
    //draw first line
    const leftLine = this.createLayer(LineLayer, data[0], {
      meta,
      xField,
      yField: yField[0],
      xAxis: {
        visible: false,
      },
      yAxis: deepMix({}, yAxisGlobalConfig, this.yAxis(0), {
        grid: {
          visible: false,
        },
        nice: true,
      }),
      tooltip: {
        visible: false,
      },
      events,
      ...lineConfigs[0],
    });
    leftLine.render();
    //draw second line
    const metaInfo = {};
    metaInfo[yField[1]] = { ticks: this.getTicks() };
    const rightLine = this.createLayer(LineLayer, data[1], {
      xField,
      yField: yField[1],
      meta: deepMix({}, meta, metaInfo),
      serieField: yField[1],
      xAxis,
      yAxis: deepMix({}, yAxisGlobalConfig, this.yAxis(1), {
        position: 'right',
        nice: false,
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
      ...lineConfigs[1],
    });
    rightLine.render();
    if (legend.visible) {
      this.customLegend();
    }
    this.adjustLayout();
  }

  protected tooltip(dom, ev) {
    const unCheckedValue = this.getUnCheckedValue();
    // 如果legend全部是unchecked的状态，tooltip不显示
    if (unCheckedValue.length === this.colors.length) {
      dom.style.display = 'none';
      return;
    } else {
      dom.style.display = 'block';
    }
    const { yField, legend } = this.options;
    const originItem = clone(ev.items[0]);
    const dataItemsA = this.getDataByXField(ev.title, 0)[0];
    if (dataItemsA) {
      ev.items.push({
        ...originItem,
        mappingData: deepMix({}, originItem.mappingData, { _origin: dataItemsA }),
        data: dataItemsA,
        name: yField[0],
        value: dataItemsA[yField[0]],
        color: this.colors[0],
      });
    }
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
    each(this.geomLayers, (line, index) => {
      const markerCfg = deepMix(
        {},
        {
          symbol: 'circle',
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

registerPlotType('dualLine', DualLineLayer);
