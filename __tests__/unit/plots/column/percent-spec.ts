import { Column } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';
const data = [
  { country: 'Europe', year: '1750', value: 163 },
  { country: 'Europe', year: '1800', value: 203 },
  { country: 'Europe', year: '1850', value: 276 },
  { country: 'Europe', year: '1900', value: 408 },
  { country: 'Europe', year: '1950', value: 547 },
  { country: 'Europe', year: '1999', value: 729 },
  { country: 'Europe', year: '2050', value: 628 },
  { country: 'Europe', year: '2100', value: 828 },
  { country: 'Asia', year: '1750', value: 502 },
  { country: 'Asia', year: '1800', value: 635 },
  { country: 'Asia', year: '1850', value: 809 },
  { country: 'Asia', year: '1900', value: 947 },
  { country: 'Asia', year: '1950', value: 1402 },
  { country: 'Asia', year: '1999', value: 3634 },
  { country: 'Asia', year: '2050', value: 5268 },
  { country: 'Asia', year: '2100', value: 7268 },
];

describe('column percent', () => {
  it('percent: render', async () => {
    const column = new Column(createDiv('percent', document.body, 'culumn-percent-render'), {
      width: 400,
      height: 300,
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      isStack: true,
      isPercent: true,
      label: {
        position: 'middle',
        content: (item) => {
          return item.value.toFixed(2);
        },
        style: {
          fill: '#fff',
        },
      },
      animation: false,
    });

    column.render();
    await delay(300);
    const geometry = column.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();
    column.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    const box = document.getElementById('culumn-percent-render');
    expect(box.getElementsByClassName('g2-tooltip-title')[0].innerHTML).toBe('2100');
    const {
      // @ts-ignore
      labelOption: { cfg },
    } = geometry;
    expect(labelGroups.length).toBe(16);
    expect(cfg.style).toEqual({
      fill: '#fff',
    });
    expect(cfg.position).toBe('middle');
    expect(cfg.content).not.toBeUndefined();
    column.destroy();
  });
  it('percent: custom content', async () => {
    const column = new Column(createDiv('percent', document.body, 'culumn-percent'), {
      width: 400,
      height: 300,
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      isStack: true,
      isPercent: true,
      label: {
        position: 'middle',
        content: (item) => {
          return item.value.toFixed(2);
        },
        style: {
          fill: '#fff',
        },
      },
      tooltip: {
        customContent: () => {
          return '<div class="tooltip-class">123</div>';
        },
      },
    });

    column.render();
    await delay(300);
    const geometry = column.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();
    column.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    const box = document.getElementById('culumn-percent');
    expect(box.getElementsByClassName('g2-tooltip-title')[1]).toBeUndefined();
    expect(box.getElementsByClassName('tooltip-class')[0].innerHTML).toBe('123');
    column.destroy();
  });
  it('percent: custom tooltip formatter', () => {
    const column = new Column(createDiv('percent', undefined, 'percent'), {
      width: 400,
      height: 300,
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      isStack: true,
      isPercent: true,
      tooltip: {
        formatter: () => ({
          name: 'test',
          value: '123',
        }),
      },
    });

    column.render();
    const geometry = column.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();
    column.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(document.querySelectorAll('#percent .g2-tooltip-list-item .g2-tooltip-name')[0].innerHTML).toBe('test');
    expect(document.querySelectorAll('#percent .g2-tooltip-list-item .g2-tooltip-value')[0].innerHTML).toBe('123');
  });
});
