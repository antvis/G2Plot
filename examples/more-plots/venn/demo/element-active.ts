import { Venn, G2 } from '@antv/g2plot';
import { isEqual } from '@antv/util';

const { getActionClass, registerAction, registerInteraction } = G2;
const ElementActiveAction = getActionClass('venn-element-active') as any;

/** 用一个变量来存储 label 的初始化 visible 状态 */
const VISIBLE_STATUS = 'visible-status';

//  toggle labels 的 visible 状态
function toggleLabels(view, stateName) {
  const activeElements = view.geometries[0].elements.filter((ele) => ele.getStates().includes(stateName));
  const activeDatas = activeElements.map((ele) => ele.getData());
  const labels = view.geometries[0].labelsContainer.getChildren();
  labels.forEach((label) => {
    label.set(VISIBLE_STATUS, label.get('visible'));
    if (!activeDatas.find((d) => isEqual(d, label.get('origin').data))) {
      label.hide();
    } else {
      label.show();
    }
  });
}

// 重置 labels 的 visible 状态
function resetLabels(view) {
  const labels = view.geometries[0].labelsContainer.getChildren();
  labels.forEach((label) => {
    const visible = label.get(VISIBLE_STATUS) !== undefined ? label.get(VISIBLE_STATUS) : true;
    label.set('visible', visible);
    label.set(VISIBLE_STATUS, undefined);
  });
}

/**
 * @override 自定义韦恩图 · 图形元素激活交互
 */
class VennElementActive extends ElementActiveAction {
  /** 激活图形元素 */
  active() {
    super.active();
    this.toggleLabels();
  }

  /** toggle 图形元素激活状态 */
  toggle() {
    super.toggle();
    this.toggleLabels();
  }

  /** 重置 */
  reset() {
    super.reset();
    this.resetLabels();
  }

  /**
   * toggle labels 的 visible 状态
   */
  toggleLabels() {
    toggleLabels(this.context.view, this.stateName);
  }

  /**
   *  重置 labels 的 visible 状态
   */
  resetLabels() {
    resetLabels(this.context.view);
  }
}
// 自定义注册韦恩图 · 图形元素激活交互
registerAction('custom-venn-element-active', VennElementActive as any);
// ========= Active 交互 =========
registerInteraction('custom-venn-element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'custom-venn-element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'custom-venn-element-active:reset' }],
});

const data = [
  { sets: ['A'], size: 12, label: 'A' },
  { sets: ['B'], size: 12, label: 'B' },
  { sets: ['C'], size: 12, label: 'C' },
  { sets: ['A', 'B'], size: 2, label: 'A&B' },
  { sets: ['A', 'C'], size: 2, label: 'A&C' },
  { sets: ['B', 'C'], size: 2, label: 'B&C' },
  { sets: ['A', 'B', 'C'], size: 1, label: 'A&B&C' },
];

const plot = new Venn('container', {
  data,
  setsField: 'sets',
  sizeField: 'size',
  pointStyle: { fillOpacity: 0.8 },
  label: {
    formatter: (datum) => {
      let size = datum.size;
      data.forEach((d) => {
        if (d.label !== datum.label) {
          const contains = datum.sets.reduce((a, b) => a && d.sets.includes(b), true);
          size -= contains ? d.size : 0;
        }
      });
      return `${datum.label} ${size}`;
    },
  },
  interactions: [{ type: 'custom-venn-element-active' }],
});
plot.render();
