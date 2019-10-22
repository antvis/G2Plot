import { BBox } from '@antv/g';
import { assign, deepMix, each, findIndex } from '@antv/util';
import * as _ from '@antv/util';
import BaseConfig from '../interface/config';
import { RecursivePartial } from '../interface/types';
import StateManager from '../util/stateManager';
import CanvasController from './controller/canvas';
import ThemeController from './controller/theme';
import Layer from './Layer';
import ViewLayer from './ViewLayer';

/**
 * 基础图形
 */
export default abstract class BasePlot<T extends BaseConfig = BaseConfig> {
  public destroyed: boolean = false;

  protected initialProps: T;
  protected originalProps: T;
  protected layers: Array<Layer<any>> = [];

  private container: HTMLElement;
  private canvasController: CanvasController;
  private themeController: ThemeController;

  constructor(container: string | HTMLElement, config: T) {
    this.initialProps = config;
    this.originalProps = deepMix({}, config);
    this.container = typeof container === 'string' ? document.getElementById(container) : container;

    // themeController 在 Plot 级别
    this.themeController = new ThemeController();

    // canvasController 在 Plot 级别
    this.canvasController = new CanvasController({
      container: this.container,
      themeController: this.themeController,
      plot: this,
    });

    this.init();
  }

  /**
   * 更新图形size
   * @param config
   */
  public updateRange() {
    each(this.layers, (layer) => {
      const newRange = this.getPlotRange();
      layer.updateRange(newRange);
    });
  }

  /**
   * 更新图形配置
   */
  public updateConfig(config: RecursivePartial<T>) {
    this.updateConfigBase(config);
    each(this.layers, (layer) => {
      layer.updateConfig(config);
    });
  }

  /**
   * 更新数据
   *
   * @param data
   */
  public changeData(data: any[]) {
    each(this.layers, (layer) => {
      layer.changeData(data);
    });
  }

  /**
   * 重新绘制图形
   */
  public repaint(): void {
    this.canvasController.canvas.draw();
  }

  /**
   * 完整生命周期渲染
   */
  public render(): void {
    each(this.layers, (layer) => {
      layer.render();
    });
  }

  /**
   * TODO: 可以去掉 getProps 方法
   */
  public getProps(): T {
    return this.initialProps;
  }

  /**
   * 获取图形下的图层 Layer，默认第一个 Layer
   *
   * @param idx {number}
   */
  public getLayer(idx: number = 0) {
    return this.layers[idx];
  }

  /**
   * 获取g2的plot实例, 默认顶层
   */
  public getPlot(idx: number = 0) {
    const layer = this.getLayer(idx);
    // @ts-ignore
    return layer.plot; // layers[0] 即顶层实例
  }

  /**
   * 绑定一个外部的stateManager
   * 先直接传递给各个子 Layer
   *
   * @param stateManager
   * @param cfg
   */
  public bindStateManager(stateManager: StateManager, cfg: any) {
    each(this.layers, (layer) => {
      if (layer instanceof ViewLayer) {
        layer.bindStateManager(stateManager, cfg);
      }
    });
  }

  /**
   * 响应状态量更新的快捷方法
   *
   * @param condition
   * @param style
   */
  public setActive(condition: any, style: any) {
    each(this.layers, (layer) => {
      if (layer instanceof ViewLayer) {
        layer.setActive(condition, style);
      }
    });
  }

  public setSelected(condition: any, style: any) {
    each(this.layers, (layer) => {
      if (layer instanceof ViewLayer) {
        layer.setSelected(condition, style);
      }
    });
  }

  public setDisable(condition: any, style: any) {
    each(this.layers, (layer) => {
      if (layer instanceof ViewLayer) {
        layer.setDisable(condition, style);
      }
    });
  }

  public setNormal(condition: any) {
    each(this.layers, (layer) => {
      if (layer instanceof ViewLayer) {
        layer.setNormal(condition);
      }
    });
  }

  /**
   * 销毁图形
   *
   * @memberof BasePlot
   */
  public destroy(): void {
    each(this.layers, (layer) => {
      layer.destroy();
    });

    this.canvasController.destroy();
    const canvasDOM = this.canvasController.canvas.get('canvasDOM');
    canvasDOM.parentNode.removeChild(canvasDOM);

    this.layers = [];
    this.destroyed = true;
  }

  protected updateConfigBase(config: RecursivePartial<T>) {
    // @ts-ignore
    this.initialProps = deepMix({}, this.initialProps, config);
    this.originalProps = deepMix({}, this.originalProps, deepMix({}, config));

    this.canvasController.updateCanvasSize();
  }

  /**
   * 方便子图形获取 CanvasController
   */
  protected getCanvasController(): CanvasController {
    return this.canvasController;
  }

  /**
   * 方便子图形获取 ThemeController
   */
  protected getThemeController(): ThemeController {
    return this.themeController;
  }

  /**
   * 获取整个 Plot 的 Range
   */
  protected getPlotRange(): BBox {
    const { width, height } = this.canvasController.getCanvasSize();
    return new BBox(0, 0, width, height);
  }

  /**
   * 添加一个 Layer
   * @param layer
   */
  protected addLayer(layer: Layer<any>): void {
    this.layers.push(layer);
  }

  /**
   * 删除一个 Layer
   * @param layer
   */
  protected removeLayer(layer: Layer<any>): void {
    const idx = findIndex(this.layers, (item) => item === layer);
    if (idx >= 0) {
      this.layers.splice(idx, 1);
    }
  }

  /**
   * 配置 Layers
   *
   * @protected
   * @abstract
   * @memberof BasePlot
   */
  protected abstract init(): void;

  private isDiffCfg(config) {
    return (name) => {
      const current = this.getProps()[name];
      return _.has(config, name) && config[name] !== current;
    };
  }
}
