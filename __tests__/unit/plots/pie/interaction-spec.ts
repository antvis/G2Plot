import { getInteraction, getActionClass } from '@antv/g2';
import { StatisticAction } from '../../../../src/plots/pie/interaction';

describe('register interaction', () => {
  it('register interaction "statistic-active"', () => {
    const statiscInteraction = getInteraction('statistic-active');
    expect(statiscInteraction).toBeDefined();
  });

  it('create statistic action', () => {
    const action = getActionClass('statistic');
    expect(action).toBe(StatisticAction);
    expect(action.name).toBe('StatisticAction');
  });
});
