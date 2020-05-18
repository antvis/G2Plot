import { GroupedColumn } from '../../../src';
import { getLegendShapes } from '../../../src/util/common';

describe('legend', () => {
  const div = document.createElement('div');
  div.style.width = '600px';
  div.style.height = '600px';
  div.style.left = '30px';
  div.style.top = '30px';
  document.body.append(div);

  const data = [
    {
      name: 'London',
      月份: 'Jan.',
      月均降雨量: 18.9,
    },
    {
      name: 'London',
      月份: 'Feb.',
      月均降雨量: 28.8,
    },
    {
      name: 'London',
      月份: 'Mar.',
      月均降雨量: 39.3,
    },
    {
      name: 'London',
      月份: 'Apr.',
      月均降雨量: 81.4,
    },
    {
      name: 'London',
      月份: 'May',
      月均降雨量: 47,
    },
    {
      name: 'London',
      月份: 'Jun.',
      月均降雨量: 20.3,
    },
    {
      name: 'London',
      月份: 'Jul.',
      月均降雨量: 24,
    },
    {
      name: 'London',
      月份: 'Aug.',
      月均降雨量: 35.6,
    },
    {
      name: 'Berlin',
      月份: 'Jan.',
      月均降雨量: 12.4,
    },
    {
      name: 'Berlin',
      月份: 'Feb.',
      月均降雨量: 23.2,
    },
    {
      name: 'Berlin',
      月份: 'Mar.',
      月均降雨量: 34.5,
    },
    {
      name: 'Berlin',
      月份: 'Apr.',
      月均降雨量: 99.7,
    },
    {
      name: 'Berlin',
      月份: 'May',
      月均降雨量: 52.6,
    },
    {
      name: 'Berlin',
      月份: 'Jun.',
      月均降雨量: 35.5,
    },
    {
      name: 'Berlin',
      月份: 'Jul.',
      月均降雨量: 37.4,
    },
    {
      name: 'Berlin',
      月份: 'Aug.',
      月均降雨量: 42.4,
    },
  ];

  it('legend text style & formatter', () => {
    const columnPlot = new GroupedColumn(div, {
      data,
      xField: '月份',
      yField: '月均降雨量',
      yAxis: {
        min: 0,
      },
      label: {
        visible: true,
      },
      groupField: 'name',
      legend: {
        text: {
          style: {
            fill: '#5B8FF9',
          },
          formatter: () => 'test',
        },
      },
    });
    columnPlot.render();
    const view = columnPlot.getLayers()[0].view;
    const legendShapes = getLegendShapes(view)[0].get('children')[0].get('children')[0].get('children');
    console.log(legendShapes);
    expect(legendShapes[1].attr('fill')).toBe('#5B8FF9');
    expect(legendShapes[2].attr('text')).toBe('test');
    columnPlot.destroy();
  });

  it('legend style in dark theme', () => {
    const columnPlot = new GroupedColumn(div, {
      theme: 'dark',
      data,
      xField: '月份',
      yField: '月均降雨量',
      yAxis: {
        min: 0,
      },
      label: {
        visible: true,
      },
      groupField: 'name',
    });
    columnPlot.render();
    const view = columnPlot.getLayers()[0].view;
    const legendShapes = getLegendShapes(view)[0].get('children')[0].get('children')[0].get('children');
    expect(legendShapes[1].attr('fill')).toBe('#5B8FF9');
    columnPlot.destroy();
  });

  it('legend title visible', () => {
    const columnPlot = new GroupedColumn(div, {
      data,
      xField: '月份',
      yField: '月均降雨量',
      yAxis: {
        min: 0,
      },
      label: {
        visible: true,
      },
      groupField: 'name',
      legend: {
        position: 'right-center',
        title: {
          visible: true,
          text: 'aa',
        },
      },
    });
    columnPlot.render();
    const view = columnPlot.getLayers()[0].view;
    const titleShape = view.foregroundGroup.findAll((el) => {
      if (el.get('name')) {
        return el.get('name') === 'legend-title';
      }
    });
    expect(titleShape[0].attr('text')).toBe('aa');
    columnPlot.destroy();
  });
});
