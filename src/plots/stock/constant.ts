export const YFIELD = '##Candle_YFIELD##';

export const TREND_FIELD = 'trend';
export const TREND_UP = 'up';
export const TREND_DOWN = 'down';

export const TREND_COLOR = ['#ef5350', '#26a69a'];

/** tooltip 配置 */
export const DEFAULT_TOOLTIP_OPTIONS = {
  showTitle: false,
  showMarkers: false,
  showCrosshairs: true,
  shared: true,
  crosshairs: {
    type: 'xy',
    follow: true,
    text: { position: 'end' },
  },
  itemTpl:
    '<li class="g2-tooltip-list-item" data-index={index}>' +
    '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
    '{name}{value}</li>',
};

export const DEFAULT_GEOM_TOOLTIP_OPTIONS = (params) => {
  const { options } = params;
  const { xField, yField, meta = {} } = options;

  const [open, close, high, low] = yField;

  const openAlias = meta[open] ? meta[open].alias || open : open;
  const closeAlias = meta[close] ? meta[close].alias || open : close;
  const highAlias = meta[high] ? meta[high].alias || high : high;
  const lowAlias = meta[low] ? meta[low].alias || low : low;

  const rs = {
    // TODO: 动态字段
    fields: [xField, open, close, high, low],
    callback: (xFieldVal, openVal, closeVal, highVal, lowVal) => {
      const tpl = {
        name: xFieldVal,
        value: `
          <br><span data-label="${openAlias}" style="padding-left: 16px">${openAlias}：${openVal}</span>
          <br><span data-label="${closeAlias}" style="padding-left: 16px">${closeAlias}：${closeVal}</span>
          <br><span data-label="${highAlias}" style="padding-left: 16px">${highAlias}：${highVal}</span>
          <br><span data-label="${lowAlias}" style="padding-left: 16px">${lowAlias}：${lowVal}</span>
        `,
      };
      return tpl;
    },
  };
  return rs;
};
