import { PixelPlot } from '../../../../src/pixels';
import { createDiv } from '../../../utils/dom';
import { PIXEL_DATA } from '../../../data/pixels';
import { LARGE_DATA } from '../../../data/large-data';

describe('pixel-plot', () => {
  const div = createDiv();
  const width = 1000,
    height = 500,
    padding = [40, 50, 50, 50];

  it('meta', () => {
    const formatter = (d) => d + '万';
    const plot = new PixelPlot(div, {
      width,
      height,
      padding,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      meta: {
        date: {
          min: '2004-01-01',
          max: '2014-01-01',
          nice: false,
        },
        high: {
          values: [0, 120],
          formatter: formatter,
          alias: '最高价',
        },
      },
    });
    plot.render();

    const yAxis = plot.axisController.yAxisComponent;

    expect(plot.scales.get('date').scale.min).toEqual(new Date('2004/01/01').getTime());
    expect(plot.scales.get('date').scale.max).toEqual(new Date('2014/01/01').getTime());
    expect(plot.scales.get('date').scaleOption.nice).toBe(false);

    expect(plot.scales.get('high').scale.min).toBe(0);
    expect(plot.scales.get('high').scale.max).toBe(120);
    expect(plot.scales.get('high').scale.formatter).toBe(formatter);
    expect(yAxis.get('ticks')[0].name).toBe('0万');
    expect(plot.scales.get('high').scale.alias).toBe('最高价');

    plot.destroy();
  });

  it('xAxis and yAxis: top title position', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      padding,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      meta: {},
      xAxis: {
        top: true,
        title: {
          text: '年份',
          style: {
            fill: 'black',
          },
        },
      },
      yAxis: {
        position: 'right',
      },
    });
    plot.render();

    const xAxis = plot.axisController.xAxisComponent;
    const yAxis = plot.axisController.yAxisComponent;
    expect(xAxis.get('container').get('parent').get('el').id).toBe('fg-canvas');
    expect(xAxis.get('title').text).toBe('年份');
    expect(xAxis.get('title').style.fill).toBe('black');
    expect(yAxis.get('position')).toBe('right');

    plot.destroy();
  });

  it('xAxis and yAxis: label verticalLimitLength', () => {
    const formatter = (d) => d + '万';
    const plot = new PixelPlot(div, {
      width,
      height,
      padding,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xAxis: {
        label: {
          offset: 15,
          autoHide: false,
        },
      },
      yAxis: {
        verticalLimitLength: 20,
        label: {
          formatter: formatter,
        },
      },
    });
    plot.render();

    const xAxis = plot.axisController.xAxisComponent;
    const yAxis = plot.axisController.yAxisComponent;
    expect(xAxis.get('label').offset).toBe(15);
    expect(xAxis.get('label').autoHide).toBe(false);
    expect(yAxis.get('verticalLimitLength')).toBe(20);
    expect(yAxis.get('label').formatter).toEqual(formatter);

    plot.destroy();
  });

  it('xAxis and yAxis: line tickLine tickCount', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      padding,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xAxis: {
        line: {
          style: {
            stroke: '#999',
          },
        },
        tickLine: {
          length: 5,
        },
      },
      yAxis: {
        tickCount: 8,
        line: {
          style: {
            stroke: '#999',
          },
        },
        tickLine: {
          length: 3,
        },
      },
    });
    plot.render();

    const xAxis = plot.axisController.xAxisComponent;
    const yAxis = plot.axisController.yAxisComponent;
    expect(xAxis.get('line').style.stroke).toBe('#999');
    expect(xAxis.get('tickLine').length).toBe(5);

    expect(yAxis.get('tickCount')).toBe(8);
    expect(yAxis.get('line').style.stroke).toBe('#999');
    expect(yAxis.get('tickLine').length).toBe(3);

    plot.destroy();
  });
});
