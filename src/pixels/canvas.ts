import { Canvas } from '@antv/g-canvas';
import { getScale } from '@antv/scale';
import { Scale } from '@antv/g2';
import { deepMix, min, max, uniqueId, debounce } from '@antv/util';
import { getContainerSize, pick } from '../utils';
import { Axis as AxisOption } from '../types/axis';
import { AXIS_META_CONFIG_KEYS } from '../constant';
import { BBox, Datum, Options, ScaleMeta, ScaleOption } from './type';
import { DEFAULT_OPTIONS } from './constant';
import { getPaddingInfo, changeCanvasSize, setCanvasPosition } from './util/canvas';
import { getDefaultMetaType } from './util/scale';

/**
 * 基于原生 canvas 绘制的 plot
 */
export abstract class CanvasPlot<O extends Options> {
  public readonly type = 'canvas-plot';
  /** plot 的唯一id */
  public readonly id = uniqueId('canvas-plot');
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
  public scales = new Map<string, ScaleMeta>();

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

    // 计算画布大小 和 组件位置
    this.calculateLayout();

    // 绑定交互所需的事件
    this.bindEvents();

    // 容器自适应
    this.bindAutoFit();
  }

  /**
   * 计算 viewBBox
   */
  private calculateViewBBox() {
    const { autoFit } = this.options;
    // 如果是自适应的话，获取容器的宽高
    const { width = 800, height = 400 } = autoFit ? getContainerSize(this.container) : this.options;

    this.viewBBox = {
      x: 0,
      y: 0,
      width,
      height,
    };
  }

  /**
   * 初始化背景层：initBgCanvas
   */
  private initBgCanvas() {
    const { width, height } = this.viewBBox;
    this.container.style.position = 'relative';

    this.backgroundCanvas = new Canvas({
      container: this.container,
      width,
      height,
      localRefresh: false,
    });
    this.backgroundCanvas.get('el').id = 'bg-canvas';
  }

  /**
   * 初始化中间层：像素图 initMidCanvas
   */
  private initMidCanvas() {
    const { width, height } = this.viewBBox;
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
    const { width, height } = this.viewBBox;

    this.foregroundCanvas = new Canvas({
      container: this.container,
      width,
      height,
      localRefresh: false,
    });
    this.foregroundCanvas.get('el').id = 'fg-canvas';

    const fgCanvas = this.foregroundCanvas.get('el');
    setCanvasPosition(fgCanvas, 0, 0);
  }

  private calculateLayout(isUpdate = false) {
    this.calculatePixelBBox();

    if (isUpdate) {
      this.updateComponents();
    } else {
      this.initComponents();
    }
  }

  /**
   * 图表响应式
   */
  protected bindAutoFit() {
    const { autoFit } = this.options;

    if (autoFit) {
      window.addEventListener('resize', this.onChangeSize);
    }
  }

  /**
   * 窗口改变的响应函数
   */
  private onChangeSize = debounce(() => {
    // 更改 canvas大小
    this.changeCanvasSize();
    // 更新 ViewBBox
    this.calculateViewBBox();
    // 布局：像素画布区，组件布局
    this.calculateLayout(true);
    // 绘制：像素图 和 组件
    this.render();
  }, 300);

  /**
   * 改变三层canvas画布的大小
   */
  private changeCanvasSize() {
    const { width, height } = getContainerSize(this.container);

    changeCanvasSize(this.middleCanvas, width, height);
    this.backgroundCanvas.changeSize(width, height);
    this.foregroundCanvas.changeSize(width, height);
  }

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
   * 更新组件
   */
  protected abstract updateComponents();

  /**
   * 计算 pixelBBox
   */
  protected calculatePixelBBox() {
    const { width, height } = this.viewBBox;
    const { padding } = this.options;
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
  protected abstract renderMidCanvas();

  /**
   * 渲染
   */
  public render() {
    // 处理render前所需的data：像素图数据pixelData
    this.processData();

    // 绘制：画布和组件
    this.renderMidCanvas();
    this.renderComponents();
  }

  /**
   * 创建比例尺
   */
  public createScale(field: string, option: AxisOption): Scale {
    const { meta, rawData } = this.options;
    // 在 axis 的配置中，融合 meta 的部分属性
    const axisMetaOption = pick(option, AXIS_META_CONFIG_KEYS);

    const scaleOption = deepMix(this.getScaleCfg(meta, field, rawData), axisMetaOption);

    // 输入配置，创建比例尺
    const Scale = getScale(scaleOption.type);
    const scale = new Scale(scaleOption);

    const scaleMeta = {
      scale,
      scaleOption,
    };

    // 存入scales中
    this.scales.set(field, scaleMeta);

    return scale;
  }

  /**
   * 获取比例尺配置
   */
  private getScaleCfg(meta: Record<string, ScaleOption>, field: string, data: Datum[]) {
    // 给定默认值： type、values、range
    const type = meta[field]?.type || getDefaultMetaType(field, data); // 根据数据类型，给定默认的 type
    const range = meta[field]?.range || [0, 1]; // range默认 [0, 1]
    const values = data.map((item) => {
      if (type === 'time') {
        return new Date(item[field]).getTime();
      } else {
        return item[field];
      }
    });
    const minValue = min(values);
    const maxValue = max(values);

    const cfg = { type, range, min: minValue, max: maxValue };

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
