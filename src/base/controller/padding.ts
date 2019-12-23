import { BBox, Element } from '@antv/g';
import { DataPointType } from '@antv/g2/lib/interface';
import { View } from '@antv/g2';
import * as _ from '@antv/util';
import ViewLayer from '../view-layer';
import { MarginPadding } from '../../interface/types';
import { bboxOnRotate } from '../../util/math';

interface ControllerConfig {
  plot: ViewLayer;
}

/**
 * 处理图表padding的逻辑：
 * 注册参与padding的自定义组件
 */

export default class PaddingController {
  private plot: ViewLayer;
  private bleeding: number[];

  private innerPaddingComponents: any[] = [];
  private outerPaddingComponents: any[] = [];

  constructor(cfg: ControllerConfig) {
    this.plot = cfg.plot;
  }

  public registerPadding(component: any, type: 'outer' | 'inner' = 'outer') {
    if (type === 'inner') {
      this.innerPaddingComponents.push(component);
    } else {
      this.outerPaddingComponents.push(component);
    }
  }

  /**
   * 清除已经注册的元素
   */
  public clear() {
    this.innerPaddingComponents = [];
    this.outerPaddingComponents = [];
  }

  public getPadding() {
    const props = this.plot.options;
    const padding = props.padding ? props.padding : this.plot.config.theme.padding;
    if (padding === 'auto') {
      return [0, 0, 0, 0];
    }
    return padding;
  }

  /** view层的padding计算 */
  public processAutoPadding() {
    const padding = this._getInnerAutoPadding();
    this.plot.updateConfig({
      padding,
    });
    this.plot.render();
  }

  public processOuterPadding(): BBox {
    let viewMinX = this.plot.layerBBox.minX;
    let viewMaxX = this.plot.layerBBox.maxX;
    let viewMinY = this.plot.layerBBox.minY;
    let viewMaxY = this.plot.layerBBox.maxY;
    _.each(this.outerPaddingComponents, (component) => {
      const { position } = component;
      const { minX, maxX, minY, maxY } = component.getBBox();
      if (maxY > viewMinY && maxY < viewMaxY && position === 'top') {
        viewMinY = maxY;
      }
      if (minY > viewMinY && minY < viewMaxY && position === 'bottom') {
        viewMaxY = minY;
      }
      if (maxX > viewMinX && maxX < viewMaxX && position === 'left') {
        viewMinX = maxX;
      }
      if (minX > viewMinX && maxX < viewMaxX && position === 'right') {
        viewMaxX = minX;
      }
    });
    return new BBox(viewMinX, viewMinY, viewMaxX - viewMinX, viewMaxY - viewMinY);
  }

  private _getInnerAutoPadding() {
    const props = this.plot.options;
    const view = this.plot.view;
    const viewRange: BBox = view.get('viewRange');
    const { maxX, maxY } = viewRange;
    const bleeding = this.plot.config.theme.bleeding;
    if (_.isArray(bleeding)) {
      _.each(bleeding, (it, index) => {
        if (typeof bleeding[index] === 'function') {
          bleeding[index] = bleeding[index](props);
        }
      });
    }
    this.plot.config.theme.legend.margin = bleeding;
    this.bleeding = _.clone(bleeding);
    // 参与auto padding的components: axis legend
    const components_bbox = [view.get('panelRange')];
    this._getAxis(view, components_bbox);
    let box = this._mergeBBox(components_bbox);
    this._getLegend(view, components_bbox, box);
    box = this._mergeBBox(components_bbox);
    // 参与auto padding的自定义组件
    const components = this.innerPaddingComponents;
    _.each(components, (obj) => {
      const component = obj as Element;
      const bbox = component.getBBox();
      components_bbox.push(bbox);
    });
    box = this._mergeBBox(components_bbox);
    let minY = box.minY;
    /** 极坐标下padding计算错误问题 */
    if (minY === viewRange.minY) {
      minY = 0;
    }
    const padding: MarginPadding = [
      0 - minY + this.bleeding[0], // 上面超出的部分
      box.maxX - maxX + this.bleeding[1], // 右边超出的部分
      box.maxY - maxY + this.bleeding[2], // 下边超出的部分
      0 - box.minX + this.bleeding[3],
    ];
    this.adjustAxisPadding(view, padding);
    // label、annotation等
    const panelPadding = this._getPanel(view, box);
    padding[0] += panelPadding[0];
    padding[1] += panelPadding[1];
    // padding[2] += panelPadding[2];
    padding[3] += panelPadding[3];
    return padding;
  }

  private _getAxis(view, bboxes) {
    const axes = view.get('axisController').axes;
    if (axes.length > 0) {
      _.each(axes, (a) => {
        const axis = a as DataPointType;
        const bbox = axis.get('group').getBBox();
        bboxes.push(bbox);
      });
    }
  }

  private _getLegend(view, bboxes, box) {
    const viewRange = view.get('viewRange');
    const legends = view.get('legendController').legends;
    if (legends.length > 0) {
      _.each(legends, (l) => {
        const legend = l as DataPointType;
        this._adjustLegend(legend, view, box);
        const legendBBox = legend.getBBox();
        const { width, height } = legendBBox;
        let x = 0;
        let y = 0;
        const position = legend.get('position').split('-');
        if (position[0] === 'right') {
          x = viewRange.maxX;
          y = legendBBox.minY;
        }
        if (position[0] === 'left') {
          x = box.minX - width;
          y = legendBBox.minY;
        }
        if (position[0] === 'top') {
          x = legendBBox.minX;
          y = -height;
        }
        if (position[0] === 'bottom') {
          x = legendBBox.minX;
          y = viewRange.maxY - height;
        }
        const bbox = new BBox(x, y, width, height);
        bboxes.push(bbox);
        const innerPadding = this._getLegendInnerPadding(legend);
        this._mergeBleeding(innerPadding);
      });
    }
  }

