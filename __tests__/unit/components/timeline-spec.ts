import { Bubble } from '../../../src';
import { lifeExpectancy as data } from '../../data/life-expectancy';

describe('timeline component', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('timeline create & destroy', () => {
    const bubblePlot = new Bubble(canvasDiv, {
      data,
      xField: 'income',
      yField: 'lifeExpectancy',
      colorField: 'country',
      sizeField: 'population',
      pointSize: [4, 80],
      width: 1000,
      height: 600,
      xAxis: {
        visible: true,
        label: {
          formatter: (value) => {
            return `$ ${value}`;
          },
        },
        title: {
          visible: true,
          text: '人均收入',
        },
        max: 100000,
        min: 300,
        nice: false,
        type: 'log',
      },
      yAxis: {
        visible: true,
        label: {
          formatter: (value) => {
            return `${value} 岁`;
          },
        },
        title: {
          visible: true,
          text: '人均寿命',
        },
        min: 0,
        max: 100,
      },
      tooltip: {
        visible: true,
        showTitle: true,
        titleField: 'country',
        fields: ['income', 'lifeExpectancy', 'population'],
      },
      legend: {
        visible: false,
      },
      label: {
        visible: true,
        field: 'country',
      },
      interactions: [
        {
          type: 'timeline',
          cfg: {
            field: 'year',
            key: 'country',
            loop: true,
          },
        },
      ],
    });
    bubblePlot.render();

    const layer = bubblePlot.getLayer();
    const interactions = layer.getInteractions();

    expect(interactions.length).toBe(1);

    const timeLineInteraction: any = interactions[0];

    expect(timeLineInteraction.interactionConfig.field).toBe('year');
    expect(timeLineInteraction.interactionConfig.key).toBe('country');
    expect(timeLineInteraction.interactionConfig.loop).toBe(true);

    expect(timeLineInteraction.timeLineConfig.ticks[0]).toBe(1800);
    expect(timeLineInteraction.timeLineConfig.ticks[timeLineInteraction.timeLineConfig.ticks.length - 1]).toBe(2015);

    bubblePlot.changeData(data.slice(0, 1000));

    expect(timeLineInteraction.timeLineConfig.ticks[timeLineInteraction.timeLineConfig.ticks.length - 1]).toBe(1987);

    bubblePlot.destroy();
  });
});
