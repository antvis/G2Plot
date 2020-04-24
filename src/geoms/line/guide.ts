import { LooseObject } from '../../dependents';
import { isString, isFunction, isArray, get } from '@antv/util';
import LineParser from './main';

export default class GuideLineParser extends LineParser {
  public init() {
    const props = this.plot.options;
    if (!props.xField || !props.yField) {
      return;
    }
    this.config = {
      type: 'line',
      position: {
        fields: [props.xField, props.yField],
      },
      tooltip: false,
    };

    if (this._getColorMappingField() || this._needParseAttribute('color')) {
      this.parseColor();
    }
    if (this._needParseAttribute('size')) {
      this.parseSize();
    }
    if (props.line.style) {
      this.parseStyle();
    }

    if (props.smooth) {
      this.config.shape = { values: ['smooth'] };
    }
  }

  public parseSize() {
    const props = this.plot.options;
    const config: LooseObject = {};
    if (props.line.size) {
      config.values = [props.line.size];
    } else {
      // line作为辅助图形没有在style里指定size属性的情况下，设置默认值
      config.values = [2];
    }
    this.config.size = config;
  }

  public parseColor() {
    const props = this.plot.options;
    const config: LooseObject = {};
    const colorField = this._getColorMappingField();
    if (colorField) {
      config.fields = colorField;
    }
    if (props.line.color) {
      config.values = [props.line.color];
    } else {
      // line作为辅助图形没有在style里指定color属性的情况下，默认接受主体图形的透传
      if (isString(props.color)) {
        config.values = [props.color];
      } else if (isFunction(props.color)) {
        config.fields = colorField;
        config.callback = props.color;
      } else if (isArray(props.color)) {
        if (colorField) {
          config.values = props.color;
        } else {
          if (props.color.length > 0) {
            config.values = [props.color[0]];
          }
        }
      }
    }

    this.config.color = config;
  }

  public parseStyle() {
    const props = this.plot.options;
    const styleProps = props.line.style;
    const config: LooseObject = {};
    if (isFunction(styleProps)) {
      config.fields = this.config.position.fields;
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }

  private _needParseAttribute(attr) {
    const props = this.plot.options;
    if (props[attr]) {
      return true;
    } else if (props.line[attr]) {
      return true;
    }
    return false;
  }

  private _getColorMappingField() {
    const props = this.plot.options;
    const colorMapper = ['stackField', 'seriesField'];
    for (const m of colorMapper) {
      if (get(props, m)) {
        return [props[m]];
      }
    }
  }
}
