import { Line } from '../../src';
import { createDiv } from '../utils/dom';
import { wait } from '../utils/common';
import sales from '../data/sales.json';

describe('#1059', () => {
  const plot = new Line(createDiv(), {
    localRefresh: false,
    title: {
      visible: true,
      text: 'line',
    },
    data: [],
    xField: 'area',
    yField: 'sales',
    point: {
      visible: true,
    },
  });

  plot.render();
  // @ts-ignore
  window.__plot__ = plot;

  it('render', async () => {
    await wait(1000);
    plot.changeData([]);
    await wait(1000);
    plot.changeData(sales);

    // axes check
    const xScale = plot.getXScale();
    expect(xScale.type).toBe('cat');
    expect(xScale.values).toHaveLength(sales.length);
  });
});
