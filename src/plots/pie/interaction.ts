import { registerAction, registerInteraction } from '@antv/g2';
import { Action } from '@antv/g2/lib/interaction';
import { ComponentOption } from '@antv/g2/lib/interface';
import { each, get } from '@antv/util';

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
      const [__, yField] = view.geometries[0].getXYFields();
      const colorScale = view.geometries[0].getAttribute('color').scales[0];
      const colorField = colorScale && colorScale.field;

      const annotationOptions = annotations.filter((a) => get(a, 'extra.key') !== 'statistic').map((a) => a.extra);
      const statisticOptions = annotations.filter((a) => get(a, 'extra.key') === 'statistic').map((a) => a.extra || {});
      each(statisticOptions, (options, idx) => {
        const value = data[idx === 0 ? colorField : yField];
        annotationOptions.push({
          ...options,
          content: options.formatter ? options.formatter('item', data) : value,
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
