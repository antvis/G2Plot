import { each, isArray, deepMix } from '@antv/util';
import { Group, BBox, Shape } from '@antv/g';
import { View } from '@antv/g2';
import { LegendPosition } from '../../../interface/config';

const LABEL_MARGIN = 4;

export interface MatrixLegendConfig {
  visible?: boolean;
  position?: LegendPosition;
  width?: number;
  height?: number;
  text?: {
    style?: any;
    formatter?: () => string;
  };
  ticklineStyle?: any;
  anchorStyle?: any;
  triggerOn?: string;
}

export interface IMatrixLegend extends MatrixLegendConfig {
  view: View;
  plot: any;
}

export default class MatrixLegend {
  public options: IMatrixLegend;
  public container: Group;
  public anchor: Shape;
  public afterRender: boolean;
  public destroyed: boolean = false;
  protected view: View;
  protected layout: string;
  protected width: number;
  protected height: number;
  protected position: string;
  protected x: number;
  protected y: number;
  protected dataSlides: any = {};
  protected colorScale: any;

  constructor(cfg: IMatrixLegend) {
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix({}, defaultOptions, cfg);
    this.view = this.options.view;
    this.afterRender = true;
    this.init();
  }

  public init() {
    this.layout = this.getLayout();
    this.width = this.options.width ? this.options.width : this.getDefaultWidth();
    this.height = this.options.height ? this.options.height : this.getDefaultHeight();
    const plotContainer = this.options.plot.container;
    this.container = plotContainer.addGroup();
  }

  public render() {
    const scales = this.view.get('scales');
    const colorField = this.options.plot.options.colorField;
    this.colorScale = scales[colorField];
    const { min, max } = this.colorScale;
    const { color } = this.options.plot.options;
    if (this.layout === 'horizontal') {
      this.renderHorizontal(min, max, color);
    } else {
      this.renderVertical(min, max, color);
    }
    this.legendLayout();
    this.addInteraction();
  }

  public hide() {
    this.container.set('visible', false);
    this.options.plot.canvas.draw();
  }

