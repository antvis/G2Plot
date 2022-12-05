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
  pointStyle: { fillOpacity: 0.8 },
  interactions: [
    {
      type: 'legend-active',
      cfg: {
        // 自定义图例激活交互的触发行为和反馈
        start: [
          { trigger: 'legend-item:mouseenter', action: ['cursor:pointer'] },
          { trigger: 'legend-item:click', action: ['list-highlight:highlight', 'venn-element-active:active'] },
        ],
        end: [
          { trigger: 'legend-item:mouseleave', action: ['cursor:default'] },
          { trigger: 'legend-item:dblclick', action: ['list-highlight:reset', 'venn-element-active:reset'] },
        ],
      },
    },
  ],
});
plot.render();
