import { getInteraction, getActionClass } from '@antv/g2';
import InteractionContext from '@antv/g2/lib/interaction/context';
import { deepMix } from '@antv/util';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';
import { Pie } from '../../../../src';
import { StatisticAction } from '../../../../src/plots/pie/interactions/actions/statistic-active';
import { transformStatisticOptions } from '../../../../src/plots/pie/adaptor';

describe('register interaction', () => {
  it('创建 "pie-statistic" action', () => {
    const action = getActionClass('pie-statistic');
    expect(action).toBe(StatisticAction);
    expect(action.name).toBe('StatisticAction');
  });

  it('注册 "pie-statistic-active" 交互', () => {
    const statisticInteraction = getInteraction('pie-statistic-active');
    expect(statisticInteraction).toBeDefined();
  });

  const pie = new Pie(createDiv(), {
    width: 400,
    height: 300,
    data: [
      { type: 'item1', value: 10 },
      { type: 'item2', value: 13 },
    ],
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.64,
    statistic: {
      title: { formatter: (item) => (item ? item.type : 'Total') },
    },
  });

  pie.render();

  const context = new InteractionContext(pie.chart);
  const action = new StatisticAction(context);

  it('触发 pie-statistic:change', async () => {
    context.event = { type: 'custom', data: { data: { type: 'item3', value: 13 } } };
    const { statistic, annotations } = transformStatisticOptions(pie.options);
    action.change({ statistic, annotations });

    await delay(50);

    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('item3' /** 中心文本指标卡，默认title */);
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe('13');
  });

  it('触发 pie-statistic:reset', async () => {
    action.reset();

    delay(500);
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('Total' /** 中心文本指标卡，默认title */);
  });

  afterAll(() => {
    pie.destroy();
  });
});

describe('G2 内置interactions', () => {
  const pie = new Pie(createDiv(), {
    width: 400,
    height: 300,
    data: [
      { type: 'item1', value: 10 },
      { type: 'item2', value: 13 },
    ],
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.64,
    statistic: {
      title: { formatter: (item) => (item ? item.type : 'Total') },
    },
    interactions: [{ type: 'pie-statistic-active' }],
  });

  pie.render();
  it('交互: element-single-selected', () => {
    pie.update(
      deepMix({}, pie.options, {
        interactions: [{ type: 'element-single-selected' }],
      })
    );

    expect(pie.chart.interactions['element-single-selected']).toBeDefined();
  });

  it('交互: pie-legend-active', () => {
    pie.update(
      deepMix({}, pie.options, {
        label: { content: '{name}: {percentage}' },
        interactions: [{ type: 'pie-legend-active' }],
      })
    );

    expect(pie.chart.interactions['pie-legend-active']).toBeDefined();
  });

  afterAll(() => {
    pie.destroy();
  });
});
