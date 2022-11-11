import { Treemap } from '../../../../src';
import { TREEMAP } from '../../../data/treemap';
import { createDiv } from '../../../utils/dom';

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

    // changeData
    treemapPlot.changeData({
      name: 'root',
      children: [
        { name: '分类 1', value: 500, ext: '自定义数据' },
        { name: '分类 2', value: 800, ext: '自定义数据' },
        { name: '分类 3', value: 150, ext: '自定义数据' },
      ],
    });

    expect(treemapPlot.chart.geometries[0].elements.length).toBe(3);
    expect(treemapPlot.chart.getOptions().data.length).toBe(3);

    // @ts-ignore
    // expect(treemapPlot.chart.getController('axis').option).toBeFalsy();

    treemapPlot.destroy();
  });
});
