import { DualAxes } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { MultipleData, LineData } from '../../../data/common';

const columnData2 = [
  { name: 'London', month: 'Jan.', value: 12.9, type: 'type1' },
  { name: 'Berlin', month: 'Jan.', value: 12.4, type: 'type2' },
  { name: 'beijing', month: 'Jan.', value: 12.4, type: 'type3' },
  { name: 'London', month: 'Feb.', value: 2.9, type: 'type1' },
  { name: 'Berlin', month: 'Feb.', value: 32.4, type: 'type2' },
  { name: 'beijing', month: 'Feb.', value: 42.4, type: 'type3' },
  { name: 'London', month: 'wed.', value: 2.9, type: 'type1' },
  { name: 'Berlin', month: 'wed.', value: 32.4, type: 'type2' },
  { name: 'beijing', month: 'wed.', value: 42.4, type: 'type3' },
];

const color = [
  '#5B8FF9',
  '#CDDDFD',
  '#5AD8A6',
  '#CDF3E4',
  '#5D7092',
  '#CED4DE',
  '#F6BD16',
  '#FCEBB9',
  '#6F5EF9',
  '#D3CEFD',
  '#6DC8EC',
  '#D3EEF9',
  '#945FB9',
  '#DECFEA',
  '#FF9845',
  '#FFE0C7',
  '#1E9493',
  '#BBDEDE',
  '#FF99C3',
  '#FFE0ED',
];

describe('column line', () => {
  it('stack column and stack line', () => {
    const dualAxes = new DualAxes(createDiv('stack column and stack line'), {
      height: 500,
      data: [MultipleData, LineData],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          isStack: true,
          seriesField: 'type',
          groupField: 'name',
          color: color,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          isStack: true,
          color: color.reverse(),
          smooth: true,
        },
      ],
      tooltip: false,
    });

    dualAxes.render();
    // @ts-ignore
    const column = dualAxes.chart.views[0].geometries[0].adjusts;
    // @ts-ignore
    const line = dualAxes.chart.views[1].geometries[0].adjusts;
    expect(column.dodge.dodgeBy).toBe('name');
    expect(column.stack.xField).toBe('month');
    expect(line.stack.xField).toBe('month');
    dualAxes.destroy();
  });

  it('stack column and series line', () => {
    const dualAxes = new DualAxes(createDiv('stack column and series line'), {
      height: 500,
      data: [MultipleData, LineData],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          isStack: true,
          seriesField: 'type',
          groupField: 'name',
          color: color,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: color.reverse(),
          smooth: true,
        },
      ],
      tooltip: false,
    });

    dualAxes.render();
    // @ts-ignore
    const column = dualAxes.chart.views[0].geometries[0].adjusts;
    // @ts-ignore
    const line = dualAxes.chart.views[1].geometries[0].adjusts;
    expect(column.dodge.dodgeBy).toBe('name');
    expect(column.stack.xField).toBe('month');
    expect(line.stack).toBeUndefined();
    dualAxes.destroy();
  });

  it('group column and series line', () => {
    const dualAxes = new DualAxes(createDiv('group column and series line'), {
      height: 500,
      data: [columnData2, LineData],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'type',
          color: color,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: color.reverse(),
          smooth: true,
        },
      ],
      tooltip: false,
    });
    dualAxes.render();
    // @ts-ignore
    const column = dualAxes.chart.views[0].geometries[0].adjusts;
    // @ts-ignore
    const line = dualAxes.chart.views[1].geometries[0].adjusts;
    expect(column.dodge.dodgeBy).toBe('type');
    expect(column.stack).toBeUndefined();
    expect(line.stack).toBeUndefined();
    dualAxes.destroy();
  });

  it('group column and stack line', () => {
    const dualAxes = new DualAxes(createDiv('group column and stack line'), {
      height: 500,
      data: [columnData2, LineData],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'name',
          color: color,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: color.reverse(),
          smooth: true,
        },
      ],
      tooltip: false,
    });

    dualAxes.render();
    // @ts-ignore
    const column = dualAxes.chart.views[0].geometries[0].adjusts;
    // @ts-ignore
    const line = dualAxes.chart.views[1].geometries[0].adjusts;
    expect(column.dodge.dodgeBy).toBe('name');
    expect(column.stack).toBeUndefined();
    expect(line.stack).toBeUndefined();
    dualAxes.destroy();
  });

  it('group column', () => {
    const dualAxes = new DualAxes(createDiv('group column'), {
      height: 500,
      data: [columnData2, []],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'type',
          color: color,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          groupField: 'type',
          color: color.reverse(),
          smooth: true,
        },
      ],
      tooltip: false,
    });

    dualAxes.render();
    // @ts-ignore
    const column = dualAxes.chart.views[0].geometries[0].adjusts;
    const lineGeometries = dualAxes.chart.views[1].geometries;
    expect(column.dodge.dodgeBy).toBe('type');
    expect(column.stack).toBeUndefined();
    expect(lineGeometries.length).toBe(1);
    expect(lineGeometries[0].data.length).toBe(0);
    dualAxes.destroy();
  });

  it('stack column', () => {
    const dualAxes = new DualAxes(createDiv('stack column'), {
      height: 500,
      data: [MultipleData, []],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          isStack: true,
          seriesField: 'type',
          groupField: 'name',
          color: color,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          groupField: 'type',
          color: color.reverse(),
          smooth: true,
        },
      ],
      tooltip: false,
    });

    dualAxes.render();
    const legendController = dualAxes.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0];
    const cfgItems = legendComponent.component.cfg.items;
    expect(cfgItems.length).toBe(8);
    // @ts-ignore
    const column = dualAxes.chart.views[0].geometries[0].adjusts;
    const lineGeometries = dualAxes.chart.views[1].geometries;
    expect(column.dodge.dodgeBy).toBe('name');
    expect(column.stack.xField).toBe('month');
    expect(lineGeometries.length).toBe(1);
    expect(lineGeometries[0].data.length).toBe(0);
    dualAxes.destroy();
  });

  it('stack line', () => {
    const dualAxes = new DualAxes(createDiv('stack line'), {
      height: 500,
      data: [[], LineData],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          isStack: true,
          seriesField: 'type',
          groupField: 'name',
          color: color,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: color.reverse(),
          smooth: true,
        },
      ],
      tooltip: false,
    });

    dualAxes.render();
    const legendController = dualAxes.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0];
    const cfgItems = legendComponent.component.cfg.items;
    expect(cfgItems.length).toBe(3);
    const columnGeometries = dualAxes.chart.views[0].geometries;
    // @ts-ignore
    const line = dualAxes.chart.views[1].geometries[0].adjusts;
    expect(line.stack).toBeUndefined();
    expect(columnGeometries.length).toBe(1);
    expect(columnGeometries[0].data.length).toBe(0);
    dualAxes.destroy();
  });
});
