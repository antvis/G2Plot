import { get, isFunction } from '@antv/util';
import { animation, interaction, scale, state, theme, tooltip } from '../../adaptor/common';
import { point } from '../../adaptor/geometries';
import { Params } from '../../core/adaptor';
import { deepAssign, flow } from '../../utils';
import { WORD_CLOUD_COLOR_FIELD } from './constant';
import { WordCloudOptions } from './types';
import { transform } from './utils';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  const { chart, options } = params;
  const { colorField, color } = options;
  const data = transform(params);

  chart.data(data);

  const p = deepAssign({}, params, {
    options: {
      xField: 'x',
      yField: 'y',
      seriesField: colorField && WORD_CLOUD_COLOR_FIELD,
      rawFields: isFunction(color) && [...get(options, 'rawFields', []), 'datum'],
      point: {
        color,
        shape: 'word-cloud',
      },
    },
  });

  const { ext } = point(p);
  ext.geometry.label(false);

  chart.coordinate().reflect('y');
  chart.axis(false);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  return flow(
    scale({
      x: { nice: false },
      y: { nice: false },
    })
  )(params);
}

/**
 * 词云图 legend 配置
 * @param params
 */
export function legend(params: Params<WordCloudOptions>): Params<WordCloudOptions> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend === false) {
    chart.legend(false);
  } else if (colorField) {
    chart.legend(WORD_CLOUD_COLOR_FIELD, legend);
  }

  return params;
}

/**
 * 词云图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<WordCloudOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(geometry, meta, tooltip, legend, interaction, animation, theme, state)(params);
}
