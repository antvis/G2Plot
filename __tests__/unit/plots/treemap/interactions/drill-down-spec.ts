import { IGroup } from '@antv/g2';
import InteractionContext from '@antv/g2/lib/interaction/context';
import { Treemap } from '../../../../../src';
import { createDiv } from '../../../../utils/dom';
import { SIMPLE_SUNBURST_DATA } from '../../../../data/sunburst';
import {
  BREAD_CRUMB_NAME,
  DEFAULT_BREAD_CRUMB_CONFIG,
  DrillDownAction,
  PADDING_TOP,
} from '../../../../../src/interactions/actions/drill-down';

describe('sunburst: drill-down', () => {
  const div = createDiv();
  const plot = new Treemap(div, {
    data: SIMPLE_SUNBURST_DATA,
  });
  plot.render();

  it('default: drill-down is not enabled', () => {
    expect(plot.options.drilldown.enabled).toBe(false);

    plot.update({ drilldown: { enabled: true } });

    expect(plot.chart.interactions['drill-down']).toBeDefined();
    expect(plot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME).length).toBe(0);

    const context = new InteractionContext(plot.chart);
    const drillDownAction = new DrillDownAction(context);

    // 模拟一次点击(数据是降序的)
    context.event = {
      type: 'click',
      data: {
        data: plot.chart.getData()[0],
      },
    };

    drillDownAction.click();
    // 面包屑出现
    expect(plot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME).length).toBe(1);
    expect(plot.chart.getData().length).toBe(6);

    drillDownAction.reset();
    // 模拟 第二次 点击
    context.event = {
      type: 'click',
      data: {
        data: plot.chart.getData()[1],
      },
    };

    drillDownAction.click();
    expect(plot.chart.getData().length).toBe(5);

    // @ts-ignore 回退到初始化
    drillDownAction.reset();
    // 模拟 第三次 点击
    context.event = {
      type: 'click',
      data: {
        data: plot.chart.getData()[2],
      },
    };

    drillDownAction.click();
    expect(plot.chart.getData().length).toBe(4);

    drillDownAction.reset();
    // 面包屑消失
    expect((plot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0] as IGroup).get('visible')).toBe(false);

    drillDownAction.destroy();
  });

  it('hierarchyConfig: sort', () => {
    plot.update({ hierarchyConfig: { sort: (a, b) => a - b } });
    const context = new InteractionContext(plot.chart);
    const drillDownAction = new DrillDownAction(context);

    // 模拟一次点击(数据是升序的)
    context.event = {
      type: 'click',
      data: {
        data: plot.chart.getData()[0],
      },
    };

    drillDownAction.click();
    // 面包屑出现
    expect(plot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME).length).toBe(1);
    expect(plot.chart.getData().length).toBe(4);

    drillDownAction.destroy();
  });

  it('drilldown: breadCrumb 默认 bottom-left', () => {
    expect(plot.chart.appendPadding[0]).not.toBeGreaterThan(25 /** 默认 append 距离 */);
    expect(plot.chart.appendPadding[2]).toBeGreaterThanOrEqual(25 /** 默认 append 距离 */);

    let context = new InteractionContext(plot.chart);
    let drillDownAction = new DrillDownAction(context);

    // 模拟一次点击
    context.event = {
      type: 'click',
      data: {
        data: plot.chart.getData()[0],
      },
    };

    drillDownAction.click();
    // 面包屑出现
    let breadCrumb = plot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0];
    expect(breadCrumb.getBBox().x).toBe(0);
    expect(breadCrumb.getBBox().y).toBe(-DEFAULT_BREAD_CRUMB_CONFIG.textStyle.fontSize);
    expect(breadCrumb.getCanvasBBox().y).toBe(plot.chart.getCoordinate().getHeight() + PADDING_TOP);
    // @ts-ignore
    expect(drillDownAction.getButtonCfg().position).toBe('bottom-left');

    drillDownAction.destroy();

    // 更新位置
    plot.update({
      drilldown: {
        enabled: true,
        breadCrumb: {
          position: 'top-left',
          textStyle: { fontSize: 32 },
          activeTextStyle: { fill: 'rgba(255,0,0,1)' },
        },
      },
    });

    expect(plot.chart.appendPadding[0]).toBeGreaterThanOrEqual(25 /** 默认 append 距离 */);

    context = new InteractionContext(plot.chart);
    drillDownAction = new DrillDownAction(context);

    // 模拟一次点击
    context.event = {
      type: 'click',
      data: {
        data: plot.chart.getData()[0],
      },
    };
    // @ts-ignore
    expect(drillDownAction.getButtonCfg().position).toBe('top-left');

    drillDownAction.click();
    breadCrumb = plot.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0];

    expect(breadCrumb.getBBox().x).toBe(0);
    expect(breadCrumb.getBBox().y).toBe(-32 /** font-size */);
    // activeTextStyle
    // @ts-ignore
    const textShape: IShape = breadCrumb.getChildren()[0];
    textShape.emit('mouseenter', { target: textShape });
    expect(textShape.attr('cursor')).toBe('pointer');
    expect(textShape.attr('fill')).toBe(DEFAULT_BREAD_CRUMB_CONFIG.activeTextStyle.fill);
    // @ts-ignore
    const textShape1: IShape = breadCrumb.getChildren()[2];
    textShape1.emit('mouseenter', { target: textShape1 });
    expect(textShape1.attr('cursor')).toBe('default');
    expect(textShape.attr('fill')).toBe('rgba(255,0,0,1)');
  });
});
