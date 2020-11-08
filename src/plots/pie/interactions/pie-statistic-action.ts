import { Action } from '@antv/g2/lib/interaction';
import { ComponentOption } from '@antv/g2/lib/interface';
import { each, get } from '@antv/util';
import { generateStatisticStyle, measureTextWidth } from '../utils';

/**
 * Pie 中心文本事件的 Action
 */
export class StatisticAction extends Action {
  private initialAnnotation;

  private getAnnotations() {
    const view = this.context.view;
    // @ts-ignore
    return view.getController('annotation').option;
  }

  private getInitialAnnotation(): ComponentOption[] | null {
    return this.initialAnnotation;
  }

  init() {
    const { view } = this.context;
    view.removeInteraction('tooltip');

    view.on('afterchangesize', () => {
      const annotations = this.getAnnotations();
      this.initialAnnotation = annotations;
    });
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
      annotationController.clear(true);
      // @ts-ignore
      const [, angleField, colorField] = view.getScaleFields();
      const angleScale = view.getScaleByField(angleField);
      const colorScale = view.getScaleByField(colorField);

      const annotationOptions = annotations.filter((a) => !get(a, 'key', '').match('statistic'));
      const statisticOptions = annotations.filter((a) => get(a, 'key', '').match('statistic'));

      each(statisticOptions, (option) => {
        let text;
        let field;
        if (option.key === 'top-statistic') {
          // title
          field = colorField;
          text = colorScale ? colorScale.getText(data[colorField]) : null;
        } else {
          field = angleField;
          text = angleScale ? angleScale.getText(data[angleField]) : data[angleField];
        }

        annotationOptions.push({
          ...option,
          html: (container) => {
            const styles = option.style;

            container.style['pointer-events'] = 'none';
            container.style.width = `${parseFloat(styles.width)}px`;
            container.style['font-size'] = `${parseFloat(styles.fontSize)}px`;
            container.style['line-height'] = `${parseFloat(styles.lineHeight)}px`;
            const textWidth = measureTextWidth(text, styles);
            const fontSize = `${Math.min((styles.width / textWidth) * 0.9 /** 魔法数字的比例 */, 1)}em`;
            const textStyleStr = `${generateStatisticStyle(styles)}`;

            return `<div style="${textStyleStr};font-size:${fontSize};line-height:${
              styles.width < textWidth ? 'initial' : 'inherit'
            };">${text}</div>`;
          },
        });
        annotationOptions.forEach((opt) => {
          annotationController.annotation(opt);
        });
        view.render(true);
      });
    }
  }

  public reset() {
    const { view } = this.context;
    const annotationController = view.getController('annotation');
    annotationController.clear(true);
    const initialStatistic = this.getInitialAnnotation();
    each(initialStatistic, (a) => {
      view.annotation()[a.type](a);
    });
    view.render(true);
  }
}
