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
        style: {
          fill: '#f00',
          fontSize: 14,
        },
        formatter: (datum) => {
          return datum[FUNNEL_CONVERSATION].toFixed(2);
        },
      },
    });

    labelsContainer.cfg.children.forEach((item, index) => {
      expect(item.get('children')[0].attr('text')).toBe(`${data[index][FUNNEL_CONVERSATION].toFixed(2)}`);
    });
    // @ts-ignore
    const customLabelCfg = funnel.chart.geometries[0].labelOption.cfg;
    expect(customLabelCfg.style.fill).toBe('#f00');
    expect(customLabelCfg.style.fontSize).toBe(14);

    funnel.update({
      ...funnelOption,
      label: false,
    });
    expect(funnel.chart.geometries[0].labelsContainer.cfg.children.length).toBe(0);

    funnel.destroy();
  });

  test('label compare', () => {
    // 自定义 label
    const funnel = new Funnel(createDiv('label compare'), {
      width: 400,
      height: 400,
      data: PV_DATA_COMPARE,
      compareField: 'quarter',
      xField: 'action',
      yField: 'pv',
    });
    funnel.render();

    funnel.chart.views.forEach((funnelView) => {
      const geometry = funnelView.geometries[0];
      const { labelOption, labelsContainer } = geometry;
      const { data } = funnelView.getOptions();
      const labelOptionCfg = labelOption && labelOption.cfg;
      expect(labelOption && labelOption.fields).toEqual(['action', 'pv', FUNNEL_PERCENT, FUNNEL_CONVERSATION]);
      expect(labelOptionCfg.position).toBe('left');
      expect(labelsContainer.cfg.children.length).toBe(5);
      expect(labelOptionCfg.style.fill).toBe('#fff');
      expect(labelOptionCfg.style.fontSize).toBe(12);
      labelsContainer.cfg.children.forEach((item, index) => {
        expect(item.get('children')[0].attr('text')).toBe(`${data[index].pv}`);
      });
    });

    funnel.destroy();
  });
});
