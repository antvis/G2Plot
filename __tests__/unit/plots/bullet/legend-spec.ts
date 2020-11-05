import { Bullet } from '../../../../src';
import { bulletData, bulletDatas } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('bullet*legend', () => {
  it('custom legend', () => {
    const rangeColors = ['#FFB1AC', '#FFDBA2', '#B4EBBF'];
    const bullet = new Bullet(createDiv('custom legend bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      color: {
        range: rangeColors,
        measure: ['red', 'green'],
        target: 'blue',
      },
      legend: {
        custom: true,
        position: 'bottom',
        items: [
          {
            value: '差',
            name: '差',
            marker: { symbol: 'square', style: { fill: '#FFB1AC', r: 5 } },
          },
          {
            value: '良',
            name: '良',
            marker: { symbol: 'square', style: { fill: '#FFDBA2', r: 5 } },
          },
          {
            value: '优',
            name: '优',
            marker: { symbol: 'square', style: { fill: '#B4EBBF', r: 5 } },
          },
          {
            value: '实际值',
            name: '实际值',
            marker: { symbol: 'square', style: { fill: '#223273', r: 5 } },
          },
          {
            value: '目标值',
            name: '目标值',
            marker: { symbol: 'line', style: { stroke: 'blue', r: 5 } },
          },
        ],
      },
    });

    bullet.render();
    const chart = bullet.chart;

    const legendBBox = chart.getController('legend').getComponents()[0].component.getBBox();
    const viewBBox = chart.viewBBox;

    expect(chart.getController('legend').getComponents()[0].direction).toEqual('bottom');
    expect(legendBBox.minX > 0).toBe(true);
    expect(legendBBox.minY > 0).toBe(true);
    // 是否小于 viewBox 的 最大 y 值
    expect(legendBBox.y < viewBBox.maxY).toBe(true);

    // 是否小于 viewBox 的 最大 x 值
    expect(legendBBox.x < viewBBox.maxX).toBe(true);

    bullet.destroy();
  });

  it('custom stack legend', () => {
    const rangeColors = ['#FFB1AC', '#FFDBA2', '#B4EBBF'];
    const bullet = new Bullet(createDiv('custom*stack*legend bullet'), {
      width: 400,
      height: 100,
      data: bulletDatas,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      color: {
        range: rangeColors,
        measure: ['red', 'green'],
        target: 'blue',
      },
      legend: {
        custom: true,
        position: 'bottom',
        items: [
          {
            value: '第一季度',
            name: '第一季度',
            marker: { symbol: 'square', style: { fill: 'red', r: 5 } },
          },
          {
            value: '第二季度',
            name: '第二季度',
            marker: { symbol: 'square', style: { fill: 'green', r: 5 } },
          },
          {
            value: '目标值',
            name: '目标值',
            marker: { symbol: 'line', style: { stroke: 'blue', r: 5 } },
          },
        ],
      },
    });

    bullet.render();

    const chart = bullet.chart;

    const legendBBox = chart.getController('legend').getComponents()[0].component.getBBox();
    const viewBBox = chart.viewBBox;

    expect(chart.getController('legend').getComponents()[0].direction).toEqual('bottom');
    expect(legendBBox.minX > 0).toBe(true);
    expect(legendBBox.minY > 0).toBe(true);
    // 是否小于 viewBox 的 最大 y 值
    expect(legendBBox.y < viewBBox.maxY).toBe(true);

    // 是否小于 viewBox 的 最大 x 值
    expect(legendBBox.x < viewBBox.maxX).toBe(true);

    bullet.destroy();
  });
});
