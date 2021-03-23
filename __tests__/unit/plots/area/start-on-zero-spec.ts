import { Area } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('start on zero', () => {
    const data = [
      { date: '19/05/2006', type: 'FF', value: 3600 },
      { date: '19/06/2006', type: 'FG', value: 2500 },
      { date: '19/07/2006', type: 'Lab', value: -2000 },
      { date: '19/08/2006', type: 'SF', value: 800 },
      { date: '19/09/2006', type: 'Ind/Oth', value: 1700 },
    ];
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'date',
      yField: 'value',
      startOnZero: false,
      isStack: false,
    });

    area.render();
    const geometry = area.chart.geometries[0];
    // @ts-ignore
    expect(geometry.startOnZero).toBeFalsy();
    expect(area.chart.getScaleByField('value').min).toBe(-2000);
    area.update({
      startOnZero: true,
    });
    // @ts-ignore
    expect(area.chart.geometries[0].startOnZero).toBeTruthy();
    area.destroy();
  });
});
