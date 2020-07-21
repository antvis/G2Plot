import { registerAction, registerInteraction, Util } from '@antv/g2';
import Element from '@antv/g2/lib/geometry/element';
import { Action } from '@antv/g2/lib/interaction';
import { ComponentOption } from '@antv/g2/lib/interface';
import { getDelegationObject } from '@antv/g2/lib/interaction/action/util';
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
      // todo remove ignore
      // @ts-ignore
      annotationController.clear(true);
      // @ts-ignore
      const [, angleField, colorField] = view.getScaleFields();
      const angleScale = view.getScaleByField(angleField);
      const colorScale = view.getScaleByField(colorField);

      const annotationOptions = annotations.filter((a) => get(a, 'extra.key') !== 'statistic').map((a) => a.extra);
      const statisticOptions = annotations.filter((a) => get(a, 'extra.key') === 'statistic').map((a) => a.extra || {});
      const statisticData = getStatisticData(data, angleScale, colorScale);

      each(statisticOptions, (options, idx) => {
        const value = data[idx === 0 ? colorField : angleField];
        annotationOptions.push({
          ...options,
          content: options.formatter ? options.formatter(statisticData, data) : value,
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

registerAction('pie-statistic', StatisticAction);
registerInteraction('pie-statistic-active', {
  start: [{ trigger: 'element:mouseenter', action: 'pie-statistic:change' }],
  end: [{ trigger: 'element:mouseleave', action: 'pie-statistic:reset' }],
});

/**
 * 饼图 图例激活 action
 */
export class PieLegendAction extends Action {
  /**
   * 获取激活的图形元素
   */
  private getActiveElements(): Element[] {
    const delegateObject = getDelegationObject(this.context);
    if (delegateObject) {
      const view = this.context.view;
      const { component, item } = delegateObject;
      const field = component.get('field');
      if (field) {
        const elements = view.geometries[0].elements;
        return elements.filter((ele) => ele.getModel().data[field] === item.value);
      }
    }
    return [];
  }

  public active() {
    const { view } = this.context;
    const elements = this.getActiveElements();
    elements.forEach((element) => {
      const coordinate = element.geometry.coordinate;
      if (coordinate.isPolar && coordinate.isTransposed) {
        const { startAngle, endAngle } = Util.getAngle(element.getModel(), coordinate);
        const middleAngle = (startAngle + endAngle) / 2;
        /** offset 偏移 */
        const r = 7.5;
        const x = r * Math.cos(middleAngle);
        const y = r * Math.sin(middleAngle);
        const matrix = Util.transform(null, [['t', x, y]]);
        element.shape.setMatrix(matrix);
      }
    });
    view.render(true);
  }

  public reset() {}
}

registerAction('pie-legend', PieLegendAction);
registerInteraction('pie-legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: 'pie-legend:active' }],
  end: [{ trigger: 'legend-item:mouseleave', action: 'pie-legend:reset' }],
});
