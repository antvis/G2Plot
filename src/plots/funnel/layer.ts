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
import './animation/funnel-scale-in-x';
import './animation/funnel-scale-in-y';
import './geometry/shape/funnel-basic-rect';
import './geometry/shape/funnel-dynamic-rect';
import FunnelLabelParser from './component/label/funnel-label-parser';

function lerp(a, b, factor) {
  return (1 - factor) * a + factor * b;
}

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'funnel',
};

export interface FunnelStyle {
  [k: string]: any;
}

export interface FunnelViewConfig extends ViewConfig {
  funnelStyle?: FunnelStyle | ((...args: any[]) => FunnelStyle);
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
  transpose?: boolean;
  dynamicHeight?: boolean;
  compareField?: string;
  compareTextStyle?: Partial<{
    offsetX: number;
    offsetY: number;
    [k: string]: any;
  }>;
}

export interface FunnelLayerConfig extends FunnelViewConfig, LayerConfig {}

export default class FunnelLayer<T extends FunnelLayerConfig = FunnelLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(props?: Partial<FunnelViewConfig>): Partial<FunnelViewConfig> {
    const cfg: Partial<FunnelViewConfig> = {
      label: {
        visible: true,
        adjustColor: true,
        formatter:
          props && (props.compareField || props.transpose)
            ? (xValue, item, idx, yValue, yValueTop) => `${yValue}`
            : (xValue, item, idx, yValue, yValueTop) => `${xValue} ${yValue}`,
      },
      percentage: {
        visible: true,
        offsetX: props.transpose ? 0 : 40,
        offsetY: props.transpose ? 40 : 0,
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
      compareTextStyle: {
        fill: 'black',
        offsetX: -16,
        offsetY: -16,
      },
    };
    return _.deepMix({}, super.getDefaultOptions(), cfg);
  }

  public funnel: any;
  public type: string = 'funnel';

  private animationAppearTimeoutHandler: any;

  private legendsListenerAttached: boolean = false;

