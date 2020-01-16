import * as _ from '@antv/util';
import * as domUtil from '@antv/dom-util';
import { Shape, Group } from '@antv/g';
import { Animate } from '@antv/g2';
import TooltipTheme from '@antv/component/lib/tooltip/theme';

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
  private shouldResetPercentages: boolean = true;

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

  protected tooltip() {
    const props = this.options;

    if (props.compareField) {
      _.deepMix(props.tooltip, {
        htmlContent: (title, items) => {
          let clss, el, color, elMarker;

          clss = 'g2-tooltip';
          el = domUtil.createDom(`<div class="${clss}"></div>`);
          domUtil.modifyCSS(el, TooltipTheme[clss]);
          const elRoot = el;

          if (title) {
            clss = 'g2-tooltip-title';
            el = domUtil.createDom(`<div class="${clss}"></div>`);
            domUtil.modifyCSS(el, TooltipTheme[clss]);
            elRoot.appendChild(el);
            const elTitle = el;

            clss = 'g2-tooltip-marker';
            el = domUtil.createDom(`<span class="${clss}"></span>`);
            domUtil.modifyCSS(el, TooltipTheme[clss]);
            domUtil.modifyCSS(el, { width: '10px', height: '10px' });
            elTitle.appendChild(el);
            elMarker = el;

            el = domUtil.createDom(`<span>${title}</span>`);
            elTitle.appendChild(el);
          }

          if (items) {
            clss = 'g2-tooltip-list';
            el = domUtil.createDom(`<ul class="${clss}"></ul>`);
            domUtil.modifyCSS(el, TooltipTheme[clss]);
            elRoot.appendChild(el);
            const elList = el;

            items
              .reduce((pairs, item) => {
                if (!color) {
                  color = item.color;
                }
                const compareValues = _.get(item, 'point._origin.__compare__.compareValues');
                const yValues = _.get(item, 'point._origin.__compare__.yValues');
                yValues.forEach((yValue, i) => pairs.push([compareValues[i], yValue]));
                return pairs;
              }, [])
              .forEach(([compareValue, yValue], index) => {
                clss = 'g2-tooltip-list-item';
                el = domUtil.createDom(`<li class="${clss}" data-index=${index}></li>`);
                domUtil.modifyCSS(el, TooltipTheme[clss]);
                elList.appendChild(el);
                const elListItem = el;

                el = domUtil.createDom(`<span>${compareValue}</span>`);
                elListItem.appendChild(el);

                clss = 'g2-tooltip-value';
                el = domUtil.createDom(`<span class="${clss}">${yValue}</span>`);
                domUtil.modifyCSS(el, TooltipTheme[clss]);
                elListItem.appendChild(el);
              });
          }

          if (color && elMarker) {
            domUtil.modifyCSS(elMarker, { backgroundColor: color });
          }

          return elRoot;
        },
      });
    }

    super.tooltip();
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

    this.resetPercentages();
    if (props.padding == 'auto') {
      const percentageContainer = this._findPercentageContainer();
      if (percentageContainer) {
        this.paddingController.registerPadding(percentageContainer, 'inner', true);
      }
    }

    super.afterRender();

    if (this.animationAppearTimeoutHandler) {
      this._setupAnimationMask();
    }

    this.adjustLegends();
    this.adjustLabels();

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
    cfg = this.adjustProps(cfg);

    super.updateConfig(cfg);
    this.shouldAdjustLegends = true;
    this.legendsListenerAttached = false;
    this.shouldAdjustLabels = false;
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

  protected adjustProps(props: Partial<T>) {
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
        const { minX, maxX, maxY, minY } = shape.getBBox();
        const [x1, y] = coord.invertMatrix(maxX, props.dynamicHeight ? minY : maxY, 1);
        const { line, text, value } = this._findPercentageMembersInContainerByShape(container, shape, true);

        const procEach = [
          (x, y, line, text, value) => {
            if (line) {
              line.attr(
                _.deepMix({}, percentageLine.style, {
                  x1: x,
                  y1: y,
                  x2: x - offsetX,
                  y2: y - offsetY,
                  opacity: 0,
                })
              );
              line.set('adjustTimestamp', adjustTimestamp);
            }

            let valueWidth = 0;
            if (value) {
              value.attr(
                _.deepMix({}, percentageValue.style, {
                  x: x - offsetX - spacing,
                  y: y - offsetY,
                  opacity: 0,
                  text: _.isFunction(percentageValue.formatter)
                    ? props.compareField
                      ? percentageValue.formatter(
                          _.get(datumUpper, `__compare__.yValues.0`),
                          _.get(datumLower, `__compare__.yValues.0`)
                        )
                      : percentageValue.formatter(datumUpper[props.yField], datumLower[props.yField])
                    : '',
                  textAlign: 'right',
                  textBaseline: 'middle',
                })
              );
              value.set('adjustTimestamp', adjustTimestamp);
              valueWidth = value.getBBox().width;
            }

            if (text) {
              text.attr(
                _.deepMix({}, percentageText.style, {
                  x: x - offsetX - spacing - valueWidth - spacing,
                  y: y - offsetY,
                  opacity: 0,
                  text: percentageText.content,
                  textAlign: 'right',
                  textBaseline: 'middle',
                })
              );
              text.set('adjustTimestamp', adjustTimestamp);
            }
          },
          (x, y, line, text, value) => {
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
                    ? props.compareField
                      ? percentageValue.formatter(
                          _.get(datumUpper, `__compare__.yValues.1`),
                          _.get(datumLower, `__compare__.yValues.1`)
                        )
                      : percentageValue.formatter(datumUpper[props.yField], datumLower[props.yField])
                    : '',
                  textAlign: 'left',
                  textBaseline: 'middle',
                })
              );
              value.set('adjustTimestamp', adjustTimestamp);
            }
          },
        ];

        if (props.compareField) {
          const [x0] = coord.invertMatrix(minX, 0, 1);
          [x0, x1].forEach((x, i) => {
            procEach[i](x, y, line && line[i], text && text[i], value && value[i]);
          });
        } else {
          procEach[1](x1, y, line, text, value);
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
      const calcEach = (member) => {
        if (member) {
          const { minY, maxY } = member.getBBox();
          if (minY < currMinY) {
            currMinY = minY;
          }
          if (maxY > currMaxY) {
            currMaxY = maxY;
          }
        }
      };
      _.each(members, (member) => (_.isArray(member) ? member.forEach(calcEach) : calcEach(member)));

      if (currMinY >= lastMaxY) {
        const procEach = (member) => {
          if (member) {
            const lineAttrs = {
              opacity: 1,
            };
            duration ? member.animate(lineAttrs, duration) : member.attr(lineAttrs);
          }
        };
        _.each(members, (member) => (_.isArray(member) ? member.forEach(procEach) : procEach(member)));
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

      const procEach = (member) => {
        if (member) {
          const lineAttrs = {
            opacity: 0,
          };
          duration ? member.animate(lineAttrs, duration) : member.attr(lineAttrs);
        }
      };
      _.each(members, (member) => (_.isArray(member) ? member.forEach(procEach) : procEach(member)));
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
      const find = (i) => {
        const lineId = `_percentage-line-${shape.id}-${i}`;
        let line = container.findById(lineId);
        if (!line && createIfNotFound) {
          line = container.addShape('line', { id: lineId });
        }
        return line;
      };
      const line = props.compareField ? [0, 1].map(find) : find(0);
      members.line = line;
    }

    if (percentageText.visible !== false) {
      const find = (i) => {
        const textId = `_percentage-text-${shape.id}-${i}`;
        let text = container.findById(textId);
        if (!text && createIfNotFound) {
          text = container.addShape('text', { id: textId });
        }
        return text;
      };
      const text = props.compareField ? [0, 1].map(find) : find(0);
      members.text = text;
    }

    if (percentageValue.visible !== false) {
      const find = (i) => {
        const valueId = `_percentage-value-${shape.id}-${i}`;
        let value = container.findById(valueId);
        if (!value && createIfNotFound) {
          value = container.addShape('text', { id: valueId });
        }
        return value;
      };
      const value = props.compareField ? [0, 1].map(find) : find(0);
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
            compareValues: [],
            yValues: [],
            yValuesMax: [],
            yValuesNext: undefined,
          },
        };
        newData.push(newDatum);
      }
      const idx = compareValue == compareValueFirstVisited ? 0 : 1;
      newDatum['__compare__'].yValues[idx] = yValue;
      if (yValuesMax[idx] < yValue) {
        yValuesMax[idx] = yValue as number;
      }
      newDatum['__compare__'].compareValues[idx] = compareValue;

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
