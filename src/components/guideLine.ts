import * as _ from '@antv/util';
import { getMedian, getMean } from '../util/math';

export default class GuideLine {
  private plot: any;
  private cfg: any;
  public config: any;

  constructor(cfg) {
    _.assign(this, cfg);
    this._init();
  }

  private _init() {
    const props = this.plot._initialProps;
    const defaultStyle = this._getDefaultStyle();
    const baseConfig = _.mix({
      ...this.cfg,
      type: 'line',
      top: true,
    },                       defaultStyle) as any;
    if (this.cfg.type) {
      const stateValue = this._getState(this.cfg.type);
      const minValue = this._getState('min');
      const maxValue = this._getState('max');
      const percent = `${(stateValue - minValue) / maxValue * 100}%`;
      const start = [ '0%', percent ];
      const end = [ '100%', percent ];
      this.config =  _.mix({
        start,
        end,
      },                   baseConfig);
    }else {
      this.config = baseConfig;
    }
  }

  private _getState(type) {
    const values = this._extractValues();
    if (type === 'median') return getMedian(values);
    if (type === 'mean') return getMean(values);
    if (type === 'max') return Math.max(...values);
    if (type === 'min') return Math.min(...values);
  }

  private _extractValues() {
    const props = this.plot._initialProps;
    const field = props.yField;
    const values = [];
    _.each(props.data, (d) => {
      values.push(d[field]);
    });
    return values;
  }

  private _getDefaultStyle() {
    return {
      line: {
        style: {
          lineWidth: 2,
          stroke: '#66d6a8',
          opacity: 0.7,
          lineDash: [ 0, 0 ],
        },
      },
    };
  }

}
