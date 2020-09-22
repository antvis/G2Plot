import { deepMix, contains, isFunction, get, findIndex, isEqual, each, set, isArray, assign } from '@antv/util';
import { createDom, modifyCSS } from '@antv/dom-util';
import {
  IGroup,
  IShape,
  Element,
  HtmlTooltipTheme,
  TooltipCssConst,
  DEFAULT_ANIMATE_CFG,
  _ORIGIN,
} from '../../dependents';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ElementOption, DataItem, LineStyle, TextStyle } from '../../interface/config';
import './theme';
import './geometry/shape/funnel-basic-rect';
import './geometry/shape/funnel-dynamic-rect';
import './animation/funnel-scale-in-x';
import './animation/funnel-scale-in-y';
import { mappingColor, rgb2arr } from '../../util/color';

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
      style: LineStyle;
    }>;
    text: Partial<{
      visible: boolean;
      content: string;
      style: TextStyle;
    }>;
    value: Partial<{
      visible: boolean;
      style: TextStyle;
      formatter: (yValueUpper: any, yValueLower: any) => string;
    }>;
    offsetX: number;
    offsetY: number;
    spacing: number;
  }>;
  transpose?: boolean;
  dynamicHeight?: boolean;
  compareField?: string;
  compareText?: Partial<{
    visible: boolean;
    offsetX: number;
    offsetY: number;
    style: TextStyle;
  }>;
}

export interface FunnelLayerConfig extends FunnelViewConfig, LayerConfig {}

