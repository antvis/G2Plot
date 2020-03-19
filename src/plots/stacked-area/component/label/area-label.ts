import { each, deepMix, clone, find } from '@antv/util';
import { View, IGroup, Geometry } from '../../../../dependents';

const DEFAULT_SIZE = 12;
const TOLERANCE = 0.01;
const MAX_ITERATION = 100;
const MIN_HEIGHT = 12;

function getRange(points) {
  let maxHeight = -Infinity;
  let min = Infinity;
  let max = -Infinity;
  each(points, (p) => {
    min = Math.min(p.x, min);
    max = Math.max(p.x, max);
    const height = Math.abs(p.y[0] - p.y[1]);
    maxHeight = Math.max(maxHeight, height);
  });
  return {
    xRange: [min, max],
    maxHeight,
  };
}

function interpolateY(x, points, index) {
  let leftPoint = points[0];
  let rightPoint = points[points.length - 1];
  each(points, (p) => {
    if (p.x === x) {
      return p.y[index];
    }
    if (p.x < x && p.x > leftPoint.x) {
      leftPoint = p;
    }
    if (p.x > x && p.x < rightPoint.x) {
      rightPoint = p;
    }
  });
  const t = (x - leftPoint.x) / (rightPoint.x - leftPoint.x);
  return leftPoint.y[index] * (1 - t) + rightPoint.y[index] * t;
}

function getXIndex(data, x) {
  // tslint:disable-next-line: prefer-for-of
  let i;
  for (i = 0; i < data.length; i++) {
    const d = data[i];
    if (d.x === x || d.x > x) {
      break;
    }
  }
  return i;
}

export interface AreaLabelConfig {
  visible: boolean;
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
  autoScale?: boolean;
}

export interface IAreaLabel extends AreaLabelConfig {
  view: View;
  plot: any;
}

export default class AreaLabel {
  public options: AreaLabelConfig;
  public destroyed: boolean = false;
  protected plot: any;
  protected view: View;
  private container: IGroup;
  private scaleFactor: number[] = [];

  constructor(cfg: IAreaLabel) {
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
    const stackField = this.plot.options.stackField;
    const groupedPoints = this.getGeometry().dataArray;
    const labelPoints = [];
    each(groupedPoints, (pointArray, name) => {
      const labelPoint = this.drawLabel(pointArray, name);
      if (labelPoint) {
        labelPoints.push(deepMix({}, pointArray[0], labelPoint));
        this.scaleFactor.push(labelPoint.scaleFactor);
      }
    });
    const labelShapes = [];
    each(labelPoints, (p, index) => {
      const { style, offsetX, offsetY } = this.options;
      const labelSize = this.getFontSize(index);
      const formatter = this.options.formatter;
      const content = formatter ? formatter(p._origin[stackField]) : p._origin[stackField];
      const text = this.container.addShape('text', {
        attrs: deepMix(
          {},
          {
            x: p.x + offsetX,
            y: p.y + offsetY,
            text: content,
            fill: p.color,
            fontSize: labelSize,
            textAlign: 'center',
            textBaseline: 'top',
          },
          style
        ),
        name: 'label',
      });
      labelShapes.push(text);
    });
    this.plot.canvas.draw();
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

  protected getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = clone(theme.label.style);
    labelStyle.stroke = null;
    delete labelStyle.fill;
    return {
      offsetX: 0,
      offsetY: 0,
      style: labelStyle,
      autoScale: true,
    };
  }

  protected drawLabel(points, name) {
    const { xRange, maxHeight } = getRange(points);
    // 根据area宽度在x方向各点间做插值
    const resolution = xRange[1] - xRange[0];
    const interpolatedPoints = this.getInterpolatedPoints(xRange[0], resolution, points);
    // 获取label的bbox
    const bbox = this.getLabelBbox(name);
    const fitOption = {
      xRange,
      aspect: bbox.width / bbox.height,
      data: interpolatedPoints,
      justTest: true,
    };
    const height = this.bisection(MIN_HEIGHT, maxHeight, this.testFit, fitOption, TOLERANCE, MAX_ITERATION);
    if (height === null) {
      return;
    }
    fitOption.justTest = false;
    const fit: any = this.testFit(fitOption);
    fit.x = fit.x;
    fit.y = fit.y0 + (fit.y1 - fit.y0) / 2;
    fit.scaleFactor = (height / bbox.height) * 0.2;
    return fit;
  }

  private getInterpolatedPoints(minX, resolution, points) {
    const interpolatedPoints = [];
    const step = 2;
    for (let i = minX; i < resolution; i += step) {
      const y0 = interpolateY(i, points, 0);
      const y1 = interpolateY(i, points, 1);
      interpolatedPoints.push({
        x: i,
        y: [y0, y1],
      });
    }
    return interpolatedPoints;
  }

  private bisection(min, max, test, testOption, tolerance, maxIteration) {
    for (let i = 0; i < maxIteration; i++) {
      const middle = (min + max) / 2;
      const options = testOption;
      options.height = middle;
      options.width = middle * options.aspect;
      const passesTest = test(options);
      const withinTolerance = (max - min) / 2 < tolerance;
      if (passesTest && withinTolerance) {
        return middle;
      }
      if (passesTest) {
        min = middle;
      } else {
        max = middle;
      }
    }
    return null;
  }

  private testFit(option) {
    const { xRange, width, height, data, justTest } = option;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const x0 = d.x;
      const x1 = x0 + width;
      if (x1 > xRange[1]) {
        break;
      }
      const x1_index = getXIndex(data, x1);
      let ceiling = -Infinity;
      let ceilingFloor = null; // 保存ceiling时对应的bottom位置，ceil和floor不一定是一对坐标
      let floor = Infinity;
      for (let j = i; j < x1_index; j++) {
        const top = data[j].y[1];
        const bottom = data[j].y[0];
        if (bottom < floor) {
          floor = bottom;
        }
        if (top > ceiling) {
          ceiling = top;
          ceilingFloor = bottom;
        }
        if (floor - ceiling < height) {
          break;
        }
      }
      if (floor - ceiling >= height) {
        if (justTest) {
          return true;
        }
        return {
          x: x0,
          y0: ceiling,
          y1: ceilingFloor,
          width,
          height,
        };
      }
    }
    return false;
  }

  private getLabelBbox(text) {
    const labelStyle = clone(this.plot.theme.label.textStyle);
    labelStyle.fontSize = DEFAULT_SIZE;
    const tShape = this.container.addShape('text', {
      attrs: {
        text,
        x: 0,
        y: 0,
        ...labelStyle,
      },
    });
    const bbox = tShape.getBBox();
    tShape.remove();
    return bbox;
  }

  private getGeometry() {
    return find(this.view.geometries, (geom) => geom.type === 'area') as Geometry;
  }

  protected getFontSize(index) {
    if (this.options.autoScale) {
      const scaleFactor = this.scaleFactor[index];
      return DEFAULT_SIZE * scaleFactor;
    }
    return DEFAULT_SIZE;
  }
}
