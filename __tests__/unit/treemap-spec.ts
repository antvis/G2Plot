import { Treemap } from '../../src';
import { mobile } from '../data/mobile';
import { each } from '@antv/util';

describe('treemap',()=>{
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '800px';
    canvasDiv.style.height = '600px';
    canvasDiv.style.left = '30px';
    canvasDiv.style.top = '30px';
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);
    const data = processData(mobile);
    it('initilize',()=>{
        const piePlot = new Treemap(canvasDiv, {
            width: 800,
            height: 600,
            data,
            maxLevel:2
          });
          piePlot.render();
    });
});

function processData(data) {
    let sumValue = 0;
    each(data, (d) => {
      sumValue += d.value;
    });
  
    return { name: 'root', value: sumValue, children: data };
  }