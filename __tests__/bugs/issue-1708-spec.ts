import { partySupport } from '../data/party-support';
import { Area } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1708', () => {
  it('area tooltip', () => {
    const area = new Area(createDiv('area tooltip 重复'), {
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      legend: {
        position: 'right-top',
      },
      tooltip: {
        shared: true,
      },
      color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
      line: {
        size: 1,
      },
      point: {},
    });
    area.render();

    let items = [];
    area.on('tooltip:change', (e) => {
      items = e.data.items;
    });

    area.chart.showTooltip({ x: 100, y: 100 });

    // =2，没有重复元素
    expect(items.length).toBe(2);

    area.destroy();
  });
});
