import { Datum } from '../../dependents';
import { isFunction, get, deepMix } from '@antv/util';
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
    if (this.getColorMappingField(props) || props.color) {
      this.parseColor();
    }

    if (props.areaStyle || (props.area && props.area.style)) {
      this.parseStyle();
    }
  }

  public parseColor() {
    const config: Datum = {};
    const colorMappingField = this.getColorMappingField(this.plot.options);
    if (colorMappingField) {
      config.fields = colorMappingField;
    }
    /* if (has(props, 'color')) {
      const color = props.color;
      if (isString(color)) {
        config.values = [color];
      } else if (isFunction(color)) {
        config.callback = color;
      } else if (isArray(color)) {
        if (colorMappingField) {
          config.values = color;
        } else {
          if (color.length > 0) {
            config.values = [color[0]];
          }
        }
      }
    } */
    const colorValues = this.getColorValues();
    this.config.color = deepMix({}, config, colorValues);
  }

  public parseStyle() {
    const props = this.plot.options;
    const styleProps = props.areaStyle ? props.areaStyle : props.area.style;
    const config: Datum = {};
    if (isFunction(styleProps) && props.seriesField) {
      config.fields = [props.seriesField];
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }

  protected getColorMappingField(props) {
    const colorMapper = ['stackField', 'seriesField'];
    for (const m of colorMapper) {
      if (get(props, m)) {
        return [props[m]];
      }
    }
  }
}
