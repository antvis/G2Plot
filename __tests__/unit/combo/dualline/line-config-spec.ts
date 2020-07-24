import { DualLine } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('dualline lineConfig', () => {

  it('lineConfig', () => {
    document.body.append('test dualline lineConfig')
    const dualline = new DualLine(createDiv(), {
      width: 400,
      height: 500,
      data: CountryEconomy,
      xField: 'Country',
      yField: ['GDP', 'Population'],
      lineConfigs: [{
        color: '#180',
        lineSize: 5,
        connectNulls: false,
        smooth: true,
        point: {
          visible: true,
          size: 3,
          shape: 'circle',
        },
      }]
    });

    dualline.render();

    // line
    const lineGeometrys = dualline.chart.geometries.filter(g => g.type === 'line');

    expect(lineGeometrys.length).toBe(2);

    expect(lineGeometrys[0].attributes.color.values).toEqual(['#180']);
    expect(lineGeometrys[0].attributes.size.values).toEqual([5]);
    // @ts-ignore
    expect(lineGeometrys[0].connectNulls).toBe(false)
    expect(lineGeometrys[0].attributes.shape.values).toEqual(['smooth']);

    expect(lineGeometrys[1].attributes.color.values).toEqual(['#e76c5e']);
    expect(lineGeometrys[1].attributes.size.values).toEqual([2]);
    // @ts-ignore
    expect(lineGeometrys[1].connectNulls).toBe(true)
    expect(lineGeometrys[1].attributes.shape.values).toEqual(['line']);

    
    // point
    const pointGeometrys = dualline.chart.geometries.filter(g => g.type === 'point');
    expect(pointGeometrys.length).toBe(1);;
    expect(pointGeometrys[0].attributes.size.values).toEqual([3]);
    expect(pointGeometrys[0].attributes.shape.values).toEqual(['circle']);

    dualline.destroy();

  });
});
