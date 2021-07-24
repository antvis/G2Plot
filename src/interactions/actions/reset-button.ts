import { Action, IGroup, Util } from '@antv/g2';
import { get } from '@antv/util';
import { BBox, ButtonCfg } from '../../types';
import { deepAssign, normalPadding } from '../../utils';

const PADDING_RIGHT = 10;
const PADDING_TOP = 5;

/**
 * Action 中的 Button 按钮配置
 *
 * 可能的使用场景：brush filter
 */
export const BUTTON_ACTION_CONFIG: ButtonCfg = {
  padding: [8, 10],
  text: 'reset',
  textStyle: {
    default: {
      x: 0,
      y: 0,
      fontSize: 12,
      fill: '#333333',
      cursor: 'pointer',
    },
  },
  buttonStyle: {
    default: {
      fill: '#f7f7f7',
      stroke: '#cccccc',
      cursor: 'pointer',
    },
    active: {
      fill: '#e6e6e6',
    },
  },
};

/**
 * @override 复写 G2 Button Action, 后续直接使用 GUI
 */
class ButtonAction extends Action {
  private buttonGroup: IGroup = null;
  private buttonCfg = {
    name: 'button',
    ...BUTTON_ACTION_CONFIG,
  };

  /**
   * 获取 mix 默认的配置和用户配置
   */
  private getButtonCfg(): ButtonCfg & { name: string } {
    const { view } = this.context;
    const buttonCfg: ButtonCfg = get(view, ['interactions', 'filter-action', 'cfg', 'buttonConfig']);

    return deepAssign(this.buttonCfg, buttonCfg, this.cfg);
  }

  /**
   * 绘制 Button 和 文本
   */
  private drawButton() {
    const config = this.getButtonCfg();
    const group = this.context.view.foregroundGroup.addGroup({
      name: config.name,
    });
    const textShape = this.drawText(group);
    this.drawBackground(group, textShape.getBBox());

    this.buttonGroup = group;
  }

  /**
   * 绘制文本
   */
  private drawText(group: IGroup) {
    const config = this.getButtonCfg();
    // 添加文本
    return group.addShape({
      type: 'text',
      name: 'button-text',
      attrs: {
        text: config.text,
        ...config.textStyle?.default,
      },
    });
  }

  private drawBackground(group: IGroup, bbox: BBox) {
    const config = this.getButtonCfg();
    const padding = normalPadding(config.padding);
    // 添加背景按钮
    const buttonShape = group.addShape({
      type: 'rect',
      name: 'button-rect',
      attrs: {
        x: bbox.x - padding[3],
        y: bbox.y - padding[0],
        width: bbox.width + padding[1] + padding[3],
        height: bbox.height + padding[0] + padding[2],
        ...config.buttonStyle?.default,
      },
    });
    buttonShape.toBack(); // 在后面

    // active 效果内置
    group.on('mouseenter', () => {
      buttonShape.attr(config.buttonStyle?.active);
    });
    group.on('mouseleave', () => {
      buttonShape.attr(config.buttonStyle?.default);
    });

    return buttonShape;
  }

  // 重置位置
  private resetPosition() {
    const view = this.context.view;
    const coord = view.getCoordinate();
    const point = coord.convert({ x: 1, y: 1 }); // 后面直接改成左上角
    const buttonGroup = this.buttonGroup;
    const bbox = buttonGroup.getBBox();
    const matrix = Util.transform(null, [
      ['t', point.x - bbox.width - PADDING_RIGHT, point.y + bbox.height + PADDING_TOP],
    ]);
    buttonGroup.setMatrix(matrix);
  }

  /**
   * 显示
   */
  public show() {
    if (!this.buttonGroup) {
      this.drawButton();
    }
    this.resetPosition();
    this.buttonGroup.show();
  }

  /**
   * 隐藏
   */
  public hide() {
    if (this.buttonGroup) {
      this.buttonGroup.hide();
    }
  }

  /**
   * 销毁
   */
  public destroy() {
    const buttonGroup = this.buttonGroup;
    if (buttonGroup) {
      buttonGroup.remove();
    }
    super.destroy();
  }
}

export { ButtonAction };
