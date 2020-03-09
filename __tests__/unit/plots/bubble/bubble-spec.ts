import { Bubble } from '../../../../src';
import { CountryEconomy as data } from '../../../data/country-economy';

describe('Bubble plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('bubble create & destroy', () => {
    const bubblePlot = new Bubble(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      colorField: 'continent',
      sizeField: 'Population',
    });
    bubblePlot.render();
    const plot = bubblePlot.getLayer();
    // @ts-ignore
    const positionField = plot.config.geometries[0].position.fields;
    // @ts-ignore
    const colorField = plot.config.geometries[0].color.fields;
    // @ts-ignore
    const sizeField = plot.config.geometries[0].size.fields;
    expect(bubblePlot).toBeInstanceOf(Bubble);
    expect(positionField[0]).toBe('GDP');
    expect(positionField[1]).toBe('LifeExpectancy');
    expect(colorField[0]).toBe('continent');
    expect(sizeField[0]).toBe('Population');
    bubblePlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('bubble pointSize', () => {
    const bubblePlot = new Bubble(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      colorField: 'continent',
      sizeField: 'Population',
      pointSize: [4, 30],
    });
    bubblePlot.render();

    const view = bubblePlot.getLayer().view;

    const pointShapes = view.middleGroup.findAll((el) => {
      return el.get('name') === 'point';
    });
    expect(pointShapes.length).toBe(60);

    pointShapes.forEach((pointShape) => {
      const r = pointShape.attr('r');
      expect(r >= 4).toBe(true);
      expect(r <= 30).toBe(true);
    });
  });

  it('bubble pointStyle', () => {
    const bubblePlot = new Bubble(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      colorField: 'continent',
      sizeField: 'Population',
    });
    bubblePlot.render();

    const view = bubblePlot.getLayer().view;

    const pointShapes = view.middleGroup.findAll((el) => {
      return el.get('name') === 'point';
    });
    expect(pointShapes.length).toBe(60);
    expect(pointShapes[0].attr('strokeOpacity')).toBe(1);
    expect(pointShapes[1].attr('fillOpacity')).toBe(1);
    expect(pointShapes[2].attr('opacity')).toBe(0.5);
  });
});
