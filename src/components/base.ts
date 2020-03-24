import EventEmitter from '@antv/event-emitter';
import { Canvas, IGroup, BBox } from '../dependents';

export interface BaseComponentConfig {
  container: IGroup;
}

export default class BaseComponent<T extends BaseComponentConfig = BaseComponentConfig> extends EventEmitter {
  protected container: IGroup;
  protected group: IGroup;
  protected destroyed: boolean;
  private config: T;

  public constructor(config: T) {
    super();
    this.container = config.container;
    this.destroyed = false;
    this.group = this.container.addGroup();
    this.config = config;
    this.init(config);
  }

  public getGroup(): IGroup {
    return this.group;
  }

  public getBBox(): BBox {
    return this.getGroup().getBBox();
  }

  public clear() {
    this.group.clear();
  }

  public render(): void {
    this.renderInner(this.group);
    this.getCanvas().draw();
  }

  public update(config: Partial<T>): void {
    this.config = { ...this.config, ...config };
    this.init({ ...this.config, config });
    this.group.clear();
    this.renderInner(this.group);
    this.getCanvas().draw();
  }

  public destroy(): void {
    this.group.remove(true);
    this.destroyed = true;
  }

  protected getCanvas(): Canvas {
    return this.container.get('canvas');
  }

  protected init(config: T): void {}

  protected renderInner(group: IGroup): void {}
}
