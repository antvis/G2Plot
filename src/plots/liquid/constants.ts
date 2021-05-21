/**
 * 水波图默认配置项
 */
export const DEFAULT_OPTIONS = {
  radius: 0.9,
  statistic: {
    title: false as const,
    content: {
      style: {
        opacity: 0.75,
        fontSize: '30px',
        lineHeight: '30px',
        textAlign: 'center',
      },
    },
  },
  outline: {
    border: 2,
    distance: 0,
  },
  wave: {
    count: 3,
    length: 192,
  },
  shape: 'circle',
};
