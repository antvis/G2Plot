import { Line, Area, Radar } from '../../src';
import { createDiv } from '../utils/dom';
import { delay } from '../utils/delay';

const data = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
];

describe('#2064', () => {
  it('#2064 line', async () => {
    const plot = new Line(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'type',
      yField: 'sales',
      point: {},
      label: {},
    });

    plot.render();

    const line = plot.chart.geometries.find((geom) => geom.type === 'line');
    const point = plot.chart.geometries.find((geom) => geom.type === 'point');
    await delay(0);
    expect(line.labelsContainer.getChildren()).toHaveLength(data.length);
    expect(point.labelsContainer.getChildren()).toHaveLength(0);

    plot.destroy();
  });

  it('#2064 area', async () => {
    const plot = new Area(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'type',
      yField: 'sales',
      line: {},
      point: {},
      label: {},
    });

    plot.render();

    const area = plot.chart.geometries.find((geom) => geom.type === 'area');
    const line = plot.chart.geometries.find((geom) => geom.type === 'line');
    const point = plot.chart.geometries.find((geom) => geom.type === 'point');
    await delay(0);

    expect(area.labelsContainer.getChildren()).toHaveLength(data.length);
    expect(line.labelsContainer.getChildren()).toHaveLength(0);
    expect(point.labelsContainer.getChildren()).toHaveLength(0);

    plot.destroy();
  });

  it('#2064 radar', async () => {
    const plot = new Radar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'type',
      yField: 'sales',
      area: {},
      point: {},
      label: {},
      radius: 0.8,
    });

    plot.render();

    const area = plot.chart.geometries.find((geom) => geom.type === 'area');
    const line = plot.chart.geometries.find((geom) => geom.type === 'line');
    const point = plot.chart.geometries.find((geom) => geom.type === 'point');
    await delay(0);

    expect(area.labelsContainer.getChildren()).toHaveLength(0);
    expect(line.labelsContainer.getChildren()).toHaveLength(data.length);
    expect(point.labelsContainer.getChildren()).toHaveLength(0);

    plot.destroy();
  });
});
