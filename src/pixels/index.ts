import { size, isNil } from '@antv/util';
import { CanvasPlot } from './canvas';
import { PixelPlotOptions } from './type';
import { TooltipController } from './components/tooltip';
import { AxisController } from './components/axis';

/**
 * 像素点绘制图表
 */
export class PixelPlot extends CanvasPlot<PixelPlotOptions> {
  /** tooltip组件控制器 */
  public tooltipController: TooltipController;
  /** axis组件控制器 */
  public axisController: AxisController;

  /**
   * 暂时把图表所需组件放置在子类中
   */
  protected initComponents() {
    this.tooltipController = new TooltipController(this);
    this.axisController = new AxisController(this);
  }

  protected renderComponents() {
    if (this.tooltipController) this.tooltipController.render();
    if (this.axisController) this.axisController.render();
  }

  /**
   * 处理像素图所需数据：pixelData
   */
  protected processData() {}

  /** 绘制像素图 */
  protected paintMidCanvas() {
    const { pixelData } = this.options;
    const { x, y, width, height } = this.pixelBBox;

    // 像素图数据
    if (size(pixelData)) {
      const ctx = this.middleCanvas.getContext('2d');
      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          const idx = j * width + i;
          const [r, g, b, a] = pixelData.slice(idx * 4, (idx + 1) * 4);
          if (!(isNil(r) || isNil(g) || isNil(b || isNil(a)))) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.fillRect(i + x, j + y, 1, 1);
          }
        }
      }
    }
  }

  public changeData(rawData: PixelPlotOptions['rawData']) {
    this.options = { ...this.options, rawData };
    this.clear();
    this.render();
  }

  /**
   * 绑定事件
   */
  protected bindEvents() {
    if (this.foregroundCanvas) {
      this.foregroundCanvas.on('mousemove', (evt) => {
        this.tooltipController.show(evt);
      });

      this.foregroundCanvas.on('mouseleave', (evt) => {
        this.tooltipController.hide();
      });
    }
  }

  /**
   * 生命周期：清空图表上所有的绘制内容，但是不销毁图表.
   * @returns void
   */
  public clear() {
    if (this.middleCanvas) {
      const { width, height } = this.options;
      const ctx = this.middleCanvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
    }
    if (this.backgroundCanvas) this.backgroundCanvas.clear();
    if (this.foregroundCanvas) this.foregroundCanvas.clear();
  }
}
