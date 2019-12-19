import { heatmapData } from '../data/heatmap';
import { Heatmap } from '../../src';

describe.skip('heatmap layer', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('contour heatmap', () => {
    const heatmap = new Heatmap(canvasDiv, {
      width: 600,
      height: 600,
      data: heatmapData,
      xField: 'g',
      yField: 'l',
      colorField: 'tmp',
      color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c'],
      meta: {
        l: {
          alias: 'latitude',
        },
        g: {
          alias: 'longitude',
        },
      },
      legend: {
        visible: true,
        position: 'right-center',
      },
      radius: 10,
      intensity: 4,
      background: {
        type: 'image',
        src: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TU_aSrMV6KYAAAAAAAAAAABkARQnAQ',
        // value: '#262626'
      },
    });
    heatmap.render();
  });
});
