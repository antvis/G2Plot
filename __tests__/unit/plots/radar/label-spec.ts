import { Radar } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('radar', () => {
  const data = [
    {
      item: 'Design',
      score: 70,
    },
    {
      item: 'Development',
      score: 60,
    },
    {
      item: 'Marketing',
      score: 60,
    },
    {
      item: 'Users',
      score: 40,
    },
    {
      item: 'Test',
      score: 60,
    },
    {
      item: 'Language',
      score: 70,
    },
    {
      item: 'Technology',
      score: 50,
    },
    {
      item: 'Support',
      score: 30,
    },
    {
      item: 'Sales',
      score: 60,
    },
    {
      item: 'UX',
      score: 50,
    },
  ];

  it('radar label', () => {
    const radar = new Radar(createDiv('radar'), {
      data,
      height: 300,
      xField: 'item',
      yField: 'score',
      meta: {
        score: {
          alias: '分数',
        },
      },
      xAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      },
      point: {},
      label: {
        content: 'content',
      },
    });
    radar.render();
    const { chart } = radar;
    const geometry = chart.geometries.filter((geometry) => geometry.type === 'line');
    const { labelOption } = geometry[0];
    // @ts-ignore
    expect(labelOption.cfg.content).toBe('content');

    radar.destroy();
  });

  it('radar label formatter', () => {
    const radar = new Radar(createDiv('radar'), {
      data,
      height: 300,
      xField: 'item',
      yField: 'score',
      meta: {
        score: {
          alias: '分数',
        },
      },
      xAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      },
      point: {},
      label: {
        formatter: 'content',
      },
    });
    radar.render();
    const { chart } = radar;
    const geometry = chart.geometries.filter((geometry) => geometry.type === 'line');
    const { labelOption } = geometry[0];
    // @ts-ignore
    expect(labelOption.cfg.content).toBe('content');

    radar.destroy();
  });
});
