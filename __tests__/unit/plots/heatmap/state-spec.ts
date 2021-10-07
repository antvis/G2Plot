import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  const heatmap = new Heatmap(createDiv('basic heatmap'), {
    width: 400,
    height: 300,
    data: semanticBasicHeatmapData,
    xField: 'name',
    yField: 'day',
    colorField: 'sales',
    interactions: [{ type: 'element-active' }],
    animation: false,
  });

  heatmap.render();

  it('set statesStyle', () => {
    heatmap.update({
      state: {
        active: {
          style: {
            stroke: 'red',
          },
        },
      },
    });

    heatmap.setState(
      'active',
      (d: any) => d.name === semanticBasicHeatmapData[0].name && d.day === semanticBasicHeatmapData[0].day
    );

    const shape = heatmap.chart.geometries[0].elements[0].shape;

    expect(shape.attr('stroke')).toBe('red');
  });

  it('set statesStyle by theme', () => {
    heatmap.update({
      state: undefined,
      shape: 'square',
      theme: {
        geometries: {
          polygon: {
            square: {
              active: {
                style: {
                  stroke: 'yellow',
                },
              },
            },
          },
        },
      },
    });

    heatmap.setState(
      'active',
      (d: any) => d.name === semanticBasicHeatmapData[0].name && d.day === semanticBasicHeatmapData[0].day
    );

    const shape = heatmap.chart.geometries[0].elements[0].shape;

    expect(shape.attr('stroke')).toBe('yellow');
  });

  afterAll(() => {
    heatmap.destroy();
  });
});
