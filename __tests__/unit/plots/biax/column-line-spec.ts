import { Biax } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('Biax dualline', () => {
  it('Doubal Line', () => {
    const biax = new Biax(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryConfigs: [
        {
          geometry: 'line',
          connectNulls: false,
          smooth: true,
        },
        {
          geometry: 'column',
          interval: {
            widthRatio: 0.5,
          },
        },
      ],
    });

    biax.render();

    // line
    const leftLineGeometry = biax.chart.views[0].geometries.find((g) => g.type === 'line');

    const rightLineGeometry = biax.chart.views[1].geometries.find((g) => g.type === 'interval');

    // @ts-ignore
    expect(leftLineGeometry.connectNulls).toBe(false);
    expect(leftLineGeometry.attributes.shape.values).toEqual(['smooth']);

    expect(rightLineGeometry.shapeType).toBe('interval');
  });
});
