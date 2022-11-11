import { RadialBar } from '../../../../src';
import { antvStar } from '../../../data/antv-star';
import { createDiv } from '../../../utils/dom';

const xField = 'name';
const yField = 'star';

describe('radial-bar style', () => {
  it('bar styles', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      barStyle: {
        fill: 'red',
        fillOpacity: 0.6,
        cursor: 'pointer',
      },
    });
    bar.render();
    const geometry = bar.chart.geometries[0];
    expect(geometry.elements[0].getModel().style).toMatchObject({
      fill: 'red',
      fillOpacity: 0.6,
      cursor: 'pointer',
    });

    bar.destroy();
  });
});
