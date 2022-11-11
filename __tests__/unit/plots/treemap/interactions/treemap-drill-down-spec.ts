import { getInteraction } from '@antv/g2';
import { IGroup, IShape } from '@antv/g2/lib/dependents';
import InteractionContext from '@antv/g2/lib/interaction/context';
import { Treemap } from '../../../../../src';
import {
  BREAD_CRUMB_NAME,
  DrillDownAction as TreemapDrillDownAction,
} from '../../../../../src/interactions/actions/drill-down';
import { transformData } from '../../../../../src/plots/treemap/utils';
import { createDiv } from '../../../../utils/dom';

const data = {
  name: 'root',
  children: [
    {
      name: '欧洲',
      children: [
        {
          name: '东欧',
          children: [
            {
              name: '俄罗斯',
              value: 6000,
            },
            {
              name: '波兰',
              value: 1000,
            },
          ],
        },
        {
          name: '西欧',
          children: [
            {
              name: '英国',
              value: 9000,
            },
            {
              name: '德国',
              value: 2000,
            },
          ],
        },
      ],
    },
    {
      name: '亚洲',
      children: [
        {
          name: '东亚',
          children: [
            {
              name: '中国',
              value: 4000,
            },
            {
              name: '日本',
              value: 2000,
            },
          ],
        },
      ],
    },
  ],
};

