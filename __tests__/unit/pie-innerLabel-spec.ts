import { Shape } from '@antv/g';
import { Pie } from '../../src';
import { distBetweenPoints } from '../../src/util/math';

describe('Pie plot with innerLabel', () => {
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

  const piePlot = new Pie(canvasDiv, {
    width: 600,
    height: 600,
    data,
    angleField: 'value',
    colorField: 'type',
  });
  piePlot.render();
  // @ts-ignore
  const plot = piePlot.getLayer().view;
  const coord = plot.get('coord');
  const center = coord.getCenter();
  const radius = coord.getRadius();

  it('默认配置为 inner label', () => {
    // @ts-ignore
    const pieElement = piePlot.getLayer().view.get('elements')[0];
    const labelShapes: Shape[] = pieElement.get('labels');

    const box = labelShapes[0].getBBox();
    const anchor = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    const dist = distBetweenPoints(center, anchor);
    expect(dist < radius).toBe(true);
  });

  it('回调方式修改pieStyle', () => {
    piePlot.updateConfig({
      pieStyle: (...args) => {
        return {
          stroke: 'red',
          lineWidth: 2,
        };
      },
    });
    piePlot.render();
    // @ts-ignore
    const plot = piePlot.getLayer().view;
    const shapes = plot.get('elements')[0].getShapes();
    expect(shapes[0].attr('stroke')).toBe('red');
    expect(shapes[0].attr('lineWidth')).toBe(2);
  });

  it('inner-label offset 小于等于 0', () => {
    piePlot.updateConfig({
      label: {
        offset: 20,
      },
    });
    piePlot.render();
    // @ts-ignore
    const pieElement = piePlot.getLayer().view.get('elements')[0];
    const labelShapes: Shape[] = pieElement.get('labels');
    labelShapes.forEach((label) => {
      const box = label.getBBox();
      const anchor = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      const dist = distBetweenPoints(center, anchor);
      expect(dist).toBe(radius);
    });
  });

  it('offset 配置百分比字符串：设置为 1/2 半径', () => {
    const data = [];
    for (let i = 0; i < 6; i += 1) {
      data.push({ type: `分类 ${i + 1}`, value: 10 + i });
    }
    piePlot.updateConfig({
      data,
      label: {
        offset: '-50%',
        formatter: (text, item) => `${item._origin.type}`,
        style: {
          textBaseline: 'middle',
          textAlign: 'center',
        },
      },
      pieStyle: {
        lineWidth: 0,
      },
    });
    piePlot.render();
    // @ts-ignore
    const pieElement = piePlot.getLayer().view.get('elements')[0];
    const labelShapes: Shape[] = pieElement.get('labels');
    const near = (a, b) => Math.abs(a - b) < 2;
    labelShapes.forEach((label) => {
      const box = label.getBBox();
      const anchor = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      const dist = distBetweenPoints(center, anchor);
      expect(near(dist, radius / 2)).toBe(true);
    });
  });

  afterAll(() => {
    // piePlot.destroy();
  });
});
