import { Line } from '../../src';
import { createDiv } from '../utils/dom';

describe('#939', () => {
  const canvasDiv = createDiv('canvas1');
  document.body.appendChild(canvasDiv);

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  it('title & description alignTo 配置项失效', () => {
    const line = new Line(canvasDiv, {
      title: {
        visible: true,
        alignTo: 'middle',
        text: '带数据点的折线图',
      },
      description: {
        visible: true,
        alignTo: 'right',
        text: '将折线图上的每一个数据点显示出来，作为辅助阅读。',
      },
      data,
      xField: 'year',
      yField: 'value',
    });
    line.render();
    const layer = line.getLayers()[0];
    const { title, description } = layer;
    const theme = line.getPlotTheme();
    const leftMargin = layer.layerBBox.minX + theme.title.padding[3];
    const rightMargin = layer.layerBBox.maxX - theme.title.padding[1];
    const wrapperWidth = layer.width - theme.title.padding[3] - theme.title.padding[1];
    const centerX = leftMargin + wrapperWidth / 2;
    const rightX = rightMargin;
    expect(title.shape.attr('textAlign')).toBe('center');
    expect(description.shape.attr('textAlign')).toBe('right');
    expect(title.shape.attr('x')).toBe(centerX);
    expect(description.shape.attr('x')).toBe(rightX);
    line.destroy();
  });
});
