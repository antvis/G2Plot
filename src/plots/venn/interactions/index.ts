import { registerAction, registerInteraction } from '@antv/g2';
import { VennElementActive } from './actions/active';
import { VennElementHighlight } from './actions/highlight';
import { VennElementSelected, VennElementSingleSelected } from './actions/selected';

/** ================== 注册交互反馈 aciton ================== */

registerAction('venn-element-active', VennElementActive as any);
registerAction('venn-element-highlight', VennElementHighlight as any);
registerAction('venn-element-selected', VennElementSelected as any);
registerAction('venn-element-single-selected', VennElementSingleSelected as any);

/** ================== 注册交互 ================== */

// ========= Active 交互 =========
registerInteraction('venn-element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'venn-element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'venn-element-active:reset' }],
});

// ========= 高亮 交互 =========
registerInteraction('venn-element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'venn-element-highlight:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'venn-element-highlight:reset' }],
});

// ========= Selected 交互 =========
// 点击 venn element （可多选）
registerInteraction('venn-element-selected', {
  start: [{ trigger: 'element:click', action: 'venn-element-selected:toggle' }],
  rollback: [{ trigger: 'dblclick', action: ['venn-element-selected:reset'] }],
});
// 点击 venn element （单选）
registerInteraction('venn-element-single-selected', {
  start: [{ trigger: 'element:click', action: 'venn-element-single-selected:toggle' }],
  rollback: [{ trigger: 'dblclick', action: ['venn-element-single-selected:reset'] }],
});

// ========= 韦恩图的图例事件，单独注册 =========
// legend hover，element active
registerInteraction('venn-legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-active:active', 'venn-element-active:active'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-active:reset', 'venn-element-active:reset'] }],
});

// legend hover，element active
registerInteraction('venn-legend-highlight', {
  start: [
    {
      trigger: 'legend-item:mouseenter',
      action: ['legend-item-highlight:highlight', 'venn-element-highlight:highlight'],
    },
  ],
  end: [{ trigger: 'legend-item:mouseleave', action: ['legend-item-highlight:reset', 'venn-element-highlight:reset'] }],
});
