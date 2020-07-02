import { View } from '../../../dependents';
import StatisticHtml, { IStatisticHtml } from './statistic';
import { getTemplate } from './statistic-template';
import { debounce, each } from '@antv/util';
import Ring, { DonutViewConfig } from '../layer';
import { LooseMap } from '../../../interface/types';

interface IRingStatistic extends IStatisticHtml {
  view: View;
  plot: any;
}

interface StatisticData {
  name: string;
  value: string;
  itemData?: LooseMap;
  color?: string;
}

export default class RingStatistic extends StatisticHtml {
  protected view: View;
  protected plot: Ring;
  protected statisticClass: string;
  protected options: DonutViewConfig['statistic'];

  constructor(cfg: IRingStatistic) {
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
        const displayData = this.parseStatisticData('item', e.data.data, e.data.color);
        const htmlString = this.getStatisticHtmlString(displayData);
        this.updateHtml(htmlString);
      }, 150)
    );
    const triggerOffEvent = this.options.triggerOff ? this.options.triggerOff : 'mouseleave';
    this.view.on(
      `interval:${triggerOffEvent}`,
      debounce(() => {
        const htmlString = this.getTotalHtmlString();
        this.updateHtml(htmlString);
      }, 150)
    );
  }

  protected getTotalHtmlString(): string {
    let displayData;
    if (this.options.content) {
      displayData = this.options.content;
    } else {
      /** 用户没有指定文本内容时，默认显示总计 */
      const data = this.getTotalValue();
      displayData = this.parseStatisticData('total', data);
    }
    /** 中心文本显示 */
    let htmlString;
    if (this.options.htmlContent) {
      htmlString = this.options.htmlContent(displayData, this.getStatisticSize());
    } else {
      htmlString = this.getStatisticTemplate(displayData);
    }
    return htmlString;
  }

  protected adjustOptions() {
    this.html = this.getTotalHtmlString();

    const { minX, minY, width, height } = this.view.coordinateBBox;
    this.x = minX + width / 2;
    this.y = minY + height / 2;
  }

  private getTotalValue() {
    let total = 0;
    const { angleField, colorField } = this.plot.options;
    const { totalLabel } = this.options;
    each(this.plot.options.data, (item) => {
      if (typeof item[angleField] === 'number') {
        total += item[angleField];
      }
    });
    const data = {
      [angleField]: total,
      [colorField]: totalLabel,
    };
    return data;
  }

  private parseStatisticData(type: string, data, color?: string) {
    const plot = this.plot;
    const { angleField, colorField } = plot.options;
    const angleScale = plot.getScaleByField(angleField);
    const colorScale = plot.getScaleByField(colorField);

    const statisticData: StatisticData = {
      name: colorScale ? colorScale.getText(data[colorField]) : null,
      value: angleScale.getText(data[angleField]),
    };

    if (type === 'item') {
      // 每一个扇形区域的数据
      statisticData.itemData = data;
      statisticData.color = color;
    }

    return statisticData;
  }

  private getStatisticTemplate(data) {
    const size = this.getStatisticSize();
    const htmlString = getTemplate(data.name, data.value, this.statisticClass, size);
    /** 更为复杂的文本要求用户自行制定html模板 */
    return htmlString;
  }

  private getStatisticSize() {
    const viewRange = this.plot.view.coordinateBBox;
    const { radius, innerRadius } = this.plot.options;
    const minContainerSize = Math.min(viewRange.width, viewRange.height);
    const size = minContainerSize * radius * innerRadius;
    return size;
  }

  private getStatisticHtmlString(data): string {
    const htmlContent = this.options.htmlContent;
    let htmlString: string;
    if (htmlContent) {
      htmlString = htmlContent(data, this.getStatisticSize());
    } else {
      htmlString = this.getStatisticTemplate(data);
    }

    return htmlString;
  }
}
