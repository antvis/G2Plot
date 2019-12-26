import { each, isArray, isFunction, deepMix, clone } from '@antv/util';
import { Group, BBox } from '@antv/g';
import { View, Scale } from '@antv/g2';

const LABEL_MARGIN = 5;

export interface MatrixLegendConfig {
  visible?: boolean;
  position?: string;
  text?: {
    style: any;
    formatter: () => string;
  };
  gridlineStyle?: any;
  triggerOn?: string;
}

export interface IMatrixLegend extends MatrixLegendConfig {
  view: View;
  plot: any;
}

export default class MatrixLegend {
  public options: IMatrixLegend;
  public container: Group;
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
    this.init();
  }

  public init() {
    this.layout = this.getLayout();
    this.width = this.getDefaultWidth();
    this.height = this.getDefaultHeight();
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

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public destroy() {
    if (this.container) {
      this.container.remove();
    }
  }

  public getBBox() {
    const origin_bbox = this.container.getBBox();
    return new BBox(this.x, this.y, origin_bbox.width, origin_bbox.height);
  }

  protected renderVertical(min, max, colors) {
    this.container.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        fill: 'black',
        opacity: 0.2,
      },
    });
  }

  protected renderHorizontal(min, max, colors) {
    const gridWidth = this.width / colors.length;
    const gridHeight = this.height;
    const gridLineContainer = new Group();
    const valueStep = (max - min) / colors.length;
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
      const { width } = this.options.plot.options;
      return width * 0.5;
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
      x = (plotWidth - bbox.width) / 2;
    } else if (positions[1] === 'left') {
      x = bleeding[3];
    } else if (positions[1] === 'right') {
      x = this.options.plot.width - bleeding[1] - bbox.width;
    }
    // 再确定y
    if (positions[0] === 'bottom') {
      y = plotHeight - bleeding[2] - bbox.height;
    } else if (positions[0] === 'top') {
      y = bleeding[0];
    } else if (positions[1] === 'center') {
      y = (plotHeight - bbox.height) / 2;
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
      gridlineStyle: {
        lineWidth: 1,
        stroke: 'rgba(0, 0, 0, 0.45)',
      },
    };
  }

  protected addInteraction() {}
}
