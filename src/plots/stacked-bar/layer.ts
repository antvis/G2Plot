import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption } from '../../interface/config';
import BaseBarLayer from '../bar/layer';
import { BarViewConfig } from '../bar/interface';
import './theme';
import './component/label';
import './component/label-auto';
import { getGeometryByType } from '../../util/view';
import { Maybe } from '../../interface/types';

export interface StackedBarViewConfig extends BarViewConfig {
  stackField: string;
}

export interface StackedBarLayerConfig extends StackedBarViewConfig, LayerConfig {}

export default class StackedBarLayer<T extends StackedBarLayerConfig = StackedBarLayerConfig> extends BaseBarLayer<T> {
  public static getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        autoRotateTitle: false,
        grid: {
          visible: true,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: true,
        },
        label: {
          visible: true,
          autoRotate: true,
          autoHide: true,
        },
        title: {
          visible: true,
        },
      },
      yAxis: {
        visible: true,
        autoRotateTitle: true,
        grid: {
          visible: false,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        label: {
          visible: true,
          autoRotate: true,
          autoHide: true,
        },
        title: {
          visible: false,
        },
      },
      legend: {
        visible: true,
        position: 'top-left',
        offsetY: 0,
      },
    });
  }

  public type: string = 'stackedBar';

  protected adjustBar(bar: ElementOption) {
    bar.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected renderLabel() {
    const { scales } = this.config;
    const { label, xField } = this.options;
    const scale = scales[xField];
    if (label?.visible) {
      const geometry = getGeometryByType(this.view, 'interval');
      this.doRenderLabel(geometry, {
        type: 'stacked-bar',
        formatter: scale.formatter && ((value: Maybe<string | number>) => scale.formatter(value)),
        ...this.options.label,
      });
    }
  }

  protected geometryTooltip() {
    this.bar.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.bar.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.bar.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.bar.tooltip.fields = [this.options.xField, this.options.yField, this.options.stackField];
      }
    }
  }
}

registerPlotType('stackedBar', StackedBarLayer);
