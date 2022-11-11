import { TinyArea, TinyColumn, TinyLine } from '../../src';
import { createDiv } from '../utils/dom';

const DATA = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
];

describe('#2021', () => {
  it('TinyLine', () => {
    const line = new TinyLine(createDiv(), {
      width: 400,
      height: 300,
      data: DATA,
    });

    line.render();

    expect(line.chart.getYScales()[0].min).toBe(0);

    line.update({
      yAxis: {
        max: 6000,
        min: 20,
      },
    });

    expect(line.chart.getYScales()[0].min).toBe(20);
    expect(line.chart.getYScales()[0].max).toBe(6000);

    line.destroy();
  });

  it('TinyArea', () => {
    const area = new TinyArea(createDiv(), {
      width: 400,
      height: 300,
      data: DATA,
    });

    area.render();

    expect(area.chart.getYScales()[0].min).toBe(0);

    area.update({
      yAxis: {
        max: 6000,
        min: 20,
      },
    });

    expect(area.chart.getYScales()[0].min).toBe(20);
    expect(area.chart.getYScales()[0].max).toBe(6000);

    area.destroy();
  });

  it('TinyColumn', () => {
    const column = new TinyColumn(createDiv(), {
      width: 400,
      height: 300,
      data: DATA,
    });

    column.render();

    expect(column.chart.getYScales()[0].min).toBe(0);

    column.update({
      yAxis: {
        max: 6000,
        min: 20,
      },
    });

    expect(column.chart.getYScales()[0].min).toBe(20);
    expect(column.chart.getYScales()[0].max).toBe(6000);

    column.destroy();
  });
});
