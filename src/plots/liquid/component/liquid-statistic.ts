import { isType } from '@antv/util';
import { View } from '../../../dependents';
import StatisticHtml, { IStatisticHtml } from '../../../components/statistic';
import Liquid, { LiquidViewConfig } from '../layer';
import { getTemplate } from './statistic-template';

interface IRingStatistic extends IStatisticHtml {
  view: View;
  plot: any;
}

export default class RingStatistic extends StatisticHtml {
  protected view: View;
  protected plot: Liquid;
  protected statisticClass: string;
  protected options: LiquidViewConfig['statistic'];

  constructor(cfg: IRingStatistic) {
    super(cfg);
    this.view = cfg.view;
    this.plot = cfg.plot;
    this.statisticClass = cfg.statisticClass;
    this.adjustOptions();
  }

  /** 中心文本显示 */
  protected getTotalHtmlString(): HTMLDivElement {
    const statisticContainer = document.createElement('div');
    const { value = 0, statistic } = this.plot.options;
    if (statistic && !statistic.visible) {
      return statisticContainer;
    }
    const htmlContent = this.options.htmlContent(value);
    if (isType(htmlContent, 'HTMLDivElement')) {
      statisticContainer.appendChild(htmlContent as HTMLDivElement);
    } else {
      statisticContainer.innerHTML = getTemplate(htmlContent as string, this.statisticClass);
    }

    return statisticContainer;
  }

  protected adjustOptions() {
    this.html = this.getTotalHtmlString();
    const { minX, minY, width, height } = this.view.coordinateBBox;
    this.x = minX + width / 2;
    this.y = minY + height / 2;
  }
}
