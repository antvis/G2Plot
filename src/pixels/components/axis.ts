import { Axis } from '@antv/component';
import { deepMix } from '@antv/util';
import { DIRECTION } from '../type';
import { Axis as AxisOption } from '../../types/axis';
import { PixelPlot } from '../index';
import { getAxisRegion, getVerticalFactor } from '../util/axis';
import { Controller } from './base';

export class AxisController extends Controller<AxisOption> {
  /** 轴的配置项 */
  public options: AxisOption;
  /** 横竖轴 */
  public xAxis: Axis.Line; // 暂定line类型
  public yAxis: Axis.Line;
  /** 整个plot */
  public pixelPlot: PixelPlot;

  protected init(): void {
    const { xField, yField } = this.pixelPlot.options;

    const xAxis = this.createLineAxis(xField, DIRECTION.BOTTOM);
    xAxis.init();
    const yAxis = this.createLineAxis(yField, DIRECTION.LEFT);
    yAxis.init();

    this.xAxis = xAxis;
    this.yAxis = yAxis;
  }

  /**
   * 渲染所有轴
   */
  public render() {
    if (this.xAxis) this.xAxis.render();
    if (this.yAxis) this.yAxis.render();
  }

  /**
   * 销毁所有轴
   */
  public destroy() {
    if (this.xAxis) this.xAxis.destroy();
    if (this.yAxis) this.yAxis.destroy();
  }

  /**
   * 创建轴方法
   */
  private createLineAxis(field: string, direction: string) {
    const axisCfg = this.getAxisCfg(field, direction);

    return new Axis.Line(axisCfg);
  }

  /**
   * 获取轴的配置
   */
  protected getAxisCfg(field: string, direction: string) {
    const pixelBBox = this.pixelPlot.pixelBBox;
    // 根据字段生成对应的比例尺, 以生成 ticks
    const scale = this.pixelPlot.createScale(field);
    // 轴的刻度和文字方向
    const verticalFactor = getVerticalFactor(direction);
    // 轴的位置
    const region = getAxisRegion(pixelBBox, direction);
    // 融合配置
    const cfg = deepMix(
      {},
      {
        id: field,
        container: this.pixelPlot.backgroundCanvas.addGroup(),
        ...region,
        ticks: scale.getTicks().map((item) => ({ id: item.value, name: item.text, value: item.value })),
        verticalFactor,
        label: {
          offset: 10,
        },
      }
    );

    return cfg;
  }

  /**
   * 更新所有轴
   */
  public update() {
    // todo 拿到关于轴的新配置后，update
    if (this.xAxis) this.xAxis.update({});
    if (this.yAxis) this.yAxis.update({});
  }
}
