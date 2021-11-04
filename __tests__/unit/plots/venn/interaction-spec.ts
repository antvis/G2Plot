import { IGroup } from '@antv/g-base';
import InteractionContext from '@antv/g2/lib/interaction/context';
import { Venn } from '../../../../src';
import { VennElementActive } from '../../../../src/plots/venn/interactions/actions/active';
import { VennElementHighlight } from '../../../../src/plots/venn/interactions/actions/highlight';
import {
  VennElementSelected,
  VennElementSingleSelected,
} from '../../../../src/plots/venn/interactions/actions/selected';
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
    // @ts-ignore
    const vennElementActive = new VennElementActive(context);

    // 模拟 active
    context.event = {
      target: plot.chart.getElements()[0].shape,
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
      target: plot.chart.getElements()[1].shape,
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

  it('venn-element-selected', () => {
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
    // @ts-ignore
    const vennElementSelected = new VennElementSelected(context);

    // 模拟 selected
    context.event = {
      target: plot.chart.getElements()[0].shape,
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
      target: plot.chart.getElements()[1].shape,
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

  it('venn-element-single-selected', () => {
    plot.update({
      state: {
        selected: {
          style: {
            lineWidth: 2,
          },
        },
      },
      interactions: [
        { type: 'venn-element-selected', enable: false },
        { type: 'venn-element-single-selected', enable: true },
      ],
    });

    const context = new InteractionContext(plot.chart);
    // @ts-ignore
    const vennElementSelected = new VennElementSingleSelected(context);

    // 模拟 selected
    context.event = {
      target: plot.chart.getElements()[0].shape,
    };
    vennElementSelected.selected();

    const elements = plot.chart.geometries[0].elements;

    // 第一个元素 点击 有样式
    expect(plot.getStates().length).toBe(1);
    expect(plot.getStates()[0].state).toBe('selected');
    expect(elements[0].getStates()[0]).toBe('selected');
    expect((elements[0].shape as IGroup).getChildren()[0].attr('lineWidth')).toBe(2);

    // 模拟 selected
    context.event = {
      target: plot.chart.getElements()[1].shape,
    };
    vennElementSelected.selected();
    expect(plot.getStates().length).toBe(1);
    expect(elements[0].getStates()[0]).toBeUndefined();
    expect((elements[0].shape as IGroup).getChildren()[0].attr('lineWidth')).toBe(0);
    expect(elements[1].getStates()[0]).toBe('selected');

    // 所有元素的 selected state 为 false
    vennElementSelected.reset();
    vennElementSelected.destroy();
  });

  it('venn-element-highlight', () => {
    plot.update({
      state: {
        inactive: {
          style: {
            fillOpacity: 0.3,
          },
        },
      },
      interactions: [
        { type: 'venn-element-single-selected', enable: false },
        { type: 'venn-element-active', enable: false },
        { type: 'venn-element-highlight', enable: true },
      ],
    });

    const context = new InteractionContext(plot.chart);
    // @ts-ignore
    const action = new VennElementHighlight(context);

    // 模拟 selected
    context.event = {
      target: plot.chart.getElements()[0].shape,
    };
    action.highlight();
    const elements = plot.chart.geometries[0].elements;
    // 第一个元素 点击 有样式
    expect(elements[0].getStates()[0]).toBe('active');
    expect((elements[0].shape as IGroup).getChildren()[0].attr('fillOpacity')).not.toBe(0.3);
    expect(elements[1].getStates()[0]).toBe('inactive');
    expect((elements[1].shape as IGroup).getChildren()[0].attr('fillOpacity')).toBe(0.3);
    action.toggle();

    context.event = {
      target: plot.chart.getElements()[1].shape,
    };
    action.toggle();
    expect(elements[0].getStates().includes('inactive')).toBe(true);
    expect((elements[0].shape as IGroup).getChildren()[0].attr('fillOpacity')).toBe(0.3);
    expect((elements[1].shape as IGroup).getChildren()[0].attr('fillOpacity')).not.toBe(0.3);

    action.destroy();
  });

  afterAll(() => {
    plot.destroy();
  });
});
