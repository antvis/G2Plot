import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('change data', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['blue', 'red'],
      appendPadding: 10,
      connectNulls: true,
    });

    line.render();

    expect(line.chart.geometries[0].elements.length).toBe(1);

    line.changeData(partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)));
    expect(line.chart.geometries[0].elements.length).toBe(2);
    expect(line.options.data).toEqual(partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)));

    line.destroy();
  });

  it('add point', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: [
        { type: '1', value: 10 },
        { type: '2', value: 3 },
      ],
      xField: 'type',
      yField: 'value',
      point: {},
    });

    line.render();
    expect(line.chart.geometries[1].elements.length).toBe(2);

    line.changeData([...line.options.data, { type: '3', value: 10 }]);
    expect(line.chart.geometries[1].elements.length).toBe(3);

    line.destroy();
  });
});
