import { heatmapData } from '../data/heatmap';
import { Heatmap } from '../../src';

describe('heatmap layer',()=>{
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '600px';
    canvasDiv.style.height = '600px';
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);

    it('contour heatmap',()=>{
        const heatmap = new Heatmap(canvasDiv, {
            theme: 'dark',
            width: 600,
            height: 600,
            data: heatmapData,
            xField: 'g',
            yField: 'l',
            colorField:'tmp',
            legend:{
                visible: true,
            },
            radius: 10,
            intensity: 4,
          });
          heatmap.render();
    });
});