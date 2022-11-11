import { Chart } from '@antv/g2';
import { Pie, PieOptions } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/pie/contants';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

const data = POSITIVE_NEGATIVE_DATA.filter((o) => o.value > 0).map((d, idx) =>
  idx === 1 ? { ...d, type: 'item1' } : d
);

const config: PieOptions = {
  width: 400,
  height: 300,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  statistic: {},
};

function getAnnotations(chart: Chart) {
  return chart.getComponents().filter((co) => co.type === 'annotation');
}

describe('中心文本 - 指标卡', () => {
  const pie = new Pie(createDiv(), config);
  pie.render();

  it('没有设置 inner radius，不展示中心文本指标卡', () => {
    expect(getAnnotations(pie.chart).length).toBe(0);
  });

  it('设置 inner radius', () => {
    pie.update({
      ...pie.options,
      innerRadius: 0.64,
    });
    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBeGreaterThan(0);
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('总计' /** 中心文本指标卡，默认title */);
  });

  it('中心文本内容更新', () => {
    pie.update({ statistic: null });
    let annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(0);

    pie.update({ statistic: {} });
    annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(2);
    let htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('总计' /** 中心文本指标卡，默认title */);
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe(`${data.reduce((a, b) => a + b.value, 0)}`);

    pie.update({ statistic: { title: false } });
    annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(1);

    pie.update({ statistic: { content: false } });
    annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(0);

    pie.update({ statistic: { title: { formatter: () => 'sss' } } });
    annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(1);
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('sss');

    pie.update({ meta: { value: { formatter: (v) => `${v}¥` } }, statistic: { content: {} } });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe(`${data.reduce((a, b) => a + b.value, 0)}¥`);

    pie.update({ meta: { value: { formatter: undefined } }, statistic: { content: {} } });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe(`${data.reduce((a, b) => a + b.value, 0)}`);
  });

  it('设置 content', () => {
    // 清空所有配置
    pie.update({ statistic: null });
    pie.update({ statistic: { title: { content: 'TEST' }, content: { content: 'ss' } } });
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('TEST');
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe('ss');
  });

  it('自定义中心文本内容: update statistic title & content', () => {
    pie.update({
      ...pie.options,
      statistic: {
        title: {
          formatter: () => '总计',
        },
        content: {
          formatter: () => 'test\ntest',
          rotate: (30 / 180) * Math.PI,
        },
      },
    });

    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBeGreaterThan(0);
    let htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('总计' /** 中心文本指标卡，默认title */);
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe('test test');

    pie.update({
      statistic: {
        content: {
          style: { whiteSpace: 'pre-wrap' },
          formatter: () => 'test\ntest',
        },
      },
    });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe('test\ntest');
  });

  it('自定义中心文本内容: update statistic title & content, 动态数据', async () => {
    await delay(300);
    pie.update({
      ...pie.options,
      statistic: {
        title: {
          formatter: (datum) => (!datum ? '总计' : datum['type']),
        },
        content: {
          style: { whiteSpace: 'pre-wrap' },
          formatter: (datum) => {
            return !datum ? 'test\ntest' : `${datum.value}`;
          },
          rotate: (30 / 180) * Math.PI,
        },
      },
    });

    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBeGreaterThan(0);
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('总计' /** 中心文本指标卡，默认title */);
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe('test\ntest');

    pie.chart.clear();
  });

  it('自定义中心文本样式: 兼容 shapeStyle', async () => {
    pie.update({
      ...pie.options,
      statistic: {
        title: {
          formatter: () => '',
          // @ts-ignore
          style: { fill: 'red' },
        },
        content: {
          // @ts-ignore
          style: { fill: 'pink' },
        },
      },
    });

    pie.render();
    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(2);
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('' /** 中心文本指标卡，默认title */);
    expect(annotations[0].extra.key).toBe('top-statistic');
    expect(annotations[1].extra.key).toBe('bottom-statistic');
    expect(annotations[0].extra.style).toMatchObject({ fill: 'red' });
    expect(annotations[1].extra.style).toMatchObject({ fill: 'pink' });
  });

  it('自定义中心文本样式: 兼容 ShapeStyle with callback', async () => {
    pie.update({
      ...pie.options,
      statistic: {
        title: {
          formatter: () => '',
          // @ts-ignore
          style: { fill: 'red' },
        },
        content: {
          // @ts-ignore
          style: { fill: 'pink' },
        },
      },
    });

    pie.render();
    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(2);
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('' /** 中心文本指标卡，默认title */);
    expect(annotations[0].extra.key).toBe('top-statistic');
    expect(annotations[0].extra.style).toMatchObject({ fill: 'red' });
    expect(annotations[1].extra.style).toMatchObject({ fill: 'pink' });
  });

  it('总计值为空', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      data: config.data.map((d) => ({ ...d, value: null })),
      innerRadius: 0.64,
    });
    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(2);
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[1] as HTMLElement).innerText).not.toBe('null');
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe('');

    pie.destroy();
  });

  it('添加交互 interaction', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      interactions: [
        { type: 'pie-statistic-active' },
        { type: 'legend-filter', cfg: { start: [{ trigger: 'none' /** 通过此方式可以关闭交互 */ }] } },
      ],
    });

    pie.render();

    const interactions = pie.chart.interactions;
    expect(interactions['pie-statistic-active']).toBeDefined();
    const legendInteraction = interactions['legend-filter'];
    expect(legendInteraction).toBeDefined();
    // @ts-ignore
    expect(legendInteraction.steps['start'][0].trigger).toEqual('none');

    pie.destroy();
  });

  it('自定义 pie-statistic-active 交互的 trigger 事件', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      interactions: [
        {
          type: 'pie-statistic-active',
          cfg: { start: [{ trigger: 'element:click', action: 'pie-statistic:change' }] },
        },
      ],
    });

    pie.render();

    const interactions = pie.chart.interactions;
    const statisticInteraction = interactions['pie-statistic-active'];
    // @ts-ignore
    expect(statisticInteraction.steps['start'][0].trigger).toEqual('element:click');

    pie.destroy();
  });

  it('自定义中心文本内容: title & content, 动态数据', async () => {
    const totalValue = config.data.reduce((a, b) => a + b.value, 0);
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      statistic: {
        title: {
          formatter: (datum) => (!datum ? '总计' : datum['type']),
        },
        content: {
          formatter: (datum, data) => {
            return !datum ? `test-test ${data.reduce((a, b) => a + b.value, 0)}` : `${datum.value}`;
          },
          rotate: (30 / 180) * Math.PI,
        },
      },
    });

    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBeGreaterThan(0);
    await delay(1);
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('总计' /** 中心文本指标卡，默认title */);
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe(`test-test ${totalValue}`);

    pie.destroy();
  });

  it('customHtml 容器的宽度', () => {
    pie.update({ innerRadius: 0.8 });
    let htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(pie.chart.getCoordinate().getRadius() * 0.8 * 2);
    // @ts-ignore
    expect(htmlAnnotations[0].style.width).toEqual(`${pie.chart.getCoordinate().getRadius() * 0.8 * 2}px`);

    // 开发者可以覆盖
    pie.update({ statistic: { title: { style: { width: '500px' } } } });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(500);

    pie.update({ statistic: { title: { style: { minWidth: '600px' } } } });
    htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    // @ts-ignore
    expect(htmlAnnotations[0].style.width).toEqual('500px');
    expect(htmlAnnotations[0].getBoundingClientRect().width).toEqual(600);
  });

  it('statistic 默认继承 defaultOptions', async () => {
    pie.update({ statistic: null });
    expect(pie.chart.ele.querySelectorAll('.g2-html-annotation').length).toBe(0);

    pie.update({ statistic: {} });
    expect(pie.chart.ele.querySelectorAll('.g2-html-annotation').length).toBe(2);
    expect(pie.options.statistic).toEqual({});
    await delay(1);

    // @ts-ignore
    const annotations = pie.chart.ele.querySelectorAll('.g2-html-annotation') as HTMLDivElement[];
    expect(annotations[0].style.fontSize).toEqual(DEFAULT_OPTIONS.statistic.title.style.fontSize);
    // 移除空格
    expect(annotations[1].style.color.replace(/\s+/g, '')).toEqual(DEFAULT_OPTIONS.statistic.content.style.color);
    expect(annotations[1].style.textAlign).toBe(DEFAULT_OPTIONS.statistic.content.style.textAlign);
  });

  afterEach(() => {
    pie.chart.clear();
  });

  afterAll(() => {
    pie.destroy();
  });
});
