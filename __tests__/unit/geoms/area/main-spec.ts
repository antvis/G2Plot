import { each, uniq } from '@antv/util';
import { StackedArea } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import sales from '../../../data/sales.json';
import subsales from '../../../data/subsales.json';
import { getGeometryShapes, getGeometryByType } from '../../../../src/util/view';
import { ORIGIN, COMPONENT_TYPE } from '../../../../src/dependents';

const COLORS = ['red', 'yellow', 'blue'];
const DATA: { area: string; sales: number }[] = sales;
const SERIES_DATA: { area: string; series: string; sales: number }[] = subsales;
const SERIES = uniq(subsales.map((datum) => datum.series));

describe('Area Main', () => {
  it('color /wo seriesField', () => {
    const plot = new StackedArea(createDiv(), {
      data: DATA,
      xField: 'area',
      yField: 'sales',
      stackField: '',
      color: COLORS,
    });
    plot.render();
    const view = plot.getView();
    const legends = view.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(0);
    const areas = getGeometryShapes(getGeometryByType(view, 'area'));
    expect(areas.length).toBe(1);
    expect(areas[0].attr('fill')).toBe(COLORS[0]);
    const lines = getGeometryShapes(getGeometryByType(view, 'line'));
    expect(lines.length).toBe(1);
    expect(lines[0].attr('stroke')).toBe(COLORS[0]);
  });

  it('color point /wo seriesField', () => {
    const plot = new StackedArea(createDiv(), {
      data: DATA,
      xField: 'area',
      yField: 'sales',
      stackField: '',
      color: COLORS,
      point: {
        visible: true,
      },
    });
    plot.render();
    const view = plot.getView();
    const legends = view.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(0);
    const areas = getGeometryShapes(getGeometryByType(view, 'area'));
    expect(areas.length).toBe(1);
    expect(areas[0].attr('fill')).toBe(COLORS[0]);
    const lines = getGeometryShapes(getGeometryByType(view, 'line'));
    expect(lines.length).toBe(1);
    expect(lines[0].attr('stroke')).toBe(COLORS[0]);
    const points = getGeometryShapes(getGeometryByType(view, 'point'));
    expect(points.length).toBe(DATA.length);
    each(points, (point) => {
      expect(point.attr('stroke')).toBe(COLORS[0]);
    });
  });

  it('color /w seriesField', () => {
    const plot = new StackedArea(createDiv(), {
      data: SERIES_DATA,
      xField: 'area',
      yField: 'sales',
      stackField: 'series',
      color: COLORS,
    });
    plot.render();
    const view = plot.getView();
    const legends = view.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);
    const areas = getGeometryShapes(getGeometryByType(view, 'area'));
    expect(areas.length).toBe(3);
    each(areas, (area, index) => {
      expect(area.attr('fill')).toBe(COLORS[index]);
    });
    const lines = getGeometryShapes(getGeometryByType(view, 'line'));
    expect(lines.length).toBe(3);
    each(lines, (line, index) => {
      expect(line.attr('stroke')).toBe(COLORS[index]);
    });
  });

  it('color point /w seriesField', () => {
    const plot = new StackedArea(createDiv(), {
      data: SERIES_DATA,
      xField: 'area',
      yField: 'sales',
      stackField: 'series',
      color: COLORS,
      point: {
        visible: true,
      },
    });
    plot.render();
    const view = plot.getView();
    const legends = view.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);
    const areas = getGeometryShapes(getGeometryByType(view, 'area'));
    expect(areas.length).toBe(3);
    each(areas, (area, index) => {
      expect(area.attr('fill')).toBe(COLORS[index]);
    });
    const lines = getGeometryShapes(getGeometryByType(view, 'line'));
    expect(lines.length).toBe(3);
    each(lines, (line, index) => {
      expect(line.attr('stroke')).toBe(COLORS[index]);
    });
    const points = getGeometryShapes(getGeometryByType(view, 'point'));
    expect(points.length).toBe(SERIES_DATA.length);
    each(points, (point) => {
      const data = point.get(ORIGIN).data;
      expect(point.attr('stroke')).toBe(COLORS[SERIES.indexOf(data.series)]);
    });
  });
});
