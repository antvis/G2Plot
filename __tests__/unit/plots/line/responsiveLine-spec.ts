import { Line } from '../../../../src';
import { income } from '../../../data/income';

describe('responsive line plot', () => {
  const data = income;

  it('canvas size 500x500', () => {
    const plot = createPlot(500, 500);
  });

  it('canvas size 400x400', () => {
    const plot = createPlot(400, 400);
  });

  it('canvas size 300x300', () => {
    const plot = createPlot(300, 300);
  });

  it('canvas size 200x200', () => {
    const plot = createPlot(150, 150);
  });

  function createPlot(width, height) {
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = `${width}px`;
    canvasDiv.style.height = `${height}px`;
    canvasDiv.style.left = '50px';
    canvasDiv.style.top = '50px';
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);
    const linePlot = new Line(canvasDiv, {
      width,
      height,
      padding: [20, 20, 80, 50],
      data,
      xField: 'time',
      yField: 'rate',
      xAxis: {
        type: 'dateTime',
        autoRotateLabel: false,
      },
      yAxis: {
        visible: true,
      },
      /* tooltip: {
        visible: false,
      },*/
      forceFit: false,
      responsive: true,
    });
    linePlot.render();
    return linePlot;
  }
});
