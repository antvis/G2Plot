import { IElement } from '@antv/g-canvas';
import { View } from '@antv/g2';
import { filter, each, isArray, clone } from '@antv/util';
import ViewLayer from '../view-layer';
import { MarginPadding } from '../../interface/types';
import BBox from '../../util/bbox';
import { getAxisShapes, getLegendShapes } from '../../util/common';

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

  public registerPadding(component: any, type: 'outer' | 'inner' = 'outer', checkIfExist: boolean = false) {
    if (type === 'inner') {
      if (checkIfExist) {
        if (!this.innerPaddingComponents.find((c) => c == component)) {
          this.innerPaddingComponents.push(component);
        }
      } else {
        this.innerPaddingComponents.push(component);
      }
    } else {
      if (checkIfExist) {
        if (!this.outerPaddingComponents.find((c) => c == component)) {
          this.outerPaddingComponents.push(component);
        }
      } else {
        this.outerPaddingComponents.push(component);
      }
    }
  }

  /**
   * 清除已经注册的元素
   */
  public clear() {
    this.innerPaddingComponents = [];
    // 一些组件是在view渲染完成之后渲染初始化的
    // TODO: afterRender的什么时候清除
    this.outerPaddingComponents = filter(this.outerPaddingComponents, (component) => component.afterRender);
  }

  public clearOuterComponents() {
    each(this.outerPaddingComponents, (component) => {
      if (component.afterRender) {
        component.destroy();
      }
    });
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

  public processOuterPadding() {
    if (!this.plot.layerBBox) {
      this.plot.layerBBox = new BBox(this.plot.x, this.plot.y, this.plot.width, this.plot.height);
    }
    let viewMinX = this.plot.layerBBox.minX;
    let viewMaxX = this.plot.layerBBox.maxX;
    let viewMinY = this.plot.layerBBox.minY;
    let viewMaxY = this.plot.layerBBox.maxY;
    each(this.outerPaddingComponents, (component) => {
      const { position } = component;
      const { minX, maxX, minY, maxY } = component.getBBox();
      if (maxY >= viewMinY && maxY <= viewMaxY && position === 'top') {
        viewMinY = maxY;
      }
      if (minY >= viewMinY && minY <= viewMaxY && position === 'bottom') {
        viewMaxY = minY;
      }
      if (maxX > viewMinX && maxX <= viewMaxX && position === 'left') {
        viewMinX = maxX;
      }
      if (minX >= viewMinX && maxX <= viewMaxX && position === 'right') {
        viewMaxX = minX;
      }
    });
    return new BBox(viewMinX, viewMinY, viewMaxX - viewMinX, viewMaxY - viewMinY);
  }

  private _getInnerAutoPadding() {
    const props = this.plot.options;
    const view = this.plot.view;
    const viewRange: any = clone(view.viewBBox);
    const { minX, maxX, minY, maxY } = viewRange;
    const bleeding = this.plot.config.theme.bleeding;
    if (isArray(bleeding)) {
      each(bleeding, (it, index) => {
        if (typeof bleeding[index] === 'function') {
          bleeding[index] = bleeding[index](props);
        }
      });
    }
    this.plot.config.theme.legend.margin = bleeding;
    this.bleeding = clone(bleeding);
    // 参与auto padding的components: axis legend
    const components_bbox = [new BBox(0, 0, viewRange.width, viewRange.height)];
    this._getAxis(view, components_bbox);
    let box = this._mergeBBox(components_bbox);
    this._getLegend(view, components_bbox, viewRange, this.plot.options);
    box = this._mergeBBox(components_bbox);
    // 参与auto padding的自定义组件
    const components = this.innerPaddingComponents;
    each(components, (obj) => {
      const component = obj;
      const bbox = component.getBBox();
      components_bbox.push(bbox);
    });
    box = this._mergeBBox(components_bbox);
    /** 极坐标下padding计算错误问题 */
    const padding: MarginPadding = [
      0 - box.minY + this.bleeding[0], // 上面超出的部分
      box.maxX - maxX + this.bleeding[1], // 右边超出的部分
      box.maxY - maxY + this.bleeding[2], // 下边超出的部分
      0 - box.minX + this.bleeding[3],
    ];
    //this.adjustAxisPadding(view, padding);
    // label、annotation等
    /*const panelPadding = this._getPanel(view, box);
    padding[0] += panelPadding[0];
    padding[1] += panelPadding[1];
    padding[2] += panelPadding[2];
    padding[3] += panelPadding[3];*/

    return padding;
  }

  private _getAxis(view, bboxes) {
    const axisShapes = getAxisShapes(view);
    if (axisShapes.length > 0) {
      each(axisShapes, (a) => {
        const bbox = a.getBBox();
        bboxes.push(bbox);
      });
    }
  }

  private _getLegend(view, bboxes, viewRange, options) {
    const legendContainer = getLegendShapes(view)[0];
    if (legendContainer) {
      const bbox = legendContainer.getBBox();
      if (options.legend) {
        const position = options.legend.position.split('-')[0];
        if (position === 'top') {
          bboxes.push(new BBox(bbox.minX, -bbox.height, bbox.width, bbox.height));
        } else if (position === 'bottom') {
          bboxes.push(new BBox(bbox.minX, bbox.maxX + viewRange.height, bbox.width, bbox.height));
        } else if (position === 'left') {
          bboxes.push(new BBox(bbox.minX - bbox.width, bbox.minY, bbox.width, bbox.height));
        } else {
          bboxes.push(new BBox(viewRange.maxX + bbox.maxX, bbox.minY, bbox.width, bbox.height));
        }
      }
    }
  }

  private _getPanel(view, box) {
    const groups = [];
    const geoms = view.get('elements');
    each(geoms, (geom) => {
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
    each(groups, (group) => {
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
    const panelRange = view.coordinateBBox;
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

    each(bboxes, (bbox) => {
      const box = bbox;
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
    const { width, height, maxX, minX, maxY, minY } = view.viewBBox;
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

  /* private adjustAxisPadding(view: View, padding: MarginPadding) {
    // 3.6.x Axis组件的 autoRotate padding 修正
    const xAxis = view.get('axisController').axes[0];
    if (!xAxis || !xAxis.get('autoRotateLabel') || !xAxis.getOffsetByRotateAngle) {
      return;
    }
    const labelRenderer = xAxis.get('labelRenderer');
    const labels = labelRenderer.getLabels();
    const curOffset = xAxis.getOffsetByRotateAngle(xAxis.get('autoRotateAngle'));
    const curTotalWidth = Math.abs(xAxis.get('end').x - xAxis.get('start').x);
    // 如果只有一项数据, 平均宽度 = 总宽
    let curAvgWidth = curTotalWidth;
    // 当多项数据时，根据 label 位置计算均宽
    if (labels.length > 1) {
      curAvgWidth = Math.abs(labels[1].attr('x') - labels[0].attr('x'));
    }
    const newTotalWidth = curTotalWidth - padding[1] - padding[3];
    const newAvgWidth = (curAvgWidth * newTotalWidth) / curTotalWidth;
    const newOffset = xAxis.getOffsetByRotateAngle(xAxis.getAutoRotateAngleByAvgWidth(newAvgWidth));

    if (newOffset > curOffset) {
      padding[2] += newOffset - curOffset;
    }
  }*/
}
