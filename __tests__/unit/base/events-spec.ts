import { ICanvas } from '@antv/g-base';
import { Column } from '../../../src/index';

describe('events', () => {
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
            value: 31,
        },
        {
            year: '1992',
            value: 41,
        },
        {
            year: '1993',
            value: 35,
        },
        {
            year: '1994',
            value: 55,
        },
        {
            year: '1995',
            value: 49,
        },
        {
            year: '1996',
            value: 15,
        },
        {
            year: '1997',
            value: 17,
        },
        {
            year: '1998',
            value: 29,
        },
        {
            year: '1999',
            value: 33,
        },
    ];

    it('plot events', () => {
        let onmousemove = false;
        let onmouseup = false;
        let onmousedown = false;
        let onclick = false;
        let ondblclick = false;
        let oncontextmenu = false;
        const columnPlot = new Column(canvasDiv, {
            data,
            xField: 'year',
            yField: 'value',
            title: {
              visible: true,
              text: '我是title',
            },
            description: {
              visible: true,
              text: '描述描述，柱状图，柱状图',
            },
            label: {
              visible: true,
            },
            events:{
                onPlotMousemove:()=>{
                    onmousemove = true;
                },
                onPlotMouseup:()=>{
                    onmouseup = true;
                },
                onPlotMousedown:()=>{
                    onmousedown = true;
                },
                onPlotClick:()=>{
                    onclick = true;
                },
                onPlotDblclick:()=>{
                    ondblclick = true;
                },
                onPlotContextmenu:()=>{
                    oncontextmenu = true;
                }
            }
          });
          columnPlot.render();
          const canvas = columnPlot.canvas;
          const el = canvas.get('el');
          simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, 16, 16));
          simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 16, 16));
          simulateMouseEvent(el, 'mouseup', getClientPoint(canvas, 16, 16));
          simulateMouseEvent(el, 'click', getClientPoint(canvas, 16, 16));
          simulateMouseEvent(el, 'dblclick', getClientPoint(canvas, 16, 16));
          simulateMouseEvent(el, 'contextmenu', getClientPoint(canvas, 16, 16));
          expect(onmousemove).toBe(true);
          expect(onmousedown).toBe(true);
          expect(onmouseup).toBe(true);
          expect(onclick).toBe(true);
          expect(ondblclick).toBe(true);
          expect(oncontextmenu).toBe(true);
          columnPlot.destroy();
    });

    it('layer events', () => {

    });

    it('view events', () => {

    });

    it('shape events', () => {

    });

    it('mobile events', () => {

    });

});

function simulateMouseEvent(dom, type, cfg) {
    const event = new MouseEvent(type, cfg);
    dom.dispatchEvent(event);
}

function getClientPoint(canvas: ICanvas, x: number, y: number) {
    const point = canvas.getClientByPoint(x, y);
    return {
        clientX: point.x,
        clientY: point.y,
    };
}