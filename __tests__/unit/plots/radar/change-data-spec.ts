import { Radar } from '../../../../src';
import { SINGLE_DATA, SERIES_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar changeData', () => {
  it('changeData: noraml', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SINGLE_DATA,
      xField: 'name',
      yField: 'value',
      radius: 0.8,
    });

    radar.render();
    expect(radar.chart.geometries[0].type).toEqual('line');
    expect(radar.chart.geometries[0].data).toEqual(SINGLE_DATA);

    const newData = [...SINGLE_DATA, { name: '新加测试点', value: 10000 }];
    radar.changeData(newData);
    expect(radar.chart.geometries[0].data).toEqual(newData);
    expect(radar.options.data).toEqual(newData);

    radar.destroy();
  });

  it('changeData: from empty to have data', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: [],
      xField: 'name',
      yField: 'value',
      radius: 0.8,
    });

    radar.render();

    radar.changeData(SINGLE_DATA);
    expect(radar.chart.geometries[0].data).toEqual(SINGLE_DATA);
    expect(radar.options.data).toEqual(SINGLE_DATA);

    radar.destroy();
  });
});
