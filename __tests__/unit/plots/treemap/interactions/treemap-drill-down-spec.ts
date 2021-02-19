import { getInteraction } from '@antv/g2';
import InteractionContext from '@antv/g2/lib/interaction/context';
import { delay } from '../../../../utils/delay';
import { createDiv } from '../../../../utils/dom';
import { Treemap } from '../../../../../src';
import { TreemapDrillDownAction } from '../../../../../src/plots/treemap/interactions/actions/treemap-drill-down-action';

const data = {
  name: 'root',
  children: [
    {
      name: '欧洲',
      children: [
        {
          name: '东欧',
          children: [
            {
              name: '俄罗斯',
              value: 6000,
            },
            {
              name: '波兰',
              value: 1000,
            },
          ],
        },
        {
          name: '西欧',
          children: [
            {
              name: '英国',
              value: 9000,
            },
            {
              name: '德国',
              value: 2000,
            },
          ],
        },
      ],
    },
    {
      name: '亚洲',
      children: [
        {
          name: '东亚',
          children: [
            {
              name: '中国',
              value: 4000,
            },
            {
              name: '日本',
              value: 2000,
            },
          ],
        },
      ],
    },
  ],
};

describe('drill-down intera', () => {
  it('drill-down is defined', () => {
    const interaction = getInteraction('treemap-drill-down');
    expect(interaction).toBeDefined();
  });

  it('action test', async () => {
    const treemapPlot = new Treemap(createDiv(), {
      data,
      colorField: 'name',
      hierarchyConfig: {
        tile: 'treemapDice',
      },
      interactions: [
        {
          type: 'treemap-drill-down',
        },
      ],
    });

    treemapPlot.render();

    // @ts-ignore
    const context = new InteractionContext(treemapPlot.chart);
    const drillDownAction = new TreemapDrillDownAction(context);

    context.event = {
      type: 'custom',
      data: {
        data: data.children[0],
      },
    };

    drillDownAction.click();

    // @ts-ignore
    const nowData = treemapPlot.chart.getData();
    expect(nowData.length).toBe(2);
    expect(nowData[0].name).toBe('西欧');
    expect(nowData[1].name).toBe('东欧');
    expect(nowData[0].y).toEqual([1, 1, 0, 0]);
    expect(nowData[1].y).toEqual([1, 1, 0, 0]);

    await delay(1000);

    drillDownAction.reset();

    // @ts-ignore
    const nowData1 = treemapPlot.chart.getData();
    expect(nowData1.length).toBe(2);
    expect(nowData1[0].name).toBe('欧洲');
    expect(nowData1[1].name).toBe('亚洲');

    treemapPlot.destroy();
  });
});
