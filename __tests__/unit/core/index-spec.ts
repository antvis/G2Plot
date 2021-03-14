import { deepMix, isEqual, clone } from '@antv/util';
import { Line, G2, Plot } from '../../../src';
import { partySupport } from '../../data/party-support';
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

    line.destroy();
  });

  it('updateOption without render', () => {
    const options = {
      width: 400,
      height: 300,
      data: [
        { date: '12-01', value: 1, type: 'bb' },
        { date: '12-02', value: 12, type: 'bb' },
      ],
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
    };
    const line = new Line(createDiv(), options);

    line.render();

    // @ts-ignore
    line.updateOption({
      data: [...line.options.data, { date: '12-01', value: 4, type: 'cc' }, { date: '12-02', value: 19, type: 'cc' }],
    });

    expect(line.chart.geometries[0].elements.length).toBe(1);

    line.render();
    expect(line.chart.geometries[0].elements.length).toBe(2);

    line.update({
      data: [...line.options.data, { date: '12-01', value: 4, type: 'dd' }, { date: '12-02', value: 19, type: 'dd' }],
    });
    expect(line.chart.geometries[0].elements.length).toBe(3);

    line.destroy();
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

    line.update({ width: 500 });

    expect(isEqual(line.options, deepMix(curOptions, { ...options, width: 500 }))).toBeTruthy();

    line.destroy();
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

    line.destroy();
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

    line.destroy();
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

    line.destroy();
  });

  it('resize', async () => {
    const container = createDiv();
    container.style.width = '400px';
    container.style.height = '400px';

    const line = new Line(container, {
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
      animation: false,
    });

    // @ts-ignore
    line.triggerResize = jest.fn();
    line.render();

    await delay(200);
    // @ts-ignore
    expect(line.triggerResize).toHaveBeenCalledTimes(0);

    container.style.width = `${container.clientWidth + 10}px`;
    await delay(200);
    // @ts-ignore
    expect(line.triggerResize).toHaveBeenCalledTimes(1);

    line.destroy();
  });

  it('getChartSize', () => {
    createDiv('', document.body, 'changeSize');
    document.getElementById('changeSize').style.width = '0px';
    const line = new Line('changeSize', {
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });

    line.render();
    expect(line.chart.width).toBe(400);
    expect(line.chart.height).toBe(400);
    line.destroy();
  });

  it('limit in Plot', () => {
    const line = new Line(createDiv(''), {
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
      limitInPlot: true,
    });

    line.render();
    expect(line.chart.limitInPlot).toBe(true);
    line.destroy();
  });

  it('plot dataset sourceType', () => {
    const container = createDiv('');
    const line = new Line(container, {
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });
    expect(container.dataset.chartSourceType).toBe('G2Plot');
    line.destroy();

    expect(container.dataset.chartSourceType).toBe(undefined);
  });

  it('default autoHide', () => {
    const line = new Line(createDiv(''), {
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });

    line.render();

    expect(line.chart.getOptions().axes['date'].label.autoRotate).toBe(false);
    expect(line.chart.getOptions().axes['date'].label.autoHide).toEqual({
      type: 'equidistance',
      cfg: {
        minGap: 6,
      },
    });

    line.update({
      xAxis: {
        label: {
          autoHide: {
            type: 'equidistance',
            cfg: {
              minGap: 12,
            },
          },
        },
      },
    });
    line.render();
    expect(line.chart.getOptions().axes['date'].label.autoRotate).toBe(false);
    expect(line.chart.getOptions().axes['date'].label.autoHide).toEqual({
      type: 'equidistance',
      cfg: {
        minGap: 12,
      },
    });

    line.update({
      xAxis: {
        label: {
          autoHide: false,
        },
      },
    });
    line.render();
    expect(line.chart.getOptions().axes['date'].label.autoRotate).toBe(false);
    expect(line.chart.getOptions().axes['date'].label.autoHide).toBe(false);

    line.destroy();
  });

  it('default-options', () => {
    type CustomPlotOptions = {};
    class CustomPlot extends Plot<CustomPlotOptions> {
      type: 'custom';
      getSchemaAdaptor() {
        return () => {
          // do somethings
        };
      }
    }
    const plot = new CustomPlot(createDiv(), {});
    // @ts-ignore
    expect(Plot.getDefaultOptions()).toEqual(plot.getDefaultOptions());
  });
});
