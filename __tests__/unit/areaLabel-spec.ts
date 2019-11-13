import { StackArea } from '../../src';
import { oil } from '../data/global-oil-new';

describe.skip('stackArea label', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('初始化以及销毁', () => {
    const areaPlot = new StackArea(canvasDiv, {
      width: 600,
      height: 600,
      padding: [20, 20, 100, 100],
      data: oil,
      xField: 'date',
      yField: 'value',
      stackField: 'country',
      xAxis: {
        visible: true,
        type: 'dateTime',
      },
      yAxis: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'area',
        // autoScale: true
      },
      responsive: true,
    });
    areaPlot.render();
    // const positionField = areaPlot.plot.get('elements')[0].get('position').fields;
    // const isTransposed = areaPlot.plot.get('coord').isTransposed;
    // const axes = areaPlot.plot.get('axisController').axes;

    // expect(areaPlot). toBeInstanceOf(Area);
    // expect(positionField[0]).toBe('value');
    // expect(positionField[1]).toBe('year');
    // expect(isTransposed).toBe(false);
    // expect(axes.length).toBe(2);
    // areaPlot.destroy();
    // expect(areaPlot.plot.destroyed).toBe(true);
  });
});
