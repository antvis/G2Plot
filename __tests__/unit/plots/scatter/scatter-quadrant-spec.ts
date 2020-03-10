import { Scatter } from '../../../../src';
import { CountryEconomy as data } from '../../../data/country-economy';
import Quadrant from '../../../../src/plots/scatter/components/quadrant';

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
    // @ts-ignore
    expect(plot.quadrant).toBeInstanceOf(Quadrant);
    scatterPlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('scatter quadrant visible', () => {
    const scatterPlot = new Scatter(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'GDP',
      yField: 'LifeExpectancy',
      pointSize: 5,
      colorField: 'continent',
      quadrant: {
        visible: false,
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
    expect(plot.quadrant).toBe(undefined);
    scatterPlot.destroy();
  });

  it('scatter quadrant update', () => {
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
    expect(plot.quadrant.quadrantGroups.length).toBe(4);
    // @ts-ignore
    expect(plot.quadrant.regionData.length).toBe(4);

    scatterPlot.updateConfig({
      quadrant: {
        yBaseline: 100,
      },
    });
    scatterPlot.render();

    // @ts-ignore
    expect(plot.quadrant.quadrantGroups.length).toBe(2);
    // @ts-ignore
    expect(plot.quadrant.regionData.length).toBe(2);
    // @ts-ignore
    expect(plot.quadrant.regionData[0].name).toBe('bottom-left');
    // @ts-ignore
    expect(plot.quadrant.regionData[1].name).toBe('bottom-right');

    scatterPlot.updateConfig({
      quadrant: {
        visible: false,
      },
    });
    scatterPlot.render();
    // @ts-ignore
    expect(plot.quadrant.container.destroyed).toBe(true);
    scatterPlot.destroy();
  });

  it('scatter quadrant region', () => {
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
        xBaseline: -200,
        yBaseline: 100,
        label: {
          text: ['第一象限', '第二象限', '第三象限', '第四象限'],
        },
      },
    });
    scatterPlot.render();

    let plot = scatterPlot.getLayer();
    let view = scatterPlot.getLayer().view;
    let labelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'quadrant-label';
    });
    // @ts-ignore
    expect(plot.quadrant.regionData.length).toBe(1);
    // @ts-ignore
    expect(plot.quadrant.regionData[0].name).toBe('bottom-right');
    expect(labelShapes.length).toBe(1);
    expect(labelShapes[0].attr('text')).toBe('第四象限');

    scatterPlot.updateConfig({
      quadrant: {
        xBaseline: -200,
        yBaseline: 75,
      },
    });
    scatterPlot.render();

    // @ts-ignore
    expect(plot.quadrant.regionData.length).toBe(2);
    // @ts-ignore
    expect(plot.quadrant.regionData[0].name).toBe('top-right');
    // @ts-ignore
    expect(plot.quadrant.regionData[1].name).toBe('bottom-right');

    scatterPlot.updateConfig({
      quadrant: {
        xBaseline: -200,
        yBaseline: -100,
      },
    });
    scatterPlot.render();
    plot = scatterPlot.getLayer();
    view = scatterPlot.getLayer().view;
    labelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'quadrant-label';
    });
    // @ts-ignore
    expect(plot.quadrant.regionData.length).toBe(1);
    // @ts-ignore
    expect(plot.quadrant.regionData[0].name).toBe('top-right');
    expect(labelShapes.length).toBe(1);
    expect(labelShapes[0].attr('text')).toBe('第三象限');

    scatterPlot.updateConfig({
      quadrant: {
        xBaseline: 20000,
        yBaseline: -100,
      },
    });
    scatterPlot.render();
    plot = scatterPlot.getLayer();
    view = scatterPlot.getLayer().view;
    labelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'quadrant-label';
    });
    // @ts-ignore
    expect(plot.quadrant.regionData.length).toBe(2);
    // @ts-ignore
    expect(plot.quadrant.regionData[0].name).toBe('top-left');
    // @ts-ignore
    expect(plot.quadrant.regionData[1].name).toBe('top-right');
    expect(labelShapes.length).toBe(2);
    expect(labelShapes[0].attr('text')).toBe('第一象限');
    expect(labelShapes[1].attr('text')).toBe('第三象限');
  });

  it('scatter quadrant region style', () => {
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
          { fill: 'blue', opacity: 0.001 },
          { fill: 'green', opacity: 1 },
          { fill: 'black', opacity: 0 },
        ],
      },
    });
    scatterPlot.render();

    let view = scatterPlot.getLayer().view;
    let regionShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'quadrant';
    });

    expect(regionShapes.length).toBe(4);
    expect(regionShapes[0].attr('fill')).toBe('blue');
    expect(regionShapes[0].attr('opacity')).toBe(0.001);
    expect(regionShapes[1].attr('fill')).toBe('green');
    expect(regionShapes[1].attr('opacity')).toBe(1);
    expect(regionShapes[2].attr('fill')).toBe('black');
    expect(regionShapes[2].attr('opacity')).toBe(0);
    expect(regionShapes[3].attr('fill')).toBe('#000000');
    expect(regionShapes[3].attr('opacity')).toBe(0.05);

    scatterPlot.updateConfig({
      quadrant: {
        regionStyle: [
          { fill: 'blue', opacity: 0.001 },
          undefined,
          { fill: 'green', opacity: 1 },
          { fill: 'black', opacity: 0 },
        ],
      },
    });
    scatterPlot.render();

    view = scatterPlot.getLayer().view;
    regionShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'quadrant';
    });

    expect(regionShapes.length).toBe(4);
    expect(regionShapes[0].attr('fill')).toBe('blue');
    expect(regionShapes[0].attr('opacity')).toBe(0.001);
    expect(regionShapes[1].attr('fill')).toBe('#ffffff');
    expect(regionShapes[1].attr('opacity')).toBe(0);
    expect(regionShapes[2].attr('fill')).toBe('green');
    expect(regionShapes[2].attr('opacity')).toBe(1);
    expect(regionShapes[3].attr('fill')).toBe('black');
    expect(regionShapes[3].attr('opacity')).toBe(0);
  });

  it('scatter quadrant region function', () => {
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
        regionStyle: (d) => {
          if (d.name === 'top-left') {
            return { fill: 'red' };
          } else if (d.name === 'bottom-left') {
            return { fill: 'blue' };
          } else if (d.name === 'top-right') {
            return { fill: 'black' };
          }
          return { fill: 'white' };
        },
      },
    });
    scatterPlot.render();

    const view = scatterPlot.getLayer().view;
    const regionShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'quadrant';
    });

    expect(regionShapes.length).toBe(4);
    expect(regionShapes[0].attr('fill')).toBe('red');
    expect(regionShapes[1].attr('fill')).toBe('blue');
    expect(regionShapes[2].attr('fill')).toBe('black');
    expect(regionShapes[3].attr('fill')).toBe('white');
  });

  it('scatter quadrant text', () => {
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
        label: {
          text: ['第二象限', '第三象限', '第一象限', '第四象限'],
        },
      },
    });
    scatterPlot.render();

    let view = scatterPlot.getLayer().view;
    let labelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'quadrant-label';
    });

    expect(labelShapes.length).toBe(4);
    expect(labelShapes[0].attr('text')).toBe('第二象限');
    expect(labelShapes[1].attr('text')).toBe('第三象限');
    expect(labelShapes[2].attr('text')).toBe('第一象限');
    expect(labelShapes[3].attr('text')).toBe('第四象限');

    scatterPlot.updateConfig({
      quadrant: {
        label: {
          text: (d) => {
            if (d.name === 'top-left') {
              return 'top-left';
            } else if (d.name === 'bottom-left') {
              return 'bottom-left';
            } else if (d.name === 'top-right') {
              return 'top-right';
            }
            return 'bottom-right';
          },
        },
      },
    });
    scatterPlot.render();

    view = scatterPlot.getLayer().view;
    labelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'quadrant-label';
    });

    expect(labelShapes[0].attr('text')).toBe('top-left');
    expect(labelShapes[1].attr('text')).toBe('bottom-left');
    expect(labelShapes[2].attr('text')).toBe('top-right');
    expect(labelShapes[3].attr('text')).toBe('bottom-right');
  });
});
