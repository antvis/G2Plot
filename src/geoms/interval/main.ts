import { isString, isFunction, isArray, isObject, get } from '@antv/util';
import ElementParser from '../base';

const COLOR_MAPPER = ['colorField', 'stackField', 'groupField'];

export default class IntervalParser extends ElementParser {
  public init() {
    this.type = 'interval';
    super.init();
    const props = this.plot.options;
    if (this._needParserColor()) {
      this.parseColor();
    }
    if (!this.config.color) {
      this.config.color = { values: ['#5b8ff9'] };
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
    const props = this.plot.options;
    const colorField = this._getColorMappingField(props);
    const config: any = {};
    if (colorField) {
      config.fields = colorField;
    }
    if (props.color) {
      if (isString(props.color)) {
        config.values = [props.color];
      } else if (isFunction(props.color)) {
        config.callback = props.color;
      } else if (isArray(props.color)) {
        if (colorField) {
          config.values = props.color;
        } else {
          if (props.color.length > 0) {
            config.values = [props.color[0]];
          }
        }
      } else if (isObject(props.color)) {
        config.fields = colorField;
        config.callback = (d) => {
          return props.color[d];
        };
      }
    }
    this.config.color = config;
  }

  public parseSize(sizeProps) {
    const props = this.plot.options;
    const config: any = {};
    if (isFunction(props[sizeProps])) {
      config.fields = [this.config.position.fields];
      config.callback = props[sizeProps];
    } else {
      config.values = [props[sizeProps]];
    }
    this.config.size = config;
  }

  public parseStyle(styleProps) {
    const props = this.plot.options;
    const color = this.config.color;
    const style = this.plot.options[styleProps];
    const config: any = {};
    if (isFunction(style)) {
      config.fields = color?.fields || [props.xField, props.yField];
      config.callback = style;
    } else {
      config.cfg = style;
    }

    this.config.style = config;
  }

  private _getSizeProps(props) {
    const sizeMapper = ['columnSize', 'barSize'];
    for (const m of sizeMapper) {
      if (get(props, m)) {
        return m;
      }
    }
  }

  private _getStyleProps(props) {
    const sizeMapper = ['columnStyle', 'barStyle', 'pieStyle', 'ringStyle'];
    for (const m of sizeMapper) {
      if (get(props, m)) {
        return m;
      }
    }
  }

  private _getColorMappingField(props) {
    /**如果有colorFiled或stackField配置项(后者为堆叠interval)，则参与colorMapping的字段为对应值
     * 如没有特别设定，则一般是callback中的传参，传入位置映射的字段
     */
    for (const m of COLOR_MAPPER) {
      if (get(props, m)) {
        return [props[m]];
      }
    }
  }

  private _needParserColor() {
    const props = this.plot.options;
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
