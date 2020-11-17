import { Gauge } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('gauge statistic', () => {
  const gauge = new Gauge(createDiv(), {
    width: 600,
    height: 300,
    autoFit: false,
    percent: 0.65,
    range: {
      color: 'l(0) 0:#5d7cef 1:#e35767',
    },
  });

  gauge.render();

  it('默认不展示', async () => {
    await delay(50);
    const annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(0);
  });

  it('默认格式化：00.00%', () => {
    gauge.update({ statistic: { content: {} } });
    const annotation = document.body.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).innerText).toBe('65.00%');
  });

  it('statistic 配置的格式化方式, 优先级高于 meta', () => {
    gauge.update({ statistic: { content: { formatter: ({ percent }) => `${percent * 100}.0%` } } });
    const annotation = document.body.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).innerText).toBe('65.0%');
  });

  it('statistic 配置 title', () => {
    gauge.update({ statistic: { content: {}, title: {} } });
    let annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(2);
    expect((annotations[1] as HTMLElement).innerText).toBe('65.0%');

    gauge.update({ statistic: { content: {}, title: { formatter: () => '测试' } } });
    annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect((annotations[0] as HTMLElement).innerText).toBe('测试');
  });

  afterAll(() => {
    gauge.destroy();
  });
});
