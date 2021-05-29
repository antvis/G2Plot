import { Violin } from '../../../../src';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin axis', () => {
  it('没有 seriesField', () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
    });

    violin.render();

    let axisController = violin.chart.views[0].getController('axis');
    expect(axisController.getComponents().length).toBe(4);

    violin.update({ xAxis: { grid: null } });
    axisController = violin.chart.views[0].getController('axis');
    expect(axisController.getComponents().length).toBe(3);

    violin.update({ xAxis: { title: { text: 'xx' } } });
    axisController = violin.chart.views[0].getController('axis');
    expect(axisController.getComponents()[0].component.get('title').text).toBe('xx');

    // 关闭 xAxis
    violin.update({ xAxis: false });
    axisController = violin.chart.views[0].getController('axis');
    expect(axisController.getComponents().length).toBe(2);

    violin.destroy();
  });

  it('有 seriesField', () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
      seriesField: 'species',
    });

    violin.render();
    let axisController = violin.chart.views[0].getController('axis');
    expect(axisController.getComponents().length).toBe(4);

    violin.update({ xAxis: { grid: null } });
    axisController = violin.chart.views[0].getController('axis');
    expect(axisController.getComponents().length).toBe(3);

    violin.update({ xAxis: { title: { text: 'xx' } } });
    axisController = violin.chart.views[0].getController('axis');
    expect(axisController.getComponents()[0].component.get('title').text).toBe('xx');

    // 关闭 xAxis
    violin.update({ xAxis: false });
    axisController = violin.chart.views[0].getController('axis');
    expect(axisController.getComponents().length).toBe(2);

    violin.destroy();
  });
});
