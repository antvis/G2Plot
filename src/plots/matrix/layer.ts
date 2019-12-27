import * as _ from '@antv/util';
import { BBox } from '@antv/g';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { registerShape } from '@antv/g2';
import MatrixLegend, { MatrixLegendConfig } from './component/legend';
import './component/label';
import './component/legend';

function getRectPath(cx, cy, width, height, size) {
  const w = width * size;
  const h = height * size;
  const path = [
    ['M', cx - w / 2, cy + h / 2],
    ['Q', cx - w / 2, cy, cx - w / 2, cy - h / 2],
    ['Q', cx, cy - h / 2, cx + w / 2, cy - h / 2],
    ['Q', cx + w / 2, cy, cx + w / 2, cy + h / 2],
    ['Q', cx, cy + h / 2, cx - w / 2, cy + h / 2],
    ['Z'],
  ];
  return path;
}

function getCirclePath(x, y, size) {
  const path = [
    ['M', x, y],
    ['m', -size, 0],
    ['a', size, size, 0, 1, 0, size * 2, 0],
    ['a', size, size, 0, 1, 0, -(size * 2), 0],
    ['Z'],
  ];
  return path;
}

function getCircleCurve(x, y, size) {
  // 计算四个角和中点
  const path = [
    ['M', x - size, y],
    ['Q', x - size, y - size, x, y - size],
    ['Q', x + size, y - size, x + size, y],
    ['Q', x + size, y + size, x, y + size],
    ['Q', x - size, y + size, x - size, y],
    ['Z'],
  ];
  return path;
}

registerShape('polygon', 'rect', {
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const width = points[2].x - points[0].x;
    const height = points[0].y - points[1].y;
    const centerX = points[0].x + width / 2;
    const centerY = points[1].y + height / 2;
    /*
    const path = [
      ['M', centerX - w / 2, centerY + h / 2],
      ['L', centerX - w / 2, centerY - h / 2],
      ['L', centerX + w / 2, centerY - h / 2],
      ['L', centerX + w / 2, centerY + h / 2],
      ['Z'],
    ];
    */
    const path = getRectPath(centerX, centerY, width, height, cfg.origin.size);
    return container.addShape('path', {
      attrs: {
        path,
        fill: cfg.color,
        opacity: 1,
      },
    });
  },
});

registerShape('point', 'curvePoint', {
  draw(cfg, container) {
    const path = getCirclePath(cfg.x, cfg.y, cfg.size);
    return container.addShape('path', {
      attrs: {
        path,
        fill: cfg.color,
        opacity: 1,
      },
    });
  },
});

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
        crosshairs: false,
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
  protected matrixLegend: MatrixLegend;

  public afterInit() {
    super.afterInit();
    if (this.options.forceSquare) {
      const panelRange = this.view.get('panelRange');
      const { xField, yField, data } = this.options;
      const xCount = _.valuesOfKey(data, xField).length;
      const yCount = _.valuesOfKey(data, yField).length;
      const rangeSize = Math.min(panelRange.width, panelRange.height);
      const count = Math.max(xCount, yCount);
      const gridSize = rangeSize / count;
      const width = gridSize * xCount;
      const height = gridSize * yCount;
      this.view.set('panelRange', new BBox(panelRange.x, panelRange.y, width, height));
    }
  }

  public afterRender() {
    if (this.options.legend && this.options.legend.visible) {
      if (this.matrixLegend) {
        this.matrixLegend.destroy();
      }
      this.matrixLegend = new MatrixLegend({
        view: this.view,
        plot: this,
        ...this.options.legend,
      });
      this.matrixLegend.render();
      this.paddingController.registerPadding(this.matrixLegend, 'outer');
    }
    super.afterRender();
  }

  public changeShape(type: string) {
    if (this.options.shapeType === type) {
      return;
    }
    if (type === 'rect') {
      const geom = this.view.get('elements')[0];
      const shapes = geom.getShapes();
      this.circleToRect(shapes);
    } else if (type === 'circle') {
      const geom = this.view.get('elements')[0];
      const shapes = geom.getShapes();
      this.rectToCircle(shapes);
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
      this.setConfig('element', rect);
    } else {
      const circle = this.addCircle();
      this.setConfig('element', circle);
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
      label: this.extractLabel(),
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
      label: this.extractLabel(),
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

  protected extractLabel() {
    const labelOptions = this.options.label;
    // 不显示label的情况
    if (!labelOptions.visible) {
      return false;
    }
    if (!this.options.sizeField && !this.options.colorField) {
      return false;
    }

    const label = getComponent('label', {
      plot: this,
      top: true,
      labelType: 'matrixLabel',
      fields: this.options.colorField ? [this.options.colorField] : [this.options.sizeField],
      ...labelOptions,
    });
    return label;
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
    const gridSize = this.gridSize;
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
}

registerPlotType('matrix', MatrixLayer);
