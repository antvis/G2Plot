import { BBox, Shape, Text } from '@antv/g';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import ViewLayer from '../../../../base/view-layer-refactor';

const DEFAULT_SIZE = 12;
const TOLERANCE = 0.01;
const MAX_ITERATION = 100;
const MIN_HEIGHT = 12;

function getRange(points) {
  let maxHeight = -Infinity;
  let min = Infinity;
  let max = -Infinity;
  _.each(points, (p) => {
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
  _.each(points, (p) => {
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

class AreaLabel extends ElementLabels {
  private scaleFactor: number[] = [];

  public showLabels(points: any, shapes: Shape[]) {
    // 获取堆叠字段
    const stackField = this.get('element').get('attrs').color.scales[0].field;
    // 根据stackField将point分组
    const groupedPoints = this._groupPoints(points, stackField);
    const labelPoints = [];
    _.each(groupedPoints, (pointArray, name) => {
      const labelPoint = this._drawLabel(pointArray, name);
      if (labelPoint) {
        labelPoints.push(_.mix({}, pointArray[0], labelPoint));
        this.scaleFactor.push(labelPoint.scaleFactor);
      }
    });
    super.showLabels(labelPoints, shapes);
    const labelOptions = this.get('labelOptions');
    if (labelOptions.autoScale) {
      this._adjuestLabelSize();
    }
  }

  private _groupPoints(points, field) {
    const groupedPoints = {};
    _.each(points, (p) => {
      const value = p._origin[field];
      if (!_.has(groupedPoints, value)) {
        groupedPoints[value] = [];
      }
      groupedPoints[value].push(p);
    });
    return groupedPoints;
  }

  private _drawLabel(points, name) {
    const { xRange, maxHeight } = getRange(points);
    // 根据area宽度在x方向各点间做插值
    const resolution = xRange[1] - xRange[0];
    const interpolatedPoints = this._getInterpolatedPoints(xRange[0], resolution, points);
    // 获取label的bbox
    const bbox = this._getLabelBbox(name);
    const fitOption = {
      xRange,
      aspect: bbox.width / bbox.height,
      data: interpolatedPoints,
      justTest: true,
    };
    const height = this._bisection(MIN_HEIGHT, maxHeight, this._testFit, fitOption, TOLERANCE, MAX_ITERATION);
    if (height === null) {
      return;
    }
    fitOption.justTest = false;
    const fit: any = this._testFit(fitOption);
    fit.x = fit.x;
    fit.y = fit.y0 + (fit.y1 - fit.y0) / 2;
    fit.scaleFactor = (height / bbox.height) * 0.4;
    return fit;
  }

  private _getInterpolatedPoints(minX, resolution, points) {
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

  private _bisection(min, max, test, testOption, tolerance, maxIteration) {
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

  private _testFit(option) {
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

  private _getLabelBbox(text) {
    const plot: ViewLayer = this.get('labelOptions').plot;
    const labelStyle = _.clone(plot.theme.label.textStyle);
    labelStyle.fontSize = DEFAULT_SIZE;
    const tShape = new Text({
      attrs: {
        text,
        x: 0,
        y: 0,
        ...labelStyle,
      },
    });
    return tShape.getBBox();
  }

  private _adjuestLabelSize() {
    const renderer = this.get('labelsRenderer');
    const labels = renderer.get('group').get('children');
    const view = this.get('element').get('view');
    _.each(labels, (label, index) => {
      const scaleFactor = this.scaleFactor[index];
      label.attr('fontSize', DEFAULT_SIZE);
      label.transform([
        ['t', -label.attr('x'), -label.attr('y')],
        ['s', scaleFactor, scaleFactor],
        ['t', label.attr('x'), label.attr('y')],
      ]);
    });
    view.get('canvas').draw();
  }
}

registerElementLabels('area', AreaLabel);
