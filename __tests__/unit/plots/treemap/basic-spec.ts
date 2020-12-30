import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { TREEMAP } from '../../../data/treemap';

const color = [
  '#5B8FF9',
  '#CDDDFD',
  '#5AD8A6',
  '#CDF3E4',
  '#5D7092',
  '#CED4DE',
  '#F6BD16',
  '#FCEBB9',
  '#6F5EF9',
  '#D3CEFD',
  '#6DC8EC',
  '#D3EEF9',
  '#945FB9',
  '#DECFEA',
  '#FF9845',
  '#FFE0C7',
  '#1E9493',
  '#BBDEDE',
  '#FF99C3',
  '#FFE0ED',
];

describe('treemap basic', () => {
  it('basic treemap', () => {
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
      color,
    });

    treemapPlot.render();

    const geometry = treemapPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');

    // label
    // @ts-ignore
    expect(geometry.attributeOption.color.fields).toEqual(['name']);

    // @ts-ignore
    expect(geometry.attributeOption.color.values).toEqual(color);

    // label
    // @ts-ignore
    expect(geometry.labelOption.fields).toEqual(['name']);

    // position
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);

    // @ts-ignore
    // expect(treemapPlot.chart.getController('axis').option).toBeFalsy();

    treemapPlot.destroy();
  });
});
