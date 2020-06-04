import { assign, has, isString, isFunction, isArray } from '@antv/util';
import { ElementOption } from '../interface/config';
import { isColorPalette, colorPaletteToColor } from './color';

export default class ElementParser {
  public plot: any;
  public type: string;
  public config: ElementOption;
  public style: any;
  private positionFields: string[];
  private widthRatio: { [key: string]: number };

  constructor(cfg) {
    assign(this, cfg);
    this.init();
  }

  public init() {
    this.config = {
      type: this.type,
      position: {
        fields: this.positionFields,
      },
    };
  }

  public getColorValues() {
    const props = this.plot.options;
    const valueConfig = {
      values: null,
      callback: null,
    };
    const colorField = this.getColorMappingField(props);
    if (has(props, 'color')) {
      const color = props.color;
      if (isColorPalette(color)) {
        valueConfig.values = colorPaletteToColor(color.type, color.name, props, colorField);
      }
      if (isString(color)) {
        valueConfig.values = [color];
      } else if (isFunction(color)) {
        valueConfig.callback = color;
      } else if (isArray(color)) {
        if (colorField) {
          valueConfig.values = color;
        } else {
          if (color.length > 0) {
            valueConfig.values = [color[0]];
          }
        }
      }
    }
    return valueConfig;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getColorMappingField(props?) {
    return null;
  }
}
