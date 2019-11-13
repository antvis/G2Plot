import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import ElementParser from '../base';

export default class AreaParser extends ElementParser {
  public init() {
    const props = this.plot.options;
    this.config = {
      type: 'area',
      position: {
        fields: [props.xField, props.yField],
      },
      connectNulls: props.connectNulls || false,
    };
    if (props.smooth) {
      this.config.shape = { values: ['smooth'] };
    }
    if (this._getColorMappingField() || props.color) {
      this.parseColor();
    }
    if (props.areaStyle || props.area.style) {
      this.parseStyle();
    }
    console.log(this.config);
  }

  public parseColor() {
    const props = this.plot.options;
    const config: DataPointType = {};
    const colorMappingField = this._getColorMappingField();
    if (colorMappingField) {
      config.fields = colorMappingField;
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
    const props = this.plot.options;
    const styleProps = props.areaStyle ? props.areaStyle : props.area.style;
    const config: DataPointType = {};
    if (_.isFunction(styleProps) && props.seriesField) {
      config.fields = [props.seriesField];
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }

  private _getColorMappingField() {
    const props = this.plot.options;
    const colorMapper = ['stackField', 'seriesField'];
    for (const m of colorMapper) {
      if (_.get(props, m)) {
        return [props[m]];
      }
    }
  }
}
