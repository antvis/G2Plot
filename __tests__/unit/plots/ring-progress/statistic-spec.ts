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

  it('customHtml 容器的宽度', () => {
    ringProgress.update({ innerRadius: 0.8 });
    let htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(
      ringProgress.chart.getCoordinate().getRadius() * 0.8 * 2
    );

    // 开发者可以覆盖
    ringProgress.update({ statistic: { title: { style: { width: '400px' } } } });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(400);
    // @ts-ignore
    expect(htmlAnnotations[0].style.width).toEqual('400px');

    ringProgress.update({ statistic: { title: { style: { minWidth: '600px' } } } });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    // @ts-ignore
    expect(htmlAnnotations[0].style.width).toEqual('400px');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(600);
  });

  afterAll(() => {
    ringProgress.destroy();
  });
});
