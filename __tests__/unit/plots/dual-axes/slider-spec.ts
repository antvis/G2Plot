import { DualAxes } from '../../../../src';
import { delay } from '../../../utils/delay';
import { PV_DATA_MULTI, UV_DATA_MULTI, uvBillData, transformData } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('slider', () => {
  it('type cat', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes doubal line'), {
      data: [PV_DATA_MULTI, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      limitInPlot: false,
      meta: {
        date: {
          sync: false,
        },
      },
      slider: {
        start: 0,
        end: 0.5,
      },
      padding: [20, 40, 60, 40],
      geometryOptions: [
        {
          geometry: 'column',
          seriesField: 'site',
          isStack: true,
        },
        {
          geometry: 'line',
          seriesField: 'site',
          isStack: true,
        },
      ],
    });

    dualAxes.render();
    expect(dualAxes.chart.views[0].getOptions().slider).toEqual({
      start: 0,
      end: 0.5,
    });
    expect(dualAxes.chart.getController('slider')).toBeDefined();
    expect(dualAxes.chart.views[0].getController('slider').getComponents().length).toBe(1);
    expect(dualAxes.chart.views[1].getController('slider').getComponents().length).toBe(0);
    const [slider] = dualAxes.chart.views[0].getComponents().filter((co) => co.type === 'slider');
    expect(slider.component.get('minText')).toBe('0601');
    dualAxes.destroy();
  });
  it('type time', async () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes doubal line'), {
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'line',
          seriesField: 'type',
          lineStyle: {
            lineWidth: 3,
            lineDash: [5, 5],
          },
          smooth: true,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          point: {},
        },
      ],
      limitInPlot: false,
      meta: {
        time: {
          type: 'time',
          sync: false,
        },
      },
      slider: {
        start: 0,
        end: 1,
      },
      padding: [20, 40, 60, 40],
    });

    dualAxes.render();
    expect(dualAxes.chart.views[0].getOptions().slider).toEqual({
      start: 0,
      end: 1,
    });
    expect(dualAxes.chart.getController('slider')).toBeDefined();
    expect(dualAxes.chart.views[0].getController('slider').getComponents().length).toBe(1);
    expect(dualAxes.chart.views[1].getController('slider').getComponents().length).toBe(0);
    const [slider] = dualAxes.chart.views[0].getComponents().filter((co) => co.type === 'slider');
    expect(slider.component.get('minText')).toBe('2019-03');
    dualAxes.update({
      meta: {
        time: {
          type: 'timeCat',
          sync: false,
        },
      },
    });

    expect(dualAxes.chart.views[0].getOptions().slider).toEqual({
      start: 0,
      end: 1,
    });
    expect(dualAxes.chart.getController('slider')).toBeDefined();
    dualAxes.changeData([uvBillData.slice(2, 8), transformData.slice(2, 8)]);
    const [changedSlider] = dualAxes.chart.views[0].getComponents().filter((co) => co.type === 'slider');
    expect(changedSlider.component.get('minText')).toBe('2019-05');
    dualAxes.update({
      slider: false,
    });
    await delay(500);
    console.log(dualAxes.chart.getController('slider'));
    expect(dualAxes.chart.views[0].getController('slider').getComponents().length).toBe(0);
    dualAxes.destroy();
  });
});
