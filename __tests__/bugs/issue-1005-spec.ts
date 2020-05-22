import { PercentStackedBar } from '../../src';
import { createDiv } from '../utils/dom';
import subsales from '../data/subsales.json';

describe('#1005', () => {
  const plot = new PercentStackedBar(createDiv(), {
    data: subsales,
    xField: 'sales',
    yField: 'area',
    stackField: 'series',
    yAxis: {
      title: {
        visible: true,
      },
    },
    meta: {
      area: {
        alias: 'Area Alias',
      },
    },
  });
  plot.render();

  it('alias', () => {
    const view = plot.getView();
    expect(view.getOptions().scales.area.alias).toBe('Area Alias');
  });
});
