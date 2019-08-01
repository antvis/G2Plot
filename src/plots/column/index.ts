import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption, IValueAxis, ITimeAxis, ICatAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import { extractAxis } from '../../util/axis';
import * as StyleParser from '../../util/styleParser';
import * as _ from '@antv/util';
import '../column/guide/label/column-label';
import responsiveMethods from './applyResponsive/index';

interface ColumnStyle {
  opacity?: number;
  lineDash?: number[];
}

interface ILabelCallbackOptions {
  content?: Function;
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  textStyle?: {};
  position?: string;
}

interface IObject {
  [key:string]: any;
}

export interface ColumnConfig extends BaseConfig {
  // 图形
  type?: 'rect' | 'triangle' | 'round';
  // 百分比, 数值, 最小最大宽度
  columnSize?: number;
  maxthWidth?: number;
  minWidth?: number;
  columnStyle?: ColumnStyle | Function;
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export default class BaseColumn<T extends ColumnConfig = ColumnConfig> extends BasePlot<T>{
  column: any;
  constructor(container: string | HTMLElement, config: T) {
    super(container, config);
  }

  protected _beforeInit() {
    this.type = 'column';
    const props = this._initialProps;
    /**响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('preRender');
    }
  }

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
    const plotTheme = this.plotTheme;
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};

    if ((props.xAxis && (props.xAxis.visible === false)
        || (plotTheme.axis.x.visible === false &&  (!props.xAxis || props.xAxis.visible !== true)))
    ) {
      axesConfig.fields[props.xField] = false;
    } else if (props.xAxis) {
      extractAxis(axesConfig.fields[props.xField], props.xAxis);
    }

    if ((props.yAxis && (props.yAxis.visible === false)
        || (plotTheme.axis.y.visible === false &&  (!props.yAxis || props.yAxis.visible !== true)))
    ) {
      axesConfig.fields[props.yField] = false;
    } else if (props.yAxis) {
      extractAxis(axesConfig.fields[props.yField], props.yAxis);
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
      if (_.isString(props.color)) {
        column.color = {
          values: [ props.color ],
        };
      } else if (_.isFunction(props.color)) {
        column.color = {
          fields: [ props.xField, props.yField ],
          callback: props.color,
        };
      } else if (_.isArray(props.color)) {
        column.color = {
          fields: [ props.xField ],
          values: props.color,
        };
      }
    }
    // column.opacity = {
    //   fields: [props.yField]
    // }
    this._adjustColumn(column);
    this.column = column;
    this._setConfig('element', column);
  }

  protected _interactions() {
  }

  protected _annotation() {}

  protected _animation() {
    const props = this._initialProps;
    if (props.animation === false) {
      /**关闭动画 */
      this.column.animate = false;
    }
  }

  protected _afterInit() {
    super._afterInit();
    const props = this._initialProps;
    /**响应式 */
    if (props.responsive && props.padding !== 'auto') {
      this.plot.once('afterrender', () => {
        this._applyResponsive('afterRender');
      });
    }
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

  protected _extractLabel() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) return false;

    const labelConfig = {
      labelType: 'columnLabel',
      fields: [ props.yField ],
      callback: null,
      ...label,
    };
    const callbackOptions: ILabelCallbackOptions = { ... label };
    if (label.formatter) {
      callbackOptions.content = labelConfig.formatter;
    }
    /**统一处理callback */
    if (!_.isEmpty(callbackOptions)) {
      labelConfig.callback = (val1, val2) => {
        const returnCfg = _.clone(callbackOptions);
        if (_.has(callbackOptions, 'content')) {
          returnCfg.content = callbackOptions.content(val1, val2);
        }
        return returnCfg;
      };
    }
    /** label样式 */
    if (label.style) {
      const theme = this._config.theme;
      StyleParser.LabelStyleParser(theme, label.style);
    }

    return labelConfig as any;
  }

  private _applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as IObject;
      responsive.method(this);
    });
  }

}