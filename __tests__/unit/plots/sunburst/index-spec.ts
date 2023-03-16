import { G2, Sunburst } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/sunburst/constant';
import { SIMPLE_SUNBURST_DATA } from '../../../data/sunburst';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

describe('sunburst', () => {
  const div = createDiv();
  const plot = new Sunburst(div, {
    data: SIMPLE_SUNBURST_DATA,
  });
  plot.render();

  it('default', () => {
    expect(plot.type).toBe('sunburst');
    // @ts-ignore
    expect(plot.getDefaultOptions()).toBe(Sunburst.getDefaultOptions());

    const geometry = plot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');

    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
  });

  it('color', () => {
    plot.update({ color: ['red', 'green', 'blue'] });

    const geometry = plot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements.length).toBe(plot.chart.getData().length);

    // 绘图数据
    expect(elements[0].getModel().color).toBe('red');
    expect(elements[1].getModel().color).toBe('red');
    expect(elements[7].getModel().color).toBe('green');
    expect(elements[13].getModel().color).toBe('blue');
  });

  it('style', () => {
    plot.update({ sunburstStyle: { fill: 'red', fillOpacity: 1 } });

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
      sunburstStyle: ({ depth, height }) => ({
        fill: 'red',
        fillOpacity: depth > 1 ? 1 : 0.5,
        stroke: 'green',
        lineWidth: height,
      }),
    });
    elements = plot.chart.geometries[0].elements;
    // 绘图数据
    expect(elements[0].shape.attr('fillOpacity')).toBe(0.5);
    expect(elements[0].shape.attr('stroke')).toBe('green');
    expect(elements[0].shape.attr('lineWidth')).toBe(1);
    expect(elements[1].shape.attr('lineWidth')).toBe(0);
    expect(elements[1].shape.attr('fillOpacity')).toBe(1);
    expect(elements[7].shape.attr('fillOpacity')).toBe(0.5);
    expect(elements[13].shape.attr('fillOpacity')).toBe(0.5);
    expect(elements[14].shape.attr('fillOpacity')).toBe(1);
  });

  it('label', async () => {
    let geometry = plot.chart.geometries[0];
    expect(geometry.labelOption).toBe(false);

    plot.update({ label: {} });
    await delay(0);
    let labelGroup = plot.chart.geometries[0].labelsContainer.getChildren()[0];
    expect(typeof plot.chart.geometries[0].labelOption).toBe('object');
    // @ts-ignore
    expect(labelGroup.getChildByIndex(0).attr('text')).toBe(plot.chart.getData()[0].name);

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
  });

  it('coordinate', () => {
    plot.update({ radius: 1, innerRadius: 0.4 });
    const geometry = plot.chart.geometries[0];
    const { coordinate } = geometry;
    expect(coordinate.innerRadius).toBe(0.4);
    expect(coordinate.radius).toBe(1);
  });

  it('active-depth', () => {
    plot.update({ hierarchyConfig: { activeDepth: 1 } });
    expect(plot.chart.geometries[0].elements.length).toBe(SIMPLE_SUNBURST_DATA.children.length);
  });

  it('custom shape', () => {
    let customInfo: any = null;
    G2.registerShape('polygon', 'my-custom-polygon', {
      draw(shapeInfo, container) {
        // 存起来用于单测
        customInfo = shapeInfo.customInfo;
        return container.addShape('circle', {
          attrs: {
            x: 100,
            y: 100,
            r: 4,
          },
        });
      },
    });

    plot.update({
      shape: 'my-custom-polygon',
      customInfo: {
        test: 'hello',
      },
    });

    // @ts-ignore shapeType 是私有属性
    expect(plot.chart.geometries[0].elements[0].shapeType).toBe('my-custom-polygon');
    expect(customInfo).toEqual({ test: 'hello' });
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Sunburst.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });

  afterAll(() => {
    plot.destroy();
  });
});