  private _getPanel(view, box) {
    const groups = [];
    const geoms = view.get('elements');
    _.each(geoms, (geom) => {
      if (geom.get('labelController')) {
        const labelContainer = geom.get('labelController').labelsContainer;
        if (labelContainer) {
          groups.push(labelContainer);
        }
      }
    });
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    _.each(groups, (group) => {
      const children = group.get('children');
      children.forEach((child) => {
        if (child.type === 'group' && child.get('children').length === 0) {
          return;
        }
        const bbox = child.getBBox();
        if (bbox.minX < minX) {
          minX = bbox.minX;
        }
        if (bbox.maxX > maxX) {
          maxX = bbox.maxX;
        }
        if (bbox.minY < minY) {
          minY = bbox.minY;
        }
        if (bbox.maxY > maxY) {
          maxY = bbox.maxY;
        }
      });
    });
    const panelRange = view.get('panelRange');
    //right
    let rightDist = Math.max(maxX - parseFloat(panelRange.maxX), 0);
    if (rightDist > 0) {
      const ratio = panelRange.width / (panelRange.width + rightDist);
      rightDist *= ratio;
    }
    //left
    let leftDist = Math.max(parseFloat(panelRange.minX) - minX, 0);
    if (leftDist > 0) {
      const ratio = panelRange.width / (panelRange.width + leftDist);
      leftDist *= ratio;
    }
    //top
    let topDist = Math.max(parseFloat(panelRange.minY) - minY, 0);
    if (topDist > 0) {
      const ratio = panelRange.height / (panelRange.height + topDist);
      topDist *= ratio;
    }
    //bottom
    let bottomDist = Math.max(maxY - parseFloat(panelRange.maxY), 0);
    if (bottomDist > 0) {
      const ratio = panelRange.height / (panelRange.height + bottomDist);
      bottomDist *= ratio;
    }

    return [topDist, rightDist, bottomDist, leftDist];
  }

  private _mergeBBox(bboxes) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    _.each(bboxes, (bbox) => {
      const box = bbox as DataPointType;
      minX = Math.min(box.minX, minX);
      maxX = Math.max(box.maxX, maxX);
      minY = Math.min(box.minY, minY);
      maxY = Math.max(box.maxY, maxY);
    });

    return { minX, maxX, minY, maxY };
    // return new BBox(minX, minY, maxX - minX, maxY - minY);
  }

  private _adjustLegend(legend, view, box) {
    const position = legend.get('position').split('-');
    const container = legend.get('container');
    const bbox = container.getBBox();
    const { width, height, maxX, minX, maxY, minY } = view.get('viewRange');
    if (position[0] === 'right') {
      container.move(width, minY);
    }
    if (position[0] === 'left') {
      container.move(box.minX - bbox.width, minY);
    }
    if (position[0] === 'top') {
      container.move(0, box.minY - bbox.height);
    }
    if (position[0] === 'bottom') {
      container.move(0, Math.max(maxY, box.maxY));
    }
  }

  private _getLegendInnerPadding(legend) {
    const innerPadding = this.plot.theme.legend.innerPadding;
    const position = legend.get('position').split('-');
    if (position[0] === 'top') {
      return [innerPadding[0], 0, 0, 0];
    }
    if (position[0] === 'bottom') {
      return [0, 0, innerPadding[2], 0];
    }
    if (position[0] === 'left') {
      return [0, 0, 0, innerPadding[3]];
    }
    if (position[0] === 'right') {
      return [0, innerPadding[1], 0, 0];
    }
  }

  private _mergeBleeding(source) {
    const target = this.bleeding;
    if (source.length !== target.length) {
      return;
    }
    for (let i = 0; i < source.length; i++) {
      target[i] += source[i];
    }
  }

  private adjustAxisPadding(view: View, padding: MarginPadding) {
    // 3.6.x Axis组件的 autoRotate padding 修正
    const xAxis = view.get('axisController').axes[0];
    if (!xAxis || !xAxis.get('autoRotateLabel') || !xAxis.getOffsetByRotateAngle) {
      return;
    }
    const labelRenderer = xAxis.get('labelRenderer');
    const labels = labelRenderer.getLabels();
    const curOffset = xAxis.getOffsetByRotateAngle(xAxis.get('autoRotateAngle'));
    const curTotalWidth = Math.abs(xAxis.get('end').x - xAxis.get('start').x);
    const curAvgWidth = Math.abs(labels[1].attr('x') - labels[0].attr('x'));
    const newTotalWidth = curTotalWidth - padding[1] - padding[3];
    const newAvgWidth = (curAvgWidth * newTotalWidth) / curTotalWidth;
    const newOffset = xAxis.getOffsetByRotateAngle(xAxis.getAutoRotateAngleByAvgWidth(newAvgWidth));

    if (newOffset > curOffset) {
      padding[2] += newOffset - curOffset;
    }
  }
}
