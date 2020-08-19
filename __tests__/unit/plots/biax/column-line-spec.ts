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
          geometry: 'column',
          // @ts-ignore
          interval: {
            widthRatio: 0.5,
          },
        },
      ],
    });

    biax.render();

    // line
    const leftLineGeometrys = biax.chart.views[0].geometries.find((g) => g.type === 'line');

    const rightLineGeometrys = biax.chart.views[1].geometries.find((g) => g.type === 'interval');

    // @ts-ignore
    expect(leftLineGeometrys.connectNulls).toBe(false);
    expect(leftLineGeometrys.attributes.shape.values).toEqual(['smooth']);

    expect(rightLineGeometrys.shapeType).toBe('interval');
  });
});
