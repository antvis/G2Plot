import { BBox } from '@antv/g';
import { deepMix } from '@antv/util';
import { RecursivePartial } from '../interface/types';
import CanvasController from './controller/canvas';
import ThemeController from './controller/theme';

export default abstract class Layer<T = void> {
  public initialProps: T;
  public type: string;
  public destroyed: boolean = false;

  protected range: BBox;
  protected canvasController: CanvasController;
  protected themeController: ThemeController;

  constructor(canvasController: CanvasController, themeController: ThemeController, range: BBox, config: T) {
    this.canvasController = canvasController;
    this.themeController = themeController;
    this.initialProps = config;
    this.range = range;
    this.setType();
  }

  public getType(): string {
    return this.type;
  }

  public getCanvasController(): CanvasController {
    return this.canvasController;
  }

  public getThemeController(): ThemeController {
    return this.themeController;
  }

  public getResponsiveTheme() {
    return this.themeController.getResponsiveTheme(this.type);
  }

  public updateRange(range: BBox): void {
    this.range = range;
  }

  public updateConfig(config: RecursivePartial<T>): void {
    // @ts-ignore
    this.initialProps = deepMix(this.initialProps, config);
  }

  public abstract render(): void;

  public abstract changeData(data: any[]): void;

  public destroy(): void {
    this.destroyed = true;
  }

  protected getLayerRange(): BBox {
    return this.range;
  }

  protected getLayerWidth(): number {
    return this.range.width;
  }

  protected getLayerHeight(): number {
    return this.range.height;
  }

  protected abstract setType(): void;
}
