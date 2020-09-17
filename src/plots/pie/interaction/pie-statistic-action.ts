import { Action } from '@antv/g2/lib/interaction';
import { ComponentOption } from '@antv/g2/lib/interface';
import { each, get, isFunction } from '@antv/util';

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
      // todo remove ignore
      // @ts-ignore
      annotationController.clear(true);
      // @ts-ignore
      const [, angleField, colorField] = view.getScaleFields();
      const angleScale = view.getScaleByField(angleField);
      const colorScale = view.getScaleByField(colorField);

      const annotationOptions = annotations.filter((a) => get(a, 'extra.key') !== 'statistic').map((a) => a.extra);
      const statisticOptions = annotations.filter((a) => get(a, 'extra.key') === 'statistic').map((a) => a.extra || {});

      each(statisticOptions, (options, idx) => {
        let value;
        if (idx === 0) {
          // title
          value = colorScale ? colorScale.getText(data[colorField]) : null;
        } else {
          value = angleScale ? angleScale.getText(data[angleField]) : data[angleField];
        }

        annotationOptions.push({
          ...options,
          content: options.formatter ? options.formatter(data, view.getData()) : value,
        });
      });
      annotationOptions.forEach((opt) => {
        // todo remove ignore
        // @ts-ignore
        annotationController.annotation(opt);
      });
      view.render(true);
    }
  }

  public reset() {
    const { view } = this.context;
    const annotationController = view.getController('annotation');
    // todo remove ignore
    // @ts-ignore
    annotationController.clear(true);
    const initialStatistic = this.getInitialAnnotation();
    each(initialStatistic, (a) => {
      view.annotation().text(get(a, 'extra', {}));
    });
    view.render(true);
  }
}
