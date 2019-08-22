import * as domUtil from '@antv/dom-util';
import { Canvas, Group } from '@antv/g';
import { Interaction, Plot, View } from '@antv/g2';
import * as _ from '@antv/util';
import Slider from '../../../interaction/components/slider';
import { getColDef, getColDefs } from '../../../interaction/helper/get-color-def';

function parsePadding(padding: number[] | number | string) {
  let top = padding[0];
  let left = padding[1];
  let right = padding[2];
  let bottom = padding[3];

  if (_.isNumber(padding) || _.isString(padding)) {
    top = left = right = bottom = padding;
  } else if (_.isArray(padding)) {
    top = padding[0];
    right = !_.isNil(padding[1]) ? padding[1] : padding[0];
    bottom = !_.isNil(padding[2]) ? padding[2] : padding[0];
    left = !_.isNil(padding[3]) ? padding[3] : right;
  }

  return [top, right, bottom, left];
}

function getFirstShapeData(shapes) {
  // 用于分组的场景
  const shapeData: any[] = shapes[0].get('origin'); // 分组中的第一个shape的data
  return _.map(shapeData, (d) => d._origin);
}

export default class Range extends Interaction {
  private data: any;
  private scale: any;
  private startRatio: number;
  private endRatio: number;
  private _startValue: number;
  private _endValue: number;
  private minSpan: number;
  private maxSpan: number;
  private range: number[];
  private minRange: number;
  private maxRange: number;
  private container: string | HTMLElement;
  private domContainer: HTMLElement;
  private destroyed: boolean;
  private domWidth: number;
  private width: number | string;
  private height: number;
  private padding: number[];
  private layout: string;
  private resizeTimer: any;
  private handleStyle: {};
  private fillerStyle: {};
  private backgroundStyle: {};
  private textStyle: {};
  private bgChart: Plot;
  private backgroundChart: {
    type?: string;
    color?: string;
  }; // bgChart配置
  private plotWidth: number | string;
  private plotHeight: number;
  private plotPadding: number;
  private rangeElement: Group;
  private onChange: (...args: any[]) => void;

