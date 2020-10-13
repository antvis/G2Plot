import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('Legend', () => {
  it('Legend default', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes doubal line'), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'line',
        },
        {
          geometry: 'line',
          seriesField: 'site',
        },
      ],
    });

    dualAxes.render();

    const legendController = dualAxes.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0];
    const cfg = legendComponent.component.cfg;

    expect(legendComponent.direction).toEqual('bottom');
    expect(cfg.items.length).toBe(4);
    expect(cfg.items[0].name).toBe('pv');
    expect(cfg.items[1].name).toBe('a');
    expect(cfg.items[2].name).toBe('b');
    expect(cfg.items[3].name).toBe('c');

    dualAxes.destroy();
  });

  it.only('Legend default with option', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes doubal line'), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      meta: {
        pv: {
          alias: '页面访问量',
        },
      },
      geometryOptions: [
        {
          geometry: 'line',
        },
        {
          geometry: 'line',
          seriesField: 'site',
        },
      ],
      legend: {
        layout: 'vertical',
        position: 'right',
      },
    });

    dualAxes.render();

    const legendController = dualAxes.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0];
    const cfg = legendComponent.component.cfg;

    expect(legendComponent.direction).toEqual('right');
    expect(cfg.items.length).toBe(4);
    expect(cfg.items[0].name).toBe('页面访问量');
    expect(cfg.items[1].name).toBe('a');
    expect(cfg.items[2].name).toBe('b');
    expect(cfg.items[3].name).toBe('c');

    dualAxes.update({
      ...dualAxes.options,
      legend: false,
    });

    // 隐藏就没有图例了
    expect(dualAxes.chart.views[0].getComponents().find((co) => co.type === 'legend')).toBeUndefined();
    expect(dualAxes.chart.views[1].getComponents().find((co) => co.type === 'legend')).toBeUndefined();

    expect(dualAxes.chart.getEvents().beforepaint).toBeUndefined();

    dualAxes.destroy();
  });
});
