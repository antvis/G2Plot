import { RangedBar } from '../../src';

describe('rangedBar plot',()=>{
    const data = [
        { x: '分类一', y: [ 76, 100 ] },
        { x: '分类二', y: [ 56, 108 ] },
        { x: '分类三', y: [ 38, 129 ] },
        { x: '分类四', y: [ 58, 155 ] },
        { x: '分类五', y: [ 45, 120 ] },
        { x: '分类六', y: [ 23, 99 ] },
        { x: '分类七', y: [ 18, 56 ] },
        { x: '分类八', y: [ 18, 34 ] }
    ];

    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '400px';
    canvasDiv.style.height = '300px';
    canvasDiv.style.left = '30px';
    canvasDiv.style.top = '30px';
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);

    it('初始化',()=>{
        const barPlot = new RangedBar(canvasDiv, {
            width: 400,
            height: 300,
            padding: 'auto',
            data,
            xField: 'y',
            yField: 'x',
            xAxis: {
              visible: true,
            },
            yAxis: {
              visible: true,
            },
            label:{
                visible: true
            }
          });
          barPlot.render();
    });

});