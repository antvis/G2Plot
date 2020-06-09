import { Pie } from '../../src';
import { createDiv, createTitle, createDiscription } from '../utils/dom';

describe('Bug 创建样例文件', () => {
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
      value: 12232328,
    },
    {
      type: '分类四',
      value: 12222225,
    },
    {
      type: '分类五',
      value: 12222220,
    },
    {
      type: '其它',
      value: 50000024,
    },
  ];
  const div = createDiv('bug-example');
  createTitle(div, 'Bug 创建样例文件');
  createDiscription(div, 'Bug 描述（这里详细说明一下 bug 内容）');
  const piePlot = new Pie(div, {
    padding: 'auto',
    radius: 1,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'outer',
    },
  });
  piePlot.render();
});
