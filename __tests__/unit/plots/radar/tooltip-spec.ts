import { Radar } from '../../../../src';
import { SINGLE_DATA, SERIES_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar tooltip', () => {
  it('shared', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      tooltip: {
        shared: true,
        showCrosshairs: true,
      },
    });

    radar.render();
    // @ts-ignore
    expect(radar.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore
    expect(radar.chart.options.tooltip.showCrosshairs).toBe(true);
  });
});

describe('radar, 自定义 tooltip', () => {
  it('xField*yField', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SINGLE_DATA,
      xField: 'name',
      yField: 'value',
      radius: 0.8,
      tooltip: {
        title: '开销',
      },
      interactions: [{ type: 'radar-tooltip' }],
    });

    radar.render();
    expect(radar.chart).toBeDefined();
    expect(radar.chart.geometries.length).toBe(1);
    expect(radar.chart.geometries[0].elements.length).toBe(1);
  });

  it('xField*yField*seriesField', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      tooltip: {
        shared: false,
      },
      interactions: [{ type: 'radar-tooltip' }],
    });

    radar.render();
    expect(radar.chart).toBeDefined();
    expect(radar.chart.geometries.length).toBe(1);
    expect(radar.chart.geometries[0].elements.length).toBe(2);
    expect(radar.chart.interactions['radar-tooltip']).toBeDefined();
  });

  it('xField*yField*seriesField, with sharedTooltip', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      tooltip: {
        showTitle: false,
        shared: true,
        itemTpl: `<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;display:flex;">
           <span style="background-color:{color};" class="g2-tooltip-marker"></span>
           <span style="display:inline-flex;flex:1;justify-content:space-between">
            <span>{name}:{title}</span><span>{value}</span>
           </span>
        </li>`,
      },
      interactions: [{ type: 'radar-tooltip' }],
    });

    radar.render();
    expect(radar.chart).toBeDefined();
    expect(radar.chart.geometries.length).toBe(1);
    expect(radar.chart.geometries[0].elements.length).toBe(2);
  });

  it('"xy" crosshairs', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      tooltip: {
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
          line: {
            style: {
              stroke: '#565656',
              lineDash: [4],
            },
          },
          follow: true,
        },
      },
      interactions: [
        {
          type: 'radar-tooltip',
          cfg: {
            start: [{ trigger: 'plot:mousemove', action: 'radar-tooltip:show' }],
            end: [{ trigger: 'plot:mouseleave', action: 'radar-tooltip:hide' }],
          },
        },
      ],
    });

    radar.render();
    const tooltipController = radar.chart.getController('radar-tooltip');
    // @ts-ignore
    const tooltipCfg = tooltipController.getTooltipCfg();
    expect(tooltipCfg.shared).toBe(true);
    expect(tooltipCfg.showCrosshairs).toBe(true);
    expect(tooltipCfg.crosshairs.type).toBe('xy');
  });
  it('tooltip formatter', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      tooltip: {
        shared: true,
        showCrosshairs: true,
        formatter: (datum) => {
          return { name: datum.name, value: datum.value + '%' };
        },
      },
    });

    radar.render();
    const tooltipController = radar.chart.getController('radar-tooltip');
    // @ts-ignore
    const tooltipCfg = tooltipController.getTooltipCfg();
    expect(tooltipCfg.showCrosshairs).toBe(true);
  });
});
