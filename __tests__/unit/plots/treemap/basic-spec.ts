import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';

const data = {
  name: 'root',
  children: [
    { name: '分类 1', value: 560 },
    { name: '分类 2', value: 500 },
    { name: '分类 3', value: 150 },
    { name: '分类 4', value: 140 },
    { name: '分类 5', value: 115 },
    { name: '分类 6', value: 95 },
    { name: '分类 7', value: 90 },
    { name: '分类 8', value: 75 },
    { name: '分类 9', value: 98 },
    { name: '分类 10', value: 60 },
    { name: '分类 11', value: 45 },
    { name: '分类 12', value: 40 },
    { name: '分类 13', value: 40 },
    { name: '分类 14', value: 35 },
    { name: '分类 15', value: 40 },
    { name: '分类 16', value: 40 },
    { name: '分类 17', value: 40 },
    { name: '分类 18', value: 30 },
    { name: '分类 19', value: 28 },
    { name: '分类 20', value: 16 },
  ],
};

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

describe('treemap', () => {
  it('basic treemap', () => {
    const treemapPlot = new Treemap(createDiv(), {
      data,
      colorField: 'name',
      seriesField: 'value',
      color,
    });

    treemapPlot.render();

    const geometry = treemapPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');
    // @ts-ignore
    expect(geometry.attributeOption.color.fields).toEqual(['name']);
    // @ts-ignore
    expect(geometry.attributeOption.color.values).toEqual(color);
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);

    // @ts-ignore
    expect(treemapPlot.chart.getController('axis').option).toBeFalsy();

    treemapPlot.destroy();
  });
});
