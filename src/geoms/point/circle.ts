import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import ElementParser from '../base';

function getValuesByField(field, data) {
  const values = [];
  _.each(data, (d) => {
    const v = d[field];
    values.push(v);
  });
  return _.uniq(values);
}

const COLOR_MAPPER = ['seriesField', 'color'];

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
      this._parseColorByField(props, config, colorField);
    } else {
      if (props.color) {
        config.values = [props.color];
      } else if (props.color) {
        this._parseColor(props, config);
      }
    }
    this.config.color = config;
  }

  public parseSize() {
    const props = this.plot.options;
    const config: DataPointType = {};
    if (props.sizeField) {
      config.fields = [props.sizeField];
    }
    if (Array.isArray(props.size)) {
      config.values = props.pointSize;
    } else {
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
    const field = props.colorField;
    if (_.isFunction(styleProps) && field) {
      config.fields = [field];
      config.callback = styleProps;
    } else {
      config.cfg = styleProps;
    }
    this.config.style = config;
  }

  private _parseColorByField(props, config, field) {
    config.fields = [field];
    if (props.color) {
      const count = getValuesByField(field, props.data).length;
      const values = [];
      for (let i = 0; i < count; i++) {
        values.push(props.color);
      }
      config.values = values;
    } else if (props.color) {
      this._parseColor(props, config);
    }
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
