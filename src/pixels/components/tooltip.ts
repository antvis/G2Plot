import { Tooltip, Crosshair } from '@antv/component';
import { IGroup } from '@antv/g-canvas';
import { deepMix } from '@antv/util';
import { Tooltip as ToolOptions } from '../../types/tooltip';
import { isInPixelBBox } from '../util/interaction';
import { BBox, Point } from '../type';
import { tooltipInfo } from '../mock/data';
import { getRegionFromBBox } from '../util/canvas';
import { Controller } from './base';

export class TooltipController extends Controller<ToolOptions> {
  /** tooltipController 配置 */
  public options: ToolOptions;
  /** tooltip 实例 */
  public tooltip: Tooltip.Html;
  /** crosshair 实例 */
  public crosshair: Crosshair.Line;
  /** tooltipMarker group */
  public tooltipMarkerGroup: IGroup;

  public init(): void {
    // 初始化tooltip
    const tooltip = this.createToolTip();
    tooltip.init();

    // 初始化crosshair
    const crosshair = this.createCrosshair();
    crosshair.init();

    this.crosshair = crosshair;
    this.tooltip = tooltip;
  }

  public lock() {}

  public unlock() {}

  /**
   * 显示和更新 tooltip、crosshairs、tooltipMarkers
   */
  public show(point: Point) {
    const pixelBBox = this.pixelPlot.pixelBBox;
    const isInBox = isInPixelBBox(point.x, point.y, pixelBBox);

    // 限定交互区域为 pixelBBox
    if (isInBox) {
      // 获取 hover 像素点坐标
      const pixelPoint = {
        x: point.x - pixelBBox.x,
        y: point.y - pixelBBox.y,
      };

      this.showTooltip(point, pixelPoint);

      this.showCrosshair(point, pixelBBox);

      this.showCrossMarkers(point);
    }
  }

  public hide() {
    if (this.tooltip) this.tooltip.hide();
    if (this.crosshair) this.crosshair.hide();
    if (this.tooltipMarkerGroup) this.tooltipMarkerGroup.hide();
  }

  public render() {
    if (this.tooltip) this.tooltip.render();
    if (this.crosshair) this.crosshair.render();
  }

  public update() {}

  public destroy() {
    if (this.tooltip) this.tooltip.destroy();
    if (this.crosshair) this.crosshair.destroy();
  }

  /**
   * 创建 tooltip
   */
  private createToolTip() {
    const pixelBBox = this.pixelPlot.pixelBBox;

    return new Tooltip.Html({
      // 默认挂载在 body 上，而不是 container
      parent: this.pixelPlot.container,
      visible: false,
      crosshairs: null,
      position: 'auto',
      region: getRegionFromBBox(pixelBBox),
    });
  }

  /**
   * 创建 辅助线
   */
  private createCrosshair() {
    const crossHairCfg = {
      container: this.pixelPlot.foregroundCanvas.addGroup(),
      line: {
        style: {
          stroke: '#999',
          lineWidth: 0.5,
        },
      },
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
    };

    return new Crosshair.Line(crossHairCfg);
  }

  /**
   * 显示 Tooltip
   */
  private showTooltip(point: Point, pixelPoint: Point) {
    const { tooltip, xField } = this.pixelPlot.options;
    // mock tooltipInfo, 为KDBox.getCrossPointsByLines(pixelPoint)返回的数据
    const title = this.getTooltipInfo()[0]['data'][xField]; // 默认获取当前 横轴字段 的值
    // 处理 tooltip items
    const items = this.getTooltipItems(point);
    // 根据传过来的 follow 控制 point
    const pos = tooltip['follow'] ? point : {};

    // 更新 tooltip 位置和信息
    this.tooltip.update(
      deepMix(
        {
          title,
          items,
          ...pos,
          visible: true,
        },
        tooltip
      )
    );
  }

  /**
   * 显示 辅助线
   */
  private showCrosshair(point: Point, pixelBBox: BBox) {
    // 更新 辅助线 位置
    this.crosshair.update({
      start: { x: point.x, y: pixelBBox.height + pixelBBox.y },
      end: { x: point.x, y: pixelBBox.y },
    });
    // 绘制 辅助线
    this.crosshair.render();
    this.crosshair.show();
  }

  /**
   * 显示 辅助线标记点
   */
  private showCrossMarkers(point: Point) {
    // 添加 markerGroup，以绘制 markers
    if (this.tooltipMarkerGroup) this.tooltipMarkerGroup.destroy();
    this.tooltipMarkerGroup = this.pixelPlot.foregroundCanvas.addGroup();

    // mock tooltipInfo = KDBox.getCrossPointsByLines(point)返回的数据
    // 获取原始 tooltip 数据
    const items = this.getTooltipInfo();

    // 绘制 marker
    const defaultMarkerAttrs = {
      symbol: 'circle',
      r: 4,
      stroke: '#fff',
      lineWidth: 2,
    };
    for (const item of items) {
      const attrs = deepMix(defaultMarkerAttrs, {
        x: point.x, // item.x
        y: item.y,
        shadowColor: item['color'],
        fill: item['color'],
      });
      this.tooltipMarkerGroup.addShape('marker', { attrs });
    }
  }

  /**
   * 处理 tooltip 的 items
   */
  private getTooltipItems(pixelPoint: Point) {
    const { tooltip, seriesField, yField } = this.pixelPlot.options;
    const fields = tooltip?.['fields']; // 例如：['name', 'date', 'open' , ...]

    // mock tooltipInfo, 为KDBox.getCrossPointsByLines(pixelPoint)返回的数据
    const items = [];
    for (const item of tooltipInfo) {
      if (fields.length > 0) {
        for (const field of fields) {
          items.push({
            name: field,
            value: item.data[field],
            color: item['color'], // todo： 根据seiresField设置颜色比例尺
          });
        }
      } else {
        // 默认格式
        items.push({
          name: item.data[seriesField],
          value: item.data[yField],
          color: item['color'], // todo
        });
      }
    }
    return items;
  }

  public getTooltipInfo() {
    return tooltipInfo;
  }
}
