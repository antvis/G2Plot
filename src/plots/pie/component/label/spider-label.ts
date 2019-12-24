import { Group, Shape } from '@antv/g';
import { Scale, View } from '@antv/g2';
import * as _ from '@antv/util';

const ANCHOR_OFFSET = 0; // 锚点偏移量
const INFLECTION_OFFSET = 15; // 拐点偏移量
const DEFAULT_COLOR = '#CCC';
const LABEL1_OFFSETY = 2;
const LABEL2_OFFSETY = -2;
const ADJUSTOFFSET = 15;

interface IAttrs {
  [key: string]: any;
}

type Point = { x: number; y: number };
interface LabelData {
  _anchor: Point;
  _inflection: Point;
  _data: object;
  x: number;
  y: number;
  r: number;
  fill: string;
  textGroup: Group;
  _side?: 'left' | 'right';
}

function getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle),
  };
}

function getDefaultCfg() {
  return {
    text: {
      fill: 'rgba(0, 0, 0, 0.65)',
      fontSize: 12,
    },
    lineWidth: 0.5,
    lineStroke: 'rgba(0, 0, 0, 0.45)',
    /** distance between label and edge */
    sidePadding: 20,
    lineHeight: 32,
    // anchorSize: 2,
  };
}

interface OriginLabelItem {
  /** 原始数据值 */
  _origin: object;
  color?: string;
}

export default class SpiderLabel {
  private view: View;
  private fields: string[];
  private halves: any[][];
  private container: Group;
  private config: IAttrs;
  private formatter: (text: string, item: OriginLabelItem, index: number) => string | string[];
  private offsetX: number;
  private offsetY: number;
  private width: number;
  private height: number;

  constructor(cfg) {
    this.view = cfg.view;
    this.fields = cfg.fields;
    this.formatter = cfg.formatter;
    this.offsetX = cfg.offsetX;
    this.offsetY = cfg.offsetY;
    this.config = _.assign(getDefaultCfg(), _.pick(cfg.style, ['lineStroke', 'lineWidth']));
    if (cfg.style) {
      this.config.text = _.mix(this.config.text, cfg.style);
    }
    this._adjustConfig(this.config);
    this._init();
  }

