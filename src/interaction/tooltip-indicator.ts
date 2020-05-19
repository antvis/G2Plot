import { isEqual, last } from '@antv/util';
import BaseInteraction from './base';
import {
  IGroup,
  Element,
  InteractionAction,
  GrammarInteraction,
  registerAction,
  registerInteraction,
  VIEW_LIFE_CIRCLE,
  InteractionUtils,
} from '../dependents';
import TooltipIndicator, { IndicatorItem, EVENTS as TOOLTIP_COMPONENTS_EVENTS } from '../components/tooltip-indicator';
import { ITooltipIndicatorInteractionConfig } from '../interface/config';
import { forEachElement } from '../util/view';
import BBox from '../util/bbox';

const DEFAULT_PADDING = 8;

const getValidTooltipIndicatorConfig = (
  cfg: ITooltipIndicatorInteractionConfig = {}
): Required<ITooltipIndicatorInteractionConfig> => {
  const newCfg: Required<ITooltipIndicatorInteractionConfig> = {
    showTotal: false,
    showPercent: false,
    padding: [DEFAULT_PADDING, 24, DEFAULT_PADDING, 24],
    height: cfg.showPercent ? 72 : 54,
    ...cfg,
  };

  return newCfg;
};

export enum TOOLTIP_INDICATOR_EVENTS {
  ACTIVE_ELEMENT = 'tooltip_indicator_active_element',
  ACTIVE_ELEMENT_BY_X = 'tooltip_indicator_active_element_by_x',
}

/**
 * Tooltip Indicator Action 实现
 */
export class TooltipIndicationAction extends InteractionAction {
  private state = 'selected';
  private isSingle = false;

  /** 交互语法触发点 */
  public active() {
    const element = InteractionUtils.getCurrentElement(this.context);
    if (element.hasState('selected')) {
      if (this.isSingle) {
        this.setStateByX(element);
      } else {
        this.setState(element);
      }
    } else {
      this.setStateByX(element);
    }
  }

  /** 单个元素的 enable */
  public setState(element: Element) {
    forEachElement(this.getView(), (item) => {
      if (item === element) {
        if (!item.hasState(this.state)) {
          item.setState(this.state, true);
        }
      } else {
        item.setState(this.state, false);
      }
    });
    this.isSingle = true;
    this.getView().emit(TOOLTIP_INDICATOR_EVENTS.ACTIVE_ELEMENT, { element, isSingle: true });
  }

  /** 同 X 的元素的 enable */
  public setStateByX(element: Element) {
    const xField = this.getXField();
    const xValue = element.getData()[xField];
    forEachElement(this.getView(), (item) => {
      if (item.getData()[xField] === xValue) {
        if (!item.hasState(this.state)) {
          item.setState(this.state, true);
        }
      } else {
        item.setState(this.state, false);
      }
    });
    this.isSingle = false;
    this.getView().emit(TOOLTIP_INDICATOR_EVENTS.ACTIVE_ELEMENT_BY_X, { element, isSingle: false });
  }

  /** 通过字段值来 enable */
  public setStateByField(xFieldValue: any, groupFieldValue?: any) {
    const xField = this.getView().getXScale().field;
    const groupField = this.getView().getGroupScales()[0].field;
    forEachElement(this.getView(), (element) => {
      const data = element.getData();
      element.setState(
        this.state,
        data[xField] === xFieldValue && (groupFieldValue === undefined || data[groupField] === groupFieldValue)
      );
    });
  }

  private getView() {
    return this.context.view;
  }

  private getXField() {
    const { view } = this.context;
    return view.getXScale().field;
  }
}
registerAction('tooltip-indicator', TooltipIndicationAction);

registerInteraction('element-tooltip-indicator', {
  start: [
    {
      trigger: 'element:mousemove',
      action: 'tooltip-indicator:active',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'element:touchmove',
      action: 'tooltip-indicator:active',
      throttle: { wait: 50, leading: true, trailing: false },
    },
  ],
});

/**
 * 组件 Interaction 实现
 */
export default class TooltipIndicatorInteraction extends BaseInteraction {
  public static getInteractionRange(layerRange: BBox, interaction: ITooltipIndicatorInteractionConfig) {
    const config: Required<ITooltipIndicatorInteractionConfig> = getValidTooltipIndicatorConfig(interaction);
    const [paddingTop, , paddingBottom] = config.padding;

    return new BBox(layerRange.minX, layerRange.minY, layerRange.width, config.height + paddingTop + paddingBottom);
  }

  private component: TooltipIndicator;
  private container: IGroup;
  private curX: any;

  protected clear(): void {
    if (this.component) {
      this.component.destroy();
    }
    if (this.container) {
      this.container.remove(true);
    }
    this.component = null;
    this.container = null;
  }

