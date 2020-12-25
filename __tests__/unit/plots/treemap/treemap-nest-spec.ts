import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { TREEMAP_CHILDREN } from '../../../data/treemap-nest';

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
];

describe('treemap', () => {
  it('basic treemap', () => {
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP_CHILDREN,
      colorField: 'brand',
      seriesField: 'value',
      color,
      label: {
        fields: ['name'],
      },
    });

    treemapPlot.render();

    const geometry = treemapPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');

    // @ts-ignore
    expect(geometry.attributeOption.color.fields).toEqual(['brand']);
    // @ts-ignore
    expect(geometry.attributeOption.color.values).toEqual(color);
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);

    // @ts-ignore
    expect(treemapPlot.chart.getController('axis').option).toBeFalsy();
    // @ts-ignore
    expect(geometry.labelOption.cfg.layout.type).toBe('limit-in-shape');

    treemapPlot.destroy();
  });
});
