import { each, isArray, isFunction, deepMix, clone } from '@antv/util';
import { View, IGroup } from '../../../dependents';
import BBox from '../../../util/bbox';

const LABEL_MARGIN = 4;
const ACTIVE_OPACITY = 1;
const DEACTIVE_OPACITY = 0.4;

export interface HeatmapLegendConfig {
  visible?: boolean;
  position?: string;
  width?: number;
  height?: number;
  text?: {
    style?: any;
    formatter?: () => string;
  };
  gridlineStyle?: any;
  triggerOn?: string;
}

export interface IHeatmapLegend extends HeatmapLegendConfig {
  view: View;
  plot: any;
}

export default class HeatmapLegend {
  public options: IHeatmapLegend;
  public container: IGroup;
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

  constructor(cfg: IHeatmapLegend) {
    let defaultOptions = this.getDefaultOptions();
    if (cfg.plot.options.theme && cfg.plot.options.theme === 'dark') {
      defaultOptions = this.getDarkOptions();
    }
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
    const scales = this.getScales();
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
    this.options.plot.canvas.draw();
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

  protected renderVertical(min, max, colors) {
    const gridWidth = this.width;
    const gridHeight = this.height / colors.length;
    const gridLineContainer = this.container.addGroup();
    const gridColors = clone(colors).reverse();
    const valueStep = (max - min) / colors.length;
    // 绘制色彩格子
    each(gridColors, (c, i) => {
      const y = gridHeight * i;
      // 记录每个grid代表的区间信息用于legend交互
      const appendInfo = { to: max - valueStep * i, from: max - valueStep * (i + 1) };
      const rect = this.container.addShape('rect', {
        attrs: {
          x: 0,
          y,
          width: gridWidth,
          height: gridHeight,
          fill: c,
          opacity: ACTIVE_OPACITY,
          cursor: 'pointer',
        },
        name: 'legend',
      });
      rect.set('info', appendInfo);
      const dataSlide = this.getDataSlide(appendInfo);
      this.dataSlides[`${appendInfo.from}-${appendInfo.to}`] = { mode: 'active', data: dataSlide };
      const line = gridLineContainer.addShape('path', {
        attrs: {
          path: [
            ['M', 0, y + gridHeight],
            ['L', gridWidth, y + gridHeight],
          ],
          ...this.options.gridlineStyle,
        },
      });
    });
    // 绘制两边的label
    const textMax = this.container.addShape('text', {
      attrs: {
        text: max,
        x: gridWidth / 2,
        y: -LABEL_MARGIN,
        textAlign: 'center',
        textBaseline: 'bottom',
        ...this.options.text.style,
      },
      name: 'legend-label',
    });
    const textMin = this.container.addShape('text', {
      attrs: {
        text: min,
        x: gridWidth / 2,
        y: this.height + LABEL_MARGIN,
        textAlign: 'center',
        textBaseline: 'top',
        ...this.options.text.style,
        name: 'legend-label',
      },
    });
    // 绘制包围线
    const path = gridLineContainer.addShape('path', {
      attrs: {
        path: [
          ['M', 0, 0],
          ['L', this.width, 0],
          ['L', this.width, this.height],
          ['L', 0, this.height],
          ['L', 0, 0],
        ],
        ...this.options.gridlineStyle,
      },
    });
  }

  protected renderHorizontal(min, max, colors) {
    const gridWidth = this.width / colors.length;
    const gridHeight = this.height;
    const gridLineContainer = this.container.addGroup();
    const valueStep = (max - min) / colors.length;
    // 绘制色彩格子
    each(colors, (c, i) => {
      const x = gridWidth * i;
      // 记录每个grid代表的区间信息用于legend交互
      const appendInfo = { from: valueStep * i, to: valueStep * (i + 1) };
      const rect = this.container.addShape('rect', {
        attrs: {
          x,
          y: 0,
          width: gridWidth,
          height: gridHeight,
          fill: c,
          opacity: 0.8,
          cursor: 'pointer',
        },
        name: 'legend',
      });
      rect.set('info', appendInfo);
      const line = gridLineContainer.addShape('path', {
        attrs: {
          path: [
            ['M', x + gridWidth, 0],
            ['L', x + gridWidth, gridHeight],
          ],
          ...this.options.gridlineStyle,
        },
      });
    });
    // 绘制两边的label
    this.container.addShape('text', {
      attrs: {
        text: min,
        x: -LABEL_MARGIN,
        y: gridHeight / 2,
        ...this.options.text.style,
        textAlign: 'right',
        textBaseline: 'middle',
      },
      name: 'legend-label',
    });
    this.container.addShape('text', {
      attrs: {
        text: max,
        x: this.width + LABEL_MARGIN,
        y: gridHeight / 2,
        textAlign: 'left',
        textBaseline: 'middle',
        ...this.options.text.style,
      },
      name: 'legend-label',
    });
    // 绘制包围线
    gridLineContainer.addShape('path', {
      attrs: {
        path: [
          ['M', 0, 0],
          ['L', this.width, 0],
          ['L', this.width, this.height],
          ['L', 0, this.height],
          ['L', 0, 0],
        ],
        ...this.options.gridlineStyle,
      },
    });
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
      const { height } = this.options.plot.options;
      return height * 0.5;
    }
    return 10;
  }

  protected legendLayout() {
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
      y = this.getTopPosition(bleeding);
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

  protected getDarkOptions() {
    return {
      text: {
        style: {
          fontSize: 12,
          fill: 'rgba(255, 255, 255, 0.45)',
        },
      },
      gridlineStyle: {
        lineWidth: 1,
        stroke: 'rgba(255, 255, 255, 0.25)',
      },
    };
  }

  protected addInteraction() {
    const { colorField, data } = this.options.plot.options;
    this.container.on('click', (ev) => {
      const { target } = ev;
      if (target.get('name') === 'grid') {
        const appendInfo = target.get('info');
        const targetInfo = `${appendInfo.from}-${appendInfo.to}`;
        const relativeData = this.dataSlides[targetInfo];
        if (relativeData.mode === 'active') {
          relativeData.mode = 'deactive';
          target.stopAnimate();
          target.animate(
            {
              opacity: DEACTIVE_OPACITY,
            },
            200
          );
        } else {
          relativeData.mode = 'active';
          target.stopAnimate();
          target.animate(
            {
              opacity: ACTIVE_OPACITY,
            },
            200
          );
        }
        const filteredData = this.getFilteredData();
        if (filteredData.length > 0) {
          this.view.changeData(filteredData);
          //this.view.set('data', filteredData);
          this.view.scale(colorField, {
            min: this.colorScale.min,
            max: this.colorScale.max,
            nice: this.colorScale.nice,
          } as any);
          this.view.render();
        }
      }
    });
  }

  protected getFilteredData() {
    const filteredData = [];
    each(this.dataSlides, (s) => {
      if (s.mode == 'active') {
        filteredData.push(...s.data);
      }
    });
    return filteredData;
  }

  //预先对数据进行分组
  protected getDataSlide(range) {
    const slide = [];
    const { colorField, data } = this.options.plot.options;
    each(data, (d) => {
      const value = d[colorField];
      if (value >= range.from && value < range.to) {
        slide.push(d);
      }
    });
    return slide;
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

  private getScales() {
    let scales;
    each(this.view.geometries, (geom) => {
      if (geom.type === 'heatmap') {
        scales = geom.scales;
      }
    });
    return scales;
  }
}
