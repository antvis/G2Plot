import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import ViewLayer, { ViewLayerCfg } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractAxis } from '../../util/axis';
import { extractScale } from '../../util/scale';
import responsiveMethods from './apply-responsive';
import * as EventParser from './event';
import './theme';

interface AreaStyle {
  opacity?: number;
  lineDash?: number[];
  strokeStyle?: string;
  lineWidth?: number;
}

interface LineStyle {
  lineDash?: number[];
  stroke?: string;
}

interface PointStyle {
  fillStyle?: string;
  strokeStyle?: string;
}

const GEOM_MAP = {
  area: 'area',
  line: 'line',
  point: 'point',
};

export interface AreaLayerConfig extends ViewLayerCfg {
  areaStyle?: AreaStyle | ((...args: any) => AreaStyle);
  seriesField?: string;
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
  line?: {
    visible?: boolean;
    opacity?: number;
    color?: string;
    size?: number;
    style?: LineStyle;
  };
  point?: {
    visible?: boolean;
    opacity?: number;
    color?: string;
    size?: number;
    shape?: string;
    style?: PointStyle;
  };
  smooth?: boolean;
}

export default class AreaLayer<T extends AreaLayerConfig = AreaLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      smooth: false,
      line: {
        visible: true,
        size: 2,
        style: {
          opacity: 1,
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
    });
  }

  public line: any;
  public point: any;
  public area: any;
  public type: string = 'area';

  public beforeInit() {
    super.beforeInit();
    /** 响应式图形 */
    if (this.options.responsive && this.options.padding !== 'auto') {
      this.applyResponsive('preRender');
    }
  }

  public afterRender() {
    /** 响应式 */
    if (this.options.responsive && this.options.padding !== 'auto') {
      this.applyResponsive('afterRender');
    }
    super.afterRender();
  }

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
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    /** 配置y-scale */
    scales[props.yField] = {};
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {}

  protected axis() {
    const props = this.options;
    const axesConfig = { fields: {} };
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};

    if (props.xAxis.visible === false) {
      axesConfig.fields[props.xField] = false;
    } else {
      extractAxis(axesConfig.fields[props.xField], props.xAxis);
    }

    if (props.yAxis.visible === false) {
      axesConfig.fields[props.yField] = false;
    } else {
      extractAxis(axesConfig.fields[props.yField], props.yAxis);
    }
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  protected addGeometry() {
    const props = this.options;
    const area = getGeom('area', 'main', {
      plot: this,
    });
    this.area = area;

    if (props.label) {
      this.label();
    }
    this.adjustArea(area);
    this.setConfig('element', area);

    this.addLine();

    this.addPoint();
  }

  protected adjustArea(area: ElementOption) {
    return;
  }

  protected adjustLine(line: ElementOption) {
    return;
  }

  protected adjustPoint(point: ElementOption) {
    return;
  }

  protected addLine() {
    const props = this.options;
    const lineConfig = _.deepMix({}, props.line);
    if (lineConfig.visible) {
      const line = getGeom('line', 'guide', {
        type: 'line',
        plot: this,
        line: lineConfig,
      });
      this.adjustLine(line);
      this.setConfig('element', line);
      this.line = line;
    }
  }

  protected addPoint() {
    const props = this.options;
    const pointConfig = _.deepMix({}, props.point);
    if (pointConfig.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this.adjustPoint(point);
      this.setConfig('element', point);
      this.point = point;
    }
  }

  protected annotation() {}

  protected animation() {}

  protected label() {
    const props = this.options;
    const label = props.label as Label;

    if (label.visible === false) {
      if (this.line) {
        this.line.label = false;
      }
      this.area.label = false;
      return;
    }
    this.area.label = getComponent('label', {
      fields: [props.yField],
      plot: this,
    });
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as DataPointType;
      responsive.method(this);
    });
  }
}

registerPlotType('area', AreaLayer);
