import * as _ from '@antv/util';
import { Shape, Group } from '@antv/g';
import { Animate } from '@antv/g2';

import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ElementOption, DataItem } from '../../interface/config';

import './theme';
import './component/label/funnel-label';
import './animation/funnel-scale-in-y';
import './geometry/shape/funnel-basic-rect';
import './geometry/shape/funnel-dynamic-rect';
import FunnelLabelParser from './component/label/funnel-label-parser';

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'funnel',
};

export interface FunnelViewConfig extends ViewConfig {
  percentage?: Partial<{
    visible: boolean;
    line: Partial<{
      visible: boolean;
      style: {};
    }>;
    text: Partial<{
      visible: boolean;
      content: string;
      style: {};
    }>;
    value: Partial<{
      visible: boolean;
      style: {};
      formatter: (yValueUpper: any, yValueLower: any) => string;
    }>;
    offsetX: number;
    offsetY: number;
    spacing: number;
  }>;
  compareField?: string;
  dynamicHeight?: boolean;
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
        value: {
          visible: true,
          style: {
            fill: 'black',
          },
          formatter: (yValueUpper, yValueLower) => `${((100 * yValueLower) / yValueUpper).toFixed(2)}%`,
        },
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
      dynamicHeight: false,
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

  constructor(props: T) {
    super(props);
    this.adjustProps(this.options);

    if (props.dynamicHeight) {
      this._genCustomFieldForDynamicHeight(this.getData());
    }

    if (props.compareField) {
      this.options.data = this._reduceDataForCompare(this.getData());
    }
  }

  protected coord() {
    const props = this.options;
    const coordConfig = {
      actions: props.dynamicHeight ? [] : [['transpose'], ['scale', 1, -1]],
    };
    this.setConfig('coord', coordConfig);
  }

  protected axis(): void {
    this.setConfig('axes', false);
  }

  protected adjustFunnel(funnel: ElementOption) {
    const { options: props } = this;

    funnel.shape = {
      values: [props.dynamicHeight ? 'funnel-dynamic-rect' : 'funnel-basic-rect'],
    };

    funnel.color = {
      fields: [props.xField],
      values: props.color && (Array.isArray(props.color) ? props.color : [props.color]),
    };

    funnel.adjust = [
      {
        type: props.dynamicHeight ? 'stack' : 'symmetric',
      },
    ];
  }

