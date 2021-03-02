import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('liquid statistic', () => {
  const liquid = new Liquid(createDiv(), {
    width: 600,
    height: 300,
    autoFit: false,
    percent: 0.65,
  });

  liquid.render();

  it('默认展示', async () => {
    await delay(50);
    const annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(1);
  });

  it('默认展示当前数值', () => {
    liquid.update({ statistic: { content: {} } });
    const annotation = document.body.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).innerText).toBe('65.00%');
  });

  it('使用 meta 格式化', () => {
    liquid.update({
      meta: { percent: { formatter: (v) => `${v * 100}.000%` } },
      statistic: { content: { formatter: null } },
    });
    const annotation = document.body.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).innerText).toBe('65.000%');
  });

  it('statistic 配置的格式化方式, 优先级高于 meta', () => {
    liquid.update({ statistic: { content: { formatter: ({ percent }) => `${percent * 100}.0%` } } });
    const annotation = document.body.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).innerText).toBe('65.0%');
  });

  it('statistic 配置title', () => {
    liquid.update({ statistic: { content: {}, title: {} } });
    let annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(2);
    expect((annotations[0] as HTMLElement).innerText).toBe('');

    liquid.update({ statistic: { content: {}, title: { formatter: () => '测试' } } });
    annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect((annotations[0] as HTMLElement).innerText).toBe('测试');
  });

  it('customHtml 容器的宽度', () => {
    let htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    // @ts-ignore
    const circleShape = liquid.chart.geometries[0].elements[0].shape.find((s) => s.get('type') === 'path');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(circleShape.getCanvasBBox().width);

    // 开发者可以覆盖
    liquid.update({ statistic: { title: { style: { width: '400px' } } } });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(400);
    // @ts-ignore
    expect(htmlAnnotations[0].style.width).toEqual('400px');

    liquid.update({ statistic: { title: { style: { minWidth: '600px' } } } });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    // @ts-ignore
    expect(htmlAnnotations[0].style.width).toEqual('400px');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(600);
  });

  it('关闭 statistic', () => {
    liquid.update({ statistic: { content: null } });
    let annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(1);
    liquid.update({ statistic: { content: null, title: null } });
    annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(0);
  });

  it('change data', () => {
    liquid.update({ statistic: { title: {}, content: { formatter: ({ percent: v }) => `${v * 100}.0%` } } });
    liquid.changeData(0.35);
    const annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect(annotations.length).toBe(2);
    expect((annotations[1] as HTMLElement).innerText).toBe('35.0%');

    liquid.changeData(0.15);
    expect((document.body.querySelectorAll('.g2-html-annotation')[1] as HTMLElement).innerText).toBe('15.0%');

    liquid.update({ statistic: { content: {}, title: false } });
    expect(document.body.querySelectorAll('.g2-html-annotation').length).toBe(1);
    expect((document.body.querySelectorAll('.g2-html-annotation')[0] as HTMLElement).innerText).toBe('15.0%');

    liquid.changeData(0.05);
    expect((document.body.querySelectorAll('.g2-html-annotation')[0] as HTMLElement).innerText).toBe('5.0%');
  });

  afterAll(() => {
    liquid.destroy();
  });
});
