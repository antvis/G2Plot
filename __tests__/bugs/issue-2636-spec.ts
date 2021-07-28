import { Bullet } from '../../src/plots/bullet';
import { createDiv } from '../utils/dom';

const data = [
  {
    title: 'Test data point',
    measures: [80],
    ranges: [100],
    target: 85,
  },
];

describe('#2636', () => {
  it('yAxisMax', () => {
    const bullet = new Bullet(createDiv('yAxisMax bullet'), {
      data,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      color: {
        range: '#f0efff',
        measure: '#5B8FF9',
        target: '#3D76DD',
      },
      xAxis: {
        line: null,
      },
      yAxis: {
        max: 200,
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const scales = chart.geometries[0].scales; // 拿到比例尺

    const scaleMeasureMax = scales.measures.max;
    expect(scaleMeasureMax).toBe(200);

    const scaleRangesMax = scales.ranges.max;
    expect(scaleRangesMax).toBe(200);

    const scaleTargetMax = scales.target.max;
    expect(scaleTargetMax).toBe(200);

    bullet.destroy();
  });
});
