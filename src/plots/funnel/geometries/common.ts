import { Geometry } from '@antv/g2';
import { LineOption } from '@antv/g2/lib/interface';
import { isFunction, deepMix } from '@antv/util';
import { Datum, Data } from '../../../types/common';
import { FUNNEL_PERCENT } from '../constant';
import { Params } from '../../../core/adaptor';
import { FunnelOptions, FunnelAdaptorOptions } from '../types';

export function geometryLabel(geometry: Geometry) {
  return function (params: Params<FunnelOptions>): Params<FunnelOptions> {
    const { options } = params;
    const { xField, yField, label } = options;
    if (!label) {
      geometry.label(false);
    } else {
      const { callback, ...cfg } = label;
      geometry.label({
        fields: [xField, yField, FUNNEL_PERCENT],
        callback,
        cfg,
      });
    }
    return params;
  };
}

export function conversionTagCom(getLineCoordinate: (datum: Datum, datumIndex: number, data: Data) => LineOption) {
  return function (params: Params<FunnelOptions>): Params<FunnelOptions> {
    const { chart, options } = params;
    const { conversionTag } = options;

    const { data } = chart.getOptions();

    if (conversionTag !== false) {
      const { formatter } = conversionTag;
      data.forEach((obj, index) => {
        if (index <= 0) return;
        const lineCoordinateOption = getLineCoordinate(obj, index, data);
        const lineOption = deepMix(
          {},
          {
            top: true,
            text: {
              content: isFunction(formatter) ? formatter(obj, data) : formatter,
              offsetX: 10,
              position: 'end',
              autoRotate: false,
              style: {
                textAlign: 'start',
                textBaseline: 'middle',
              },
            },
          },
          lineCoordinateOption
        );
        chart.annotation().line(lineOption);
      });
    }
    return params;
  };
}

/**
 * 转置处理, 适用于普通折线图，动态高度折线图
 * @param params
 */
export function transpose(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  // debugger;
  const { chart, options } = params;
  const { transpose } = options;
  if (!transpose) {
    chart.coordinate({
      type: 'rect',
      actions: [['transpose'], ['scale', 1, -1]],
    });
  } else {
    chart.coordinate({
      type: 'rect',
      actions: [],
    });
  }
  return params;
}
