import { income } from '../data/income';
import { partySupport } from '../data/partySupport';
import { Line } from '../../src';

describe('responsive line label', () => {

  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '500px';
  canvasDiv.style.height = '500px';
  canvasDiv.style.backgroundColor = 'grey';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it.only('单折线标签布局', () => {
    const linePlot = new Line(canvasDiv, {
      title: {
        visible: true,
        text: '参与responsive layout的元素组，通常情况下，一个元素node（dimension），或一组元素nodes（layout）对响应式是有意义的。'
      },
      width: 500,
      height: 500,
      padding: 'auto',
      data: income,
      xField: 'time',
      yField: 'rate',
      label: {
        visible: true
      },
      xAxis: {
        type: 'dateTime',
        autoRotateLabel: false
      },
      tooltip: {
        visible: false
      },
      // responsive: true
    });
    linePlot.render();
    linePlot.updateConfig({
      title: false
    });
    linePlot.render();
  });

  it('多折线标签布局', () => {
    const linePlot = new Line(canvasDiv, {
      width: 400,
      height: 400,
      padding: 'auto',
      data: partySupport,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      label: {
        visible: true,
        style: {
          offset: 0
        }
      },
      xAxis: {
        type: 'dateTime',
        autoRotateLabel: false
      },
      legend: {
        position: 'right-center',
        flipPage: false
      },
      tooltip: {
        visible: false
      },
      responsive: true
    });
    linePlot.render();
  });

});