  private shouldShowLabels: boolean = false;
  private shouldResetPercentages: boolean = true;
  private shouldResetCompareTexts: boolean = true;

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
      actions: props.transpose
        ? props.dynamicHeight
          ? [['transpose'], ['scale', 1, -1]]
          : [['scale', 1, -1]]
        : props.dynamicHeight
        ? []
        : [['transpose'], ['scale', 1, -1]],
    };
    this.setConfig('coord', coordConfig);
  }

  protected axis(): void {
    this.setConfig('axes', false);
  }

  protected adjustFunnel(funnel: ElementOption) {
    const props = this.options;

    funnel.shape = {
      values: [props.dynamicHeight ? 'funnel-dynamic-rect' : 'funnel-basic-rect'],
    };

    funnel.color = {
      fields: [props.xField],
      values: props.color && (Array.isArray(props.color) ? props.color : [props.color]),
    };

    if (_.isFunction(props.funnelStyle)) {
      // @ts-ignore
      funnel.style = { callback: props.funnelStyle };
    } else {
      // @ts-ignore
      funnel.style = { cfg: props.funnelStyle };
    }

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
      this.shouldShowLabels = true;
    } else {
      const appearDuration = _.get(props, 'animation.appear.duration');
      const appearDurationEach = appearDuration / (this.getData().length || 1);

      if (this.animationAppearTimeoutHandler) {
        clearTimeout(this.animationAppearTimeoutHandler);
        delete this.animationAppearTimeoutHandler;
      }
      this.animationAppearTimeoutHandler = setTimeout(() => {
        this._teardownAnimationMask();
        this.shouldShowLabels = true;
        this.fadeInPercentages(appearDurationEach);
        if (props.compareField) {
          this.fadeInCompareTexts(appearDurationEach);
        }
        delete this.animationAppearTimeoutHandler;
      }, appearDuration);

      this.funnel.animate = _.deepMix({}, props.animation, {
        appear: {
          animation: props.transpose ? 'funnelScaleInX' : 'funnelScaleInY',
          duration: appearDurationEach,
          reverse: props.dynamicHeight && !props.transpose,
          callback: (shape) => {
            this.shouldShowLabels = true;
            this.showLabels(shape);
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
    if (props.compareField) {
      this.resetCompareTexts();
    }

    if (props.padding == 'auto') {
      const percentageContainer = this._findPercentageContainer();
      if (percentageContainer) {
        this.paddingController.registerPadding(percentageContainer, 'inner', true);
      }
      const compareTextContainer = this._findCompareTextContainer();
      if (compareTextContainer) {
        this.paddingController.registerPadding(compareTextContainer, 'inner', true);
      }
    }

    super.afterRender();

    if (this.animationAppearTimeoutHandler) {
      this._setupAnimationMask();
      if (props.compareField) {
        this.fadeInCompareTexts();
      }
    }

    this.showLabels();

    if (props.animation === false) {
      this.fadeInPercentages();
      if (props.compareField) {
        this.fadeInCompareTexts();
      }
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
    this.legendsListenerAttached = false;
    this.shouldShowLabels = false;
  }

  public changeData(data: DataItem[]): void {
    const props = this.options;

    if (props.animation !== false) {
      this.shouldResetPercentages = false;
      this.shouldResetCompareTexts = false;
    }

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
    if (props.compareField) {
      this.refreshCompareTexts();
    }
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

  protected showLabels(shape?) {
    if (!this.shouldShowLabels) return;

    this.view.get('elements').forEach((element) => {
      const { labelsContainer } = element.get('labelController');
      if (labelsContainer) {
        labelsContainer
          .get('labelsRenderer')
          .get('group')
          .get('children')
          .forEach((label) => {
            if (shape) {
              if (element.getShapeId(label.get('origin')) == shape.id) {
                label.attr('opacity', 1);
              }
            } else {
              label.attr('opacity', 1);
            }
          });
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
        const [x1, y1] = coord.invertMatrix(
          props.transpose ? minX : maxX,
          props.transpose ? (props.compareField ? minY : maxY) : props.dynamicHeight ? minY : maxY,
          1
        );
        const { line, text, value } = this._findPercentageMembersInContainerByShape(container, shape, true);

        const eachProcs = [
          (x, y, line, text, value) => {
            if (line) {
              line.attr(
                _.deepMix({}, percentageLine.style, {
                  x1: x,
                  y1: y,
                  x2: props.transpose ? x + offsetX : x - offsetX,
                  y2: y - offsetY,
                  opacity: 0,
                })
              );
              line.set('adjustTimestamp', adjustTimestamp);
            }

            let textWidth = 0;
            let valueWidth = 0;

            const textProc = () => {
              if (text) {
                text.attr(
                  _.deepMix({}, percentageText.style, {
                    x: props.transpose ? x + offsetX : x - offsetX - spacing - valueWidth - spacing,
                    y: props.transpose ? y - offsetY - spacing : y - offsetY,
                    opacity: 0,
                    text: percentageText.content,
                    textAlign: props.transpose ? 'left' : 'right',
                    textBaseline: props.transpose ? 'bottom' : 'middle',
                  })
                );
                text.set('adjustTimestamp', adjustTimestamp);
                textWidth = text.getBBox().width;
              }
            };

            const valueProc = () => {
              if (value) {
                value.attr(
                  _.deepMix({}, percentageValue.style, {
                    x: props.transpose ? x + offsetX + textWidth + spacing : x - offsetX - spacing,
                    y: props.transpose ? y - offsetY - spacing : y - offsetY,
                    opacity: 0,
                    text: _.isFunction(percentageValue.formatter)
                      ? props.compareField
                        ? percentageValue.formatter(
                            _.get(datumUpper, '__compare__.yValues.0'),
                            _.get(datumLower, '__compare__.yValues.0')
                          )
                        : percentageValue.formatter(datumUpper[props.yField], datumLower[props.yField])
                      : '',
                    textAlign: props.transpose ? 'left' : 'right',
                    textBaseline: props.transpose ? 'bottom' : 'middle',
                  })
                );
                value.set('adjustTimestamp', adjustTimestamp);
                valueWidth = value.getBBox().width;
              }
            };

            if (props.transpose) {
              textProc();
              valueProc();
            } else {
              valueProc();
              textProc();
            }
          },
          (x, y, line, text, value) => {
            if (line) {
              line.attr(
                _.deepMix({}, percentageLine.style, {
                  x1: x,
                  y1: y,
                  x2: x + offsetX,
                  y2: props.transpose ? (props.compareField ? y + offsetY : y - offsetY) : y + offsetY,
                  opacity: 0,
                })
              );
              line.set('adjustTimestamp', adjustTimestamp);
            }

            let textWidth = 0;
            if (text) {
              text.attr(
                _.deepMix({}, percentageText.style, {
                  x: props.transpose ? x + offsetX : x + offsetX + spacing,
                  y: props.transpose
                    ? props.compareField
                      ? y + offsetY + spacing
                      : y - offsetY - spacing
                    : y + offsetY,
                  opacity: 0,
                  text: percentageText.content,
                  textAlign: 'left',
                  textBaseline: props.transpose ? (props.compareField ? 'top' : 'bottom') : 'middle',
                })
              );
              text.set('adjustTimestamp', adjustTimestamp);
              textWidth = text.getBBox().width;
            }

            if (value) {
              value.attr(
                _.deepMix({}, percentageValue.style, {
                  x: props.transpose ? x + offsetX + textWidth + spacing : x + offsetX + spacing + textWidth + spacing,
                  y: props.transpose
                    ? props.compareField
                      ? y + offsetY + spacing
                      : y - offsetY - spacing
                    : y + offsetY,
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
                  textBaseline: props.transpose ? (props.compareField ? 'top' : 'bottom') : 'middle',
                })
              );
              value.set('adjustTimestamp', adjustTimestamp);
            }
          },
        ];

        if (props.compareField) {
          const [x0, y0] = coord.invertMatrix(minX, maxY, 1);
          [
            [x0, y0],
            [x1, y1],
          ].forEach(([x, y], i) => eachProcs[i](x, y, line && line[i], text && text[i], value && value[i]));
        } else {
          eachProcs[1](x1, y1, line, text, value);
        }
      }
      datumUpper = datumLower;
    });

    container.get('children').forEach((child) => {
      if (child.get('adjustTimestamp') != adjustTimestamp) {
        child.attr({ opacity: 0 });
        container.set(child.get('id'), null);
        setTimeout(() => child.remove());
      }
    });
  }

  protected fadeInPercentages(duration?, callback?) {
    const props = this.options;
    const container = this._findPercentageContainer();

    const eachProc = (i?) => {
      const lastBBox = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
      this.view.eachShape((datum, shape) => {
        const members = this._findPercentageMembersInContainerByShape(container, shape);

        const currBBox = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
        const eachCalc = (member) => {
          if (member && member.get('type') == 'text') {
            const { minX, maxX, minY, maxY } = member.getBBox();
            if (minX < currBBox.minX) currBBox.minX = minX;
            if (maxX > currBBox.maxX) currBBox.maxX = maxX;
            if (minY < currBBox.minY) currBBox.minY = minY;
            if (maxY > currBBox.maxY) currBBox.maxY = maxY;
          }
        };
        _.each(members, (member) => (_.isArray(member) ? eachCalc(member[i]) : eachCalc(member)));

        if (
          currBBox.minX > lastBBox.maxX ||
          currBBox.maxX < lastBBox.minX ||
          currBBox.minY > lastBBox.maxY ||
          currBBox.maxY < lastBBox.minY
        ) {
          const eachShow = (member) => {
            if (member) {
              const attrs = {
                opacity: 1,
              };
              duration ? member.animate(attrs, duration) : member.attr(attrs);
            }
          };
          _.each(members, (member) => (_.isArray(member) ? eachShow(member[i]) : eachShow(member)));
          _.assign(lastBBox, currBBox);
        }
      });
    };

    props.compareField ? [0, 1].forEach(eachProc) : eachProc();

    duration && callback && setTimeout(callback, duration);
  }

  protected fadeOutPercentages(duration?, callback?) {
    const container = this._findPercentageContainer();
    this.view.eachShape((datum, shape) => {
      const members = this._findPercentageMembersInContainerByShape(container, shape);

      const eachProc = (member) => {
        if (member) {
          const attrs = {
            opacity: 0,
          };
          duration ? member.animate(attrs, duration) : member.attr(attrs);
        }
      };
      _.each(members, (member) => (_.isArray(member) ? member.forEach(eachProc) : eachProc(member)));
    });

    duration && callback && setTimeout(callback, duration);
  }

  protected refreshPercentages(callback?) {
    const props = this.options;

    if (props.animation !== false) {
      const { fadeOutDuration, fadeInDuration } = this._calcRefreshFadeDurations();

      this.shouldResetPercentages = false;
      this.fadeOutPercentages(fadeOutDuration, () => {
        this.shouldResetPercentages = true;
        this.resetPercentages();
        this.fadeInPercentages(fadeInDuration, callback);
      });
    }
  }

  private _calcRefreshFadeDurations() {
    const props = this.options;

    const updateDuration = _.get(props, 'animation.update.duration');
    const enterDuration = _.get(props, 'animation.enter.duration');
    const fadeInDuration = Math.min(enterDuration, updateDuration) * 0.6;
    const fadeOutDuration = Math.max(enterDuration, updateDuration) * 1.2;

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
        let line = container.get(lineId);
        if (!line && createIfNotFound) {
          line = container.addShape('line', { id: lineId });
          container.set(lineId, line);
        }
        return line;
      };
      const line = props.compareField ? [0, 1].map(find) : find(0);
      members.line = line;
    }

    if (percentageText.visible !== false) {
      const find = (i) => {
        const textId = `_percentage-text-${shape.id}-${i}`;
        let text = container.get(textId);
        if (!text && createIfNotFound) {
          text = container.addShape('text', { id: textId });
          container.set(textId, text);
        }
        return text;
      };
      const text = props.compareField ? [0, 1].map(find) : find(0);
      members.text = text;
    }

    if (percentageValue.visible !== false) {
      const find = (i) => {
        const valueId = `_percentage-value-${shape.id}-${i}`;
        let value = container.get(valueId);
        if (!value && createIfNotFound) {
          value = container.addShape('text', { id: valueId });
          container.set(valueId, value);
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
        reverse: props.transpose,
      };

      ratioUpper = ratioLower;
    });
  }

  protected resetCompareTexts() {
    if (!this.shouldResetCompareTexts) return;

    const props = this.options;

    let shapeParentBBox;
    let compare;
    const targetDatum = this._findCheckedData(this.getData())[0];
    this.view.eachShape((datum, shape) => {
      if (datum == targetDatum) {
        shapeParentBBox = shape.get('parent').getBBox();
        compare = _.get(datum, '__compare__');
      }
    });

    if (shapeParentBBox && compare) {
      const coord = this.view.get('coord');
      const container = this._findCompareTextContainer(true);
      const { yValuesMax, compareValues } = compare;
      const pStart = coord.invertMatrix(shapeParentBBox.minX, shapeParentBBox.minY, 1);
      const pEnd = coord.invertMatrix(shapeParentBBox.maxX, shapeParentBBox.maxY, 1);

      const minX = Math.min(pStart[0], pEnd[0]);
      const maxX = Math.max(pStart[0], pEnd[0]);
      const minY = Math.min(pStart[1], pEnd[1]);
      const maxY = Math.max(pStart[1], pEnd[1]);

      const compareTexts = container.get('children');
      [0, 1].forEach((i) => {
        let compareText = compareTexts[i];
        if (!compareText) {
          compareText = container.addShape('text');
        }
        compareText.attr(
          _.deepMix({}, props.compareTextStyle, {
            text: props.transpose ? compareValues[i] : i ? `  ${compareValues[i]}` : `${compareValues[i]}  `,
            x: props.transpose
              ? minX + _.get(props, 'compareTextStyle.offsetX')
              : lerp(minX, maxX, yValuesMax[0] / (yValuesMax[0] + yValuesMax[1])),
            y: props.transpose
              ? lerp(minY, maxY, yValuesMax[0] / (yValuesMax[0] + yValuesMax[1])) + (i ? 8 : -8)
              : minY + _.get(props, 'compareTextStyle.offsetY'),
            opacity: 0,
            textAlign: props.transpose ? 'right' : i ? 'left' : 'right',
            textBaseline: props.transpose ? (i ? 'top' : 'bottom') : 'bottom',
          })
        );
      });
    }
  }

  protected fadeInCompareTexts(duration?, callback?) {
    const container = this._findCompareTextContainer();
    if (container) {
      const compareTexts = container.get('children');
      [0, 1].forEach((i) => {
        const compareText = compareTexts[i];

        if (compareText) {
          const attrs = {
            opacity: 1,
          };
          duration ? compareText.animate(attrs, duration) : compareText.attr(attrs);
        }
      });
    }

    duration && callback && setTimeout(callback, duration);
  }

  protected fadeOutCompareTexts(duration?, callback?) {
    const container = this._findCompareTextContainer();
    if (container) {
      const compareTexts = container.get('children');
      [0, 1].forEach((i) => {
        const compareText = compareTexts[i];

        if (compareText) {
          const attrs = {
            opacity: 0,
          };
          duration ? compareText.animate(attrs, duration) : compareText.attr(attrs);
        }
      });
    }

    duration && callback && setTimeout(callback, duration);
  }

  protected refreshCompareTexts(callback?) {
    const props = this.options;

    if (props.animation !== false) {
      const { fadeInDuration, fadeOutDuration } = this._calcRefreshFadeDurations();

      this.shouldResetCompareTexts = false;
      this.fadeOutCompareTexts(fadeOutDuration, () => {
        this.shouldResetCompareTexts = true;
        this.resetCompareTexts();
        this.fadeInCompareTexts(fadeInDuration, callback);
      });
    }
  }

  private _findCompareTextContainer(createIfNotFound: boolean = false) {
    let compareTextContainer;

    if (this.view) {
      const elements = this.view.get('elements');

      elements.find((element) => {
        return (compareTextContainer = element.get('compareTextContainer'));
      });

      if (!compareTextContainer && createIfNotFound) {
        if (elements.length) {
          const element = elements[0];
          compareTextContainer = element.get('container').addGroup();
          element.set('compareTextContainer', compareTextContainer);
        }
      }
    }

    return compareTextContainer;
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
            transpose: props.transpose,
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
    const yValuesMax = [-Infinity, -Infinity];
    data.forEach((datum) => {
      const yValues = _.get(datum, '__compare__.yValues');
      [0, 1].forEach((i) => {
        if (yValues[i] > yValuesMax[i]) {
          yValuesMax[i] = yValues[i];
        }
      });
    });

    data.forEach((datum, index) => {
      _.set(datum, '__compare__.yValuesMax', yValuesMax);
      _.set(datum, '__compare__.yValuesNext', _.get(data, `${index + 1}.__compare__.yValues`));
    });
  }

  private _findCheckedData(data: any[]) {
    const props = this.options;

    const legendValues = this.view
      .get('canvas')
      .findAll((shape) => shape.name == 'legend-item' && shape.get('parent').get('checked'))
      .map((shape) => shape.get('origin').value);

    return data.filter((datum) => _.contains(legendValues, datum[props.xField]));
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
      const { fadeOutDuration, fadeInDuration } = this._calcRefreshFadeDurations();
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
        this.refreshCompareTexts();
      }
    }
  };
}

registerPlotType('funnel', FunnelLayer);
