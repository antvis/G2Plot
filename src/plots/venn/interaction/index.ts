import { registerInteraction, registerAction } from '@antv/g2';
import { VennElementActive, VennElementSelected } from './action';

registerAction('venn-element-active', VennElementActive);
registerAction('venn-element-selected', VennElementSelected);

// 移动到 venn elment 上的 active
registerInteraction('venn-element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'venn-element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'venn-element-active:reset' }],
});

// 点击 venn element （可多选）
registerInteraction('venn-element-selected', {
  start: [{ trigger: 'element:click', action: 'venn-element-selected:toggle' }],
  rollback: [{ trigger: 'dblclick', action: ['venn-element-selected:reset'] }],
});
