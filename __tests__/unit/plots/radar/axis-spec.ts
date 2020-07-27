import { Chart } from '@antv/g2';
import { Radar } from '../../../../src';
import { SINGLE_DATA, SERIES_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar axis 设置', () => {
  function getAxes(chart: Chart) {
    return chart.getComponents().filter((co) => co.type === 'axis');
  }

  it('xField*yField & meta 设置', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SINGLE_DATA,
      xField: 'name',
      yField: 'value',
      radius: 0.8,
      meta: {
        value: {
          alias: '金额',
          min: 0,
          max: 1000,
          formatter: (v) => `${v} 元`,
        },
      },
    });

    radar.render();
    const geometry = radar.chart.geometries[0];
    expect(geometry.elements.length).toBe(1);

    expect(radar.chart.getScaleByField('value').alias).toBe('金额');
    expect(geometry.scales.value.min).toBe(0);
    expect(geometry.scales.value.max).toBe(1000);

    const ticks = getAxes(radar.chart)[1].component.get('ticks');
    const scaleTicks = geometry.scales.value.ticks;
    expect(ticks[0].name).toBe(`${scaleTicks[0]} 元`);
    expect(ticks[1].name).toBe(`${scaleTicks[1]} 元`);
  });

  it('xField*yField*seriesField & axis 设置', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        label: {
          style: {
            fill: 'red',
          },
        },
        grid: {
          line: {
            style: {
              lineWidth: 0,
            },
          },
        },
      },
      yAxis: {
        tickCount: 4,
      },
      radius: 0.8,
      tooltip: {
        shared: true,
      },
    });

    radar.render();
    expect(radar.chart).toBeDefined();
    expect(radar.chart.geometries.length).toBe(1);
    expect(radar.chart.geometries[0].elements.length).toBe(2);

    const xAxes = getAxes(radar.chart)[0];
    const yAxes = getAxes(radar.chart)[1];
    expect(xAxes.component.get('label').style.fill).toBe('red');
    expect(xAxes.component.get('grid').line.style.lineWidth).toBe(0);
    expect(yAxes.component.get('ticks').length).toBe(3);
    expect(yAxes.component.get('tickCount')).toBe(4);
  });
});
