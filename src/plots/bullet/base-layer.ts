import { BBox, Group } from '@antv/g';
import { LegendOption } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import * as EventParser from './event';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { extractScale } from '../../util/scale';
import { getGeom } from '../../geoms/factory';

interface BulletStyle {
  /** 进度条大小 */
  size?: number;
  /** 进度条颜色 */
  color?: string;
}

const G2_GEOM_MAP = {
  bullet: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'bullet',
};

export const STACK_FIELD = '$$type$$';

export interface BaseBulletViewConfig extends ViewConfig {
  goal: number;
  min?: number;
  /** 最大值 */
  max?: number;
  range?: number[];
  /** ticks */
  ticks?: {
    visible: boolean;
    values?: string[];
    style?: {
      fontSize?: number;
      lineHeight?: number;
    };
  };
  /** 进度条样式 */
  bulletStyle?: BulletStyle;
  /** 进度条背景条样式 */
  barStyle?: {};
  /** 进度条背景条宽度 */
  barSize?: number;
}

export default abstract class BaseBulletLayer<C extends BaseBulletViewConfig = BaseBulletViewConfig> extends ViewLayer<
  C
> {
  public bullet;
  public abstract type: string;
  public static getDefaultOptions(): Partial<BaseBulletViewConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: false,
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        label: {
          visible: false,
        },
      },
      yAxis: {
        visible: false,
      },
      tooltip: {
        visible: false,
        trigger: 'item',
        crosshairs: false,
      },
      bulletStyle: {
        color: '#1890FF',
      },
      barSize: 20,
      barStyle: {
        fillOpacity: 0.2,
      },
      label: {
        visible: true,
        style: {
          fill: 'rgba(0, 0, 0, 0.45)',
          stroke: '#fff',
          lineWidth: 1,
          textBaseline: 'middle',
          textAlign: 'left',
        },
      },
      range: [0, 100],
      ticks: {
        visible: false,
        values: ['0', '1', '2', '3', '4', '5'],
        style: {
          fill: 'rgba(0, 0, 0, 0.25)',
          textBaseline: 'bottom',
          textAlign: 'center',
          fontSize: 12,
          lineHeight: 16,
        },
      },
      min: 0,
      stackField: STACK_FIELD,
    });
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    /** 配置y-scale */
    scales[props.yField] = {};
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    /** 配置x-scale */
    scales[props.xField] = {
      type: 'cat',
    };
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  public getOptions(props: C) {
    const options = super.getOptions(props);
    this.adjustOptions(options);
    return options;
  }

  public afterRender() {
    super.afterRender();
    this.drawBullets();
  }

  /** @override */
  protected abstract drawBullets();

  protected drawBullet(container: Group, box: BBox, value: number) {
    const options = this.options;
    const bulletColor = options.bulletStyle.color;
    const bulletHeight = options.bulletStyle.size || options.barSize * 0.6;
    if (options.ticks && options.ticks.visible) {
      this.drawBulletTicks(container, box);
    }
    /** 添加当前进度 */
    const rect = container.addShape('rect', {
      attrs: {
        width: box.width * (value / options.max),
        height: bulletHeight,
        x: box.minX,
        y: box.minY + (box.height - bulletHeight) / 2,
        fill: bulletColor,
      },
    });
    rect.name = 'bullet';
    /** 添加目标值 */
    const targetRect = container.addShape('rect', {
      attrs: {
        width: 2,
        height: box.height,
        x: box.minX + box.width * (options.goal / options.max),
        y: box.minY,
        fill: bulletColor,
      },
    });
    targetRect.name = 'target';
    /** 添加目标值 label */
    if (options.label.visible) {
      const labelStyle = options.label.style;
      const label = container.addShape('text', {
        attrs: {
          x: rect.getBBox().maxX + 4,
          y: rect.getBBox().minY + rect.getBBox().height / 2,
          text: `${value}`,
          ...labelStyle,
        },
      });
      label.name = 'label';
    }
  }

  /** 添加 ticks  */
  protected drawBulletTicks(container: Group, box: BBox) {
    const options = this.options;
    const ticks = options.ticks.values || [];
    const ticksStyle = options.ticks.style;
    const tickInterval = box.width / (ticks.length - 1);
    const tickBottom = _.get(ticksStyle, 'lineHeight', 0) - ticksStyle.fontSize;
    ticks.forEach((tick, tickIdx) => {
      const x = box.minX + tickInterval * tickIdx;
      const tickText = container.addShape('text', {
        attrs: {
          x,
          y: box.minY - tickBottom,
          text: `${tick}`,
          ...ticksStyle,
        },
      });
      tickText.name = 'tick';
      if (tickIdx > 0 && tickIdx !== ticks.length - 1) {
        container.addShape('path', {
          attrs: {
            path: [
              ['M', x, box.minY],
              ['L', x, box.maxY],
            ],
            stroke: '#fff',
            lineDash: [2, 2],
            lineWidth: 1,
          },
        });
      }
    });
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected coord() {
    const coordConfig = {
      actions: [['transpose']],
    };
    this.setConfig('coord', coordConfig);
  }

  /** 自定义子弹图图例 */
  protected legend() {
    const options = this.options;
    const bulletColor = options.bulletStyle.color;
    const items = [
      {
        value: '实际进度', // 图例项的文本内容
        marker: {
          symbol: 'square', // 该图例项 marker 的形状，参见 marker 参数的说明
          fill: bulletColor, // 该图例项 marker 的填充颜色
        },
      },
      {
        value: '目标值', // 图例项的文本内容
        marker: {
          symbol: 'line', // 该图例项 marker 的形状，参见 marker 参数的说明
          stroke: bulletColor, // 该图例项 marker 的填充颜色
          lineWidth: 2, // 该图例项 marker 的填充颜色
        },
      },
    ];
    if (options.range.length > 2) {
      const colors = options.color || (_.size(options.range) <= 10 ? this.theme.colors : this.theme.colors_20);
      for (let i = 1; i < options.range.length; i += 1) {
        items.push({
          value: `${options.range[i - 1]}-${options.range[i]}`, // 图例项的文本内容
          marker: {
            symbol: 'square', // 该图例项 marker 的形状，参见 marker 参数的说明
            fill: colors[i - 1], // 该图例项 marker 的填充颜色
          },
        });
      }
    }
    const legendOptions = {
      custom: true,
      items,
      ...options.legend,
      clickable: false,
    };
    this.setConfig('legends', legendOptions as LegendOption);
  }

  protected addGeometry() {
    const options = this.options;
    const bullet = getGeom('interval', 'main', {
      positionFields: [options.xField, options.yField],
      plot: this,
    });
    bullet.adjust = [
      {
        type: 'stack',
      },
    ];
    this.bullet = bullet;
    this.setConfig('element', bullet);
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  protected adjustOptions(options): void {
    if (!options.max) {
      options.max = options.goal;
    }
    this.adjustYAxisOptions(options);
    this.adjustDataOptions(options);
  }

  /** @override */
  protected abstract adjustDataOptions(options);

  /** @override */
  protected abstract adjustYAxisOptions(options);
}
