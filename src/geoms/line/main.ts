import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import ElementParser from '../base';

export default class LineParser extends ElementParser {
  public init() {
    const props = this.plot.initialProps;
    this.config = {
      type: 'line',
      position: {
        fields: [props.xField, props.yField],
      },
    };
    if (props.size) {
      this.parseSize();
    }
    if (props.smooth) {
      this.config.shape = { values: ['smooth'] };
    }
    if (props.seriesField || props.color) {
      this.parseColor();
    }
    if (props.lineStyle) {
      this.parseStyle();
    }
  }

  public parseSize() {
    const sizeProps = this.plot.initialProps.size;
    const config: DataPointType = {};
    if (_.isFunction(sizeProps)) {
      config.callback = sizeProps;
    } else {
      config.values = [sizeProps];
    }
    this.config.size = config;
  }

  public parseColor() {
    const props = this.plot.initialProps;
    const config: DataPointType = {};
    if (_.has(props, 'seriesField')) {
      config.fields = [props.seriesField];
    }
    if (_.has(props, 'color')) {
      const color = props.color;
      if (_.isString(color)) {
        config.values = [color];
      } else if (_.isFunction(color)) {
        config.callback = color;
      } else {
        config.values = color as [];
      }
    }

    this.config.color = config;
  }

  public parseStyle() {
    const props = this.plot.initialProps;
    const styleProps = props.lineStyle;
    const config = {
      fields: null,
      callback: null,
      cfg: null,
    };
    if (_.isFunction(styleProps) && props.seriesField) {
      config.fields = [props.seriesField];
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }
}
