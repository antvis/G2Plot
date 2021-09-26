import { IGroup } from '@antv/g-base';
import InteractionContext from '@antv/g2/lib/interaction/context';
import { Venn } from '../../../../src';
import { VennElementActive, VennElementSelected } from '../../../../src/plots/venn/interaction/action';
import { createDiv } from '../../../utils/dom';

describe('venn', () => {
  const data = [
    { sets: ['A'], size: 12, label: 'A' },
    { sets: ['B'], size: 12, label: 'B' },
    { sets: ['A', 'B'], size: 2, label: 'A&B' },
  ];

  const plot = new Venn(createDiv(), {
    data,
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
    legend: false,
    pointStyle: {
      lineWidth: 0,
      stroke: 'black',
    },
  });
  plot.render();

  it('venn: active', () => {
    plot.update({
      state: {
        active: {
          style: {
            lineWidth: 1,
          },
        },
      },
      interactions: [{ type: 'venn-element-active', enable: true }],
    });

    const context = new InteractionContext(plot.chart);
    const vennElementActive = new VennElementActive(context);

    // 模拟 active
    context.event = {
      data: {
        data: plot.chart.getData()[0],
      },
    };
    vennElementActive.active();

    const elements = plot.chart.geometries[0].elements;

    expect(plot.getStates().length).toBe(1);
    expect(plot.getStates()[0].state).toBe('active');
    expect(elements[0].getStates()[0]).toBe('active');
    expect((elements[0].shape as IGroup).getChildren()[0].attr('lineWidth')).toBe(1);

    vennElementActive.reset();
    expect(plot.getStates().length).toBe(0);

    // 模拟 第二次 active
    context.event = {
      data: {
        data: plot.chart.getData()[1],
      },
    };
    vennElementActive.active();

    expect(plot.getStates().length).toBe(1);
    expect(plot.getStates()[0].state).toBe('active');
    // 第一个元素 样式恢复
    expect(elements[0].getStates()[0]).toBeUndefined();
    expect((elements[0].shape as IGroup).getChildren()[0].attr('lineWidth')).toBe(0);

    // 第二个元素 有样式
    expect(elements[1].getStates()[0]).toBe('active');
    expect((elements[1].shape as IGroup).getChildren()[0].attr('lineWidth')).toBe(1);

    vennElementActive.reset();
    expect(plot.getStates().length).toBe(0);

    vennElementActive.destroy();
  });

  it('venn: selected', () => {
    plot.update({
      state: {
        selected: {
          style: {
            lineWidth: 2,
          },
        },
      },
      interactions: [
        { type: 'venn-element-active', enable: false },
        { type: 'venn-element-selected', enable: true },
      ],
    });

    const context = new InteractionContext(plot.chart);
    const vennElementSelected = new VennElementSelected(context);

    // 模拟 selected
    context.event = {
      data: {
        data: plot.chart.getData()[0],
      },
    };
    vennElementSelected.toggle();

    const elements = plot.chart.geometries[0].elements;

    // 第一个元素 点击 有样式
    expect(plot.getStates().length).toBe(1);
    expect(plot.getStates()[0].state).toBe('selected');
    expect(elements[0].getStates()[0]).toBe('selected');
    expect((elements[0].shape as IGroup).getChildren()[0].attr('lineWidth')).toBe(2);

    // 再次点击 取消 selected
    vennElementSelected.toggle();
    expect(plot.getStates().length).toBe(0);
    expect(elements[0].getStates()[0]).toBeUndefined();
    expect((elements[0].shape as IGroup).getChildren()[0].attr('lineWidth')).toBe(0);

    // 模拟第二个元素的 selected
    context.event = {
      data: {
        data: plot.chart.getData()[1],
      },
    };
    vennElementSelected.toggle();

    expect(plot.getStates().length).toBe(1);
    expect(plot.getStates()[0].state).toBe('selected');
    expect(elements[1].getStates()[0]).toBe('selected');
    expect((elements[1].shape as IGroup).getChildren()[0].attr('lineWidth')).toBe(2);

    // 所有元素的 selected state 为 false
    vennElementSelected.reset();
    expect(plot.getStates().length).toBe(0);
    expect(elements[0].getStates().length).toBe(0);
    expect(elements[1].getStates().length).toBe(0);
    expect(elements[2].getStates().length).toBe(0);

    vennElementSelected.destroy();
  });

  afterAll(() => {
    plot.destroy();
  });
});
