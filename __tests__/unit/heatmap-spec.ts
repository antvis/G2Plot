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
            // theme: 'dark',
            width: 600,
            height: 600,
            data: heatmapData,
            xField: 'g',
            yField: 'l',
            colorField:'tmp',
            meta:{
                l:{
                    alias: 'latitude'
                },
                g: {
                    alias: 'longitude'
                }
            },
            legend:{
                visible: true,
                position: 'right-center',
            },
            radius: 10,
            intensity: 4,
            background:{
                type: 'image',
                src:'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png'
                //value: '#262626'
            }
          });
          heatmap.render();
    });
});