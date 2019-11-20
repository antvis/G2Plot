import { Pie } from '../../src';
import '../../src/plots/pie/component/label/upgrade-label';

describe('Pie plot with upgrade-pie label', () => {
  const createDiv = (id: string) => {
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '600px';
    canvasDiv.style.height = '600px';
    canvasDiv.style.left = '30px';
    canvasDiv.style.top = '30px';
    canvasDiv.id = id;
    document.body.appendChild(canvasDiv);
    return canvasDiv;
  };

  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: 'Other',
      value: 5,
    },
  ];

  it('label, one line', () => {
    const canvasDiv = createDiv('div1');
    const piePlot = new Pie(canvasDiv, {
      forceFit: true,
      padding: [16, 0, 0, 0],
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      legend: {
        visible: false,
      },
      label: {
        visible: true,
        type: 'upgrade-pie',
        formatter: (text, item) => {
          return `${item._origin['type']} (${item._origin['value']})`;
        },
        style: {
          fill: 'red',
        },
      },
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const labelGroup = plot
      .get('elements')[0]
      .get('container')
      .get('children')[1]
      .get('children')[0]
      .get('children');
    const coord = plot.get('coord');
    expect(labelGroup[0].attr('fill')).toBe('red');
    const distX = Math.abs(coord.getCenter().x - labelGroup[0].attr('x'));
    const distY = Math.abs(coord.getCenter().y - labelGroup[0].attr('y'));
    const dist = Math.sqrt(distX * distX + distY * distY);
    expect(dist > coord.getRadius()).toBe(true);
    piePlot.destroy();
  });

  it('label, double line', () => {
    const canvasDiv = createDiv('div2');
    const piePlot = new Pie(canvasDiv, {
      forceFit: true,
      padding: [16, 0, 0, 0],
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      legend: {
        visible: false,
      },
      label: {
        visible: true,
        type: 'upgrade-pie',
        formatter: (text, item) => {
          return `${item._origin['type']} (${item._origin['value']})`;
        },
        style: {
          fill: 'red',
        },
      },
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const labelGroup = plot
      .get('elements')[0]
      .get('container')
      .get('children')[1]
      .get('children')[0]
      .get('children');
    const coord = plot.get('coord');
    expect(labelGroup[0].attr('fill')).toBe('red');
    const distX = Math.abs(coord.getCenter().x - labelGroup[0].attr('x'));
    const distY = Math.abs(coord.getCenter().y - labelGroup[0].attr('y'));
    const dist = Math.sqrt(distX * distX + distY * distY);
    expect(dist > coord.getRadius()).toBe(true);
    // piePlot.destroy();
  });
});
