import { createDiv } from '../../utils/dom';
import { Line } from '../../../src';
import MarkerPoint from '../../../src/components/marker-point';

const data = [
  {
    date: '2018/8/12',
    value: 5,
  },
  {
    date: '2018/8/12',
    description: 'register',
    value: 5,
  },
  {
    date: '2018/8/12',
    value: 5,
  },
  {
    date: '2018/8/13',
    value: 5,
  },
];

describe('Marker Point', () => {
  const div = createDiv('canvas');

  const line = new Line(div, {
    width: 400,
    height: 400,
    xField: 'date',
    yField: 'value',
    padding: [0, 0, 0, 0],
    data,
    point: {
      visible: true,
    },
  });

  line.render();

  it('normal', () => {
    const markerPoint = new MarkerPoint({
      view: line.getLayer().view,
      data: [data[0], data[1]],
    });

    // @ts-ignore
    const points = markerPoint.points;
    expect(markerPoint.container.getChildren().length).toBe(2);
    // @ts-ignore
    expect(points.length).toBe(2);
    // @ts-ignore
    expect(markerPoint.labels.length).toBe(0);

    const shapes = line.getLayer().view.geometries[1].getShapes();
    expect(shapes[0].getBBox().minX + shapes[0].getBBox().width / 2).toBe(
      points[0].getBBox().minX + points[0].getBBox().width / 2
    );
  });

  it('marker label & label style', () => {
    const markerPoint = new MarkerPoint({
      view: line.getLayer().view,
      data: [data[0], data[1]],
      field: 'description',
      label: {
        visible: true,
        style: {
          fill: 'red',
        },
      },
    });

    // @ts-ignore
    const points = markerPoint.points;
    // @ts-ignore
    const labels = markerPoint.labels;
    expect(labels.length).toBe(2);
    expect(labels[1].attr('text')).toBe(data[1]['description']);
    expect(labels[1].attr('fill')).toBe('red');
    expect(points[0].getBBox().y).toBeGreaterThan(labels[0].getBBox().y);
  });

  it('label position & offsetX & offsetY', () => {
    const markerPoint = new MarkerPoint({
      view: line.getLayer().view,
      data: [data[0], data[1]],
      field: 'description',
      label: {
        visible: true,
        position: 'bottom',
        offsetX: 10,
        offsetY: 5,
      },
    });
    // @ts-ignore
    const points = markerPoint.points;
    // @ts-ignore
    const labels = markerPoint.labels;
    const labelBBox = labels[0].getBBox();
    expect(points[0].getBBox().y).toBeLessThan(labelBBox.y);
    expect(points[0].attr('x') + 10).toBe(labelBBox.minX + labelBBox.width / 2);
    expect(points[0].attr('y') + 5).toBe(labelBBox.minY);
  });

  it('interaction & events', (done) => {
    let clicked = false;
    const markerPoint = new MarkerPoint({
      view: line.getLayer().view,
      data: [data[0], data[1]],
      field: 'description',
      events: {
        click: () => (clicked = true),
      },
      style: {
        normal: {
          stroke: 'transparent',
        },
        selected: {
          stroke: 'blue',
          fill: 'red',
        },
        active: {
          stroke: 'yellow',
          fill: 'red',
        },
      },
    });
    // @ts-ignore
    const points = markerPoint.points;
    setTimeout(() => {
      // @ts-ignore
      markerPoint.container.emit(`${markerPoint.name}:mouseenter`, {
        target: points[1],
      });
      expect(points[1].attr('stroke')).toBe('yellow');
      expect(points[1].attr('fill')).toBe('red');
      // @ts-ignore
      markerPoint.container.emit(`${markerPoint.name}:click`, {
        target: points[0],
      });
      expect(clicked).toBe(true);
      expect(points[0].attr('stroke')).toBe('blue');
      expect(points[0].attr('fill')).toBe('red');
      expect(points[1].attr('stroke')).toBe('transparent');
      done();
    });
  });
});
