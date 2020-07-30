/**
 * 雷达图 半径轴 (yAxis) 默认配置
 */
export const RADAR_YAXIS_OPTIONS = {
  line: null,
  tickLine: null,
  grid: {
    line: {
      type: 'line',
      style: {
        lineDash: null,
      },
    },
  },
};

/**
 * 雷达图 角度轴 (xAxis) 默认配置
 */
export const RADAR_XAXIS_OPTIONS = {
  line: null,
  tickLine: null,
  grid: {
    line: {
      style: {
        lineDash: null,
      },
    },
  },
};

/**
 * 饼图 统计指标卡的 title 样式
 */
export const STATISTIC_TITLE_STYLE = { fontSize: 14, fontWeight: 300, fill: '#4D4D4D', textAlign: 'center' };

/**
 * 饼图 统计指标卡的 content 样式
 */
export const STATISTIC_CONTENT_STYLE = { fontSize: 21, fontWeight: 'bold', fill: '#4D4D4D', textAlign: 'center' };
