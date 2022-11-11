import { RadialBar } from '../../../../src';
import { antvStar } from '../../../data/antv-star';
import { createDiv } from '../../../utils/dom';

const xField = 'name';
const yField = 'star';

describe('radial-bar label', () => {
  it('bar label', () => {
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
      label: {},
    });
    bar.render();

    // @ts-ignore
    expect(bar.chart.geometries[0].labelOption.cfg.type).toBe('polar');

    bar.update({ label: false });
    expect(bar.chart.geometries[0].labelOption).toBe(false);
    bar.destroy();
  });
});
