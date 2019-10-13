import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import { ColorConfig, SizeConfig } from '../../interface/config';
import LineParser from './main';

export default class GuideLineParser extends LineParser {
  public init() {
    const props = this.plot.initialProps;
    if (!props.xField || !props.yField) {
      return;
    }
    this.config = {
      type: 'line',
      position: {
        fields: [props.xField, props.yField],
      },
    };

    if (this._getColorMappingField() || this._needParseAttribute('color')) {
      this.parseColor();
    }
    if (this._needParseAttribute('size')) {
      this.parseSize();
    }
    if (props.line && props.line.style) {
      this.parseStyle();
    }

    if (props.smooth) {
      this.config.shape = { values: ['smooth'] };
    }
  }

  public parseSize() {
    const props = this.plot.initialProps;
    const config: SizeConfig = {};
    if (props.line && props.line.size) {
      config.values = [props.line.size];
    } else {
      // line作为辅助图形没有在style里指定size属性的情况下，设置默认值
      config.values = [2];
    }
    this.config.size = config;
  }

  public parseColor() {
    const props = this.plot.initialProps;
    const config: ColorConfig = {};
    let colorField = this._getColorMappingField();
    if (colorField) {
      config.fields = colorField;
    }
    if (props.line && props.line.color) {
      config.values = [props.line.color];
    } else {
      if (!colorField) {
        colorField = this.config.position.fields;
      }
      // line作为辅助图形没有在style里指定color属性的情况下，默认接受主体图形的透传
      if (_.isString(props.color)) {
        config.values = [props.color];
      } else if (_.isFunction(props.color)) {
        config.fields = colorField;
        config.callback = props.color;
      } else if (_.isArray(props.color)) {
        config.fields = colorField;
        config.values = props.color;
      }
    }

    this.config.color = config;
  }

  public parseStyle() {
    const props = this.plot.initialProps;
    const styleProps = props.line.style;
    const config: DataPointType = {};
    if (_.isFunction(styleProps)) {
      config.fields = this.config.position.fields;
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }

  private _needParseAttribute(attr) {
    const props = this.plot.initialProps;
    const condition = !props.line || props.line[attr];
    return condition;
  }

  private _getColorMappingField() {
    const props = this.plot.initialProps;
    const colorMapper = ['stackField', 'seriesField'];
    for (const m of colorMapper) {
      if (_.get(props, m)) {
        return [props[m]];
      }
    }
  }
}
