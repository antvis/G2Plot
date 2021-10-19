import { Tooltip, Crosshair } from '@antv/component';
import { IGroup } from '@antv/g-canvas';
import { deepMix, get, isFunction } from '@antv/util';
import { Tooltip as ToolOptions } from '../../types/tooltip';
import { getRegionFromBBox } from '../util/canvas';
import { isInPixelBBox } from '../util/interaction';
import { Point } from '../type';
import { tooltipInfo } from '../mock/data';
import { Controller } from './base';

export class TooltipController extends Controller<ToolOptions> {
  /** tooltipController 配置 */
  public options: ToolOptions;
  /** tooltip 实例 */
  public tooltip: Tooltip.Html;
  /** crosshair 实例 */
  public xCrosshair: Crosshair.Line;
  public yCrosshair: Crosshair.Line;
  /** tooltipMarker group */
  public tooltipMarkerGroup: IGroup;

  public init(): void {
    // 初始化tooltip
    const tooltip = this.createToolTip();
    tooltip.init();

    // 初始化crosshair
    const xCrosshair = this.createCrosshairs();
    xCrosshair.init();
    const yCrosshair = this.createCrosshairs();
    yCrosshair.init();

    this.tooltip = tooltip;
    this.xCrosshair = xCrosshair;
    this.yCrosshair = yCrosshair;
  }

  public lock() {}

  public unlock() {}

  /**
   * 显示和更新 tooltip、crosshairs、tooltipMarkers
   * 只处理是否显示这些组件的逻辑
   */
  public show(point: Point) {
    const pixelBBox = this.pixelPlot.pixelBBox;
    const isInBox = isInPixelBBox(point.x, point.y, pixelBBox);
    const { tooltip } = this.pixelPlot.options;

    // 限定交互区域为 pixelBBox
    if (isInBox) {
      // 获取 hover 像素点坐标
      const pixelPoint = {
        x: point.x - pixelBBox.x,
        y: point.y - pixelBBox.y,
      };

      if (tooltip['showContent']) this.showTooltip(point);

      if (tooltip['showCrosshairs']) {
        const type = get(tooltip, ['crosshairs', 'type'], 'x');
        if (type === 'y') {
          this.showXCrosshairs(point);
        } else if (type === 'xy') {
          this.showXCrosshairs(point);
          this.showYCrosshairs(point);
        } else {
          this.showXCrosshairs(point);
        }
      }

      if (tooltip['showMarkers']) this.showCrossMarkers(point);
    }
  }

  public hide() {
    if (this.tooltip) this.tooltip.hide();
    if (this.xCrosshair) this.xCrosshair.hide();
    if (this.yCrosshair) this.yCrosshair.hide();
    if (this.tooltipMarkerGroup) this.tooltipMarkerGroup.hide();
  }

  public render() {
    if (this.tooltip) this.tooltip.render();
    if (this.xCrosshair) this.xCrosshair.render();
    if (this.yCrosshair) this.yCrosshair.render();
  }

  public update() {}

