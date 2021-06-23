import { Tooltip } from '@antv/component';
import { Types } from '@antv/g2';

type Options = {
  width: number;
  height: number;
};

export class TooltipController {
  /** tooltip 相对图表容器 */
  protected container: HTMLElement;

  protected options: Options;

  private tooltip: Tooltip.Html;

  constructor(container: string | HTMLElement, options: Options) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.options = options;
    this.init();
  }

  public init(): void {
    const { width, height } = this.options;
    const region = {
      start: { x: 0, y: 0 },
      end: { x: width, y: height },
    };
    const tooltip = new Tooltip.Html({
      // 默认挂载在 body 上，而不是 container
      parent: this.container,
      // region,
      ...this.getTooltipCfg(),
      visible: false,
      crosshairs: null,
      items: [
        { name: 'china', value: '100', color: 'red' },
        { name: 'india', value: '200', color: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
        { name: 'england', value: '500', color: 'r(0.5, 0.5, 0.1) 0:#ffffff 0.3:#7ec2f3 1:#1890ff' },
      ],
    });
    tooltip.init();
    tooltip.render();
    this.tooltip = tooltip;
  }

  public lock() {}

  public unlock() {}

  public show(evt: MouseEvent) {
    this.tooltip.update({
      items: [{ name: '23456', value: '111', color: 'red' }],
      title: `测试: (${evt.x}, ${evt.y})`,
      x: evt.offsetX + 20 /** offset */,
      y: evt.offsetY + 20 /** offset */,
      visible: true,
    });
  }

  public hide() {
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }

  public destroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
    }
  }

  protected getTooltipCfg(): Types.TooltipCfg {
    return {
      // todo 有哪些配置
      enterable: true,
      /** 偏移 */
      offset: 20,
    };
  }
}
