import { Line, LineConfig } from '../../../../src';
import sales from '../../../data/sales.json';
import subsales from '../../../data/subsales.json';

const createDiv = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  return div;
};

describe('Line Mobile', () => {
  const config: LineConfig = {
    forceFit: true,
    data: sales,
    xField: 'area',
    yField: 'sales',
    meta: {
      sales: {
        formatter: (v) => (Number(v) / 1000).toFixed(2) + 'K',
      },
    },
  };

  xit('single series', () => {
    const container = createDiv();
    const plot = new Line(container, { ...config });
    plot.render();
    window.__plot__ = plot;
  });

  it('multiple series', () => {
    const container = createDiv();
    const plot = new Line(container, { ...config, data: subsales, seriesField: 'series' });
    plot.render();
    window.__plot__ = plot;
  });
});
