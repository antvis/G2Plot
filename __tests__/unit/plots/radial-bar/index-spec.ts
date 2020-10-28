import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('radial-bar', () => {
  it('x*y', () => {
    const radialBar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: [
        { question: '问题 1', percent: 0.21 },
        { question: '问题 2', percent: 0.4 },
        { question: '问题 3', percent: 0.49 },
        { question: '问题 4', percent: 0.52 },
        { question: '问题 5', percent: 0.53 },
        { question: '问题 6', percent: 0.84 },
        { question: '问题 7', percent: 1.0 },
        { question: '问题 8', percent: 1.2 },
        { question: '问题 9', percent: 0.49 },
        { question: '问题 10', percent: 0.52 },
        { question: '问题 11', percent: 0.53 },
        { question: '问题 12', percent: 0.84 },
        { question: '问题 13', percent: 1.0 },
        { question: '问题 14', percent: 1.2 },
        { question: '问题 15', percent: 0.49 },
        { question: '问题 16', percent: 0.52 },
        { question: '问题 17', percent: 0.53 },
        { question: '问题 18', percent: 0.84 },
        { question: '问题 19', percent: 1.0 },
        { question: '问题 20', percent: 1.2 },
      ],
      xField: 'question',
      yField: 'percent',
      barStyle: {
        fill: 'red',
        fillOpacity: 0.6,
        cursor: 'pointer',
      },
      color: '#BAE7FF-#1890FF-#0050B3',
      tooltip: {
        showTitle: false,
        showCrosshairs: false,
      },
      xAxis: {
        line: {
          style: {
            lineWidth: 1,
            fill: 'red',
          },
        },
      },
    });
    radialBar.render();
  });
});
