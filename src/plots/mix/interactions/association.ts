import { Action, Element, registerAction, registerInteraction, View } from '@antv/g2';
import { each, get, isArray, map } from '@antv/util';
import { getAllElements, getSiblingViews, getViews } from '../../../utils';
import { clearHighlight, getElementValue } from './utils';

type EventItem = { element: Element; view: View; active: boolean; inactive: boolean };
type ActionParams = { linkField?: string; dim?: 'x' | 'y' };
/**
 * 存在多个 view 时，view 之间的联动交互
 *
 * 提供四个反馈 action，均接受参数：linkField 关联字段，dim 维度
 * 1. showTooltip
 * 2. active
 * 3. highlight
 * 4. selected
 *
 * 附加，两个结束反馈 action：
 * 1. hidetooltip
 * 2. reset 清除激活和高亮状态
 */
class Association extends Action {
  /**
   * 获取关联的 elements
   *
   * - 如果 dim 参数存在，根据 dim 获取相应的 field。与 linkField 不匹配则 return
   * - 否则 dim 参数不存在，且 linkField 存在，则作为关联字段
   * - 否则若 linkField 不存在，则获取第一个分类字段
   * @returns EventItem[]
   */
  private getAssociationItems(views: View[], params?: ActionParams): EventItem[] {
    const { event } = this.context;
    const { linkField, dim } = params || {};

    const items = [];

    if (event.data?.data) {
      const { data } = event.data;
      each(views, (v: View) => {
        let field = linkField;
        if (dim === 'x') {
          field = v.getXScale().field;
        } else if (dim === 'y') {
          field = v.getYScales().find((s) => s.field === field)?.field;
        } else if (!field) {
          field = v.getGroupScales()[0]?.field;
        }
        if (!field) {
          return;
        }
        const elements = map(getAllElements(v), (ele) => {
          let active = false;
          let inactive = false;
          const dataValue = isArray(data) ? get(data[0], field) : get(data, field);
          if (getElementValue(ele, field) === dataValue) {
            active = true;
          } else {
            inactive = true;
          }
          return { element: ele, view: v, active, inactive };
        });
        items.push(...elements);
      });
    }

    return items;
  }

  /**
   * 所有同一层级的 tooltip 显示
   */
  public showTooltip(params?: ActionParams) {
    const siblings = getSiblingViews(this.context.view);
    const elements = this.getAssociationItems(siblings, params);

    each(elements, (ele) => {
      if (ele.active) {
        const box = ele.element.shape.getCanvasBBox();
        ele.view.showTooltip({ x: box.minX + box.width / 2, y: box.minY + box.height / 2 });
      }
    });
  }

  /**
   * 隐藏同一层级的 tooltip
   */
  public hideTooltip() {
    const siblings = getSiblingViews(this.context.view);
    each(siblings, (sibling) => {
      sibling.hideTooltip();
    });
  }

  /**
   * 设置 active 状态
   */
  public active(params?: ActionParams) {
    const views = getViews(this.context.view);
    const items = this.getAssociationItems(views, params);

    each(items, (item: EventItem) => {
      const { active, element } = item;
      if (active) {
        element.setState('active', true);
      }
    });
  }

  /**
   * 设置 selected 状态
   */
  public selected(params?: ActionParams) {
    const views = getViews(this.context.view);
    const items = this.getAssociationItems(views, params);

    each(items, (item: EventItem) => {
      const { active, element } = item;
      if (active) {
        element.setState('selected', true);
      }
    });
  }

  /**
   * 进行高亮 => 设置 inactive 状态
   */
  public highlight(params?: ActionParams) {
    const views = getViews(this.context.view);
    const items = this.getAssociationItems(views, params);

    each(items, (item: EventItem) => {
      const { inactive, element } = item;
      if (inactive) {
        element.setState('inactive', true);
      }
    });
  }

  public reset() {
    const views = getViews(this.context.view);
    each(views, (v) => {
      clearHighlight(v);
    });
  }
}

registerAction('association', Association);

/**
 * 相邻 view 的 active 联动（相同维值的 tooltip 联动）
 */
registerInteraction('association-active', {
  start: [{ trigger: 'element:mouseenter', action: 'association:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'association:reset' }],
});

/**
 * 相邻 view 的 active 联动（相同维值的 tooltip 联动）
 */
registerInteraction('association-selected', {
  start: [{ trigger: 'element:mouseenter', action: 'association:selected' }],
  end: [{ trigger: 'element:mouseleave', action: 'association:reset' }],
});

/**
 * 相邻 view 的 highlight 联动, 突出当前 element
 */
registerInteraction('association-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'association:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'association:reset' }],
});

/**
 * 相邻 view 的 tooltip 联动，根据 groupField 进行关联（相同维值的 tooltip 联动）
 */
registerInteraction('association-tooltip', {
  start: [{ trigger: 'element:mousemove', action: 'association:showTooltip' }],
  end: [{ trigger: 'element:mouseleave', action: 'association:hideTooltip' }],
});
