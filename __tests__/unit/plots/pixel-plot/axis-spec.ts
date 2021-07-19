import { PixelPlot } from '../../../../src/pixels';
import { createDiv } from '../../../utils/dom';
import { PIXEL_DATA } from '../../../data/pixels';
import { LARGE_DATA } from '../../../data/large-data';

describe('pixel-plot', () => {
  const div = createDiv();
  const width = 1000,
    height = 500,
    padding = [40, 50, 30, 50];

  it('default axis', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
    });

    plot.render();
    // 轴存在，有默认类型
    const xAxis = plot.axisController.xAxisComponent;
    const yAxis = plot.axisController.yAxisComponent;
    expect(xAxis.cfg.visible).toBe(true);
    expect(yAxis.cfg.visible).toBe(true);
    expect(xAxis.cfg.type).toBe('line');
    expect(yAxis.cfg.type).toBe('line');

    plot.destroy();
  });

  it('meta', () => {
    const formatter = (d) => d + '万';
    const plot = new PixelPlot(div, {
      width,
      height,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      meta: {
        date: {
          type: 'time',
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

    expect(plot.scales.get('date').scale.type).toBe('time');

    expect(plot.scales.get('high').scale.type).toBe('linear');
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
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xAxis: {
        top: true,
        title: {
          text: '年份',
          style: {
            fill: '#eee',
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
    expect(xAxis.get('title').style.fill).toBe('#eee');
    expect(yAxis.get('position')).toBe('right');

    plot.destroy();
  });

  it('xAxis and yAxis: label verticalLimitLength', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xAxis: {
        label: {
          offset: 15,
          autoHide: true,
        },
      },
      yAxis: {
        verticalLimitLength: 20,
      },
    });
    plot.render();

    const xAxis = plot.axisController.xAxisComponent;
    const yAxis = plot.axisController.yAxisComponent;
    expect(xAxis.get('label').offset).toBe(15);
    expect(xAxis.get('label').autoHide).toBe(true);
    expect(yAxis.get('verticalLimitLength')).toBe(20);

    plot.destroy();
  });
});
