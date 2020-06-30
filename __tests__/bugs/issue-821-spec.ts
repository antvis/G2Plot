import { PercentStackedColumn } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1005', () => {
  const data = [
    {
      country: 'Asia',
      year: '1750',
      value: 0,
    },
    {
      country: 'Asia',
      year: '1800',
      value: 635,
    },
    {
      country: 'Asia',
      year: '1850',
      value: 809,
    },
    {
      country: 'Asia',
      year: '1900',
      value: 947,
    },
    {
      country: 'Asia',
      year: '1950',
      value: 1402,
    },
    {
      country: 'Asia',
      year: '1999',
      value: 3634,
    },
    {
      country: 'Asia',
      year: '2050',
      value: 5268,
    },
    {
      country: 'Africa',
      year: '1750',
      value: 0,
    },
    {
      country: 'Africa',
      year: '1800',
      value: 107,
    },
    {
      country: 'Africa',
      year: '1850',
      value: 111,
    },
    {
      country: 'Africa',
      year: '1900',
      value: 133,
    },
    {
      country: 'Africa',
      year: '1950',
      value: 221,
    },
    {
      country: 'Africa',
      year: '1999',
      value: 767,
    },
    {
      country: 'Africa',
      year: '2050',
      value: 1766,
    },
    {
      country: 'Europe',
      year: '1750',
      value: 0,
    },
    {
      country: 'Europe',
      year: '1800',
      value: 203,
    },
    {
      country: 'Europe',
      year: '1850',
      value: 276,
    },
    {
      country: 'Europe',
      year: '1900',
      value: 408,
    },
    {
      country: 'Europe',
      year: '1950',
      value: 547,
    },
    {
      country: 'Europe',
      year: '1999',
      value: 729,
    },
    {
      country: 'Europe',
      year: '2050',
      value: 628,
    },
  ];
  const plot = new PercentStackedColumn(createDiv(), {
    title: {
      visible: true,
      text: '百分比堆叠柱状图',
    },
    forceFit: true,
    data,
    xField: 'year',
    yField: 'value',
    stackField: 'country',
    color: ['#0f759c', '#26a2cb', '#65d1fc'],
  });
  plot.render();

  it('render', () => {
    const view = plot.getLayer().view;
    const element = view.geometries[0].elements[0];
    const bbox = element.getBBox();
    view.showTooltip({ x: bbox.minX + 10, y: bbox.minY + 10 });
    // tooltip
    expect(document.getElementsByClassName('g2-tooltip-value')[0].innerHTML).toBe('0.0%');
  });
});
