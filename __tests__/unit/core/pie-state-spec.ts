import { Pie } from '../../../src';
import { salesByArea } from '../../data/sales';
import { createDiv } from '../../utils/dom';

describe('pie-state', () => {
  const pie = new Pie(createDiv('饼图状态'), {
    width: 400,
    height: 400,
    data: salesByArea,
    angleField: 'sales',
    colorField: 'area',
    radius: 0.8,
    autoFit: false,
    interactions: [{ type: 'element-selected' }],
  });

  it('state', async () => {
    pie.render();

    // 注意，如果 autoFit 会触发一次 render，导致 setState 的状态又还原了（实际场景，自己处理一个时机即可）
    pie.setState('selected', (data) => (data as any).area === salesByArea[0].area);
    expect(pie.getStates().length).toBe(1);

    pie.chart.geometries[0].elements[0].setState('selected', false);
    expect(pie.getStates().length).toBe(0);

    pie.setState('selected', (data) => (data as any).area === salesByArea[2].area);
    expect(pie.getStates().length).toBe(1);
    // 取消 selected
    pie.setState('selected', (data) => (data as any).area === salesByArea[2].area, false);
    expect(pie.getStates().length).toBe(0);
  });

  it('interaction', () => {
    expect(pie.chart.interactions['legend-filter']).not.toBeUndefined();

    pie.update({
      ...pie.options,
      interactions: [
        { type: 'element-selected', enable: false },
        { type: 'legend-filter', enable: false },
      ],
    });

    expect(pie.chart.interactions['element-selected']).toBeUndefined();
    expect(pie.chart.interactions['legend-filter']).toBeUndefined();
  });

  afterAll(() => {
    pie.destroy();
  });
});
