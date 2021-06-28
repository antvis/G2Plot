import { Scatter } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2651', () => {
  it('scatter with 1 record, and x is cat', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      autoFit: false,
      data: [
        {
          x: 'x',
          y: 10,
          radiusField: 10,
          colorField: 'D',
          shapeField: 'C',
        },
        // {
        //   x: 'y',
        //   y: 20,
        //   radiusField: 10,
        //   colorField: 'D',
        //   shapeField: 'C'
        // },
      ],
      xField: 'x',
      yField: 'y',
    });
    scatter.render();

    expect(scatter.chart.getScaleByField('x').min).toEqual(0);
    expect(scatter.chart.getScaleByField('x').max).toEqual(1);
    expect(scatter.chart.getScaleByField('x').range).toEqual([0.5, 1]);
  });
});
