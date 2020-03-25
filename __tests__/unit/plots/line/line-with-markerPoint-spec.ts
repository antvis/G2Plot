import { Line } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { income as data } from '../../../data/income';
import MarkerPoint from '../../../../src/components/marker-point';
import { IShape } from '@antv/g2/lib/dependents';

describe('Line plot with marker-point', () => {
  const div = createDiv();
  const linePlot = new Line(div, {
    width: 600,
    height: 600,
    data,
    xField: 'time',
    yField: 'rate',
    markerPoints: [
      {
        visible: true,
        data: [{ time: '2013-06-13' }],
      },
    ],
  });
  linePlot.render();

  it('normal', () => {
    const layer = linePlot.getLayer();
    // @ts-ignore
    const markerPoints: MarkerPoint[] = layer.markerPoints;
    expect(markerPoints.length).toBe(1);
    // @ts-ignore
    expect(markerPoints[0].points.length).toBe(1);
    // @ts-ignore
    expect(markerPoints[0].labels.length).toBe(0);
  });

  it('with 2 markerPoints component', () => {
    linePlot.updateConfig({
      markerPoints: [
        {
          visible: true,
          data: [{ time: '2013-06-13' }],
        },
        {
          visible: true,
          data: [{ time: '2013-06-16' }],
        },
      ],
    });
    linePlot.render();
    const layer = linePlot.getLayer();
    // @ts-ignore
    const markerPoints: MarkerPoint[] = layer.markerPoints;
    expect(markerPoints.length).toBe(2);
  });

  it('custom markerPoints style', () => {
    linePlot.updateConfig({
      markerPoints: [
        {
          visible: true,
          data: [{ time: '2013-06-13' }],
          style: {
            normal: {
              fill: 'red',
              stroke: '#000',
              lineWidth: 1,
            },
          },
        },
      ],
    });
    linePlot.render();
    const layer = linePlot.getLayer();
    // @ts-ignore
    const pointShapes: IShape[] = layer.markerPoints[0].points;
    expect(pointShapes[0].attr('fill')).toBe('red');
    expect(pointShapes[0].attr('stroke')).toBe('#000');
    expect(pointShapes[0].attr('lineWidth')).toBe(1);
  });

  it('markerPoints with label', () => {
    linePlot.updateConfig({
      markerPoints: [
        {
          visible: true,
          data: [{ time: '2013-06-13' }, { time: '2013-06-18' }],
          style: {
            normal: {
              fill: 'red',
              stroke: '#000',
              lineWidth: 1,
            },
          },
          label: {
            visible: true,
            formatter: () => 'hello',
            style: {
              fill: 'red',
            },
          },
        },
      ],
    });
    linePlot.render();
    const layer = linePlot.getLayer();
    // @ts-ignore
    const labelShapes: IShape[] = layer.markerPoints[0].labels;
    expect(labelShapes.length).toBe(2);
    expect(labelShapes[0].attr('fill')).toBe('red');
    expect(labelShapes[0].attr('text')).toBe('hello');
  });
});
