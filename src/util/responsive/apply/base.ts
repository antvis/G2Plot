import * as _ from '@antv/util';

export default abstract class ApplyResponsive {
  public plot: any;
  public type: string;
  public responsiveTheme: any;

  constructor(cfg) {
    _.assign(this, cfg);
    this.init();
  }

  protected init() {
    this.type = this.getType();
    if (this.shouldApply()) {
      this.apply();
    }
  }

  protected abstract shouldApply(): boolean;

  protected abstract apply(): void;

  protected abstract getType(): string;
}
