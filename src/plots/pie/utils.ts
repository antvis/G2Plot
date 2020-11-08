import { Data } from '@antv/g2/lib/interface';
import { each, get, isString } from '@antv/util';
import { PieLabelType } from './types';

/**
 * 获取总计值
 * @param data
 * @param field
 */
export function getTotalValue(data: Data, field: string) {
  let total = null;
  each(data, (item) => {
    if (typeof item[field] === 'number') {
      total += item[field];
    }
  });
  return total;
}

/**
 * pie label offset adaptor
 */
export function adaptOffset(type: PieLabelType, offset?: string | number): string | number {
  let defaultOffset;
  switch (type) {
    case 'inner':
      defaultOffset = '-30%';
      if (isString(offset) && offset.endsWith('%')) {
        return parseFloat(offset) * 0.01 > 0 ? defaultOffset : offset;
      }
      return offset < 0 ? offset : defaultOffset;
    case 'outer':
      defaultOffset = 12;
      if (isString(offset) && offset.endsWith('%')) {
        return parseFloat(offset) * 0.01 < 0 ? defaultOffset : offset;
      }
      return offset > 0 ? offset : defaultOffset;
    default:
      return offset;
  }
}

/**
 * @desc simple kebabCase like lodash
 *
 * kebabCase('fooBar'); => 'foo-bar'
 */
export function kebabCase(word: string) {
  const result = word.match(/([A-Z]{0,1}[a-z]+[^A-Z])/g);
  return result
    ? result.reduce((a, b) => {
        return `${a ? `${a}-` : ''}` + b.toLowerCase();
      })
    : '';
}

export function generateStatisticStyle(width: number, style?: object) {
  let styleStr = `width:${width}px;text-align: center;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;`;
  each(style, (v, k) => {
    if (['fontSize'].includes(k)) {
      styleStr += `${kebabCase(k)}:${v}px;`;
    } else {
      styleStr += `${kebabCase(k)}:${v};`;
    }
  });
  if (!get(style, 'lineHeight')) {
    styleStr += 'line-height:1;';
  }
  return styleStr;
}
