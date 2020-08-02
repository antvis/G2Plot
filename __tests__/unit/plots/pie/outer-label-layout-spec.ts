import { IGroup } from '@antv/g-base';
import { deepMix } from '@antv/util';
import { Pie } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('pie-outer label', () => {
  it('50+ 标签', () => {
    const dom = createDiv();
    dom.style.border = '1px solid #999';
    const pie = new Pie(dom, {
      width: 400,
      height: 400,
      padding: [10, 10, 10, 10],
      data: CountryEconomy,
      angleField: 'Population',
      colorField: 'Country',
      radius: 0.6,
      label: {
        content: '{name}: {percentage}',
        labelLine: {
          // @ts-ignore
          smooth: false,
        },
        layout: { type: '' },
      },
      interactions: [{ name: 'element-active' }],
    });
    pie.render();

    const coordinate = pie.chart.getCoordinate();
    const center = coordinate.getCenter();

    let labels = pie.chart.geometries[0].labelsContainer.getChildren();
    let leftLabels = labels.filter((label) => label.attr('x') < center.x);
    if (leftLabels.length) {
      const minY = Math.min(...leftLabels.map((label) => label.getBBox().minY));
      const maxY = Math.max(...leftLabels.map((label) => label.getBBox().maxY));
      const labelHeight = (leftLabels[0] as IGroup).getChildren()[0].getBBox().height;
      // 未设置标签布局算法，标签总高度(labels.length * labelHeight) > 标签容器的总高度，发生遮挡
      expect(maxY - minY).not.toBeGreaterThanOrEqual(leftLabels.length * labelHeight);
    }

    pie.update({ ...pie.options, label: { layout: { type: 'pie-outer' } } });
    labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBeLessThan(CountryEconomy.length);
    leftLabels = labels.filter((label) => label.attr('x') < center.x);
    if (leftLabels.length) {
      const minY = Math.min(...leftLabels.map((label) => label.getBBox().minY));
      const maxY = Math.max(...leftLabels.map((label) => label.getBBox().maxY));
      const labelHeight = (leftLabels[0] as IGroup).getChildren()[0].getBBox().height;
      // 设置标签布局算法，可见的标签总高度(labels.length * labelHeight) <= 标签容器的总高度
      expect(maxY - minY).toBeGreaterThanOrEqual(leftLabels.length * labelHeight);
    }
  });

  it('50+ 标签: 平滑拉线', () => {
    const dom = createDiv();
    dom.style.border = '1px solid #999';
    const pie = new Pie(dom, {
      width: 400,
      height: 400,
      padding: [10, 10, 10, 10],
      data: CountryEconomy,
      angleField: 'Population',
      colorField: 'Country',
      radius: 0.6,
      label: {
        content: '{name}: {percentage}',
        layout: { type: 'pie-outer' },
      },
      interactions: [{ name: 'element-active' }],
    });
    pie.render();
    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBeLessThan(CountryEconomy.length);
  });

  it('标签: 第一象限密集', () => {
    let smooth = false;
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      padding: [10, 10, 10, 10],
      data: [
        { Country: '1', value: 10 },
        { Country: '2', value: 10 },
        { Country: '3', value: 1 },
        { Country: '4', value: 1 },
        { Country: '5', value: 1 },
        { Country: '6', value: 1 },
        { Country: '7', value: 1 },
        { Country: '8', value: 1 },
        { Country: '9', value: 100 },
        { Country: '10', value: 1 },
      ],
      angleField: 'value',
      colorField: 'Country',
      radius: 0.64,
      label: {
        content: '{name}: {percentage}',
        offset: 12,
        layout: { type: 'pie-outer' },
        // @ts-ignore
        labelHeight: 18,
        labelLine: {
          // @ts-ignore
          smooth,
        },
      },
      interactions: [
        {
          name: 'element-active',
        },
      ],
    });
    pie.render();

    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(10);

    document.body.addEventListener('click', () => {
      smooth = !smooth;
      pie.update(
        deepMix({}, pie.options, {
          label: { labelLine: { smooth } },
        })
      );
    });
  });

  it('标签: 第二象限密集', () => {
    let smooth = true;
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      padding: [10, 10, 10, 10],
      data: [
        { Country: '1', value: 10 },
        { Country: '2', value: 20 },
        { Country: '3', value: 5 },
        { Country: '4', value: 10 },
        { Country: '5', value: 1 },
        { Country: '5.0', value: 1 },
        { Country: '5.1', value: 1 },
        { Country: '5.2', value: 1 },
        { Country: '5.3', value: 5 },
        { Country: '5.4', value: 1 },
        { Country: '5.5', value: 1 },
        { Country: '5.6', value: 1 },
        { Country: '6', value: 1 },
        { Country: '7', value: 1 },
        { Country: '7.0', value: 50 },
        { Country: '8', value: 1 },
        { Country: '9', value: 1 },
        { Country: '10', value: 1 },
      ],
      angleField: 'value',
      colorField: 'Country',
      radius: 0.64,
      label: {
        content: '{name}: {percentage}',
        offset: 12,
        layout: { type: 'pie-outer' },
        // @ts-ignore
        labelHeight: 18,
        labelLine: {
          // @ts-ignore
          smooth,
        },
      },
      interactions: [
        {
          name: 'element-active',
        },
      ],
    });
    pie.render();

    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(18);

    document.body.addEventListener('click', () => {
      smooth = !smooth;
      pie.update(
        deepMix({}, pie.options, {
          label: { labelLine: { smooth } },
        })
      );
    });
  });

  it('标签: 第三象限密集 ①', () => {
    let smooth = false;
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      padding: [10, 10, 10, 10],
      data: [
        { Country: '1', value: 10 },
        { Country: '2', value: 50 },
        { Country: '3', value: 10 },
        { Country: '4', value: 10 },
        { Country: '5', value: 10 },
        { Country: '6', value: 1 },
        { Country: '7', value: 1 },
        { Country: '7.0', value: 50 },
        { Country: '8', value: 1 },
        { Country: '9', value: 1 },
        { Country: '10', value: 1 },
      ],
      angleField: 'value',
      colorField: 'Country',
      radius: 0.64,
      label: {
        content: '{name}: {percentage}',
        offset: 12,
        layout: { type: 'pie-outer' },
        // @ts-ignore
        labelHeight: 18,
        labelLine: {
          // @ts-ignore
          smooth,
        },
      },
      interactions: [
        {
          name: 'element-active',
        },
      ],
    });
    pie.render();

    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(11);

    document.body.addEventListener('click', () => {
      smooth = !smooth;
      pie.update(
        deepMix({}, pie.options, {
          // @ts-ignore
          label: { labelLine: { smooth } },
        })
      );
    });
  });

  it('标签: 第三象限密集 ②', () => {
    let smooth = false;
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      padding: [10, 10, 10, 10],
      data: [
        { Country: '1', value: 10 },
        { Country: '2', value: 10 },
        { Country: '2.0', value: 50 },
        { Country: '3', value: 1 },
        { Country: '4', value: 1 },
        { Country: '5', value: 1 },
        { Country: '6', value: 1 },
        { Country: '7', value: 1 },
        { Country: '8', value: 1 },
        { Country: '9', value: 50 },
        { Country: '10', value: 1 },
      ],
      angleField: 'value',
      colorField: 'Country',
      radius: 0.64,
      label: {
        content: '{name}: {percentage}',
        offset: 12,
        layout: { type: 'pie-outer' },
        // @ts-ignore
        labelHeight: 18,
        labelLine: {
          // @ts-ignore
          smooth,
        },
      },
      interactions: [
        {
          name: 'element-active',
        },
      ],
    });
    pie.render();

    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(11);

    document.body.addEventListener('click', () => {
      smooth = !smooth;
      pie.update(
        deepMix({}, pie.options, {
          // @ts-ignore
          label: { labelLine: { smooth } },
        })
      );
    });
  });

  it('标签: 第三象限密集, 延伸至第四象限', () => {
    let smooth = true;
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      padding: [10, 10, 10, 10],
      data: [
        { Country: '1', value: 10 },
        { Country: '2', value: 50 },
        { Country: '3', value: 10 },
        { Country: '4', value: 1 },
        { Country: '5', value: 1 },
        { Country: '5.0', value: 1 },
        { Country: '5.1', value: 1 },
        { Country: '5.2', value: 1 },
        { Country: '5.3', value: 1 },
        { Country: '5.4', value: 1 },
        { Country: '5.5', value: 1 },
        { Country: '5.6', value: 1 },
        { Country: '6', value: 1 },
        { Country: '7', value: 1 },
        { Country: '7.0', value: 50 },
        { Country: '8', value: 1 },
        { Country: '9', value: 1 },
        { Country: '10', value: 1 },
      ],
      angleField: 'value',
      colorField: 'Country',
      radius: 0.64,
      label: {
        content: '{name}: {percentage}',
        offset: 12,
        layout: { type: 'pie-outer' },
        // @ts-ignore
        labelHeight: 18,
        labelLine: {
          // @ts-ignore
          smooth,
        },
      },
      interactions: [
        {
          name: 'element-active',
        },
      ],
    });
    pie.render();

    const labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(18);

    document.body.addEventListener('click', () => {
      smooth = !smooth;
      pie.update(
        deepMix({}, pie.options, {
          // @ts-ignore
          label: { labelLine: { smooth } },
        })
      );
    });
  });
});
