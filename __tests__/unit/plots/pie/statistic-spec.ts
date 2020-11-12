import { Chart } from '@antv/g2';
import { Pie, PieOptions } from '../../../../src';
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

  afterEach(() => {
    pie.chart.clear();
  });

  afterAll(() => {
    pie.destroy();
  });
});

describe('statistic', () => {
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

  it('自定义中心文本内容: title & content', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
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
    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('总计' /** 中心文本指标卡，默认title */);
    expect((htmlAnnotations[1] as HTMLElement).innerText).toBe('test test');

    pie.destroy();
  });

  it('自定义中心文本样式: 兼容 shapeStyle', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
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

    pie.destroy();
  });

  it('自定义中心文本内容: title & content, 动态数据', () => {
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
            return !datum ? `test\ntest ${data.reduce((a, b) => a + b.value, 0)}` : `${datum.value}`;
          },
          rotate: (30 / 180) * Math.PI,
        },
      },
    });

    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBeGreaterThan(0);
    setTimeout(() => {
      const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
      expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('总计' /** 中心文本指标卡，默认title */);
      expect((htmlAnnotations[1] as HTMLElement).innerText).toBe(`test\ntest ${totalValue}`);
    }, 50);

    pie.destroy();
  });
});