  public destroy() {
    if (this.tooltip) this.tooltip.destroy();
    if (this.xCrosshair) this.xCrosshair.destroy();
    if (this.yCrosshair) this.yCrosshair.destroy();
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
  private createCrosshairs() {
    const crossHairCfg = {
      container: this.pixelPlot.foregroundCanvas.addGroup(),
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
    };

    return new Crosshair.Line(crossHairCfg);
  }

  /**
   * 显示 Tooltip
   */
  private showTooltip(point: Point) {
    const { tooltip, xField } = this.pixelPlot.options;

    if (tooltip === false) return;

    const { follow, customItems } = tooltip;
    // mock tooltipInfo, 为KDBox.getCrossPointsByLines(pixelPoint)返回的数据
    const title = this.getTooltipInfo()[0]['data'][xField]; // 默认获取当前 横轴字段 的值
    // 处理 tooltip items
    const items = this.getTooltipItems(point);
    // 根据传过来的 follow 控制 point
    const pos = follow ? point : {};
    // 处理 customItems 的回调
    const customItemsFn = customItems ? customItems : (d) => d;

    // 更新 tooltip 位置和信息
    this.tooltip.update(
      deepMix(
        {
          title,
          items: customItemsFn(items),
          ...pos,
          visible: true,
        },
        tooltip
      )
    );
  }

  /**
   * 显示 垂直于x轴的辅助线
   * @param point 鼠标实际坐标
   */
  private showXCrosshairs(point: Point) {
    const { options, pixelBBox } = this.pixelPlot;
    const crosshairOption = get(options, ['tooltip', 'crosshairs'], {});

    // 更新 辅助线 位置
    this.xCrosshair.update(
      deepMix(
        {
          start: { x: point.x, y: pixelBBox.height + pixelBBox.y },
          end: { x: point.x, y: pixelBBox.y },
        },
        crosshairOption,
        this.getCrosshairText('x', point) // 处理text 中 content 的 默认文本 和 回调
      )
    );
    // 绘制 辅助线
    this.xCrosshair.render();
    this.xCrosshair.show();
  }

  /**
   * 显示 垂直于y轴的辅助线
   */
  private showYCrosshairs(point: Point) {
    const { options, pixelBBox } = this.pixelPlot;
    const crosshairOption = get(options, ['tooltip', 'crosshairs'], {});

    this.yCrosshair.update(
      deepMix(
        {
          start: { x: pixelBBox.x, y: point.y },
          end: { x: pixelBBox.x + pixelBBox.width, y: point.y },
        },
        crosshairOption,
        this.getCrosshairText('y', point)
      )
    );

    this.yCrosshair.render();
    this.yCrosshair.show();
  }

  /**
   * 显示 辅助线标记点
   */
  private showCrossMarkers(point: Point) {
    const { options } = this.pixelPlot;
    const markerOption = get(options, ['tooltip', 'marker'], {});

    // 添加 markerGroup，以绘制 markers
    if (this.tooltipMarkerGroup) this.tooltipMarkerGroup.destroy();
    this.tooltipMarkerGroup = this.pixelPlot.foregroundCanvas.addGroup();

    // 模拟：获取原始 tooltip 数据
    // const items = this.getTooltipInfo();
    // 尝试引入 getCrossPoints 方法，绘制 marker
    const { x, y } = point;
    const { position } = this.pixelPlot.TVSTree.getCrossPoints(x, y);

    // 绘制 marker
    const defaultMarkerAttrs = {
      symbol: 'circle',
      r: 4,
      stroke: '#fff',
      lineWidth: 2,
    };
    // for (const item of items) {
    const attrs = deepMix(
      defaultMarkerAttrs,
      {
        x: position.x,
        y: position.y,
        shadowColor: '#1890FF',
        fill: '#1890FF',
      },
      markerOption
    );
    this.tooltipMarkerGroup.addShape('marker', { attrs });
    // }
  }

  /**
   * 处理 tooltip 的 items
   */
  private getTooltipItems(pixelPoint: Point) {
    const { tooltip, seriesField, yField } = this.pixelPlot.options;

    const fields = get(tooltip, 'fields', []); // 例如：['name', 'date', 'open' , ...]

    // mock tooltipInfo, 为KDBox.getCrossPointsByLines(pixelPoint)返回的数据
    let items = [];
    for (const item of tooltipInfo) {
      if (fields?.length > 0) {
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

    // 格式化每个 item
    const formatterFn = get(tooltip, 'formatter', (d) => d);

    items = items.map((item) => ({ ...item, ...formatterFn(item) }));

    return items;
  }

  /**
   * 处理 crosshair 的文本
   */
  private getCrosshairText(type: string, point: Point) {
    const { options } = this.pixelPlot;
    const { tooltip } = options;

    // mock tooltipInfo，模拟KDBox.getCrossPointsByLines(point)返回的数据
    const items = this.getTooltipInfo();
    // 设置 text 默认的 content
    const datum = items[0]['data'];
    const field = options[type + 'Field'];
    const content = datum[field];
    // 设置 用户自定义 的 text content
    let textOption = get(tooltip, ['crosshairs', 'text'], { content });
    // 处理 content 的回调
    if (isFunction(textOption)) {
      textOption = textOption(type, content, items, point);
    }

    return {
      text: textOption,
    };
  }

  public getTooltipInfo() {
    return tooltipInfo;
  }
}
