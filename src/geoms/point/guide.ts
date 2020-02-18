import { LooseObject } from '@antv/g2/lib/interface';
import { each, uniq, keys, isFunction, isString, isArray, has, get } from '@antv/util';
import ElementParser from '../base';

function getValuesByField(field, data) {
  const values = [];
  each(data, (d) => {
    const v = d[field];
    values.push(v);
  });
  return uniq(values);
}

const COLOR_MAPPER = ['seriesField', 'stackField'];

export default class GuidePointParser extends ElementParser {
  public init() {
    const props = this.plot.options;
    this.style = props.point.style;
    if (!props.xField || !props.yField) {
      return;
    }
    this.config = {
      type: 'point',
      position: {
        fields: [props.xField, props.yField],
      },
    };
    // if (this._needParseAttribute('color')) {
    this.parseColor();
    // }
    if (this._needParseAttribute('size')) {
      this.parseSize();
    }
    if (props.point.shape) {
      this.parseShape(props.point.shape);
    }
    if (props.point.style) {
      this.parseStyle();
    }
  }

  public parseColor() {
    const props = this.plot.options;
    const config: LooseObject = {};
    const mappingField = this._getColorMappingField(props);
    if (mappingField) {
      this._parseColorByField(props, config, mappingField);
    } else {
      if (props.point && props.point.color) {
        config.values = [props.point.color];
      } else if (props.color) {
        this._parseColor(props, config);
      }
    }
    if (keys(config).length > 0) {
      this.config.color = config;
    }
  }

  public parseSize() {
    const props = this.plot.options;
    const config: LooseObject = {};
    config.values = [props.point.size];
    this.config.size = config;
  }

  public parseShape(shapeName) {
    const config: LooseObject = {
      values: [shapeName],
    };
    this.config.shape = config;
  }

  public parseStyle() {
    const props = this.plot.options;
    const styleProps = props.point && props.point.style;
    const config = {
      fields: null,
      callback: null,
      cfg: null,
    };
    const field = this._getColorMappingField(props);
    if (isFunction(styleProps) && field) {
      config.fields = [field];
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }

  private _parseColorByField(props, config, field) {
    config.fields = [field];
    if (props.point.color) {
      const count = getValuesByField(field, props.data).length;
      const values = [];
      for (let i = 0; i < count; i++) {
        values.push(props.point.color);
      }
      config.values = values;
    } else if (props.color) {
      this._parseColor(props, config);
    }
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

  private _needParseAttribute(attr) {
    const props = this.plot.options;
    const condition = props.point && has(props.point, attr);
    return condition;
    // const condition = !this.style || this.style[attr];
    // return condition;
  }

  private _getColorMappingField(props) {
    for (const m of COLOR_MAPPER) {
      if (get(props, m)) {
        return [props[m]];
      }
    }
  }
}
