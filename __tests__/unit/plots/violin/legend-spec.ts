import { Violin } from '../../../../src';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin legend', () => {
  it('没有 seriesField', () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
    });

    violin.render();

    const legendController = violin.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0].component;
    let legendItems = legendComponent.get('items');
    expect(legendItems.length).toBe(4);

    violin.update({ legend: { position: 'left' } });
    expect(legendController.getComponents()[0].direction).toBe('left');

    // 自定义 legend
    violin.update({
      legend: {
        custom: true,
        position: 'bottom',
        items: [
          {
            value: '1',
            name: '3',
            marker: { symbol: 'square', style: { fill: 'red', r: 5 } },
          },
          {
            value: '2',
            name: '3',
            marker: { symbol: 'square', style: { fill: '#000', r: 5 } },
          },
          {
            value: '3',
            name: '3',
            marker: { symbol: 'circle', style: { stroke: '#eee', r: 5 } },
          },
        ],
      },
    });
    expect(legendController.getComponents()[0].direction).toBe('bottom');
    legendItems = legendController.getComponents()[0].component.get('items');
    expect(legendItems.length).toBe(3);
    expect(legendItems[0].marker.symbol).toBe('square');
    expect(legendItems[0].marker.style.fill).toBe('red');
    expect(legendItems[2].marker.style.stroke).toBe('#eee');
    expect(legendItems[2].marker.symbol).toBe('circle');

    // 关闭 legend
    violin.update({ legend: false });
    expect(legendComponent.get('items')).toBeUndefined();

    violin.destroy();
  });

  it('有 seriesField', () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
      seriesField: 'species',
    });

    violin.render();

    const legendController = violin.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0].component;
    let legendItems = legendComponent.get('items');
    expect(legendItems.length).toBe(3);

    violin.update({ legend: { position: 'left' } });
    expect(legendController.getComponents()[0].direction).toBe('left');

    // 自定义 legend
    violin.update({
      legend: {
        custom: true,
        position: 'bottom',
        items: [
          {
            value: '1',
            name: '3',
            marker: { symbol: 'square', style: { fill: 'red', r: 5 } },
          },
          {
            value: '3',
            name: '3',
            marker: { symbol: 'circle', style: { stroke: '#eee', r: 5 } },
          },
        ],
      },
    });
    expect(legendController.getComponents()[0].direction).toBe('bottom');
    legendItems = legendController.getComponents()[0].component.get('items');
    expect(legendItems.length).toBe(2);
    expect(legendItems[0].marker.symbol).toBe('square');
    expect(legendItems[0].marker.style.fill).toBe('red');
    expect(legendItems[1].marker.style.stroke).toBe('#eee');
    expect(legendItems[1].marker.symbol).toBe('circle');

    // 关闭 legend
    violin.update({ legend: false });
    expect(legendComponent.get('items')).toBeUndefined();

    violin.destroy();
  });
});
