/**
 * @author 五灵、小丛
 * @description 仪表盘标签展示
 */
import * as _ from 'lodash';
import './ValueLabel.scss';

interface RingStyle {
  thickness: number;
  /** 圆环半径  */
  radius: number;
  /** 图表主文案定位 hack */
  textPosition: string;
}

interface Option {
  type: 'standard' | 'fan' | 'meter';
  /** 主标签类型：占比 数值 */
  labelType: 'value' | 'percent';
  /** 是否显示副标签 */
  showSubLabel: boolean;
  /** 占比 小数点保留位数 */
  precision?: number;
  /** 副指标占比 小数点保留位数 */
  subPrecision?: number;
  /** 最大值 */
  maxValue: number;
  /** 最小值 */
  minValue: number;
  /** 指标描述 */
  description: string;
  /** 深浅主题色 */
  theme: 'light' | 'dark';
  /** 获取指标名称 */
  getName: Function;
  /** 获取指标格式化后数值 */
  getValue: Function;
}

interface Data {
  value: number;
  name: string;
}

/**
 * 仪表盘文本部分
 * 包括：主标签、副标签、最小值、最大值
 */

export class ValueLabel {
  chart: any;

  option: Option;

  style: RingStyle;

  data: Data;

  constructor(chart: any, data: Data, option: Option, style: RingStyle) {
    this.chart = chart;
    this.option = option;
    this.style = style;
    this.data = data;
  }

  /**
   * 范围数值
   * 数值的格式化方式与主指标配置保持一致
   */
  private renderSideText(value: number, textAlign: string, offsetX: number, offsetY: number, key: string) {
    const { getValue, theme } = this.option;
    const { radius } = this.style;
    const formatValue = getValue(key, value);
    const color = theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
    this.chart.guide().text({
      top: false,
      position: [textAlign === 'left' ? 'end' : 'start', radius],
      content: formatValue.toString(),
      style: {
        fill: color, // 文本颜色
        fontSize: '12', // 文本大小
        textAlign,
      },
      offsetX,
      offsetY,
    });
  }

  /**
   * 指标名称与指标数值
   */
  private renderCenterText(mainName: string, mainValue: string, subName: string, subValue: string) {
    const { showSubLabel, description, theme } = this.option;
    const { textPosition } = this.style;
    const color = theme === 'light' ? '#000' : '#fff';

    if (mainName) {
      this.chart.guide().html({
        position: ['50%', textPosition],
        html: `<div class="valueLabel" style="color: ${color};">
            <div class="valueLabelContainer">
              <span class="valueLabelMainName">${mainName}</span>
              ${
                description
                  ? `<div class="value-label-desc">
                <span class="value-label-content">${description}</span>
                <i aria-label="icon: info-circle" class="valueLabelDesc" ><svg viewBox="64 64 896 896" class="" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg></i>
              </div>`
                  : ''
              }
            </div>
            <div class="valueLabelMainValue">
                ${mainValue}
            </div>
            ${
              showSubLabel
                ? `<div class="valueLabelSubName">
                    ${subName}
                    <span class="valueLabelSubValue">${subValue}</span>
                  </div>`
                : ''
            }
          </div>`,
      });
    }
  }

  public render() {
    const { minValue, maxValue, labelType, type, getValue, getName, width, height } = this.option;
    const key = this.data.name;
    const size = Math.min(width, height);
    const value = getValue(key, this.data.value);
    let OFFSET_Y = 60;
    let LEFT_OFFSET = 65;
    let RIGHT_OFFSET = -65;
    if (type === 'fan' && size < 200) {
      OFFSET_Y = 35;
      LEFT_OFFSET = 45;
      RIGHT_OFFSET = -45;
    }
    const offsetY = type === 'fan' ? OFFSET_Y : -10;

    /** 左侧 最小值 */
    const leftOffset = type === 'fan' ? LEFT_OFFSET : -5;
    this.renderSideText(minValue, 'right', leftOffset, offsetY, key);

    /** 右侧 最大值 */
    const rightOffset = type === 'fan' ? RIGHT_OFFSET : 5;
    this.renderSideText(maxValue, 'left', rightOffset, offsetY, key);

    /** 占比 */
    const isShowPercent = labelType === 'percent';
    const percent = this.calculatePercent(this.data.value);

    /** 主指标 */
    const mainName = getName(key);
    const mainValue = isShowPercent ? percent : value;

    /** 副指标 */
    const subName = isShowPercent ? '实际: ' : '实际: ';
    const subValue = isShowPercent ? value : percent;

    this.renderCenterText(mainName, mainValue, subName, subValue);
  }

  /**
   * 计算占比
   */
  private calculatePercent(value: number) {
    const { minValue, maxValue, precision, labelType, subPrecision } = this.option;
    const isShowPercent = labelType === 'percent';
    const currentPrecision = isShowPercent ? precision : subPrecision;
    const percent = ((value - minValue) / (maxValue - minValue)) * 100;
    if (Number.isNaN(percent) || percent === Number.POSITIVE_INFINITY || percent === Number.NEGATIVE_INFINITY) {
      return '-';
    }
    return `${percent.toFixed(currentPrecision || 0)}%`;
  }
}
