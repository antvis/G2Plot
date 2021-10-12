import { Venn } from '@antv/g2plot';

const plot = new Venn('container', {
  data: [
    { sets: ['A'], size: 12, label: 'A' },
    { sets: ['B'], size: 12, label: 'B' },
    { sets: ['C'], size: 12, label: 'C' },
    { sets: ['A', 'B'], size: 2, label: 'A&B' },
    { sets: ['A', 'C'], size: 2, label: 'A&C' },
    { sets: ['B', 'C'], size: 2, label: 'B&C' },
    { sets: ['A', 'B', 'C'], size: 1 },
  ],
  setsField: 'sets',
  sizeField: 'size',
  interactions: [
    {
      type: 'legend-highlight',
      cfg: {
        // 自定义图例高亮交互的触发行为
        start: [
          {
            trigger: 'legend-item:click',
            action: ['legend-item-highlight:highlight', 'venn-element-highlight:highlight'],
          },
        ],
        end: [
          { trigger: 'legend-item:dblclick', action: ['legend-item-highlight:reset', 'venn-element-highlight:reset'] },
        ],
      },
    },
  ],
});
plot.render();
