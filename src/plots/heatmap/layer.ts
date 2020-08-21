import { deepMix, valuesOfKey, each, isObject, isFunction } from '@antv/util';
import { getScale } from '@antv/scale';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { MatrixLegendConfig } from './component/legend';
import { getRectPath, getCirclePath, getCircleCurve } from './shape';
import { getPlotComponents } from './component';
import { GraphicStyle } from '../../interface/config';

export interface HeatmapViewConfig extends ViewConfig {
  sizeField?: string;
  colorField?: string;
  shapeSize?: number[];
  shapeType?: string;
  shapeStyle?: GraphicStyle;
  color?: string[];
  legend?: MatrixLegendConfig;
}

export interface HeatmapLayerConfig extends HeatmapViewConfig, LayerConfig {}

export default class HeatmapLayer<T extends HeatmapLayerConfig = HeatmapLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
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
        label: {
          visible: true,
          autoHide: true,
          autoRotate: true,
        },
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
        label: {
          autoHide: true,
          autoRotate: false,
        },
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
      interactions: [{ type: 'tooltip' }],
    });
  }

  public type: string = 'heatmap';
  protected gridSize: number[] = [];
  protected plotComponents: any[] = [];

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
      const shapes = this.getShape();
      this.circleToRect(shapes);
    } else if (type === 'circle') {
      const shapes = this.getShape();
      this.rectToCircle(shapes);
    }
  }

  public mappingSize(field: string) {
    if (this.options.sizeField && this.options.sizeField === field) {
      return;
    }
    this.options.sizeField = field;
    // 创建scale
    const values = valuesOfKey(this.options.data, field);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const LinearScale = getScale('linear');
    const scale = new LinearScale({
      min,
      max,
    });
    const shapes = this.getShape();
    if (this.options.shapeType === 'rect') {
      this.rectSizeMapping(shapes, scale, field);
    } else if (this.options.shapeType === 'circle') {
      this.circleSizeMapping(shapes, scale, field);
    }
  }

  public disableMappingSize() {
    const shapes = this.getShape();
    if (this.options.shapeType === 'rect') {
      this.rectDisableSizeMapping(shapes);
    } else if (this.options.shapeType === 'circle') {
      this.circleDisableSizeMapping(shapes);
    }
  }

  public destroy() {
    each(this.plotComponents, (component) => {
      component.destroy();
    });
    super.destroy();
  }

  public getSizeScale() {
    const { sizeField } = this.options;
    if (sizeField) {
      this.view.getScaleByField(sizeField);
    }
  }

  protected geometryParser() {
    return '';
  }

  protected coord() {
    return;
  }

  protected legend() {
    this.setConfig('legends', false);
  }

  protected addGeometry() {
    this.gridSize = this.getGridSize();
    let geomConfig;
    if (this.options.shapeType === 'rect') {
      geomConfig = this.addRect();
    } else {
      const circle = this.addCircle();
      geomConfig = circle;
    }
    if (this.options.shapeStyle) {
      const styleConfig: any = {};
      if (isFunction(this.options.shapeStyle)) {
        styleConfig.fields = [
          this.options.colorField,
          this.options.xField,
          this.options.yField,
          this.options.sizeField,
        ];
        styleConfig.callback = this.options.shapeStyle;
      } else if (isObject(this.options.shapeStyle)) {
        styleConfig.cfg = this.options.shapeStyle;
      }
      geomConfig.style = styleConfig;
    }
    if (this.options.tooltip && (this.options.tooltip.fields || this.options.tooltip.formatter)) {
      this.geometryTooltip(geomConfig);
    }

    this.setConfig('geometry', geomConfig);
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

  protected geometryTooltip(config) {
    config.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      config.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      config.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        config.tooltip.fields = [this.options.xField, this.options.yField];
        if (this.options.colorField) {
          config.tooltip.fields.push(this.options.colorField);
        }
      }
    }
  }

  private getGridSize() {
    if (this.options.padding === 'auto') {
      return [0, 0];
    } else {
      const viewRange = this.getViewRange();
      const { padding, xField, yField, data } = this.options;
      const width = viewRange.width - padding[1] - padding[3];
      const height = viewRange.height - padding[0] - padding[2];
      const xCount = valuesOfKey(data, xField).length;
      const yCount = valuesOfKey(data, yField).length;
      return [width / xCount, height / yCount];
    }
  }

  private circleToRect(shapes) {
    const gridSize = this.gridSize;
    each(shapes, (shape) => {
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
    each(shapes, (shape) => {
      const coord = shape.get('coord');
      const { points } = shape.get('origin');
      const ps = [];
      each(points, (p) => {
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
    each(shapes, (shape) => {
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
    each(shapes, (shape) => {
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
    each(shapes, (shape) => {
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
    each(shapes, (shape) => {
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

  private getShape() {
    const elements = this.view.geometries[0].elements;
    const shapes = [];
    each(elements, (ele) => {
      shapes.push(ele.shape);
    });
    return shapes;
  }

  protected renderPlotComponents() {
    each(this.plotComponents, (component) => {
      component.destroy();
    });
    this.plotComponents = [];
    const componentsType = ['label', 'legend'];
    each(componentsType, (t) => {
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

registerPlotType('heatmap', HeatmapLayer);
