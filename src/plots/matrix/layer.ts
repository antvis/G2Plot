import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ICatAxis, ITimeAxis, IValueAxis } from '../../interface/config';
import { extractScale } from '../../util/scale';
import { getComponent } from '../../components/factory';
import '../../geoms/rect/geometry';
import { registerShape } from '@antv/g2';

registerShape('polygon', 'aa', {
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
      },
    });
  },
});

export interface MatrixViewConfig extends ViewConfig {
  forceSquare?: boolean;
  sizeField?: string;
  shapeSize?: number[];
  shapeType?: string;
}

export interface MatrixLayerConfig extends MatrixViewConfig, LayerConfig {}

export default class MatrixLayer<T extends MatrixLayerConfig = MatrixLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      forceSquare: false,
      shapeType: 'rect',
      legend: {
        visible: false,
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
      },
      yAxis: {
        visible: true,
        gridAlign: 'center',
        grid: {
          visible: true,
          align: 'center',
        },
      },
    });
  }

  public type: string = 'matrix';

  protected geometryParser() {
    return '';
  }

  protected coord() {}

  protected addGeometry() {
    const rect = this.addRect();
    this.setConfig('element', rect);
  }

  protected addRect() {
    const rect = {
      type: 'polygon',
      position: {
        fields: [this.options.xField, this.options.yField],
      },
      color: {
        fields: [this.options.sizeField],
        values: ['#e7c1a2', '#f27664', '#f1e066', '#e7a744', '#66cdbb', '#9ae3d5'],
      },
      /*shape: {
        values: ['aa']
      },
      size: {
        fields: [this.options.sizeField],
        values: [0.3,1]
      }*/
    };
    return rect;
  }

  protected addCircle() {}
}

registerPlotType('matrix', MatrixLayer);
