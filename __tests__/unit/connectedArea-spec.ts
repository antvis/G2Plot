import { StackColumn } from '../../src';

describe('connectedArea components', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '400px';
  canvasDiv.style.height = '400px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  var data = [
    {
      time: '16 Q1',
      type: '移动游戏',
      value: 0,
    },
    {
      time: '16 Q1',
      type: '移动购物',
      value: 17.8,
    },
    {
      time: '16 Q1',
      type: '移动营销',
      value: 69.4,
    },
    {
      time: '16 Q1',
      type: '共享单车',
      value: 12.8,
    },
    {
      time: '16 Q2',
      type: '移动游戏',
      value: 0,
    },
    {
      time: '16 Q2',
      type: '移动购物',
      value: 18.1,
    },
    {
      time: '16 Q2',
      type: '移动营销',
      value: 70.7,
    },
    {
      time: '16 Q2',
      type: '共享单车',
      value: 11.2,
    },
    {
      time: '16 Q3',
      type: '移动游戏',
      value: 0,
    },
    {
      time: '16 Q3',
      type: '移动购物',
      value: 20.8,
    },
    {
      time: '16 Q3',
      type: '移动营销',
      value: 67.4,
    },
    {
      time: '16 Q3',
      type: '共享单车',
      value: 11.8,
    },
    {
      time: '16 Q4',
      type: '移动游戏',
      value: 0.1,
    },
    {
      time: '16 Q4',
      type: '移动购物',
      value: 20.3,
    },
    {
      time: '16 Q4',
      type: '移动营销',
      value: 69.2,
    },
    {
      time: '16 Q4',
      type: '共享单车',
      value: 10.4,
    },
    {
      time: '17 Q1',
      type: '移动游戏',
      value: 0.4,
    },
    {
      time: '17 Q1',
      type: '移动购物',
      value: 17.3,
    },
    {
      time: '17 Q1',
      type: '移动营销',
      value: 68.3,
    },
    {
      time: '17 Q1',
      type: '共享单车',
      value: 14,
    },
    {
      time: '17 Q2',
      type: '移动游戏',
      value: 1.2,
    },
    {
      time: '17 Q2',
      type: '移动购物',
      value: 18.3,
    },
    {
      time: '17 Q2',
      type: '移动营销',
      value: 68.6,
    },
    {
      time: '17 Q2',
      type: '共享单车',
      value: 11.9,
    },
  ];

  it('stackedColumn', () => {
    const columnPlot = new StackColumn(canvasDiv, {
      data,
      width: 400,
      height: 400,
      xField: 'time',
      yField: 'value',
      yAxis: {
        min: 0,
      },
      stackField: 'type',
      tooltip: {
        visible: false,
      },
      connectedArea: {
        visible: true,
        triggerOn: 'mouseenter',
        /*lineStyle:{
                  stroke:'#afb1b5',
                  opacity: 0.8
                },
                areaStyle:{
                  fill:'#e8e8e8',
                  opacity: 0.8
                }*/
      },
      /* defaultState: {
              active:{
                condition:{
                  name: 'type',
                  exp: '移动营销'
                },
                related:['connectedArea']
              },
              disables:{
                condition:{
                  name: 'type',
                  exp:(d)=>{
                    return d !== '移动营销';
                  }
                },
                related:['connectedArea']
              }
            }*/
    });
    columnPlot.render();
  });
});
