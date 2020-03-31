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

  it('bubble point opacity', () => {
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

    let view = bubblePlot.getLayer().view;
    let pointShapes = view.middleGroup.findAll((el) => {
      return el.get('name') === 'point';
    });
    expect(pointShapes.length).toBe(60);
    expect(pointShapes[0].attr('strokeOpacity')).toBe(1);
    expect(pointShapes[1].attr('fillOpacity')).toBe(0.5);

    bubblePlot.updateConfig({
      pointStyle: {
        opacity: 0.8,
      },
    });
    bubblePlot.render();

    view = bubblePlot.getLayer().view;
    pointShapes = view.middleGroup.findAll((el) => {
      return el.get('name') === 'point';
    });
    expect(pointShapes[0].attr('strokeOpacity')).toBe(1);
    expect(pointShapes[1].attr('fillOpacity')).toBe(0.8);
    expect(pointShapes[2].attr('opacity')).toBe(0.8);
  });

  it('bubble point fill === stroke', () => {
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

    for (let i = 0; i < pointShapes.length; i++) {
      expect(pointShapes[i].attr('fill')).toBe(pointShapes[i].attr('stroke'));
    }
  });

  it('bubble point opacity', () => {
    const bubblePlot = new Bubble(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      colorField: 'continent',
      sizeField: 'Population',
      pointStyle: {
        stroke: '#777777',
      },
    });
    bubblePlot.render();

    const view = bubblePlot.getLayer().view;

    const pointShapes = view.middleGroup.findAll((el) => {
      return el.get('name') === 'point';
    });
    expect(pointShapes.length).toBe(60);

    for (let i = 0; i < pointShapes.length; i++) {
      expect(pointShapes[i].attr('fill') === pointShapes[i].attr('stroke')).toBe(false);
      expect(pointShapes[i].attr('stroke')).toBe('#777777');
    }
  });

  it('bubble point label', () => {
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

    const labelShapes = view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'label';
    });
    labelShapes.forEach((label) => {
      // @ts-ignore
      expect(label.cfg.children[0].attr('lineWidth')).toBe(2);
      // @ts-ignore
      expect(label.cfg.children[0].attr('stroke')).toBe('#fff');
    });
  });
});
