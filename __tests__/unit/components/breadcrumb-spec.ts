import { Canvas, Group, Shape } from '@antv/g-canvas';
import { createDiv } from '../../utils/dom';
import Breadcrumb from '../../../src/components/breadcrumb';

describe('Breadcrumb', () => {
  const div = createDiv('canvas');
  const canvas = new Canvas({
    container: div,
    renderer: 'canvas',
    width: 400,
    height: 400,
  });

  const container = canvas.addGroup();

  const inst = new Breadcrumb({
    container,
    x: 20,
    y: 40,
    items: [
      {
        key: '1',
        text: 'Global',
      },
      {
        key: '2',
        text: 'China',
      },
    ],
  });

  it('basic render', () => {
    inst.render();
    const group = inst.getGroup();

    // x & y
    const matrix = group.attr('matrix');
    expect(matrix).toBeDefined();
    expect(matrix[6]).toBe(20);
    expect(matrix[7]).toBe(40);

    // item group rendered
    const itemGroup1: Group = group.findById('item-group-1');
    const itemGroup2: Group = group.findById('item-group-2');
    expect(itemGroup1).toBeInstanceOf(Group);
    expect(itemGroup2).toBeInstanceOf(Group);

    // text rendered
    const text1: Shape = itemGroup1.get('children').find((item) => item.get('id') === 'item-text-1');
    expect(text1).toBeDefined();
    expect(text1.attr('text')).toEqual('Global');
    const text2: Shape = itemGroup2.get('children').find((item) => item.get('id') === 'item-text-2');
    expect(text2).toBeDefined();
    expect(text2.attr('text')).toEqual('China');

    // separator rendered
    const seps: Shape[] = group.get('children').filter((item) => item.get('class') === 'separator');
    expect(seps).toHaveLength(1);
    expect(seps[0].attr('text')).toEqual('/');
  });

  it('update render', () => {
    inst.update({
      x: 80,
      y: 100,
      items: [
        {
          key: '1',
          text: 'Global',
        },
        {
          key: '2',
          text: 'China',
        },
        {
          key: '3',
          text: 'Hangzhou',
        },
      ],
    });
    const group = inst.getGroup();

    // x & y
    const matrix = group.attr('matrix');
    expect(matrix).toBeDefined();
    expect(matrix[6]).toBe(80);
    expect(matrix[7]).toBe(100);

    // item group rendered
    const itemGroup1: Group = group.findById('item-group-1');
    const itemGroup2: Group = group.findById('item-group-2');
    const itemGroup3: Group = group.findById('item-group-3');
    expect(itemGroup1).toBeInstanceOf(Group);
    expect(itemGroup2).toBeInstanceOf(Group);
    expect(itemGroup3).toBeInstanceOf(Group);

    // text rendered
    const text1: Shape = itemGroup1.get('children').find((item) => item.get('id') === 'item-text-1');
    expect(text1).toBeDefined();
    expect(text1.attr('text')).toEqual('Global');
    const text2: Shape = itemGroup2.get('children').find((item) => item.get('id') === 'item-text-2');
    expect(text2).toBeDefined();
    expect(text2.attr('text')).toEqual('China');
    const text3: Shape = itemGroup3.get('children').find((item) => item.get('id') === 'item-text-3');
    expect(text3).toBeDefined();
    expect(text3.attr('text')).toEqual('Hangzhou');

    // separator rendered
    const seps: Shape[] = group.get('children').filter((item) => item.get('class') === 'separator');
    expect(seps).toHaveLength(2);
    expect(seps[0].attr('text')).toEqual('/');
    expect(seps[1].attr('text')).toEqual('/');
  });

  it.skip('event', (done) => {
    const group = inst.getGroup();
    const itemGroup1: Group = group.findById('item-group-1');
    const itemGroup2: Group = group.findById('item-group-2');
    const itemGroup3: Group = group.findById('item-group-3');
    const text2: Shape = itemGroup2.get('children').find((item) => item.get('id') === 'item-text-2');
    const text3: Shape = itemGroup3.get('children').find((item) => item.get('id') === 'item-text-3');
    let cnt = 0;

    inst.on('onItemClick', (evt) => {
      if (cnt === 0) {
        expect(evt.item).toEqual({ key: '1', text: 'Global' });
      }
      if (cnt === 1) {
        expect(evt.item).toEqual({ key: '2', text: 'China' });
      }
      cnt += 1;
    });
    inst.on('onItemDblclick', (evt) => {
      if (cnt === 2) {
        expect(evt.item).toEqual({ key: '3', text: 'Hangzhou' });
      }
      if (cnt === 3) {
        expect(evt.item).toEqual({ key: '3', text: 'Hangzhou' });
        done();
      }
      cnt += 1;
    });

    itemGroup1.emit('click', {});
    text2.emit('click', {});
    itemGroup3.emit('dblclick', {});
    text3.emit('dblclick', {});
  });

  it('style', () => {
    inst.update({
      backgroundStyle: {
        stroke: '#ffffff',
        lineWidth: 1,
      },
      itemBackgroundStyle: {
        fill: '#00ff00',
        opacity: 0.2,
      },
      itemActiveBackgroundStyle: {
        fill: '#ff0000',
        opacity: 0.45,
      },
    });
  });

  it('destroy', () => {
    inst.destroy();
    expect(container.get('children')).toHaveLength(0);
  });
});
