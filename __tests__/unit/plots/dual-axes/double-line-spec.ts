import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('DualAxes dualline', () => {
  it('Doubal Line', () => {
    document.body.append('test DualAxes doubal line');

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
          geometry: 'line',
          connectNulls: true,
          smooth: false,
        },
      ],
    });

    dualAxes.render();

    // line
    const leftLineGeometry = dualAxes.chart.views[0].geometries.find((g) => g.type === 'line');

    const rightLineGeometry = dualAxes.chart.views[1].geometries.find((g) => g.type === 'line');

    // @ts-ignore
    expect(leftLineGeometry.connectNulls).toBe(false);
    expect(leftLineGeometry.attributes.shape.values).toEqual(['smooth']);

    // @ts-ignore
    expect(rightLineGeometry.connectNulls).toBe(true);
    expect(rightLineGeometry.attributes.shape.values).toEqual(['line']);
  });
});
