import { Scatter } from '../../../../src';
import { CountryEconomy as data } from '../../../data/country-economy';
import { getGeometryShapes, getGeometryByType } from '../../../../src/util/view';

describe('Scatter plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('scatter create & destroy', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
    });
    scatterPlot.render();
    const plot = scatterPlot.getLayer();
    // @ts-ignore
    const positionField = plot.config.geometries[0].position.fields;
    // @ts-ignore
    const colorField = plot.config.geometries[0].color.fields;
    expect(scatterPlot).toBeInstanceOf(Scatter);
    expect(positionField[0]).toBe('GDP');
    expect(positionField[1]).toBe('LifeExpectancy');
    expect(colorField[0]).toBe('continent');
    scatterPlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('scatter xAxis', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
      xAxis: {
        label: {
          visible: true,
          formatter: () => {
            return 'xAxis';
          },
          style: {
            fill: 'red',
          },
        },
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: {
            stroke: 'red',
            length: 5,
            lineWidth: 1,
          },
        },
      },
      yAxis: {
        visible: false,
      },
    });
    scatterPlot.render();
    const view = scatterPlot.getLayer().view;
    const xAxisLabelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-label';
    });
    expect(xAxisLabelShapes[0].attr('text')).toBe('xAxis');
    expect(xAxisLabelShapes[0].attr('fill')).toBe('red');
    const xAxisLineShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-line';
    });
    expect(xAxisLineShapes[0].attr('stroke')).toBe('red');
    const xAxisTickLineShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-tickLine';
    });
    expect(xAxisTickLineShapes[0].attr('stroke')).toBe('red');
    expect(xAxisTickLineShapes[0].attr('length')).toBe(5);
    expect(xAxisTickLineShapes[0].attr('lineWidth')).toBe(1);
    scatterPlot.destroy();
  });

  it('scatter yAxis', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
      yAxis: {
        label: {
          visible: true,
          formatter: () => {
            return 'yAxis';
          },
          style: {
            fill: 'red',
          },
        },
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: {
            stroke: 'red',
            length: 5,
            lineWidth: 1,
          },
        },
      },
      xAxis: {
        visible: false,
      },
    });
    scatterPlot.render();
    const view = scatterPlot.getLayer().view;
    const yAxisLabelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-label';
    });
    expect(yAxisLabelShapes[0].attr('text')).toBe('yAxis');
    expect(yAxisLabelShapes[0].attr('fill')).toBe('red');
    const yAxisLineShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-line';
    });
    expect(yAxisLineShapes[0].attr('stroke')).toBe('red');
    const yAxisTickLineShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-tickLine';
    });
    expect(yAxisTickLineShapes[0].attr('stroke')).toBe('red');
    expect(yAxisTickLineShapes[0].attr('length')).toBe(5);
    expect(yAxisTickLineShapes[0].attr('lineWidth')).toBe(1);
    scatterPlot.destroy();
  });

  it('scatter cat xAxis and yAxis', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data: [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 },
        { x: 4, y: 40 },
      ],
      xField: 'x',
      yField: 'y',
    });
    scatterPlot.render();

    const layer = scatterPlot.getLayer();
    const view = layer.view;
    const controller = view.getController('axis');
    // 获取所有 Component 实例
    const components = controller.getComponents();

    const yAxis = components.find((component) => {
      return component.direction === 'left';
    });
    const yValues = ['10', '20', '30', '40'];
    yAxis.component.get('ticks').forEach((tick, index) => {
      expect(tick.name).toBe(yValues[index]);
    });
    const xAxis = components.find((component) => {
      return component.direction === 'bottom';
    });
    const xValues = ['1', '2', '3', '4'];
    xAxis.component.get('ticks').forEach((tick, index) => {
      expect(tick.name).toBe(xValues[index]);
    });
  });

  it('scatter legend', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
      legend: {
        visible: true,
        position: 'right-center',
      },
    });
    scatterPlot.render();
    const layer = scatterPlot.getLayer();
    const view = layer.view;
    const legend = view.getController('legend');
    // @ts-ignore
    expect(legend.option.position).toBe('right');
    scatterPlot.destroy();
  });

  it('scatter pointSize', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
    });
    scatterPlot.render();
    const view = scatterPlot.getLayer().view;

    const pointShapes = getGeometryShapes(getGeometryByType(view, 'point'));
    expect(pointShapes.length).toBe(60);
    expect(pointShapes[0].attr('r')).toBe(5);
  });

  it('scatter valid value', () => {
    const data = [
      { x: null, y: 3 },
      { x: undefined, y: 4 },
      { x: NaN, y: 1232312313 },
      { x: 1232312313, y: 'NaN' },
      { x: '5', y: 4 },
      { x: 5, y: '1234' },
      { x: 4234, y: '' },
      { x: NaN, y: 32323 },
      { x: 'dasdasdsadad', y: 32323 },
      { x: 31231313, y: 3131313 },
    ];
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'x',
      yField: 'y',
    });
    scatterPlot.render();
    const plot = scatterPlot.getLayer();
    const filterData = plot.config.data;
    expect(filterData.length).toBe(4);
    expect(filterData[2].x).toBe(4234);
    expect(filterData[2].y).toBe(0);
  });

  it('scatter label', () => {
    let scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
      label: {
        visible: true,
      },
    });
    scatterPlot.render();

    let view = scatterPlot.getLayer().view;
    let labelShapes = view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'label';
    });
    expect(labelShapes.length).toBe(data.length);
    labelShapes.forEach((label, index) => {
      expect(label.get('data')['GDP']).toBe(data[index]['GDP']);
      expect(label.get('data')['LifeExpectancy']).toBe(data[index]['LifeExpectancy']);
      expect(label.get('data')['continent']).toBe(data[index]['continent']);
    });

    scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
    });
    scatterPlot.render();
    view = scatterPlot.getLayer().view;
    labelShapes = view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'label';
    });
    expect(labelShapes.length).toBe(0);
  });

  it('scatter label formatter', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      colorField: 'continent',
      label: {
        visible: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formatter: (text, data, index) => {
          return data.continent;
        },
      },
    });
    scatterPlot.render();

    let view = scatterPlot.getLayer().view;
    let labelShapes = view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'label';
    });
    labelShapes.forEach((label, index) => {
      // @ts-ignore
      expect(label.cfg.children[0].attr('text')).toBe(data[index].continent);
    });

    scatterPlot.updateConfig({
      label: {
        formatter: (text) => {
          return text;
        },
      },
    });
    scatterPlot.render();

    view = scatterPlot.getLayer().view;
    labelShapes = view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'label';
    });
    labelShapes.forEach((label, index) => {
      // @ts-ignore
      expect(label.cfg.children[0].attr('text')).toBe(data[index]['LifeExpectancy']);
    });
  });

  it('scatter animate', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
      animation: false,
    });
    scatterPlot.render();
    const geometries = scatterPlot.getLayer().view.geometries;
    geometries.forEach((geometry) => {
      expect(geometry.animateOption).toBe(false);
    });
  });

  it('radar title & description', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      title: {
        visible: true,
        text: 'title',
        style: {
          fill: 'red',
        },
      },
      description: {
        visible: true,
        text: 'description',
        style: {
          fill: 'red',
        },
      },
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
    });
    scatterPlot.render();
    const radarLayer = scatterPlot.getLayer();
    const title = radarLayer.title;
    const description = radarLayer.description;
    // @ts-ignore
    expect(title.text).toBe('title');
    // @ts-ignore
    expect(title.style.fill).toBe('red');
    expect(description.shape.attr('text')).toBe('description');
    expect(description.shape.attr('fill')).toBe('red');
    scatterPlot.destroy();
  });
});
