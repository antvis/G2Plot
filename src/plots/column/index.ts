import _ from 'lodash';
import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption, IValueAxis, ITimeAxis, ICatAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import { extractAxis } from '../../util/axis';
import * as StyleParser from '../../util/styleParser';
import * as _ from '@antv/util';

interface ColumnStyle {
  opacity?: number;
  lineDash?: number[];
}

export interface ColumnConfig extends BaseConfig {
  // 图形
  type: 'rect' | 'triangle' | 'round';
  // 百分比, 数值, 最小最大宽度
  columnSize: number;
  maxthWidth: number;
  minWidth: number;
  columnStyle: ColumnStyle | Function;
  xAxis: ICatAxis | ITimeAxis;
  yAxis: IValueAxis;
}

export default class BaseColumn<T extends ColumnConfig = ColumnConfig> extends BasePlot<T>{

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this._initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.xField] = {};
    _.has(props, 'xAxis') && extractScale(scales[props.xField], props.xAxis);
      /** 配置y-scale */
    scales[props.yField] = {};
    _.has(props, 'yAxis') && extractScale(scales[props.xField], props.yAxis);
    this._setConfig('scales', scales);
  }

  protected _coord() {}

  protected _axis() {
    const props = this._initialProps;
    const axesConfig = { fields:{} };
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};

    if (props.xAxis && props.xAxis.visible === false) {
      axesConfig.fields[props.xField] = false;
    } else {
      extractAxis(axesConfig.fields[props.xField], props.xAxis, this._config.theme, 'bottom');
    }

    if (props.yAxis && props.yAxis.visible === false) {
      axesConfig.fields[props.yField] = false;
    } else {
      extractAxis(axesConfig.fields[props.yField], props.yAxis, this._config.theme, 'left');
    }

    /** 存储坐标轴配置项到config */
    this._setConfig('axes', axesConfig);
  }

  protected _adjustColumn(column: ElementOption) {
    return;
  }

  protected _addElements() {
    const props = this._initialProps;
    const column: ElementOption = {
      type: 'interval',
      position: {
        fields: [ props.xField, props.yField ],
      },
    };
    if (props.columnStyle) column.style = this._columnStyle();
    if (props.columnSize) {
      column.size = {
        values: [ props.columnSize ],
      };
    }
    if (props.label) {
      column.label = this._extractLabel();
    }
    if (props.color) {
      if(_.isString(props.color)) {
        column.color = {
          values: [props.color]
        };
      } else if(_.isFunction(props.color)) {
        column.color = {
          fields: [props.yField],
          callback: props.color
        };
      }
    }
    this._adjustColumn(column);
    this._setConfig('element', column);
  }

  protected _interactions() {
  }

  protected _annotation() {}

  protected _animation() {
  }

  private _columnStyle() {
    const props = this._initialProps;
    const columnStyleProps = props.columnStyle;
    const config = {
      fields: null,
      callback: null,
      cfg: columnStyleProps,
    };
    return config;
  }

  private _extractLabel() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) return false;

    const labelConfig = {
      ...label,
      fields: [ props.yField ],
      callback: null,
    };

    /** formater */
    if (label.formatter) {
      const formater = label.formatter;
      labelConfig.callback = (val) => {
        return {
          ...label,
          content: formater(val),
          offsetX: label.offsetX ? label.offsetX : 0,
          offsetY: label.offsetY ? label.offsetY : 0,
        };
      };
    }
    /** label样式 */
    if (label.style) {
      const theme = this._config.theme;
      StyleParser.LabelStyleParser(theme, label.style);
    }

    return labelConfig;
  }
}
