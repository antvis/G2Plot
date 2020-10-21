import { Heatmap } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('x*y*color and type', async () => {
    const data = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/heatmap.json').then((res) =>
      res.json()
    );
    const heatmap = new Heatmap(createDiv('type density'), {
      width: 600,
      height: 500,
      data,
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
    heatmap.update({
      ...heatmap.options,
      color: '#F51D27-#FA541C-#FF8C12',
    });
    // @ts-ignore
    expect(heatmap.chart.geometries[0].attributeOption.color.values).toBe('#F51D27-#FA541C-#FF8C12');
  });
});
