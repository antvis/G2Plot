import { Bar, BarOptions, Column, ColumnOptions } from '../../../src';
import { createDiv } from '../../utils/dom';

const DATA = [
  { year: '2014', type: 'Sales', sales: 1000 },
  { year: '2015', type: 'Sales', sales: 1170 },
  { year: '2016', type: 'Sales', sales: 660 },
  { year: '2017', type: 'Sales', sales: 1030 },
  { year: '2014', type: 'Expenses', sales: 400 },
  { year: '2015', type: 'Expenses', sales: 460 },
  { year: '2016', type: 'Expenses', sales: 1120 },
  { year: '2017', type: 'Expenses', sales: 540 },
  { year: '2014', type: 'Profit', sales: 300 },
  { year: '2015', type: 'Profit', sales: 300 },
  { year: '2016', type: 'Profit', sales: 300 },
  { year: '2017', type: 'Profit', sales: 350 },
];

describe('column connected area', () => {
  const options: ColumnOptions = {
    data: DATA,
    autoFit: false,
    width: 600,
    height: 400,
    xField: 'year',
    yField: 'sales',
    seriesField: 'type',
    isStack: true,
    yAxis: {
      nice: true,
    },
    connectedArea: {},
  };
  const plot = new Column(createDiv(), options);

  it('render', () => {
    plot.render();
    const hover = plot.chart.interactions['__interval-connected-area-hover__'];
    const click = plot.chart.interactions['__interval-connected-area-click__'];
    expect(hover).toBeDefined();
    expect(click).toBeUndefined();
    // @ts-ignore
    expect(hover.cfg.start).toHaveLength(1);
    // @ts-ignore
    expect(hover.cfg.start[0]).toMatchObject({
      trigger: `interval:mouseenter`,
      action: ['element-highlight-by-color:highlight', 'element-link-by-color:link'],
    });
    // @ts-ignore
    expect(hover.cfg.end).toHaveLength(1);
    // @ts-ignore
    expect(hover.cfg.end[0]).toMatchObject({
      trigger: 'interval:mouseleave',
      action: ['element-highlight-by-color:reset', 'element-link-by-color:unlink'],
    });
  });

  it('update', () => {
    plot.update({
      ...options,
      connectedArea: {
        trigger: 'click',
      },
    });
    plot.render();
    const hover = plot.chart.interactions['__interval-connected-area-hover__'];
    const click = plot.chart.interactions['__interval-connected-area-click__'];
    expect(hover).toBeUndefined();
    expect(click).toBeDefined();
    // @ts-ignore
    expect(click.cfg.start).toHaveLength(1);
    // @ts-ignore
    expect(click.cfg.start[0]).toMatchObject({
      trigger: `interval:click`,
      action: [
        'element-highlight-by-color:clear',
        'element-highlight-by-color:highlight',
        'element-link-by-color:clear',
        'element-link-by-color:unlink',
        'element-link-by-color:link',
      ],
    });
    // @ts-ignore
    expect(click.cfg.end).toHaveLength(1);
    // @ts-ignore
    expect(click.cfg.end[0]).toMatchObject({
      trigger: 'document:mousedown',
      action: ['element-highlight-by-color:clear', 'element-link-by-color:clear'],
    });
  });

  it('off', () => {
    plot.update({
      ...options,
      connectedArea: false,
    });
    plot.render();
    const interaction = plot.chart.interactions['__interval-connected-area-hover__'];
    expect(interaction).toBeUndefined();
  });

  afterAll(() => {
    plot.destroy();
  });
});

describe('bar connected area', () => {
  const options: BarOptions = {
    data: DATA,
    autoFit: false,
    width: 600,
    height: 400,
    yField: 'year',
    xField: 'sales',
    seriesField: 'type',
    isStack: true,
    xAxis: {
      nice: true,
    },
    connectedArea: {},
  };
  const plot = new Bar(createDiv(), options);

  it('render', () => {
    plot.render();
    const hover = plot.chart.interactions['__interval-connected-area-hover__'];
    const click = plot.chart.interactions['__interval-connected-area-click__'];
    expect(hover).toBeDefined();
    expect(click).toBeUndefined();
    // @ts-ignore
    expect(hover.cfg.start).toHaveLength(1);
    // @ts-ignore
    expect(hover.cfg.start[0]).toMatchObject({
      trigger: `interval:mouseenter`,
      action: ['element-highlight-by-color:highlight', 'element-link-by-color:link'],
    });
    // @ts-ignore
    expect(hover.cfg.end).toHaveLength(1);
    // @ts-ignore
    expect(hover.cfg.end[0]).toMatchObject({
      trigger: 'interval:mouseleave',
      action: ['element-highlight-by-color:reset', 'element-link-by-color:unlink'],
    });
  });

  it('update', () => {
    plot.update({
      ...options,
      connectedArea: {
        trigger: 'click',
      },
    });
    plot.render();
    const hover = plot.chart.interactions['__interval-connected-area-hover__'];
    const click = plot.chart.interactions['__interval-connected-area-click__'];
    expect(hover).toBeUndefined();
    expect(click).toBeDefined();
    // @ts-ignore
    expect(click.cfg.start).toHaveLength(1);
    // @ts-ignore
    expect(click.cfg.start[0]).toMatchObject({
      trigger: `interval:click`,
      action: [
        'element-highlight-by-color:clear',
        'element-highlight-by-color:highlight',
        'element-link-by-color:clear',
        'element-link-by-color:unlink',
        'element-link-by-color:link',
      ],
    });
    // @ts-ignore
    expect(click.cfg.end).toHaveLength(1);
    // @ts-ignore
    expect(click.cfg.end[0]).toMatchObject({
      trigger: 'document:mousedown',
      action: ['element-highlight-by-color:clear', 'element-link-by-color:clear'],
    });
  });

  it('off', () => {
    plot.update({
      ...options,
      connectedArea: false,
    });
    plot.render();
    const interaction = plot.chart.interactions['__interval-connected-area-hover__'];
    expect(interaction).toBeUndefined();
  });

  afterAll(() => {
    plot.destroy();
  });
});
