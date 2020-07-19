import { Chart } from '@antv/g2';
import { Pie, PieOptions } from '../../../../src';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

describe('中心文本 - 指标卡', () => {
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
  const pie = new Pie(createDiv(), config);
  pie.render();

  function getAnnotations(chart: Chart) {
    return chart.getComponents().filter((co) => co.type === 'annotation');
  }

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
    expect(annotations[0].component.get('content')).toBe('总计' /** 中心文本指标卡，默认title */);
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
    expect(annotations[0].component.get('content')).toBe('总计');
    expect(annotations[1].component.get('content')).toBe('test\ntest');
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
    expect(annotations[0].component.get('content')).toBe('总计');
    expect(annotations[1].component.get('content')).toBe('test\ntest');
  });

  it('自定义中心文本内容: title & content, 动态数据', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      statistic: {
        title: {
          formatter: (type, data) => (type !== 'item' ? '总计' : data['type']),
        },
        content: {
          formatter: (type, data) => {
            return type !== 'item' ? 'test\ntest' : typeof data.value === 'number' ? `${data.value}` : '';
          },
          rotate: (30 / 180) * Math.PI,
        },
      },
    });

    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBeGreaterThan(0);
    expect(annotations[0].component.get('content')).toBe('总计');
    expect(annotations[1].component.get('content')).toBe('test\ntest');
  });

  it('自定义中心文本内容: update statistic title & content, 动态数据', async () => {
    await delay(5000);
    pie.update({
      ...pie.options,
      statistic: {
        title: {
          formatter: (type, data) => (type !== 'item' ? '总计' : data['type']),
        },
        content: {
          formatter: (type, data) => {
            return type !== 'item' ? 'test\ntest' : typeof data.value === 'number' ? `${data.value}` : '';
          },
          rotate: (30 / 180) * Math.PI,
        },
      },
    });

    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBeGreaterThan(0);
    expect(annotations[0].component.get('content')).toBe('总计');
    expect(annotations[1].component.get('content')).toBe('test\ntest');
  });

  it('自定义中心文本样式: title style & content style', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      statistic: {
        title: {
          formatter: () => '',
          style: { fill: 'red' },
        },
        content: {
          style: { fill: 'pink' },
        },
      },
    });

    pie.render();
    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(2);
    expect(annotations[0].extra.content).toBe('');
    expect(annotations[0].extra.key).toBe('statistic');
    expect(annotations[0].extra.style).toMatchObject({ fill: 'red' });
    expect(annotations[1].extra.style).toMatchObject({ fill: 'pink' });
  });

  it('自定义中心文本样式: update statistic title style & content style', async () => {
    await delay(5000);
    pie.update({
      ...pie.options,
      statistic: {
        title: {
          formatter: () => '',
          style: { fill: 'red' },
        },
        content: {
          style: { fill: 'pink' },
        },
      },
    });

    pie.render();
    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(2);
    expect(annotations[0].extra.content).toBe('');
    expect(annotations[0].extra.key).toBe('statistic');
    expect(annotations[0].extra.style).toMatchObject({ fill: 'red' });
    expect(annotations[1].extra.style).toMatchObject({ fill: 'pink' });
  });

  it('append annotation', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      statistic: {
        title: {
          formatter: () => '',
        },
        content: {
          formatter: () => '无数据',
        },
      },
      annotations: [
        {
          type: 'text',
          top: true,
          position: ['50%', '20%'],
          content: '达标区间',
          style: {
            fill: '#aaaaaa',
            textAlign: 'end',
            textBaseline: 'top',
            fontWeight: 300,
          },
          offsetX: -10,
          offsetY: 6,
        },
      ],
    });

    pie.render();
    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(3);
    expect(annotations[0].component.get('type')).toBe('text');
    expect(annotations[0].extra.content).toBe('达标区间');
    expect(annotations[1].extra.content).toBe('');
  });

  it('关闭 stastic，自定义 annotation', async () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      statistic: null,
      annotations: [
        {
          type: 'image',
          position: ['50%', '50%'],
          src: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          offsetX: -28,
          offsetY: 30,
          style: {
            width: 56,
            height: 56,
          },
        },
      ],
    });

    pie.render();

    const annotations = getAnnotations(pie.chart);
    expect(annotations.length).toBe(1);
    expect(annotations[0].component.get('type')).toBe('image');

    await delay(5000);
    pie.update({
      ...pie.options,
      annotations: [
        {
          type: 'text',
          position: ['50%', '50%'],
          content: '自定义标注文本',
          style: {
            textAlign: 'center',
          },
        },
      ],
    });
    pie.render();

    const newAnnotations = getAnnotations(pie.chart);
    expect(newAnnotations.length).toBe(1);
    expect(newAnnotations[0].component.get('type')).toBe('text');
    expect(newAnnotations[0].component.get('content')).toBe('自定义标注文本');
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
    expect(annotations[1].component.get('content')).toBe(null);
  });

  it('添加交互 interaction', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      interactions: [
        { name: 'statistic-active' },
        { name: 'legend-filter', cfg: { start: [{ trigger: 'none' /** 通过此方式可以关闭交互 */ }] } },
      ],
    });

    pie.render();

    const interactions = pie.chart.interactions;
    expect(interactions['statistic-active']).toBeDefined();
    const legendInteraction = interactions['legend-filter'];
    expect(legendInteraction).toBeDefined();
    // @ts-ignore
    expect(legendInteraction.steps['start'][0].trigger).toEqual('none');
  });

  it('自定义 statistic-active 交互的 trigger 事件', () => {
    const pie = new Pie(createDiv(), {
      ...config,
      innerRadius: 0.64,
      interactions: [
        { name: 'statistic-active', cfg: { start: [{ trigger: 'element:click', action: 'statistic:change' }] } },
      ],
    });

    pie.render();

    const interactions = pie.chart.interactions;
    const statisticInteraction = interactions['statistic-active'];
    // @ts-ignore
    expect(statisticInteraction.steps['start'][0].trigger).toEqual('element:click');
  });
});
