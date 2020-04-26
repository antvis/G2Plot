import { registerPlotType } from '../../base/global';
import ComboViewLayer, { ComboViewConfig } from '../base';
import { LayerConfig } from '../../base/layer';
import LineLayer from '../../plots/line/layer';
import { clone, deepMix } from '@antv/util';

export interface DualLineViewConfig extends ComboViewConfig {}

interface DualLineLayerConfig extends DualLineViewConfig, LayerConfig {}

export default class DualLineLayer<T extends DualLineLayerConfig = DualLineLayerConfig> extends ComboViewLayer<T> {
  public type: string = 'dualLine';
  protected lines: LineLayer[] = [];

  public init() {
    super.init();
    const { data, xField, yField } = this.options;

    //draw first line
    const leftLine = this.createLineLayer(data[0], {
      xField,
      yField: yField[0],
      xAxis: {
        visible: false,
      },
      tooltip: {
        visible: false,
      },
    });
    leftLine.render();
    //draw second line
    const rightLine = this.createLineLayer(data[1], {
      xField,
      yField: yField[1],
      yAxis: {
        position: 'right',
        grid: {
          visible: false,
        },
      },
      tooltip: {
        visible: true,
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

  protected tooltip(ev) {
    const { yField } = this.options;
    const originItem = clone(ev.items[0]);
    const dataItemsA = this.getDataByXField(ev.title, 0)[0];
    //ev.items = [];
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