  public render(): void {
    const view = this.view;
    const callback = () => {
      const xScale = this.view.getXScale();
      const lastX = last(xScale.getTicks()).tickValue;
      const padding = this.view.padding;
      if (!isEqual([0, 0, 0, 0], padding)) {
        if (this.component) {
          this.updateComponent();
        } else {
          this.createComponent();
          this.component.on(TOOLTIP_COMPONENTS_EVENTS.ON_SELECT_ITEM, this.onSelectTooltipIndicatorItem);
        }
        // 默认选中最后的 X
        this.curX = lastX;
        this.component.update({
          title: { text: xScale.getText(this.curX) },
        });
        this.component.render();
        this.getInteractionAction().setStateByField(lastX);
      }
    };

    // 移除冲突/重复的组件和交互
    view.legend(false);
    view.removeInteraction('active-region');
    view.removeInteraction('tooltip');
    view.interaction('element-tooltip-indicator');

    // 监听 View， 创建/更新组件
    view.on(VIEW_LIFE_CIRCLE.AFTER_PAINT, callback);
    view.on(VIEW_LIFE_CIRCLE.AFTER_RENDER, callback);

    // 监听组件事件，更新 action
    view.on(TOOLTIP_INDICATOR_EVENTS.ACTIVE_ELEMENT, this.onElementActive);
    view.on(TOOLTIP_INDICATOR_EVENTS.ACTIVE_ELEMENT_BY_X, this.onElementActive);
  }

  private getInteractionAction(): TooltipIndicationAction | undefined {
    const interaction = this.view.interactions['element-tooltip-indicator'] as GrammarInteraction;
    return interaction && (interaction.context.getAction('tooltip-indicator') as TooltipIndicationAction);
  }

  private createComponent() {
    const { padding } = getValidTooltipIndicatorConfig(this.getInteractionConfig());
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    const items = this.getLegendItems();
    const range = this.getRange();
    const xScale = this.view.getXScale();
    const lastX = last(xScale.getTicks()).tickValue;
    this.container = this.canvas.addGroup();
    this.component = new TooltipIndicator({
      container: this.container,
      x: range.x + paddingLeft,
      y: range.y + paddingTop,
      width: range.width - paddingLeft - paddingRight,
      height: range.height - paddingTop - paddingBottom,
      theme: this.getViewLayer().getPlotTheme(),
      items,
    });
    this.component.init();
    this.getInteractionAction().setStateByField(lastX);
  }

  private updateComponent() {
    const items = this.getLegendItems();
    this.component.update({
      items,
    });
  }

  private getLegendItems(xValue?: any): IndicatorItem[] {
    const { view } = this;
    const data = view.getData();
    const defaultColor = view.getTheme().defaultColor;
    const xScale = view.getXScale();
    const yScale = view.getYScales()[0];
    const curX = xValue || last(xScale.getTicks()).tickValue;
    const groupAttrs = view.getLegendAttributes();
    const colorAttr = groupAttrs.find((attr) => attr.type === 'color');
    const items: IndicatorItem[] = [];

    // 取第一个分组scale，暂不考虑多个分组情况
    const groupScale = view.getGroupScales()[0];
    const groupField = groupScale.field;
    if (groupScale && groupScale.isCategory) {
      // 只处理离散情况
      groupScale.getTicks().forEach((tick) => {
        const { text: name, tickValue: value } = tick;
        const color = colorAttr.mapping(value).join('') || defaultColor;
        items.push({
          id: value,
          title: name,
          color,
          values: [],
        });
      });
    }

    const selectedData = data?.filter((datum) => datum[xScale.field] === curX) || [];
    items.forEach((item) => {
      const datum = selectedData.find((curDatum) => curDatum[groupField] === item.id);
      item.values.push({
        value: yScale.formatter ? yScale.formatter(datum[yScale.field]) : datum[yScale.field],
      });
    });

    return items;
  }

  private onElementActive = ({ element, isSingle }: { element: Element; isSingle: boolean }) => {
    const xScale = this.view.getXScale();
    const xField = this.view.getXScale().field;
    const groupField = this.view.getGroupScales()[0].field;
    const data = element.getData();
    const xValue = data[xField];
    const items = this.getLegendItems(xValue);
    this.component.update({ items, title: { text: xScale.getText(xValue) } });
    this.component.render();
    if (isSingle) {
      this.component.selectItem(data[groupField]);
    }
    this.curX = xValue;
  };

  private onSelectTooltipIndicatorItem = (itemId?: string) => {
    if (this.component && itemId) {
      this.getInteractionAction().setStateByField(this.curX, itemId);
    }
  };
}
