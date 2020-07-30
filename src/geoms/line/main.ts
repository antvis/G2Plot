import { LooseObject } from '../../dependents';
import { get, isFunction, has, isString, isArray } from '@antv/util';
import ElementParser from '../base';

export default class LineParser extends ElementParser {
  public init() {
    const props = this.plot.options;
    this.config = {
      type: 'line',
      position: {
        fields: [props.xField, props.yField],
      },
      connectNulls: props.connectNulls,
    };
    if (props.lineSize) {
      this.parseSize();
    }
    if (props.smooth) {
      this.config.shape = { values: ['smooth'] };
    }
    if (props.step) {
      this.config.shape = { values: [props.step] };
    }
    if (props.seriesField || props.color) {
      this.parseColor();
    }
    if (props.lineStyle || get(props, ['line', 'style'])) {
      this.parseStyle();
    }
  }

  public parseSize() {
    const sizeProps = this.plot.options.lineSize;
    const config: LooseObject = {};
    if (isFunction(sizeProps)) {
      config.callback = sizeProps;
    } else {
      config.values = [sizeProps];
    }
    this.config.size = config;
  }

  public parseColor() {
    const props = this.plot.options;
    const config: LooseObject = {};
    if (props.seriesField) {
      config.fields = [props.seriesField];
    }
    if (has(props, 'color')) {
      const color = props.color;
      if (isString(color)) {
        config.values = [color];
      } else if (isFunction(color)) {
        config.callback = color;
      } else if (isArray(color)) {
        if (props.seriesField) {
          config.values = color;
        } else {
          if (color.length > 0) {
            config.values = [color[0]];
          }
        }
      }
    }

    this.config.color = config;
  }

  public parseStyle() {
    const props = this.plot.options;
    const styleProps = props.lineStyle || get(props, ['line', 'style']);
    const config = {
      fields: null,
      callback: null,
      cfg: null,
    };
    if (isFunction(styleProps) && props.seriesField) {
      config.fields = [props.seriesField];
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }
}
