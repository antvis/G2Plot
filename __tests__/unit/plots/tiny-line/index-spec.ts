import { TooltipCfg } from '@antv/g2/lib/interface';
import { GeometryTooltipOption } from '@antv/g2/lib/interface';
import { TinyLine } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-line', () => {
  it('data', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      meta: {
        value: {
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

    tinyLine.render();
    expect(tinyLine.chart.geometries[0].elements.length).toBe(1);
  });

  it('data with smooth', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      meta: {
        value: {
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
      smooth: true,
    });

    tinyLine.render();
    expect(tinyLine.chart.geometries[0].attributes.shape.values).toEqual(['smooth']);
    expect(tinyLine.chart.geometries[0].elements.length).toBe(1);
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
      autoFit: false,
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
      autoFit: false,
      tooltip: true,
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
        padding: '2px',
        fontSize: '10px',
      },
    });
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
        formatter: (x, y) => {
          return `有${y / 1000}千`;
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
    const geometryTooltipOption = geometry.tooltipOption as GeometryTooltipOption;
    expect(geometryTooltipOption.fields).toEqual(['x', 'y']);
    expect(geometryTooltipOption.callback(1, '3000')).toEqual({ value: '有3千' });
  });
});
