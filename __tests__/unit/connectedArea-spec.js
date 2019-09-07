import { StackColumn } from '../../src';


describe('connectedArea components',()=>{
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '400px';
    canvasDiv.style.height = '400px';
    canvasDiv.style.left = '30px';
    canvasDiv.style.top = '30px';
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);
  
    const data = [
      {
        year: '1991',
        value: 3,
        type: 'Lon',
      },
      {
        year: '1992',
        value: 4,
        type: 'Lon',
      },
      {
        year: '1993',
        value: 3.5,
        type: 'Lon',
      },
      {
        year: '1994',
        value: 5,
        type: 'Lon',
      },
      {
        year: '1995',
        value: 4.9,
        type: 'Lon',
      },
      {
        year: '1996',
        value: 6,
        type: 'Lon',
      },
      {
        year: '1997',
        value: 7,
        type: 'Lon',
      },
      {
        year: '1998',
        value: 9,
        type: 'Lon',
      },
      {
        year: '1999',
        value: 13,
        type: 'Lon',
      },
      {
        year: '1991',
        value: 3,
        type: 'Bor',
      },
      {
        year: '1992',
        value: 4,
        type: 'Bor',
      },
      {
        year: '1993',
        value: 3.5,
        type: 'Bor',
      },
      {
        year: '1994',
        value: 5,
        type: 'Bor',
      },
      {
        year: '1995',
        value: 4.9,
        type: 'Bor',
      },
      {
        year: '1996',
        value: 6,
        type: 'Bor',
      },
      {
        year: '1997',
        value: 7,
        type: 'Bor',
      },
      {
        year: '1998',
        value: 9,
        type: 'Bor',
      },
      {
        year: '1999',
        value: 13,
        type: 'Bor',
      },
    ];
  
    it('stackedColumn',()=>{
        const columnPlot = new StackColumn(canvasDiv, {
            data,
            width: 400,
            height: 400,
            xField: 'year',
            yField: 'value',
            yAxis: {
              min: 0,
            },
            stackField: 'type',
            connectedArea:{
                visible: true,
                // triggerOn:'mouseenter',
                /*lineStyle:{
                  stroke:'#afb1b5',
                  opacity: 0.8
                },
                areaStyle:{
                  fill:'#e8e8e8',
                  opacity: 0.8
                }*/
            },
            defaultState: {
              active:{
                condition:{
                  name: 'type',
                  exp: 'Lon'
                },
                related:['connectedArea']
              },
              disables:{
                condition:{
                  name: 'type',
                  exp:(d)=>{
                    return d !== 'Lon';
                  }
                },
                related:['connectedArea']
              }
            }
          });
          columnPlot.render();
    });

});