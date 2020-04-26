import { registerPlotType } from '../../base/global';
import ComboViewLayer, { ComboViewConfig } from '../base';
import { LayerConfig } from '../../base/layer';
import LineLayer from '../../plots/line/layer';
import { clone, deepMix, each, hasKey, isString } from '@antv/util';
import { DataItem, IValueAxis, ICatAxis, ITimeAxis } from '../../interface/config';

interface DualLineYAxis extends IValueAxis {
  colorMapping?: boolean;
}

export interface DualLineViewConfig extends ComboViewConfig {
  xField: string;
  yField: string[];
  data: DataItem[][];
  xAxis: IValueAxis | ICatAxis | ITimeAxis;
  yAxis: DualLineYAxis;
  colors: string[];
}

interface DualLineLayerConfig extends DualLineViewConfig, LayerConfig {}

export default class DualLineLayer<T extends DualLineLayerConfig = DualLineLayerConfig> extends ComboViewLayer<T> {
  public static getDefaultOptions(): Partial<DualLineLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      // 自古红蓝出cp....
      colors: ['#5B8FF9', '#e76c5e'],
      yAxis: {
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
      },
    });
  }

  public type: string = 'dualLine';
  protected lines: LineLayer[] = [];

  public init() {
    super.init();
    const { data, xField, yField, colors } = this.options;

    //draw first line
    const leftLine = this.createLineLayer(data[0], {
      xField,
      yField: yField[0],
      xAxis: {
        visible: false,
      },
      yAxis: deepMix({}, this.yAxis(0), {
        visible: true,
        tickCount: 5,
        nice: true,
      }),
      tooltip: {
        visible: false,
      },
      color: colors[0],
    });
    leftLine.render();
    //draw second line
    const rightLine = this.createLineLayer(data[1], {
      xField,
      yField: yField[1],
      color: colors[1],
      yAxis: deepMix({}, this.yAxis(1), {
        position: 'right',
        grid: {
          visible: false,
        },
        tickCount: 5,
        nice: true,
      }),
      tooltip: {
        visible: true,
        showMarkers: false,
        customContent: {
          callback: (containerDom, ev) => {
            this.tooltip(ev);
          },
        },
      },
    });
    rightLine.render();

    this.adjustLayout();
  }

  protected createLineLayer(data, config) {
    const viewRange = this.getViewRange();
    const lineLayer = new LineLayer({
      canvas: this.canvas,
      container: this.container,
      x: viewRange.minX,
      y: viewRange.minY,
      width: viewRange.width,
      height: viewRange.height,
      data,
      ...config,
    });
    this.lines.push(lineLayer);
    return lineLayer;
  }

  protected adjustLayout() {
    const leftPadding = this.lines[0].options.padding;
    const rightPadding = this.lines[1].options.padding;
    // 同步左右padding
    const uniquePadding = [leftPadding[0], rightPadding[1], rightPadding[2], leftPadding[3]];
    this.lines[0].updateConfig({
      padding: uniquePadding,
    });
    this.lines[0].render();
    this.lines[1].updateConfig({
      padding: uniquePadding,
    });
    this.lines[1].render();
  }

  protected scale() {
    return;
  }

  protected yAxis(index) {
    const { yAxis, colors } = this.options;
    const colorValue = colors[index];
    const yAxisConfig = clone(yAxis);
    const styleMap = {
      title: 'stroke',
      line: 'stroke',
      label: 'fill',
      tickLine: 'stroke',
    };
    if (yAxis.visible && yAxis.colorMapping) {
      each(yAxisConfig, (config, name) => {
        if (!isString(config) && hasKey(styleMap, name)) {
          const styleKey = styleMap[name];
          if (!config.style) {
            config.style = {};
          }
          config.style[styleKey] = colorValue;
        }
      });
    }
    return yAxisConfig;
  }

  protected tooltip(ev) {
    const { yField } = this.options;
    const originItem = clone(ev.items[0]);
    const dataItemsA = this.getDataByXField(ev.title, 0)[0];
    ev.items.push({
      ...originItem,
      mappingData: deepMix({}, originItem.mappingData, { _origin: dataItemsA }),
      data: dataItemsA,
      name: 'value',
      value: dataItemsA[yField[0]],
      color: '#5B8FF9',
    });
  }

  protected getDataByXField(value, index) {
    const { data, xField } = this.options;
    const dataSource = data[index];
    return dataSource.filter((d) => {
      return d[xField] === value;
    });
  }
}

registerPlotType('dualLine', DualLineLayer);
