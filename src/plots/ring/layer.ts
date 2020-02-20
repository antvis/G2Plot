import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import PieLayer, { PieViewConfig } from '../pie/layer';
import responsiveMethods from './apply-responsive';
import './apply-responsive/theme';
import * as statisticTemplate from './component/statistic-template';
import * as EventParser from './event';
import { LooseMap } from '../../interface/types';

export interface RingViewConfig extends PieViewConfig {
  innerRadius?: number;
  statistic?: any; //FIXME: 指标卡
}

export interface RingLayerConfig extends RingViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  ring: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'ring',
};

export default class RingLayer<T extends RingLayerConfig = RingLayerConfig> extends PieLayer<T> {
  public static centralId = 0;
  public type: string = 'ring';
  private statistic: any; // 保存指标卡实例用于响应交互
  private statisticClass: string; // 指标卡的class,用于重点文本容器的唯一标识，一个页面多个环图时，共用 class 交互会有问题。

  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      radius: 0.8,
      innerRadius: 0.64,
      statistic: {
        visible: true,
        triggerOn: 'mouseenter',
        triggerOff: 'mouseleave',
      },
    });
  }

  public getOptions(props: T) {
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    return _.deepMix({}, options, defaultOptions, props);
  }

  public beforeInit() {
    super.beforeInit();
    RingLayer.centralId++;
    this.statisticClass = `statisticClassId${RingLayer.centralId}`;
    const props = this.options;
    /** 响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      this.applyResponsive('preRender');
    }
  }

  public afterInit() {
    super.afterInit();
    /** 处理环图中心文本响应交互的问题 */
    if (this.statistic && this.statistic.visible && this.statistic.triggerOn) {
      const triggerOnEvent = this.statistic.triggerOn;
      this.view.on(
        `interval:${triggerOnEvent}`,
        _.debounce((e) => {
          const displayData = this.parseStatisticData(e.data._origin);
          const htmlString = this.getStatisticHtmlString(displayData);
          document.getElementsByClassName(this.statisticClass)[0].innerHTML = htmlString;
        }, 150)
      );
      const triggerOffEvent = this.statistic.triggerOff ? this.statistic.triggerOff : 'mouseleave';
      this.view.on(
        `interval:${triggerOffEvent}`,
        _.debounce((e) => {
          const totalValue = this.getTotalValue();
          const displayData = this.parseStatisticData(totalValue);
          const htmlString = this.getStatisticHtmlString(displayData);
          document.getElementsByClassName(this.statisticClass)[0].innerHTML = htmlString;
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
    const coordConfig:any = {
      type: 'theta',
      cfg: {
        radius: props.radius,
        innerRadius: props.innerRadius,
      },
    };
    this.setConfig('coordinate', coordConfig);
  }

  protected annotation() {
    const annotationConfigs = [];
    const props = this.options;
    if (props.statistic && props.statistic.visible) {
      const statistic = this.drawStatistic(props.statistic);
      annotationConfigs.push(statistic);
      this.statistic = statistic;
    }
    this.setConfig('annotations', annotationConfigs);
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private drawStatistic(config) {
    const statistic: LooseMap = _.deepMix(
      {},
      {
        type: 'html',
        top: true,
        position: ['50%', '50%'],
        triggerOn: 'mouseenter',
      },
      config
    );
    /** 中心文本内容 */
    let displayData;
    if (config.content) {
      displayData = config.content;
    } else {
      /** 用户没有指定文本内容时，默认显示总计 */
      const data = this.getTotalValue();
      displayData = this.parseStatisticData(data);
    }
    /** 中心文本显示 */
    let htmlString;
    if (config.htmlContent) {
      htmlString = config.htmlContent(displayData);
    } else {
      htmlString = this.getStatisticTemplate(displayData);
    }
    statistic.html = htmlString;
    /** 是否响应状态量 */
    if (statistic.triggerOn) {
      this.setConfig('tooltip', false);
    }
    return statistic;
  }

  /** 获取总计数据 */
  private getTotalValue(): object {
    const props = this.options;
    let total = 0;
    _.each(props.data, (item) => {
      if (typeof item[props.angleField] === 'number') {
        total += item[props.angleField];
      }
    });
    const data = {
      [props.angleField]: total,
      [props.colorField]: '总计',
    };
    return data;
  }

  private parseStatisticData(data) {
    const props = this.options;
    const angleField = props.angleField;
    return props.colorField ? { name: data[props.colorField], value: data[angleField] } : data[angleField];
  }

  private getStatisticTemplate(displayData) {
    const size = this.getStatisticSize();
    let htmlString;
    /** 如果文本内容为string或单条数据 */
    if (_.isString(displayData)) {
      htmlString = statisticTemplate.getSingleDataTemplate(displayData, this.statisticClass, size);
    } else if (_.isObject(displayData) && _.keys(displayData).length === 2) {
      /** 如果文本内容为两条数据 */
      const content = displayData as LooseMap;
      htmlString = statisticTemplate.getTwoDataTemplate(content.name, content.value, this.statisticClass, size);
    }
    /** 更为复杂的文本要求用户自行制定html模板 */
    return htmlString;
  }

  /** 获取中心文本的htmlString */
  private getStatisticHtmlString(_displayData): string {
    const triggerOnConfig = this.statistic.triggerOn;
    let htmlString: string;
    if (_.isString(triggerOnConfig)) {
      htmlString = this.getStatisticTemplate(_displayData);
    }
    if (_.isFunction(triggerOnConfig)) {
      htmlString = triggerOnConfig(_displayData);
      htmlString = `<div class="ring-guide-html ${this.statisticClass}">${htmlString}</div>`;
    }
    return htmlString;
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as LooseMap;
      responsive.method(this);
    });
  }

  private getStatisticSize() {
    return this.width * this.options.radius;
  }

  /** @override 调整 label 默认 options */
  protected adjustLabelDefaultOptions(options: RingLayerConfig) {
    const labelConfig = { ...options.label };
    if (labelConfig && labelConfig.type === 'inner') {
      const labelStyleConfig = (labelConfig.style || {}) as LooseMap;
      if (!labelStyleConfig.textAlign) {
        labelStyleConfig.textAlign = 'center';
      }
      labelConfig.style = labelStyleConfig;
      if (!labelConfig.offset) {
        labelConfig.offset = `${((options.innerRadius - 1) / 2) * 100}%`;
      }
    }
    return labelConfig;
  }
}

registerPlotType('ring', RingLayer);
