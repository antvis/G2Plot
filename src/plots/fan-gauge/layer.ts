import { deepMix, uniqueId } from '@antv/util';
import { registerPlotType } from '../../base/global';
import GaugeLayer from '../gauge/layer';
import { GaugeShape } from '../gauge/geometry/shape/gauge-shape';
import { GaugeViewConfig } from '../gauge/interface';
import { LayerConfig } from '../../base/layer';

export interface FanGaugeViewConfig extends GaugeViewConfig {}

export interface FanGaugeLayerConfig extends FanGaugeViewConfig, LayerConfig {}

export default class FanGaugeLayer<T extends FanGaugeLayerConfig = FanGaugeLayerConfig> extends GaugeLayer<T> {
  public static getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
      rangeColor: '#F6445A',
      rangeSize: 70,
      axis: {
        visible: true,
        offset: 5,
        tickCount: 10,
        subTickCount: 4,
        tickLine: {
          visible: true,
          length: 3,
          style: {
            stroke: '#aaa',
            lineWidth: 3,
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
    });
  }

  public type: string = 'fanGauge';

  protected initG2Shape() {
    this.gaugeShape = new GaugeShape(uniqueId());
    this.gaugeShape.setOption(
      this.type,
      deepMix({}, this.options, {
        radius: 1,
        angle: 120,
        textPosition: '125%',
        bottomRatio: 3.5,
      })
    );
    this.gaugeShape.render();
  }

  protected axis() {
    const axesConfig: any = {
      value: false,
      1: false,
    };
    this.setConfig('axes', axesConfig);
  }

  protected annotation() {
    const { statistic, style } = this.options;
    const annotationConfigs = [];
    // @ts-ignore
    if (statistic && statistic.visible) {
      const statistics = this.renderStatistic();
      annotationConfigs.push(statistics);
    }
    const siderTexts = this.renderSideText();
    const allAnnotations = annotationConfigs.concat(siderTexts);
    this.setConfig('annotations', allAnnotations);
  }

  protected renderSideText() {
    const { max, min, format, rangeSize, axis } = this.options;
    const OFFSET_Y = 12;
    return [min, max].map((value, index) => {
      return {
        type: 'text',
        top: true,
        position: ['50%', '50%'],
        content: format(value),
        style: deepMix({}, axis.label.style, {
          textAlign: 'center',
        }),
        offsetX: !index ? -rangeSize : rangeSize,
        offsetY: OFFSET_Y,
      };
    });
  }
}

registerPlotType('fanGauge', FanGaugeLayer);
