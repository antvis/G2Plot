import { deepMix, isEqual, clone } from '@antv/util';
import { Line, G2, Pie } from '../../../src';
import { partySupport } from '../../data/party-support';
import { salesByArea } from '../../data/sales';
import { createDiv } from '../../utils/dom';
import { delay } from '../../utils/delay';

G2.registerTheme('new-theme', {
  colors10: ['green'],
});

describe('core', () => {
  it('autoFit', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });

    line.render();

    // 默认绑定
    expect(line.container.getAttribute('size-sensor-id')).not.toBeNull();

    line.update({
      width: 400,
      height: 300,
      appendPadding: 10,
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
      autoFit: false,
    });

    // expect(line.container.getAttribute('size-sensor-id')).toBeNull();
    expect(line.chart.width).toBe(400);
  });

  it('update mix with default options', () => {
    const options = {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    };
    const line = new Line(createDiv(), options);

    line.render();
    const curOptions = clone(line.options);

    line.update({ ...options, width: 500 });

    line.render();

    expect(isEqual(line.options, deepMix(curOptions, { ...options, width: 500 }))).toBeTruthy();
  });

  it('localRefresh', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });

    line.render();

    expect(line.chart.localRefresh).toBe(false);
  });

  it('theme', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      theme: {
        colors10: ['red'],
      },
    });

    line.render();

    expect(line.chart.getTheme().colors10).toEqual(['red']);
    expect(line.chart.getTheme().defaultColor).toBe('#5B8FF9');

    line.update({
      ...line.options,
      theme: 'new-theme',
    });

    expect(line.chart.getTheme().colors10).toEqual(['green']);
  });

  it('event', async () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      theme: {
        colors10: ['red'],
      },
    });

    line.render();

    function click(): Promise<Event> {
      return new Promise((resolve) => {
        line.on('element:click', (e) => {
          resolve(e);
        });

        line.chart.emit('element:click', {
          _data: 1,
          type: 'element:click',
        });
      });
    }

    const e = await click();

    // 直接接受 G2 透传的事件
    expect(e).toEqual({
      type: 'element:click',
      _data: 1,
    });
  });

  const pie = new Pie(createDiv('饼图状态'), {
    width: 400,
    height: 400,
    data: salesByArea,
    angleField: 'sales',
    colorField: 'area',
    radius: 0.8,
    autoFit: false,
    interactions: [{ type: 'element-selected' }],
  });

  it('state', async () => {
    pie.render();

    // 注意，如果 autoFit 会触发一次 render，导致 setState 的状态又还原了（实际场景，自己处理一个时机即可）
    pie.setState('selected', (data) => (data as any).area === salesByArea[0].area);
    expect(pie.getStates().length).toBe(1);

    pie.chart.geometries[0].elements[0].setState('selected', false);
    expect(pie.getStates().length).toBe(0);

    pie.setState('selected', (data) => (data as any).area === salesByArea[2].area);
    expect(pie.getStates().length).toBe(1);
    // 取消 selected
    pie.setState('selected', (data) => (data as any).area === salesByArea[2].area, false);
    expect(pie.getStates().length).toBe(0);
  });

  it('interaction', () => {
    expect(pie.chart.interactions['legend-filter']).not.toBeUndefined();

    pie.update({
      ...pie.options,
      interactions: [
        { type: 'element-selected', enable: false },
        { type: 'legend-filter', enable: false },
      ],
    });

    expect(pie.chart.interactions['element-selected']).toBeUndefined();
    expect(pie.chart.interactions['legend-filter']).toBeUndefined();
  });

  afterAll(() => {
    pie.destroy();
  });

  it('resize', async () => {
    const container = createDiv();
    container.style.width = '400px';
    container.style.height = '400px';

    const line = new Line(container, {
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });

    // @ts-ignore
    line.triggerResize = jest.fn();
    line.render();

    await delay(500);
    // @ts-ignore
    expect(line.triggerResize).toHaveBeenCalledTimes(0);

    container.style.width = `${container.clientWidth + 10}px`;
    await delay(500);
    // @ts-ignore
    expect(line.triggerResize).toHaveBeenCalledTimes(1);
  });
});
