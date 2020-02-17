import * as _ from '@antv/util';
import BBox from '../../util/bbox';
import { getScale } from '@antv/scale';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import MatrixLegend, { MatrixLegendConfig } from './component/legend';
import { getRectPath, getCirclePath, getCircleCurve } from './shape';
import MatrixLabel from './component/label';
import { getPlotComponents } from './component';
// import './component/label';

export interface MatrixViewConfig extends ViewConfig {
  forceSquare?: boolean;
  sizeField?: string;
  colorField?: string;
  shapeSize?: number[];
  shapeType?: string;
  color?: string[];
  legend?: MatrixLegendConfig;
}

export interface MatrixLayerConfig extends MatrixViewConfig, LayerConfig {}

export default class MatrixLayer<T extends MatrixLayerConfig = MatrixLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      forceSquare: false,
      shapeType: 'rect',
      legend: {
        visible: true,
        position: 'right-center',
      },
      tooltip: {
        shared: false,
        showCrosshairs: false,
        showMarkers: false,
      },
      xAxis: {
        visible: true,
        gridAlign: 'center',
        grid: {
          visible: true,
        },
        tickLine: {
          visible: true,
        },
        line: {
          visible: false,
        },
        autoRotateLabel: true,
      },
      yAxis: {
        visible: true,
        gridAlign: 'center',
        grid: {
          visible: true,
          align: 'center',
        },
        tickLine: {
          visible: true,
        },
        autoRotateLabel: true,
      },
      color: ['#9ae3d5', '#66cdbb', '#e7a744', '#f1e066', '#f27664', '#e7c1a2'],
      label: {
        visible: true,
        adjustColor: true,
        adjustPosition: true,
        offset: 0,
        style: {
          stroke: 'rgba(255,255,255,0)',
          lineWidth: 0,
        },
      },
    });
  }

  public type: string = 'matrix';
  protected gridSize: number[] = [];
  protected plotComponents: any[] = [];

  public afterInit() {
    super.afterInit();
    if (this.options.forceSquare) {
      const panelRange = this.view.coordinateBBox;
      const { xField, yField, data } = this.options;
      const xCount = _.valuesOfKey(data, xField).length;
      const yCount = _.valuesOfKey(data, yField).length;
      const rangeSize = Math.min(panelRange.width, panelRange.height);
      const count = Math.max(xCount, yCount);
      const gridSize = rangeSize / count;
      const width = gridSize * xCount;
      const height = gridSize * yCount;
      this.view.coordinateBBox = new BBox(panelRange.x, panelRange.y, width, height) as any;
    }
  }

  public afterRender() {
    this.renderPlotComponents();
    super.afterRender();
  }

  public changeShape(type: string) {
    if (this.options.shapeType === type) {
      return;
    }
    this.options.shapeType = type;
    if (type === 'rect') {
      const shapes = this.getShapes();
      this.circleToRect(shapes);
    } else if (type === 'circle') {
      const shapes = this.getShapes();
      this.rectToCircle(shapes);
    }
  }

  public mappingSize(field: string) {
    if (this.options.sizeField && this.options.sizeField === field) {
      return;
    }
    this.options.sizeField = field;
    // 创建scale
    const values = _.valuesOfKey(this.options.data, field);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const LinearScale = getScale('linear');
    const scale = new LinearScale({
      min,
      max,
    });
    const shapes = this.getShapes();
    if (this.options.shapeType === 'rect') {
      this.rectSizeMapping(shapes, scale, field);
    } else if (this.options.shapeType === 'circle') {
      this.circleSizeMapping(shapes, scale, field);
    }
  }

  public disableMappingSize() {
    const shapes = this.getShapes();
    if (this.options.shapeType === 'rect') {
      this.rectDisableSizeMapping(shapes);
    } else if (this.options.shapeType === 'circle') {
      this.circleDisableSizeMapping(shapes);
    }
  }

  protected geometryParser() {
    return '';
  }

  protected coord() {}

  protected legend() {
    this.setConfig('legends', false);
  }

  protected addGeometry() {
    this.gridSize = this.getGridSize();
    if (this.options.shapeType === 'rect') {
      const rect = this.addRect();
      this.setConfig('geometry', rect);
    } else {
      const circle = this.addCircle();
      this.setConfig('geometry', circle);
    }
  }

  protected addRect() {
    // 如果用户设置了size，将size数值转换为[0,1]区间
    const size = [0.3, 0.9];
    if (this.options.shapeSize) {
      size[0] = this.options.shapeSize[0] / this.gridSize[0];
      size[1] = this.options.shapeSize[1] / this.gridSize[1];
    }
    const rect: any = {
      type: 'polygon',
      position: {
        fields: [this.options.xField, this.options.yField],
      },
      color: {
        fields: [this.options.colorField],
        values: this.options.color,
      },
      shape: {
        values: ['rect'],
      },
      label: false,
    };
    if (this.options.sizeField) {
      rect.size = {
        fields: [this.options.sizeField],
        values: size,
      };
    } else {
      rect.size = {
        values: [1],
      };
    }
    return rect;
  }

  protected addCircle() {
    let size = [0.3, 0.9];
    if (this.options.shapeSize) {
      size = this.options.shapeSize;
    } else {
      size[0] = this.gridSize[0] * size[0] * 0.5;
      size[1] = this.gridSize[1] * size[1] * 0.5;
    }
    const circle: any = {
      type: 'point',
      position: {
        fields: [this.options.xField, this.options.yField],
      },
      color: {
        fields: [this.options.colorField],
        values: this.options.color,
      },
      shape: {
        values: ['curvePoint'],
      },
      label: false,
    };
    if (this.options.sizeField) {
      circle.size = {
        fields: [this.options.sizeField],
        values: size,
      };
    } else {
      circle.size = {
        values: [Math.min(this.gridSize[0], this.gridSize[1]) * 0.5 * 0.9],
      };
    }
    return circle;
  }

  private getGridSize() {
    if (this.options.padding === 'auto') {
      return [0, 0];
    } else {
      const viewRange = this.getViewRange();
      const { padding, xField, yField, data } = this.options;
      const width = viewRange.width - padding[1] - padding[3];
      const height = viewRange.height - padding[0] - padding[2];
      const xCount = _.valuesOfKey(data, xField).length;
      const yCount = _.valuesOfKey(data, yField).length;
      return [width / xCount, height / yCount];
    }
  }

  private circleToRect(shapes) {
    const gridSize = this.gridSize;
    _.each(shapes, (shape) => {
      const { x, y, size } = shape.get('origin');
      let sizeRatio = (size * 2) / Math.min(gridSize[0], gridSize[1]);
      if (!this.options.sizeField) {
        sizeRatio = 1;
      }
      const curvePath = getCircleCurve(x, y, size);
      const rectPath = getRectPath(x, y, gridSize[0], gridSize[1], sizeRatio);
      shape.stopAnimate();
      shape.attr('path', curvePath);
      shape.animate(
        {
          path: rectPath,
        },
        500,
        'easeLinear'
      );
    });
  }

  private rectToCircle(shapes) {
    _.each(shapes, (shape) => {
      const coord = shape.get('coord');
      const { points } = shape.get('origin');
      const ps = [];
      _.each(points, (p) => {
        ps.push(coord.convertPoint(p));
      });
      const bbox = shape.getBBox();
      const width = bbox.width;
      const height = bbox.height;
      const centerX = bbox.minX + width / 2;
      const centerY = bbox.minY + height / 2;
      const offsetRatio = this.options.sizeField ? 1 : 0.9;
      const curvePath = getCircleCurve(centerX, centerY, (Math.min(width, height) / 2) * offsetRatio);
      const circlePath = getCirclePath(centerX, centerY, (Math.min(width, height) / 2) * offsetRatio);
      shape.stopAnimate();
      shape.animate(
        {
          path: curvePath,
        },
        500,
        'easeLinear',
        () => {
          shape.attr('path', circlePath);
        }
      );
    });
  }

  private rectSizeMapping(shapes, scale, field) {
    _.each(shapes, (shape) => {
      const data = shape.get('origin').data;
      const ratio = 0.3 + scale.scale(data[field]) * 0.6;
      shape.get('origin').size = ratio;
      const bbox = shape.getBBox();
      const width = bbox.width;
      const height = bbox.height;
      const centerX = bbox.minX + width / 2;
      const centerY = bbox.minY + height / 2;
      const path = getRectPath(centerX, centerY, width, height, ratio);
      shape.stopAnimate();
      shape.animate(
        {
          path: path,
        },
        500,
        'easeLinear'
      );
    });
  }

  private circleSizeMapping(shapes, scale, field) {
    _.each(shapes, (shape) => {
      const data = shape.get('origin').data;
      const ratio = 0.3 + scale.scale(data[field]) * 0.6;
      const { x, y, size } = shape.get('origin');
      const path = getCirclePath(x, y, size * ratio);
      shape.get('origin').size = size * ratio;
      shape.stopAnimate();
      shape.animate(
        {
          path: path,
        },
        500,
        'easeLinear'
      );
    });
  }

  private circleDisableSizeMapping(shapes) {
    this.options.sizeField = null;
    _.each(shapes, (shape) => {
      const { x, y } = shape.get('origin');
      const size = Math.min(this.gridSize[0], this.gridSize[1]) * 0.9;
      shape.get('origin').size = size / 2;
      const path = getCirclePath(x, y, size / 2);
      shape.stopAnimate();
      shape.animate(
        {
          path: path,
        },
        500,
        'easeLinear'
      );
    });
  }

  private rectDisableSizeMapping(shapes) {
    this.options.sizeField = null;
    _.each(shapes, (shape) => {
      const bbox = shape.getBBox();
      const width = bbox.width;
      const height = bbox.height;
      const centerX = bbox.minX + width / 2;
      const centerY = bbox.minY + height / 2;
      const path = getRectPath(centerX, centerY, this.gridSize[0], this.gridSize[1], 1);
      shape.get('origin').size = 1;
      shape.stopAnimate();
      shape.animate(
        {
          path: path,
        },
        500,
        'easeLinear'
      );
    });
  }

  private getShapes() {
    const elements = this.view.geometries[0].elements;
    const shapes = [];
    _.each(elements, (ele) => {
      shapes.push(ele.shape);
    });
    return shapes;
  }

  protected renderPlotComponents() {
    const componentsType = ['label', 'legend'];
    _.each(componentsType, (t) => {
      const cfg = {
        view: this.view,
        plot: this,
        ...this.options[t],
      };
      const component = getPlotComponents(this, t, cfg);
      if (component) {
        component.render();
        this.plotComponents.push(component);
      }
    });
  }
}

registerPlotType('matrix', MatrixLayer);
