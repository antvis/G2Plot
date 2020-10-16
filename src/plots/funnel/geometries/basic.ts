import { map } from '@antv/util';
import { LineOption } from '@antv/g2/lib/interface';
import { flow, findGeometry } from '../../../utils';
import { Params } from '../../../core/adaptor';
import { Datum, Data } from '../../../types/common';
import { FunnelOptions } from '../types';
import { FUNNEL_PERCENT } from '../constant';
import { geometryLabel, conversionTagCom } from './common';

/**
 * 处理字段数据
 * @param params
 */
function field(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { data = [], yField } = options;
  let formatData = [];
  // format 数据
  if (data[0][yField]) {
    formatData = map(data, (row) => {
      if (row[yField] !== undefined) {
        row[FUNNEL_PERCENT] = Math.round((row[yField] / data[0][yField]) * 100) / 100;
      }
      return row;
    });
  }

  // 绘制漏斗图
  chart.data(formatData);
  return params;
}

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { xField, yField, color } = options;

  chart
    .interval()
    .adjust('symmetric')
    .position(`${xField}*${yField}*${FUNNEL_PERCENT}`)
    .shape('funnel')
    .color(xField, color);

  return params;
}

/**
 * 转置
 * @param params
 */
export function transpose(params: Params<FunnelOptions>): Params<FunnelOptions> {
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

/**
 * label 处理
 * @param params
 */
function label(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart } = params;

  geometryLabel(findGeometry(chart, 'interval'))(params);

  return params;
}

/**
 * 转化率组件
 * @param params
 */
function conversionTag(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { options } = params;
  const { yField } = options;

  const getLineCoordinate = (datum: Datum, datumIndex: number, data: Data): LineOption => {
    const percent = 1 - (1 - datum[FUNNEL_PERCENT]) / 2;
    return {
      start: [datumIndex - 0.5, data[0][yField] * percent],
      end: [datumIndex - 0.5, data[0][yField] * (percent + 0.05)],
    };
  };

  conversionTagCom(getLineCoordinate)(params);

  return params;
}

/**
 * 基础漏斗
 * @param chart
 * @param options
 */
export function basicFunnel(params: Params<FunnelOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(field, geometry, transpose, conversionTag, label)(params);
}
