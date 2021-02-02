import { Chart } from '@antv/g2';
import { getAdaptor } from '../../../../src/plots/multi-view/utils';
import { PieOptions } from '../../../../src/plots/pie/types';
import { LineOptions } from '../../../../src/plots/line/types';
import { createDiv } from '../../../utils/dom';

describe('utils', () => {
  it('get-adaptor: normal line', () => {
    const lineAdaptor = getAdaptor<LineOptions>('line');

    const chart = new Chart({ container: createDiv(), width: 200, height: 400 });
    lineAdaptor({
      chart,
      options: {
        data: [
          { x: '1', y: 2 },
          { x: '2', y: 1 },
        ],
        xField: 'x',
        yField: 'y',
        point: {},
      },
    });

    chart.render();

    expect(chart.geometries.length).toBe(2);
    expect(chart.geometries[0].elements.length).toBe(1);
    expect(chart.geometries[1].elements.length).toBe(2);
  });

  it('get-adaptor: normal pie', () => {
    const pieAdaptor = getAdaptor<PieOptions>('pie');

    const chart = new Chart({ container: createDiv(), width: 200, height: 400 });
    pieAdaptor({
      chart,
      options: {
        data: [
          { x: '1', y: 2 },
          { x: '2', y: 1 },
        ],
        angleField: 'y',
        colorField: 'x',
      },
    });

    chart.render();

    expect(chart.geometries.length).toBe(1);
    expect(chart.geometries[0].elements.length).toBe(2);
    expect(chart.getCoordinate().isPolar).toBe(true);
  });

  it('get-adaptor: innoraml', () => {
    const adaptor = getAdaptor('xxx');
    expect(adaptor).toBe(null);
  });
});
