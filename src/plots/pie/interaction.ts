import { registerAction, registerInteraction } from '@antv/g2';
import { Action } from '@antv/g2/lib/interaction';
import { ComponentOption } from '@antv/g2/lib/interface';
import { each, get } from '@antv/util';
import { getStatisticData } from './utils';

/**
 * Pie 中心文本事件的 Action
 */
export class StatisticAction extends Action {
  private initialAnnotation;

  private getAnnotations() {
    const view = this.context.view;
    return view.getComponents().filter((co) => co.type === 'annotation');
  }

  private getInitialAnnotation(): ComponentOption[] | null {
    return this.initialAnnotation;
  }

  init() {
    const { view } = this.context;
    view.removeInteraction('tooltip');
  }

  public change() {
    const { view, event } = this.context;
    const annotations = this.getAnnotations();
    if (!this.initialAnnotation) {
      this.initialAnnotation = annotations;
    }

    const { data } = event.data;
    if (data) {
      const annotationController = view.getController('annotation');
      // @ts-ignore
      annotationController.clear(true);
      // @ts-ignore
      const [, angleField, colorField] = view.getScaleFields();

      const annotationOptions = annotations.filter((a) => get(a, 'extra.key') !== 'statistic').map((a) => a.extra);
      const statisticOptions = annotations.filter((a) => get(a, 'extra.key') === 'statistic').map((a) => a.extra || {});
      const statisticData = getStatisticData(view, data);

      each(statisticOptions, (options, idx) => {
        const value = data[idx === 0 ? colorField : angleField];
        annotationOptions.push({
          ...options,
          content: options.formatter ? options.formatter(statisticData, data) : value,
        });
      });
      annotationOptions.forEach((opt) => {
        // @ts-ignore
        annotationController.annotation(opt);
      });
      view.render(true);
    }
  }

  public reset() {
    const { view } = this.context;
    // @ts-ignore
    const annotationController = view.getController('annotation');
    // @ts-ignore
    annotationController.clear(true);
    const initialStatistic = this.getInitialAnnotation();
    each(initialStatistic, (a) => {
      view.annotation().text(get(a, 'extra', {}));
    });
    view.render(true);
  }
}

registerAction('statistic', StatisticAction);

registerInteraction('statistic-active', {
  start: [{ trigger: 'element:mouseenter', action: 'statistic:change' }],
  end: [{ trigger: 'element:mouseleave', action: 'statistic:reset' }],
});
