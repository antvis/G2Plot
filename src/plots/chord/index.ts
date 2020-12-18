import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { Datum } from '../../types';
import { ChordOptions } from './types';
import { adaptor } from './adaptor';

export { ChordOptions };

/**
 *  弦图 Chord
 */
export class Chord extends Plot<ChordOptions> {
  /** 图表类型 */
  public type: string = 'chord';

  protected getDefaultOptions() {
    return {
      nodeStyle: {
        opacity: 1,
        fillOpacity: 1,
        lineWidth: 1,
      },
      edgeStyle: {
        opacity: 0.5,
        lineWidth: 2,
      },
      label: {
        fields: ['x', 'name'],
        callback: (x: number[], name: string) => {
          const centerX = (x[0] + x[1]) / 2;
          const offsetX = centerX > 0.5 ? -4 : 4;
          return {
            labelEmit: true,
            style: {
              fill: '#8c8c8c',
            },
            offsetX,
            content: name,
          };
        },
      },
      tooltip: {
        fields: ['source', 'target', 'value'],
        formatter: (datum: Datum) => {
          const { source, target, value } = datum;
          return {
            name: `${source} -> ${target}`,
            value,
          };
        },
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
      weight: true,
      nodePaddingRatio: 0.1,
      nodeWidthRatio: 0.05,
    };
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<ChordOptions> {
    return adaptor;
  }
}
