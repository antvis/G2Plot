import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import ElementParser from '../base';

const COLOR_MAPPER = ['colorField', 'stackField', 'groupField'];

export default class IntervalParser extends ElementParser {
  public init() {
    this.type = 'interval';
    super.init();
    const props = this.plot.initialProps;
    if (this._needParserColor()) {
      this.parseColor();
    }
    const sizeProps = this._getSizeProps(props);
    if (sizeProps) {
      this.parseSize(sizeProps);
    }
    const styleProps = this._getStyleProps(props);
    if (styleProps) {
      this.parseStyle(styleProps);
    }
  }

  public parseColor() {
    const props = this.plot.initialProps;
    const colorField = this._getColorMappingField(props);
    const config: DataPointType = {};
    if (colorField) {
      config.fields = colorField;
    }
    if (props.color) {
      if (_.isString(props.color)) {
        config.values = [props.color];
      } else if (_.isFunction(props.color)) {
        config.callback = props.color;
      } else if (_.isArray(props.color)) {
        config.values = props.color;
      } else if (_.isObject(props.color)) {
        config.fields = colorField;
        config.callback = (d) => {
          return props.color[d];
        };
      }
    }
    this.config.color = config;
  }

  public parseSize(sizeProps) {
    const props = this.plot.initialProps;
    const config: DataPointType = {};
    config.values = [props[sizeProps]];
    this.config.size = config;
  }

  public parseStyle(styleProps) {
    const style = this.plot.initialProps[styleProps];
    const config: DataPointType = {};
    if (_.isFunction(style)) {
      config.fields = [this.config.position.fields];
      config.callback = style;
    } else {
      config.cfg = style;
    }

    this.config.style = config;
  }

  private _getSizeProps(props) {
    const sizeMapper = ['columnSize', 'barSize'];
    for (const m of sizeMapper) {
      if (_.get(props, m)) {
        return m;
      }
    }
  }

  private _getStyleProps(props) {
    const sizeMapper = ['columnStyle', 'barStyle', 'pieStyle', 'ringStyle'];
    for (const m of sizeMapper) {
      if (_.get(props, m)) {
        return m;
      }
    }
  }

  private _getColorMappingField(props) {
    /**如果有colorFiled或stackField配置项(后者为堆叠interval)，则参与colorMapping的字段为对应值
     * 如没有特别设定，则一般是callback中的传参，传入位置映射的字段
     */
    for (const m of COLOR_MAPPER) {
      if (_.get(props, m)) {
        return [props[m]];
      }
    }
  }

  private _needParserColor() {
    const props = this.plot.initialProps;
    if (props.color) {
      return true;
    }
    for (const m of COLOR_MAPPER) {
      if (props[m]) {
        return true;
      }
    }
    return false;
  }
}
