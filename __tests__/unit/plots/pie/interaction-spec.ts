import { getInteraction, getActionClass } from '@antv/g2';
import InteractionContext from '@antv/g2/lib/interaction/context';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';
import { Pie } from '../../../../src';
import { StatisticAction } from '../../../../src/plots/pie/interaction';

describe('register interaction', () => {
  it('创建 "statistic" action', () => {
    const action = getActionClass('statistic');
    expect(action).toBe(StatisticAction);
    expect(action.name).toBe('StatisticAction');
  });

  it('注册 "statistic-active" 交互', () => {
    const statisticInteraction = getInteraction('statistic-active');
    expect(statisticInteraction).toBeDefined();
  });

  const pie = new Pie(createDiv(), {
    width: 400,
    height: 300,
    data: [
      { type: 'item1', value: 10 },
      { type: 'item2', value: 13 },
    ],
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.64,
    statistic: {
      title: { formatter: (item, data) => (!Array.isArray(data) ? item.title : 'Total') },
    },
  });

  pie.render();

  const context = new InteractionContext(pie.chart);
  const action = new StatisticAction(context);

  it('触发 statistic:change', async () => {
    context.event = { data: { data: { type: 'item3', value: 13 } } };
    action.change();

    delay(5000);
    const annotations = context.view.getComponents().filter((co) => co.type === 'annotation');
    expect(annotations[0].extra.content).toBe('item3');
    expect(annotations[1].extra.content).toBe(13);
  });

  it('触发 statistic:reset', async () => {
    action.reset();

    delay(5000);
    const annotations = context.view.getComponents().filter((co) => co.type === 'annotation');
    expect(annotations[0].extra.content).toBe('Total');
  });
});
