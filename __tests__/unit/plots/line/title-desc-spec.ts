import Line, { LineConfig } from '../../../../src/plots/line';
import LineLayer from '../../../../src/plots/line/layer';

describe('title description', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [
    {
      year: '1991',
      value: 31,
    },
    {
      year: '1992',
      value: 41,
    },
    {
      year: '1993',
      value: 35,
    },
    {
      year: '1994',
      value: 55,
    },
    {
      year: '1995',
      value: 49,
    },
    {
      year: '1996',
      value: 15,
    },
    {
      year: '1997',
      value: 17,
    },
    {
      year: '1998',
      value: 29,
    },
    {
      year: '1999',
      value: 33,
    },
  ];

  it('title, desc render', () => {
    const plot = new Line<LineConfig>(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      title: {
        visible: true,
        text: '标题',
      },
      description: {
        visible: true,
        text: '副标题',
      },
    });
    plot.render();
    const view = plot.getLayer() as LineLayer;
    expect(view.title).not.toBe(null);
    expect(view.description).not.toBe(null);
    const region1 = { start: view.view.get('start'), end: view.view.get('end') };
    plot.updateConfig({
      title: {
        visible: false,
      },
    });
    plot.render();
    const region2 = { start: view.view.get('start'), end: view.view.get('end') };
    expect(region1).not.toEqual(region2);
    expect(view.title).toBe(null);
    expect(view.description).not.toBe(null);
    plot.updateConfig({
      description: {
        visible: false,
      },
    });
    plot.render();
    const region3 = { start: view.view.get('start'), end: view.view.get('end') };
    expect(view.title).toBe(null);
    expect(view.description).toBe(null);
    expect(region2).not.toEqual(region3);
  });
  it('title desription wrap', () => {
    const plot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      title: {
        visible: true,
        text: '标题',
      },
      description: {
        visible: true,
        text:
          '我们经过大量的项目实践和经验总结，总结了以下四条核心原则，并以重要等级进行排序，四条原则相辅相成且呈递进关系，希望你在设计时也可以采纳。',
      },
    });
    plot.render();
    const view = plot.getLayer() as LineLayer;
    expect(view.description).not.toBe(null);
    expect(view.description.shape.attrs.text)
      .toBe(`我们经过大量的项目实践和经验总结，总结了以下四条核心原则，并以重要等级进行排序，四条原则相辅
相成且呈递进关系，希望你在设计时也可以采纳。`);
  });
});
