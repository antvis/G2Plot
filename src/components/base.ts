import EventEmitter from '@antv/event-emitter';
import { Canvas, IGroup, BBox } from '../dependents';
import { each } from '@antv/util';

export interface BaseComponentConfig {
  container: IGroup;
}

/**
 * 组件基类
 *
 *  创建和渲染
 *  - 1. new Component()
 *  - 2. init()
 *  - 2. render()
 *  更新
 *  - 1. update()
 *  - 2. render()
 *
 */
export default abstract class BaseComponent<T extends BaseComponentConfig = BaseComponentConfig> extends EventEmitter {
  protected container: IGroup;
  protected group: IGroup;
  protected destroyed: boolean;
  protected config: T;
  private disposables: (() => void)[];

  public constructor(config: T) {
    super();
    this.container = config.container;
    this.destroyed = false;
    this.config = config;
    this.disposables = [];
  }

  public init() {
    if (!this.group) {
      this.initGroup();
    }
    this.initConfig(this.config);
  }

  public getGroup(): IGroup {
    return this.group;
  }

  public getConfig(): T {
    return this.config;
  }

  public getBBox(): BBox {
    return this.getGroup().getBBox();
  }

  public clear() {
    this.group.clear();
  }

  public render(): void {
    this.group.clear();
    this.renderInner(this.group);
    this.getCanvas().draw();
  }

  public update(config: Partial<T>): void {
    this.config = { ...this.config, ...config };
    this.initConfig(this.config);
  }

  public destroy(): void {
    each(this.disposables, (fn) => {
      fn();
    });
    this.disposables = [];
    this.group.remove(true);
    this.destroyed = true;
  }

  protected initGroup(): void {
    this.group = this.container.addGroup();
  }

  protected getCanvas(): Canvas {
    return this.container.get('canvas');
  }

  protected addDisposable(fn: () => void) {
    this.disposables.push(fn);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected initConfig(config: T): void {
    return;
  }

  protected abstract renderInner(group: IGroup): void;
}
