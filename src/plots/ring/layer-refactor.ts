import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import PieLayer, { PieLayerConfig } from '../pie/layer-refactor';
import responsiveMethods from './apply-responsive';
import './apply-responsive/theme';
import * as centralTextTemplate from './component/annotation/central-text-template';
import * as EventParser from './event';

export interface RingLayerConfig extends PieLayerConfig {
  innerRadius?: number;
}

interface IAttrs {
  [key: string]: any;
}

const G2_GEOM_MAP = {
  ring: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'ring',
};

export default class RingLayer extends PieLayer<RingLayerConfig> {
  public static centralId = 0;

  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      innerRadius: 0.5,
    });
  }

  public type: string = 'ring';
  private centralText: any; // 保存中心文本实例用于响应交互
  private centralClass: string; // 中心文本的class,用于重点文本容器的唯一标识，一个页面多个环图时，共用 class 交互会有问题。

  public beforeInit() {
    super.beforeInit();
    RingLayer.centralId++;
    this.centralClass = `centralclassId${RingLayer.centralId}`;
    const props = this.options;
    /** 响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      this.applyResponsive('preRender');
    }
  }

  public afterInit() {
    super.afterInit();
    /** 处理环图中心文本响应交互的问题 */
    if (this.centralText && this.centralText.onActive) {
      const onActiveConfig = this.centralText.onActive;
      this.view.on('interval:mousemove', (e) => {
        const displayData = this.parseCentralTextData(e.data._origin);
        let htmlString: string;
        if (_.isBoolean(onActiveConfig)) {
          htmlString = this.getCentralTextTemplate(displayData);
        } else if (_.isFunction(onActiveConfig)) {
          htmlString = onActiveConfig(displayData);
          htmlString = `<div class="ring-guide-html ${this.centralClass}">${htmlString}</div>`;
        }
        document.getElementsByClassName(this.centralClass)[0].innerHTML = htmlString;
      });
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected coord() {
    const props = this.options;
    const coordConfig = {
      type: 'theta' as CoordinateType,
      cfg: {
        radius: props.radius,
        innerRadius: props.innerRadius,
      },
    };
    this.setConfig('coord', coordConfig);
  }

  protected annotation() {
    const props = this.options;
    if (props.annotation) {
      const annotationConfigs = [];
      _.each(props.annotation, (a) => {
        if (a.type === 'centralText') {
          const centralText = this.drawCentralText(a);
          annotationConfigs.push(centralText);
          this.centralText = centralText;
        }
      });
      this.setConfig('annotations', annotationConfigs);
    }
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }

  private drawCentralText(config) {
    const props = this.options;
    const centralText: IAttrs = {
      type: 'html',
      top: true,
      position: ['50%', '50%'],
      onActive: false,
    };
    /** 中心文本内容 */
    let displayData;
    if (config.content) {
      displayData = config.content;
    } else {
      /** 用户没有指定文本内容时，默认显示第一条数据 */
      const data = props.data[0];
      displayData = this.parseCentralTextData(data);
    }
    /** 中心文本显示 */
    let htmlString;
    if (config.htmlContent) {
      htmlString = config.htmlContent(displayData);
    } else {
      htmlString = this.getCentralTextTemplate(displayData);
    }
    centralText.html = htmlString;
    /** 是否响应状态量 */
    if (config.onActive) {
      centralText.onActive = config.onActive;
      this.setConfig('tooltip', false);
    }
    return centralText;
  }

  private parseCentralTextData(data) {
    const props = this.options;
    const angleField = props.angleField;
    return props.colorField ? { name: data[props.colorField], value: data[angleField] } : data[angleField];
  }

  private getCentralTextTemplate(displayData) {
    let htmlString;
    /** 如果文本内容为string或单条数据 */
    if (_.isString(displayData)) {
      htmlString = centralTextTemplate.getSingleDataTemplate(displayData, this.centralClass);
    } else if (_.isObject(displayData) && _.keys(displayData).length === 2) {
      /** 如果文本内容为两条数据 */
      const content = displayData as IAttrs;
      htmlString = centralTextTemplate.getTwoDataTemplate(content.name, content.value, this.centralClass);
    }
    /** 更为复杂的文本要求用户自行制定html模板 */
    return htmlString;
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as IAttrs;
      responsive.method(this);
    });
  }
}

registerPlotType('ring', RingLayer);