  protected addGeometry() {
    const props = this.options;
    const funnel = getGeom('interval', 'main', {
      positionFields: [props.dynamicHeight ? '_' : props.xField, props.yField],
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
        this._teardownAnimationMask();

        this.shouldAdjustLabels = true;
        this.shouldResetPercentages = true;
        this.resetPercentages();
        this.fadeInPercentages(appearDurationEach);

        delete this.animationAppearTimeoutHandler;
      }, appearDuration);

      this.funnel.animate = _.deepMix({}, props.animation, {
        appear: {
          animation: 'funnelScaleInY',
          duration: appearDurationEach,
          reverse: props.dynamicHeight,
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

    if (this.animationAppearTimeoutHandler) {
      this._setupAnimationMask();
    }

    this.adjustLegends();
    this.adjustLabels();
    this.resetPercentages();

    if (props.animation === false) {
      this.fadeInPercentages();
    }

    if (!this.legendsListenerAttached) {
      this.legendsListenerAttached = true;
      const legendContainer = this.view.get('legendController').container;
      legendContainer.on('mousedown', this._onLegendContainerMouseDown);
    }
  }

  public updateConfig(cfg: Partial<T>): void {
    cfg = this.adjustProps(_.deepMix({}, this.options, cfg));

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

    if (props.dynamicHeight) {
      const checkedData = this._findCheckedDataInNewData(data);
      this._genCustomFieldForDynamicHeight(checkedData);
    }

    if (props.compareField) {
      data = this._reduceDataForCompare(data);
      const checkedData = this._findCheckedDataInNewData(data);
      this._updateDataForCompare(checkedData);
    }

    super.changeData(data);

    this.refreshPercentages();
    this._refreshAnimationMaskForPercentageRefresh();
  }

  protected extractLabel() {
    const props = this.options;
    const label = props.label;

    if (label && label.visible === false) {
      return false;
    }

    const labelConfig = new FunnelLabelParser(
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
    ).getConfig();

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

  protected adjustProps(props: T) {
    if (props.dynamicHeight) {
      _.set(props, `meta.${props.yField}.nice`, false);
      _.set(props, 'tooltip.shared', false);
    }
    return props;
  }

  protected resetPercentages() {
    if (!this.shouldResetPercentages) return;

    const props = this.options;
    const {
      offsetX,
      offsetY,
      spacing,
      line: percentageLine = {},
      text: percentageText = {},
      value: percentageValue = {},
    } = props.percentage || {};

    const adjustTimestamp = Date.now();

    const container = this._findPercentageContainer(true);
    const coord = this.view.get('coord');
    let i = 0;
    let datumUpper;
    this.view.eachShape((datumLower, shape) => {
      if (i++ > 0) {
        const { maxX, maxY, minY } = shape.getBBox();
        const [x, y] = coord.invertMatrix(maxX, props.dynamicHeight ? minY : maxY, 1);
        const { line, text, value } = this._findPercentageMembersInContainerByShape(container, shape, true);

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

        if (value) {
          value.attr(
            _.deepMix({}, percentageValue.style, {
              x: x + offsetX + spacing + textWidth + spacing,
              y: y + offsetY,
              opacity: 0,
              text: _.isFunction(percentageValue.formatter)
                ? percentageValue.formatter(datumUpper[props.yField], datumLower[props.yField])
                : '',
              textAlign: 'left',
              textBaseline: 'middle',
            })
          );
          value.set('adjustTimestamp', adjustTimestamp);
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

    let lastMaxY = -Infinity;
    this.view.eachShape((datum, shape) => {
      const members = this._findPercentageMembersInContainerByShape(container, shape);

      let currMinY = Infinity;
      let currMaxY = -Infinity;
      _.each(members, (member) => {
        if (member) {
          const { minY, maxY } = member.getBBox();
          if (minY < currMinY) {
            currMinY = minY;
          }
          if (maxY > currMaxY) {
            currMaxY = maxY;
          }
        }
      });

      if (currMinY >= lastMaxY) {
        _.each(members, (member) => {
          if (member) {
            const lineAttrs = {
              opacity: 1,
            };
            duration ? member.animate(lineAttrs, duration) : member.attr(lineAttrs);
          }
        });
      }

      if (currMaxY > lastMaxY) {
        lastMaxY = currMaxY;
      }
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

  protected refreshPercentages(callback?) {
    const props = this.options;

    if (props.animation !== false) {
      const { fadeOutDuration, fadeInDuration } = this._calcPercentageRefreshFadeDurations();

      this.shouldResetPercentages = false;
      this.fadeOutPercentages(fadeOutDuration, () => {
        this.shouldResetPercentages = true;
        this.resetPercentages();
        this.fadeInPercentages(fadeInDuration, callback);
      });
    }
  }

  private _calcPercentageRefreshFadeDurations() {
    const props = this.options;

    const updateDuration = _.get(props, 'animation.update.duration');
    const enterDuration = _.get(props, 'animation.enter.duration');
    const fadeInDuration = Math.min(enterDuration, updateDuration) * 0.6;
    const fadeOutDuration = Math.max(enterDuration, updateDuration);

    return { fadeInDuration, fadeOutDuration };
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
    const { visible, line: percentageLine = {}, text: percentageText = {}, value: percentageValue = {} } =
      props.percentage || {};

    const members = {
      line: undefined,
      text: undefined,
      value: undefined,
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

    if (percentageValue.visible !== false) {
      const valueId = `_percentage-value-${shape.id}`;
      let value = container.findById(valueId);
      if (!value && createIfNotFound) {
        value = container.addShape('text', { id: valueId });
      }
      members.value = value;
    }

    return members;
  }

  private _genCustomFieldForDynamicHeight(data: any[]) {
    const props = this.options;

    const total = data.reduce((total, datum) => total + datum[props.yField], 0);

    let ratioUpper = 1;
    data.forEach((datum, index) => {
      const value = datum[props.yField];
      const share = value / total;
      const ratioLower = ratioUpper - share;

      datum['__custom__'] = {
        datumIndex: index,
        dataLength: data.length,
        ratioUpper,
        ratioLower,
      };

      ratioUpper = ratioLower;
    });
  }

  private _reduceDataForCompare(data: any[]) {
    const props = this.options;

    let compareValueFirstVisited;
    const yValuesMax = [-Infinity, -Infinity];
    data = data.reduce((newData, datum) => {
      const xValue = datum[props.xField];
      const yValue = datum[props.yField];
      const compareValue = datum[props.compareField];
      if (!compareValueFirstVisited) compareValueFirstVisited = compareValue;

      let newDatum = newData.find((newDatum) => newDatum[props.xField] == xValue);
      if (!newDatum) {
        newDatum = {
          [props.xField]: xValue,
          [props.yField]: 0,
          ['__compare__']: {
            yValues: [],
            yValuesMax: [],
            yValuesNext: undefined,
          },
        };
        newData.push(newDatum);
      }
      const yValueIdx = compareValue == compareValueFirstVisited ? 0 : 1;
      newDatum['__compare__'].yValues[yValueIdx] = yValue;
      if (yValuesMax[yValueIdx] < yValue) {
        yValuesMax[yValueIdx] = yValue as number;
      }

      return newData;
    }, []);

    data.forEach((datum, index) => {
      datum[props.yField] = _.get(datum, '__compare__.yValues', []).reduce((yTotal, yValue) => (yTotal += yValue), 0);
      _.set(datum, '__compare__.yValuesMax', yValuesMax);
      _.set(datum, '__compare__.yValuesNext', _.get(data, `${index + 1}.__compare__.yValues`));
    });

    return data;
  }

  private _updateDataForCompare(data: any[]) {
    data.forEach((datum, index) => {
      _.set(datum, '__compare__.yValuesNext', _.get(data, `${index + 1}.__compare__.yValues`));
    });
  }

  private _findCheckedDataInNewData(newData: any[]) {
    const props = this.options;

    const legendValues = this.view
      .get('canvas')
      .findAll((shape) => shape.name == 'legend-item' && shape.get('parent').get('checked'))
      .map((shape) => shape.get('origin').value);

    const oldData = this.getData();

    const uncheckedValues = oldData
      .map((oldDatum) => oldDatum[props.xField])
      .filter((xValue) => !_.contains(legendValues, xValue));

    return newData.filter((newDatum) => !_.contains(uncheckedValues, newDatum[props.xField]));
  }

  private _findCheckedDataByMouseDownLegendItem(legendItem) {
    const props = this.options;

    const legendItemOrigin = legendItem.get('origin');

    const brotherValues = legendItem
      .get('parent')
      .get('parent')
      .findAll((shape) => shape != legendItem && shape.name == 'legend-item' && shape.get('parent').get('checked'))
      .map((shape) => shape.get('origin').value);

    const data = [];
    this.getData().forEach((datum) => {
      const xValue = datum[props.xField];
      if (
        (legendItemOrigin.value == xValue && !legendItem.get('parent').get('checked')) ||
        _.contains(brotherValues, xValue)
      ) {
        data.push(datum);
      }
    });

    return data;
  }

  private _setupAnimationMask() {
    const canvas = this.view.get('canvas');
    let animationMask = canvas.get('animation-mask');
    if (!animationMask) {
      animationMask = canvas.addShape('rect');
      canvas.set('animation-mask', animationMask);
    }
    animationMask.attr({
      x: 0,
      y: 0,
      fill: 'transparent',
      width: canvas.get('width'),
      height: canvas.get('height'),
    });
  }

  private _teardownAnimationMask() {
    const canvas = this.view.get('canvas');
    const animationMask = canvas.get('animation-mask');
    if (animationMask) {
      animationMask.attr({ x: -canvas.get('width') });
    }
  }

  private _refreshAnimationMaskForPercentageRefresh() {
    const props = this.options;
    if (props.animation !== false) {
      const { fadeOutDuration, fadeInDuration } = this._calcPercentageRefreshFadeDurations();
      this._setupAnimationMask();
      setTimeout(() => this._teardownAnimationMask(), fadeOutDuration + fadeInDuration);
    }
  }

  private _onLegendContainerMouseDown = (e) => {
    const props = this.options;

    if (e.target.name == 'legend-item') {
      this.refreshPercentages();

      if (props.dynamicHeight) {
        const data = this._findCheckedDataByMouseDownLegendItem(e.target);
        this._genCustomFieldForDynamicHeight(data);
      }

      if (props.compareField) {
        const data = this._findCheckedDataByMouseDownLegendItem(e.target);
        this._updateDataForCompare(data);
      }
    }
  };
}

registerPlotType('funnel', FunnelLayer);
