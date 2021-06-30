import InteractionContext from '@antv/g2/lib/interaction/context';
import { isParentNode } from '../../../src/interactions/drill-down';
import { CirclePacking, Sunburst, Treemap } from '../../../src';
import { TREEMAP } from '../../data/treemap';
import { DATA as CirclePackingData } from '../../data/circle-packing';
import { createDiv } from '../../utils/dom';
import { BREAD_CRUMB_NAME, DrillDownAction } from '../../../src/interactions/actions/drill-down';

describe('drill-down interaction', () => {
  it('utils: is-parent-node', () => {
    expect(isParentNode(undefined)).toBeFalsy();
    expect(
      isParentNode({
        event: undefined,
      })
    ).toBeFalsy();
    expect(
      isParentNode({
        event: {
          data: {
            data: {
              name: 'xxx',
            },
          },
        },
      })
    ).toBeFalsy();
    expect(
      isParentNode({
        event: {
          data: {
            data: {
              name: 'xxx',
              children: [
                {
                  name: '123',
                },
              ],
            },
          },
        },
      })
    ).toBeTruthy();
    expect(
      isParentNode({
        event: {
          data: {
            data: {
              name: 'xxx',
              depth: 1,
              children: [
                {
                  name: '123',
                },
              ],
            },
          },
        },
      })
    ).toBeTruthy();
  });

  it('drilldown breadcrumb position', () => {
    // ① treemap
    const treemap = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
      legend: {
        position: 'top-left',
      },
      drilldown: {
        enabled: true,
        breadCrumb: {
          position: 'top-left',
        },
      },
    });
    treemap.render();

    // @ts-ignore
    let context = new InteractionContext(treemap.chart);
    let drillDownAction = new DrillDownAction(context);

    // 模拟一次点击
    context.event = {
      type: 'click',
      data: {
        data: treemap.chart.getData()[0],
      },
    };

    drillDownAction.click();

    // 图例和面包屑不互相遮挡
    expect(treemap.chart.getController('legend').getComponents()[0].component.getLayoutBBox().maxY).toBeLessThan(
      treemap.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0].getCanvasBBox().y
    );

    // ② sunburst
    const sunburst = new Sunburst(createDiv(), {
      data: CirclePackingData,
      colorField: 'name',
      drilldown: {
        enabled: true,
        breadCrumb: {
          position: 'top-left',
        },
      },
    });
    sunburst.render();

    // @ts-ignore
    context = new InteractionContext(sunburst.chart);
    drillDownAction = new DrillDownAction(context);

    // 模拟一次点击
    context.event = {
      type: 'click',
      data: {
        data: sunburst.chart.getData()[0],
      },
    };

    drillDownAction.click();
    const sunburstBreadCrumbBBox = sunburst.chart.foregroundGroup.findAllByName(BREAD_CRUMB_NAME)[0].getCanvasBBox();

    sunburst.update({
      drilldown: {
        breadCrumb: {
          position: 'bottom-left',
        },
      },
    });

    // 模拟一次点击
    context.event = {
      type: 'click',
      data: {
        data: sunburst.chart.getData()[0],
      },
    };

    drillDownAction.click();

    const sunburstBottomBreadCrumbBBox = sunburst.chart.foregroundGroup
      .findAllByName(BREAD_CRUMB_NAME)[0]
      .getCanvasBBox();
    expect(sunburstBottomBreadCrumbBBox.x).toBe(sunburstBreadCrumbBBox.x);
    expect(sunburstBottomBreadCrumbBBox.y).not.toBe(sunburstBreadCrumbBBox.y);

    // ③ circle-packing: 更新面包屑位置，x 方向保持相等，y 方向不同
    const circlePacking = new CirclePacking(createDiv(), {
      data: CirclePackingData,
      colorField: 'name',
      drilldown: {
        enabled: true,
        breadCrumb: {
          position: 'top-left',
        },
      },
    });
    circlePacking.render();

    // @ts-ignore
    context = new InteractionContext(circlePacking.chart);
    drillDownAction = new DrillDownAction(context);

    // 模拟一次点击
    context.event = {
      type: 'click',
      data: {
        data: circlePacking.chart.getData()[0],
      },
    };

    drillDownAction.click();
    const circlePackingBreadCrumbBBox = circlePacking.chart.foregroundGroup
      .findAllByName(BREAD_CRUMB_NAME)[0]
      .getCanvasBBox();

    circlePacking.update({
      drilldown: {
        breadCrumb: {
          position: 'bottom-left',
        },
      },
    });

    // 模拟一次点击
    context.event = {
      type: 'click',
      data: {
        data: circlePacking.chart.getData()[0],
      },
    };

    drillDownAction.click();

    const circlePackingBottomBreadCrumbBBox = circlePacking.chart.foregroundGroup
      .findAllByName(BREAD_CRUMB_NAME)[0]
      .getCanvasBBox();
    expect(circlePackingBreadCrumbBBox.x).toBe(circlePackingBottomBreadCrumbBBox.x);
    expect(circlePackingBreadCrumbBBox.y).not.toBe(circlePackingBottomBreadCrumbBBox.y);
  });
});
