import { Radar } from '../../../../src';

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

  it('radar create & destroy', () => {
    const radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
    });
    radarPlot.render();
    const plot = radarPlot.getLayer();
    // @ts-ignore
    const positionField = plot.config.geometries[0].position.fields;
    // @ts-ignore
    const colorField = plot.config.geometries[0].color.fields;
    expect(radarPlot).toBeInstanceOf(Radar);
    expect(positionField[0]).toBe('item');
    expect(positionField[1]).toBe('score');
    expect(colorField[0]).toBe('user');
    radarPlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('radar angleAxis', () => {
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
            return 'angleAxis';
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
      radiusAxis: {
        label: {
          visible: false,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
      },
    });
    radarPlot.render();
    const view = radarPlot.getLayer().view;
    const angleAxisLabelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-label';
    });
    expect(angleAxisLabelShapes[0].attr('text')).toBe('angleAxis');
    expect(angleAxisLabelShapes[0].attr('fill')).toBe('red');
    const angleAxisLineShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-line';
    });
    expect(angleAxisLineShapes[0].attr('stroke')).toBe('red');
    const angleAxisTickLineShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-tickLine';
    });
    expect(angleAxisTickLineShapes[0].attr('stroke')).toBe('red');
    expect(angleAxisTickLineShapes[0].attr('length')).toBe(5);
    expect(angleAxisTickLineShapes[0].attr('lineWidth')).toBe(1);
    radarPlot.destroy();
  });

  it('radar radiusAxis', () => {
    const radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      angleAxis: {
        label: {
          visible: false,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
      },
      radiusAxis: {
        label: {
          visible: true,
          formatter: () => {
            return 'radiusAxis';
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
    const view = radarPlot.getLayer().view;
    const angleAxisLabelShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-label';
    });
    expect(angleAxisLabelShapes[0].attr('text')).toBe('radiusAxis');
    expect(angleAxisLabelShapes[0].attr('fill')).toBe('red');
    const angleAxisLineShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-line';
    });
    expect(angleAxisLineShapes[0].attr('stroke')).toBe('red');
    const angleAxisTickLineShapes = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-tickLine';
    });
    expect(angleAxisTickLineShapes[0].attr('stroke')).toBe('red');
    expect(angleAxisTickLineShapes[0].attr('length')).toBe(5);
    expect(angleAxisTickLineShapes[0].attr('lineWidth')).toBe(1);
    radarPlot.destroy();
  });

  it('radar legend', () => {
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
    let layer = radarPlot.getLayer();
    let view = layer.view;
    let legend = view.getController('legend');
    // @ts-ignore
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
    layer = radarPlot.getLayer();
    view = layer.view;
    legend = view.getController('legend');
    // @ts-ignore
    expect(legend.option.position).toBe('left');
    radarPlot.destroy();
  });

  it('radar label', () => {
    /** 显示在 line 上 */
    const filterData = data.filter((item) => item.user === 'a');
    let radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data: filterData,
      angleField: 'item',
      radiusField: 'score',
      label: {
        visible: true,
      },
    });
    radarPlot.render();
    let view = radarPlot.getLayer().view;
    let labelShapes = view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'label';
    });
    expect(labelShapes.length).toBe(filterData.length);
    labelShapes.forEach((label, index) => {
      expect(label.get('data').item).toBe(filterData[index].item);
      expect(label.get('data').score).toBe(filterData[index].score);
    });

    /** 显示在 area 上 */
    radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data: filterData,
      angleField: 'item',
      radiusField: 'score',
      line: {
        visible: false,
      },
      label: {
        visible: true,
      },
    });
    radarPlot.render();
    view = radarPlot.getLayer().view;
    labelShapes = view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'label';
    });
    expect(labelShapes.length).toBe(filterData.length);
    labelShapes.forEach((label, index) => {
      expect(label.get('data').item).toBe(filterData[index].item);
      expect(label.get('data').score).toBe(filterData[index].score);
    });

    /** 显示在 point 上 */
    radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data: filterData,
      angleField: 'item',
      radiusField: 'score',
      point: {
        visible: true,
      },
      label: {
        visible: true,
      },
    });
    radarPlot.render();
    view = radarPlot.getLayer().view;
    labelShapes = view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'label';
    });
    expect(labelShapes.length).toBe(filterData.length);
    labelShapes.forEach((label, index) => {
      expect(label.get('data').item).toBe(filterData[index].item);
      expect(label.get('data').score).toBe(filterData[index].score);
    });
  });

  it('radar animate', () => {
    const radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      animation: false,
      point: {
        visible: true,
      },
    });
    radarPlot.render();
    const geometries = radarPlot.getLayer().view.geometries;
    geometries.forEach((geometry) => {
      expect(geometry.animateOption).toBe(false);
    });
  });

  it('radar area visible and style', () => {
    /** area 不显示 */
    let radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      area: {
        visible: false,
      },
    });
    radarPlot.render();
    let view = radarPlot.getLayer().view;
    expect(view.geometries.length).toBe(1);
    expect(view.geometries[0].type).toBe('line');
    radarPlot.destroy();
    /** area 样式 */
    radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      area: {
        style: {
          fill: 'red',
        },
      },
      line: {
        visible: false,
      },
    });
    radarPlot.render();
    view = radarPlot.getLayer().view;
    expect(view.geometries[0].elements[0].shape.attr('fill')).toBe('red');
    radarPlot.destroy();
  });

  it('radar line visible and style', () => {
    /** line 不显示 */
    let radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      line: {
        visible: false,
      },
    });
    radarPlot.render();
    let view = radarPlot.getLayer().view;
    expect(view.geometries.length).toBe(1);
    expect(view.geometries[0].type).toBe('area');
    radarPlot.destroy();
    /** line 样式 */
    radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      area: {
        visible: true,
      },
      line: {
        visible: true,
        style: {
          lineDash: [2, 2],
          stroke: 'red',
        },
      },
    });
    radarPlot.render();
    view = radarPlot.getLayer().view;
    expect(view.geometries[1].elements[0].shape.attr('lineDash')[0]).toBe(2);
    radarPlot.destroy();
  });

  it('radar point visible and style', () => {
    /** 显示point */
    const radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      point: {
        visible: true,
        style: {
          stroke: 'black',
          fill: 'red',
        },
      },
    });
    radarPlot.render();
    const view = radarPlot.getLayer().view;
    expect(view.geometries.length).toBe(3);
    expect(view.geometries[2].type).toBe('point');
    expect(view.geometries[2].elements[0].shape.attr('fill')).toBe('red');
    radarPlot.destroy();
  });

  it('radar title & description', () => {
    const radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      title: {
        visible: true,
        text: 'title',
        style: {
          fill: 'red',
        },
      },
      description: {
        visible: true,
        text: 'description',
        style: {
          fill: 'red',
        },
      },
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
    });
    radarPlot.render();
    const radarLayer = radarPlot.getLayer();
    const title = radarLayer.title;
    const description = radarLayer.description;
    // @ts-ignore
    expect(title.text).toBe('title');
    // @ts-ignore
    expect(title.style.fill).toBe('red');
    expect(description.shape.attr('text')).toBe('description');
    expect(description.shape.attr('fill')).toBe('red');
    radarPlot.destroy();
  });

  it('radar grid type', () => {
    let radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      angleAxis: {
        visible: false,
      },
      radiusAxis: {
        grid: {
          line: {
            type: 'line',
          },
          alternateColor: ['#ccc', null],
        },
      },
    });
    radarPlot.render();
    let view = radarPlot.getLayer().view;
    let gridLineShape = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'grid-line';
    });
    expect(gridLineShape[0].cfg.hasArc).toBe(false);

    radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      angleAxis: {
        visible: false,
      },
    });
    radarPlot.render();
    view = radarPlot.getLayer().view;
    gridLineShape = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'grid-line';
    });
    expect(gridLineShape[0].cfg.hasArc).toBe(true);
  });

  it('radar grid type alternateColor', () => {
    let radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
    });
    radarPlot.render();
    let view = radarPlot.getLayer().view;
    let gridRegionShape = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'grid-region';
    });
    expect(gridRegionShape.length).toBe(0);

    radarPlot = new Radar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      radiusAxis: {
        grid: {
          alternateColor: ['#ccc', null],
        },
      },
    });
    radarPlot.render();
    view = radarPlot.getLayer().view;
    gridRegionShape = view.backgroundGroup.findAll((el) => {
      return el.get('name') === 'grid-region';
    });
    expect(gridRegionShape[0].attr('fill')).toBe('#ccc');
  });
});
