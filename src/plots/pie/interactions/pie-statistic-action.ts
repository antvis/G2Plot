import { View, Action, Util } from '@antv/g2';
import { Types } from '@antv/g2';
import { each, get, isFunction, isString } from '@antv/util';
import { adapteStyle, setStatisticContainerStyle } from '../../../utils/statistic';
/**
 * Pie 中心文本事件的 Action
 */
export class StatisticAction extends Action {
  private initialAnnotation;

  private getAnnotations(_view?: View): object[] {
    const view = _view || this.context.view;
    // @ts-ignore
    return view.getController('annotation').option;
  }

  private getInitialAnnotation(): Types.ComponentOption[] | null {
    return this.initialAnnotation;
  }

  init() {
    const { view } = this.context;
    view.removeInteraction('tooltip');

    view.on('afterchangesize', () => {
      const annotations = this.getAnnotations(view);
      this.initialAnnotation = annotations;
    });
  }

  public change() {
    const { view, event } = this.context;
    const annotations = this.getAnnotations();
    if (!this.initialAnnotation) {
      this.initialAnnotation = annotations;
    }

    let { data } = event?.data || {};
    if (event.type.match('legend-item')) {
      const delegateObject = Util.getDelegationObject(this.context);
      // @ts-ignore
      const colorField = view.getGroupedFields()[0];
      if (delegateObject && colorField) {
        const { item } = delegateObject;
        data = view.getData().find((d) => d[colorField] === item.value);
      }
    }

    if (data) {
      const annotationController = view.getController('annotation');
      annotationController.clear(true);
      // @ts-ignore
      const [, angleField, colorField] = view.getScaleFields();
      const angleScale = view.getScaleByField(angleField);
      const colorScale = view.getScaleByField(colorField);

      const annotationOptions = annotations.filter((a) => !get(a, 'key', '').match('statistic'));
      const statisticOptions = annotations.filter((a) => get(a, 'key', '').match('statistic'));

      const titleOpt = statisticOptions.filter((opt: any) => opt.key === 'top-statistic');
      const contentOpt = statisticOptions.filter((opt: any) => opt.key === 'bottom-statistic');
      each(statisticOptions, (option) => {
        let text;
        let transform;
        if (option.key === 'top-statistic') {
          text = colorScale ? colorScale.getText(data[colorField]) : null;
          transform = contentOpt ? 'translate(-50%, -100%)' : 'translate(-50%, -50%)';
        } else {
          text = angleScale ? angleScale.getText(data[angleField]) : data[angleField];
          transform = titleOpt ? 'translate(-50%, 0)' : 'translate(-50%,-50%)';
        }

        annotationOptions.push({
          ...option,
          html: (container, view) => {
            const coordinate = view.getCoordinate();
            const containerWidth = coordinate.getRadius() * coordinate.innerRadius * 2;

            const style = isFunction(option.style) ? option.style() : option.style;
            setStatisticContainerStyle(container, {
              width: `${containerWidth}px`,
              transform,
              // user's style setting has high priority
              ...adapteStyle(style),
            });
            const filteredData = view.getData();
            if (option.customHtml) {
              return option.customHtml(container, view, data, filteredData);
            }
            if (option.formatter) {
              text = option.formatter(data, filteredData);
            }
            // todo G2 层修复可以返回空字符串 & G2 层修复允许返回非字符串的内容，比如数值 number
            return text ? (isString(text) ? text : `${text}`) : '<div></div>';
          },
        });
        annotationOptions.forEach((opt) => {
          // @ts-ignore
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
