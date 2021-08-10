export type PatternCfg = {
  opacity: number; // 整个贴图透明
  stroke?: string;
  lineWidth?: number;
  backgroundColor?: string | 'inherit';
  mode?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
};

export abstract class Pattern<O extends PatternCfg> {
  public options: O;
  public pattern: CanvasPattern;
  public patternCanvas: HTMLCanvasElement;
  public patternContext: CanvasRenderingContext2D;

  constructor(options?: O) {
    this.options = this.initOptions(options);
    this.patternCanvas = document.createElement('canvas');
    this.patternContext = this.patternCanvas.getContext('2d');

    this.init();
  }

  protected abstract init();

  public getCanvas() {
    return this.patternCanvas;
  }

  protected abstract initOptions(options: O);
}
