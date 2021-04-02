import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('DualAxes data', () => {
  it('data', () => {
    const yField = ['pv', 'uv'];
    const dualAxes = new DualAxes(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      geometryOptions: [
        {
          geometry: 'line',
          point: {},
        },
        {
          geometry: 'column',
        },
      ],
      xField: 'date',
      yField,
    });

    dualAxes.render();

    dualAxes.setState('selected', (data: any) => data.date === '0601');

    expect(dualAxes.getStates().length).toBe(2);
    expect(dualAxes.chart.views[0].geometries[0].elements[0].getStates()).toEqual(['selected']);
    expect(dualAxes.chart.views[1].geometries[1].elements[0].getStates()).toEqual(['selected']);

    // 关闭 state
    dualAxes.setState('selected', (data: any) => data.date === '0601', false);
    expect(dualAxes.getStates().length).toBe(0);
    expect(dualAxes.chart.views[0].geometries[0].elements[0].getStates().length).toEqual(0);
    expect(dualAxes.chart.views[1].geometries[1].elements[0].getStates().length).toEqual(0);

    dualAxes.destroy();
  });
});
