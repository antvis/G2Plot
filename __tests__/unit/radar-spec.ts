import { Radar } from '../../src';
import ViewLayer from '../../src/base/view-layer';

describe('Radar plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data = [
    {
      item: 'Design',
      user: 'a',
      score: 70,
    },
    {
      item: 'Design',
      user: 'b',
      score: 30,
    },
    {
      item: 'Development',
      user: 'a',
      score: 60,
    },
    {
      item: 'Development',
      user: 'b',
      score: 70,
    },
    {
      item: 'Marketing',
      user: 'a',
      score: 60,
    },
    {
      item: 'Marketing',
      user: 'b',
      score: 50,
    },
    {
      item: 'Users',
      user: 'a',
      score: 40,
    },
    {
      item: 'Users',
      user: 'b',
      score: 50,
    },
    {
      item: 'Test',
      user: 'a',
      score: 60,
    },
    {
      item: 'Test',
      user: 'b',
      score: 70,
    },
    {
      item: 'Language',
      user: 'a',
      score: 70,
    },
    {
      item: 'Language',
      user: 'b',
      score: 50,
    },
    {
      item: 'Technology',
      user: 'a',
      score: 50,
    },
    {
      item: 'Technology',
      user: 'b',
      score: 40,
    },
    {
      item: 'Support',
      user: 'a',
      score: 30,
    },
    {
      item: 'Support',
      user: 'b',
      score: 40,
    },
    {
      item: 'Sales',
      user: 'a',
      score: 60,
    },
    {
      item: 'Sales',
      user: 'b',
      score: 40,
    },
    {
      item: 'UX',
      user: 'a',
      score: 50,
    },
    {
      item: 'UX',
      user: 'b',
      score: 60,
    },
  ];

  it('创建 & 销毁图表', () => {
    const radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
    });
    radarPlot.render();
    const plot = radarPlot.getLayer() as ViewLayer;
    const positionField = plot.config.geometries[0].position.fields;
    const colorField = plot.config.geometries[0].color.fields;
    expect(radarPlot).toBeInstanceOf(Radar);
    expect(positionField[0]).toBe('item');
    expect(positionField[1]).toBe('score');
    expect(colorField[0]).toBe('user');
    radarPlot.destroy();
  });

  it('angleAxis', () => {
    const radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      angleAxis: {
        label: {
          visible: true,
          formatter: () => {
            return 'a';
          },
          style: {
            fill: 'red',
          },
        },
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: {
            stroke: 'red',
            length: 5,
            lineWidth: 1,
          },
        },
      },
    });
    radarPlot.render();
    const layer = radarPlot.getLayer() as ViewLayer;
    const view = layer.view;
    const axis = view.getController('axis') as any;
    const angleAxis = axis.option['item'];
    const line = angleAxis.line;
    const tickLine = angleAxis.tickLine;
    const label = angleAxis.label;
    // const labels = axis.get('labelItems');
    // expect(labels[0].text).toBe('a');
    expect(line.style.stroke).toBe('red');
    expect(tickLine.style.stroke).toBe('red');
    expect(label.style.fill).toBe('red');
    radarPlot.destroy();
  });

  it('radiusAxis', () => {
    const radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      radiusAxis: {
        label: {
          visible: true,
          formatter: () => {
            return 'a';
          },
          style: {
            fill: 'red',
          },
        },
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: {
            stroke: 'red',
            length: 5,
            lineWidth: 1,
          },
        },
      },
    });
    radarPlot.render();
    const layer = radarPlot.getLayer() as ViewLayer;
    const view = layer.view;
    const axis = view.getController('axis') as any;
    const radiusAxis = axis.option['score'];
    const line = radiusAxis.line;
    const tickLine = radiusAxis.tickLine;
    const label = radiusAxis.label;
    // const labels = axis.get('labelItems');
    // expect(labels[0].text).toBe('a');
    expect(line.style.stroke).toBe('red');
    expect(tickLine.style.stroke).toBe('red');
    expect(label.style.fill).toBe('red');
    radarPlot.destroy();
  });

  it('legend', () => {
    let radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      legend: {
        visible: true,
        position: 'bottom-center',
      },
    });
    radarPlot.render();
    let layer = radarPlot.getLayer() as ViewLayer;
    let view = layer.view;
    let legend = view.getController('legend') as any;
    expect(legend.option.position).toBe('bottom');
    radarPlot.destroy();

    radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      legend: {
        visible: true,
        position: 'left',
      },
    });
    radarPlot.render();
    layer = radarPlot.getLayer() as ViewLayer;
    view = layer.view;
    legend = view.getController('legend') as any;
    expect(legend.option.position).toBe('left');
    radarPlot.destroy();
  });

  // it('label', () => { });

  // it('ploygon 显示及样式', () => {
  //   /** area不显示 */
  //   let radarPlot = new Radar(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     data,
  //     angleField: 'item',
  //     radiusField: 'score',
  //     seriesField: 'user',
  //     area: {
  //       visible: false,
  //     },
  //   });
  //   radarPlot.render();
  //   let plot = radarPlot.getLayer().plot;
  //   const elements = plot.get('elements');
  //   expect(elements.length).toBe(1);
  //   expect(elements[0].get('type')).toBe('line');
  //   radarPlot.destroy();
  //   /** area样式 */
  //   radarPlot = new Radar(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     data,
  //     angleField: 'item',
  //     radiusField: 'score',
  //     seriesField: 'user',
  //     area: {
  //       style: {
  //         stroke: 'red',
  //         lineWidth: 2,
  //       },
  //     },
  //     line: {
  //       visible: false,
  //     },
  //   });
  //   radarPlot.render();
  //   plot = radarPlot.getLayer().plot;
  //   const shapes = radarPlot.plot.get('elements')[0].getShapes();
  //   expect(shapes[0].attr('stroke')).toBe('red');
  //   expect(shapes[0].attr('lineWidth')).toBe(2);
  //   radarPlot.destroy();
  // });
  //
  // it('line 显示及样式', () => {
  //   /** line不显示 */
  //   let radarPlot = new Radar(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     data,
  //     angleField: 'item',
  //     radiusField: 'score',
  //     seriesField: 'user',
  //     line: {
  //       visible: false,
  //     },
  //   });
  //   radarPlot.render();
  //   const plot = radarPlot.getLayer().plot;
  //   const elements = plot.get('elements');
  //   expect(elements.length).toBe(1);
  //   expect(elements[0].get('type')).toBe('area');
  //   radarPlot.destroy();
  //   /** line样式 */
  //   radarPlot = new Radar(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     data,
  //     angleField: 'item',
  //     radiusField: 'score',
  //     seriesField: 'user',
  //     area: {
  //       visible: true,
  //     },
  //     line: {
  //       visible: true,
  //       style: {
  //         lineDash: [2, 2],
  //         color: 'red',
  //       },
  //     },
  //   });
  //   radarPlot.render();
  //   const shapes = radarPlot
  //     .getLayer()
  //     .plot.get('elements')[1]
  //     .getShapes();
  //   expect(shapes[1].attr('lineDash')[0]).toBe(2);
  //   radarPlot.destroy();
  // });
  //
  // it('point 显示及样式', () => {
  //   /** 显示point */
  //   const radarPlot = new Radar(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     data,
  //     angleField: 'item',
  //     radiusField: 'score',
  //     seriesField: 'user',
  //     point: {
  //       visible: true,
  //       style: {
  //         color: 'red',
  //       },
  //     },
  //   });
  //   radarPlot.render();
  //   const elements = radarPlot.getLayer().plot.get('elements');
  //   expect(elements.length).toBe(3);
  //   expect(elements[2].get('type')).toBe('point');
  //   const shapes = radarPlot.plot.get('elements')[2].getShapes();
  //   expect(shapes[0].attr('stroke')).toBe('red');
  //   radarPlot.destroy();
  // });
  //
  // it('auto padding', () => {
  //   const radarPlot = new Radar(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     title: {
  //       text: 'title',
  //       style: {
  //         fill: 'red',
  //       },
  //     },
  //     description: {
  //       text: 'description',
  //       style: {
  //         fill: 'red',
  //       },
  //     },
  //     padding: 'auto',
  //     data,
  //     angleField: 'item',
  //     radiusField: 'score',
  //     seriesField: 'user',
  //   });
  //   radarPlot.render();
  //   const padding = radarPlot.getLayer().plot.get('padding');
  //   expect(padding[0] >= 20).toBe(true);
  //   expect(padding[1] >= 20).toBe(true);
  //   expect(padding[2] >= 40).toBe(true);
  //   expect(padding[3] >= 20).toBe(true);
  //   radarPlot.destroy();
  // });
  //
  // it('title & description', () => {
  //   const radarPlot = new Radar(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     title: {
  //       text: 'title',
  //       style: {
  //         fill: 'red',
  //       },
  //     },
  //     description: {
  //       text: 'description',
  //       style: {
  //         fill: 'red',
  //       },
  //     },
  //     data,
  //     angleField: 'item',
  //     radiusField: 'score',
  //     seriesField: 'user',
  //   });
  //   const title = radarPlot.getLayer().title;
  //   const description = radarPlot.getLayer().description;
  //   expect(title.attr('text')).toBe('title');
  //   expect(title.attr('fill')).toBe('red');
  //   expect(description.shape.attr('text')).toBe('description');
  //   expect(description.shape.attr('fill')).toBe('red');
  //   radarPlot.destroy();
  // });
});
