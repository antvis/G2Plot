import * as _ from '@antv/util';
import { Shape, Group } from '@antv/g';
import { Animate } from '@antv/g2';

import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getComponent } from '../../components/factory';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ElementOption, DataItem } from '../../interface/config';

import './theme';
import './component/label/funnel-label';
import './animation/funnel-scale-in-y';

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'funnel',
};

export interface FunnelViewConfig extends ViewConfig {
  percentage?: Partial<{
    visible: boolean;
    style: {};
    line: Partial<{
      visible: boolean;
      style: {};
    }>;
    text: Partial<{
      visible: boolean;
      content: string;
      style: {};
    }>;
    offsetX: number;
    spacing: number;
    offsetY: number;
    formatter: (yValueUpper: any, yValueLower: any) => string;
  }>;
}

export interface FunnelLayerConfig extends FunnelViewConfig, LayerConfig {}

export default class FunnelLayer<T extends FunnelLayerConfig = FunnelLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<FunnelViewConfig> {
    const cfg: Partial<FunnelViewConfig> = {
      label: {
        visible: true,
        adjustColor: true,
        formatter: (xValue, yValue) => `${xValue} ${yValue}`,
      },
      percentage: {
        visible: true,
        offsetX: 40,
        offsetY: 0,
        spacing: 4,
        style: {
          fill: 'black',
        },
        line: {
          visible: true,
          style: {
            lineWidth: 1,
            stroke: 'rgba(0, 0, 0, 0.15)',
          },
        },
        text: {
          content: '转化率',
          style: {
            fill: 'rgba(0, 0, 0, 0.65)',
          },
        },
        formatter: (yValueUpper, yValueLower) => `${((100 * yValueLower) / yValueUpper).toFixed(2)}%`,
      },
      tooltip: {
        visible: true,
        shared: true,
        showTitle: false,
        crosshairs: {
          type: 'cross',
          style: {
            stroke: null,
          },
        },
      },
      animation: _.deepMix({}, Animate.defaultCfg, {
        appear: {
          duration: 800,
        },
      }),
    };
    return _.deepMix({}, super.getDefaultOptions(), cfg);
  }

  public funnel: any;
  public type: string = 'funnel';

  private animationAppearTimeoutHandler: any;

  private shouldAdjustLegends: boolean = true;
  private legendsListenerAttached: boolean = false;

  private shouldAdjustLabels: boolean = false;
  private shouldResetPercentages: boolean = false;

  protected coord() {
    const coordConfig = {
      actions: [['transpose'], ['scale', 1, -1]],
    };
    this.setConfig('coord', coordConfig);
  }

  protected axis(): void {
    this.setConfig('axes', false);
  }

  protected adjustFunnel(funnel: ElementOption) {
    const { options: props } = this;

    funnel.shape = {
      values: ['funnel'],
    };

    funnel.color = {
      fields: [props.xField],
      values: props.color && (Array.isArray(props.color) ? props.color : [props.color]),
    };

    funnel.adjust = [
      {
        type: 'symmetric',
      },
    ];
  }

  protected addGeometry() {
    const props = this.options;
    const funnel = getGeom('interval', 'main', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });
    if (props.label) {
      funnel.label = this.extractLabel();
    }
    this.adjustFunnel(funnel);
    this.funnel = funnel;
    this.setConfig('element', funnel);
  }

  protected animation() {
    const props = this.options;

    if (props.animation === false) {
      /** 关闭动画 */
      this.funnel.animate = false;
      this.shouldAdjustLabels = true;
      this.shouldResetPercentages = true;
      _.set(this.funnel, 'label.textStyle.opacity', 1);
    } else {
      const appearDuration = _.get(props, 'animation.appear.duration');
      const appearDurationEach = appearDuration / (this.getData().length || 1);

      if (this.animationAppearTimeoutHandler) {
        clearTimeout(this.animationAppearTimeoutHandler);
        delete this.animationAppearTimeoutHandler;
      }
      this.animationAppearTimeoutHandler = setTimeout(() => {
        this.shouldAdjustLabels = true;
        this.shouldResetPercentages = true;
        this.resetPercentages();
        this.fadeInPercentages(appearDurationEach);
      }, appearDuration);

      this.funnel.animate = _.deepMix({}, props.animation, {
        appear: {
          animation: 'funnelScaleInY',
          duration: appearDurationEach,
          callback: (shape) => {
            this.view.get('elements').forEach((element) => {
              const { labelsContainer } = element.get('labelController');
              if (labelsContainer) {
                const label = labelsContainer
                  .get('labelsRenderer')
                  .get('group')
                  .get('children')
                  .find((label) => element.getShapeId(label.get('origin')) == shape.id);

                if (label) {
                  label.attr('opacity', 1);
                }
              }
            });
          },
        },
      });
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  public afterRender() {
    const props = this.options;

    super.afterRender();
    this.adjustLegends();
    this.adjustLabels();
    this.resetPercentages();

    if (props.animation === false) {
      this.fadeInPercentages();
    }

    if (!this.legendsListenerAttached) {
      this.legendsListenerAttached = true;
      this.view.get('legendController').container.on('mousedown', () => this.refreshPercentages());
    }
  }

  public updateConfig(cfg: Partial<T>): void {
    super.updateConfig(cfg);
    this.shouldAdjustLegends = true;
    this.shouldAdjustLabels = false;
    this.shouldResetPercentages = false;
  }

  public changeData(data: DataItem[]): void {
    const props = this.options;

    if (props.animation !== false) {
      this.shouldResetPercentages = false;
    }
    this.shouldAdjustLegends = true;

    super.changeData(data);

    this.refreshPercentages();
  }

  protected extractLabel() {
    const props = this.options;
    const label = props.label;

    if (label && label.visible === false) {
      return false;
    }

    const labelConfig = getComponent(
      'label',
      _.deepMix(
        {
          textStyle: {
            stroke: null,
          },
        },
        label,
        {
          plot: this,
          labelType: 'funnelLabel',
          position: 'middle',
          textStyle: {
            opacity: 0,
          },
          fields: [props.xField, props.yField],
        }
      )
    );

    const callback = labelConfig.callback.bind(labelConfig);
    labelConfig.callback = (xValue, yValue) => {
      const config = callback(xValue, yValue);
      if (_.isFunction(label.formatter)) {
        config.formatter = (text, item, idx) => label.formatter(xValue, yValue, item, idx);
      }
      return config;
    };

    return labelConfig;
  }

  protected adjustLegends() {
    if (!this.shouldAdjustLegends) return;
    this.shouldAdjustLegends = false;

    const { options: props } = this;
    if (_.contains(['top-center', 'bottom-center'], props.legend.position)) {
      const legendController = this.view.get('legendController');
      legendController.legends.forEach((legend) => {
        const legendGroup = legend.get('container');
        const offsetX = (props.padding[3] - props.padding[1]) / 2;
        legendGroup.translate(offsetX, 0);
      });
    }
  }

  protected adjustLabels() {
    if (!this.shouldAdjustLabels) return;

    this.view.get('elements').forEach((element) => {
      const { labelsContainer } = element.get('labelController');
      if (labelsContainer) {
        labelsContainer
          .get('labelsRenderer')
          .get('group')
          .get('children')
          .forEach((label) => label.attr('opacity', 1));
      }
    });
  }

  protected resetPercentages() {
    if (!this.shouldResetPercentages) return;

    const props = this.options;
    const { offsetX, offsetY, spacing, line: percentageLine = {}, text: percentageText = {}, style, formatter } =
      props.percentage || {};

    const adjustTimestamp = Date.now();

    const container = this._findPercentageContainer(true);
    const coord = this.view.get('coord');
    let i = 0;
    let datumUpper;
    this.view.eachShape((datumLower, shape) => {
      if (i++ > 0) {
        const { maxX, maxY } = shape.getBBox();
        const [x, y] = coord.applyMatrix(maxX, maxY, 1);
        const { line, text, main } = this._findPercentageMembersInContainerByShape(container, shape, true);

        if (line) {
          line.attr(
            _.deepMix({}, percentageLine.style, {
              x1: x,
              y1: y,
              x2: x + offsetX,
              y2: y + offsetY,
              opacity: 0,
            })
          );
          line.set('adjustTimestamp', adjustTimestamp);
        }

        let textWidth = 0;
        if (text) {
          text.attr(
            _.deepMix({}, percentageText.style, {
              x: x + offsetX + spacing,
              y: y + offsetY,
              opacity: 0,
              text: percentageText.content,
              textAlign: 'left',
              textBaseline: 'middle',
            })
          );
          text.set('adjustTimestamp', adjustTimestamp);
          textWidth = text.getBBox().width;
        }

        if (main) {
          main.attr(
            _.deepMix({}, style, {
              x: x + offsetX + spacing + textWidth + spacing,
              y: y + offsetY,
              opacity: 0,
              text: _.isFunction(formatter) ? formatter(datumUpper[props.yField], datumLower[props.yField]) : '',
              textAlign: 'left',
              textBaseline: 'middle',
            })
          );
          main.set('adjustTimestamp', adjustTimestamp);
        }
      }
      datumUpper = datumLower;
    });

    container.get('children').forEach((child) => {
      if (child.get('adjustTimestamp') != adjustTimestamp) {
        child.attr({ opacity: 0 });
        setTimeout(() => child.remove());
      }
    });
  }

  protected fadeInPercentages(duration?, callback?) {
    const container = this._findPercentageContainer();
    this.view.eachShape((datum, shape) => {
      const members = this._findPercentageMembersInContainerByShape(container, shape);
      _.each(members, (member) => {
        if (member) {
          const lineAttrs = {
            opacity: 1,
          };
          duration ? member.animate(lineAttrs, duration) : member.attr(lineAttrs);
        }
      });
    });

    duration && callback && setTimeout(callback, duration);
  }

  protected fadeOutPercentages(duration?, callback?) {
    const container = this._findPercentageContainer();
    this.view.eachShape((datum, shape) => {
      const members = this._findPercentageMembersInContainerByShape(container, shape);
      _.each(members, (member) => {
        if (member) {
          const lineAttrs = {
            opacity: 0,
          };
          duration ? member.animate(lineAttrs, duration) : member.attr(lineAttrs);
        }
      });
    });

    duration && callback && setTimeout(callback, duration);
  }

  protected refreshPercentages() {
    const props = this.options;

    if (props.animation !== false) {
      const updateDuration = _.get(props, 'animation.update.duration');
      const enterDuration = _.get(props, 'animation.enter.duration');
      const fadeOutPercentagesDuration = Math.max(enterDuration, updateDuration);
      const fadeInPercentagesDuration = Math.min(enterDuration, updateDuration) * 0.6;

      this.shouldResetPercentages = false;
      this.fadeOutPercentages(fadeOutPercentagesDuration, () => {
        this.shouldResetPercentages = true;
        this.resetPercentages();
        this.fadeInPercentages(fadeInPercentagesDuration);
      });
    }
  }

  private _findPercentageContainer(createIfNotFound: boolean = false) {
    let percentageContainer;

    if (this.view) {
      const elements = this.view.get('elements');

      elements.find((element) => {
        return (percentageContainer = element.get('percentageContainer'));
      });

      if (!percentageContainer && createIfNotFound) {
        if (elements.length) {
          const element = elements[0];
          percentageContainer = element.get('container').addGroup();
          element.set('percentageContainer', percentageContainer);
        }
      }
    }

    return percentageContainer;
  }

  private _findPercentageMembersInContainerByShape(container: Group, shape: Shape, createIfNotFound: boolean = false) {
    const props = this.options;
    const { visible, line: percentageLine = {}, text: percentageText = {} } = props.percentage || {};

    const members = {
      line: undefined,
      text: undefined,
      main: undefined,
    };

    if (visible === false || !container) {
      return members;
    }

    if (percentageLine.visible !== false) {
      const lineId = `_percentage-line-${shape.id}`;
      let line = container.findById(lineId);
      if (!line && createIfNotFound) {
        line = container.addShape('line', { id: lineId });
      }
      members.line = line;
    }

    if (percentageText.visible !== false) {
      const textId = `_percentage-text-${shape.id}`;
      let text = container.findById(textId);
      if (!text && createIfNotFound) {
        text = container.addShape('text', { id: textId });
      }
      members.text = text;
    }

    const mainId = `_percentage-main-${shape.id}`;
    let main = container.findById(mainId);
    if (!main && createIfNotFound) {
      main = container.addShape('text', { id: mainId });
    }
    members.main = main;

    return members;
  }
}

registerPlotType('funnel', FunnelLayer);
