import { ViewLayer, Waterfall } from '../../../../src';
import { every, last } from '@antv/util';

describe('waterfall plot', () => {
  const data = [
    { type: '日用品', money: 120 },
    { type: '伙食费', money: 900 },
    { type: '交通费', money: 200 },
    { type: '水电费', money: 300 },
    { type: '房租', money: 1200 },
    { type: '商场消费', money: 1000 },
    { type: '应酬交际', money: -2000 },
  ];

  const plotOptions = {
    title: {
      visible: true,
      text: '每月收支情况（瀑布图）',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'type',
    yField: 'money',
    meta: {
      type: {
        alias: '类别',
      },
      money: {
        alias: '金额',
      },
    },
  };

  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const waterfallPlot = new Waterfall(canvasDiv, plotOptions);
  const waterfallLayer = waterfallPlot.getLayer() as ViewLayer;

  it('normal', () => {
    waterfallPlot.render();
    const shapes = waterfallLayer.view.geometries[0].elements.map((value) => value.shape);
    expect(shapes.length).toBe(data.length + 1);
  });

  it('custom color, string', () => {
    waterfallPlot.updateConfig({
      color: 'rgba(0, 255, 255, 0.2)',
    });
    waterfallPlot.render();
    const shapes = waterfallLayer.view.geometries[0].elements.map((value) => value.shape);
    expect(every(shapes, (s) => s.attr('fill') === 'rgba(0, 255, 255, 0.2)')).toBe(true);
  });

  it('custom color, object', () => {
    waterfallPlot.updateConfig({
      color: {
        rising: 'red',
        falling: 'green',
        total: '#ddd',
      },
    });
    waterfallPlot.render();
    const shapes = waterfallLayer.view.geometries[0].elements.map((value) => value.shape);
    expect(shapes[0].attr('fill')).toBe('red');
    expect(shapes[6].attr('fill')).toBe('green');
    expect(last(shapes).attr('fill')).toBe('#ddd');
  });

  it('use callback to custom color', () => {
    waterfallPlot.updateConfig({
      color: (type, value, values, index) => {
        if (index === data.length) {
          return '#ddd';
        } else if (value > 0) {
          return 'rgba(255, 0, 0, 0.45)';
        }
        return 'rgba(255, 255, 0, 0.45)';
      },
    });
    waterfallPlot.render();
    const shapes = waterfallLayer.view.geometries[0].elements.map((value) => value.shape);
    expect(shapes[0].attr('fill')).toBe('rgba(255, 0, 0, 0.45)');
    expect(shapes[6].attr('fill')).toBe('rgba(255, 255, 0, 0.45)');
    expect(last(shapes).attr('fill')).toBe('#ddd');
  });

  it('not show total', () => {
    waterfallPlot.updateConfig({
      showTotal: {
        visible: false,
      },
    });
    waterfallPlot.render();
    const shapes = waterfallLayer.view.geometries[0].elements.map((value) => value.shape);
    expect(shapes.length).toBe(data.length);
  });

  it('diff-label', () => {
    waterfallPlot.updateConfig({
      diffLabel: {
        visible: true,
        style: {
          fill: 'red',
        },
        formatter: (text) => {
          if (text.startsWith('+')) {
            return `涨 ${text.substr(1)}`;
          } else if (text.startsWith('-')) {
            return `跌 ${text.substr(1)}`;
          }
          return text;
        },
      },
    });
    waterfallPlot.render();
    // @ts-ignore
    const diffLabel = waterfallLayer.diffLabel;
    const labelShapes = diffLabel.container.get('children')[0];
    expect(labelShapes.attr('text')).toBe('涨 120');
    expect(labelShapes.attr('fill')).toBe('red');
  });

  it('label.formatter', () => {
    waterfallPlot.updateConfig({
      data,
      xField: 'type',
      yField: 'money',
      label: {
        visible: true,
        formatter: (text) => {
          return text + '__abc';
        },
      },
    });

    waterfallPlot.render();
    // @ts-ignore
    const view = waterfallPlot.getView();
    const labels = view.geometries[0].labelsContainer.getChildByIndex(0).getChildren();
    expect(labels[0].attr('text')).toInclude('__abc');
  });

  it('hidden diff-label', () => {
    waterfallPlot.updateConfig({
      diffLabel: {
        visible: false,
      },
    });
    waterfallPlot.render();
    // @ts-ignore
    const diffLabel = waterfallLayer.diffLabel;
    expect(diffLabel).toBe(null);
  });

  afterAll(() => {
    // waterfallPlot.destroy();
  });
});
