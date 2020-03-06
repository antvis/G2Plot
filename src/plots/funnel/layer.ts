import * as _ from '@antv/util';
import { IGroup, IShape } from '@antv/g-base';
import { DEFAULT_ANIMATE_CFG } from '@antv/g2/lib/animate';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ElementOption, DataItem } from '../../interface/config';
import { extractScale } from '../../util/scale';
import responsiveMethods from './apply-responsive';
import * as EventParser from './event';
import './theme';
import './geometry/shape/funnel-basic-rect';
import './animation/funnel-scale-in-y';
import { mappingColor, rgb2arr } from '../../util/color';

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
  compareText?: Partial<{
    visible: boolean;
    offsetX: number;
    offsetY: number;
    style: {};
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
        showCrosshairs: false,
        showMarkers: false,
      },
      animation: _.deepMix({}, DEFAULT_ANIMATE_CFG, {
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
        position: 'bottom',
      },
      interactions: [{ type: 'tooltip' }, { type: 'legend-filter' }],
    };
    return _.deepMix({}, super.getDefaultOptions(), cfg);
  }

  public readonly type: string = 'funnel';
  public funnel: any;

  private _animationAppearTimeoutHandler: any;
  private _shouldResetPercentages: boolean = true;
  private _shouldResetLabels: boolean = true;
  private _legendsListenerAttached: boolean = false;

  public beforeInit() {
    super.beforeInit();
    const props = this.options;
    /** 响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('preRender');
    }
  }

  public afterRender() {
    const props = this.options;
    /** 响应式 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('afterRender');
    }

    this.resetLabels();
    this.resetPercentages();

    if (props.padding == 'auto') {
      const percentageContainer = this._findPercentageContainer();
      if (percentageContainer) {
        this.paddingController.registerPadding(percentageContainer, 'inner', true);
      }
    }

    super.afterRender();

    if (props.animation === false) {
      this.fadeInPercentages();
    }

    if (!this._legendsListenerAttached) {
      this._legendsListenerAttached = true;
      // @ts-ignore
      const legendContainer = this.view.getController('legend').container;
      legendContainer.on('mousedown', this._onLegendContainerMouseDown);
    }
  }

  public updateConfig(cfg: Partial<T>): void {
    super.updateConfig(cfg);
    this._legendsListenerAttached = false;
  }

  public changeData(data: DataItem[]): void {
    const props = this.options;

    if (props.animation !== false) {
      this._shouldResetPercentages = false;
      this._shouldResetLabels = false;
    }

    super.changeData(data);

    this.refreshPercentages();
    this.refreshLabels();
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected coord() {
    const props = this.options;
    const coordConfig = {
      actions: [['transpose'], ['scale', 1, -1]],
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
    funnel.shape = 'funnel-basic-rect';

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

  protected addGeometry() {
    const props = this.options;
    const funnel = getGeom('interval', 'main', {
      positionFields: [props.dynamicHeight ? '_' : props.xField, props.yField],
      plot: this,
    });
    this.adjustFunnel(funnel);
    this.funnel = funnel;
    this.setConfig('geometry', funnel);
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.funnel.animate = false;
    } else {
      const data = this.getData();
      const appearDuration = _.get(props, 'animation.appear.duration');
      const appearDurationEach = appearDuration / (data.length || 1);

      if (this._animationAppearTimeoutHandler) {
        clearTimeout(this._animationAppearTimeoutHandler);
        delete this._animationAppearTimeoutHandler;
      }
      this._animationAppearTimeoutHandler = setTimeout(() => {
        this.fadeInPercentages(appearDurationEach);
        delete this._animationAppearTimeoutHandler;
      }, appearDuration);

      this.funnel.animate = _.deepMix({}, props.animation, {
        appear: {
          animation: 'funnelScaleInY',
          duration: appearDurationEach,
          delay: (datum) => _.findIndex(data, (o) => _.isEqual(o, datum)) * appearDurationEach,
          callback: (shape) => {
            this.fadeInLabels(shape, 0.5 * appearDurationEach);
          },
        },
        enter: {
          animation: 'fade-in'
        }
      });
    }
  }

  private _applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r;
      responsive.method(this);
    });
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
    const coord = this.view.getCoordinate();

    this._eachShape((shape, index, datumLower, datumUpper) => {
      if (index > 0) {
        const { minX, maxX, maxY, minY } = shape.getBBox();
        const x1 = props.transpose ? minX : maxX;
        const y1 = props.transpose ? (props.compareField ? maxY : minY) : props.dynamicHeight ? maxY : minY;

        const { line, text, value } = this._findPercentageMembersInContainerByIndex(container, index, true);

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
      index++;
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

        index++;
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
      _.each(members, (member) => (_.isArray(member) ? member.forEach(eachProc) : eachProc(member)));
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

    const updateDuration = _.get(props, 'animation.update.duration');
    const enterDuration = _.get(props, 'animation.enter.duration');
    const fadeInDuration = Math.min(enterDuration, updateDuration) * 0.7;
    const fadeOutDuration = Math.max(enterDuration, updateDuration) * 1.1;

    return { fadeInDuration, fadeOutDuration };
  }

  protected resetLabels() {
    if (!this._shouldResetLabels) return;

    const props = this.options;
    const { xField, yField } = props;
    const { labelsContainer } = this._getGeometry();

    const labelProps = props.label || {};
    const labelStyle = _.deepMix(
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
    const { formatter } = labelProps;

    let datumTop;
    this._eachShape((shape, index, datum) => {
      if (index == 0) datumTop = datum;
      const { minX, maxX, minY, maxY } = shape.getBBox();
      const xValue = datum[xField];
      const yValue = datum[yField];

      if (labelProps.adjustColor) {
        labelStyle.fill = this._getAdjustedTextFillByShape(shape);
      }

      const label = this._findLabelInContainerByIndex(labelsContainer, index, true);
      label.attr({
        ...labelStyle,
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        text: formatter ? formatter(xValue, shape, index, yValue, datumTop[yField]) : `${xValue} ${yValue}`,
      });
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

  private _eachShape(fn: (shape: IShape | IGroup, index: number, datumLower: any, datumUpper: any) => void) {
    const data = this.getData();
    const dataLen = data.length;
    let index = 0;
    let datumUpper;
    this._getGeometry()?.elements.forEach((element) => {
      const { shape } = element;
      const datumLower = data[index];
      if (index < dataLen) {
        fn(shape, index, datumLower, datumUpper);
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

  private _onLegendContainerMouseDown = (e) => {
    const props = this.options;

    if (e.target.get('name') == 'legend-item-name') {
      this.refreshPercentages();
      this.refreshLabels();
    }
  };
}

registerPlotType('funnel', FunnelLayer);
