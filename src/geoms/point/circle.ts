import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import ElementParser from '../base';

export default class CircleParser extends ElementParser {
  public init() {
    const props = this.plot.options;
    this.style = props.pointStyle;
    if (!props.xField || !props.yField) {
      return;
    }
    this.config = {
      type: 'point',
      position: {
        fields: [props.xField, props.yField],
      },
    };
    this.parseColor();
    this.parseSize();

    if (props.shape) {
      this.parseShape(props.shape);
    }
    if (props.pointStyle) {
      this.parseStyle();
    }
  }

  public parseColor() {
    const props = this.plot.options;
    const config: DataPointType = {};
    const colorField = props.colorField;
    if (colorField) {
      config.fields = _.isArray(colorField) ? colorField : [colorField];
    }
    if (props.color) {
      this._parseColor(props, config);
    }
    this.config.color = config;
  }

  public parseSize() {
    const props = this.plot.options;
    const config: DataPointType = {};
    if (props.sizeField) {
      config.fields = [props.sizeField];
    }
    if (props.pointSize) {
      config.values = props.pointSize;
    }
    this.config.size = config;
  }

  public parseShape(shapeName) {
    const config: DataPointType = {
      values: [shapeName],
    };
    this.config.shape = config;
  }

  public parseStyle() {
    const props = this.plot.options;
    const styleProps = props.pointStyle;
    const config = {
      fields: null,
      callback: null,
      cfg: null,
    };
    const colorField = props.colorField;
    if (_.isFunction(styleProps) && colorField) {
      config.fields = _.isArray(colorField) ? colorField : [colorField];
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }

  private _parseColor(props, config) {
    if (_.isString(props.color)) {
      config.values = [props.color];
    } else if (_.isFunction(props.color)) {
      config.callback = props.color;
    } else if (_.isArray(props.color)) {
      config.values = props.color;
    }
  }
}
