import { Area } from '../../../../src';
import { getDataWhetherPercentage } from '../../../../src/utils/transform/percent';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('change data', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
    });

    area.render();

    expect(area.chart.geometries[0].elements.length).toBe(1);

    area.changeData(partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)));
    expect(area.chart.geometries[0].elements.length).toBe(2);
    expect(area.chart.geometries[1].elements.length).toBe(2);
    expect(area.options.data).toEqual(partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)));

    area.destroy();
  });

  it('add point', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: [
        { type: '1', value: 10 },
        { type: '2', value: 3 },
      ],
      xField: 'type',
      yField: 'value',
      line: null,
      point: {},
    });

    area.render();
    expect(area.chart.geometries[1].elements.length).toBe(2);

    area.changeData([...area.options.data, { type: '3', value: 10 }]);
    expect(area.chart.geometries[1].elements.length).toBe(3);

    area.destroy();
  });

  it('stacked percent area', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      isPercent: true,
    });

    area.render();

    expect(area.chart.geometries[0].elements.length).toBe(1);

    area.changeData(partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)));
    expect(area.chart.geometries[0].elements.length).toBe(2);
    expect(area.chart.geometries[1].elements.length).toBe(2);
    expect(area.options.data).toEqual(partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)));
    const { data, isPercent, xField, yField } = area.options;
    expect(area.chart.getData()).toEqual(getDataWhetherPercentage(data, yField, xField, yField, isPercent));

    area.destroy();
  });
});
