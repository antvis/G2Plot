import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';

export default class LabelParser {
  public config: DataPointType = {};
  private plot: any;

  constructor(cfg) {
    this.plot = cfg.plot;
    this._init(cfg);
  }

  private _init(cfg) {
    _.assign(this.config, cfg);
    this.config.callback = (...args: any[]) => {
      return this._parseCallBack(...args);
    };
  }

  private _parseCallBack(...args: any[]) {
    const labelProps = this.plot._initialProps.label;
    const config: DataPointType = {};
    this._parseOffset(labelProps, config);
    if (labelProps.position) {
      config.position = labelProps.position;
    }
    if (labelProps.formatter) {
      config.formatter = labelProps.formatter;
    }
    if (labelProps.style) {
      config.textStyle = labelProps.style;
    }
    return config;
  }

  private _parseOffset(props, config) {
    const mapper = ['offset', 'offsetX', 'offsetY'];
    let count = 0;
    _.each(mapper, (m) => {
      if (props[m]) {
        config[m] = props[m];
        count++;
      }
    });
    // 如用户没有设置offset，而label position又为middle时，则默认设置offset为0
    if (count === 0 && _.get(props, 'position') === 'middle') {
      config.offset = 0;
    }
  }
}
