import { Pie } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2096', () => {
  const pie = new Pie(createDiv(), {
    data: [
      { type: '1', value: 10 },
      { type: '13', value: 10 },
      { type: '55', value: 10 },
    ],
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
  });

  it('normal', () => {
    pie.render();
    expect(pie.chart.interactions.tooltip).toBeDefined();
  });

  it('开启中心文本交互时，默认关闭 tooltip', () => {
    pie.update({
      innerRadius: 0.64,
      statistic: {},
      interactions: [{ type: 'pie-statistic-active' }],
    });

    expect(pie.chart.interactions.tooltip).not.toBeDefined();
  });

  it('开启中心文本交互时，需要显式注册 tooltip 交互来开启 tooltip', () => {
    pie.update({
      interactions: [{ type: 'pie-statistic-active' }, { type: 'tooltip' }],
    });
    expect(pie.chart.interactions.tooltip).toBeDefined();
  });

  afterAll(() => {
    pie.destroy();
  });
});
