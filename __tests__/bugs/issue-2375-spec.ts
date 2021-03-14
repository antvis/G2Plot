import { Pie } from '../../src';
import { createDiv } from '.././utils/dom';
import { simulateMouseEvent } from '.././utils/event';

describe('#2375', () => {
  test('statistic-active, not use customHtml', async () => {
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

    const plot = new Pie(createDiv(), {
      width: 400,
      height: 400,
      radius: 1,
      innerRadius: 0.3,
      padding: [0, 0, 0, 0],
      data,
      angleField: 'value',
      colorField: 'type',
      interactions: [{ type: 'element-active' }, { type: 'pie-statistic-active' }],
      statistic: {
        title: false,
        content: {
          customHtml: () => 'xxx',
        },
      },
      animation: false,
    });

    plot.render();
    function getAnnotations(chart) {
      return chart.getComponents().filter((co) => co.type === 'annotation');
    }

    const annotations = getAnnotations(plot.chart);
    expect(annotations.length).toBe(1);

    let htmlAnnotations = plot.container.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('xxx');

    simulateMouseEvent(plot.chart.geometries[0].elements[0].shape, 'mouseenter', {});
    htmlAnnotations = plot.container.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('xxx');

    plot.destroy();
  });
});
