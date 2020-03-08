import { Scatter } from '../../../../src';
import { CountryEconomy as data } from '../../../data/country-economy';

describe('Scatter plot trendline', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('scatter trendline create & destroy', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
      trendline: {
        visible: true,
        type: 'quad',
        showConfidence: true,
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
