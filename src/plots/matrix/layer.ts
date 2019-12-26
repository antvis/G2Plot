import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { registerShape } from '@antv/g2';
import MatrixLegend, { MatrixLegendConfig } from './component/legend';
import './component/label';
import './component/legend';

registerShape('polygon', 'rect', {
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const width = points[2].x - points[0].x;
    const height = points[0].y - points[1].y;
    const centerX = points[0].x + width / 2;
    const centerY = points[1].y + height / 2;
    const w = width * cfg.origin.size;
    const h = height * cfg.origin.size;
    const path = [
      ['M', centerX - w / 2, centerY + h / 2],
      ['L', centerX - w / 2, centerY - h / 2],
      ['L', centerX + w / 2, centerY - h / 2],
      ['L', centerX + w / 2, centerY + h / 2],
      ['Z'],
    ];
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
          visible: false,
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
        values: ['circle'],
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
}

registerPlotType('matrix', MatrixLayer);
