import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';
import { getPoint } from './point-spec';

describe('line', () => {
  it('stack line', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['blue', 'red'],
      point: {},
      appendPadding: 10,
      connectNulls: true,
    });

    line.render();

    expect(line.options.isStack).toBe(false);
    expect(line.chart.geometries[0].getAdjust('stack')).toBeUndefined();

    line.update({
      ...line.options,
      isStack: true,
    });
    expect(line.options.isStack).toBe(true);

    expect(line.chart.geometries[0].type).toBe('line');
    expect(line.chart.geometries[0].getAdjust('stack')).toBeDefined();

    const point = getPoint(line);
    expect(point.type).toBe('point');
    expect(point.getAdjust('stack')).toBeDefined();

    // @ts-ignore
    expect(line.chart.getOptions().legends.type.position).toBe('top-left');

    line.destroy();
  });
});
