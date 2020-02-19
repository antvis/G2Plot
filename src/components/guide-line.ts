import { getScale } from '@antv/scale';
import { assign, deepMix, mix, each } from '@antv/util';
import { getMean, getMedian } from '../util/math';

export default class GuideLine {
  public config: any;
  private plot: any;
  private cfg: any;
  private values: number[];

  constructor(cfg) {
    assign(this, cfg);
    this._init();
  }

  private _init() {
    const props = this.plot.options;
    const defaultStyle = this.getDefaultStyle();
    const baseConfig: any = {
      type: 'line',
      top: true,
      start: this.cfg.start,
      end: this.cfg.end,
    };
    baseConfig.line = deepMix({}, defaultStyle.line, { style: this.cfg.lineStyle });
    baseConfig.text = deepMix({}, defaultStyle.text, this.cfg.text);
    if (this.cfg.type) {
      const stateValue = this._getState(this.cfg.type);
      const minValue = this._getState('min');
      const maxValue = this._getState('max');
      const Scale = getScale('linear');
      // 重新组织scale并使用scale的min和max来计算guide point的百分比位置，以避免受nice的影响
      const scale = new Scale(
        mix(
          {},
          {
            min: this.plot.type === 'column' ? 0 : minValue,
            max: maxValue,
            nice: true,
            values: this.values,
          },
          this.plot.config.scales[props.yField]
        )
      );
      const percent = `${(1.0 - scale.scale(stateValue)) * 100}%`;
      const start = ['0%', percent];
      const end = ['100%', percent];
      this.config = mix(
        {
          start,
          end,
        },
        baseConfig
      );
    } else {
      this.config = baseConfig;
    }
  }

  private _getState(type) {
    this.values = this._extractValues();
    if (type === 'median') {
      return getMedian(this.values);
    }
    if (type === 'mean') {
      return getMean(this.values);
    }
    if (type === 'max') {
      return Math.max(...this.values);
    }
    if (type === 'min') {
      return Math.min(...this.values);
    }
  }

  private _extractValues() {
    const props = this.plot.options;
    const field = props.yField;
    const values = [];
    each(props.data, (d) => {
      values.push(d[field]);
    });
    return values;
  }

  private getDefaultStyle() {
    this.getDefaultTextAlign();
    return {
      line: {
        style: {
          lineWidth: 2,
          stroke: '#333333',
          opacity: 0.7,
          lineDash: [0, 0],
        },
      },
      text: {
        offsetY: -5,
        style: {
          fontSize: 14,
          stroke: 'white',
          lineWidth: 2,
          textAlign: this.getDefaultTextAlign(),
        },
      },
    };
  }

  private getDefaultTextAlign() {
    const textConfig = this.cfg.text;
    if (textConfig) {
      if (!textConfig.position || textConfig.position === 'start') {
        return 'left';
      }
      if (textConfig.position === 'center') {
        return 'center';
      }
      if (textConfig.position === 'end') {
        return 'right';
      }
    }
  }
}
