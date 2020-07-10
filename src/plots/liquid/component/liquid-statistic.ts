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

  protected getTotalHtmlString(): string {
    const { value = 0, statistic } = this.plot.options;
    if (statistic && !statistic.visible) {
      return '';
    }
    /** 中心文本显示 */
    return getTemplate(this.options.htmlContent(value), this.statisticClass);
  }

  protected adjustOptions() {
    this.html = this.getTotalHtmlString();
    const { minX, minY, width, height } = this.view.coordinateBBox;
    this.x = minX + width / 2;
    this.y = minY + height / 2;
  }
}
