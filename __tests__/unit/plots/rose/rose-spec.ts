/**
 * Create By Bruce Too
 * On 2020-02-17
 */
import { Rose } from '../../../../src';

describe('Rose Plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('Single Color', () => {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其它',
        value: 5,
      },
    ];
    const rosePlot = new Rose(canvasDiv, {
      forceFit: true,
      title: {
        visible: true,
        text: '单色玫瑰图',
      },
      description: {
        visible: true,
        text:
          '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。',
      },
      radius: 0.8,
      data,
      radiusField: 'value',
      categoryField: 'type',
      label: {
        visible: true,
        type: 'inner',
      },
    });
    rosePlot.render();
  });

  it('Multiple Group ', () => {
    const data = [
      {
        type: '分类一',
        value: 27,
        user: '用户一',
      },
      {
        type: '分类二',
        value: 25,
        user: '用户一',
      },
      {
        type: '分类三',
        value: 18,
        user: '用户一',
      },
      {
        type: '分类四',
        value: 25,
        user: '用户一',
      },
      {
        type: '分类五',
        value: 10,
        user: '用户一',
      },
      {
        type: '其它',
        value: 12,
        user: '用户一',
      },
      {
        type: '分类一',
        value: 17,
        user: '用户二',
      },
      {
        type: '分类二',
        value: 35,
        user: '用户二',
      },
      {
        type: '分类三',
        value: 28,
        user: '用户二',
      },
      {
        type: '分类四',
        value: 35,
        user: '用户二',
      },
      {
        type: '分类五',
        value: 20,
        user: '用户二',
      },
      {
        type: '其它',
        value: 15,
        user: '用户二',
      },
    ];

    const rosePlot = new Rose(canvasDiv, {
      forceFit: true,
      title: {
        visible: true,
        text: '分组玫瑰图',
      },
      description: {
        visible: true,
        text:
          '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。',
      },
      radius: 0.7,
      data,
      radiusField: 'value',
      categoryField: 'type',
      groupField: 'user',
      label: {
        visible: true,
        type: 'inner',
      },
      theme: {
        legend: {
          margin: [0, 0, 80, 0],
        },
      },
    });

    rosePlot.render();
  });

  it('Stack Rose', () => {
    const data = [
      {
        type: '分类一',
        value: 27,
        user: '用户一',
      },
      {
        type: '分类二',
        value: 25,
        user: '用户一',
      },
      {
        type: '分类三',
        value: 18,
        user: '用户一',
      },
      {
        type: '分类四',
        value: 15,
        user: '用户一',
      },
      {
        type: '分类五',
        value: 10,
        user: '用户一',
      },
      {
        type: '其它',
        value: 5,
        user: '用户一',
      },
      {
        type: '分类一',
        value: 7,
        user: '用户二',
      },
      {
        type: '分类二',
        value: 5,
        user: '用户二',
      },
      {
        type: '分类三',
        value: 38,
        user: '用户二',
      },
      {
        type: '分类四',
        value: 5,
        user: '用户二',
      },
      {
        type: '分类五',
        value: 20,
        user: '用户二',
      },
      {
        type: '其它',
        value: 15,
        user: '用户二',
      },
    ];

    const rosePlot = new Rose(canvasDiv, {
      forceFit: true,
      title: {
        visible: true,
        text: '堆叠玫瑰图',
      },
      description: {
        visible: true,
        text:
          '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。',
      },
      radius: 0.8,
      data,
      radiusField: 'value',
      categoryField: 'type',
      stackField: 'user',
      label: {
        visible: true,
        type: 'inner',
      },
    });

    rosePlot.render();
  });

  it('Multiple Color', () => {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其它',
        value: 5,
      },
    ];

    const rosePlot = new Rose(canvasDiv, {
      forceFit: true,
      title: {
        visible: true,
        text: '多色玫瑰图',
      },
      description: {
        visible: true,
        text:
          '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。',
      },
      radius: 0.8,
      data,
      radiusField: 'value',
      categoryField: 'type',
      colorField: 'type',
      label: {
        visible: true,
        type: 'outer',
        formatter: (text) => text,
      },
    });

    rosePlot.render();
  });
});
