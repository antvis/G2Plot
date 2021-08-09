import { IGroup, IShape } from '@antv/g-canvas';
import { PixelPlot } from '../index';
import { Point, Brush, BBox } from '../type';
import { isInPixelBBox, getBrushBoxInfo } from '../util/interaction';
import { getPaddingInfo } from '../util/canvas';

export class BrushZoom {
  public pixelPlot: PixelPlot;
  /** 存储 brush 的状态 */
  private brushState: boolean;
  /** 存储 brushBBox 的图形容器 */
  public brushBox: IShape;
  /** 存储 brushBBox 的信息 */
  private brushBoxInfo: BBox;
  /** 存储 brushBox 的 prevPos 坐标 */
  private prevPos: Point;
  /** 存储 brushBox 的 currPos 坐标 */
  private currPos: Point;
  /** 重制按钮 */
  public resetButton: IGroup;
  /** 重制按钮的背景*/
  public resetButtonBg: IShape;

  constructor(pixelPlot: PixelPlot) {
    this.pixelPlot = pixelPlot;
  }

  /**
   * 绑定交互需要的事件
   */
  public bind() {
    const { brushZoom } = this.pixelPlot.options;
    const foreCanvas = this.pixelPlot.foregroundCanvas;

    if (brushZoom) {
      foreCanvas.setCursor('crosshair');
    }

    foreCanvas.on('mousedown', this.onBrushStart.bind(this));
    foreCanvas.on('mousemove', this.onBrushing.bind(this, brushZoom));
    document.addEventListener('mouseup', this.onBrushEnd.bind(this, brushZoom));
  }

  /**
   * brush-zoom：start
   */
  private onBrushStart(evt: MouseEvent) {
    const pixelBBox = this.pixelPlot.pixelBBox;
    const isInBox = isInPixelBBox(evt.x, evt.y, pixelBBox);
    // 限定交互范围
    if (!isInBox) return;
    // 确保 brushbox 被清除
    this.brushBox ? this.brushBox.remove() : null;
    // 激活 brush 交互状态
    this.brushState = true;
    // 管理 brush 信息
    this.prevPos = { x: evt.x, y: evt.y };
    // 绘制 brushbox
    this.brushBox = this.createBrushBox();
  }

  /**
   * brush-zoom：ing
   */
  private onBrushing(action: Brush, evt: MouseEvent) {
    const pixelBBox = this.pixelPlot.pixelBBox;
    const isInBox = isInPixelBBox(evt.x, evt.y, pixelBBox);
    // 限定交互范围，绘制 brushbox
    if (!this.brushState || !isInBox) return;
    // 管理 brush 信息
    this.currPos = { x: evt.x, y: evt.y };
    // 获取 brush 信息：x, y, width, height
    this.brushBoxInfo = getBrushBoxInfo(action.type, this.prevPos, this.currPos, pixelBBox);
    // 更新 brushbox
    this.brushBox.attr({
      ...this.brushBoxInfo,
    });
  }

  /**
   * brush-zoom：end
   */
  private onBrushEnd(action: Brush, evt: MouseEvent) {
    // 结束 brush 交互状态
    if (!this.brushState) return;
    this.brushState = false;
    // 结束绘制 brushbox
    this.brushBox ? this.brushBox.remove() : null;

    // 拿到 box 的信息 对角坐标， 调用 KD 的方法返回 1. 临时像素图数据  2.临时比例尺
    // const { pixelData, scales } = KD.getPixelData(this.brushBoxInfo);
    // scales = { xField : { min, max, type}, yField: {min, max, type} }
    // 或者多加一个方法： const { min, max, type } = KD.getValuesRange(field);

    // this.filterPixelData = pixelData;
    this.pixelPlot.createTempScale('date', '2021-02-03', '2022-01-15'); // 模拟数据
    this.pixelPlot.createTempScale('high', 20, 50);
    this.pixelPlot.update();
    this.pixelPlot.render();

    // 创建 重制按钮，如果存在则不会创建
    this.createResetButton();
  }

  private createBrushBox() {
    return this.pixelPlot.foregroundCanvas.addShape('rect', {
      attrs: {
        ...this.prevPos,
        fill: '#999',
        opacity: 0.3,
      },
    });
  }

  private createResetButton() {
    if (this.resetButton) return; // 如果存在则不会创建
    this.initResetBtn();
    this.bindResetBtnEvents();
  }

  private initResetBtn() {
    const cfg = this.getResetBtnCfg();

    const { padding } = this.pixelPlot.options;
    const paddingInfo = getPaddingInfo(padding);
    const btnMarginInfo = getPaddingInfo(cfg.margin);

    // 添加按钮组
    this.resetButton = this.pixelPlot.foregroundCanvas.addGroup({
      name: cfg.name,
    });
    // 添加按钮文字
    const text = this.resetButton.addShape('text', {
      attrs: {
        ...cfg.textStyle,
      },
    });
    // 添加按钮背景
    const textBBox = text.getBBox();
    const btnBg = this.resetButton.addShape('rect', {
      attrs: {
        x: paddingInfo.top + btnMarginInfo.top,
        y: paddingInfo.left + btnMarginInfo.left,
        width: textBBox.width + btnMarginInfo.left + btnMarginInfo.right,
        height: textBBox.height + btnMarginInfo.top + btnMarginInfo.bottom,
        ...cfg.bgStyle,
      },
    });
    const btnBgBBox = btnBg.getBBox();
    text.attr({
      x: btnBgBBox.x + btnBgBBox.width / 2,
      y: btnBgBBox.y + btnBgBBox.height / 2,
    });
    this.resetButtonBg = btnBg;
    // 背景放置文本后面
    btnBg.toBack();
  }

  private bindResetBtnEvents() {
    const cfg = this.getResetBtnCfg();
    this.resetButton.on('mouseenter', () => {
      this.resetButtonBg.attr({
        ...cfg.activeStyle,
      });
    });
    this.resetButton.on('mouseleave', () => {
      this.resetButtonBg.attr({
        ...cfg.bgStyle,
      });
    });
    this.resetButton.on('mousedown', () => {
      this.resetButton.destroy();
      this.resetButton = null;
      this.pixelPlot.changeFilterPixelData(null);
      this.pixelPlot.clearTempScale();

      this.pixelPlot.update();
      this.pixelPlot.render();
    });
  }

  private getResetBtnCfg() {
    return {
      name: 'reset-button',
      padding: 10,
      margin: 10,
      textStyle: {
        text: 'reset',
        fontSize: 12,
        fill: '#333333',
        cursor: 'pointer',
        textAlign: 'center' as any,
        textBaseline: 'middle' as any,
      },
      bgStyle: {
        fill: '#f7f7f7',
        stroke: '#cccccc',
        cursor: 'pointer',
      },
      activeStyle: {
        fill: '#e6e6e6',
      },
    };
  }

  public destroy() {
    const { brushZoom } = this.pixelPlot.options;
    this.pixelPlot.foregroundCanvas.off('mousedown', this.onBrushStart.bind(this));
    this.pixelPlot.foregroundCanvas.off('mousemove', this.onBrushing.bind(this, brushZoom));
    document.removeEventListener('mouseup', this.onBrushEnd.bind(this, brushZoom));
  }
}
