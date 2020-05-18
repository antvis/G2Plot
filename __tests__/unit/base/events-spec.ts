import { ICanvas } from '@antv/g-base';
import { Column } from '../../../src/index';

describe.skip('events', () => {
  const canvasDiv = document.createElement('div');
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

  it('beforerender & postrender', () => {
    const onBeforeRender = jest.fn();
    const onAfterRender = jest.fn();
    const plot = new Column(canvasDiv, {
      width: 800,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      events: {
        beforerender: onBeforeRender,
        afterrender: onAfterRender,
      },
    });
    plot.render();
    expect(onBeforeRender).toHaveBeenCalledTimes(1);
    expect(onAfterRender).toHaveBeenCalledTimes(1);
  });

  it('view events', () => {
    let onmousemove = false;
    let onmouseup = false;
    let onmousedown = false;
    let onclick = false;
    let ondblclick = false;
    let oncontextmenu = false;
    const columnPlot = new Column(canvasDiv, {
      width: 800,
      height: 600,
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
      events: {
        onViewMousemove: () => {
          onmousemove = true;
        },
        onViewMouseup: () => {
          onmouseup = true;
        },
        onViewMousedown: () => {
          onmousedown = true;
        },
        onViewClick: () => {
          onclick = true;
        },
        onViewDblclick: () => {
          ondblclick = true;
        },
        onViewContextmenu: () => {
          oncontextmenu = true;
        },
      },
    });
    columnPlot.render();
    const canvas = columnPlot.canvas;
    const el = canvas.get('el');
    simulateMouseEvent(el, 'mousemove', { clientX: 200, clientY: 10 });
    simulateMouseEvent(el, 'mousemove', { clientX: 200, clientY: 300 });
    simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, 110, 200));
    expect(onmousemove).toBe(true);
    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 10, 100));
    simulateMouseEvent(el, 'mouseup', getClientPoint(canvas, 100, 100));
    simulateMouseEvent(el, 'click', getClientPoint(canvas, 100, 100));
    simulateMouseEvent(el, 'dblclick', getClientPoint(canvas, 100, 100));
    simulateMouseEvent(el, 'contextmenu', getClientPoint(canvas, 100, 100));
    expect(onmousedown).toBe(true);
    expect(onmouseup).toBe(true);
    expect(onclick).toBe(true);
    expect(ondblclick).toBe(true);
    expect(oncontextmenu).toBe(true);
    columnPlot.destroy();
  });

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
      events: {
        onPlotMousemove: () => {
          onmousemove = true;
        },
        onPlotMouseup: () => {
          onmouseup = true;
        },
        onPlotMousedown: () => {
          onmousedown = true;
        },
        onPlotClick: () => {
          onclick = true;
        },
        onPlotDblclick: () => {
          ondblclick = true;
        },
        onPlotContextmenu: () => {
          oncontextmenu = true;
        },
      },
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
      events: {
        onLayerMousemove: () => {
          onmousemove = true;
        },
        onLayerMouseup: () => {
          onmouseup = true;
        },
        onLayerMousedown: () => {
          onmousedown = true;
        },
        onLayerClick: () => {
          onclick = true;
        },
        onLayerDblclick: () => {
          ondblclick = true;
        },
        onLayerContextmenu: () => {
          oncontextmenu = true;
        },
      },
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

  it('shape events & event info', () => {
    let onmousemove = false;
    let onmouseup = false;
    let onmousedown = false;
    let onmouseenter = false;
    let onmouseleave = false;
    let onclick = false;
    let ondblclick = false;
    let oncontextmenu = false;
    let eventObj;
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
      events: {
        onColumnMousemove: () => {
          onmousemove = true;
        },
        onColumnMouseup: () => {
          onmouseup = true;
        },
        onColumnMousedown: () => {
          onmousedown = true;
        },
        onColumnClick: (ev) => {
          eventObj = ev;
          onclick = true;
        },
        onColumnDblclick: () => {
          ondblclick = true;
        },
        onColumnContextmenu: () => {
          oncontextmenu = true;
        },
        onColumnMouseenter: () => {
          onmouseenter = true;
        },
        onColumnMouseleave: () => {
          onmouseleave = true;
        },
      },
    });
    columnPlot.render();
    const canvas = columnPlot.canvas;
    const el = canvas.get('el');
    const shapes = columnPlot.getLayers()[0].view.geometries[0].getShapes();
    const bbox = shapes[0].getBBox();
    simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, bbox.minX - 5, bbox.minY - 5));
    simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, bbox.minX + 5, bbox.minY + 5));
    simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, bbox.minX - 5, bbox.minY - 5));
    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, bbox.minX + 5, bbox.minY + 5));
    simulateMouseEvent(el, 'mouseup', getClientPoint(canvas, bbox.minX + 5, bbox.minY + 5));
    simulateMouseEvent(el, 'click', getClientPoint(canvas, bbox.minX + 5, bbox.minY + 5));
    simulateMouseEvent(el, 'dblclick', getClientPoint(canvas, bbox.minX + 5, bbox.minY + 5));
    simulateMouseEvent(el, 'contextmenu', getClientPoint(canvas, bbox.minX + 5, bbox.minY + 5));
    expect(onmouseenter).toBe(true);
    expect(onmousemove).toBe(true);
    expect(onmouseleave).toBe(true);
    expect(onmousedown).toBe(true);
    expect(onmouseup).toBe(true);
    expect(onclick).toBe(true);
    expect(ondblclick).toBe(true);
    expect(oncontextmenu).toBe(true);
    const clickPoint = { x: bbox.minX + 5, y: bbox.minY + 5 };
    const clickClientPoint = getClientPoint(canvas, bbox.minX + 5, bbox.minY + 5);
    expect(Math.floor(eventObj.x)).toBe(Math.floor(clickPoint.x));
    expect(Math.floor(eventObj.y)).toBe(Math.floor(clickPoint.y));
    expect(Math.floor(eventObj.clientX)).toBe(Math.floor(clickClientPoint.clientX));
    expect(Math.floor(eventObj.clientY)).toBe(Math.floor(clickClientPoint.clientY));
    expect(eventObj.data.year).toBe('1991');
    expect(eventObj.data.value).toBe(31);
    expect(eventObj.canvas).toBe(canvas);
    expect(eventObj.plot).toBe(columnPlot.getLayers()[0]);
    columnPlot.destroy();
  });

  it('mobile events', () => {
    let onTouchstart = false;
    let onTouchmove = false;
    let onTouchend = false;
    const columnPlot = new Column(canvasDiv, {
      padding: [0, 0, 0, 0],
      width: 800,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      label: {
        visible: true,
      },
      events: {
        onTouchstart: () => {
          onTouchstart = true;
        },
        onTouchmove: () => {
          onTouchmove = true;
        },
        onTouchend: () => {
          onTouchend = true;
        },
      },
    });
    columnPlot.render();
    const canvas = columnPlot.canvas;
    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 20, clientY: 10 }],
      },
    });
    canvas.emit('touchend', {
      name: 'touchend',
      originalEvent: {
        touches: [{ clientX: 30, clientY: 30 }],
      },
    });
    expect(onTouchstart).toBe(true);
    expect(onTouchmove).toBe(true);
    expect(onTouchend).toBe(true);
    columnPlot.destroy();
  });

  it.skip('mobile gesture: swipe', () => {
    let onSwipe = false;
    const columnPlot = new Column(canvasDiv, {
      padding: [0, 0, 0, 0],
      width: 800,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      label: {
        visible: true,
      },
      events: {
        onSwipe: () => {
          onSwipe = true;
        },
      },
    });
    columnPlot.render();
    const canvas = columnPlot.canvas;
    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 20, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 22, clientY: 13 }],
      },
    });

    canvas.emit('touchend', {
      name: 'touchend',
      originalEvent: {
        touches: [{ clientX: 150, clientY: 10 }],
      },
    });
    expect(onSwipe).toBe(true);
    columnPlot.destroy();
  });

  it('mobile gesture: pinch', () => {
    let onPinchstart = false;
    let onPinch = false;
    let onPinchend = false;
    const columnPlot = new Column(canvasDiv, {
      padding: [0, 0, 0, 0],
      width: 800,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      label: {
        visible: true,
      },
      events: {
        onPinchstart: () => {
          onPinchstart = true;
        },
        onPinch: () => {
          onPinch = true;
        },
        onPinchend: () => {
          onPinchend = true;
        },
      },
    });
    columnPlot.render();
    const canvas = columnPlot.canvas;
    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [
          { clientX: 20, clientY: 20 },
          { clientX: 25, clientY: 23 },
        ],
      },
    });
    canvas.emit('touchend', {
      name: 'touchend',
      originalEvent: {
        touches: [{ clientX: 30, clientY: 30 }],
      },
    });
    expect(onPinchstart).toBe(true);
    expect(onPinch).toBe(true);
    expect(onPinchend).toBe(true);
    columnPlot.destroy();
  });

  it('mobile gesture: press', async () => {
    let onPressstart = false;
    let onPress = false;
    const columnPlot = new Column(canvasDiv, {
      padding: [0, 0, 0, 0],
      width: 800,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      label: {
        visible: true,
      },
      events: {
        onPressstart: () => {
          onPressstart = true;
        },
        onPress: () => {
          onPress = true;
        },
      },
    });
    columnPlot.render();
    const canvas = columnPlot.canvas;
    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });

    await delay(260);
    expect(onPressstart).toBe(true);
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 50, clientY: 10 }],
      },
    });
    expect(onPress).toBe(true);
    columnPlot.destroy();
  });

  it('mobile gesture: pan', () => {
    let onPanstart = false;
    let onPan = false;
    let onPanend = false;
    const columnPlot = new Column(canvasDiv, {
      padding: [0, 0, 0, 0],
      width: 800,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      label: {
        visible: true,
      },
      events: {
        onPanstart: () => {
          onPanstart = true;
        },
        onPan: () => {
          onPan = true;
        },
        onPanend: () => {
          onPanend = true;
        },
      },
    });
    columnPlot.render();
    const canvas = columnPlot.canvas;
    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 20, clientY: 10 }],
      },
    });
    canvas.emit('touchend', {
      name: 'touchend',
      originalEvent: {
        touches: [{ clientX: 24, clientY: 20 }],
      },
    });
    expect(onPanstart).toBe(true);
    expect(onPan).toBe(true);
    expect(onPanend).toBe(true);
    columnPlot.destroy();
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

function delay(ms = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
