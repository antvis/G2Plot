import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { Label, DataItem } from '../../interface/config';
import { LooseMap } from '../../interface/types';
import SpiderLabel from './component/label/spider-label';
import './component/label/outer-label';
import './component/label/inner-label';
import './component/label/outer-center-label';
import * as EventParser from './event';
import './theme';
import { LineStyle } from '../line/layer';

interface PieStyle extends LineStyle {
  stroke?: string;
  lineWidth?: number;
}

export interface PieViewConfig extends ViewConfig {
  angleField: string;
  colorField?: string;
  radius?: number;
  pieStyle?: PieStyle | ((...args: any[]) => PieStyle);
  label?: PieLabel;
}

type PieLabel = Omit<ViewConfig['label'], 'offset'> & {
  offset?: string | number;
  /** label leader-line */
  line?: {
    smooth?: boolean;
  };
  /** allow label overlap */
  allowOverlap?: boolean;
  readonly fields?: string[];
};

export interface PieLayerConfig extends PieViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  pie: 'interval',
};

const PLOT_GEOM_MAP = {
  pie: 'column',
};

export default class PieLayer<T extends PieLayerConfig = PieLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      width: 400,
      height: 400,
      title: {
        visible: false,
      },
      description: {
        visible: false,
      },
      forceFit: true,
      padding: 'auto',
      radius: 0.8,
      label: {
        visible: true,
        type: 'inner',
        autoRotate: false,
        allowOverlap: false,
        line: {
          smooth: true,
        },
      },
      legend: {
        visible: true,
        position: 'right-center',
      },
      tooltip: {
        visible: true,
        shared: false,
        crosshairs: null,
      },
      pieStyle: {
        stroke: 'white',
        lineWidth: 1,
      },
    });
  }

  public pie: any;
  public spiderLabel: any;
  public type: string = 'pie';

  public getOptions(props: T) {
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    const options = _.deepMix({}, super.getOptions(props), defaultOptions, props);
    options.label = this.adjustLabelDefaultOptions(options);
    return options;
  }

  public afterInit() {
    super.afterInit();
    const props = this.options;
    /** 蜘蛛布局label */
    if (props.label && props.label.visible) {
      const labelConfig = props.label as Label;
      if (labelConfig.type === 'spider') {
        const spiderLabel = new SpiderLabel({
          view: this.view,
          fields: props.colorField ? [props.angleField, props.colorField] : [props.angleField],
          style: labelConfig.style ? labelConfig.style : {},
          formatter: props.label.formatter ? props.label.formatter : false,
          offsetX: props.label.offsetX,
          offsetY: props.label.offsetY,
        });
        this.spiderLabel = spiderLabel;
      }
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    scales[props.angleField] = {};
    scales[props.colorField] = { type: 'cat' };
    this.setConfig('scales', scales);
  }

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const key = this.options.angleField;
    return data.map((item) => ({
      ...item,
      [key]: typeof item[key] === 'string' ? Number.parseFloat(item[key] as 'string') : item[key],
    }));
  }

  protected axis() {}

  protected coord() {
    const props = this.options;
    const coordConfig = {
      type: 'theta' as CoordinateType,
      cfg: {
        radius: props.radius,
        // @ts-ignore 业务定制,不开放配置
        innerRadius: props.innerRadius || 0,
      },
    };
    this.setConfig('coord', coordConfig);
  }

  protected addGeometry() {
    const props = this.options;
    const pie = getGeom('interval', 'main', {
      plot: this,
      positionFields: [props.angleField],
    });
    pie.adjust = [{ type: 'stack' }];
    this.pie = pie;
    if (props.label) {
      this.label();
    }
    this.setConfig('element', pie);
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.pie.animate = false;
    }
  }

  protected annotation() {}

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private label() {
    const props = this.options;
    const labelConfig = { ...props.label } as Label;
    if (!this.showLabel()) {
      this.pie.label = false;
      return;
    }
    if (labelConfig.type === 'inner') {
      // @ts-ignore
      labelConfig.labelLine = false;
    } else {
      // @ts-ignore
      labelConfig.labelLine = true;
    }

    // 此处做个 hack 操作, 防止g2 controller层找不到未注册的inner,outter,和spider Label
    let labelType = labelConfig.type;
    if (['spider'].indexOf(labelType) !== -1) {
      labelType = null;
    }
    this.pie.label = getComponent('label', {
      plot: this,
      labelType,
      fields: props.colorField ? [props.angleField, props.colorField] : [props.angleField],
      ...labelConfig,
    });
  }

  private showLabel() {
    const props = this.options;
    return props.label && props.label.visible === true && props.label.type !== 'spider';
  }

  /** 调整 label 默认 options */
  protected adjustLabelDefaultOptions(options: PieLayerConfig) {
    const labelConfig = { ...options.label } as PieLabel;
    if (labelConfig && labelConfig.type === 'inner') {
      const labelStyleConfig = (labelConfig.style || {}) as LooseMap;
      if (!labelStyleConfig.textAlign) {
        labelStyleConfig.textAlign = 'center';
      }
      labelConfig.style = labelStyleConfig;
      if (!labelConfig.offset) {
        labelConfig.offset = `${(-1 / 3) * 100}%`;
      }
    }
    return labelConfig;
  }
}

registerPlotType('pie', PieLayer);
