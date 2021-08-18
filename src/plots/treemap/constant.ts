export const DEFAULT_OPTIONS = {
  // 默认按照 name 字段对颜色进行分类
  colorField: 'name',
  rectStyle: {
    lineWidth: 1,
    stroke: '#fff',
  },
  hierarchyConfig: {
    tile: 'treemapSquarify' as const,
  },
  label: {
    fields: ['name'],
    layout: {
      type: 'limit-in-shape',
    },
  },
  tooltip: {
    showMarkers: false,
    showTitle: false,
  },
  // 下钻交互配置，默认不开启
  drilldown: {
    enabled: false,
    breadCrumb: {
      position: 'bottom-left' as const,
      rootText: '初始',
      dividerText: '/',
      textStyle: {
        fontSize: 12,
        fill: 'rgba(0, 0, 0, 0.65)',
        cursor: 'pointer',
      },
      activeTextStyle: {
        fill: '#87B5FF',
      },
    },
  },
};
