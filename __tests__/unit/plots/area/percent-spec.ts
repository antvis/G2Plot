import { Area } from '../../../../src';
import { percentData } from '../../../data/area';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('percent area', () => {
    const area = new Area(createDiv('percent*area', document.body, 'percent_container'), {
      width: 400,
      height: 300,
      data: percentData,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      color: ['#82d1de', '#cb302d', '#e3ca8c'],
      areaStyle: {
        fillOpacity: 0.7,
      },
      appendPadding: 10,
      isPercent: true,
      yAxis: {
        label: {
          formatter: (value) => {
            // @ts-ignore
            return value * 100;
          },
        },
      },
    });

    area.render();

    // render
    expect(area.options.isPercent).toBe(true);
    expect(area.chart.geometries[0].getAdjust('stack')).toBeDefined();
    // tranform data
    const { data } = area.chart.getOptions();
    const percentItem = data.find((item) => item.country === 'Asia' && item.year === '1750');
    expect(percentItem.value).toBe(0.6);
    // tooltip formatter
    const geometry = area.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();
    area.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    const box = document.getElementById('percent_container');
    expect(box.getElementsByClassName('g2-tooltip-value')[0].innerHTML.indexOf('%') !== -1).toBeTruthy();
    area.update({
      isPercent: false,
    });
    expect(area.options.isPercent).toBe(false);
    const { data: currenData } = area.chart.getOptions();
    expect(currenData[0].g2plot_percent).toBeUndefined();
    area.destroy();
  });
  it('percent area with no series field', () => {
    const area = new Area(createDiv('percent*area', document.body, 'percent_container'), {
      width: 400,
      height: 300,
      data: percentData,
      xField: 'year',
      yField: 'value',
      isPercent: true,
    });

    area.render();

    // render
    expect(area.options.isPercent).toBe(true);
    expect(area.chart.geometries[0].getAdjust('stack')).toBeUndefined();
    area.destroy();
  });
});
