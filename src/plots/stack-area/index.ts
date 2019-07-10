import BaseArea, { AreaConfig } from '../area';
import { ElementOption } from '../../interface/config';
import * as _ from '@antv/util';

export interface StackAreaConfig extends AreaConfig {
  stackField: string;
}

export default class StackArea extends BaseArea<StackAreaConfig> {
  protected _adjustArea(ele: ElementOption) {

    const props = this._initialProps;

    ele.adjust = [ {
      type: 'stack',
    } ];

    if (props.stackField) {
      ele.color = {
        fields: [ props.stackField ],
        values: props.color && _.isArray(props.color) ? props.color : undefined,
        callback: this._colorCallback(props.color),
      };
    }
  }

  protected _adjustLine(ele: ElementOption) {

    const props = this._initialProps;

    ele.adjust = [ {
      type: 'stack',
    } ];

    let styleColor = _.get(props, ['line', 'style', 'color']);
    let color = [];
    if (!styleColor) {
      color = props.color && _.isArray(props.color) ? props.color : undefined;
    } else {
      color = [styleColor];
    }

    if (props.stackField) {
      ele.color = {
        fields: [ props.stackField ],
        values: color,
        callback: this._colorCallback(props.color),
      };
    }
  }

  protected _adjustPoint(ele: ElementOption) {

    const props = this._initialProps;

    ele.adjust = [ {
      type: 'stack',
    } ];

    let styleColor = _.get(props, ['point', 'style', 'color']);
    let color = [];
    if (!styleColor) {
      color = props.color && _.isArray(props.color) ? props.color : undefined;
    } else {
      color = [styleColor];
    }

    if (props.stackField) {
      ele.color = {
        fields: [ props.stackField ],
        values: color,
        callback: this._colorCallback(props.color),
      };
    }
  }

  private _colorCallback(color) {
    if (!color) return;

    if (_.isFunction(color)) return color;

    return (d) => {
      return color[d];
    };
  }
}
