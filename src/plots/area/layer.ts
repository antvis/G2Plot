import { deepMix, has } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ElementOption } from '../../interface/config';
import './component/label/area-point';
import './component/label/area-point-auto';
import { extractScale } from '../../util/scale';
import * as EventParser from './event';
import './theme';
import { getGeometryByType } from '../../util/view';
import { AreaViewConfig } from './interface';
import { Maybe } from '../../interface/types';

const GEOM_MAP = {
  area: 'area',
  line: 'line',
  point: 'point',
};

export interface AreaLayerConfig extends AreaViewConfig, LayerConfig {}

export default class AreaLayer<T extends AreaLayerConfig = AreaLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      smooth: false,
      areaStyle: {
        opacity: 0.25,
      },
      line: {
        visible: true,
        size: 2,
        style: {
          opacity: 1,
          lineJoin: 'round',
          lineCap: 'round',
        },
      },
      point: {
        visible: false,
        size: 4,
        shape: 'point',
      },
      label: {
        visible: false,
        type: 'point',
      },
      legend: {
        visible: true,
        position: 'top-left',
        wordSpacing: 4,
      },
      tooltip: {
        visible: true,
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'x',
        },
        offset: 20,
      },
    });
  }

  public line: any;
  public point: any;
  public area: any;
  public type: string = 'area';

  protected geometryParser(dim, type) {
    return GEOM_MAP[type];
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    /** 配置x-scale */
    scales[props.xField] = {
      type: 'cat',
    };
    if (has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    /** 配置y-scale */
    scales[props.yField] = {};
    if (has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {
    return null;
  }

  protected addGeometry() {
    const props: any = this.options;
    const area = getGeom('area', 'main', {
      plot: this,
    });
    this.area = area;

    if (props.label) {
      this.label();
    }

    if (props.tooltip && (props.tooltip.fields || props.tooltip.formatter)) {
      this.geometryTooltip();
    }

    this.adjustArea(area);
    this.setConfig('geometry', area);

    this.addLine();

    this.addPoint();
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected adjustArea(area: ElementOption) {
    return;
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected adjustLine(line?: ElementOption) {
    return;
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected adjustPoint(point?: ElementOption) {
    return;
  }

  protected addLine() {
    const props: any = this.options;
    const lineConfig = deepMix({}, props.line);
    if (lineConfig.visible) {
      const line = getGeom('line', 'guide', {
        type: 'line',
        plot: this,
        line: lineConfig,
      });
      this.adjustLine(line);
      this.setConfig('geometry', line);
      this.line = line;
    }
  }

  protected addPoint() {
    const props = this.options;
    const pointConfig = deepMix({}, props.point);
    if (pointConfig.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this.adjustPoint(point);
      this.setConfig('geometry', point);
      this.point = point;
    }
  }

  protected renderLabel() {
    const { scales } = this.config;
    const { label, yField } = this.options;
    const scale = scales[yField];
    if (label.visible) {
      const geometry = getGeometryByType(this.view, 'area');
      this.doRenderLabel(geometry, {
        type: 'area-point',
        formatter: scale.formatter && ((value: Maybe<string | number>) => scale.formatter(value)),
        ...this.options.label,
      });
    }
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      // 关闭动画
      this.area.animate = false;
      if (this.line) this.line.animate = false;
      if (this.point) this.point.animate = false;
    }
  }

  protected label() {
    return;
  }

  protected geometryTooltip() {
    this.area.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.area.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.area.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.area.tooltip.fields = [this.options.xField, this.options.yField];
        if (this.options.seriesField) {
          this.area.tooltip.fields.push(this.options.seriesField);
        }
      }
    }
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }
}

registerPlotType('area', AreaLayer);
