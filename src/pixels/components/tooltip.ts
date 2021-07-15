import { Tooltip } from '@antv/component';
import { Types } from '@antv/g2';
import { PixelPlot } from '../index';
import { isInPixelBBox } from '../util/interaction';

type Options = {
  width: number;
  height: number;
};

export class TooltipController {
  /** tooltipController 配置 */
  public options: Options;
  /** tooltip 相对图表容器 */
  public pixelPlot: PixelPlot;
  /** tooltip 实例 */
  private tooltip: Tooltip.Html;

  constructor(pixelPlot: PixelPlot) {
    this.pixelPlot = pixelPlot;
    this.init();
  }

  public init(): void {
    const tooltip = new Tooltip.Html({
      // 默认挂载在 body 上，而不是 container
      parent: this.pixelPlot.container,
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
    // tooltip.render();
    this.tooltip = tooltip;
  }

  public lock() {}

  public unlock() {}

  public show(evt: MouseEvent) {
    const { x, y } = this.pixelPlot.pixelBBox;

    const isInBox = isInPixelBBox(evt.x, evt.y, this.pixelPlot.pixelBBox);
    // 限定交互区域为 pixelBBox
    if (isInBox) {
      // 获取 hover 像素点坐标
      const pos = {
        x: evt.x - x,
        y: evt.y - y,
      };
      this.tooltip.update({
        items: [{ name: '23456', value: '111', color: 'red' }],
        title: `测试: (${pos.x}, ${pos.y})`,
        x: evt.x + 20 /** offset */,
        y: evt.y + 20 /** offset */,
        visible: true,
      });
    }
  }

  public hide() {
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }

  public render() {
    if (this.tooltip) this.tooltip.render();
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
