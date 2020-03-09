import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import GaugeLayer from '../gauge/layer';
import { GaugeViewConfig } from '../gauge/options';
import { getOptions } from '../gauge/geometry/shape/options';

export interface FanGaugeViewConfig extends GaugeViewConfig {
    stackField: string;
    connectedArea?: any;
}

export interface FanGaugeLayerConfig extends FanGaugeViewConfig, LayerConfig { }

export default class FanGaugeLayer<
    T extends FanGaugeLayerConfig = FanGaugeLayerConfig
    > extends GaugeLayer<T> {
    public static getDefaultOptions() {
        return deepMix({}, super.getDefaultOptions(), {
            legend: {
                visible: true,
                position: 'right-top',
            },
            label: {
                visible: false,
                position: 'middle',
                offset: 0,
                adjustColor: true,
            },
            connectedArea: {
                visible: false,
                triggerOn: 'mouseenter',
            },
        });
    }

    public type: string = 'fanGauge';

    protected getCustomStyle() {
        const { theme, styleMix } = this.options;
        const colors = styleMix.colors || this.config.theme.colors;

        return getOptions('fan', theme, colors);
    }

    protected annotation() {
        const annotationConfigs = [];
        const siderTexts = this.renderSideText();
        const allAnnotations = annotationConfigs.concat(siderTexts);
        this.setConfig('annotations', allAnnotations);
      }
    
      protected renderSideText() {
        const { max, min, styleMix, format, style } = this.options;
        const ringStyle = this.getCustomStyle().ringStyle;
        const OFFSET_Y = 12;
        return [min, max].map((value, index) => {
          return {
            type: 'text',
            top: true,
            position: ['50%', '50%'],
            content: format(value),
            style: {
              fill: styleMix.labelColor, // 文本颜色
              fontSize: styleMix.tickLabelSize, // 文本大小
              textAlign: 'center',
            },
            offsetX: !index ? -ringStyle.thickness : ringStyle.thickness,
            offsetY: OFFSET_Y,
          };
        });
      }
}

registerPlotType('fanGauge', FanGaugeLayer);
