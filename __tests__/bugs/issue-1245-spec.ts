import { Pie } from '../../src';
import { createDiv } from '.././utils/dom';
import { delay } from '.././utils/delay';

describe('donut plot', () => {
  test('angleField & colorField 配置交换, 不会触发 out-of-memory, 但是坐标为 NaN', () => {
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
      width: 640,
      height: 400,
      radius: 0.8,
      innerRadius: 0.64,
      padding: 'auto',
      data,
      angleField: 'type',
      colorField: 'value',
    });

    donutPlot.render();

    expect(donutPlot).toBeDefined();
    expect(donutPlot.chart.geometries[0].elements.length).toBe(0);
  });

  test('value 数据出现字母或其他不合法情况，不会触发 out-of-memory', () => {
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
        value: '11a',
      },
    ];

    const piePlot = new Pie(createDiv(), {
      width: 640,
      height: 400,
      radius: 0.8,
      padding: 'auto',
      data,
      angleField: 'value',
      colorField: 'type',
    });

    piePlot.render();
    expect(piePlot).toBeDefined();
    expect(piePlot.chart.geometries[0].elements.length).toBe(data.length - 1);

    delay(3000).then(() => {
      piePlot.update({
        ...piePlot.options,
        data: data.map((d, idx) => (idx !== 0 ? { ...d, value: null } : d)),
      });
      expect(piePlot.chart.geometries[0].elements.length).toBe(data.length);
    });
  });
});
