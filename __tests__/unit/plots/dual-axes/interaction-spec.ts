import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('DualAxes interaction', () => {
  it('interaction', () => {
    const yField = ['pv', 'uv'];
    const option = {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField,
      geometryOptions: [
        {
          geometry: 'line',
        },
        {
          geometry: 'column',
        },
      ],
    };
    const dualAxes = new DualAxes(createDiv(), option);

    dualAxes.render();

    dualAxes.chart.views.forEach((view) => {
      expect(view.interactions['active-region']).toBeDefined();
    });

    dualAxes.update({
      ...option,
      interactions: [
        {
          type: 'element-highlight',
        },
        {
          type: 'active-region',
        },
      ],
    });

    dualAxes.chart.views.forEach((view) => {
      expect(view.interactions['active-region']).toBeDefined();
      expect(view.interactions['element-highlight']).toBeDefined();
    });

    dualAxes.destroy();
  });
});
