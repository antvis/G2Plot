import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area state', () => {
  const data = partySupport.filter((o) => ['FF', 'Lab'].includes(o.type));
  const options = {
    width: 400,
    height: 300,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    line: {
      style: {
        lineWidth: 1,
      },
    },
    appendPadding: 10,
  };

  it('set statesStyle', () => {
    const plot = new Area(createDiv(), {
      ...options,
      animation: false,
      state: {
        selected: {
          style: {
            lineWidth: 4,
            fill: 'red',
          },
        },
        inactive: {
          style: {
            fill: 'blue',
          },
        },
      },
      line: {
        state: {
          selected: {
            style: {
              lineWidth: 4,
            },
          },
        },
      },
    });

    plot.render();

    plot.setState('selected', (d: any) => (Array.isArray(d) ? d[0].type : d.type) === data[0].type);
    const shape = plot.chart.geometries[0].elements[0].shape;
    const lineShape = plot.chart.geometries[1].elements[0].shape;

    expect(lineShape.attr('lineWidth')).toBe(4);
    expect(lineShape.attr('fill')).not.toBe('red');
    expect(shape.attr('fill')).toBe('red');

    // // 取消 selected
    plot.setState('selected', (d: any) => (Array.isArray(d) ? d[0].type : d.type) === data[0].type, false);
    plot.setState('inactive', (d: any) => (Array.isArray(d) ? d[0].type : d.type) === data[0].type);
    expect(shape.attr('fill')).toBe('blue');
    expect(plot.getStates()[0].state).toBe('inactive');

    plot.destroy();
  });

  it('set statesStyle by theme', () => {
    const plot = new Area(createDiv(), {
      ...options,
      animation: false,
      theme: {
        geometries: {
          area: {
            area: {
              active: {
                style: {
                  fill: 'yellow',
                  fillOpacity: 0.65,
                },
              },
            },
          },
        },
      },
    });

    plot.render();

    plot.setState('active', (d: any) => (Array.isArray(d) ? d[0].type : d.type) === data[0].type);
    const shape = plot.chart.geometries[0].elements[0].shape;

    expect(shape.attr('fill')).toBe('yellow');
    expect(shape.attr('fillOpacity')).toBe(0.65);
    expect(plot.getStates()[0].state).toBe('active');

    plot.destroy();
  });
});
