import { deepMix } from '@antv/util';
import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose label', () => {
  const options = {
    width: 400,
    height: 300,
    data: salesByArea,
    xField: 'area',
    yField: 'sales',
  };

  it('false', () => {
    const rose = new Rose(
      createDiv('false'),
      deepMix({}, options, {
        legend: false,
      })
    );

    rose.render();
    const legendController = rose.chart.getController('legend');
    // @ts-ignore
    const { option } = legendController;
    expect(option).toBe(false);

    rose.destroy();
  });
});