  public draw() {
    if (!this.view || this.view.destroyed) {
      return;
    }
    /** 如果有formatter则事先处理数据 */
    const data = _.clone(this.view.get('data'));
    this.halves = [[], []];
    this.container = this.view.get('frontgroundGroup').addGroup();
    const shapes = this.view.get('elements')[0].getShapes();
    const coord = this.view.get('coord');

    const angleField = this.fields[0];
    const scale = this.view.get('scales')[angleField];
    const { center, startAngle } = coord;
    const radius = coord.getRadius();
    const { width, height } = this.view.get('panelRange');
    this.width = width;
    this.height = height;
    let angle = startAngle;
    // tslint:disable-next-line: prefer-for-of
    for (let idx = 0; idx < data.length; idx++) {
      const d = data[idx];
      // 计算每个切片的middle angle
      const angleValue = scale.scale(d[angleField]);
      const targetAngle = angle + Math.PI * 2 * angleValue;
      const middleAngle = angle + (targetAngle - angle) / 2;
      angle = targetAngle;
      // 根据middle angle计算锚点和拐点距离
      const anchorPoint = getEndPoint(center, middleAngle, radius + ANCHOR_OFFSET);
      const inflectionPoint = getEndPoint(center, middleAngle, radius + INFLECTION_OFFSET);
      // 获取对应shape的color
      let color = DEFAULT_COLOR;
      if (this.fields.length === 2) {
        const colorField = this.fields[1];
        const colorScale = this.view.get('scales')[colorField];
        const colorIndex = colorScale.scale(d[colorField]);
        const shapeIndex = Math.floor(colorIndex * (shapes.length - 1));
        color = shapes[shapeIndex].attr('fill');
      }
      // 组装label数据
      const label: LabelData = {
        _anchor: anchorPoint,
        _inflection: inflectionPoint,
        _data: d,
        x: inflectionPoint.x,
        y: inflectionPoint.y,
        r: radius + INFLECTION_OFFSET,
        fill: color,
        textGroup: null,
        _side: null,
      };
      // 创建label文本
      let texts = [];
      _.each(this.fields, (f) => {
        texts.push(d[f]);
      });
      if (this.formatter) {
        let formatted: any = this.formatter(d[angleField], { _origin: d, color }, idx);
        if (_.isString(formatted)) {
          formatted = [formatted];
        }
        texts = formatted;
      }
      const textGroup = new Group();
      const textAttrs: IAttrs = {
        x: 0,
        y: 0,
        fontSize: this.config.text.fontSize,
        lineHeight: this.config.text.fontSize,
        fontWeight: this.config.text.fontWeight,
        fill: this.config.text.fill,
      };
      // label1:下部label
      let lowerText = d[angleField];
      if (this.formatter) {
        lowerText = texts[0];
      }
      const lowerTextAttrs = _.clone(textAttrs);
      if (texts.length === 2) {
        lowerTextAttrs.fontWeight = 700;
      }
      const lowerTextShape = textGroup.addShape('text', {
        attrs: _.mix(
          {
            textBaseline: texts.length === 2 ? 'top' : 'middle',
            text: lowerText,
          },
          lowerTextAttrs
        ),
        data: d,
        offsetY: texts.length === 2 ? LABEL1_OFFSETY : 0,
        name: 'label',
      });
      lowerTextShape.name = 'label'; // 用于事件标记 shapeName
      /** label2:上部label */
      if (texts.length === 2) {
        const topTextShape = textGroup.addShape('text', {
          attrs: _.mix(
            {
              textBaseline: 'bottom',
              text: texts[1],
            },
            textAttrs
          ),
          data: d,
          offsetY: LABEL2_OFFSETY,
          name: 'label',
        });
        topTextShape.name = 'label'; // 用于事件标记 shapeName
      }

      label.textGroup = textGroup;

      /** 将label分组 */
      if (anchorPoint.x < center.x) {
        label._side = 'left';
        this.halves[0].push(label);
      } else {
        label._side = 'right';
        this.halves[1].push(label);
      }
    }

    /** 绘制label */
    const _drawnLabels = [];
    const maxCountForOneSide = Math.floor(height / this.config.lineHeight);

    _.each(this.halves, (half) => {
      if (half.length > maxCountForOneSide) {
        half.splice(maxCountForOneSide, half.length - maxCountForOneSide);
      }

      half.sort((a, b) => {
        return a.y - b.y;
      });

      this._antiCollision(half);
    });
    this.view.get('canvas').draw();
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  private _init() {
    this.view.on('beforerender', () => {
      this.clear();
    });

    this.view.on('afterrender', () => {
      this.draw();
    });
  }

  private _antiCollision(half: LabelData[]) {
    const coord = this.view.get('coord');
    const canvasHeight = coord.getHeight();
    const { center } = coord;
    const radius = coord.getRadius();
    const startY = center.y - radius - INFLECTION_OFFSET - this.config.lineHeight;
    let overlapping = true;
    let totalH = canvasHeight;
    let i;

    let maxY = 0;
    let minY = Number.MIN_VALUE;
    let maxLabelWidth = 0;
    const boxes: any[] = half.map((label) => {
      const labelY = label.y;
      if (labelY > maxY) {
        maxY = labelY;
      }
      if (labelY < minY) {
        minY = labelY;
      }

      const textGroup = label.textGroup;
      const labelWidth = textGroup.getBBox().width;
      if (labelWidth >= maxLabelWidth) {
        maxLabelWidth = labelWidth;
      }

      return {
        size: this.config.lineHeight,
        targets: [labelY - startY],
      };
    });
    if (maxY - startY > totalH) {
      totalH = maxY - startY;
    }

    const iteratorBoxed = function(items) {
      items.forEach((box) => {
        const target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
        box.pos = Math.min(Math.max(minY, target - box.size / 2), totalH - box.size);
      });
    };

    while (overlapping) {
      iteratorBoxed(boxes);
      // detect overlapping and join boxes
      overlapping = false;
      i = boxes.length;
      while (i--) {
        if (i > 0) {
          const previousBox = boxes[i - 1];
          const box = boxes[i];
          if (previousBox.pos + previousBox.size > box.pos) {
            // overlapping
            previousBox.size += box.size;
            previousBox.targets = previousBox.targets.concat(box.targets);

            // overflow, shift up
            if (previousBox.pos + previousBox.size > totalH) {
              previousBox.pos = totalH - previousBox.size;
            }
            boxes.splice(i, 1); // removing box
            overlapping = true;
          }
        }
      }
    }

    i = 0;
    boxes.forEach((b) => {
      let posInCompositeBox = startY; // middle of the label
      b.targets.forEach(() => {
        half[i].y = b.pos + posInCompositeBox + this.config.lineHeight / 2;
        posInCompositeBox += this.config.lineHeight;
        i++;
      });
    });

    const drawnLabels = [];
    half.forEach((label) => {
      const textGroup = this._drawLabel(label);
      this.container.add(textGroup);
      this._drawLabelLine(label, maxLabelWidth);
      drawnLabels.push(textGroup);
    });
  }

  private _drawLabel(label: LabelData) {
    const coord = this.view.get('coord');
    const center = coord.getCenter();
    const radius = coord.getRadius();

    const width = this.width;
    const { y, textGroup } = label;
    const children = textGroup.get('children');
    const x_dir = label._side === 'left' ? 1 : -1;

    const textAttrs = {
      textAlign: label._side === 'left' ? 'right' : 'left',
      x:
        label._side === 'left'
          ? center.x - radius - this.config.sidePadding
          : center.x + radius + this.config.sidePadding,
    };

    if (this.offsetX) {
      textAttrs.x += this.offsetX * x_dir;
    }

    children.forEach((child) => {
      const offsetY = child.get('offsetY');
      const yPosition = y + offsetY;
      child.attr(textAttrs);
      child.attr('y', yPosition);
    });

    return textGroup;
  }

  private _drawLabelLine(label: LabelData, maxLabelWidth): Shape {
    const _anchor = [label._anchor.x, label._anchor.y];
    const _inflection = [label._inflection.x, label._inflection.y];
    const { fill, y, textGroup } = label;
    if (!textGroup) return;
    const lastPoint = [label._side === 'left' ? textGroup.getBBox().maxX + 4 : textGroup.getBBox().minX - 4, y];

    let points = [_anchor, _inflection, lastPoint];
    if (_inflection[1] !== y) {
      // 展示全部文本文本位置做过调整
      if (_inflection[1] < y) {
        // 文本被调整下去了，则添加拐点连接线
        const point1 = _inflection;
        const leftPoint = lastPoint[0] + maxLabelWidth + ADJUSTOFFSET;
        const rightPoint = lastPoint[0] - maxLabelWidth - ADJUSTOFFSET;
        const point2 = [label._side === 'left' ? leftPoint : rightPoint, _inflection[1]];
        const point3 = [
          label._side === 'left' ? lastPoint[0] + maxLabelWidth : lastPoint[0] - maxLabelWidth,
          lastPoint[1],
        ];

        points = [_anchor, point1, point2, point3, lastPoint];

        if ((label._side === 'right' && point2[0] < point1[0]) || (label._side === 'left' && point2[0] > point1[0])) {
          points = [_anchor, point3, lastPoint];
        }
      } else {
        points = [_anchor, [_inflection[0], y], lastPoint];
      }
    }

    const path = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      let starter = 'L';
      if (i === 0) {
        starter = 'M';
      }
      path.push([starter, p[0], p[1]]);
    }

    this.container.addShape('path', {
      attrs: {
        path,
        lineWidth: this.config.lineWidth,
        stroke: this.config.lineStroke,
      },
    });

    // 绘制锚点
    // this.container.addShape('circle', {
    //   attrs: {
    //     x: _anchor[0],
    //     y: _anchor[1],
    //     r: this.config.anchorSize,
    //     fill,
    //   },
    // });
  }

  private _adjustConfig(config) {
    if (config.text.fontSize) {
      config.lineHeight = config.text.fontSize * 3;
    }
  }
}
