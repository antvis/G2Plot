import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { Label, DataItem } from '../../interface/config';
import { extractScale } from '../../util/scale';
import SpiderLabel from './component/label/spider-label';
import './component/label/outer-label';
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
}

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
      radius: 1,
      label: {
        visible: true,
        type: 'inner',
        autoRotate: false,
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
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    return _.deepMix({}, options, defaultOptions, props);
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
    /** 配置x-scale */
    scales[props.angleField] = {};
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.angleField], props.xAxis);
    }
    super.scale();
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
      const offsetBase = this.getDefaultLabelInnerOffset();
      labelConfig.offset = labelConfig.offset ? labelConfig.offset : offsetBase;
      // @ts-ignore
      labelConfig.labelLine = false;
    } else {
      // @ts-ignore
      labelConfig.labelLine = true;
    }

    // 此处做个 hack 操作, 防止g2 controller层找不到未注册的inner,outter,和spider Label
    let labelType = labelConfig.type;
    if (['inner', 'spider'].indexOf(labelType) !== -1) {
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

  protected getDefaultLabelInnerOffset() {
    let size = 0;
    const { width, height } = this;
    const { padding } = this.options;
    if (width < height) {
      size = width - padding[1] - padding[3];
    } else {
      size = height - padding[0] - padding[2];
    }
    const offset = Math.round((size / 8) * this.options.radius * -1);
    if (isNaN(offset) || offset === Infinity) {
      return 0;
    }
    return offset;
  }
}

registerPlotType('pie', PieLayer);
