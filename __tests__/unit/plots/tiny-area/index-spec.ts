import { TooltipCfg } from '@antv/g2/lib/interface';
import { TinyArea } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-area', () => {
  it('data', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      line: {},
      autoFit: false,
    });

    tinyArea.render();
    expect(tinyArea.chart.geometries.length).toBe(2);
    expect(tinyArea.chart.geometries[0].shapeType).toEqual('area');
    expect(tinyArea.chart.geometries[1].shapeType).toEqual('line');
  });

  it('data with area style', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      areaStyle: {
        fill: '#123456',
      },
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
    });

    tinyArea.render();
    expect(tinyArea.chart.geometries[0].elements[0].shape.attr('fill')).toEqual('#123456');
  });

  it('data with smooth', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
      smooth: true,
    });

    tinyArea.render();
    expect(tinyArea.chart.geometries[0].attributes.shape.values).toEqual(['smooth']);
    expect(tinyArea.chart.geometries[0].elements.length).toBe(1);
  });

  it('data with line style', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      smooth: true,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      line: {
        style: {
          stroke: '#123456',
          lineDash: [2, 2],
          lineWidth: 2,
        },
      },
      autoFit: false,
      appendPadding: 10,
    });

    tinyArea.render();

    const geometry = tinyArea.chart.geometries[1];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);
    expect(elements[0].shape.attr('stroke')).toEqual('#123456');
    expect(elements[0].shape.attr('lineWidth')).toEqual(2);

    tinyArea.update({
      ...tinyArea.options,
      line: {
        style: () => {
          return {
            stroke: '#123456',
            lineDash: [4, 4],
            lineWidth: 2,
          };
        },
      },
    });

    expect(tinyArea.chart.geometries[1].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(tinyArea.chart.geometries[1].elements[0].shape.attr('stroke')).toEqual('#123456');
    expect(tinyArea.chart.geometries[1].elements[0].shape.attr('lineWidth')).toEqual(2);
  });

  it('data with tooltip', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
    });

    tinyArea.render();

    const chart = tinyArea.chart;
    const tooltipOption = chart.getOptions().tooltip as TooltipCfg;
    expect(tooltipOption.showTitle).toBe(false);
    expect(tooltipOption.shared).toBe(true);
    expect(tooltipOption.showMarkers).toBe(false);
    expect(tooltipOption.itemTpl).toBe('<span>{value}</span>');
    expect(tooltipOption.containerTpl).toBe('<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>');
    expect(tooltipOption.domStyles).toEqual({
      'g2-tooltip': {
        padding: '2px 4px',
        fontSize: '10px',
      },
    });
  });

  it('data with custom tooltip', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
      tooltip: {
        showCrosshairs: true,
        customContent: (...arg) => {
          return `有${arg[1][0]?.value / 1000}千`;
        },
        position: 'bottom',
        offset: 0,
        domStyles: {
          'g2-tooltip': {
            padding: '5px',
            fontSize: '12px',
          },
        },
      },
    });

    tinyArea.render();

    const chart = tinyArea.chart;
    const tooltipOption = chart.getOptions().tooltip as TooltipCfg;
    expect(tooltipOption.showCrosshairs).toBe(true);
    expect(tooltipOption.position).toBe('bottom');
    expect(tooltipOption.offset).toBe(0);
    expect(tooltipOption.domStyles).toEqual({
      'g2-tooltip': {
        padding: '5px',
        fontSize: '12px',
      },
    });
    const geometry = tinyArea.chart.geometries[0];
    // @ts-ignore
    const { position } = geometry.attributeOption;
    expect(position.fields).toEqual(['x', 'y']);
  });

  it('annotation', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
      annotations: [{ type: 'line', start: ['min', 'median'], end: ['max', 'median'], text: { content: '中位线' } }],
    });

    tinyArea.render();
    expect(tinyArea.chart.getController('annotation').getComponents().length).toBe(1);
  });
});
