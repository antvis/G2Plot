import { Pie } from '../../../../src';
import { getGeometryLabel } from '@antv/g2';
import { Shape } from '@antv/g-canvas';

// TODO xinming
describe.skip('Pie plot', () => {
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

  it('饼图 默认配置项', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
    });
    piePlot.render();
  });

  it('饼图 回调方式修改pieStyle', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
      pieStyle: (...args) => {
        return {
          stroke: 'red',
          lineWidth: 2,
        };
      },
    });
    piePlot.render();
  });

  it('初始化及销毁图表', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      legend: {
        visible: true,
        position: 'top-left',
      },
      title: {
        text: 'title title',
      },
      colorField: 'type',
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const positionField = plot.geometries[0].attributeOption.position.fields;
    expect(piePlot).toBeInstanceOf(Pie);
    expect(positionField[0]).toBe('1');
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
    expect(coord.getRadius() * 2).toBe(coord.getWidth() / 2);
    piePlot.destroy();
  });

  it('单色饼图', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const shapes = plot.geometries[0].getShapes();
    expect(shapes[0].attr('stroke')).toBe('white');
    expect(shapes[0].attr('lineWidth')).toBe(1);
    piePlot.destroy();
  });

  it('饼图颜色', () => {
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
    const shapes = plot.geometries[0].getShapes();
    expect(shapes[0].attr('fill')).toBe('yellow');
    expect(shapes[1].attr('fill')).toBe('green');
    expect(shapes[2].attr('fill')).toBe('blue');
    piePlot.destroy();
  });

  it('图形style', () => {
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
    const shapes = plot.geometries[0].getShapes();
    expect(shapes[0].attr('stroke')).toBe('red');
    expect(shapes[0].attr('lineWidth')).toBe(2);
    piePlot.destroy();
  });

  it('outer label', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      label: {
        visible: true,
        type: 'outer',
        formatter: () => {
          return 'test';
        },
        style: {
          fill: 'red',
        },
      },
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const labelGroup = plot.geometries[0].foregroundGroup
      .get('children')[0]
      .get('children')[0]
      .get('children');

    const coord = plot.getCoordinate();
    expect(labelGroup[0].attr('text')).toBe('test');
    expect(labelGroup[0].attr('fill')).toBe('red');
    const distX = Math.abs(coord.getCenter().x - labelGroup[0].attr('x'));
    const distY = Math.abs(coord.getCenter().y - labelGroup[0].attr('y'));
    const dist = Math.sqrt(distX * distX + distY * distY);
    expect(dist > coord.getRadius()).toBe(true);
    piePlot.destroy();
  });

  it('outer-center label', () => {
    expect(getGeometryLabel('outer-center')).not.toBeDefined();
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      label: {
        visible: true,
        type: 'outer-center',
        formatter: () => {
          return 'test';
        },
        style: {
          fill: 'red',
        },
      },
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const element = plot.geometries[0];
    const labelShapes: Shape[] = element.labelsContainer.getChildren();
    const coord = plot.getCoordinate();
    console.log(labelShapes[0]);
    // expect(labelShapes[0].attr('text')).toBe('test');
    // expect(labelShapes[0].attr('fill')).toBe('red');
    const distX = Math.abs(coord.getCenter().x - labelShapes[0].attr('x'));
    const distY = Math.abs(coord.getCenter().y - labelShapes[0].attr('y'));
    const dist = Math.sqrt(distX * distX + distY * distY);
    expect(dist > coord.getRadius()).toBe(true);
    piePlot.destroy();
  });

  it('auto padding', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      title: {
        text: 'title',
      },
      description: {
        text: 'descriptiondescriptiondescriptiondescription',
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
    expect(title.text).toBe('title');
    expect(title.style.fill).toBe('red');
    expect(description.shape.attr('text')).toBe('description');
    expect(description.shape.attr('fill')).toBe('red');
    piePlot.destroy();
  });
});
