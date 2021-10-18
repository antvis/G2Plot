import { IGroup } from '@antv/g-canvas';
import { size, isNil, uniq, clone } from '@antv/util';
import { CanvasPlot } from './canvas';
import { PixelPlotOptions } from './type';
import { TooltipController } from './components/tooltip';
import { AxisController } from './components/axis';
import AliTVSTree from './kdtree';

/**
 * 像素点绘制图表
 */
export class PixelPlot extends CanvasPlot<PixelPlotOptions> {
  /** tooltip组件控制器 */
  public tooltipController: TooltipController;
  /** axis组件控制器 */
  public axisController: AxisController;
  /** active 交互 */
  public activeLinesGroup: IGroup;
  /** TVSTree算法 */
  public TVSTree;

  protected init() {
    super.init();
  }

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
    const { rawData, xField, yField } = this.options;

    // 预处理数据（耗时）：kdtree 所需的数据结构：二维数组
    const data = [];
    console.time('process data');
    const allNames = uniq(rawData.map((item) => item.name));
    for (const name of allNames) {
      const line = rawData.filter((item) => item.name === name);
      data.push(line);
    }
    console.timeEnd('process data');

    // 获取比例尺
    const xScale = this.scales.get(xField).scale;
    const yScale = this.scales.get(yField).scale;
    // use antv/scale to draw pixel lines
    // yRange: [0, 1] => [1, 0] * height + topPadding
    const cloneYScale = clone(yScale);
    const [a, b] = cloneYScale.range;
    cloneYScale.range = [b, a];

    console.time('tvstree');
    this.TVSTree = new AliTVSTree(data, xField, yField, xScale, cloneYScale, this.pixelBBox, this.viewBBox);
    console.timeEnd('tvstree');
  }

  /** 绘制像素图 */
  protected renderMidCanvas() {
    this.clearMidCanvas();

    // 颜色映射
    const rgb = (i) => {
      const colormap = [
        [252, 253, 191],
        [254, 206, 145],
        [254, 159, 109],
        [247, 111, 92],
        [222, 73, 104],
        [182, 55, 122],
        [140, 41, 129],
        [101, 26, 128],
        [59, 15, 112],
        [21, 14, 55],
        [0, 0, 4],
      ];
      if (i <= 0) return colormap[0];
      if (i >= 1) return colormap[10];
      const base = Math.floor(i * 10);
      const result = colormap[base].map((v, ci) => v + (colormap[base + 1][ci] - v) * (i * 10 - base));
      return result;
    };

    console.time('render');
    this.TVSTree.render(this.middleCanvas, rgb);
    console.timeEnd('render');
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
        this.showLines(evt);
        this.tooltipController.show(evt);
      });

      this.foregroundCanvas.on('mouseleave', (evt) => {
        this.hideLines();
        this.tooltipController.hide();
      });
    }
  }

  private showLines(evt) {
    const { x, y } = evt;

    if (this.activeLinesGroup) this.activeLinesGroup.destroy();
    this.activeLinesGroup = this.foregroundCanvas.addGroup();

    // const { lines } = this.TVSTree.getHoverLines(x, y, 1, 3); // r: 1, topN: 3
    const { line } = this.TVSTree.getCrossPoints(x, y);

    // for (const line of lines) {
    const polyPoints = line.map((item) => [item.x, item.y]);
    this.activeLinesGroup.addShape('polyline', {
      attrs: {
        points: polyPoints,
        stroke: '#1890FF',
        lineWidth: 1,
      },
    });
    // }
  }

  private hideLines() {
    if (this.activeLinesGroup) this.activeLinesGroup.destroy();
  }

  /**
   * 生命周期：清空图表上所有的绘制内容，但是不销毁图表.
   * @returns void
   */
  public clear() {
    this.clearMidCanvas();
    if (this.backgroundCanvas) this.backgroundCanvas.clear();
    if (this.foregroundCanvas) this.foregroundCanvas.clear();
  }

  public clearMidCanvas() {
    if (this.middleCanvas) {
      const { x, y, width, height } = this.viewBBox;
      const ctx = this.middleCanvas.getContext('2d');
      ctx.clearRect(x, y, width, height);
    }
  }
}
