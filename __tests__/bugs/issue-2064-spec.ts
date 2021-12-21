import { Line, Area, Radar } from '../../src';
import { findGeometry, getAllGeometriesRecursively } from '../../src/utils';
import { createDiv } from '../utils/dom';

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
  function getPointGeom(plot: Line) {
    return getAllGeometriesRecursively(plot.chart).find((g) => g.type === 'point');
  }
  it('#2064 line', () => {
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

    expect(line.labelsContainer.getChildren()).toHaveLength(data.length);
    expect(getPointGeom(plot).labelsContainer.getChildren()).toHaveLength(0);

    plot.destroy();
  });

  it('#2064 area', () => {
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
    const point = findGeometry(plot.chart, 'point');

    expect(area.labelsContainer.getChildren()).toHaveLength(data.length);
    expect(line.labelsContainer.getChildren()).toHaveLength(0);
    expect(point.labelsContainer.getChildren()).toHaveLength(0);

    plot.destroy();
  });

  it('#2064 radar', () => {
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
    const point = findGeometry(plot.chart, 'point');

    expect(area.labelsContainer.getChildren()).toHaveLength(0);
    expect(line.labelsContainer.getChildren()).toHaveLength(data.length);
    expect(point.labelsContainer.getChildren()).toHaveLength(0);

    plot.destroy();
  });
});
