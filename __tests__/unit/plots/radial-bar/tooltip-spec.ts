import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { Datum } from '../../../../src/types';
import { antvStar } from '../../../data/antv-star';

const xField = 'name';
const yField = 'star';

describe('radial-bar tooltip', () => {
  const formatter = (datum: Datum) => {
    return { name: 'star', value: datum.percent * 100 + '%' };
  };
  it('tooltip default', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      tooltip: {
        formatter,
      },
    });
    bar.render();
    // @ts-ignore
    const tooltip = bar.chart.options.tooltip;
    // @ts-ignore
    expect(tooltip.showMarkers).toBe(false);
    // @ts-ignore
    expect(tooltip.title).toBe(xField);
    // @ts-ignore
    expect(tooltip.formatter).toBe(formatter);
  });
});
