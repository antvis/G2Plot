import { Types } from '@antv/g2';
import { get, isFunction, isNumber, map, maxBy } from '@antv/util';
import { Params } from '../../../core/adaptor';
import { Data, Datum } from '../../../types/common';
import { FUNNEL_CONVERSATION, FUNNEL_MAPPING_VALUE, FUNNEL_PERCENT } from '../constant';
import { FunnelOptions } from '../types';

export const CONVERSION_TAG_NAME = 'CONVERSION_TAG_NAME';

/**
 * 漏斗图 transform
 * @param geometry
 */
export function transformData(
  data: FunnelOptions['data'],
  originData: FunnelOptions['data'],
  options: Pick<FunnelOptions, 'yField' | 'maxSize' | 'minSize'>
): FunnelOptions['data'] {
  let formatData = [];
  const { yField, maxSize, minSize } = options;
  const maxYFieldValue = get(maxBy(originData, yField), [yField]);
  const max = isNumber(maxSize) ? maxSize : 1;
  const min = isNumber(minSize) ? minSize : 0;

  // format 数据
  formatData = map(data, (row, index) => {
    const percent = (row[yField] || 0) / maxYFieldValue;
    row[FUNNEL_PERCENT] = percent;
    row[FUNNEL_MAPPING_VALUE] = (max - min) * percent + min;
    // 转化率数据存储前后数据
    row[FUNNEL_CONVERSATION] = [get(data, [index - 1, yField]), row[yField]];
    return row;
  });

  return formatData;
}

/**
 * 漏斗图通用转化率组件
 * @param getLineCoordinate 用于获取特定的 line 的位置及配置
 */
export function conversionTagComponent(
  getLineCoordinate: (
    datum: Datum,
    datumIndex: number,
    data: Data,
    initLineOption: Record<string, any>
  ) => Types.LineOption
) {
  return function (params: Params<FunnelOptions>): Params<FunnelOptions> {
    const { chart, options } = params;
    // @ts-ignore
    const { conversionTag, filteredData } = options;

    const data = filteredData || chart.getOptions().data;
    if (conversionTag) {
      const { formatter } = conversionTag;
      data.forEach((obj, index) => {
        if (index <= 0 || Number.isNaN(obj[FUNNEL_MAPPING_VALUE])) return;
        const lineOption = getLineCoordinate(obj, index, data, {
          top: true,
          name: CONVERSION_TAG_NAME,
          text: {
            content: isFunction(formatter) ? formatter(obj, data) : formatter,
            offsetX: conversionTag.offsetX,
            offsetY: conversionTag.offsetY,
            position: 'end',
            autoRotate: false,
            style: {
              textAlign: 'start',
              textBaseline: 'middle',
              ...conversionTag.style,
            },
          },
        });

        chart.annotation().line(lineOption);
      });
    }
    return params;
  };
}
