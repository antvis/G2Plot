import { heatmapData } from '../data/heatmap';
import { Heatmap } from '../../src';

describe('heatmap layer',()=>{
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '500px';
    canvasDiv.style.height = '500px';
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);

    it('contour heatmap',()=>{
        const heatmap = new Heatmap(canvasDiv, {
            width: 500,
            height: 500,
            data: heatmapData,
            xField: 'g',
            yField: 'l',
            colorField:'tmp',
            legend:{
                visible: false
            },
            radius: 16
          });
          heatmap.render();
    });


});