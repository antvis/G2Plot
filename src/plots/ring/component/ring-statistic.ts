import { View } from '../../../dependents';
import StatisticHtml, { IStaticticHtml } from './statistic';
import * as statisticTemplate from './statistic-template';
import { debounce, each, isString, isObject, isFunction, keys } from '@antv/util';
import { LooseMap } from '../../../interface/types';

interface IRingStatictic extends IStaticticHtml {
  view: View;
  plot: any;
}

export default class RingStatistic extends StatisticHtml {
  protected view: View;
  protected plot: any;
  protected statisticClass: string;

  constructor(cfg: IRingStatictic) {
    super(cfg);
    this.view = cfg.view;
    this.plot = cfg.plot;
    this.statisticClass = cfg.statisticClass;
    this.adjustOptions();
  }

  public triggerOn() {
    const triggerOnEvent = this.options.triggerOn;
    this.view.on(
      `interval:${triggerOnEvent}`,
      debounce((e) => {
        const displayData = this.parseStatisticData(e.data.data);
        const htmlString = this.getStatisticHtmlString(displayData);
        this.updateHtml(htmlString);
      }, 150)
    );
    const triggerOffEvent = this.options.triggerOff ? this.options.triggerOff : 'mouseleave';
    this.view.on(
      `interval:${triggerOffEvent}`,
      debounce((e) => {
        const totalValue = this.getTotalValue();
        const displayData = this.parseStatisticData(totalValue);
        const htmlString = this.getStatisticHtmlString(displayData);
        this.updateHtml(htmlString);
      }, 150)
    );
  }

  protected adjustOptions() {
    let displayData;
    if (this.options.content) {
      displayData = this.options.content;
    } else {
      /** 用户没有指定文本内容时，默认显示总计 */
      const data = this.getTotalValue();
      displayData = this.parseStatisticData(data);
    }
    /** 中心文本显示 */
    let htmlString;
    if (this.options.htmlContent) {
      htmlString = this.options.htmlContent(displayData);
    } else {
      htmlString = this.getStatisticTemplate(displayData);
    }

    this.html = htmlString;

    const { minX, minY, width, height } = this.view.coordinateBBox;
    this.x = minX + width / 2;
    this.y = minY + height / 2;
  }

  private getTotalValue() {
    let total = 0;
    const { angleField, colorField } = this.plot.options;
    each(this.plot.options.data, (item) => {
      if (typeof item[angleField] === 'number') {
        total += item[angleField];
      }
    });
    const data = {
      [angleField]: total,
      [colorField]: '总计',
    };
    return data;
  }

  private parseStatisticData(data) {
    const { angleField, colorField } = this.plot.options;
    return colorField ? { name: data[colorField], value: data[angleField] } : data[angleField];
  }

  private getStatisticTemplate(data) {
    const size = this.getStatisticSize();
    let htmlString;
    /** 如果文本内容为string或单条数据 */
    if (isString(data)) {
      htmlString = statisticTemplate.getSingleDataTemplate(data, this.statisticClass, size);
    } else if (isObject(data) && keys(data).length === 2) {
      /** 如果文本内容为两条数据 */
      const content = data as LooseMap;
      htmlString = statisticTemplate.getTwoDataTemplate(content.name, content.value, this.statisticClass, size);
    }
    /** 更为复杂的文本要求用户自行制定html模板 */
    return htmlString;
  }

  private getStatisticSize() {
    return this.plot.width * this.plot.options.radius;
  }

  private getStatisticHtmlString(data): string {
    const triggerOnConfig = this.options.triggerOn;
    let htmlString: string;
    if (isString(triggerOnConfig)) {
      htmlString = this.getStatisticTemplate(data);
    }
    if (isFunction(triggerOnConfig)) {
      htmlString = triggerOnConfig(data);
      htmlString = `<div class="ring-guide-html ${this.statisticClass}">${htmlString}</div>`;
    }
    return htmlString;
  }
}