  public show() {
    this.container.set('visible', true);
    this.options.plot.canvas.draw();
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public destroy() {
    if (this.container) {
      this.container.remove();
    }
    this.destroyed = true;
  }

  public getBBox() {
    const origin_bbox = this.container.getBBox();
    return new BBox(this.x, this.y, origin_bbox.width, origin_bbox.height);
  }

  protected renderVertical(min: number, max: number, colors: string[]) {
    const valueStep = (max - min) / (colors.length - 1);
    const colorStep = 1 / (colors.length - 1);
    const tickStep = this.height / (colors.length - 1);
    let gradientColor = 'l(90)';
    each(colors, (c, index) => {
      const stepNum = colorStep * index;
      gradientColor += `${stepNum}:${c} `;
    });
    this.container.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        fill: gradientColor,
      },
    });
    // draw tick and label
    each(colors, (c, index) => {
      // tick
      const step = tickStep * index;
      this.container.addShape('path', {
        attrs: {
          path: [
            ['M', 0, step],
            ['L', this.width, step],
          ],
          ...this.options.ticklineStyle,
        },
      });
      // value
      const value = Math.round(valueStep * index);
      this.container.addShape('text', {
        attrs: {
          text: value,
          textAlign: 'left',
          textBaseline: 'middle',
          x: this.width + LABEL_MARGIN,
          y: step,
          ...this.options.text.style,
        },
      });
    });
    //anchor
    const tri_width = 10;
    const tri_height = 14;
    const tri_path = [['M', -tri_width, -tri_height / 2], ['L', 0, 0], ['L', -tri_width, tri_height / 2], ['Z']];
    this.anchor = this.container.addShape('path', {
      attrs: {
        path: tri_path,
        ...this.options.anchorStyle,
      },
    });
    this.anchor.set('visible', false);
  }

  protected renderHorizontal(min: number, max: number, colors: string[]) {
    const valueStep = (max - min) / (colors.length - 1);
    const colorStep = 1 / (colors.length - 1);
    const tickStep = this.width / (colors.length - 1);
    let gradientColor = 'l(0)';
    each(colors, (c, index) => {
      const stepNum = colorStep * index;
      gradientColor += `${stepNum}:${c} `;
    });
    this.container.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        fill: gradientColor,
      },
    });
    // draw tick and label
    each(colors, (c, index) => {
      // tick
      const step = tickStep * index;
      this.container.addShape('path', {
        attrs: {
          path: [
            ['M', step, 0],
            ['L', step, this.height],
          ],
          ...this.options.ticklineStyle,
        },
      });
      // value
      const value = Math.round(valueStep * index);
      this.container.addShape('text', {
        attrs: {
          text: value,
          textAlign: 'center',
          textBaseline: 'top',
          x: step,
          y: this.height + LABEL_MARGIN,
          ...this.options.text.style,
        },
      });
    });
    //anchor
    const tri_width = 14;
    const tri_height = 10;
    const tri_path = [['M', 0, 0], ['L', -tri_width / 2, -tri_height], ['L', tri_width / 2, -tri_height], ['Z']];
    this.anchor = this.container.addShape('path', {
      attrs: {
        path: tri_path,
        ...this.options.anchorStyle,
      },
    });
    this.anchor.set('visible', false);
  }

  protected getLayout() {
    const positions = this.options.position.split('-');
    this.position = positions[0];
    if (positions[0] === 'left' || positions[0] === 'right') {
      return 'vertical';
    }
    return 'horizontal';
  }

  protected getDefaultWidth() {
    if (this.layout === 'horizontal') {
      const width = this.view.get('panelRange').width;
      return width;
    }
    return 10;
  }

  protected getDefaultHeight() {
    if (this.layout === 'vertical') {
      const height = this.view.get('panelRange').height;
      return height;
    }
    return 10;
  }

  protected legendLayout() {
    const panelRange = this.view.get('panelRange');
    const { bleeding } = this.options.plot.getPlotTheme();
    if (isArray(bleeding)) {
      each(bleeding, (it, index) => {
        if (typeof bleeding[index] === 'function') {
          bleeding[index] = bleeding[index](this.options.plot.options);
        }
      });
    }
    const bbox = this.container.getBBox();
    let x = 0;
    let y = 0;
    const positions = this.options.position.split('-');
    const plotWidth = this.options.plot.width;
    const plotHeight = this.options.plot.height;
    // 先确定x
    if (positions[0] === 'left') {
      x = bleeding[3];
    } else if (positions[0] === 'right') {
      x = plotWidth - bleeding[1] - bbox.width;
    } else if (positions[1] === 'center') {
      // default
      if (this.width === panelRange.width) {
        x = panelRange.x;
      } else {
        x = (plotWidth - bbox.width) / 2;
      }
    } else if (positions[1] === 'left') {
      x = bleeding[3];
    } else if (positions[1] === 'right') {
      x = this.options.plot.width - bleeding[1] - bbox.width;
    }
    // 再确定y
    if (positions[0] === 'bottom') {
      y = plotHeight - bleeding[2] - bbox.height;
    } else if (positions[0] === 'top') {
      y = this.getTopPosition(bleeding);
    } else if (positions[1] === 'center') {
      // default
      if (this.height === panelRange.height) {
        y = panelRange.y;
      } else {
        //用户自行设定
        y = (plotHeight - bbox.height) / 2;
      }
    } else if (positions[1] === 'top') {
      y = bleeding[0];
    } else if (positions[1] === 'bottom') {
      y = plotHeight - bleeding[2] - bbox.height;
    }

    this.x = x;
    this.y = y;

    this.container.translate(x, y);
  }

  protected getDefaultOptions() {
    return {
      text: {
        style: {
          fontSize: 12,
          fill: 'rgba(0, 0, 0, 0.45)',
        },
      },
      ticklineStyle: {
        lineWidth: 1,
        stroke: 'rgba(0, 0, 0, 0.8)',
      },
      anchorStyle: {
        fill: 'rgba(0,0,0,0.5)',
      },
      triggerOn: 'mousemove',
    };
  }

  protected addInteraction() {
    let geomType;
    if (this.options.plot.options.shapeType === 'rect') {
      geomType = 'polygon';
    } else {
      geomType = 'point';
    }

    const eventName = `${geomType}:${this.options.triggerOn}`;
    const labelEventName = `label:${this.options.triggerOn}`;
    const field = this.options.plot.options.colorField;
    const { min, max } = this.colorScale;

    this.view.on(eventName, (ev) => {
      const value = ev.data._origin[field];
      const ratio = (value - min) / (max - min);
      this.moveAnchor(ratio);
    });

    this.view.on(labelEventName, (ev) => {
      const value = ev.data[field];
      const ratio = (value - min) / (max - min);
      this.moveAnchor(ratio);
    });

    this.options.plot.canvas.on('mouseleave', (ev) => {
      this.anchor.set('visible', false);
    });
  }

  private moveAnchor(ratio: number) {
    this.anchor.set('visible', true);
    if (this.layout === 'vertical') {
      const pos = this.height * ratio;
      const ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      ulMatrix[7] = pos;
      this.anchor.stopAnimate();
      this.anchor.animate(
        {
          matrix: ulMatrix,
        },
        400,
        'easeLinear'
      );
    } else {
      const pos = this.width * ratio;
      const ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      ulMatrix[6] = pos;
      this.anchor.stopAnimate();
      this.anchor.animate(
        {
          matrix: ulMatrix,
        },
        400,
        'easeLinear'
      );
    }
  }

  private getTopPosition(bleeding) {
    if (this.options.plot.description) {
      const bbox = this.options.plot.description.getBBox();
      return bbox.maxY + 10;
    } else if (this.options.plot.title) {
      const bbox = this.options.plot.title.getBBox();
      return bbox.maxY + 10;
    }
    return bleeding[0];
  }
}
