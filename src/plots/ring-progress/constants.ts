/**
 * 仪表盘默认配置项
 */
export const DEFAULT_OPTIONS = {
  percent: 0.2,
  innerRadius: 0.8,
  radius: 0.98,
  color: ['#FAAD14', '#E8EDF3'],
  statistic: {
    title: false as const,
    content: {
      style: {
        fontSize: '14px',
        fontWeight: 300,
        fill: '#4D4D4D',
        textAlign: 'center' as const,
        textBaseline: 'middle' as const,
      },
      formatter: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
    },
  },
  animation: {},
};