export default class FunnelLayer<T extends FunnelLayerConfig = FunnelLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(props?: Partial<FunnelViewConfig>): Partial<FunnelViewConfig> {
    const cfg: Partial<FunnelViewConfig> = {
      label: {
        visible: true,
        adjustColor: true,
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
        showCrosshairs: false,
        showMarkers: false,
      },
      animation: deepMix({}, DEFAULT_ANIMATE_CFG, {
        appear: {
          duration: 800,
        },
      }),
      dynamicHeight: false,
      compareText: {
        visible: true,
        offsetX: -16,
        offsetY: -16,
        style: {
          fill: 'black',
        },
      },
      legend: {
        position: 'bottom-center',
      },
      interactions: [{ type: 'tooltip' }, { type: 'legend-filter' }],
    };
    return deepMix({}, super.getDefaultOptions(), cfg);
  }

  public readonly type: string = 'funnel';
  public funnel: any;

  private _animationAppearTimeoutHandler: any;
  private _shouldResetPercentages: boolean = true;
  private _shouldResetLabels: boolean = true;
  private _shouldResetCompareTexts: boolean = true;
  private _legendsListenerAttached: boolean = false;

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

  public getColorScale() {
    const { xField } = this.options;
    if (xField) {
      return this.view.getScaleByField(xField);
    }
  }

  protected coord() {
    const props = this.options;
    const coordConfig = {
      type: 'rect',
      actions: props.transpose
        ? props.dynamicHeight
          ? [['transpose'], ['scale', 1, -1]]
          : [['scale', 1, -1]]
        : props.dynamicHeight
        ? []
        : [['transpose'], ['scale', 1, -1]],
    };
    // @ts-ignore
    this.setConfig('coordinate', coordConfig);
  }

  protected axis(): void {
    this.setConfig('axes', false);
  }

  protected adjustFunnel(funnel: ElementOption) {
    const props = this.options;

    // @ts-ignore
    funnel.shape = props.dynamicHeight ? 'funnel-dynamic-rect' : 'funnel-basic-rect';

    funnel.color = {
      fields: [props.xField],
      values: props.color && (Array.isArray(props.color) ? props.color : [props.color]),
    };

    if (isFunction(props.funnelStyle)) {
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
      deepMix(props.tooltip, {
        htmlContent: (title, items) => {
          let clss, el, color, elMarker;

          clss = TooltipCssConst.CONTAINER_CLASS;
          el = createDom(`<div class="${clss}"></div>`);
          modifyCSS(el, HtmlTooltipTheme[clss]);
          const elRoot = el;

          if (title) {
            clss = TooltipCssConst.TITLE_CLASS;
            el = createDom(`<div class="${clss}"></div>`);
            modifyCSS(el, HtmlTooltipTheme[clss]);
            elRoot.appendChild(el);
            const elTitle = el;

            clss = TooltipCssConst.MARKER_CLASS;
            el = createDom(`<span class="${clss}"></span>`);
            modifyCSS(el, HtmlTooltipTheme[clss]);
            modifyCSS(el, { width: '10px', height: '10px' });
            elTitle.appendChild(el);
            elMarker = el;

            el = createDom(`<span>${title}</span>`);
            elTitle.appendChild(el);
          }

          if (items) {
            clss = TooltipCssConst.LIST_CLASS;
            el = createDom(`<ul class="${clss}"></ul>`);
            modifyCSS(el, HtmlTooltipTheme[clss]);
            elRoot.appendChild(el);
            const elList = el;

            items
              .reduce((pairs, item) => {
                if (!color) {
                  color = item.color;
                }
                const compareValues = get(item, 'point._origin.__compare__.compareValues');
                const yValues = get(item, 'point._origin.__compare__.yValues');
                yValues.forEach((yValue, i) => pairs.push([compareValues[i], yValue]));
                return pairs;
              }, [])
              .forEach(([compareValue, yValue], index) => {
                clss = TooltipCssConst.LIST_ITEM_CLASS;
                el = createDom(`<li class="${clss}" data-index=${index}></li>`);
                modifyCSS(el, HtmlTooltipTheme[clss]);
                elList.appendChild(el);
                const elListItem = el;

                clss = TooltipCssConst.NAME_CLASS;
                el = createDom(`<span class="${clss}">${compareValue}</span>`);
                modifyCSS(el, HtmlTooltipTheme[clss]);
                elListItem.appendChild(el);

                clss = TooltipCssConst.VALUE_CLASS;
                el = createDom(`<span class="${clss}">${yValue}</span>`);
                modifyCSS(el, HtmlTooltipTheme[clss]);
                elListItem.appendChild(el);
              });
          }

          if (color && elMarker) {
            modifyCSS(elMarker, { backgroundColor: color });
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
    this.adjustFunnel(funnel);
    this.funnel = funnel;
    this.setConfig('geometry', funnel);
    if (!props.compareField) {
      this.geometryTooltip();
    }
  }

  protected geometryTooltip() {
    const tooltipOptions = this.options.tooltip;
    if (tooltipOptions.fields) {
      if (!this.funnel.tooltip) {
        this.funnel.tooltip = {};
      }
      this.funnel.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      if (!this.funnel.tooltip) {
        this.funnel.tooltip = {};
      }
      this.funnel.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.funnel.tooltip.fields = [this.options.xField, this.options.yField];
      }
    }
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.funnel.animate = false;
    } else {
      const data = this.getData();
      const appearDuration = get(props, 'animation.appear.duration');
      const appearDurationEach = appearDuration / (data.length || 1);

      if (this._animationAppearTimeoutHandler) {
        clearTimeout(this._animationAppearTimeoutHandler);
        delete this._animationAppearTimeoutHandler;
      }
      this._animationAppearTimeoutHandler = setTimeout(() => {
        this.fadeInPercentages(appearDurationEach);
        if (props.compareField) {
          this.fadeInCompareTexts(appearDurationEach);
        }
        delete this._animationAppearTimeoutHandler;
      }, appearDuration);

      this.funnel.animate = deepMix({}, props.animation, {
        appear: {
          animation: props.transpose ? 'funnelScaleInX' : 'funnelScaleInY',
          duration: appearDurationEach,
          delay: (datum) => findIndex(data, (o) => isEqual(o, datum)) * appearDurationEach,
          callback: (shape) => {
            this.fadeInLabels(shape, 0.5 * appearDurationEach);
          },
        },
        enter: {
          animation: 'fade-in',
        },
      });
    }
  }

  public afterRender() {
    const props = this.options;
    this.resetLabels();
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

    if (props.animation === false) {
      this.fadeInLabels();
      this.fadeInPercentages();
      if (props.compareField) {
        this.fadeInCompareTexts();
      }
    }

    if (!this._legendsListenerAttached) {
      this._legendsListenerAttached = true;
      // @ts-ignore
      const legendContainer = this.view.getController('legend').container;
      legendContainer.on('mousedown', this._onLegendContainerMouseDown);
    }
  }

  public updateConfig(cfg: Partial<T>): void {
    cfg = this.adjustProps(cfg);
    super.updateConfig(cfg);
    this._legendsListenerAttached = false;
  }

  public changeData(data: DataItem[]): void {
    const props = this.options;

    if (props.animation !== false) {
      this._shouldResetPercentages = false;
      this._shouldResetLabels = false;
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
    this.refreshLabels();
    if (props.compareField) {
      this.fadeInCompareTexts();
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected adjustProps(props: Partial<T>) {
    if (props.compareField) {
      props.dynamicHeight = false;
    }

    if (props.dynamicHeight) {
      set(props, `meta.${props.yField}.nice`, false);
      set(props, 'tooltip.shared', false);
    }
    return props;
  }

  protected resetPercentages() {
    if (!this._shouldResetPercentages) return;

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

    this._eachShape((shape, index, datumLower, datumUpper) => {
      if (index > 0) {
        const { minX, maxX, maxY, minY } = shape.getBBox();
        const x1 = props.transpose ? minX : maxX;
        const y1 = props.transpose ? (props.compareField ? maxY : minY) : minY;

        const { line, text, value } = this._findPercentageMembersInContainerByIndex(container, index, true);

        const eachProcs = [
          (x, y, line, text, value) => {
            if (line) {
              line.attr(
                deepMix({}, percentageLine.style, {
                  x1: x,
                  y1: y,
                  x2: props.transpose ? x + offsetX : x - offsetX,
                  y2: props.transpose ? y - offsetY : y + offsetY,
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
                  deepMix({}, percentageText.style, {
                    x: props.transpose ? x + offsetX : x - offsetX - spacing - valueWidth - spacing,
                    y: props.transpose ? y - offsetY - spacing : y + offsetY,
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
                  deepMix({}, percentageValue.style, {
                    x: props.transpose ? x + offsetX + textWidth + spacing : x - offsetX - spacing,
                    y: props.transpose ? y - offsetY - spacing : y + offsetY,
                    opacity: 0,
                    text: isFunction(percentageValue.formatter)
                      ? props.compareField
                        ? percentageValue.formatter(
                            get(datumUpper, '__compare__.yValues.0'),
                            get(datumLower, '__compare__.yValues.0')
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
                deepMix({}, percentageLine.style, {
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
                deepMix({}, percentageText.style, {
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
                deepMix({}, percentageValue.style, {
                  x: props.transpose ? x + offsetX + textWidth + spacing : x + offsetX + spacing + textWidth + spacing,
                  y: props.transpose
                    ? props.compareField
                      ? y + offsetY + spacing
                      : y - offsetY - spacing
                    : y + offsetY,
                  opacity: 0,
                  text: isFunction(percentageValue.formatter)
                    ? props.compareField
                      ? percentageValue.formatter(
                          get(datumUpper, `__compare__.yValues.1`),
                          get(datumLower, `__compare__.yValues.1`)
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
          const [x0, y0] = [minX, minY];
          [
            [x0, y0],
            [x1, y1],
          ].forEach(([x, y], i) => eachProcs[i](x, y, line && line[i], text && text[i], value && value[i]));
        } else {
          eachProcs[1](x1, y1, line, text, value);
        }
      }
      datumUpper = datumLower;
      index++;
    });

    container.get('children').forEach((child) => {
      if (child.get('adjustTimestamp') != adjustTimestamp) {
        child.attr({ opacity: 0 });
        container.set(child.get('id'), null);
        setTimeout(() => child.remove(), 0);
      }
    });
  }

  protected fadeInPercentages(duration?, callback?) {
    const props = this.options;
    const container = this._findPercentageContainer();

    const eachProc = (i?) => {
      const lastBBox = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
      this._eachShape((shape, index) => {
        const members = this._findPercentageMembersInContainerByIndex(container, index);

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
        each(members, (member) => (isArray(member) ? eachCalc(member[i]) : eachCalc(member)));

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
          each(members, (member) => (isArray(member) ? eachShow(member[i]) : eachShow(member)));
          assign(lastBBox, currBBox);
        }
      });
    };

    props.compareField ? [0, 1].forEach(eachProc) : eachProc();

    duration && callback && setTimeout(callback, duration);
  }

  protected fadeOutPercentages(duration?, callback?) {
    const container = this._findPercentageContainer();

    this._eachShape((shape, index) => {
      const members = this._findPercentageMembersInContainerByIndex(container, index);

      const eachProc = (member) => {
        if (member) {
          const attrs = {
            opacity: 0,
          };
          duration ? member.animate(attrs, duration) : member.attr(attrs);
        }
      };
      each(members, (member) => (isArray(member) ? member.forEach(eachProc) : eachProc(member)));
    });

    duration && callback && setTimeout(callback, duration);
  }

  protected refreshPercentages(callback?) {
    const props = this.options;

    if (props.animation !== false) {
      const { fadeOutDuration, fadeInDuration } = this._calcRefreshFadeDurations();

      this._shouldResetPercentages = false;
      this.fadeOutPercentages(fadeOutDuration, () => {
        this._shouldResetPercentages = true;
        this.resetPercentages();
        this.fadeInPercentages(fadeInDuration, callback);
      });
    }
  }

  private _findPercentageContainer(createIfNotFound: boolean = false): IGroup | undefined {
    const { middleGroup } = this.view;

    let percentageContainer = middleGroup.get('percentageContainer');
    if (!percentageContainer && createIfNotFound) {
      percentageContainer = middleGroup.addGroup();
      middleGroup.set('percentageContainer', percentageContainer);
    }

    return percentageContainer;
  }

  private _findPercentageMembersInContainerByIndex(
    container: IGroup,
    index: number,
    createIfNotFound: boolean = false
  ) {
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
        const lineId = `_percentage-line-${index}-${i}`;
        let line = container.get(lineId);
        if (!line && createIfNotFound) {
          line = container.addShape({ id: lineId, type: 'line', attrs: {} });
          container.set(lineId, line);
        }
        return line;
      };
      const line = props.compareField ? [0, 1].map(find) : find(0);
      members.line = line;
    }

    if (percentageText.visible !== false) {
      const find = (i) => {
        const textId = `_percentage-text-${index}-${i}`;
        let text = container.get(textId);
        if (!text && createIfNotFound) {
          text = container.addShape({ id: textId, type: 'text', attrs: {} });
          container.set(textId, text);
        }
        return text;
      };
      const text = props.compareField ? [0, 1].map(find) : find(0);
      members.text = text;
    }

    if (percentageValue.visible !== false) {
      const find = (i) => {
        const valueId = `_percentage-value-${index}-${i}`;
        let value = container.get(valueId);
        if (!value && createIfNotFound) {
          value = container.addShape({ id: valueId, type: 'text', attrs: {} });
          container.set(valueId, value);
        }
        return value;
      };
      const value = props.compareField ? [0, 1].map(find) : find(0);
      members.value = value;
    }

    return members;
  }

  private _calcRefreshFadeDurations() {
    const props = this.options;

    const updateDuration = get(props, 'animation.update.duration');
    const enterDuration = get(props, 'animation.enter.duration');
    const fadeInDuration = Math.min(enterDuration, updateDuration) * 0.6;
    const fadeOutDuration = Math.max(enterDuration, updateDuration) * 1.2;

    return { fadeInDuration, fadeOutDuration };
  }

  protected resetLabels() {
    if (!this._shouldResetLabels) return;
    const props = this.options;
    const { xField, yField } = props;

    const adjustTimestamp = Date.now();
    const { labelsContainer } = this._getGeometry();

    const labelProps = props.label || {};
    const labelStyle = deepMix(
      {
        ...this.theme.label,
      },
      props.label.style,
      {
        opacity: 0,
        textAlign: 'center',
        textBaseline: 'middle',
      }
    );

    let datumTop;
    this._eachShape((shape, index, datum, elementIndex) => {
      const element: Element = shape.get('element');
      if (index == 0) {
        datumTop = datum;
      }

      const { minX, maxX, minY, maxY } = shape.getBBox();
      const xValue = datum[xField];
      const yValue = datum[yField];

      if (labelProps.adjustColor) {
        labelStyle.fill = this._getAdjustedTextFillByShape(shape);
      }

      const compare = datum.__compare__;
      let content;
      const formatArgs = {
        [_ORIGIN]: datum,
        element,
        elementIndex,
        mappingDatum: [].concat(element.getModel().mappingData)[0],
        mappingDatumIndex: 0,
      };
      if (labelProps.formatter) {
        content = labelProps.formatter(xValue, formatArgs, index, yValue, datumTop[yField]);
      } else {
        if (compare) {
          content = [0, 1].map(() => `${yValue}`).join(props.transpose ? '\n\n' : '    ');
        } else {
          content = `${xValue} ${yValue}`;
        }
      }
      const label = this._findLabelInContainerByIndex(labelsContainer, index, true);
      const ratio = compare ? compare.yValues[0] / (compare.yValues[0] + compare.yValues[1]) : 0.5;
      if (label) {
        label.attr({
          ...labelStyle,
          x: lerp(minX, maxX, !props.transpose ? ratio : 0.5),
          y: lerp(minY, maxY, props.transpose ? ratio : 0.5),
          text: content,
        });

        label.set('adjustTimestamp', adjustTimestamp);
      }
    });

    labelsContainer.get('children').forEach((label) => {
      if (label.get('adjustTimestamp') != adjustTimestamp) {
        label.attr({ opacity: 0 });
        labelsContainer.set(label.get('id'), null);
        setTimeout(() => label.remove());
      }
    });
  }

  protected fadeInLabels(targetShape?, duration?, callback?) {
    const { labelsContainer } = this._getGeometry();
    this._eachShape((shape, index) => {
      if (!targetShape || targetShape == shape) {
        const label = this._findLabelInContainerByIndex(labelsContainer, index);
        if (label) {
          const shapeBBox = shape.getBBox();
          const labelBBox = label.getBBox();
          if (
            labelBBox.minX >= shapeBBox.minX &&
            labelBBox.maxX <= shapeBBox.maxX &&
            labelBBox.minY >= shapeBBox.minY &&
            labelBBox.maxY <= shapeBBox.maxY
          ) {
            const attrs = {
              opacity: 1,
            };
            duration ? label.animate(attrs, duration) : label.attr(attrs);
          }
        }
      }
    });

    duration && callback && setTimeout(callback, duration);
  }

  protected fadeOutLabels(targetShape?, duration?, callback?) {
    const { labelsContainer } = this._getGeometry();
    this._eachShape((shape, index) => {
      if (!targetShape || targetShape == shape) {
        const label = this._findLabelInContainerByIndex(labelsContainer, index);
        if (label) {
          const attrs = {
            opacity: 0,
          };
          duration ? label.animate(attrs, duration) : label.attr(attrs);
        }
      }
    });

    duration && callback && setTimeout(callback, duration);
  }

  protected refreshLabels(callback?) {
    const props = this.options;

    if (props.animation !== false) {
      const { fadeOutDuration, fadeInDuration } = this._calcRefreshFadeDurations();

      this._shouldResetLabels = false;
      this.fadeOutLabels(null, fadeOutDuration, () => {
        this._shouldResetLabels = true;
        this.resetLabels();
        this.fadeInLabels(null, fadeInDuration, callback);
      });
    }
  }

  private _findLabelInContainerByIndex(container: IGroup, index: number, createIfNotFound: boolean = false) {
    const props = this.options;

    let label;

    if (props.label?.visible === false) {
      return label;
    }

    const labelId = `_label-${index}`;
    label = container.get(labelId);
    if (!label && createIfNotFound) {
      label = container.addShape({
        id: labelId,
        type: 'text',
        attrs: {},
      });
      container.set(labelId, label);
    }

    return label;
  }

  protected resetCompareTexts() {
    if (!this._shouldResetCompareTexts) return;

    const props = this.options;

    let shapeParentBBox;
    let compare;
    this._eachShape((shape, index, datum) => {
      if (index == 0) {
        shapeParentBBox = shape.get('parent').getBBox();
        compare = get(datum, '__compare__');
      }
    });

    if (shapeParentBBox && compare && get(props, 'compareText.visible') !== false) {
      const container = this._findCompareTextContainer(true);
      const { yValuesMax, compareValues } = compare;
      const { minX, maxX, minY, maxY } = shapeParentBBox;

      const compareTexts = container.get('children');
      [0, 1].forEach((i) => {
        let compareText = compareTexts[i];
        if (!compareText) {
          compareText = container.addShape({ type: 'text' });
        }
        compareText.attr(
          deepMix({}, get(props, 'compareText.style'), {
            text: props.transpose ? compareValues[i] : i ? `  ${compareValues[i]}` : `${compareValues[i]}  `,
            x: props.transpose
              ? minX + get(props, 'compareText.offsetX')
              : lerp(minX, maxX, yValuesMax[0] / (yValuesMax[0] + yValuesMax[1])),
            y: props.transpose
              ? lerp(minY, maxY, yValuesMax[0] / (yValuesMax[0] + yValuesMax[1])) + (i ? 8 : -8)
              : minY + get(props, 'compareText.offsetY'),
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

      this._shouldResetCompareTexts = false;
      this.fadeOutCompareTexts(fadeOutDuration, () => {
        this._shouldResetCompareTexts = true;
        this.resetCompareTexts();
        this.fadeInCompareTexts(fadeInDuration, callback);
      });
    }
  }

  private _findCompareTextContainer(createIfNotFound: boolean = false) {
    const { middleGroup } = this.view;

    let compareTextContainer = middleGroup.get('compareTextContainer');
    if (!compareTextContainer && createIfNotFound) {
      compareTextContainer = middleGroup.addGroup();
      middleGroup.set('compareTextContainer', compareTextContainer);
    }

    return compareTextContainer;
  }

  private _eachShape(
    fn: (shape: IShape | IGroup, index: number, datumLower: any, datumUpper: any, elementIndex: number) => void
  ) {
    const data = this._findCheckedData(this.getData());
    const dataLen = data.length;
    let index = 0;
    let datumUpper;
    this._getGeometry()?.elements.forEach((element, elementIndex) => {
      const { shape } = element;
      const datumLower = data[index];
      if (index < dataLen) {
        fn(shape, index, datumLower, datumUpper, elementIndex);
      }
      datumUpper = datumLower;
      index++;
    });
  }

  private _getGeometry() {
    return this.view.geometries[0];
  }

  private _getAdjustedTextFillByShape(shape: IShape | IGroup) {
    const shapeColor = shape.attr('fill');
    const shapeOpacity = shape.attr('opacity') ? shape.attr('opacity') : 1;
    const rgb = rgb2arr(shapeColor);
    const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / shapeOpacity;
    const colorBand = [
      { from: 0, to: 85, color: 'white' },
      { from: 85, to: 170, color: '#F6F6F6' },
      { from: 170, to: 255, color: 'black' },
    ];
    const reflect = mappingColor(colorBand, gray);
    return reflect;
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

  private _findCheckedDataByMouseDownLegendItem(legendItem: IGroup) {
    const flags = legendItem
      .get('parent')
      .get('children')
      .map((legendItem) => !legendItem.get('unchecked'));

    const data = this.getData().filter((datum, index) => flags[index]);

    return data;
  }

  private _findCheckedDataInNewData(newData: any[]) {
    const props = this.options;

    // @ts-ignore
    const legendContainer = this.view.getController('legend').container;

    const uncheckedXValues = legendContainer
      .findAll((shape) => shape.get('name') == 'legend-item')
      .filter((legendItem) => legendItem.get('unchecked'))
      .map((legendItem) => legendItem.get('id').replace('-legend-item-', ''));

    const checkedData = newData.filter((datum) => !contains(uncheckedXValues, datum[props.xField]));

    return checkedData;
  }

  private _findCheckedData(data: any[]) {
    const props = this.options;

    if (props.legend?.visible) {
      // @ts-ignore
      const legendContainer = this.view.getController('legend').container;

      const checkedXValues = legendContainer
        .findAll((shape) => shape.get('name') == 'legend-item')
        .filter((legendItem) => !legendItem.get('unchecked'))
        .map((legendItem) => legendItem.get('id').replace('-legend-item-', ''));

      const checkedData = data.filter((datum) => contains(checkedXValues, datum[props.xField]));

      return checkedData;
    } else {
      return this.processData(props.data);
    }
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
      datum[props.yField] = get(datum, '__compare__.yValues', []).reduce((yTotal, yValue) => (yTotal += yValue), 0);
      set(datum, '__compare__.yValuesMax', yValuesMax);
      set(datum, '__compare__.yValuesNext', get(data, `${index + 1}.__compare__.yValues`));
    });

    return data;
  }

  private _updateDataForCompare(data: any[]) {
    const yValuesMax = [-Infinity, -Infinity];
    data.forEach((datum) => {
      const yValues = get(datum, '__compare__.yValues');
      [0, 1].forEach((i) => {
        if (yValues[i] > yValuesMax[i]) {
          yValuesMax[i] = yValues[i];
        }
      });
    });

    data.forEach((datum, index) => {
      set(datum, '__compare__.yValuesMax', yValuesMax);
      set(datum, '__compare__.yValuesNext', get(data, `${index + 1}.__compare__.yValues`));
    });
  }

  private _onLegendContainerMouseDown = (e) => {
    const props = this.options;

    const targetName = e.target.get('name');
    if (targetName.startsWith('legend-item')) {
      const legendItem = e.target.get('parent');
      legendItem.set('unchecked', !legendItem.get('unchecked'));

      this.refreshPercentages();
      this.refreshLabels();

      if (props.dynamicHeight) {
        const data = this._findCheckedDataByMouseDownLegendItem(legendItem);
        this._genCustomFieldForDynamicHeight(data);
      }

      if (props.compareField) {
        const data = this._findCheckedDataByMouseDownLegendItem(legendItem);
        this._updateDataForCompare(data);
        this.refreshCompareTexts();
      }
    }
  };
}

registerPlotType('funnel', FunnelLayer);