describe('drill-down intera', () => {
  it('drill-down is defined', () => {
    const treemapInteraction = getInteraction('treemap-drill-down');
    // 不再支持 treemap-drill-down，不过会兼容
    expect(treemapInteraction).not.toBeDefined();
    const interaction = getInteraction('drill-down');
    expect(interaction).toBeDefined();
  });

  it.skip('action test', async () => {
    const treemapPlot = new Treemap(createDiv(), {
      data,
      padding: 20,
      colorField: 'name',
      hierarchyConfig: {
        tile: 'treemapDice',
      },
      interactions: [
        {
          type: 'treemap-drill-down',
        },
      ],
      legend: {
        position: 'top-left',
      },
    });

    treemapPlot.render();

    // @ts-ignore
    const context = new InteractionContext(treemapPlot.chart);
    const drillDownAction = new TreemapDrillDownAction(context);

    // @ts-ignore
    expect(treemapPlot.chart.autoPadding.bottom).toBe(45);

    // 模拟一次点击
    context.event = {
      type: 'custom',
      data: {
        data: data.children[0],
      },
    };

    drillDownAction.click();

    // 测试下钻显示数据
    const nowData = treemapPlot.chart.getData();
    expect(nowData.length).toBe(2);
    expect(nowData[0].name).toBe('西欧');
    expect(nowData[1].name).toBe('东欧');
    expect(nowData[0].y).toEqual([1, 1, 0, 0]);
    expect(nowData[1].y).toEqual([1, 1, 0, 0]);

    // 再次模拟一次点击
    context.event = {
      type: 'custom',
      data: {
        data: {
          data: transformData({
            data: data.children[0].children[0],
            hierarchyConfig: treemapPlot.options.hierarchyConfig,
            colorField: treemapPlot.options.colorField,
            enableDrillDown: true,
          }),
        },
      },
    };

    drillDownAction.click();

    // 测试面包屑显示
    const breadCrumbGroup = treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0] as IGroup;
    const breadCrumbGroupChildren = breadCrumbGroup.getChildren() as IShape[];

    // 测试 面包屑位置
    treemapPlot.changeSize(400, 600);
    drillDownAction.resetPosition();
    const chartHeight = treemapPlot.chart.height;

    expect(breadCrumbGroup.getCanvasBBox().y).toBe(chartHeight - 20 - 20);

    expect(breadCrumbGroupChildren.length).toBe(5);
    const textArr = ['初始', '/', data.children[0].name, '/', data.children[0].children[0].name];
    breadCrumbGroupChildren.forEach((shape, index) => {
      expect(shape.cfg.type).toBe('text');
      expect(shape.attr('text')).toBe(textArr[index]);
    });

    // 测试面包屑 hover 效果
    breadCrumbGroupChildren[2].emit('mouseenter', {});
    expect(breadCrumbGroupChildren[2].attr('fill')).toBe('#87B5FF');

    breadCrumbGroupChildren[2].emit('mouseleave', {});
    expect(breadCrumbGroupChildren[2].attr('fill')).toBe('rgba(0, 0, 0, 0.65)');

    // 测试面包屑点击
    breadCrumbGroup.getChildren()[4].emit('click', {});
    const firstBreadData = treemapPlot.chart.getData();
    expect(firstBreadData.length).toBe(2);
    expect(firstBreadData[0].name).toBe('俄罗斯');
    expect(firstBreadData[1].name).toBe('波兰');
    // @ts-ignore
    expect(drillDownAction.historyCache.length).toBe(3);

    breadCrumbGroup.getChildren()[2].emit('click', {});
    const secondBreadData = treemapPlot.chart.getData();
    expect(secondBreadData.length).toBe(2);
    expect(secondBreadData[0].name).toBe('西欧');
    expect(secondBreadData[1].name).toBe('东欧');
    // @ts-ignore
    expect(drillDownAction.historyCache.length).toBe(2);

    breadCrumbGroup.getChildren()[0].emit('click', {});
    const thirdBreadData = treemapPlot.chart.getData();
    expect(thirdBreadData.length).toBe(2);
    expect(thirdBreadData[0].name).toBe('欧洲');
    expect(thirdBreadData[1].name).toBe('亚洲');
    // @ts-ignore
    expect(drillDownAction.historyCache.length).toBe(1);
    expect(breadCrumbGroup.cfg.visible).toBeFalsy();

    treemapPlot.destroy();
  });

  it('interaction switch', async () => {
    const treemapPlot = new Treemap(createDiv(), {
      data,
      padding: 20,
      colorField: 'name',
      interactions: [
        {
          type: 'treemap-drill-down',
        },
      ],
      legend: false,
    });

    treemapPlot.render();

    const context = new InteractionContext(treemapPlot.chart);
    const drillDownAction = new TreemapDrillDownAction(context);

    context.event = {
      type: 'custom',
      data: {
        // data: data.children[0],
        data: {
          data: transformData({
            data: data.children[0],
            hierarchyConfig: treemapPlot.options.hierarchyConfig,
            colorField: treemapPlot.options.colorField,
            enableDrillDown: true,
          }),
        },
      },
    };

    drillDownAction.click();

    treemapPlot.update({
      interactions: [
        { type: 'view-zoom', enable: true },
        { type: 'treemap-drill-down', enable: false },
      ],
    });

    // 更换 interactions 后，padding 正常
    // @ts-ignore
    expect(treemapPlot.chart.autoPadding.bottom).toBe(20);
    expect(treemapPlot.chart.getData().length).toBe(6);

    treemapPlot.destroy();
  });

  it('interaction reset and destory', async () => {
    const treemapPlot = new Treemap(createDiv(), {
      data,
      colorField: 'name',
      interactions: [
        {
          type: 'treemap-drill-down',
        },
      ],
      legend: false,
    });

    treemapPlot.render();

    const context = new InteractionContext(treemapPlot.chart);
    const drillDownAction = new TreemapDrillDownAction(context);

    // 模拟一次点击
    context.event = {
      type: 'custom',
      data: {
        // data: data.children[0],
        data: {
          data: transformData({
            data: data.children[0],
            hierarchyConfig: treemapPlot.options.hierarchyConfig,
            colorField: treemapPlot.options.colorField,
            enableDrillDown: true,
          }),
        },
      },
    };

    drillDownAction.click();

    drillDownAction.reset();

    // @ts-ignore
    expect(drillDownAction.historyCache).toEqual([]);
    // @ts-ignore
    expect(drillDownAction.breadCrumbGroup.cfg.visible).toBeFalsy();
    expect(treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0].cfg.visible).toBe(false);

    drillDownAction.click();

    expect(treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME).length).toBe(1);

    drillDownAction.destroy();

    expect(treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME).length).toBe(0);

    treemapPlot.destroy();
  });

  it('options: enableDrillDown', async () => {
    const treemapPlot = new Treemap(createDiv(), {
      data,
      colorField: 'name',
      drilldown: { enabled: true },
      legend: false,
    });

    treemapPlot.render();

    const context = new InteractionContext(treemapPlot.chart);
    const drillDownAction = new TreemapDrillDownAction(context);

    // 模拟一次点击
    context.event = {
      type: 'custom',
      data: {
        // data: data.children[0],
        data: {
          data: transformData({
            data: data.children[0],
            hierarchyConfig: treemapPlot.options.hierarchyConfig,
            colorField: treemapPlot.options.colorField,
            enableDrillDown: true,
          }),
        },
      },
    };

    drillDownAction.click();

    drillDownAction.reset();

    // @ts-ignore
    expect(drillDownAction.historyCache).toEqual([]);
    // @ts-ignore
    expect(drillDownAction.breadCrumbGroup.cfg.visible).toBeFalsy();
    expect(treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0].cfg.visible).toBe(false);

    drillDownAction.click();

    expect(treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME).length).toBe(1);

    drillDownAction.destroy();

    expect(treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME).length).toBe(0);

    treemapPlot.destroy();
  });

  it('options: drillDownConfig', async () => {
    const treemapPlot = new Treemap(createDiv(), {
      data,
      colorField: 'name',
      drilldown: {
        enabled: true,
        breadCrumb: { position: 'bottom-left', rootText: '面包根', textStyle: { fontSize: 28, fill: 'red' } },
      },
      legend: false,
    });

    treemapPlot.render();

    const context = new InteractionContext(treemapPlot.chart);
    const drillDownAction = new TreemapDrillDownAction(context, treemapPlot.options.drilldown.breadCrumb);

    // 模拟一次点击
    context.event = {
      type: 'custom',
      data: {
        // data: data.children[0],
        data: {
          data: transformData({
            data: data.children[0],
            hierarchyConfig: treemapPlot.options.hierarchyConfig,
            colorField: treemapPlot.options.colorField,
            enableDrillDown: true,
          }),
        },
      },
    };

    drillDownAction.click();

    const treemapBreadCrumb = treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0];
    // @ts-ignore
    const breadCrumbRoot = treemapBreadCrumb.getChildByIndex(0);
    expect(breadCrumbRoot.attr('text')).toBe('面包根');
    expect(breadCrumbRoot.attr('fontSize')).toBe(28);
    expect(breadCrumbRoot.attr('fill')).toBe('red');

    drillDownAction.destroy();

    expect(treemapPlot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME).length).toBe(0);

    treemapPlot.destroy();
  });
});
