import { groupBy, size } from '@antv/util';
import { Facet } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { simulateMouseEvent } from '../../../utils/event';

describe('facet', () => {
  const data = [
    { type: '1', date: '2014-01', value: 1, name: 'a' },
    { type: '1', date: '2015-01', value: 1, name: 'b' },
    { type: '1', date: '2016-01', value: 1, name: 'c' },
    { type: '1', date: '2017-01', value: 1, name: 'd' },
    { type: '2', date: '2014-01', value: 1, name: 'a' },
    { type: '2', date: '2015-01', value: 1, name: 'b' },
    { type: '2', date: '2016-01', value: 1, name: 'a' },
    { type: '2', date: '2017-01', value: 1, name: 'd' },
    { type: '3', date: '2014-01', value: 1, name: 'b' },
    { type: '4', date: '2015-01', value: 1, name: 'd' },
    { type: '4', date: '2016-01', value: 10, name: 'b' },
    { type: '4', date: '2017-01', value: 1, name: 'c' },
  ];
  const plot = new Facet(createDiv(), {
    data,
    type: 'rect',
    fields: ['type'],
    eachView: (__, facet) => {
      return {
        type: 'column',
        options: {
          data: facet.data,
          xField: 'date',
          yField: 'value',
          seriesField: 'name',
          color: ['red', 'green', 'yellow', 'blue'],
          animation: false,
        },
      };
    },
    showTitle: false,
    meta: { date: { sync: true } },
    animation: false,
  });
  plot.render();

  it('default', () => {
    expect(plot.chart.views.length).toBe(size(groupBy(data, 'type')));

    const [view0, view1, view2, view3] = plot.chart.views;

    // 同步 facet 顶层设置的主题
    expect(view0.geometries[0].getAttribute('color').values.slice(0, 4)).toEqual(['red', 'green', 'yellow', 'blue']);
    expect(view1.geometries[0].getAttribute('color').values).toEqual(['red', 'green', 'yellow', 'blue']);
    expect(view2.geometries[0].getAttribute('color').values).toEqual(['red', 'green', 'yellow', 'blue']);
    expect(view3.geometries[0].elements[0].getModel().color).toBe('red');

    expect(view0.geometries[0].elements[0].getModel().color).toBe(view3.geometries[0].elements[0].getModel().color);
  });

  it('sync colorField, make colorField mapping between facets', () => {
    plot.update({ meta: { name: { sync: true } } });

    const [view0, view1, view2, view3] = plot.chart.views;
    expect(view0.geometries[0].elements[0].getModel().color).toBe('red');
    expect(view1.geometries[0].elements[0].getModel().color).toBe('red');
    expect(view2.geometries[0].elements[0].getModel().color).toBe('green');
    expect(view3.geometries[0].elements[0].getModel().color).toBe('blue');
  });

  it('meta, 支持顶层配置和单独配置', () => {
    plot.update({
      meta: { name: { sync: true, values: ['d', 'c', 'b', 'a'] } },
    });

    const [view0, , view2, view3] = plot.chart.views;
    expect(view0.geometries[0].elements[0].getModel().color).toBe('red');
    const data0 = view0.geometries[0].elements[0].getModel().data as any;
    const data1 = view0.geometries[0].elements[1].getModel().data as any;
    const data2 = view0.geometries[0].elements[2].getModel().data as any;
    const data3 = view0.geometries[0].elements[3].getModel().data as any;
    expect(data0.name).toBe('d');
    expect(data1.name).toBe('c');
    expect(data2.name).toBe('b');
    expect(data3.name).toBe('a');
    expect(view2.geometries[0].elements[0].getModel().color).toBe('yellow');
    expect(view3.geometries[0].elements[0].getModel().color).toBe('red');

    const view1data0 = plot.chart.views[1].geometries[0].elements[0].getModel().data as any;
    const view3data0 = plot.chart.views[3].geometries[0].elements[0].getModel().data as any;
    expect(view1data0.name).toBe(view3data0.name);

    plot.update({
      eachView: (__, facet) => {
        const { columnIndex } = facet;
        return {
          type: 'column',
          options: {
            meta: { name: columnIndex === 3 ? { sync: false } : {} },
            data: facet.data,
            xField: 'date',
            yField: 'value',
            seriesField: 'name',
            color: ['red', 'green', 'yellow', 'blue'],
          },
        };
      },
    });
    expect(plot.chart.views[1].geometries[0].elements[0].getModel().color).toBe('blue');
    const view1data = plot.chart.views[1].geometries[0].elements[0].getModel().data as any;
    const view3data = plot.chart.views[3].geometries[0].elements[0].getModel().data as any;
    // 设置 scale 不同步之后，第一条数据就相等了
    expect(view1data.name).not.toBe(view3data.name);
  });

  it('axes', () => {
    plot.update({
      eachView: (__, facet) => {
        const { columnIndex } = facet;

        return {
          type: 'column',
          options: {
            meta: { name: columnIndex === 3 ? { sync: false } : {} },
            data: facet.data,
            xField: 'date',
            yField: 'value',
            seriesField: 'name',
            color: ['red', 'green', 'yellow', 'blue'],
            xAxis: columnIndex === 0 ? false : {},
            yAxis: columnIndex === 0 ? false : {},
            animation: false,
          },
        };
      },
    });

    expect(plot.chart.views[0].getController('axis').getComponents().length).toBe(0);
    expect(plot.chart.views[1].getController('axis').getComponents().length).not.toBe(0);
  });

  it('tooltip, 支持顶层配置和单独配置 (顶层配置优先级 < 单独设置)', () => {
    expect(plot.chart.views[0].getController('tooltip')).toBeDefined();
    expect(plot.chart.interactions['tooltip']).not.toBeUndefined();

    plot.update({ tooltip: false });
    expect(plot.chart.interactions['tooltip']).toBeUndefined();

    plot.update({ tooltip: {} });
    expect(plot.chart.interactions['tooltip']).not.toBeUndefined();

    plot.update({
      eachView: (__, facet) => {
        const { columnIndex } = facet;
        return {
          type: 'column',
          options: {
            meta: { name: columnIndex === 3 ? { sync: false } : {} },
            data: facet.data,
            xField: 'date',
            yField: 'value',
            seriesField: 'name',
            color: ['red', 'green', 'yellow', 'blue'],
            tooltip: columnIndex === 0 ? false : {},
            animation: false,
          },
        };
      },
    });

    expect(plot.chart.views[0].interactions['tooltip']).toBeUndefined();
    expect(plot.chart.views[1].interactions['tooltip']).not.toBeUndefined();
  });

  it('interaction, 支持顶层配置和单独配置 (💡 顶层配置优先级 > 单独设置)', () => {
    plot.update({ interactions: [{ type: 'tooltip', enable: false }] });
    expect(plot.chart.interactions['tooltip']).toBeUndefined();

    plot.update({ interactions: [{ type: 'element-active' }] });
    expect(plot.chart.interactions['element-active']).toBeDefined();
    expect(plot.chart.views[0].interactions['element-active']).not.toBeDefined();
    expect(plot.chart.views[1].interactions['element-active']).not.toBeDefined();

    const element = plot.chart.views[0].geometries[0].elements[0];
    const element10 = plot.chart.views[1].geometries[0].elements[0];

    let element1 = plot.chart.views[0].geometries[0].elements[1];
    simulateMouseEvent(element.shape, 'mouseenter');
    simulateMouseEvent(element10.shape, 'mouseenter');
    expect(element.shape.attr('stroke')).toBe('#000');
    expect(element10.shape.attr('stroke')).toBe('#000');
    expect(element1.shape.attr('stroke')).not.toBe('#000');

    plot.update({
      eachView: (__, facet) => {
        return {
          type: 'column',
          options: {
            data: facet.data,
            xField: 'date',
            yField: 'value',
            seriesField: 'name',
            color: ['red', 'green', 'yellow', 'blue'],
            interactions: [{ type: 'element-active', enable: false }],
            animation: false,
          },
        };
      },
    });
    element1 = plot.chart.views[0].geometries[0].elements[1];
    simulateMouseEvent(element1.shape, 'mouseenter');
    expect(element1.shape.attr('stroke')).toBe('#000');

    plot.update({ interactions: [{ type: 'element-active', enable: false }] });
    element1 = plot.chart.views[0].geometries[0].elements[1];
    simulateMouseEvent(element1.shape, 'mouseenter');
    expect(element1.shape.attr('stroke')).not.toBe('#000');

    // views[0] 设置 element-active 交互
    plot.update({
      eachView: (__, facet) => {
        return {
          type: 'column',
          options: {
            data: facet.data,
            xField: 'date',
            yField: 'value',
            seriesField: 'name',
            color: ['red', 'green', 'yellow', 'blue'],
            interactions: facet.columnIndex === 0 ? [{ type: 'element-active' }] : [],
            animation: false,
          },
        };
      },
    });
    const view1Element = plot.chart.views[0].geometries[0].elements[0];
    const view2Element = plot.chart.views[1].geometries[0].elements[0];
    simulateMouseEvent(view1Element.shape, 'mouseenter');
    simulateMouseEvent(view2Element.shape, 'mouseenter');
    expect(view1Element.shape.attr('stroke')).toBe('#000');
    expect(view2Element.shape.attr('stroke')).not.toBe('#000');
  });

  it('animation, 支持单独配置 & 暂不支持顶层配置', () => {
    plot.update({
      eachView: (__, facet) => {
        return {
          type: 'column',
          options: {
            data: facet.data,
            xField: 'date',
            yField: 'value',
            seriesField: 'name',
            animation: facet.columnIndex === 0 ? {} : false,
          },
        };
      },
    });
    // @ts-ignore
    expect(plot.chart.views[0].options.animate).toBe(true);
    // @ts-ignore
    expect(plot.chart.views[1].options.animate).toBe(false);
  });

  it('label, 支持单独配置 & 不支持顶层配置', () => {
    plot.update({
      eachView: (__, facet) => {
        return {
          type: 'column',
          options: {
            data: facet.data,
            xField: 'date',
            yField: 'value',
            seriesField: 'name',
            label: facet.columnIndex === 0 ? {} : false,
          },
        };
      },
    });
    expect(plot.chart.views[0].geometries[0].labelsContainer.getChildren().length).toBeGreaterThan(0);
    expect(plot.chart.views[1].geometries[0].labelsContainer.getChildren().length).toBe(0);
  });

  it('annotations, 支持顶层配置和单独配置', () => {
    plot.update({ showTitle: false });
    expect(plot.chart.getController('annotation').getComponents().length).toBe(0);
    expect(plot.chart.views[0].getController('annotation').getComponents().length).toBe(0);

    const annotation: any = { type: 'text', position: ['50%', '50%'], content: 'xx' };
    const annotation1: any = { type: 'text', position: ['10%', '10%'], content: 'xsx' };
    plot.update({ annotations: [annotation] });
    expect(plot.chart.getController('annotation').getComponents().length).toBe(1);

    plot.update({
      eachView: (__, facet) => {
        return {
          type: 'column',
          options: {
            data: facet.data,
            xField: 'date',
            yField: 'value',
            seriesField: 'name',
            annotations: facet.columnIndex === 0 ? [annotation, annotation1] : [annotation],
          },
        };
      },
    });

    expect(plot.chart.views[0].getController('annotation').getComponents().length).toBe(2);
    expect(plot.chart.views[1].getController('annotation').getComponents().length).toBe(1);

    plot.update({ annotations: [] });
    expect(plot.chart.views[0].getController('annotation').getComponents().length).toBe(2);
    expect(plot.chart.views[1].getController('annotation').getComponents().length).toBe(1);
    expect(plot.chart.getController('annotation').getComponents().length).toBe(0);

    plot.update({ showTitle: true });
    // facet title 也是一个 annotation
    expect(plot.chart.views[0].getController('annotation').getComponents().length).toBe(3);
    expect(plot.chart.views[1].getController('annotation').getComponents().length).toBe(2);
  });

  it('legend, 顶层设置', () => {
    // @ts-ignore
    expect(plot.chart.getController('legend').getComponents()[0].component.getItems().length).toBe(
      size(groupBy(data, 'name'))
    );
    plot.update({ legend: false });
    expect(plot.chart.getController('legend').getComponents().length).toBe(0);
  });

  it('theme, 只支持顶层设置', () => {
    plot.update({ theme: 'dark' });
    expect(plot.chart.getTheme().background).toBe('#141414');
  });

  afterAll(() => {
    plot.destroy();
  });
});
