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

  it('Legend with click', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes doubal line', undefined, 'click_legend'), {
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
        itemName: {
          formatter: (val) => `${val}_test`,
        },
      },
    });

    dualAxes.render();

    const legendController = dualAxes.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0];
    const legendContainer = legendComponent.component.get('container');
    const cfgItems = legendComponent.component.cfg.items;
    expect(cfgItems.length).toBe(4);
    expect(cfgItems[0].name).toBe('页面访问量');
    expect(cfgItems[1].name).toBe('a');
    expect(cfgItems[2].name).toBe('b');
    expect(cfgItems[3].name).toBe('c');

    dualAxes.chart.once('afterrender', () => {
      // 点击页面访问量，期望单折线图 visible 隐藏, 图例 unchecked 为 true
      dualAxes.chart.emit('legend-item:click', {
        target: legendContainer.findById('-legend-item-页面访问量-name'),
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
      expect(cfgItems.find((item) => item.id === '页面访问量').unchecked).toEqual(true);

      // 点击分类数据 A，期望多折线图 view 过滤掉数据 a
      dualAxes.chart.emit('legend-item:click', {
        target: legendContainer.findById('-legend-item-a-name'),
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
      expect(cfgItems.find((item) => item.id === 'a').unchecked).toEqual(true);

      // 点击分类数据 B，期望多折线图 view 过滤掉数据 b
      dualAxes.chart.emit('legend-item:click', {
        target: legendContainer.findById('-legend-item-b-name'),
        gEvent: {
          delegateObject: {
            item: {
              id: 'b',
              name: 'b',
              value: 'b',
              viewId: RIGHT_AXES_VIEW,
              unchecked: true,
            },
          },
        },
      });

      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'b').length === 0).toEqual(true);
      expect(cfgItems.find((item) => item.id === 'b').unchecked).toEqual(true);

      // 点击分类数据 C，期望多折线图 view 过滤掉数据 c, yaxis 右侧仅留 0 一个刻度
      dualAxes.chart.emit('legend-item:click', {
        target: legendContainer.findById('-legend-item-c-name'),
        gEvent: {
          delegateObject: {
            item: {
              id: 'c',
              name: 'c',
              value: 'c',
              viewId: RIGHT_AXES_VIEW,
              unchecked: true,
            },
          },
        },
      });

      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'c').length === 0).toEqual(true);
      expect(cfgItems.find((item) => item.id === 'c').unchecked).toEqual(true);
      expect(dualAxes.chart.views[1].getController('axis').getComponents()[0].component.cfg.ticks.length).toBe(1);

      // 再次点击页面访问量，期望单折线图 visible 出现, 图例 unchecked 为 false
      dualAxes.chart.emit('legend-item:click', {
        target: legendContainer.findById('-legend-item-页面访问量-name'),
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
      expect(cfgItems.find((item) => item.id === '页面访问量').unchecked).toEqual(false);
      expect(dualAxes.chart.views[1].getController('axis').getComponents()[0].component.cfg.ticks.length).toBe(1);

      // 再次点击分类数据 A，期望多折线图 view 重新包含数据 a，右轴出现多个刻度
      dualAxes.chart.emit('legend-item:click', {
        target: legendContainer.findById('-legend-item-a-name'),
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
      expect(cfgItems.find((item) => item.id === 'a').unchecked).toEqual(false);
      expect(
        dualAxes.chart.views[1].getController('axis').getComponents()[0].component.cfg.ticks.length > 1
      ).toBeTruthy();

      // 再次点击分类数据 B，期望多折线图 view 重新包含数据 B
      dualAxes.chart.emit('legend-item:click', {
        target: legendContainer.findById('-legend-item-b-name'),
        gEvent: {
          delegateObject: {
            item: {
              id: 'b',
              name: 'b',
              value: 'b',
              viewId: RIGHT_AXES_VIEW,
              unchecked: false,
            },
          },
        },
      });
      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'b').length > 0).toEqual(true);
      expect(cfgItems.find((item) => item.id === 'b').unchecked).toEqual(false);

      // 再次点击分类数据 C，期望多折线图 view 重新包含数据 C
      dualAxes.chart.emit('legend-item:click', {
        target: legendContainer.findById('-legend-item-c-name'),
        gEvent: {
          delegateObject: {
            item: {
              id: 'c',
              name: 'c',
              value: 'c',
              viewId: RIGHT_AXES_VIEW,
              unchecked: false,
            },
          },
        },
      });
      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'c').length > 0).toEqual(true);
      expect(cfgItems.find((item) => item.id === 'c').unchecked).toEqual(false);

      // 提高if else 覆盖率，事件为空，不受影响
      dualAxes.chart.emit('legend-item:click', {});
      expect(dualAxes.chart.views[1].geometries[0].data.filter((item) => item.site === 'a').length > 0).toEqual(true);

      // 提高if else 覆盖率，传入一个 id 错误的 item，不受影响
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

      // 提高if else 覆盖率，传入一个 id 错误的 item，不受影响
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
        marker: {
          symbol: 'diamond',
        },
      },
    });

    dualAxes.render();

    const legendController = dualAxes.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0];
    const cfg = legendComponent.component.cfg;

    expect(cfg.items[0].marker.symbol).toBe('diamond');
    expect(cfg.items[1].marker.symbol).toBe('diamond');
    expect(cfg.items[0].marker.style.fill).toBe('#5B8FF9');
    expect(cfg.items[1].marker.style.fill).toBe('#5AD8A6');

    dualAxes.destroy();
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
        layout: 'vertical',
        position: 'right',
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
    expect(legendComponent.direction).toEqual('right');
    dualAxes.destroy();
  });
});

