/**
 * 区域连接组件，用于堆叠柱状图和堆叠条形图
 */
import { each, assign, mix, find } from '@antv/util';
import { IGroup, IShape, View } from '../dependents';
import { compare } from '../base/controller/state';

function parsePoints(shape, coord) {
  const parsedPoints = [];
  const points = shape.get('origin').points;
  each(points, (p) => {
    parsedPoints.push(coord.convertPoint(p));
  });
  return parsedPoints;
}

function getDefaultStyle() {
  return {
    areaStyle: {
      opacity: 0.2,
    },
    lineStyle: {
      lineWidth: 2,
      opacity: 0.1,
    },
  };
}

export default class ConnectedArea {
  private view: View;
  private container: IGroup;
  private field: string; // 堆叠字段
  private areas: IShape[] = [];
  private lines: IShape[] = [];
  private areaStyle: any;
  private _areaStyle: any = {};
  private lineStyle: any;
  private _lineStyle: any = {};
  private triggerOn: string;
  private animation: boolean;

  constructor(cfg) {
    assign(this, cfg);
    this._init();
  }

  public draw() {
    const groupedShapes = this._getGroupedShapes();
    each(groupedShapes, (shapes, name) => {
      if (shapes.length > 0) {
        this._drawConnection(shapes, name);
      }
    });
    if (this.triggerOn) {
      this._addInteraction();
    } else if (this.animation) {
      // 如果定义了triggerOn的方式，则组件是响应交互的，初始化为不可见状态，因此无需动画
      this._initialAnimation();
    }
  }
  public clear() {
    if (this.container) {
      this.container.clear();
    }
    this.areas = [];
    this.lines = [];
  }

  public destory() {
    if (this.container) {
      this.container.remove();
    }
  }

  public setState(state, condition) {
    if (state === 'active') {
      this._onActive(condition);
    }
    if (state === 'disabled') {
      this._onDisabled(condition);
    }
    if (state === 'selected') {
      this._onSelected(condition);
    }
  }

  private _init() {
    const layer = this.view.backgroundGroup;
    this.container = layer.addGroup();
    this.draw();
    this.view.on('beforerender', () => {
      this.clear();
    });
  }

  private _getGroupedShapes() {
    // 根据堆叠字段对shape进行分组
    const { values } = this.view.getScaleByField(this.field);
    const geometry = this.view.geometries[0];
    const shapes = geometry.getShapes();
    // 创建分组
    const groups = {};
    each(values, (v) => {
      groups[v] = [];
    });
    // 执行分组
    each(shapes, (shape) => {
      const origin = shape.get('origin').data;
      const key = origin[this.field];
      groups[key].push(shape);
    });
    return groups;
  }

  private _drawConnection(shapes, name) {
    // tslint:disable-next-line: prefer-for-of
    const originColor = shapes[0].attr('fill');
    this._areaStyle[name] = this._getShapeStyle(originColor, 'area');
    this._lineStyle[name] = this._getShapeStyle(originColor, 'line');
    const coord = this.view.geometries[0].coordinate;
    for (let i = 0; i < shapes.length - 1; i++) {
      const current = parsePoints(shapes[i], coord);
      const next = parsePoints(shapes[i + 1], coord);
      const areaStyle = mix({}, this._areaStyle[name]);
      const lineStyle = mix({}, this._lineStyle[name]);
      if (this.triggerOn) {
        areaStyle.opacity = 0;
        lineStyle.opacity = 0;
      }
      const area = this.container.addShape('path', {
        attrs: mix({} as any, areaStyle, {
          path: [
            ['M', current[2].x, current[2].y],
            ['L', next[1].x, next[1].y],
            ['L', next[0].x, next[0].y],
            ['L', current[3].x, current[3].y],
          ],
        }),
        name: 'connectedArea',
      });
      const line = this.container.addShape('path', {
        attrs: mix({} as any, lineStyle, {
          path: [
            ['M', current[2].x, current[2].y],
            ['L', next[1].x, next[1].y],
          ],
          // stroke: shapes[i].attr('fill'),
        }),
        name: 'connectedArea',
      });
      // 在辅助图形上记录数据，用以交互和响应状态量
      const originData = shapes[i].get('origin').data;
      area.set('data', originData);
      line.set('data', originData);
      this.areas.push(area);
      this.lines.push(line);
    }
  }

  private _getShapeStyle(originColor, shapeType) {
    const styleName = `${shapeType}Style`;
    // 如果用户自己指定了样式，则不采用默认颜色映射
    if (this[styleName]) {
      return this[styleName];
    }
    const defaultStyle = getDefaultStyle()[styleName];
    let mappedStyle: any = { fill: originColor };
    if (shapeType === 'line') {
      mappedStyle = { stroke: originColor };
    }

    return mix(defaultStyle, mappedStyle);
  }

  private _addInteraction() {
    const eventName = this.triggerOn;
    this.view.on(`interval:${eventName}`, (e) => {
      const origin = e.target.get('origin').data[this.field];
      this.setState('active', {
        name: this.field,
        exp: origin,
      });
      this.setState('disabled', {
        name: this.field,
        exp: (d) => {
          return d !== origin;
        },
      });
      this.view.canvas.draw();
    });
    // 当鼠标移动到其他区域时取消显示
    this.view.on('mousemove', (e) => {
      if (e.gEvent.target.get('name') !== 'interval') {
        this.setState('disabled', {
          name: this.field,
          exp: () => {
            return true;
          },
        });
      }
    });
  }

  private _initialAnimation() {
    // clipIn动画
    const { x, y, width, height } = this.view.coordinateBBox;
    this.container.setClip({
      type: 'rect',
      attrs: {
        x,
        y,
        width: 0,
        height,
      },
    });
    this.container.set('animating', true);
    this.container.getClip().animate(
      {
        width,
      },
      600,
      'easeQuadOut',
      () => {}, // eslint-disable-line
      400
    );
  }

  private _onActive(condition) {
    each(this.areas, (area) => {
      const shapeData = area.get('data');
      const styleField = shapeData[this.field];
      if (compare(shapeData, condition)) {
        const opacity = this._areaStyle[styleField].opacity || 1;
        // area.attr('opacity',this._areaStyle[styleField].opacity || 1);
        area.stopAnimate();
        area.animate({ opacity }, 400, 'easeQuadOut');
      }
    });
    each(this.lines, (line) => {
      const shapeData = line.get('data');
      const styleField = shapeData[this.field];
      if (compare(shapeData, condition)) {
        const opacity = this._lineStyle[styleField].opacity || 1;
        // line.attr('opacity',this._lineStyle[styleField].opacity || 1);
        line.stopAnimate();
        line.animate({ opacity }, 400, 'easeQuadOut');
      }
    });
  }

  private _onDisabled(condition) {
    each(this.areas, (area) => {
      const shapeData = area.get('data');
      if (compare(shapeData, condition)) {
        // area.attr('opacity',0);
        area.stopAnimate();
        area.animate(
          {
            opacity: 0,
          },
          400,
          'easeQuadOut'
        );
      }
    });
    each(this.lines, (line) => {
      const shapeData = line.get('data');
      if (compare(shapeData, condition)) {
        // line.attr('opacity',0);
        line.stopAnimate();
        line.animate(
          {
            opacity: 0,
          },
          400,
          'easeQuadOut'
        );
      }
    });
  }

  private _onSelected(condition) {
    this._onActive(condition);
  }

  private getGeometry() {
    return find(this.view.geometries, (geom) => geom.type === 'interval');
  }
}
