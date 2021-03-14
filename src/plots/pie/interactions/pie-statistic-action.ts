import { View, Action, Util, Types } from '@antv/g2';
import { each, get } from '@antv/util';
import { PieOptions } from '..';
import { Annotation } from '../../../types/annotation';
import { renderStatistic } from '../../../utils/statistic';
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

  public change(arg?: Pick<PieOptions, 'annotations' | 'statistic'>) {
    const { view, event } = this.context;
    if (!this.initialAnnotation) {
      this.initialAnnotation = this.getAnnotations();
    }

    let data = get(event, ['data', 'data']);
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
      const annotations = get(arg, 'annotations', []);
      const statistic = get(arg, 'statistic', {});
      // 先清空标注，再重新渲染
      view.getController('annotation').clear(true);
      // 先进行其他 annotations，再去渲染统计文本
      each(annotations, (annotation: Annotation) => {
        if (typeof annotation === 'object') {
          view.annotation()[annotation.type](annotation);
        }
      });
      renderStatistic(view, { statistic, plotType: 'pie' }, data);
      view.render(true);
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
