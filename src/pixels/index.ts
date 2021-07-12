import { size, isNil } from '@antv/util';
import { CanvasPlot, Options as CanvasPlotOptions } from './canvas';
import { TooltipController } from './components/tooltip';

interface Options extends CanvasPlotOptions {
  // 其它配置项
}

/**
 * 像素点绘制图表
 */
export class PixelPlot extends CanvasPlot<Options> {
  /** plot 的 schema 配置 */
  public options: Options;
  /** plot 绘制的 dom */
  public readonly container: HTMLElement;

  protected tooltipController: TooltipController;

  public init(): void {
    super.init();

    this.initComponents();
  }

  /**
   * 渲染
   */
  public render() {
    this.clear();
    const { data } = this.options;
    const { width, height } = this.pixelBBox;

    console.time(`render ${data.length / 4} 条数据`);

    if (size(data)) {
      const ctx = this.midCanvas.getContext('2d');

      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          const idx = j * width + i;
          // 这里可以修改
          const [r, g, b, a] = data.slice(idx * 4, (idx + 1) * 4);
          if (!(isNil(r) || isNil(g) || isNil(b || isNil(a)))) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.fillRect(i, j, 1, 1);
          }
        }
      }
    }

    console.timeEnd(`render ${data.length / 4} 条数据`);
  }

  public changeData(data: Options['data']) {
    this.options = { ...this.options, data };
    this.render();
  }

  /**
   * 绑定事件
   */
  protected bindEvents() {
    if (this.foreCanvas) {
      this.foreCanvas.on('mousemove', (evt) => {
        this.tooltipController.show(evt);
      });

      this.foreCanvas.on('mouseleave', (evt) => {
        this.tooltipController.hide();
      });
    }
  }

  /**
   * 绘制图表组件
   */
  private initComponents() {
    this.tooltipController = new TooltipController(this);
  }

  /**
   * 生命周期：清空图表上所有的绘制内容，但是不销毁图表.
   * @returns void
   */
  private clear() {
    if (this.midCanvas) {
      const { width, height } = this.options;
      const ctx = this.midCanvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
    }
    if (this.bgCanvas) this.bgCanvas.clear();
    if (this.foreCanvas) this.foreCanvas.clear();
  }
}
