import { Chart } from '@antv/g2';
import { DEFAULT_OPTIONS as lineDft } from '../../../../src/plots/line/constants';
import { DEFAULT_OPTIONS as columnDft } from '../../../../src/plots/column/constants';
import { DEFAULT_OPTIONS as barDft } from '../../../../src/plots/bar/constants';
import { DEFAULT_OPTIONS as areaDft } from '../../../../src/plots/area/constants';
import { execPlotAdaptor } from '../../../../src/plots/multi-view/utils';
import { createDiv } from '../../../utils/dom';

describe('utils', () => {
  const options = {
    data: [
      { x: '1', y: 2 },
      { x: '2', y: 1 },
    ],
    xField: 'x',
    yField: 'y',
    point: {},
  };
  it('exec-adaptor: normal line', () => {
    const chart = new Chart({ container: createDiv(), width: 200, height: 400 });
    execPlotAdaptor('line', chart, options);
    chart.render();

    expect(chart.geometries.length).toBe(2);
    expect(chart.geometries[0].elements.length).toBe(1);
    expect(chart.geometries[1].elements.length).toBe(2);

    // defaultOptions
    expect(chart.getOptions().tooltip).toMatchObject(lineDft.tooltip);
  });

  it('exec-adaptor: normal pie', () => {
    const chart = new Chart({ container: createDiv(), width: 200, height: 400 });
    execPlotAdaptor('pie', chart, {
      data: [
        { x: '1', y: 2 },
        { x: '2', y: 1 },
      ],
      angleField: 'y',
      colorField: 'x',
    });

    chart.render();

    expect(chart.geometries.length).toBe(1);
    expect(chart.geometries[0].elements.length).toBe(2);
    expect(chart.getCoordinate().isPolar).toBe(true);

    // defaultOptions
    // @ts-ignore
    expect(chart.getOptions().tooltip.showMarkers).toBe(false);
  });

  it('default options', () => {
    const chart = new Chart({ container: createDiv(), width: 200, height: 400 });
    execPlotAdaptor('column', chart, options);
    chart.render();

    expect(chart.getOptions().tooltip).toMatchObject(columnDft.tooltip);

    chart.clear();
    execPlotAdaptor('bar', chart, options);
    chart.render();

    expect(chart.getOptions().tooltip).toMatchObject(barDft.tooltip);

    chart.clear();
    execPlotAdaptor('area', chart, options);
    chart.render();

    expect(chart.getOptions().tooltip).toMatchObject(areaDft.tooltip);

    execPlotAdaptor('area', chart, { ...options, tooltip: false });
    chart.render();
    expect(chart.getOptions().tooltip).toBe(false);
  });

  it('exec-adaptor: innoraml', () => {
    const chart = new Chart({ container: createDiv(), width: 200, height: 400 });
    // @ts-ignore 不支持 xxx
    execPlotAdaptor('xxx', chart, options);

    chart.render();

    expect(chart.geometries.length).toBe(0);
  });

  it('exec-adaptor: 不支持再引入 multi-view', () => {
    const chart = new Chart({ container: createDiv(), width: 200, height: 400 });
    // @ts-ignore 不支持 multi-view
    execPlotAdaptor('multi-view', chart, options);

    chart.render();
    expect(chart.geometries.length).toBe(0);
  });
});
