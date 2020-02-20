import { Ring } from '../../src';
import { simulate } from 'event-simulate';
import { Shape } from '@antv/g';
import { distBetweenPoints } from '../../src/util/math';

describe('Ring plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.position = 'absolute';
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
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

  it.only('创建 & 销毁图表', () => {
    const ringPlot = new Ring(canvasDiv, {
      data,
      angleField: 'value',
      colorField: 'type',
    });
    ringPlot.render();
    /*const positionField = ringPlot
      .getLayer()
      .view.get('elements')[0]
      .get('position').fields;
    expect(ringPlot).toBeInstanceOf(Ring);
    expect(positionField[0]).toBe('1');
    expect(positionField[1]).toBe('value');
    ringPlot.destroy();*/
  });

  it('inner radius, label 默认居中', () => {
    const ringPlot = new Ring(canvasDiv, {
      data,
      angleField: 'value',
      colorField: 'type',
    });
    ringPlot.render();
    const coord = ringPlot.getLayer().view.get('coord');
    const element = ringPlot.getLayer().view.get('elements')[0];
    const labelShapes: Shape[] = element.get('labels');
    const labelBox = labelShapes[0].getBBox();
    const labelCenter = { x: labelBox.x + labelBox.width / 2, y: labelBox.y + labelBox.height / 2 };
    const radius = coord.getRadius();
    const innerRadius = coord.getRadius() * coord.innerRadius;
    const dist = distBetweenPoints(labelCenter, coord.getCenter());
    expect(dist).toBe((radius + innerRadius) / 2);
    ringPlot.destroy();
  });

  it('inner radius, label offset is 0', () => {
    const ringPlot = new Ring(canvasDiv, {
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        offset: 0,
      },
    });
    ringPlot.render();
    const coord = ringPlot.getLayer().view.get('coord');
    const element = ringPlot.getLayer().view.get('elements')[0];
    const labelShapes: Shape[] = element.get('labels');
    const labelBox = labelShapes[0].getBBox();
    const labelCenter = { x: labelBox.x + labelBox.width / 2, y: labelBox.y + labelBox.height / 2 };
    const radius = coord.getRadius();
    const dist = distBetweenPoints(labelCenter, coord.getCenter());
    expect(dist).toBe(radius);
    ringPlot.destroy();
  });

  it('inner radius, label offset is innerRadius', () => {
    const ringPlot = new Ring(canvasDiv, {
      data,
      angleField: 'value',
      colorField: 'type',
      innerRadius: 0.6,
      label: {
        visible: true,
        offset: '-40%',
      },
    });
    ringPlot.render();
    const coord = ringPlot.getLayer().view.get('coord');
    const element = ringPlot.getLayer().view.get('elements')[0];
    const labelShapes: Shape[] = element.get('labels');
    const labelBox = labelShapes[0].getBBox();
    const labelCenter = { x: labelBox.x + labelBox.width / 2, y: labelBox.y + labelBox.height / 2 };
    const dist = distBetweenPoints(labelCenter, coord.getCenter());
    const innerRadius = coord.getRadius() * coord.innerRadius;
    expect(dist).toBe(innerRadius);
    ringPlot.destroy();
  });

  it.skip('centralText annotation', (done) => {
    const ringPlot = new Ring(canvasDiv, {
      padding: [0, 0, 0, 0],
      data,
      innerRadius: 0.1,
      angleField: 'value',
      colorField: 'type',
      annotation: [{ type: 'centralText', onActive: true }],
    });
    ringPlot.render();
    const plot = ringPlot.getLayer().view;
    const canvas = plot.get('canvas');
    const bbox = canvas.get('el').getBoundingClientRect();
    let originData = null;
    plot.on('interval:mousemove', (e) => {
      originData = e.target.get('origin')._origin;
    });
    setTimeout(() => {
      simulate(canvas.get('el'), 'mousemove', {
        clientY: bbox.top + 200,
        clientX: bbox.left + 200,
      });
      if (originData !== null) {
        const name = document.getElementsByClassName('ring-guide-name')[0].innerHTML;
        const value = document.getElementsByClassName('ring-guide-value')[0].innerHTML;
        expect(name).toBe(originData.type);
        expect(value).toBe(originData.value.toString());
        ringPlot.destroy();
        done();
      }
    }, 1000);
  });
});
