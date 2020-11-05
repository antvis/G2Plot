import { TooltipCfg } from '@antv/g2/lib/interface';
import { TinyLine } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-line', () => {
  it('data', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: true,
    });

    tinyLine.render();
    expect(tinyLine.chart.geometries[0].elements.length).toBe(1);

    tinyLine.chart.showTooltip({ x: 10, y: 10 });
    expect(tinyLine.container.querySelector('.g2-tooltip').innerHTML).toBe('4100.0');

    tinyLine.destroy();
  });

  it('data with smooth', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
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
      autoFit: true,
      smooth: true,
    });

    tinyLine.render();
    expect(tinyLine.chart.geometries[0].attributes.shape.values).toEqual(['smooth']);
    expect(tinyLine.chart.geometries[0].elements.length).toBe(1);

    tinyLine.destroy();
  });

  it('data with style', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      lineStyle: {
        lineDash: [2, 2],
      },
      tooltip: {
        showCrosshairs: true,
        showMarkers: true,
      },
      autoFit: true,
      appendPadding: 10,
    });

    tinyLine.render();

    const geometry = tinyLine.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);

    tinyLine.update({
      ...tinyLine.options,
      lineStyle: () => {
        return { lineDash: [4, 4] };
      },
    });
    expect(tinyLine.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);

    tinyLine.destroy();
  });

  it('data with tooltip', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: true,
    });

    tinyLine.render();

    const chart = tinyLine.chart;
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

    tinyLine.destroy();
  });

  it('data with custom tooltip', () => {
    const tinyLine = new TinyLine(createDiv(), {
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

    tinyLine.render();

    const chart = tinyLine.chart;
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
    const geometry = tinyLine.chart.geometries[0];
    // @ts-ignore
    const { position } = geometry.attributeOption;
    expect(position.fields).toEqual(['x', 'y']);

    tinyLine.destroy();
  });

  it('annotation', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: true,
      annotations: [{ type: 'line', start: ['min', 'median'], end: ['max', 'median'], text: { content: '中位线' } }],
    });

    tinyLine.render();
    expect(tinyLine.chart.getController('annotation').getComponents().length).toBe(1);

    tinyLine.destroy();
  });
});
