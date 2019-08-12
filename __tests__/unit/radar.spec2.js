import { Radar } from '../../src';

describe('radar plot', () => {
  const data = [
    {
      item: 'Design',
      user: 'a',
      score: 70,
    },
    {
      item: 'Design',
      user: 'b',
      score: 30
    },
    {
      item: 'Development',
      user: 'a',
      score: 60,
    },
    {
      item: 'Development',
      user: 'b',
      score: 70
    },
    {
      item: 'Marketing',
      user: 'a',
      score: 60
    },
    {
      item: 'Marketing',
      user: 'b',
      score: 50,
    },
    {
      item: 'Users',
      user: 'a',
      score: 40,
    },
    {
      item: 'Users',
      user: 'b',
      score: 50
    },
    {
      item: 'Test',
      user: 'a',
      score: 60,
    },
    {
      item: 'Test',
      user: 'b',
      score: 70
    },
    {
      item: 'Language',
      user: 'a',
      score: 70,
    },
    {
      item: 'Language',
      user: 'b',
      score: 50
    },
    {
      item: 'Technology',
      user: 'a',
      score: 50,
    },
    {
      item: 'Technology',
      user: 'b',
      score: 40
    },
    {
      item: 'Support',
      user: 'a',
      score: 30,
    },
    {
      item: 'Support',
      user: 'b',
      score: 40
    },
    {
      item: 'Sales',
      user: 'a',
      score: 60,
    },
    {
      item: 'Sales',
      user: 'b',
      score: 40
    },
    {
      item: 'UX',
      user: 'a',
      score: 50
    },
    {
      item: 'UX',
      user: 'b',
      score: 60
    } ];

  it('创建雷达图', () => {
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '400px';
    canvasDiv.style.height = '400px';
    canvasDiv.style.left = '30px';
    canvasDiv.style.top = '30px';
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);

    const radarPlot = new Radar(canvasDiv, {
      width: 400,
      height: 400,
      padding: 'auto',
      // smooth: 'true',
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      xAxis: {},
      yAxis: {},
      polygon: {
        visible: true
      },
      line: {
        visible: true,
      }
    });
    radarPlot.render();
  });

});
