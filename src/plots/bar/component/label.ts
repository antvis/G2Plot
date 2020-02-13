import { each, deepMix, clone } from '@antv/util';
import { Group, IGroup } from '@antv/g-canvas';
import { View } from '@antv/g2';
import LabelParser from '../../../components/label/parser';

const DEFAULT_OFFSET = 8;

export interface BarLabelConfig {
  visible: boolean;
  position?: 'left' | 'right' | 'middle';
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
  adjustColor?: boolean;
  adjustPosition?: boolean;
}

export interface IBarLabel extends BarLabelConfig {
  view: View;
  plot: any;
}

export default class BarLabel {
  public options: BarLabelConfig;
  public destroyed: boolean = false;
  private plot: any;
  private view: View;
  private container: Group;

  constructor(cfg: IBarLabel) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix(defaultOptions, cfg, {});
    this.init();
  }

  protected init() {
    this.container = this.getGeometry().labelsContainer;
    this.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    const elements = this.getGeometry().elements;
    each(elements, (ele) => {
      const { shape } = ele;
      const position = this.getPosition(shape);
      const textAlign = this.getTextAlign();
      const value = this.getValue(shape);
      const formatter = this.options.formatter;
      const content = formatter ? formatter(value) : value;
      const label = this.container.addShape('text', {
        attrs: deepMix({}, this.options.style, {
          x: position.x,
          y: position.y,
          text: content,
          //fill: color,
          textAlign,
          textBaseline: 'middle',
        }),
      });
    });
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public hide() {
    this.container.set('visible', false);
    this.plot.canvas.draw();
  }

  public show() {
    this.container.set('visible', true);
    this.plot.canvas.draw();
  }

  public destory() {
    if (this.container) {
      this.container.remove();
    }
    this.destroyed = true;
  }

  public getBBox() {}

  protected getPosition(shape){
    const bbox = shape.getBBox();  
    const { minX,maxX,minY,height,width } = bbox;
    const { offsetX, offsetY, position } = this.options;
    const y = minY + height / 2 + offsetY;
    let x;
    if(position === 'left'){
      x = minX + offsetX;
    }else if(position === 'right'){
      x = maxX + offsetX;
    }else{
      x = minX + width / 2 + offsetX
    }

    return { x,y };
  }

  protected getTextAlign(){
    const { position } = this.options;
    const alignOptions = {
      right: 'left',
      left: 'left',
      middle: 'center'
    };

    return alignOptions[position];
  }

  protected getValue(shape){
    const data = shape.get('origin').data;
    return data[this.plot.options.xField];
  }

  private getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: DEFAULT_OFFSET,
      offsetY: 0,
      style: clone(labelStyle),
    };
  }

  private getGeometry() {
    const { geometries } = this.view;
    let lineGeom;
    each(geometries, (geom) => {
      if (geom.type === 'interval') {
        lineGeom = geom;
      }
    });
    return lineGeom;
  }

}