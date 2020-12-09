import { Pie } from '../../src';
import { createDiv } from '.././utils/dom';

describe('donut plot', () => {
  test('statistic content formatter', async () => {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其它',
        value: 5,
      },
    ];

    const donutPlot = new Pie(createDiv(), {
      width: 400,
      height: 400,
      radius: 1,
      innerRadius: 0.3,
      padding: [0, 0, 0, 0],
      data,
      angleField: 'value',
      colorField: 'type',
      interactions: [{ type: 'element-active' }, { type: 'pie-statistic-active' }],
      statistic: null,
      animation: false,
    });

    donutPlot.render();
    function getAnnotations(chart) {
      return chart.getComponents().filter((co) => co.type === 'annotation');
    }

    donutPlot.update({ statistic: {} });

    let annotations = getAnnotations(donutPlot.chart);
    expect(annotations.length).toBeGreaterThan(0);
    let htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('总计' /** 中心文本指标卡，默认title */);

    donutPlot.update({ statistic: { title: { formatter: () => 'test' }, content: false } });

    annotations = getAnnotations(donutPlot.chart);
    expect(annotations.length).toBe(1);
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('test' /** 中心文本指标卡，默认title */);

    donutPlot.destroy();
  });
});
