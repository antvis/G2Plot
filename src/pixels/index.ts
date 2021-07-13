import { size, isNil } from '@antv/util';
import { getScale } from '@antv/scale';
import { CanvasPlot, Options as CanvasPlotOptions } from './canvas';
import { TooltipController } from './components/tooltip';
import { AxisController } from './components/axis';
import { PixelPlotOptions } from './type';

/**
 * 像素点绘制图表
 */
export class PixelPlot extends CanvasPlot<PixelPlotOptions> {
  private tooltipController: TooltipController;

  private axisController: AxisController;

  protected init(): void {
    super.init();

    this.initComponents();
  }

  /**
   * 渲染
   */
  public render() {
    this.clear();
    const { pixelData } = this.options;
    const { width, height } = this.pixelBBox;

    console.time(`render ${pixelData.length / 4} 条数据`);

    if (size(pixelData)) {
      const ctx = this.middleCanvas.getContext('2d');

      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          const idx = j * width + i;
          // 这里可以修改
          const [r, g, b, a] = pixelData.slice(idx * 4, (idx + 1) * 4);
          if (!(isNil(r) || isNil(g) || isNil(b || isNil(a)))) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.fillRect(i, j, 1, 1);
          }
        }
      }
    }

    console.timeEnd(`render ${pixelData.length / 4} 条数据`);
  }

  public changeData(rawData: PixelPlotOptions['rawData']) {
    this.options = { ...this.options, rawData };
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
   * 绘制图表组件
   */
  protected initComponents() {
    this.tooltipController = new TooltipController(this);
    // this.axisController = new AxisController(this);
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
