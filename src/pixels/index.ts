import { size, isNil, deepMix, min, max } from '@antv/util';
import { getScale } from '@antv/scale';
import { Scale } from '@antv/g2';
import { CanvasPlot } from './canvas';
import { TooltipController } from './components/tooltip';
import { AxisController } from './components/axis';
import { PixelPlotOptions, Datum, Meta } from './type';
import { getDefaultMetaType } from './util/scale';

/**
 * 像素点绘制图表
 */
export class PixelPlot extends CanvasPlot<PixelPlotOptions> {
  /** tooltip组件控制器 */
  public tooltipController: TooltipController;
  /** axis组件控制器 */
  public axisController: AxisController;

  protected init(): void {
    super.init();

    this.initComponents();
  }

  /**
   * 渲染
   */
  public render() {
    // this.clear(); todo 渲染流程相关
    this.paintMidCanvas();
    this.renderComponents();
  }

  /**
   * 渲染像素图
   */
  private paintMidCanvas() {
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
   * 初始化图表组件
   */
  protected initComponents() {
    this.tooltipController = new TooltipController(this);
    this.axisController = new AxisController(this);
  }

  /**
   * 渲染组件
   */
  protected renderComponents() {
    if (this.tooltipController) this.tooltipController.render();
    if (this.axisController) this.axisController.render();
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

  /**
   * 创建比例尺
   */
  public createScale(field: string): Scale {
    const { meta, rawData } = this.options;
    const scaleCfg = this.getScaleCfg(meta, field, rawData);

    // 输入配置，创建比例尺
    const Scale = getScale(scaleCfg.type);
    const scale = new Scale(scaleCfg);

    return scale;
  }

  /**
   * 获取比例尺配置
   */
  private getScaleCfg(meta: Record<string, Meta>, field: string, data: Datum[]) {
    // 给定默认值： type、values、range
    const type = meta[field]?.type || getDefaultMetaType(field, data); // 根据数据类型，给定默认的 type
    const range = meta[field]?.range || [0, 1]; // range默认 [0, 1]
    const values = data.map((item) => item[field]);

    // 如果类型是 time，获取日期的最大最小值. 直接使用 values 有问题
    let minValue = null,
      maxValue = null;
    if (type === 'time') {
      const timeData = data.map((item) => new Date(item[field]).getTime());
      minValue = min(timeData);
      maxValue = max(timeData);
    }

    const cfg = { type, values, range, min: minValue, max: maxValue };

    return deepMix({}, cfg, meta[field]);
  }
}
