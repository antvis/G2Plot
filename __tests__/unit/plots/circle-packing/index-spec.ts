import { CirclePacking } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';
import { DATA } from '../../../data/circle-packing';
import { DEFAULT_OPTIONS } from '../../../../src/plots/circle-packing/constant';

describe('Circle-Packing', () => {
  const div = createDiv();
  const plot = new CirclePacking(div, {
    padding: 0,
    data: DATA,
    hierarchyConfig: {
      sort: (a, b) => b.depth - a.depth,
    },
  });
  plot.render();

  it('default', () => {
    expect(plot.type).toBe('circle-packing');
    // @ts-ignore
    expect(plot.getDefaultOptions()).toBe(CirclePacking.getDefaultOptions());

    const geometry = plot.chart.geometries[0];
    expect(geometry.type).toBe('point');

    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);

    // 圆形布局 宽高一致，即正常
    const coordinateBox = plot.chart.coordinateBBox;
    const { width, height } = plot.chart.viewBBox;
    const minSize = Math.min(width, height);
    expect(coordinateBox.width).toBe(coordinateBox.height);
    expect(minSize).toBe(coordinateBox.width);
    expect(minSize).toBe(coordinateBox.height);
  });

  it('color', () => {
    plot.update({ color: ['red', 'green', 'blue'] });

    const geometry = plot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements.length).toBe(plot.chart.getData().length);

    // 绘图数据
    expect(elements[0].getModel().color).toBe('red');
    expect(elements[1].getModel().color).toBe('green');
    expect(elements[7].getModel().color).toBe('green');
    expect(elements[14].getModel().color).toBe('blue' /** 15 % 3 === 0 */);
  });

  it('style', () => {
    plot.update({ pointStyle: { fill: 'red', fillOpacity: 1 } });

    const geometry = plot.chart.geometries[0];
    let elements = geometry.elements;
    expect(elements.length).toBe(plot.chart.getData().length);

    // 绘图数据
    expect(elements[0].shape.attr('fillOpacity')).toBe(1);
    expect(elements[1].shape.attr('fillOpacity')).toBe(1);
    expect(elements[1].shape.attr('fill')).toBe('red');
    expect(elements[7].shape.attr('fillOpacity')).toBe(1);
    expect(elements[13].shape.attr('fillOpacity')).toBe(1);
    expect(elements[14].shape.attr('fillOpacity')).toBe(1);

    // callback
    plot.update({
      rawFields: ['depth'],
      pointStyle: ({ depth }) => ({
        fill: 'red',
        fillOpacity: depth > 1 ? 1 : 0.5,
        stroke: 'green',
        lineWidth: depth,
      }),
    });
    elements = plot.chart.geometries[0].elements;
    // 绘图数据
    expect(elements[0].shape.attr('fillOpacity')).toBe(0.5);
    expect(elements[0].shape.attr('stroke')).toBe('green');

    expect(elements[0].shape.attr('fillOpacity')).toBe(0.5);
    expect(elements[elements.length - 1].shape.attr('fillOpacity')).toBe(1);

    expect(elements[0].shape.attr('lineWidth')).toBe(0);
    expect(elements[1].shape.attr('lineWidth')).toBe(1);
    expect(elements[elements.length - 1].shape.attr('lineWidth')).toBe(2);
  });

  it('label', async () => {
    let geometry = plot.chart.geometries[0];
    await delay(0);
    let labelGroup = plot.chart.geometries[0].labelsContainer.getChildren()[0];
    expect(typeof plot.chart.geometries[0].labelOption).toBe('object');
    // @ts-ignore
    expect(labelGroup.getChildByIndex(0).attr('text')).toBe(DATA.name);
    // @ts-ignore
    expect(plot.chart.geometries[0].labelsContainer.getChildren()[1].getChildByIndex(0).attr('text')).toBe(
      DATA.children[0].name
    );

    plot.update({ label: { fields: ['value'] } });
    await delay(0);
    labelGroup = plot.chart.geometries[0].labelsContainer.getChildren()[0];
    const filterData = plot.chart.getData();
    // @ts-ignore
    expect(labelGroup.getChildByIndex(0).attr('text')).toBe(`${filterData[0].value}`);

    // meta
    plot.update({ meta: { value: { formatter: (v) => v + '%' } } });
    await delay(0);
    labelGroup = plot.chart.geometries[0].labelsContainer.getChildren()[0];
    // @ts-ignore
    expect(labelGroup.getChildByIndex(0).attr('text')).toBe(`${filterData[0].value}%`);

    // formatter
    plot.update({ label: { formatter: () => 'xxx' } });
    await delay(0);
    geometry = plot.chart.geometries[0];
    // @ts-ignore
    expect(geometry.labelsContainer.getChildren()[0].getChildByIndex(0).attr('text')).toBe('xxx');

    // 关闭
    plot.update({ label: false });
    expect(plot.chart.geometries[0].labelOption).toBe(false);
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(CirclePacking.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });

  afterAll(() => {
    plot.destroy();
  });
});
