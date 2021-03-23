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
          const ratio = v.value / v.parent.value;
          return `${v.name}_${v.ext}_${ratio.toFixed(2)}`;
        },
      },
    });

    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].labelOption.fields).toEqual(['name', 'ext']);
    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].labelOption.cfg.position).toEqual('top');

    // 验证比例是否正确，以及 label 是否正常渲染
    const root = TREEMAP.children.reduce((sum, i) => sum + i.value, 0);
    const ratio = (TREEMAP.children[1].value / root).toFixed(2);

    expect(treemapPlot.chart.geometries[0].labelsContainer.getChildren()[0].cfg.children[0].attrs.text).toBe(
      `分类 2_自定义数据_${ratio}`
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
