import { Line } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1757', () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  it('line line.tooltip.formatter', () => {
    const line = new Line(createDiv('formatter'), {
      data,
      height: 500,
      width: 600,
      xField: 'year',
      yField: 'value',
      label: {},
      point: {
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#2593fc',
          lineWidth: 2,
        },
      },
      tooltip: {
        formatter: (datum) => ({ name: datum.year, value: '123' }),
      },
    });

    line.render();
    // 初始化，默认激活最后一条数据
    const geometry = line.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();
    line.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(document.getElementsByClassName('g2-tooltip-title')[0]).not.toBeUndefined();
    // @ts-ignore
    expect(document.getElementsByClassName('g2-tooltip-title')[0].style['margin-top']).toBe('12px');
    expect(line.chart.geometries[1].elements[0].container.getChildByIndex(0).attr('stroke')).toBe('#2593fc');
    line.destroy();
  });
});
