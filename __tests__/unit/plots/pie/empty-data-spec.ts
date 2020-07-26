import { IGroup } from '@antv/g2/lib/dependents';
import { every } from '@antv/util';
import { Pie } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('饼图 数据全空', () => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({ type: `类型 ${i}`, value: 0 });
  }

  it('数据全部为 0', () => {
    const div = createDiv();
    div.id = '#1';
    const pie = new Pie(div, {
      width: 400,
      height: 400,
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        callback: (value) => {
          return {
            content: value,
          };
        },
      },
      tooltip: {},
    });

    pie.render();

    const elements = pie.chart.geometries[0].elements;
    expect(elements.length).toBe(5);
    expect(every(elements, (ele) => ele.getBBox().width > 0)).toBe(true);
    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(every(labels, (label) => (label as IGroup).getChildren()[0].attr('text') === 0)).toBe(true);
  });

  it('数据全部为 0, 设置 angleField meta', async () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      data,
      angleField: 'value',
      colorField: 'type',
      meta: {
        value: {
          formatter: (v) => `${v} 个`,
        },
      },
      label: {},
      tooltip: {},
    });

    pie.render();

    const elements = pie.chart.geometries[0].elements;
    expect(elements.length).toBe(5);
    expect(every(elements, (ele) => ele.getBBox().width > 0)).toBe(true);
    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(every(labels, (label) => (label as IGroup).getChildren()[0].attr('text') === '0 个')).toBe(true);
  });

  it('数据为 [], 延迟 3s 加载数据全为 0, 延迟 3s 加载数据正常', async () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      data: [],
      angleField: 'value',
      colorField: 'type',
      label: {
        callback: (value) => {
          return {
            content: value,
          };
        },
      },
      tooltip: {},
    });
    pie.render();

    let elements = pie.chart.geometries[0].elements;
    expect(elements.length).toBe(0);

    await delay(5000);
    pie.update({
      ...pie.options,
      data,
    });

    elements = pie.chart.geometries[0].elements;
    expect(every(elements, (ele) => ele.getBBox().width > 0)).toBe(true);
    expect(elements.length).toBe(data.length);

    await delay(3000);
    pie.update({
      ...pie.options,
      data: [{ type: '类型1', value: 1 }],
      meta: {},
    });

    elements = pie.chart.geometries[0].elements;
    expect(elements.length).toBe(1);
    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(every(labels, (label) => (label as IGroup).getChildren()[0].attr('text') === 1)).toBe(true);
  });
});
