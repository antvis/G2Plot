import { deepMix, isElement } from '@antv/util';
import { createDom, modifyCSS, getOuterWidth, getOuterHeight } from '@antv/dom-util';

export interface IStatisticHtml {
  x?: number;
  y?: number;
  html?: string;
  alignX?: string;
  alignY?: string;
  container?: any;
  statisticClass?: string;
  [key: string]: any;
}

export default class StatisticHtml {
  public wrapperNode: HTMLElement;
  protected x: number;
  protected y: number;
  protected html: string;
  protected container: any;
  protected options: any;

  constructor(cfg: IStatisticHtml) {
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix(defaultOptions, cfg, {});
    this.x = this.options.x;
    this.y = this.options.y;
    this.html = this.options.html;
    this.container = this.options.container;
  }

  protected render() {
    if (isElement(this.container)) {
      this.wrapperNode = createDom('<div class="g2plot-htmlStatistic"></div>');
      this.container.appendChild(this.wrapperNode);
      modifyCSS(this.wrapperNode, {
        position: 'absolute',
        pointerEvents: 'none', // 阻止 dom 事件击穿
      });
      const htmlNode = createDom(this.html);
      this.wrapperNode.appendChild(htmlNode);
      this.setDomPosition(this.x, this.y);
    }
  }

  public updateHtml(content: string) {
    this.wrapperNode.innerHTML = content;
  }

  public updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.setDomPosition(x, y);
  }

  public destroy() {
    this.container.removeChild(this.wrapperNode);
  }

  protected getDefaultOptions() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      html: '',
      container: null,
      alignX: 'middle',
      alignY: 'middle',
    };
  }

  protected setDomPosition(x: number, y: number) {
    let xPosition = x;
    let yPosition = y;
    const width = getOuterWidth(this.wrapperNode);
    const height = getOuterHeight(this.wrapperNode);
    if (this.options.alignX === 'middle') {
      xPosition = x - width / 2;
    }
    if (this.options.alignY === 'middle') {
      yPosition = y - height / 2;
    }
    modifyCSS(this.wrapperNode, {
      top: `${Math.round(yPosition)}px`,
      left: `${Math.round(xPosition)}px`,
    });
  }
}
