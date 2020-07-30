export const DEFAULT_TOOLTIP_OPTIONS = {
  showTitle: false,
  shared: true,
  showMarkers: false,
  containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
  itemTpl: '<span>{value}</span>',
  domStyles: {
    'g2-tooltip': {
      padding: '2px',
      fontSize: '10px',
    },
  },
};
