import PiePlot, { PieConfig } from '../pie/index';
import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as centralTextTemplate from './guide/annotation/centralText_template';
import * as _ from '@antv/util';

interface RingConfig extends PieConfig {
  innerRadius?: number;
}

interface IAttrs {
  [key: string]: any;
}

export default class RingPlot extends PiePlot<RingConfig>{
  private centralText: any; // 保存中心文本实例用于响应交互

  protected _coord() {
    const props = this._initialProps;
    const coordConfig = {
      type: 'theta' as CoordinateType,
      cfg: {
        radius: 1, // default radius值
        innerRadius: 0.6, // default innerRadius值
      },
    };
    if (_.has(props, 'radius')) {
      coordConfig.cfg.radius = props.radius;
    }

    if (_.has(props, 'innerRadius')) {
      coordConfig.cfg.innerRadius = props.innerRadius;
    }

    this._setConfig('coord', coordConfig);
  }

  protected _annotation() {
    const props = this._initialProps;
    if (props.annotation) {
      const annotationConfigs = [];
      _.each(props.annotation, (a) => {
        if (a.type === 'centralText') {
          const centralText = this._centralText(a);
          annotationConfigs.push(centralText);
          this.centralText = centralText;
        }
      });
      this._setConfig('annotations', annotationConfigs);
    }
  }

  private _centralText(config) {
    const props = this._initialProps;
    const centralText: IAttrs = {
      type: 'html',
      top: true,
      position: [ '50%', '50%' ],
      onActive: false,
    };
        /** 中心文本内容 */
    let displayData;
    if (config.formatter) {
      displayData = config.formatter();
    } else {
            /** 用户没有指定文本内容时，默认显示第一条数据 */
      const data = props.data[0];
      displayData = this._parseCentralTextData(data);
    }
        /** 中心文本显示 */
    let htmlString;
    if (config.htmlContent) {
      htmlString = config.htmlContent(displayData);
    } else {
      htmlString = this._getCentralTextTemplate(displayData);
    }
    centralText.html = htmlString;
        /** 是否响应状态量 */
    if (config.onActive) {
      centralText.onActive = config.onActive;
      this._setConfig('tooltip', false);
    }
    return centralText;
  }

  private _parseCentralTextData(data) {
    const props = this._initialProps;
    const angleField = props.angleField;
    return props.colorField ? { name: data[props.colorField], value: data[angleField] } : data[angleField];
  }

  private _getCentralTextTemplate(displayData) {
    let htmlString;
        /** 如果文本内容为string或单条数据 */
    if (_.isString(displayData)) {
      htmlString = centralTextTemplate.getSingleDataTemplate(displayData);
    } else if (_.isObject(displayData) && _.keys(displayData).length === 2) {
            /** 如果文本内容为两条数据 */
      const content = displayData as IAttrs;
      htmlString = centralTextTemplate.getTwoDataTemplate(content.name, content.value);
    }
        /** 更为复杂的文本要求用户自行制定html模板 */
    return htmlString;
  }

  protected _afterInit() {
    super._afterInit();
        /** 处理环图中心文本响应交互的问题 */
    if (this.centralText && this.centralText.onActive) {
      const onActiveConfig = this.centralText.onActive;
      this.plot.on('interval:mousemove', (e) => {
        const displayData = this._parseCentralTextData(e.data._origin);
        let htmlString;
        if (_.isBoolean(onActiveConfig)) {
          htmlString = this._getCentralTextTemplate(displayData);
        } else if (_.isFunction(onActiveConfig)) {
          htmlString = onActiveConfig(displayData);
        }
        document.getElementsByClassName('ring-guide-html')[0].innerHTML = htmlString;
      });
    }
  }

}
