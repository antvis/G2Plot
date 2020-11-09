export const LEFT_AXES_VIEW = 'left-axes-view';
export const RIGHT_AXES_VIEW = 'right-axes-view';

export const DEFAULT_YAXIS_CONFIG = {
  nice: true,
  label: {
    autoHide: true,
    autoRotate: false,
  },
};

export const DEFAULT_LEFT_YAXIS_CONFIG = {
  ...DEFAULT_YAXIS_CONFIG,
  position: 'left',
};

export const DEFAULT_RIGHT_YAXIS_CONFIG = {
  ...DEFAULT_YAXIS_CONFIG,
  position: 'right',
  grid: null,
};
