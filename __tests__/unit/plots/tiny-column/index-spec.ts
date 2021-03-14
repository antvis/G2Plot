import { TooltipCfg } from '@antv/g2/lib/interface';
import { TinyColumn } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/tiny-column/constants';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-column', () => {
  it('data', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 200,
      height: 100,
      meta: {
        y: {
          min: 0,
          max: 5000,
        },
      },
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
    });

    tinyColumn.render();
    expect(tinyColumn.chart.geometries[0].elements.length).toBe(52);

    tinyColumn.chart.showTooltip({ x: 10, y: 10 });
    expect(tinyColumn.container.querySelector('.g2-tooltip').innerHTML).toBe('4600');

    tinyColumn.destroy();
  });

  it('data with style', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      columnStyle: {
        fill: '#123456',
        stroke: '#654321',
        lineWidth: 2,
        lineDash: [2, 2],
        opacity: 0.5,
      },
      autoFit: false,
      appendPadding: 10,
    });

    tinyColumn.render();

    const geometry = tinyColumn.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);
    expect(elements[0].shape.attr('fill')).toEqual('#123456');
    expect(elements[0].shape.attr('stroke')).toEqual('#654321');
    expect(elements[0].shape.attr('lineWidth')).toEqual(2);
    expect(elements[0].shape.attr('opacity')).toEqual(0.5);

    tinyColumn.update({
      ...tinyColumn.options,
      columnStyle: ({ x }) => {
        return x > 10 ? { fill: '#222222' } : { fill: '#444444' };
      },
    });
    expect(tinyColumn.chart.geometries[0].elements[0].shape.attr('fill')).toEqual('#444444');
    expect(tinyColumn.chart.geometries[0].elements[11].shape.attr('fill')).toEqual('#222222');

    tinyColumn.update({
      ...tinyColumn.options,
      columnStyle: ({ y }) => {
        return y > 4000 ? { fill: '#222222' } : { fill: '#444444' };
      },
    });
    expect(tinyColumn.chart.geometries[0].elements[0].shape.attr('fill')).toEqual('#444444');
    expect(tinyColumn.chart.geometries[0].elements[1].shape.attr('fill')).toEqual('#222222');

    tinyColumn.destroy();
  });

  it('data with tooltip', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
    });

    tinyColumn.render();

    const chart = tinyColumn.chart;
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

    tinyColumn.destroy();
  });

  it('data with custom tooltip', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
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

    tinyColumn.render();

    const chart = tinyColumn.chart;
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
    const geometry = tinyColumn.chart.geometries[0];
    // @ts-ignore
    const { position } = geometry.attributeOption;
    expect(position.fields).toEqual(['x', 'y']);

    tinyColumn.chart.showTooltip({ x: 10, y: 10 });
    expect(tinyColumn.container.querySelector('.g2-tooltip').innerHTML).toBe('有4.1千');

    tinyColumn.destroy();
  });

  it('columnWidthRatio', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 400,
      height: 100,
      meta: {
        y: {
          min: 0,
          max: 5000,
        },
      },
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
      columnWidthRatio: 0.9,
    });

    tinyColumn.render();
    expect(tinyColumn.chart.getTheme().columnWidthRatio).toBe(0.9);

    tinyColumn.destroy();
  });

  it('annotation', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 200,
      height: 100,
      meta: {
        y: {
          min: 0,
          max: 5000,
        },
      },
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
      annotations: [{ type: 'line', start: ['min', 'median'], end: ['max', 'median'], text: { content: '中位线' } }],
    });

    tinyColumn.render();
    expect(tinyColumn.chart.getController('annotation').getComponents().length).toBe(1);

    tinyColumn.destroy();
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(TinyColumn.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });
});