  constructor(cfg) {
    super({
      startEvent: null,
      processEvent: null,
      endEvent: null,
      resetEvent: null,
      height: 26,
      width: 'auto', // 默认自适应
      container: null,
      xAxis: null,
      yAxis: null,
      // 选中区域的样式
      fillerStyle: {
        fill: '#BDCCED',
        fillOpacity: 0.3,
      },
      // 滑动条背景样式
      backgroundStyle: {
        stroke: '#CCD6EC',
        fill: '#CCD6EC',
        fillOpacity: 0.3,
        lineWidth: 1,
      },
      range: [0, 100],
      layout: 'horizontal',
      // 文本颜色
      textStyle: {
        fill: '#545454',
      },
      // 滑块的样式
      handleStyle: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png',
        width: 5,
      },
      // 背景图表的配置，如果为 false 则表示不渲染
      backgroundChart: {
        type: ['area'], // 图表的类型，可以是字符串也可是是数组
        color: '#CCD6EC',
      },
      ...cfg,
    });
    this._initContainer();
    this._initStyle();
    this.render();
  }
  public _initContainer() {
    const container = this.container;
    if (!container) {
      throw new Error('Please specify the container for the Slider!');
    }
    if (_.isString(container)) {
      this.domContainer = document.getElementById(container as string);
    } else {
      this.domContainer = container as HTMLElement;
    }
  }

  public forceFit() {
    if (this.destroyed) {
      return;
    }
    const width = domUtil.getWidth(this.domContainer);
    const height = this.height;
    if (width !== this.domWidth) {
      const canvas = this.canvas;
      canvas.changeSize(width, height); // 改变画布尺寸
      if (this.bgChart) {
        this.bgChart.changeSize(width, this.bgChart.get('height'));
      }
      canvas.clear();
      this._initWidth();
      this._initSlider(); // 初始化滑动条
      this._bindEvent();
      canvas.draw();
    }
  }
  public _initForceFitEvent() {
    const timer = setTimeout(_.wrapBehavior(this, 'forceFit'), 200);
    clearTimeout(this.resizeTimer);
    this.resizeTimer = timer;
  }
  public _initStyle() {
    this.handleStyle = _.mix(
      {
        width: this.height,
        height: this.height,
      },
      this.handleStyle
    );
    if (this.width === 'auto') {
      // 宽度自适应
      window.addEventListener('resize', _.wrapBehavior(this, '_initForceFitEvent') as () => void);
    }
  }
  public _initWidth() {
    let width;
    if (this.width === 'auto') {
      width = domUtil.getWidth(this.domContainer);
    } else {
      width = this.width;
    }
    this.domWidth = width;
    const padding = parsePadding(this.padding);

    if (this.layout === 'horizontal') {
      this.plotWidth = width - padding[1] - padding[3];
      this.plotPadding = padding[3];
      this.plotHeight = this.height;
    } else if (this.layout === 'vertical') {
      this.plotWidth = this.width;
      this.plotHeight = this.height - padding[0] - padding[2];
      this.plotPadding = padding[0];
    }
  }
  public _initCanvas() {
    const width = this.domWidth;
    const height = this.height;
    const canvas = new Canvas({
      width,
      height,
      containerDOM: this.domContainer,
      capture: false,
    });
    const node = canvas.get('el');
    node.style.position = 'absolute';
    node.style.top = 0;
    node.style.left = 0;
    node.style.zIndex = 3;
    this.canvas = canvas;
  }
  public _initBackground() {
    const chart = this.view;
    const geom = chart.get('elements')[0];
    const shapes = geom.get('shapeContainer').get('children');
    const chartData = shapes.length > 0 ? getFirstShapeData(shapes) : chart.get('data');
    const data = (this.data = this.data || chartData);
    const xScale = chart.getXScale();
    const xAxis = this.view.xAxis || xScale.field;
    const yAxis = this.view.yAxis || chart.getYScales()[0].field;
    const scales = _.deepMix(
      {
        [`${xAxis}`]: {
          range: [0, 1],
        },
      },
      getColDefs(chart),
      this.view.scales
    ); // 用户列定义
    delete scales[xAxis].min;
    delete scales[xAxis].max;
    if (!data) {
      // 没有数据，则不创建
      throw new Error('Please specify the data!');
    }
    if (!xAxis) {
      throw new Error('Please specify the xAxis!');
    }
    if (!yAxis) {
      throw new Error('Please specify the yAxis!');
    }

    const backgroundChart = this.backgroundChart;
    let type = backgroundChart.type || geom.get('type');
    const color = backgroundChart.color || 'grey';
    if (!_.isArray(type)) {
      type = [type];
    }

    const padding = parsePadding(this.padding);
    const bgChart = new Plot({
      containerDOM: this.container,
      width: this.domWidth,
      height: this.height,
      padding: [0, padding[1], 0, padding[3]],
      animate: false,
    });
    bgChart.data(data);
    bgChart.scale(scales);
    bgChart.axis(false);
    bgChart.tooltip(false);
    bgChart.legend(false);
    _.each(type, (eachType) => {
      bgChart
        .area()
        .position(`${xAxis}*${yAxis}`)
        .color(color)
        .opacity(1);
    });
    bgChart.render();
    this.bgChart = bgChart;
    this.scale = this.layout === 'horizontal' ? bgChart.getXScale() : bgChart.getYScales()[0];
    if (this.layout === 'vertical') {
      bgChart.destroy();
    }
  }

  public _initRange() {
    const startRadio = this.startRatio;
    const endRadio = this.endRatio;
    const start = this._startValue;
    const end = this._endValue;
    const scale = this.scale;
    let min = 0;
    let max = 1;

    // startRadio 优先级高于 start
    if (_.isNumber(startRadio)) {
      min = startRadio;
    } else if (start) {
      min = scale.scale(scale.translate(start));
    }

    // endRadio 优先级高于 end
    if (_.isNumber(endRadio)) {
      max = endRadio;
    } else if (end) {
      max = scale.scale(scale.translate(end));
    }
    const { minSpan, maxSpan } = this;
    let totalSpan = 0;
    if (scale.type === 'time' || scale.type === 'timeCat') {
      // 时间类型已排序
      const values = scale.values;
      const firstValue = values[0];
      const lastValue = values[values.length - 1];
      totalSpan = lastValue - firstValue;
    } else if (scale.isLinear) {
      totalSpan = scale.max - scale.min;
    }
    if (totalSpan && minSpan) {
      this.minRange = (minSpan / totalSpan) * 100;
    }
    if (totalSpan && maxSpan) {
      this.maxRange = (maxSpan / totalSpan) * 100;
    }

    const range = [min * 100, max * 100];
    this.range = range;
    return range;
  }
  public _getHandleValue(type) {
    let value;
    const range = this.range;
    const min = range[0] / 100;
    const max = range[1] / 100;
    const scale = this.scale;
    if (type === 'min') {
      value = this._startValue ? this._startValue : scale.invert(min);
    } else {
      value = this._endValue ? this._endValue : scale.invert(max);
    }
    return value;
  }

  public _initSlider() {
    const canvas = this.canvas;
    const range = this._initRange();
    const scale = this.scale;

    const rangeElement = canvas.addGroup(Slider, {
      middleAttr: this.fillerStyle,
      range,
      minRange: this.minRange,
      maxRange: this.maxRange,
      layout: this.layout,
      width: this.plotWidth,
      height: this.plotHeight,
      backgroundStyle: this.backgroundStyle,
      textStyle: this.textStyle,
      handleStyle: this.handleStyle,
      minText: scale.getText(this._getHandleValue('min')),
      maxText: scale.getText(this._getHandleValue('max')),
    });
    this.canvas.add(rangeElement);

    if (this.layout === 'horizontal') {
      rangeElement.translate(this.plotPadding, 0);
    } else if (this.layout === 'vertical') {
      rangeElement.translate(0, this.plotPadding);
    }
    this.rangeElement = rangeElement;
  }

  public _updateElement(minRatio, maxRatio) {
    const { view, scale, rangeElement } = this;
    const { field } = scale;
    const minTextElement = rangeElement.get('minTextElement');
    const maxTextElement = rangeElement.get('maxTextElement');
    const min = scale.invert(minRatio);
    const max = scale.invert(maxRatio);
    const minText = scale.getText(min);
    const maxText = scale.getText(max);
    minTextElement.attr('text', minText);
    maxTextElement.attr('text', maxText);

    this._startValue = minText;
    this._endValue = maxText;

    if (this.onChange) {
      this.onChange({
        startText: minText,
        endText: maxText,
        startValue: min,
        endValue: max,
        startRadio: minRatio,
        endRadio: maxRatio,
      });
    }

    view.filter(field, (val) => {
      const valRatio = scale.scale(val);
      const minR = scale.scale(minText);
      const maxR = scale.scale(maxText);
      return valRatio > minR && valRatio < maxR;
    });

    view.repaint();
  }

  public _bindEvent() {
    const rangeElement = this.rangeElement;
    rangeElement.on('sliderchange', (ev) => {
      const range = ev.range;
      const minRatio = range[0] / 100;
      const maxRatio = range[1] / 100;
      this._updateElement(minRatio, maxRatio);
    });
  }

  public clear() {
    this.canvas.clear();
    if (this.bgChart) {
      this.bgChart.destroy();
    }
    this.bgChart = null;
    this.scale = null;
    this.canvas.draw();
  }

  public repaint() {
    this.clear();
    this.render();
  }

  public render() {
    this._initWidth();
    this._initCanvas();
    this._initBackground();
    this._initSlider();
    this._bindEvent();
    this.canvas.draw();
  }

  public destroy() {
    clearTimeout(this.resizeTimer);
    const rangeElement = this.rangeElement;
    rangeElement.off('sliderchange');
    if (this.bgChart) {
      this.bgChart.destroy();
    }
    this.canvas.destroy();
    const container = this.domContainer;
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
    window.removeEventListener('resize', _.getWrapBehavior(this, '_initForceFitEvent') as () => void);
    this.destroyed = true;
  }
}
