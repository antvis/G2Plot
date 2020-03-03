import * as _ from '@antv/util';
import { Label } from '../../interface/config';
import { combineFormatter, getNoopFormatter, getPrecisionFormatter, getSuffixFormatter } from '../../util/formatter';
import { LooseMap } from '../../interface/types';

export default class LabelParser {
  public config: LooseMap = {};
  protected plot: any;
  protected originConfig: Label;

  constructor(cfg) {
    const { plot, ...rest } = cfg;
    this.plot = plot;
    this.originConfig = rest;
    this.init(cfg);
  }

  public getConfig() {
    return this.config;
  }

  protected init(cfg) {
    _.assign(this.config, cfg);
    this.config.callback = (val, ...restArgs: any[]) => {
      return this.parseCallBack(val, ...restArgs);
    };
  }

  protected parseCallBack(val, ...restArgs: any[]) {
    const labelProps = this.originConfig;
    const theme = this.plot.getPlotTheme();
    const config: LooseMap = { ...labelProps };
    this.parseOffset(labelProps, config);
    if (labelProps.position) {
      if (_.isFunction(labelProps.position)) {
        config.position = (labelProps.position as Function)(val);
      } else {
        config.position = labelProps.position;
      }
    }
    this.parseFormatter(config, val, ...restArgs);
    if (labelProps.style) {
      if (_.isFunction(labelProps.style)) {
        config.textStyle = labelProps.style(val);
      } else {
        config.textStyle = labelProps.style;
      }
    }
    config.textStyle = _.deepMix({}, _.get(theme, 'label.style'), config.textStyle);
    if (labelProps.autoRotate) {
      config.autoRotate = labelProps.autoRotate;
    }

    return config;
  }

  protected parseOffset(props, config) {
    const mapper = ['offset', 'offsetX', 'offsetY'];
    let count = 0;
    _.each(mapper, (m) => {
      if (_.has(props, m)) {
        config[m] = props[m];
        count++;
      }
    });
    // 如用户没有设置offset，而label position又为middle时，则默认设置offset为0
    if (count === 0 && _.get(props, 'position') === 'middle') {
      config.offset = 0;
    }
  }

  protected parseFormatter(config: LooseMap, ...values: any[]) {
    const labelProps = this.originConfig;
    config.formatter = combineFormatter(
      getNoopFormatter(),
      getPrecisionFormatter(labelProps.precision),
      getSuffixFormatter(labelProps.suffix)
    );
    if (labelProps.formatter) {
      config.formatter = combineFormatter(
        config.formatter,
        labelProps.formatter as (text: string, item: any, idx: number) => string
      );
    }
  }
}
