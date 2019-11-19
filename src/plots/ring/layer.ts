import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import PieLayer, { PieViewConfig } from '../pie/layer';
import responsiveMethods from './apply-responsive';
import './apply-responsive/theme';
import * as centralTextTemplate from './component/annotation/central-text-template';
import * as EventParser from './event';

export interface RingViewConfig extends PieViewConfig {
  innerRadius?: number;
  annotation?: any; // FIXME:
}

export interface RingLayerConfig extends RingViewConfig, LayerConfig {}

interface IAttrs {
  [key: string]: any;
}

const G2_GEOM_MAP = {
  ring: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'ring',
};

export default class RingLayer<T extends RingLayerConfig = RingLayerConfig> extends PieLayer<T> {
  public static centralId = 0;

  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      radius: 0.8,
      innerRadius: 0.8 * 0.8,
    });
  }

  public getOptions(props: T) {
    const options = super.getOptions(props);
    if (!props.innerRadius && props.radius) {
      return _.deepMix({}, options, {
        innerRadius: props.radius * 0.8,
      });
    }
    return options;
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
      this.view.on(
        'interval:mouseenter',
        _.debounce((e) => {
          const displayData = this.parseCentralTextData(e.data._origin);
          const htmlString = this.getCenterHtmlString(displayData);
          document.getElementsByClassName(this.centralClass)[0].innerHTML = htmlString;
        }, 150)
      );
      this.view.on(
        'interval:mouseleave',
        _.debounce((e) => {
          const totalValue = this.getTotalValue();
          const displayData = this.parseCentralTextData(totalValue);
          const htmlString = this.getCenterHtmlString(displayData);
          document.getElementsByClassName(this.centralClass)[0].innerHTML = htmlString;
        }, 150)
      );
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
      /** 用户没有指定文本内容时，默认显示总计 */
      const data = this.getTotalValue();
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

  /** 获取总计数据 */
  private getTotalValue(): object {
    const props = this.options;
    let total = 0;
    props.data.forEach((item) => (total += item[props.angleField]));
    const data = {
      [props.angleField]: total,
      [props.colorField]: '总计',
    };
    return data;
  }

  private parseCentralTextData(data) {
    const props = this.options;
    const angleField = props.angleField;
    return props.colorField ? { name: data[props.colorField], value: data[angleField] } : data[angleField];
  }

  private getCentralTextTemplate(displayData) {
    const size = this.getCentralTextSize();
    let htmlString;
    /** 如果文本内容为string或单条数据 */
    if (_.isString(displayData)) {
      htmlString = centralTextTemplate.getSingleDataTemplate(displayData, this.centralClass, size);
    } else if (_.isObject(displayData) && _.keys(displayData).length === 2) {
      /** 如果文本内容为两条数据 */
      const content = displayData as IAttrs;
      htmlString = centralTextTemplate.getTwoDataTemplate(content.name, content.value, this.centralClass, size);
    }
    /** 更为复杂的文本要求用户自行制定html模板 */
    return htmlString;
  }

  /** 获取中心文本的htmlString */
  private getCenterHtmlString(_displayData): string {
    const onActiveConfig = this.centralText.onActive;
    let htmlString: string;
    if (_.isBoolean(onActiveConfig)) {
      htmlString = this.getCentralTextTemplate(_displayData);
    } else if (_.isFunction(onActiveConfig)) {
      htmlString = onActiveConfig(_displayData);
      htmlString = `<div class="ring-guide-html ${this.centralClass}">${htmlString}</div>`;
    }
    return htmlString;
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as IAttrs;
      responsive.method(this);
    });
  }

  private getCentralTextSize() {
    return this.width * this.options.radius;
  }
}

registerPlotType('ring', RingLayer);
