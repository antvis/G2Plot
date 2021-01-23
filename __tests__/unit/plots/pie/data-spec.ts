import { IGroup } from '@antv/g-base';
import { every } from '@antv/util';
import { Pie } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('饼图 异常数据', () => {
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
      radius: 0.8,
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

    pie.destroy();
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
      animation: false,
      // 移除 ellipsis
      label: { layout: [] },
      tooltip: {},
    });

    pie.render();

    const elements = pie.chart.geometries[0].elements;
    expect(elements.length).toBe(5);
    // @ts-ignore
    expect(every(elements, (ele) => ele.getBBox().width > 0)).toBe(true);
    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(every(labels, (label) => (label as IGroup).getChildren()[0].attr('text') === '0 个')).toBe(true);

    const positionFields = pie.chart.geometries[0].getAttribute('position').getFields();
    const point = pie.chart.getXY({ 1: data[0].type, [positionFields[1]]: 1 / data.length });
    const tooltipItems = pie.chart.getTooltipItems(point);
    expect(tooltipItems[1].value).toBe('0 个');

    pie.destroy();
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
      animation: false,
    });
    pie.render();

    let elements = pie.chart.geometries[0].elements;
    expect(elements.length).toBe(0);

    await delay(500);
    pie.changeData(data);

    elements = pie.chart.geometries[0].elements;
    expect(every(elements, (ele) => ele.getBBox().width > 0)).toBe(true);
    expect(elements.length).toBe(data.length);

    await delay(300);
    pie.update({
      ...pie.options,
      data: [{ type: '类型1', value: 1 }],
      meta: {},
    });

    elements = pie.chart.geometries[0].elements;
    expect(elements.length).toBe(1);
    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(every(labels, (label) => (label as IGroup).getChildren()[0].attr('text') === 1)).toBe(true);
    const point = pie.chart.getXY({ 1: '类型 1', value: 1 });
    const tooltipItems = pie.chart.getTooltipItems(point);
    expect(tooltipItems[0].value).toBe('1');

    pie.destroy();
  });
});

describe('数据存在 NaN', () => {
  const createPie = (data) => {
    const pie = new Pie(createDiv(), {
      angleField: 'value',
      colorField: 'type',
      data,
    });

    pie.render();
    return pie;
  };

  it('初始化存在 NaN', () => {
    const pie = createPie([
      { type: '1', value: NaN },
      { type: '2', value: 10 },
    ]);
    expect(pie.chart).toBeDefined();
    expect(pie.chart.getData()).toEqual([{ type: '2', value: 10 }]);
  });

  it('从正常数据 change 到存在 NaN', () => {
    const pie = createPie([{ type: '2', value: 10 }]);
    pie.changeData([{ type: '1', value: NaN }]);
    expect(pie.chart).toBeDefined();
    expect(pie.options.data).toEqual([{ type: '1', value: NaN }]);
    expect(pie.chart.getData()).toEqual([]);
  });

  it('从 [] change 到存在 NaN', () => {
    const pie = createPie([]);
    pie.changeData([{ type: '1', value: NaN }]);
    expect(pie.chart).toBeDefined();
    expect(pie.options.data).toEqual([{ type: '1', value: NaN }]);
    expect(pie.chart.getData()).toEqual([]);
  });

  it('从存在数据 0 change 到存在 NaN', () => {
    const pie = createPie([
      { type: '1', value: 0 },
      { type: '1', value: 0 },
    ]);
    expect(pie.chart.getData().length).toBe(2);
    pie.changeData([{ type: '1', value: NaN }]);
    expect(pie.chart).toBeDefined();
    expect(pie.options.data).toEqual([{ type: '1', value: NaN }]);
    expect(pie.chart.getData()).toEqual([]);

    pie.changeData([
      { type: '1', value: NaN },
      { type: '2', value: 0 },
    ]);
    expect(pie.chart.getData()[0]).toMatchObject({ type: '2', value: 0 });
    expect(pie.chart.geometries[0].elements.length).toEqual(1);
  });
});

describe('环图 changeData', () => {
  const createDonut = (data) => {
    const donut = new Pie(createDiv(), {
      angleField: 'value',
      colorField: 'type',
      data,
      innerRadius: 0.6,
      annotations: [{ type: 'text', content: 'xx', position: ['min', 'max'] }],
    });

    donut.render();
    return donut;
  };

  it('normal', () => {
    const donut = createDonut([]);
    expect(donut.chart.getController('annotation').getComponents().length).toBe(3);

    donut.changeData([
      { type: '1', value: 1 },
      { type: '2', value: 3 },
    ]);
    expect(donut.chart.getController('annotation').getComponents().length).toBe(3);
  });

  it('从数据全 0 到正常', () => {
    const donut = createDonut([
      { type: '1', value: 0 },
      { type: '2', value: 0 },
    ]);
    expect(donut.chart.getController('annotation').getComponents().length).toBe(3);

    donut.changeData([
      { type: '1', value: 1 },
      { type: '2', value: 3 },
    ]);
    expect(donut.chart.getController('annotation').getComponents().length).toBe(3);
  });
});
