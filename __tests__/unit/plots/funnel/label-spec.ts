import { Funnel } from '../../../../src';
import { PV_DATA, PV_DATA_COMPARE } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';
import { FUNNEL_CONVERSATION, FUNNEL_PERCENT } from '../../../../src/plots/funnel/constant';

describe('label', () => {
  test('label basic & dynamicHeight', () => {
    const funnelOption = {
      width: 400,
      height: 400,
      data: PV_DATA,
      xField: 'action',
      yField: 'pv',
    };
    const funnel = new Funnel(createDiv('label basic & dynamicHeight'), funnelOption);
    funnel.render();
    const geometry = funnel.chart.geometries[0];
    const { labelOption, labelsContainer } = geometry;
    const labelOptionCfg = labelOption && labelOption.cfg;
    expect(labelOption).not.toBeFalsy();
    expect(labelOption && labelOption.fields).toEqual(['action', 'pv', FUNNEL_PERCENT, FUNNEL_CONVERSATION]);
    expect(labelOptionCfg.position).toBe('middle');
    expect(labelsContainer.cfg.children.length).toBe(5);
    expect(labelOptionCfg.style.fill).toBe('#fff');
    expect(labelOptionCfg.style.fontSize).toBe(12);
    const { data } = funnel.chart.getOptions();
    labelsContainer.cfg.children.forEach((item, index) => {
      expect(item.get('children')[0].attr('text')).toBe(`${data[index].action} ${data[index].pv}`);
    });

    // 自定义 label
    funnel.update({
      ...funnelOption,
      dynamicHeight: true,
      label: {
        fields: ['action'],
        formatter: (datum) => `行为:${datum.action}`,
        style: {
          fill: '#f00',
        },
        position: 'right',
      },
    });

    funnel.chart.geometries[0].labelsContainer.cfg.children.forEach((item, index) => {
      expect(item.get('children')[0].attr('text')).toBe(`行为:${data[index].action}`);
    });
    // @ts-ignore
    const customLabelCfg = funnel.chart.geometries[0].labelOption.cfg;
    expect(customLabelCfg.style.fill).toBe('#f00');

    // 关闭 label
    funnel.update({
      ...funnelOption,
      label: false,
    });
    expect(funnel.chart.geometries[0].labelsContainer.cfg.children.length).toBe(0);

    funnel.destroy();
  });

  test('label compare', () => {
    // 自定义 label
    const funnelOption = {
      width: 400,
      height: 400,
      data: PV_DATA_COMPARE,
      compareField: 'quarter',
      xField: 'action',
      yField: 'pv',
    };

    const funnel = new Funnel(createDiv('label compare'), funnelOption);
    funnel.render();

    funnel.chart.views.forEach((funnelView) => {
      const geometry = funnelView.geometries[0];
      const { labelOption, labelsContainer } = geometry;
      const { data } = funnelView.getOptions();
      const labelOptionCfg = labelOption && labelOption.cfg;
      expect(labelOption && labelOption.fields).toEqual([
        'action',
        'pv',
        'quarter',
        FUNNEL_PERCENT,
        FUNNEL_CONVERSATION,
      ]);
      expect(labelOptionCfg.position).toBe('left');
      expect(labelsContainer.cfg.children.length).toBe(5);
      expect(labelOptionCfg.style.fill).toBe('#fff');
      expect(labelOptionCfg.style.fontSize).toBe(12);
      labelsContainer.cfg.children.forEach((item, index) => {
        expect(item.get('children')[0].attr('text')).toBe(`${data[index].pv}`);
      });
    });

    // 自定义 label
    funnel.update({
      ...funnelOption,
      dynamicHeight: true,
      label: {
        fields: ['action'],
        formatter: (datum) => `行为:${datum.action}`,
        style: {
          fill: '#f00',
        },
        position: 'right',
      },
    });

    funnel.chart.views.forEach((funnelView) => {
      const geometry = funnelView.geometries[0];
      const { labelOption, labelsContainer } = geometry;
      const { data } = funnelView.getOptions();
      const labelOptionCfg = labelOption && labelOption.cfg;
      expect(labelOption && labelOption.fields).toEqual(['action']);
      expect(labelOptionCfg.position).toBe('right');
      expect(labelsContainer.cfg.children.length).toBe(5);
      expect(labelOptionCfg.style.fill).toBe('#f00');
      labelsContainer.cfg.children.forEach((item, index) => {
        expect(item.get('children')[0].attr('text')).toBe(`行为:${data[index].action}`);
      });
    });

    funnel.update({
      ...funnelOption,
      label: false,
    });

    funnel.chart.views.forEach((funnelView) => {
      expect(funnelView.geometries[0].labelsContainer.cfg.children.length).toBe(0);
    });

    funnel.destroy();
  });
});
