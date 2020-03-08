import { LooseObject } from '../../dependents';
import { isArray, isFunction, isString, isEmpty } from '@antv/util';
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
    const config: LooseObject = {};
    const colorField = props.colorField;
    if (colorField) {
      config.fields = isArray(colorField) ? colorField : [colorField];
    }
    if (props.color) {
      this._parseColor(props, config);
    }
    if (!isEmpty(config)) {
      this.config.color = config;
    }
  }

  public parseSize() {
    const props = this.plot.options;
    const config: LooseObject = {};
    if (props.sizeField) {
      config.fields = [props.sizeField];
    }
    if (props.pointSize) {
      config.values = isArray(props.pointSize) ? props.pointSize : [props.pointSize];
    }
    this.config.size = config;
  }

  public parseShape(shapeName) {
    this.config.shape = shapeName;
  }

  public parseStyle() {
    const props = this.plot.options;
    const styleProps = props.pointStyle;
    const config = {
      fields: null,
      callback: null,
      cfg: null,
    };
    const { xField, yField, colorField } = props;
    if (isFunction(styleProps)) {
      if (colorField) {
        config.fields = isArray(colorField)
          ? [xField, yField, colorField].concat(colorField)
          : [xField, yField, colorField];
      } else {
        config.fields = [xField, yField];
      }
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }

  private _parseColor(props, config) {
    if (isString(props.color)) {
      config.values = [props.color];
    } else if (isFunction(props.color)) {
      config.callback = props.color;
    } else if (isArray(props.color)) {
      config.values = props.color;
    }
  }
}
