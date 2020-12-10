import { Geometry } from '@antv/g2';
import { LineOption } from '@antv/g2/lib/interface';
import { isFunction, map, isNumber, maxBy } from '@antv/util';
import { Datum, Data } from '../../../types/common';
import { transformLabel } from '../../../utils';
import { FUNNEL_PERCENT, FUNNEL_CONVERSATION, FUNNEL_MAPPING_VALUE } from '../constant';
import { Params } from '../../../core/adaptor';
import { FunnelOptions } from '../types';

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
  const maxYFieldValue = maxBy(originData, yField)[yField];
  const max = isNumber(maxSize) ? maxSize : 1;
  const min = isNumber(minSize) ? minSize : 0;

  // format 数据
  formatData = map(data, (row, index) => {
    if (row[yField] !== undefined) {
      const percent = row[yField] / maxYFieldValue;
      row[FUNNEL_PERCENT] = percent;
      row[FUNNEL_MAPPING_VALUE] = (max - min) * percent + min;
      row[FUNNEL_CONVERSATION] = index === 0 ? 1 : row[yField] / data[index - 1][yField];
    }
    return row;
  });

  return formatData;
}

/**
 * 漏斗图通用转化率组件
 * @param getLineCoordinate 用于获取特定的 line 的位置及配置
 */
export function conversionTagComponent(
  getLineCoordinate: (datum: Datum, datumIndex: number, data: Data, initLineOption: Record<string, any>) => LineOption
) {
  return function (params: Params<FunnelOptions>): Params<FunnelOptions> {
    const { chart, options } = params;
    const { conversionTag } = options;

    const { data } = chart.getOptions();

    if (conversionTag) {
      const { formatter } = conversionTag;
      data.forEach((obj, index) => {
        if (index <= 0) return;
        const lineOption = getLineCoordinate(obj, index, data, {
          top: true,
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
