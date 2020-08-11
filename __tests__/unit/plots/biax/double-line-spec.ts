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
      xAxis: false,
      geometryConfigs: [
        {
          geometry: 'Line',
          connectNulls: false,
          smooth: true,
          style: {
            stroke: 'red',
          },
          point: {
            size: 3,
            shape: 'circle',
          },
        },
      ],
    });

    biax.render();

    // line
    // const lineGeometrys = biax.chart.geometries.filter((g) => g.type === 'line');

    // expect(lineGeometrys.length).toBe(2);

    // expect(lineGeometrys[0].attributes.color.values).toEqual(['#180']);
    // expect(lineGeometrys[0].attributes.size.values).toEqual([5]);
    // // @ts-ignore
    // expect(lineGeometrys[0].connectNulls).toBe(false);
    // expect(lineGeometrys[0].attributes.shape.values).toEqual(['smooth']);

    // expect(lineGeometrys[1].attributes.color.values).toEqual(['#e76c5e']);
    // expect(lineGeometrys[1].attributes.size.values).toEqual([2]);
    // // @ts-ignore
    // expect(lineGeometrys[1].connectNulls).toBe(true);
    // expect(lineGeometrys[1].attributes.shape.values).toEqual(['line']);

    // // point
    // const pointGeometrys = biax.chart.geometries.filter((g) => g.type === 'point');
    // expect(pointGeometrys.length).toBe(1);
    // expect(pointGeometrys[0].attributes.size.values).toEqual([3]);
    // expect(pointGeometrys[0].attributes.shape.values).toEqual(['circle']);

    // Biax.destroy();
  });
});
