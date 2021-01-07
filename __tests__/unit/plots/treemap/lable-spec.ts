import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { TREEMAP } from '../../../data/treemap';

describe('treemap basic', () => {
  it('default treemap', () => {
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
    });

    treemapPlot.render();

    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].labelOption.fields).toEqual(['name']);

    // label with custom
    treemapPlot.update({
      label: {
        position: 'top',
        style: {
          textAlign: 'start',
        },
        fields: ['name', 'ext'],
        formatter: (v) => {
          return `${v.name}${v.ext}`;
        },
      },
    });

    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].labelOption.fields).toEqual(['name', 'ext']);
    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].labelOption.cfg.position).toEqual('top');
    expect(treemapPlot.chart.geometries[0].labelsContainer.getChildren()[0].cfg.children[0].attrs.text).toBe(
      TREEMAP.children[0].name + TREEMAP.children[0].ext
    );

    // label with custom
    treemapPlot.update({
      label: false,
    });

    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].labelOption).toBeFalsy();
    treemapPlot.destroy();
  });
});
