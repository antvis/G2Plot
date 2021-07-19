import { Canvas } from '@antv/g-canvas';
import { getScale } from '@antv/scale';
import { Scale } from '@antv/g2';
import { deepMix, min, max } from '@antv/util';
import { DEFAULT_OPTIONS } from './constant';
import { setCanvasPosition } from './util/canvas';
import { getPaddingInfo } from './util/canvas';
import { getDefaultMetaType } from './util/scale';
import { BBox, Datum, Meta, Options } from './type';

/**
 * 基于原生 canvas 绘制的 plot
 */
export abstract class CanvasPlot<O extends Options> {
  public readonly type = 'canvas-plot';
  /** plot 的配置 */
  public options: O;
  /** plot 绘制的 dom */
  public readonly container: HTMLElement;
  /** 用于存放 antv/components 的图层：如 axes、grid、背景 */
  public backgroundCanvas: Canvas;
  /** 原生canvas，用于绘制像素图 */
  public middleCanvas: HTMLCanvasElement;
  /** 用于存放 antv/components（legend、slider等） + 交互（brush、hover等）的图层 */
  public foregroundCanvas: Canvas;
  /** 画布包围盒 */
  public viewBBox: BBox;
  /** 像素图包围盒：viewBBox - padding */
  public pixelBBox: BBox;
  /** 存储所有的scale */
  public scales: Map<string, Scale>;

  constructor(container: string | HTMLElement, options: O) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.options = deepMix({}, DEFAULT_OPTIONS, options);

    this.init();
  }

  protected init() {
    // 计算viewBBox，如果是autofit，会拿到实际的容器大小
    this.calculateViewBBox();

    // 生成三层画布
    this.initBgCanvas();
    this.initMidCanvas();
    this.initFgCanvas();

    // 绑定交互所需的事件
    this.bindEvents();

    // 容器自适应
    this.bindAutoFit();
  }

  /**
   * 计算 viewBBox
   */
  private calculateViewBBox() {}

  /**
   * 初始化背景层：initBgCanvas
   */
  private initBgCanvas() {
    const { width, height } = this.options;
    this.container.style.position = 'relative';

    this.backgroundCanvas = new Canvas({
      container: this.container,
      width,
      height,
    });
    this.backgroundCanvas.get('el').id = 'bg-canvas';
  }

  /**
   * 初始化中间层：像素图 initMidCanvas
   */
  private initMidCanvas() {
    const { width, height } = this.options;

    const canvas = document.createElement('canvas');
    canvas.id = 'mid-canvas';
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);

    setCanvasPosition(canvas, 0, 0);

    this.container.appendChild(canvas);

    this.middleCanvas = canvas;
  }

  /**
   * 初始化前景层 initForeCanvas
   */
  private initFgCanvas() {
    const { width, height } = this.options;

    this.foregroundCanvas = new Canvas({
      container: this.container,
      width,
      height,
    });
    this.foregroundCanvas.get('el').id = 'fg-canvas';

    const fgCanvas = this.foregroundCanvas.get('el');
    setCanvasPosition(fgCanvas, 0, 0);
  }

  /**
   * 图表响应式
   */
  protected bindAutoFit() {}

  /**
   * 处理像素图所需的数据，密度趋势图有单独处理的算法
   */
  protected abstract processData();

  /**
   * 初始化组件
   */
  protected abstract initComponents();

  /**
   * 绘制组件
   */
  protected abstract renderComponents();

  /**
   * 计算 pixelBBox
   */
  protected calculatePixelBBox() {
    const { padding, width, height } = this.options;
    const paddingInfo = getPaddingInfo(padding);

    this.pixelBBox = {
      x: paddingInfo.left,
      y: paddingInfo.top,
      width: width - (paddingInfo.left + paddingInfo.right),
      height: height - (paddingInfo.top + paddingInfo.bottom),
    };
  }

  /**
   * 密度趋势图有单独的绘制方法
   */
  protected abstract paintMidCanvas();

  /**
   * 渲染
   */
  public render() {
    // 处理render前所需的data：像素图数据pixelData
    this.processData();

    // 布局：布局组件位置、确定像素图绘制区域
    this.calculatePixelBBox();
    this.initComponents();

    // 绘制：画布和组件
    this.paintMidCanvas();
    this.renderComponents();
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

  /**
   * 更新数据
   * @param data
   */
  public abstract changeData(data: O['rawData']): void;

  /**
   * 绑定事件
   */
  protected abstract bindEvents();

  /**
   * 清空画布
   */
  public abstract clear();

  /**
   * 生命周期: 销毁 container 中的所有 canvas
   */
  public destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
