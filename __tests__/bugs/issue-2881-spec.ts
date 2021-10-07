import { Funnel } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2651', () => {
  it('funnel render normal when data is null or zero', () => {
    const data = [
      { stage: '简历筛选', number: 10 },
      { stage: '初试人数', number: 8 },
      { stage: '复试人数', number: 7 },
      { stage: '录取人数', number: 6 },
      { stage: '入职人数', number: 5 },
    ];

    const plot = new Funnel(createDiv(), {
      data: data,
      xField: 'stage',
      yField: 'number',
      legend: false,
    });

    plot.render();
    expect(plot.chart.getController('annotation').getComponents().length).toBe(4);

    plot.changeData([
      { stage: '简历筛选', number: 0 },
      { stage: '初试人数', number: 0 },
      { stage: '复试人数', number: 4 },
      { stage: '录取人数', number: 0 },
      { stage: '入职人数', number: 0 },
    ]);
    expect(plot.chart.getController('annotation').getComponents().length).toBe(4);

    plot.changeData([
      { stage: '简历筛选', number: 0 },
      { stage: '初试人数', number: 0 },
      { stage: '复试人数', number: 0 },
      { stage: '录取人数', number: 0 },
      { stage: '入职人数', number: 0 },
    ]);
    expect(plot.chart.getController('annotation').getComponents().length).toBe(0);
  });
});
