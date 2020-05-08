import { Heatmap } from '../../../../src';
import { clone } from '@antv/util';

describe('matrix plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [
    { name: 'hot dog', value: 70, country: 'AD' },
    { name: 'burger', value: 54, country: 'AD' },
    { name: 'sandwich', value: 49, country: 'AD' },
    { name: 'kebab', value: 4, country: 'AD' },
    { name: 'fries', value: 11, country: 'AD' },
    { name: 'donut', value: 68, country: 'AD' },
    { name: 'junk', value: 49, country: 'AD' },
    { name: 'sushi', value: 47, country: 'AD' },
    { name: 'ramen', value: 64, country: 'AD' },
    { name: 'curry', value: 51, country: 'AD' },
    { name: 'udon', value: 6, country: 'AD' },
    { name: 'hot dog', value: 45, country: 'AE' },
    { name: 'burger', value: 97, country: 'AE' },
    { name: 'sandwich', value: 69, country: 'AE' },
    { name: 'kebab', value: 68, country: 'AE' },
    { name: 'fries', value: 14, country: 'AE' },
    { name: 'donut', value: 93, country: 'AE' },
    { name: 'junk', value: 0, country: 'AE' },
    { name: 'sushi', value: 84, country: 'AE' },
    { name: 'ramen', value: 57, country: 'AE' },
    { name: 'curry', value: 73, country: 'AE' },
    { name: 'udon', value: 73, country: 'AE' },
    { name: 'hot dog', value: 43, country: 'AF' },
    { name: 'burger', value: 61, country: 'AF' },
    { name: 'sandwich', value: 28, country: 'AF' },
    { name: 'kebab', value: 12, country: 'AF' },
    { name: 'fries', value: 22, country: 'AF' },
    { name: 'donut', value: 54, country: 'AF' },
    { name: 'junk', value: 90, country: 'AF' },
    { name: 'sushi', value: 24, country: 'AF' },
    { name: 'ramen', value: 72, country: 'AF' },
    { name: 'curry', value: 40, country: 'AF' },
    { name: 'udon', value: 78, country: 'AF' },
    { name: 'hot dog', value: 35, country: 'AG' },
    { name: 'burger', value: 6, country: 'AG' },
    { name: 'sandwich', value: 64, country: 'AG' },
    { name: 'kebab', value: 92, country: 'AG' },
    { name: 'fries', value: 45, country: 'AG' },
    { name: 'donut', value: 88, country: 'AG' },
    { name: 'junk', value: 44, country: 'AG' },
    { name: 'sushi', value: 16, country: 'AG' },
    { name: 'ramen', value: 0, country: 'AG' },
    { name: 'curry', value: 75, country: 'AG' },
    { name: 'udon', value: 57, country: 'AG' },
    { name: 'hot dog', value: 3, country: 'AI' },
    { name: 'burger', value: 6, country: 'AI' },
    { name: 'sandwich', value: 34, country: 'AI' },
    { name: 'kebab', value: 72, country: 'AI' },
    { name: 'fries', value: 21, country: 'AI' },
    { name: 'donut', value: 30, country: 'AI' },
    { name: 'junk', value: 99, country: 'AI' },
    { name: 'sushi', value: 40, country: 'AI' },
    { name: 'ramen', value: 1, country: 'AI' },
    { name: 'curry', value: 70, country: 'AI' },
    { name: 'udon', value: 58, country: 'AI' },
    { name: 'hot dog', value: 40, country: 'AL' },
    { name: 'burger', value: 90, country: 'AL' },
    { name: 'sandwich', value: 24, country: 'AL' },
    { name: 'kebab', value: 69, country: 'AL' },
    { name: 'fries', value: 97, country: 'AL' },
    { name: 'donut', value: 70, country: 'AL' },
    { name: 'junk', value: 49, country: 'AL' },
    { name: 'sushi', value: 90, country: 'AL' },
    { name: 'ramen', value: 92, country: 'AL' },
    { name: 'curry', value: 90, country: 'AL' },
    { name: 'udon', value: 65, country: 'AL' },
    { name: 'hot dog', value: 72, country: 'AM' },
    { name: 'burger', value: 47, country: 'AM' },
    { name: 'sandwich', value: 30, country: 'AM' },
    { name: 'kebab', value: 51, country: 'AM' },
    { name: 'fries', value: 23, country: 'AM' },
    { name: 'donut', value: 63, country: 'AM' },
    { name: 'junk', value: 30, country: 'AM' },
    { name: 'sushi', value: 43, country: 'AM' },
    { name: 'ramen', value: 8, country: 'AM' },
    { name: 'curry', value: 49, country: 'AM' },
    { name: 'udon', value: 61, country: 'AM' },
    { name: 'hot dog', value: 83, country: 'AO' },
    { name: 'burger', value: 6, country: 'AO' },
    { name: 'sandwich', value: 17, country: 'AO' },
    { name: 'kebab', value: 40, country: 'AO' },
    { name: 'fries', value: 61, country: 'AO' },
    { name: 'donut', value: 72, country: 'AO' },
    { name: 'junk', value: 61, country: 'AO' },
    { name: 'sushi', value: 50, country: 'AO' },
    { name: 'ramen', value: 77, country: 'AO' },
    { name: 'curry', value: 97, country: 'AO' },
    { name: 'udon', value: 17, country: 'AO' },
    { name: 'hot dog', value: 15, country: 'AQ' },
    { name: 'burger', value: 34, country: 'AQ' },
    { name: 'sandwich', value: 26, country: 'AQ' },
    { name: 'kebab', value: 80, country: 'AQ' },
    { name: 'fries', value: 100, country: 'AQ' },
    { name: 'donut', value: 97, country: 'AQ' },
    { name: 'junk', value: 34, country: 'AQ' },
    { name: 'sushi', value: 81, country: 'AQ' },
    { name: 'ramen', value: 25, country: 'AQ' },
    { name: 'curry', value: 100, country: 'AQ' },
    { name: 'udon', value: 56, country: 'AQ' },
  ];

  it('matrix init', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      // forceSquare: true,
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      //sizeField: 'value',
      shapeType: 'circle',
      color: ['#0d5fbb', '#7eadfc', '#fd8b6f', '#aa3523'],
      //shapeSize: [2,20],
      data,
    });
    heatmapPlot.render();
    const view = heatmapPlot.getView();
    const positionFields = view.geometries[0].getAttribute('position').getFields();
    const colorField = view.geometries[0].getAttribute('color').getFields();
    const colorValues = view.geometries[0].getAttribute('color').values;
    expect(positionFields[0]).toBe('name');
    expect(positionFields[1]).toBe('country');
    expect(colorField[0]).toBe('value');
    expect(colorValues[0]).toBe('#0d5fbb');
    expect(heatmapPlot).toBeInstanceOf(Heatmap);
    heatmapPlot.destroy();
    expect(heatmapPlot.destroyed).toBe(true);
  });

  it('shapeType rect', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      shapeType: 'rect',
      data,
    });
    heatmapPlot.render();
    const view = heatmapPlot.getView();
    const shapeType = view.geometries[0].shapeType;
    expect(shapeType).toBe('polygon');
    heatmapPlot.destroy();
  });

  it('sizeField', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      sizeField: 'value',
      data,
    });
    heatmapPlot.render();
    const view = heatmapPlot.getView();
    const sizeField = view.geometries[0].getAttribute('size').getFields();
    expect(sizeField[0]).toBe('value');
    heatmapPlot.destroy();
  });

  it('size config', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      sizeField: 'value',
      shapeSize: [15, 50],
      data,
    });
    heatmapPlot.render();
    const view = heatmapPlot.getView();
    const sizeValues = view.geometries[0].getAttribute('size').values;
    expect(sizeValues[0].toFixed(2)).toBe((0.3519).toFixed(2));
    expect(sizeValues[1].toFixed(2)).toBe((1.10429).toFixed(2));
    heatmapPlot.destroy();
  });

  it('mapping size method', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      data,
    });
    heatmapPlot.render();
    heatmapPlot.mappingSize('value');
    window.setTimeout(() => {
      const view = heatmapPlot.getView();
      const shapes = view.geometries[0].getShapes();
      const bbox_1 = shapes[0].getBBox();
      const bbox_2 = shapes[1].getBBox();
      expect(Math.round(bbox_1.width)).not.toBe(Math.round(bbox_2.width));
      expect(Math.round(bbox_1.height)).not.toBe(Math.round(bbox_2.height));
      heatmapPlot.destroy();
    }, 600);
  });

  it('disable mapping size method', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      sizeField: 'value',
      data,
    });
    heatmapPlot.render();
    heatmapPlot.disableMappingSize();
    window.setTimeout(() => {
      const view = heatmapPlot.getView();
      const shapes = view.geometries[0].getShapes();
      const bbox_1 = shapes[0].getBBox();
      const bbox_2 = shapes[2].getBBox();
      expect(Math.round(bbox_1.width)).toEqual(Math.round(bbox_2.width));
      expect(Math.round(bbox_1.height)).toEqual(Math.round(bbox_2.height));
      heatmapPlot.destroy();
    }, 600);
  });

  it('change shape method', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      sizeField: 'value',
      shapeType: 'circle',
      data,
    });
    heatmapPlot.render();
    const samplePath_1 = clone(heatmapPlot.getView().geometries[0].getShapes()[0].attr('path'));
    heatmapPlot.changeShape('rect');
    window.setTimeout(() => {
      const samplePath_2 = heatmapPlot.getView().geometries[0].getShapes()[0].attr('path');
      expect(samplePath_1[1][0]).toBe('L');
      expect(samplePath_2[1][0]).toBe('Q');
      heatmapPlot.destroy();
    }, 600);
  });

  it('label 隐藏', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      data,
      label: {
        visible: false,
      },
    });
    heatmapPlot.render();
    const geometry = heatmapPlot.getView().geometries[0];
    const labelShapes = geometry.labelsContainer.get('children');
    expect(labelShapes.length).toBe(0);
    heatmapPlot.destroy();
  });

  it('label 样式', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      data,
      label: {
        visible: true,
        style: {
          fontSize: 14,
        },
      },
    });
    heatmapPlot.render();
    const geometry = heatmapPlot.getView().geometries[0];
    const labelShape = geometry.labelsContainer.get('children')[0];
    expect(labelShape.attr('fontSize')).toBe(14);
    heatmapPlot.destroy();
  });

  it('axis 隐藏', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      data,
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
    });
    heatmapPlot.render();
    const plot = heatmapPlot.getView();
    const axes = plot.getController('axis').getComponents();
    expect(axes.length).toBe(0);
    heatmapPlot.destroy();
  });

  it('axis 样式', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      data,
      xAxis: {
        visible: true,
        tickCount: 5,
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: { stroke: 'red' },
        },
        label: {
          visible: true,
          formatter: (v) => {
            return v + 'abc';
          },
          style: { fill: 'red', fontSize: 24 },
        },
        title: {
          visible: true,
          text: 'xxxx',
          style: {
            fill: 'red',
            fontSize: 20,
          },
        },
      },
      yAxis: {
        visible: false,
      },
    });
    heatmapPlot.render();
    const view = heatmapPlot.getView();
    const axes = view.getController('axis').getComponents();
    const axis = axes[0].component;
    const axisGroup = axis.get('group') as any;
    const title = axisGroup.find((item) => item.get('name') === 'axis-title');

    expect(title.attr('text')).toInclude('xxxx');
    expect(title.attr('fill')).toBe('red');

    const labels = (axis.get('group') as any).findAllByName('axis-label');
    expect(labels[0].attr('text')).toInclude('abc');
    // style
    const line = axisGroup.find((item) => item.get('name') === 'axis-line');
    const tickLine = axisGroup.find((item) => item.get('name') === 'axis-tickLine');
    expect(line.attr('stroke')).toBe('red');
    expect(tickLine.attr('stroke')).toBe('red');
    expect(labels[0].attr('fill')).toBe('red');
    heatmapPlot.destroy();
  });

  it('legend 位置', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      data,
      legend: {
        visible: true,
        position: 'bottom-center',
      },
    });
    heatmapPlot.render();
    const plot = heatmapPlot.getLayer() as any;
    const legend = plot.plotComponents[1];
    const y = legend.y;
    const { coordinateBBox } = heatmapPlot.getView();
    expect(coordinateBBox.minY + coordinateBBox.height).toBeLessThan(y);
    heatmapPlot.destroy();
  });

  it('legend style', () => {
    const heatmapPlot = new Heatmap(canvasDiv, {
      width: 600,
      height: 500,
      xField: 'name',
      yField: 'country',
      colorField: 'value',
      data,
      legend: {
        visible: true,
        ticklineStyle: {
          stroke: 'red',
          lineWidth: 2,
        },
        anchorStyle: {
          fill: 'red',
        },
        text: {
          style: {
            fill: 'red',
          },
        },
      },
    });
    heatmapPlot.render();
    const plot = heatmapPlot.getLayer() as any;
    const legendElements = plot.plotComponents[1].container.get('children');
    const anchor = legendElements[legendElements.length - 1];
    const tickLine = legendElements[1];
    const text = legendElements[2];
    expect(anchor.attr('fill')).toBe('red');
    expect(tickLine.attr('stroke')).toBe('red');
    expect(tickLine.attr('lineWidth')).toBe(2);
    expect(text.attr('fill')).toBe('red');
    heatmapPlot.destroy();
  });
});
