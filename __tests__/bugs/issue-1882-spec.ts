import { Area } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1882', () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  it('limit in Plot', () => {
    const area = new Area(createDiv('limitInPlot'), {
      data,
      height: 500,
      width: 600,
      xField: 'year',
      yField: 'value',
      yAxis: {
        min: 10,
      },
    });

    area.render();

    expect(area.chart.limitInPlot).toBe(false);
    expect(area.chart.middleGroup.get('clipShape')).not.toBeDefined();
    // 大于一个 xAxis 的高度
    expect(area.chart.middleGroup.get('clipShape').getBBox().minY > 5).not.toBe(true);

    area.destroy();
  });
});
