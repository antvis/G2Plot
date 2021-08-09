import { size, isNil, sortBy } from '@antv/util';
import { CanvasPlot } from './canvas';
import { PixelPlotOptions } from './type';
import { TooltipController } from './components/tooltip';
import { AxisController } from './components/axis';
import { BrushZoom } from './interactions/brush-zoom';

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
    this.axisController = new AxisController(this);
    this.tooltipController = new TooltipController(this);
  }

  protected renderComponents() {
    if (this.axisController) this.axisController.render();
    if (this.tooltipController) this.tooltipController.render();
  }

  protected updateComponents() {
    if (this.axisController) this.axisController.update();
    if (this.tooltipController) this.tooltipController.update();
  }

  /**
   * 处理像素图所需数据：pixelData
   */
  protected processData() {
    // 暂时外置
    // 模拟 const { pixelData } = KD.getPixelData(option);
    const { pixelData } = this.options;
    this.pixelData = pixelData;
  }

  /** 绘制像素图 */
  protected renderMidCanvas(pixelData: number[]) {
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
    // 添加 brush 交互
    const bf = new BrushZoom(this);
    bf.bind();

    // 添加 tooltip 交互
    this.tooltipAction();
  }

  /**
   * 生命周期：清空图表上所有的绘制内容，但是不销毁图表.
   * @returns void
   */
  public clear() {
    this.clearMidCanvas();
    // clear 画布会 destroy 掉组件，所以直接执行组件的 clear 即可
    if (this.axisController) this.axisController.clear();
    if (this.tooltipController) this.tooltipController.clear();
  }

  public changeFilterPixelData(data: number[]) {
    this.filterPixelData = data;
  }

  /**
   * 清空 mid 原生canvas 图层
   */
  public clearMidCanvas() {
    if (this.middleCanvas) {
      const { x, y, width, height } = this.viewBBox;
      const ctx = this.middleCanvas.getContext('2d');
      ctx.clearRect(x, y, width, height);
    }
  }

  /**
   * tooltip 交互
   */
  private tooltipAction() {
    this.foregroundCanvas.on('mousemove', (evt: MouseEvent) => {
      this.tooltipController.show(evt);
    });

    this.foregroundCanvas.on('mouseleave', (evt: MouseEvent) => {
      this.tooltipController.hide();
    });
  }
}
