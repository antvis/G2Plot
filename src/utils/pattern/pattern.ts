export type PatternCfg = {
  size?: [number, number]; //[width, height]
  padding?: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  opacity?: number;
  rotate?: number;
  isStagger?: boolean;
  backgroundColor?: string | 'inherit';
  mode?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
};

export abstract class Pattern<O extends PatternCfg> {
  public options: O;
  public pattern: CanvasPattern;
  public patternCanvas: HTMLCanvasElement;

  constructor(options?: O) {
    this.options = this.initOptions(options);
    this.patternCanvas = document.createElement('canvas');
    this.init();
  }

  protected abstract init();

  public getCanvas() {
    return this.patternCanvas;
  }

  protected abstract initOptions(options: O);
}
