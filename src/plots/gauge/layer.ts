/**
 * @author linhuiw
 * @description 仪表盘 layer
 */
import { deepMix, uniqueId } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer from '../../base/view-layer';
import { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';
import { GaugeViewConfig } from './interface';
import { GaugeShape } from './geometry/shape/gauge-shape';
import * as EventParser from './event';

export interface GaugeLayerConfig extends GaugeViewConfig, LayerConfig {}

export default class GaugeLayer<T extends GaugeLayerConfig = GaugeLayerConfig> extends ViewLayer<T> {
  data: [];

  gaugeShape: any;

  options: any;

  constructor(props) {
    super(props);
  }

  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      startAngle: -7 / 6,
      endAngle: 1 / 6,
      rangeBackgroundStyle: {
        fill: '#f0f0f0',
      },
      rangeSize: 24,
      statistic: {
        position: ['50%', '80%'],
      },
      axis: {
        visible: true,
        offset: -10,
        tickCount: 21,
        subTickCount: 4,
        tickLine: {
          visible: true,
          length: 5,
          style: {
            stroke: '#aaa',
            lineWidth: 2,
          },
        },
        label: {
          visible: true,
          style: {
            fill: '#aaa',
            fontSize: 16,
            textAlign: 'center',
            textBaseline: 'middle',
          },
        },
      },
      pivot: {
        visible: true,
        thickness: 6,
        pin: {
          visible: true,
          size: 2,
          style: {
            fill: '#2E364B',
          },
        },
        base: {
          visible: true,
          style: {
            fill: '#EEEEEE',
          },
        },
        pointer: {
          visible: true,
          style: {
            fill: '#CFCFCF',
          },
        },
      },
    });
  }

  public type: string = 'gauge';

  public init() {
    const { value, range } = this.options;
    const rangeSorted = (range || []).map((d: number) => +d).sort((a: number, b: number) => a - b);

    const { min = rangeSorted[0], max = rangeSorted[rangeSorted.length - 1], format = (d) => `${d}` } = this.options;

    const valueText = format(value);
    //const styleMix = this.getStyleMix();
    //this.options.styleMix = styleMix;
    this.options.data = [{ value: value || 0 }];
    this.options.valueText = valueText;
    this.options.min = min;
    this.options.max = max;
    this.options.format = format;
    this.initG2Shape();
    super.init();
  }

  /**
   * 绘制指针
   */
  protected initG2Shape() {
    this.gaugeShape = new GaugeShape(uniqueId());
    this.gaugeShape.setOption(
      this.type,
      deepMix({}, this.options, {
        radius: 0.6,
        angle: 240,
        textPosition: '100%',
      })
    );
    this.gaugeShape.render();
  }

  protected geometryParser(): string {
    return 'gauge';
  }

  protected scale() {
    const { min, max, format } = this.options;
    const scales = {
      value: {},
    };
    extractScale(scales.value, {
      min,
      max,
      minLimit: min,
      maxLimit: max,
      nice: true,
      formatter: format,
      // 自定义 tick step
      tickInterval: 20,
    });
    // @ts-ignore
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {
    const coordConfig: any = {
      type: 'polar',
      cfg: {
        radius: 1,
        startAngle: this.options.startAngle * Math.PI,
        endAngle: this.options.endAngle * Math.PI,
      },
    };
    this.setConfig('coordinate', coordConfig);
  }

  protected axis() {
    const { axis } = this.options;
    const axesConfig: any = {
      value: {
        line: null,
        grid: null,
        tickLine: null,
      },
    };
    let offsetValue;
    if (axis.offset < 0) {
      offsetValue = axis.offset - this.options.rangeSize - axis.tickLine.length;
    } else {
      offsetValue = axis.offset + axis.tickLine.length;
    }
    if (axis.label.visible) {
      axesConfig.value.label = {
        offset: offsetValue,
        textStyle: axis.label.style,
        autoRotate: true,
      };
    } else {
      axesConfig.value.label = {
        style: {
          opacity: 0,
        },
      };
    }
    axesConfig['1'] = false;
    axesConfig['value'] = axis.visible ? axesConfig['value'] : false;
    this.setConfig('axes', axesConfig);
  }

  protected addGeometry() {
    const pointerColor = this.options.pivot.pointer.style.fill || this.theme.defaultColor;

    const pointer: ElementOption = {
      type: 'point',
      position: {
        fields: ['value', '1'],
      },
      shape: {
        values: ['gauge'],
      },
      color: {
        values: [pointerColor],
      },
    };

    this.setConfig('geometry', pointer);
  }

  protected annotation() {
    const { statistic } = this.options;
    const annotationConfigs = [];
    // @ts-ignore
    if (statistic && statistic.visible) {
      const statistics = this.renderStatistic();
      annotationConfigs.push(statistics);
    }
    this.setConfig('annotations', annotationConfigs);
  }

  protected renderStatistic() {
    const containerSize = Math.max(this.options.width, this.options.height) / 20;
    const { statistic } = this.options;
    const text = {
      type: 'text',
      content: statistic.text,
      top: true,
      position: statistic.position,
      style: {
        fill: statistic.color,
        fontSize: statistic.size ? statistic.size : containerSize * 1.2,
        textAlign: 'center',
        textBaseline: 'middle',
      },
    };
    return text;
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }
}

registerPlotType('gauge', GaugeLayer);
