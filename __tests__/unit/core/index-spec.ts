import { Line, registerTheme } from '../../../src';
import { partySupport } from '../../data/party-support';
import { createDiv } from '../../utils/dom';

registerTheme('new-theme', {
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
});
