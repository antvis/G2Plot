import { Biax } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('Biax dualline', () => {
  it('Doubal Line', () => {
    document.body.append('test Biax doubal line');

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
          geometry: 'line',
          connectNulls: true,
          smooth: false,
        },
      ],
    });

    biax.render();

    // line
    const leftLineGeometry = biax.chart.views[0].geometries.find((g) => g.type === 'line');

    const rightLineGeometry = biax.chart.views[1].geometries.find((g) => g.type === 'line');

    // @ts-ignore
    expect(leftLineGeometry.connectNulls).toBe(false);
    expect(leftLineGeometry.attributes.shape.values).toEqual(['smooth']);

    // @ts-ignore
    expect(rightLineGeometry.connectNulls).toBe(true);
    expect(rightLineGeometry.attributes.shape.values).toEqual(['line']);
  });
});
