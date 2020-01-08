import EventEmitter from '@antv/event-emitter';
import { Canvas, Group, BBox } from '@antv/g';

export interface BaseComponentConfig {
  container: Group;
}

export default class BaseComponent<T extends BaseComponentConfig = BaseComponentConfig> extends EventEmitter {
  protected container: Group;
  protected group: Group;
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

  public getGroup(): Group {
    return this.group;
  }

  public getBBox(): BBox {
    return this.getGroup().getBBox();
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

  protected renderInner(group: Group): void {}
}
