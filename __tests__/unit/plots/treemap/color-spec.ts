import { Treemap } from '../../../../src';
import { TREEMAP } from '../../../data/treemap';
import { createDiv } from '../../../utils/dom';

const color = ['#D3EEF9', '#945FB9', '#DECFEA', '#FF9845', '#FFE0C7', '#1E9493', '#BBDEDE', '#FF99C3', '#FFE0ED'];

const data = {
  name: 'root',
  children: [
    {
      name: '三星',
      brand: 'a',
      children: [
        {
          name: '三星1',
          value: 100,
        },
        {
          name: '三星2',
          value: 50,
        },
      ],
    },
    {
      name: '小米',
      brand: 'b',
      children: [
        {
          name: '小米1',
          children: [
            {
              name: '小米1.2',
              value: 4,
            },
            {
              name: '小米9',
              value: 9,
            },
          ],
        },
        {
          name: '小米2',
          value: 20,
        },
      ],
    },
    {
      name: '华为',
      value: 50,
    },
  ],
};

describe('treemap color', () => {
  let treemapPlot;
  const options = {
    data: TREEMAP,
  };

  beforeAll(() => {
    treemapPlot = new Treemap(createDiv(''), options);
    treemapPlot.render();
  });

  afterAll(() => {
    treemapPlot.destroy();
  });

  it('default', () => {
    treemapPlot.render();

    const geometry = treemapPlot.chart.geometries[0];

    // @ts-ignore
    expect(geometry.attributeOption.color.fields).toEqual(['name']);
  });

  it('color panel', () => {
    treemapPlot.update({
      color,
    });

    const geometry = treemapPlot.chart.geometries[0];

    // @ts-ignore
    expect(geometry.attributeOption.color.fields).toEqual(['name']);
    expect(geometry.attributeOption.color.values).toEqual(color);
  });

  it('color function', () => {
    treemapPlot.update({
      color: (v) => {
        return v.name === '分类 1' ? '#f00' : '#0f0';
      },
    });

    const elements = treemapPlot.chart.geometries[0].elements;
    expect(elements[1].model.color).toBe('#f00');
    expect(elements[5].model.color).toBe('#0f0');
  });

  it('color rawFields', () => {
    treemapPlot.update({
      rawFields: ['value', 'ext'],
      color: (v) => {
        return v.ext ? '#f00' : '#0f0';
      },
    });

    const elements = treemapPlot.chart.geometries[0].elements;
    expect(elements[1].model.color).toBe('#f00');
    expect(elements[5].model.color).toBe('#f00');
  });

  it('multi nest treemap', () => {
    treemapPlot.update({
      data: data,
      colorField: 'brand',
      color,
    });

    const elements = treemapPlot.chart.geometries[0].elements;

    const expectColorMap = {
      三星: color[0],
      小米: color[1],
      华为: undefined,
    };

    elements.forEach((element) => {
      const expectColorKey = Object.keys(expectColorMap).find((key) => element.data.name.indexOf(key) > -1);
      expect(element.model.color).toBe(expectColorMap[expectColorKey]);
    });
  });
});
