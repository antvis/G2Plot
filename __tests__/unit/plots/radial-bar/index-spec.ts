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
      ],
      xField: 'question',
      yField: 'percent',
      barStyle: {
        fill: 'red',
        fillOpacity: 0.6,
        cursor: 'pointer',
      },
      color: '#BAE7FF-#1890FF-#0050B3',
    });
    radialBar.render();
  });
});
