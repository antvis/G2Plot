import { Radar } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('radar', () => {
  it('radar legend', () => {
    const data = [
      {
        item: 'Design',
        user: 'a',
        score: 70,
      },
      {
        item: 'Design',
        user: 'b',
        score: 30,
      },
      {
        item: 'Development',
        user: 'a',
        score: 60,
      },
      {
        item: 'Development',
        user: 'b',
        score: 70,
      },
      {
        item: 'Marketing',
        user: 'a',
        score: 60,
      },
      {
        item: 'Marketing',
        user: 'b',
        score: 50,
      },
      {
        item: 'Users',
        user: 'a',
        score: 40,
      },
      {
        item: 'Users',
        user: 'b',
        score: 50,
      },
      {
        item: 'Test',
        user: 'a',
        score: 60,
      },
      {
        item: 'Test',
        user: 'b',
        score: 70,
      },
      {
        item: 'Language',
        user: 'a',
        score: 70,
      },
      {
        item: 'Language',
        user: 'b',
        score: 50,
      },
      {
        item: 'Technology',
        user: 'a',
        score: 50,
      },
      {
        item: 'Technology',
        user: 'b',
        score: 40,
      },
      {
        item: 'Support',
        user: 'a',
        score: 30,
      },
      {
        item: 'Support',
        user: 'b',
        score: 40,
      },
      {
        item: 'Sales',
        user: 'a',
        score: 60,
      },
      {
        item: 'Sales',
        user: 'b',
        score: 40,
      },
      {
        item: 'UX',
        user: 'a',
        score: 50,
      },
      {
        item: 'UX',
        user: 'b',
        score: 60,
      },
    ];
    const radar = new Radar(createDiv('radar'), {
      data,
      height: 300,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      xAxis: {
        label: {
          offset: 15,
        },
        grid: {
          line: {
            type: 'line',
          },
        },
      },
      yAxis: {
        grid: {
          line: {
            type: 'circle',
          },
        },
      },
      point: {
        shape: 'circle',
      },
      area: {},
      legend: {
        position: 'top',
      },
    });
    radar.render();
    const { chart } = radar;
    // @ts-ignore
    expect(chart.getOptions().legends.user.position).toBe('top');
    radar.update({
      ...radar.options,
      legend: false,
    });
    expect(chart.getOptions().legends).not.toBeTruthy();
  });
});