describe('color callback', () => {
  const uvBillData = [
    { time: '2019-03', value: 350, type: 'uv' },
    { time: '2019-04', value: 900, type: 'uv' },
    { time: '2019-05', value: 300, type: 'uv' },
    { time: '2019-06', value: 450, type: 'uv' },
    { time: '2019-07', value: 470, type: 'uv' },
    { time: '2019-03', value: 220, type: 'bill' },
    { time: '2019-04', value: 300, type: 'bill' },
    { time: '2019-05', value: 250, type: 'bill' },
    { time: '2019-06', value: 220, type: 'bill' },
    { time: '2019-07', value: 362, type: 'bill' },
  ];

  const transformData = [
    { time: '2019-03', count: 800 },
    { time: '2019-04', count: 600 },
    { time: '2019-05', count: 400 },
    { time: '2019-06', count: 380 },
    { time: '2019-07', count: 220 },
  ];

  const plot = new DualAxes(createDiv(), {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        isPercent: true,
        seriesField: 'type',
        color: ({ type }) => (type === 'uv' ? 'red' : 'yellow'),
      },
      {
        geometry: 'line',
        color: () => 'green',
      },
    ],
  });

  plot.render();

  it('color callback apply to multi-column, and single line', () => {
    const markers = plot.chart
      .getController('legend')
      // @ts-ignore
      .components[0].component.get('container')
      .findAllByName('legend-item-marker');
    expect(markers[0].attr('fill')).toBe('red');
    expect(markers[1].attr('fill')).toBe('yellow');
    expect(markers[2].attr('stroke')).toBe('green');
  });

  it('color callback apply to multi-line', () => {
    const transformData = [
      { time: '2019-03', count: 800, name: 'a' },
      { time: '2019-04', count: 600, name: 'a' },
      { time: '2019-05', count: 400, name: 'a' },
      { time: '2019-06', count: 380, name: 'a' },
      { time: '2019-07', count: 220, name: 'a' },
      { time: '2019-03', count: 750, name: 'b' },
      { time: '2019-04', count: 650, name: 'b' },
      { time: '2019-05', count: 450, name: 'b' },
      { time: '2019-06', count: 400, name: 'b' },
      { time: '2019-07', count: 320, name: 'b' },
      { time: '2019-03', count: 900, name: 'c' },
      { time: '2019-04', count: 600, name: 'c' },
      { time: '2019-05', count: 450, name: 'c' },
      { time: '2019-06', count: 300, name: 'c' },
      { time: '2019-07', count: 200, name: 'c' },
    ];

    plot.update({
      data: [uvBillData, transformData],
      theme: {
        defaultColor: '#FF6B3B',
      },
      geometryOptions: [
        {
          geometry: 'column',
          isStack: true,
          seriesField: 'type',
          columnWidthRatio: 0.4,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: ({ name }) => (name === 'a' ? 'red' : undefined),
        },
      ],
    });

    const markers = plot.chart
      .getController('legend')
      // @ts-ignore
      .components[0].component.get('container')
      .findAllByName('legend-item-marker');
    expect(markers[2].attr('stroke')).toBe('red');
    // default-color
    expect(markers[3].attr('stroke')).toBe('#FF6B3B');
    expect(markers[4].attr('stroke')).toBe('#FF6B3B');
  });

  afterAll(() => {
    plot.destroy();
  });
});
