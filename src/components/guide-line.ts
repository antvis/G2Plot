import { getScale } from '@antv/scale';
import { assign, deepMix, mix, each, isArray, isString, isNumber, contains, toArray, clone, isEmpty } from '@antv/util';
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
    const { yField, data } = this.plot.options;
    const plotData = this.plot.processData(data);
    if (isEmpty(plotData) || !isNumber(plotData[0][yField])) {
      return;
    }
    const defaultStyle = this.getDefaultStyle();
    const baseConfig: any = {
      type: 'line',
      top: true,
      start: this.cfg.start,
      end: this.cfg.end,
    };

    baseConfig.style = deepMix({}, defaultStyle.line.style, this.cfg.lineStyle);
    baseConfig.text = deepMix({}, defaultStyle.text, this.cfg.text);
    if (this.cfg.type) {
      const stateValue = this._getState(this.cfg.type);
      const scale = this.getYScale();
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
      const { start, end } = this.cfg;
      this.config = clone(baseConfig);
      const xScale = this.getXScale();
      const yScale = this.getYScale();
      const startData = clone(start);
      const endData = clone(end);
      each(start, (value, index) => {
        if (!contains(toArray(start[index]), '%') || isNumber(start[index])) {
          if (index === 0) {
            startData[index] = `${xScale.scale(start[0]) * 100}%`;
          } else {
            startData[index] = `${(1.0 - yScale.scale(start[1])) * 100}%`;
          }
        }
      });
      each(end, (value, index) => {
        if (!contains(toArray(end[index]), '%') || isNumber(end[index])) {
          if (index === 0) {
            endData[index] = `${xScale.scale(end[0]) * 100}%`;
          } else {
            endData[index] = `${(1.0 - yScale.scale(end[1])) * 100}%`;
          }
        }
      });
      this.config.start = startData;
      this.config.end = endData;
    }
  }

  private getYScale() {
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
        this.plot.config.scales[this.plot.options.yField]
      )
    );
    return scale;
  }

  private getXScale() {
    const values = this.extractXValue();
    if (isString(values[0])) {
      const Scale = getScale('cat');
      const scale = new Scale(
        mix(
          {},
          {
            values: values,
          },
          this.plot.config.scales[this.plot.options.xField]
        )
      );
      return scale;
    } else {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const Scale = getScale('linear');
      const scale = new Scale(
        mix(
          {},
          {
            min: min,
            max: max,
            nice: true,
            values: values,
          },
          this.plot.config.scales[this.plot.options.xField]
        )
      );
      return scale;
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
    const data = this.plot.processData(props.data);
    each(data, (d) => {
      if (isArray(d[field])) {
        values.push(...d[field]);
      } else {
        values.push(d[field]);
      }
    });
    return values;
  }

  private extractXValue() {
    const props = this.plot.options;
    const field = props.xField;
    const values = [];
    const data = this.plot.processData(props.data);
    each(data, (d) => {
      if (isArray(d[field])) {
        values.push(...d[field]);
      } else {
        values.push(d[field]);
      }
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
        content: '',
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
