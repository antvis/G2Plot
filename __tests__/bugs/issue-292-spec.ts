import { Heatmap } from '../../src';
import { createDiv } from '../utils/dom';
import { heatmapData } from '../data/heatmap';

describe('heatmap', () => {
  it('x*y*color and type', async () => {
    const heatmap = new Heatmap(createDiv('type density'), {
      width: 600,
      height: 500,
      data: [],
      autoFit: false,
      type: 'density',
      xField: 'g',
      yField: 'l',
      colorField: 'tmp',
      color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
      annotations: [
        {
          type: 'image',
          start: ['min', 'max'],
          end: ['max', 'min'],
          src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        },
      ],
    });

    heatmap.render();
    const geometry = heatmap.chart.geometries[0];
    // @ts-ignore
    const { attributeOption } = geometry;
    expect(heatmap.options.type).toBe('density');
    expect(geometry.type).toBe('heatmap');
    expect(attributeOption.position.fields).toEqual(['g', 'l']);
    expect(attributeOption.color.fields).toEqual(['tmp']);
    expect(attributeOption.color.values).toBe(
      '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2'
    );
    heatmap.changeData(heatmapData);
    expect(heatmap.chart.geometries[0].data.length).toBe(500);
    expect(heatmap.chart.getOptions().data.length).toBe(500);

    heatmap.destroy();
  });
});
