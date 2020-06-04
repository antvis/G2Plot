import { deepMix, has, each, clone } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ElementOption } from '../../interface/config';
import ConversionTag from '../../components/conversion-tag';
import { extractScale } from '../../util/scale';
import './apply-responsive/theme';
import './component/label';
import './component/label-auto';
import * as EventParser from './event';
import './theme';
import { DataItem } from '../../interface/config';
import { getGeometryByType } from '../../util/view';
import { ColumnViewConfig } from './interface';
import { Maybe } from '../../interface/types';

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'column',
};

export interface ColumnLayerConfig extends ColumnViewConfig, LayerConfig {}

export default class BaseColumnLayer<T extends ColumnLayerConfig = ColumnLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        tickLine: {
          visible: false,
        },
        title: {
          visible: true,
        },
      },
      yAxis: {
        nice: true,
        title: {
          visible: true,
        },
        label: {
          visible: true,
        },
        grid: {
          visible: true,
        },
      },
      tooltip: {
        visible: true,
        shared: true,
        showCrosshairs: false,
        showMarkers: false,
      },
      label: {
        visible: false,
        position: 'top',
        adjustColor: true,
      },
      legend: {
        visible: true,
        position: 'top-left',
      },
      interactions: [
        { type: 'tooltip' },
        { type: 'active-region' },
        { type: 'legend-active' },
        { type: 'legend-filter' },
      ],
      conversionTag: {
        visible: false,
      },
    });
  }
  public column: any;
  public type: string = 'column';
  public conversionTag?: ConversionTag;

  public afterRender() {
    const props = this.options;
    this.renderLabel();
    if (props.conversionTag.visible) {
      this.conversionTag = new ConversionTag({
        view: this.view,
        field: props.yField,
        transpose: true,
        animation: props.animation === false ? false : true,
        ...props.conversionTag,
      });
    }
    super.afterRender();
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected processData(originData?: DataItem[]) {
    const { xField } = this.options;
    const processedData = [];
    each(originData, (data) => {
      const d = clone(data);
      d[xField] = d[xField].toString();
      processedData.push(d);
    });
    return processedData;
  }

  protected scale() {
    const { options } = this;
    const scales = {};
    /** 配置x-scale */
    scales[options.xField] = { type: 'cat' };
    if (has(options, 'xAxis')) {
      extractScale(scales[options.xField], options.xAxis);
    }
    /** 配置y-scale */
    scales[options.yField] = {};
    if (has(options, 'yAxis')) {
      extractScale(scales[options.yField], options.yAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {
    return;
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected adjustColumn(column: ElementOption) {
    return;
  }

  protected addGeometry() {
    const { options } = this;
    const column = getGeom('interval', 'main', {
      positionFields: [options.xField, options.yField],
      plot: this,
    });
    if (options.conversionTag.visible) {
      this.setConfig(
        'theme',
        deepMix({}, this.getTheme(), {
          columnWidthRatio: 1 / 3,
        })
      );
    }
    this.adjustColumn(column);
    this.column = column;
    if (options.tooltip && (options.tooltip.fields || options.tooltip.formatter)) {
      this.geometryTooltip();
    }
    this.setConfig('geometry', column);
  }

  protected geometryTooltip() {
    this.column.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.column.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.column.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.column.tooltip.fields = [this.options.xField, this.options.yField];
        if (this.options.colorField) {
          this.column.tooltip.fields.push(this.options.colorField);
        }
      }
    }
  }

  protected animation() {
    super.animation();
    if (this.options.animation === false) {
      /** 关闭动画 */
      this.column.animate = false;
    }
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }

  protected renderLabel() {
    const { scales } = this.config;
    const { label, yField } = this.options;
    const scale = scales[yField];
    if (label?.visible) {
      const geometry = getGeometryByType(this.view, 'interval');
      this.doRenderLabel(geometry, {
        type: 'column',
        formatter: scale.formatter && ((value: Maybe<string | number>) => scale.formatter(value)),
        ...this.options.label,
      });
    }
  }
}

registerPlotType('column', BaseColumnLayer);
