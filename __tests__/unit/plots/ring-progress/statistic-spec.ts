import { RingProgress } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('ringProgress statistic', () => {
  const ringProgress = new RingProgress(createDiv(), {
    radius: 1,
    innerRadius: 0.5,
    width: 200,
    height: 100,
    percent: 0.65,
    autoFit: false,
  });

  ringProgress.render();

  it('默认展示', async () => {
    await delay(50);
    const annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(1);
  });

  it('默认展示当前数值', () => {
    ringProgress.update({ statistic: { content: {} } });
    const annotation = document.body.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).innerText).toBe('65.00%');
  });

  it('使用 meta 格式化', () => {
    ringProgress.update({
      meta: { percent: { formatter: (v) => `${v * 100}.000%` } },
      statistic: { content: { formatter: null } },
    });
    const annotation = document.body.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).innerText).toBe('65.000%');
  });

  it('statistic 配置的格式化方式, 优先级高于 meta', () => {
    ringProgress.update({ statistic: { content: { formatter: ({ percent }) => `${percent * 100}.0%` } } });
    const annotation = document.body.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).innerText).toBe('65.0%');
  });

  it('statistic 配置title', () => {
    ringProgress.update({ statistic: { content: {}, title: {} } });
    let annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(2);
    expect((annotations[0] as HTMLElement).innerText).toBe('');

    ringProgress.update({ statistic: { content: {}, title: { formatter: () => '测试' } } });
    annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect((annotations[0] as HTMLElement).innerText).toBe('测试');
  });

  afterAll(() => {
    ringProgress.destroy();
  });
});
