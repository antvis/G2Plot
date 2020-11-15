import { RingProgress } from '@antv/g2plot';

const ringProgress = new RingProgress('container', {
  height: 100,
  width: 100,
  autoFit: false,
  percent: 0.6,
  color: ['#F4664A', '#E8EDF3'],
  innerRadius: 0.85,
  radius: 0.98,
  statistic: {
    title: {
      style: { color: '#363636', fontSize: '12px', lineHeight: '14px' },
      formatter: () => '进度',
    },
  },
});

ringProgress.render();
