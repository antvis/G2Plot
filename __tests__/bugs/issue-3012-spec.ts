import { Bar } from '../../src';
import { delay } from '../utils/delay';
import { createDiv } from '../utils/dom';

describe('#3012', () => {
  it('basic bar', async () => {
    const data = [
      { year: '1951 年', value: 38 },
      { year: '1952 年', value: 52 },
      { year: '1956 年', value: 61 },
      { year: '1957 年', value: 145 },
      { year: '1958 年', value: 48 },
    ];

    const bar = new Bar(createDiv(), {
      data,
      xField: 'value',
      yField: 'year',
      seriesField: 'year',
      legend: {
        position: 'top-left',
      },
    });

    bar.render();
    const legendItems = bar.chart.getController('legend').getComponents()[0].component.get('items');
    expect(legendItems.length).toBe(data.length);
    expect(legendItems[0].name).toBe(data[0].year);

    const tooltipController = bar.chart.getController('tooltip');
    const box = bar.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    await delay(80);
    bar.chart.showTooltip(point);
    await delay(100);

    const items = tooltipController.getTooltipItems(point);
    expect(items[0].name).toBe(data[0].year);

    bar.destroy();
  });

  it('group bar & stack bar', async () => {
    const data = [
      {
        label: 'Mon.',
        type: 'series1',
        value: 2800,
      },
      {
        label: 'Mon.',
        type: 'series2',
        value: 2260,
      },
      {
        label: 'Tues.',
        type: 'series1',
        value: 1800,
      },
      {
        label: 'Tues.',
        type: 'series2',
        value: 1300,
      },
      {
        label: 'Wed.',
        type: 'series1',
        value: 950,
      },
      {
        label: 'Wed.',
        type: 'series2',
        value: 900,
      },
      {
        label: 'Thur.',
        type: 'series1',
        value: 500,
      },
      {
        label: 'Thur.',
        type: 'series2',
        value: 390,
      },
      {
        label: 'Fri.',
        type: 'series1',
        value: 170,
      },
      {
        label: 'Fri.',
        type: 'series2',
        value: 100,
      },
    ];

    const bar = new Bar(createDiv(), {
      data,
      isGroup: true,
      xField: 'value',
      yField: 'label',
      seriesField: 'type',
      legend: {
        position: 'top-left',
      },
    });

    bar.render();
    let legendItems = bar.chart.getController('legend').getComponents()[0].component.get('items');
    expect(legendItems.length).toBe(2);
    expect(legendItems[0].name).toBe('series1');
    expect(legendItems[1].name).toBe('series2');

    const tooltipController = bar.chart.getController('tooltip');
    let box = bar.chart.geometries[0].elements[0].shape.getBBox();
    let point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    await delay(80);
    bar.chart.showTooltip(point);
    await delay(100);

    let items = tooltipController.getTooltipItems(point);
    expect(items[0].name).toBe('series1');
    expect(items[1].name).toBe('series2');

    bar.update({ isGroup: false, isStack: true });
    legendItems = bar.chart.getController('legend').getComponents()[0].component.get('items');
    expect(legendItems.length).toBe(2);
    expect(legendItems[0].name).toBe('series1');
    expect(legendItems[1].name).toBe('series2');

    box = bar.chart.geometries[0].elements[0].shape.getBBox();
    point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    await delay(80);
    bar.chart.showTooltip(point);
    await delay(100);

    items = tooltipController.getTooltipItems(point);
    expect(items[0].name).toBe('series1');
    expect(items[1].name).toBe('series2');

    bar.destroy();
  });
});
