import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('DualAxes dualline', () => {
  it('Doubal Line', () => {
    const dualAxes = new DualAxes(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'line',
          connectNulls: false,
          smooth: true,
        },
        {
          geometry: 'column',
          columnWidthRatio: 0.5,
        },
      ],
    });

    dualAxes.render();

    // line
    const lineGeometry = dualAxes.chart.views[1].geometries.find((g) => g.type === 'line');

    const columnGeometry = dualAxes.chart.views[0].geometries.find((g) => g.type === 'interval');

    // @ts-ignore
    expect(lineGeometry.connectNulls).toBe(false);
    expect(lineGeometry.attributes.shape.values).toEqual(['smooth']);

    expect(columnGeometry.shapeType).toBe('interval');
  });
});
