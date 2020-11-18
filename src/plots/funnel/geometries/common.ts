import { Geometry } from '@antv/g2';
import { LineOption } from '@antv/g2/lib/interface';
import { isFunction } from '@antv/util';
import { Datum, Data } from '../../../types/common';
import { transformLabel } from '../../../utils';
import { FUNNEL_PERCENT, FUNNEL_CONVERSATION } from '../constant';
import { Params } from '../../../core/adaptor';
import { FunnelOptions } from '../types';

/**
 * 漏斗图通用geometry label
 * @param geometry 对应的 chart geometry
 */
export function geometryLabel(geometry: Geometry) {
  return function (params: Params<FunnelOptions>): Params<FunnelOptions> {
    const { options } = params;
    const { xField, yField, label } = options;
    if (!label) {
      geometry.label(false);
    } else {
      const { callback, ...cfg } = label;
      geometry.label({
        fields: [xField, yField, FUNNEL_PERCENT, FUNNEL_CONVERSATION],
        callback,
        cfg: transformLabel(cfg),
      });
    }
    return params;
  };
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
