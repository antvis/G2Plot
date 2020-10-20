import { Heatmap } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('x*y*color and calendar', async () => {
    const data = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/github-commit.json').then((res) =>
      res.json()
    );
    const heatmap = new Heatmap(createDiv('calendar'), {
      width: 600,
      height: 500,
      data,
      padding: [150, 30, 150, 70],
      xField: 'week',
      yField: 'day',
      colorField: 'commits',
      color: '#BAE7FF-#1890FF-#0050B3',
      reflect: 'y',
      meta: {
        day: {
          type: 'cat',
          values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        },
        week: {
          type: 'cat',
        },
        commits: {
          sync: true,
        },
        date: {
          type: 'cat',
        },
      },
      yAxis: {
        grid: null,
      },
      legend: false,
      tooltip: {
        title: 'date',
        showMarkers: false,
      },
      shape: 'boundary-polygon',
      interactions: [{ type: 'element-active' }],
      xAxis: {
        position: 'top',
        tickLine: null,
        line: null,
        label: {
          offset: 12,
          style: {
            fontSize: 12,
            fill: '#666',
            textBaseline: 'top',
          },
          formatter: (val) => {
            if (val === '2') {
              return 'MAY';
            } else if (val === '6') {
              return 'JUN';
            } else if (val === '10') {
              return 'JUL';
            } else if (val === '15') {
              return 'AUG';
            } else if (val === '19') {
              return 'SEP';
            } else if (val === '24') {
              return 'OCT';
            }
            return '';
          },
        },
      },
    });

    heatmap.render();
    const geometry = heatmap.chart.geometries[0];

    const element = geometry.elements[0];
    const model = element.getModel();
    // @ts-ignore
    const { attributeOption } = geometry;
    expect(heatmap.options.type).toBe('polygon');
    expect(geometry.type).toBe('polygon');
    expect(attributeOption.position.fields).toEqual(['week', 'day']);
    expect(attributeOption.color.fields).toEqual(['commits']);
    expect(attributeOption.color.values).toBe('#BAE7FF-#1890FF-#0050B3');
    expect(model.shape).toEqual(['heatmap-square-size', 1, 1]);
    // @ts-ignore
    expect(element.shapeType).toBe('heatmap-square-size');
    // @ts-ignore
    expect(heatmap.chart.options.axes.week.label.offset).toBe(12);
  });
});
