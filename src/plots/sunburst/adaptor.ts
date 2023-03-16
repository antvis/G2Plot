import { Types } from '@antv/g2';
import { get, isFunction, uniq } from '@antv/util';
import {
  animation,
  annotation,
  interaction as baseInteraction,
  legend,
  pattern,
  scale,
  theme,
} from '../../adaptor/common';
import { polygon as polygonAdaptor } from '../../adaptor/geometries';
import { Params } from '../../core/adaptor';
import { Datum } from '../../types';
import { deepAssign, findGeometry, flow, transformLabel } from '../../utils';
import { getAdjustAppendPadding } from '../../utils/padding';
import { RAW_FIELDS, SUNBURST_ANCESTOR_FIELD, SUNBURST_PATH_FIELD, SUNBURST_Y_FIELD } from './constant';
import { SunburstOptions } from './types';
import { transformData } from './utils';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;
  const { color, colorField = SUNBURST_ANCESTOR_FIELD, sunburstStyle, rawFields = [], shape } = options;
  const data = transformData(options);
  chart.data(data);

  // 特殊处理下样式，如果没有设置 fillOpacity 的时候，默认根据层级进行填充透明度
  let style;
  if (sunburstStyle) {
    style = (datum: Datum) => {
      return deepAssign(
        {},
        {
          fillOpacity: 0.85 ** datum.depth,
        },
        isFunction(sunburstStyle) ? sunburstStyle(datum) : sunburstStyle
      );
    };
  }

  // geometry
  polygonAdaptor(
    deepAssign({}, params, {
      options: {
        xField: 'x',
        yField: 'y',
        seriesField: colorField,
        rawFields: uniq([...RAW_FIELDS, ...rawFields]),
        polygon: {
          color,
          style,
          shape,
        },
      },
    })
  );

  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;
  const { label } = options;

  const geometry = findGeometry(chart, 'polygon');

  // 默认不展示，undefined 也不展示
  if (!label) {
    geometry.label(false);
  } else {
    const { fields = ['name'], callback, ...cfg } = label;
    geometry.label({
      fields,
      callback,
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coordinate(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;
  const { innerRadius, radius, reflect } = options;

  const coord = chart.coordinate({
    type: 'polar',
    cfg: {
      innerRadius,
      radius,
    },
  });
  if (reflect) {
    coord.reflect(reflect);
  }

  return params;
}
/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { options } = params;
  const { hierarchyConfig, meta } = options;

  return flow(
    scale(
      {},
      {
        [SUNBURST_Y_FIELD]: get(meta, get(hierarchyConfig, ['field'], 'value')),
      }
    )
  )(params);
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip === false) {
    chart.tooltip(false);
  } else {
    let tooltipOptions = tooltip;
    // 设置了 fields，就不进行 customItems 了; 设置 formatter 时，需要搭配 fields
    if (!get(tooltip, 'fields')) {
      tooltipOptions = deepAssign(
        {},
        {
          customItems: (items: Types.TooltipItem[]) =>
            items.map((item) => {
              const scales = get(chart.getOptions(), 'scales');
              const pathFormatter = get(scales, [SUNBURST_PATH_FIELD, 'formatter'], (v) => v);
              const valueFormatter = get(scales, [SUNBURST_Y_FIELD, 'formatter'], (v) => v);
              return {
                ...item,
                name: pathFormatter(item.data[SUNBURST_PATH_FIELD]),
                value: valueFormatter(item.data.value),
              };
            }),
        },
        tooltipOptions
      );
    }
    chart.tooltip(tooltipOptions);
  }

  return params;
}

function adaptorInteraction(options: SunburstOptions): SunburstOptions {
  const { drilldown, interactions = [] } = options;

  if (drilldown?.enabled) {
    return deepAssign({}, options, {
      interactions: [
        ...interactions,
        {
          type: 'drill-down',
          cfg: { drillDownConfig: drilldown, transformData },
        },
      ],
    });
  }
  return options;
}

/**
 * 交互配置
 * @param params
 * @returns
 */
function interaction(params: Params<SunburstOptions>): Params<SunburstOptions> {
  const { chart, options } = params;

  const { drilldown } = options;

  baseInteraction({
    chart,
    options: adaptorInteraction(options),
  });

  // 适应下钻交互面包屑
  if (drilldown?.enabled) {
    // 为面包屑留出 25px 的空间
    chart.appendPadding = getAdjustAppendPadding(chart.appendPadding, get(drilldown, ['breadCrumb', 'position']));
  }

  return params;
}

/**
 * 旭日图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<SunburstOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    theme,
    pattern('sunburstStyle'),
    geometry,
    axis,
    meta,
    legend,
    coordinate,
    tooltip,
    label,
    interaction,
    animation,
    annotation()
  )(params);
}
