import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';
import ElementParser from '../base';

function getValuesByField(field, data) {
  const values = [];
  _.each(data, (d) => {
    const v = d[field];
    values.push(v);
  });
  return _.uniq(values);
}

const COLOR_MAPPER = [ 'seriesField', 'stackField' ];

export default class GuidePointParser extends ElementParser {

  public init() {
    const props = this.plot._initialProps;
    this.style = props.point.style;
    if (!props.xField || !props.yField) {
      return;
    }
    this.config = {
      type: 'point',
      position:{
        fields: [ props.xField, props.yField ],
      },
    };
    if (this._needParseAttribute('color')) this.parseColor();
    if (this._needParseAttribute('size')) this.parseSize();
    if (this.style && this.style.shape) this.parseShape();

  }

  public parseColor() {
    const props = this.plot._initialProps;
    const config: DataPointType = {};
    const mappingField = this._getColorMappingField(props);
    if (mappingField) {
      this._parseColorByField(props, config, mappingField);
    }else {
      if (this.style && this.style.color) {
        config.values = [ this.style.color ];
      } else if (props.color) {
        this._parseColor(props, config);
      }
    }
    this.config.color = config;
  }

  private _parseColorByField(props, config, field) {
    config.fields = [ field ];
    if (this.style && this.style.color) {
      const count = getValuesByField(field, props.data).length;
      const values = [];
      for (let i = 0; i < count; i++) {
        values.push(this.style.color);
      }
      config.values = values;
    }else if (props.color) {
      config.values = this._parseColor(props, config);
    }
  }

  private _parseColor(props, config) {
    if (_.isString(props.color)) {
      config.values = [ props.color ];
    }else if (_.isFunction(props.color)) {
      config.callback = props.color;
    }else if (_.isArray(props.color)) {
      config.values = props.color;
    }
  }

  public parseSize() {
    const config:DataPointType = {};
    if (this.style && this.style.size) {
      config.values = [ this.style.size ];
    }else {
            /**Point作为辅助图形没有在style里指定size属性的情况下，设置默认值 */
      config.values = [ 3 ];
    }
    this.config.size = config;
  }

  public parseShape() {
    const config: DataPointType = {
      values: [ this.style.shape ],
    };
    this.config.shape = config;
  }

  private _needParseAttribute(attr) {
    const condition = !this.style || this.style[attr];
    return condition;
  }

  private _getColorMappingField(props) {
    for (let i = 0; i < COLOR_MAPPER.length; i++) {
      const m = COLOR_MAPPER[i];
      if (_.get(props, m)) return [ props[m] ];
    }
  }
}
