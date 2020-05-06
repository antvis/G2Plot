import { Canvas } from '@antv/g-canvas';
import { createDiv } from '../../utils/dom';
import TooltipIndicator from '../../../src/components/tooltip-indicator';

describe('TooltipIndicator', () => {
  const div = createDiv('canvas');
  const canvas = new Canvas({
    container: div,
    renderer: 'canvas',
    width: 500,
    height: 500,
  });
  // @ts-ignore
  window.__canvas__ = canvas;
  const container = canvas.addGroup();

  const tick = 100;
  for (let val = 0; val <= 500; val += tick) {
    canvas.addShape({
      type: 'line',
      attrs: {
        x1: val,
        y1: 0,
        x2: val,
        y2: 500,
        stroke: '#ccc',
        strokeOpacity: 0.5,
      },
    });
    canvas.addShape({
      type: 'line',
      attrs: {
        x1: 0,
        y1: val,
        x2: 500,
        y2: val,
        stroke: '#ccc',
        strokeOpacity: 0.5,
      },
    });
  }

  const inst = new TooltipIndicator({
    container,
    x: 0,
    y: 0,
    width: 500,
    title: {
      text: 'This is title.',
    },
    items: [
      {
        id: 'a',
        name: 'Text A',
        value: 11,
        color: 'red',
      },
      {
        id: 'b',
        name: 'Text B',
        value: 22,
        color: 'blue',
      },
      {
        id: 'c',
        name: 'Text C',
        value: 33,
        color: 'red',
      },
      {
        id: 'd',
        name: 'Text D',
        value: 44,
        color: 'blue',
      },
      {
        id: 'e',
        name: 'Text E',
        value: 55,
        color: 'red',
      },
      {
        id: 'f',
        name: 'Text f',
        value: 66,
        color: 'blue',
      },
      {
        id: 'g',
        name: 'Text G',
        value: 77,
        color: 'red',
      },
      {
        id: 'h',
        name: 'Text H',
        value: 88,
        color: 'blue',
      },
    ],
  });

  it('render', () => {
    inst.render();
    expect(inst).toBeDefined();
  });
});
