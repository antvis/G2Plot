import { Progress, RingProgress } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2203', () => {
  it('ringProgress', () => {
    const ringProgress = new RingProgress(createDiv(), {
      height: 100,
      width: 100,
      autoFit: false,
      percent: NaN,
      color: ['#5B8FF9', '#E8EDF3'],
    });

    ringProgress.render();

    expect(ringProgress.chart.getOptions().data[0].percent).toBe(0);
    ringProgress.destroy();
  });

  it('Progress', () => {
    const progress = new Progress(createDiv(), {
      height: 10,
      width: 100,
      autoFit: false,
      percent: NaN,
      color: ['#5B8FF9', '#E8EDF3'],
    });

    progress.render();

    expect(progress.chart.getOptions().data[0].percent).toBe(0);
    progress.destroy();
  });
});
