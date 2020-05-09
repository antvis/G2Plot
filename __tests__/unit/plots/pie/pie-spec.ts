import { Pie } from '../../../../src';

describe('Pie plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: 'Other',
      value: 5,
    },
  ];

  it('初始化及销毁图表', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    // @ts-ignore
    const positionField = plot.geometries[0].attributeOption.position.fields;
    expect(piePlot).toBeInstanceOf(Pie);
    expect(positionField[0]).toBe(1);
    expect(positionField[1]).toBe('value');
    piePlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('radius', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      padding: [0, 0, 0, 0],
      angleField: 'value',
      radius: 0.5,
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const coord = plot.getCoordinate();
    // @ts-ignore
    expect(coord.getRadius() * 2).toBe(coord.getWidth() / 2);
    piePlot.destroy();
  });

  it('单色饼图, 无 colorField', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const shapes = plot.geometries[0].elements.map((ele) => ele.shape);
    expect(shapes[0].attr('stroke')).toBe('white');
    expect(shapes[0].attr('lineWidth')).toBe(1);
    piePlot.destroy();
  });

  it('饼图颜色, set color', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['yellow', 'green', 'blue'],
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const shapes = plot.geometries[0].elements.map((ele) => ele.shape);
    expect(shapes[0].attr('fill')).toBe('yellow');
    expect(shapes[1].attr('fill')).toBe('green');
    expect(shapes[2].attr('fill')).toBe('blue');
    piePlot.destroy();
  });

  it('饼图样式, pieStyle', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
      pieStyle: {
        stroke: 'red',
        lineWidth: 2,
      },
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const shapes = plot.geometries[0].elements.map((ele) => ele.shape);
    expect(shapes[0].attr('stroke')).toBe('red');
    expect(shapes[0].attr('lineWidth')).toBe(2);
    piePlot.destroy();
  });

  it('饼图样式, pieStyle callback', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
      pieStyle: () => {
        return {
          stroke: 'red',
          lineWidth: 2,
        };
      },
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const shapes = plot.geometries[0].elements.map((ele) => ele.shape);
    expect(shapes[0].attr('stroke')).toBe('red');
    expect(shapes[0].attr('lineWidth')).toBe(2);
    piePlot.destroy();
  });

  // TODO mifa
  it.skip('auto padding', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      title: {
        visible: true,
        text: 'title',
      },
      description: {
        visible: true,
        text: 'description & description & description & description',
      },
      padding: 'auto',
      data,
      angleField: 'value',
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const bbox = plot.coordinateBBox;
    expect(bbox.y >= 16).toBe(true);
    expect(600 - bbox.maxX >= 20).toBe(true);
    expect(600 - bbox.maxY >= 20).toBe(true);
    expect(bbox.x >= 20).toBe(true);
    piePlot.destroy();
  });

  it('title & description', () => {
    const piePlot = new Pie(canvasDiv, {
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
      padding: 'auto',
      data,
      angleField: 'value',
    });
    piePlot.render();
    const pieLayer = piePlot.getLayer();
    const title = pieLayer.title;
    const description = pieLayer.description;
    // @ts-ignore
    expect(title.text).toBe('title');
    // @ts-ignore
    expect(title.style.fill).toBe('red');
    expect(description.shape.attr('text')).toBe('description');
    expect(description.shape.attr('fill')).toBe('red');
    piePlot.destroy();
  });
});
