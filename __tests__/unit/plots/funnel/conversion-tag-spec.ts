import { Funnel } from '../../../../src';
import { PV_DATA, PV_DATA_COMPARE } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';
import { FUNNEL_CONVERSATION, FUNNEL_PERCENT } from '../../../../src/plots/funnel/constant';

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
    console.log(annotation);
    PV_DATA.forEach((pvItem, index) => {
      if (index === 0) return;
      const content = annotation[index - 1].component.get('text').content;
      console.log(content);
      expect(content).toBe(`转化率${(pvItem[FUNNEL_CONVERSATION] * 100).toFixed(2)}%`);
    });

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
    PV_DATA.forEach((pvItem, index) => {
      if (index === 0) return;
      const text = customAnnotation[index - 1].component.get('text');
      expect(text.content).toBe(`${pvItem[FUNNEL_PERCENT]}占比`);
      expect(text.offsetX).toBe(50);
      expect(text.offsetY).toBe(20);
      expect(text.style.fontSize).toBe(18);
    });

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

    funnel.chart.views.forEach((funnelView) => {
      const { data } = funnelView.getOptions();
      const annotation = funnelView.getController('annotation').getComponents();
      expect(annotation.length).toEqual(5);
      expect(annotation[0].component.cfg.content).toBe(data[0].quarter);
      data.forEach((pvItem, index) => {
        if (index === 0) return;
        expect(annotation[index].component.get('text').content).toBe(
          `转化率${(pvItem[FUNNEL_CONVERSATION] * 100).toFixed(2)}%`
        );
      });
    });

    funnel.destroy();
  });
});
