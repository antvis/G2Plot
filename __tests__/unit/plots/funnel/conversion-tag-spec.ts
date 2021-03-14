import { Funnel } from '../../../../src';
import { PV_DATA, PV_DATA_COMPARE } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';

describe('conversition tag', () => {
  test('conversition tag: basic & dynamicHeight', () => {
    const funnelOption = {
      width: 400,
      height: 400,
      data: PV_DATA,
      xField: 'action',
      yField: 'pv',
    };
    const funnel = new Funnel(createDiv('conversition tag: basic & dynamicHeight'), funnelOption);
    funnel.render();

    const annotation = funnel.chart.getController('annotation').getComponents();
    expect(annotation.length).toEqual(4);

    expect(annotation.map((co) => co.component.get('text').content)).toEqual([
      '转化率: 70.00%',
      '转化率: 71.43%',
      '转化率: 60.00%',
      '转化率: 56.67%',
    ]);

    // 自定义 label
    funnel.update({
      ...funnelOption,
      dynamicHeight: true,
      conversionTag: {
        offsetX: 50,
        offsetY: 20,
        style: {
          fontSize: 18,
        },
        formatter: (datum) => `${datum.$$percentage$$}占比`,
      },
    });

    const customAnnotation = funnel.chart.getController('annotation').getComponents();
    expect(customAnnotation.length).toEqual(4);

    expect(customAnnotation[0].component.get('text').offsetX).toBe(50);
    expect(customAnnotation[0].component.get('text').offsetY).toBe(20);
    expect(customAnnotation[0].component.get('text').style.fontSize).toBe(18);

    expect(customAnnotation.map((co) => co.component.get('text').content)).toEqual([
      '0.7占比',
      '0.5占比',
      '0.3占比',
      '0.17占比',
    ]);

    // 关闭转化率组件
    funnel.update({
      ...funnelOption,
      conversionTag: false,
    });
    expect(funnel.chart.getController('annotation').getComponents().length).toBe(0);

    funnel.destroy();
  });

  test('conversation compare', () => {
    // 自定义 label
    const funnel = new Funnel(createDiv('conversation compare'), {
      width: 400,
      height: 400,
      data: PV_DATA_COMPARE,
      compareField: 'quarter',
      xField: 'action',
      yField: 'pv',
    });
    funnel.render();

    const [v1, v2] = funnel.chart.views;
    const annotation1 = v1.getController('annotation').getComponents();
    const d1 = v1.getOptions().data;
    expect(annotation1[0].component.cfg.content).toBe(d1[0].quarter);

    expect(
      annotation1.filter((co) => co.component.get('type') === 'line').map((co) => co.component.get('text').content)
    ).toEqual(['转化率: 70.00%', '转化率: 71.43%', '转化率: 60.00%', '转化率: 76.67%']);

    const annotation2 = v2.getController('annotation').getComponents();
    const d2 = v2.getOptions().data;
    expect(annotation2[0].component.cfg.content).toBe(d2[0].quarter);

    expect(
      annotation2.filter((co) => co.component.get('type') === 'line').map((co) => co.component.get('text').content)
    ).toEqual(['转化率: 78.75%', '转化率: 74.60%', '转化率: 51.06%', '转化率: 72.92%']);

    funnel.destroy();
  });
});
