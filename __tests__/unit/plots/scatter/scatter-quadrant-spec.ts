import { Scatter } from '../../../../src';
import { CountryEconomy as data } from '../../../data/country-economy';

describe('Scatter plot quadrant', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('scatter quadrant create & destroy', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
      quadrant: {
        visible: true,
        xBaseline: 20000,
        yBaseline: 70,
        regionStyle: [
          { fill: 'black', opacity: 0.05 },
          { fill: 'green', opacity: 0.05 },
          { fill: 'white', opacity: 0 },
          { fill: 'white', opacity: 0 },
        ],
        label: {
          text: ['第一象限', '第二象限', '第三象限', '第四象限'],
        },
      },
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
});
