import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA, PV_DATA_MULTI, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from '../../../../src/plots/dual-axes/constant';

describe('Legend', () => {
  it('Legend: single line and column', () => {
    const options = {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'line',
          color: '#f00',
        },
        {
          geometry: 'line',
          color: '#0f0',
        },
      ],
    };

    const dualAxes = new DualAxes(createDiv('Legend: single line and column'), options);

    dualAxes.render();

    const dualLineLegendComponentCfg = dualAxes.chart.getController('legend').getComponents()[0].component.cfg;
    expect(dualLineLegendComponentCfg.items.length).toBe(2);
    expect(dualLineLegendComponentCfg.items[0].name).toBe('pv');
    expect(typeof dualLineLegendComponentCfg.items[0].marker.symbol).toBe('function');
    expect(dualLineLegendComponentCfg.items[0].marker.style.stroke).toBe('#f00');
    expect(dualLineLegendComponentCfg.items[1].name).toBe('uv');
    expect(typeof dualLineLegendComponentCfg.items[1].marker.symbol).toBe('function');
    expect(dualLineLegendComponentCfg.items[1].marker.style.stroke).toBe('#0f0');

    dualAxes.update({
      ...options,
      geometryOptions: [
        {
          geometry: 'column',
          color: '#f00',
        },
        {
          geometry: 'line',
          color: '#0f0',
        },
      ],
      legend: {
        itemName: {
          formatter: (value) => `_${value}`,
        },
      },
    });

    const columnLineLegendComponentCfg = dualAxes.chart.getController('legend').getComponents()[0].component.cfg;

    expect(columnLineLegendComponentCfg.items.length).toBe(2);
    expect(columnLineLegendComponentCfg.items[0].name).toBe('pv');
    expect(columnLineLegendComponentCfg.items[0].marker.symbol).toBe('square');
    expect(columnLineLegendComponentCfg.items[0].marker.style.fill).toBe('#f00');
    expect(columnLineLegendComponentCfg.items[1].name).toBe('uv');
    expect(typeof columnLineLegendComponentCfg.items[1].marker.symbol).toBe('function');
    expect(columnLineLegendComponentCfg.items[1].marker.style.stroke).toBe('#0f0');

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

  it('Legend: multi line and column', () => {
    const options = {
      width: 400,
      height: 500,
      data: [PV_DATA_MULTI, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'line',
          seriesField: 'site',
          color: ['#f00', '#f11', '#f22'],
        },
        {
          geometry: 'line',
          seriesField: 'site',
          color: ['#0f0', '#1f1', '#2f2'],
        },
      ],
    };
    // 双折线
    const dualAxes = new DualAxes(createDiv('Legend: multi line and column'), options);

    dualAxes.render();

    const dualLineLegendComponentCfg = dualAxes.chart.getController('legend').getComponents()[0].component.cfg;

    expect(dualLineLegendComponentCfg.items.length).toBe(5);
    expect(dualLineLegendComponentCfg.items[0].name).toBe('a');
    expect(typeof dualLineLegendComponentCfg.items[0].marker.symbol).toBe('function');
    expect(dualLineLegendComponentCfg.items[0].marker.style.stroke).toBe('#f00');
    expect(dualLineLegendComponentCfg.items[2].name).toBe('a');
    expect(typeof dualLineLegendComponentCfg.items[2].marker.symbol).toBe('function');
    expect(dualLineLegendComponentCfg.items[2].marker.style.stroke).toBe('#0f0');

    dualAxes.update({
      ...options,
      geometryOptions: [
        {
          geometry: 'line',
          seriesField: 'site',
          color: ['#f00', '#f11', '#f22'],
        },
        {
          geometry: 'column',
          seriesField: 'site',
          isGroup: true,
          color: ['#0f0', '#1f1', '#2f2'],
        },
      ],
    });

    const columnLineLegendComponentCfg = dualAxes.chart.getController('legend').getComponents()[0].component.cfg;

    expect(columnLineLegendComponentCfg.items.length).toBe(5);
    expect(columnLineLegendComponentCfg.items[0].name).toBe('a');
    expect(typeof columnLineLegendComponentCfg.items[0].marker.symbol).toBe('function');
    expect(columnLineLegendComponentCfg.items[0].marker.style.stroke).toBe('#f00');

    expect(columnLineLegendComponentCfg.items[2].name).toBe('a');
    expect(columnLineLegendComponentCfg.items[2].marker.symbol).toBe('square');
    expect(columnLineLegendComponentCfg.items[2].marker.style.fill).toBe('#0f0');

    dualAxes.destroy();
  });

  it('Legend with option', () => {
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
          color: '#f00',
        },
        {
          geometry: 'line',
          seriesField: 'site',
          color: ['#5B8FF9', '#5AD8A6', '#5D7092'],
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

    dualAxes.chart.once('afterrender', () => {
      dualAxes.chart.emit('legend-item:click', {
        gEvent: {
          delegateObject: {
            item: {
              id: '页面访问量',
              value: 'pv',
              isGeometry: true,
              viewId: LEFT_AXES_VIEW,
              unchecked: true,
            },
          },
        },
      });
      expect(dualAxes.chart.views[0].geometries[0].visible).toEqual(false);

      dualAxes.chart.emit('legend-item:click', {
        gEvent: {
          delegateObject: {
            item: {
              id: '页面访问量',
              value: 'pv',
              isGeometry: true,
              viewId: LEFT_AXES_VIEW,
              unchecked: false,
            },
          },
        },
      });
      expect(dualAxes.chart.views[0].geometries[0].visible).toEqual(true);

      dualAxes.chart.emit('legend-item:click', {
        gEvent: {
          delegateObject: {
            item: {
              id: 'a',
              name: 'a',
              value: 'a',
              viewId: RIGHT_AXES_VIEW,
              unchecked: true,
            },
          },
        },
      });

      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'a').length === 0).toEqual(true);

      dualAxes.chart.emit('legend-item:click', {
        gEvent: {
          delegateObject: {
            item: {
              id: 'a',
              name: 'a',
              value: 'a',
              viewId: RIGHT_AXES_VIEW,
              unchecked: false,
            },
          },
        },
      });

      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'a').length > 0).toEqual(true);

      dualAxes.chart.emit('legend-item:click', {});

      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'a').length > 0).toEqual(true);

      dualAxes.chart.emit('legend-item:click', {
        gEvent: {
          delegateObject: {
            item: {
              id: 'test',
              name: 'test',
              value: 'test',
              isGeometry: true,
              viewId: LEFT_AXES_VIEW,
              unchecked: true,
            },
          },
        },
      });

      expect(dualAxes.chart.views[0].geometries[0].visible).toEqual(true);

      dualAxes.chart.emit('legend-item:click', {
        gEvent: {
          delegateObject: {
            item: {
              id: 'test',
              name: 'test',
              value: 'test',
              viewId: RIGHT_AXES_VIEW,
              unchecked: true,
            },
          },
        },
      });

      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'a').length > 0).toEqual(true);

      dualAxes.destroy();
    });
  });

  it('Legend custom', () => {
    const dualAxes = new DualAxes(createDiv('Legend custom '), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      legend: {
        custom: true,
        position: 'bottom',
        items: [
          {
            value: 'test',
            name: '测试1',
            marker: { symbol: 'square', style: { fill: '#B4EBBF', r: 5 } },
          },
          {
            value: 'test2',
            name: '测试2',
            marker: { symbol: 'square', style: { fill: '#FFB1AC', r: 5 } },
          },
        ],
      },
    });

    dualAxes.render();

    const legendController = dualAxes.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0];
    const cfg = legendComponent.component.cfg;

    expect(cfg.items.length).toBe(2);
    expect(cfg.items[0].name).toBe('测试1');
    expect(cfg.items[0].marker.symbol).toBe('square');
    expect(cfg.items[1].name).toBe('测试2');
    expect(cfg.items[1].marker.symbol).toBe('square');

    dualAxes.destroy();
  });
});
