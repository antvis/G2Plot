import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { Datum } from '../../types';
import { ChordOptions } from './types';
import { adaptor } from './adaptor';

export { ChordOptions };

/**
 *  桑基图 Sankey
 */
export class Chord extends Plot<ChordOptions> {
  /** 图表类型 */
  public type: string = 'chord';

  protected getDefaultOptions() {
    return {
      // appendPadding: 8,
      // syncViewPadding: true,
      nodeStyle: {
        opacity: 1,
        fillOpacity: 1,
        lineWidth: 1,
      },
      edgeStyle: {
        opacity: 0.5,
        lineWidth: 0,
      },
      color: [
        '#FF4500',
        '#1AAF8B',
        '#406C85',
        '#F6BD16',
        '#B40F0F',
        '#2FB8FC',
        '#4435FF',
        '#FF5CA2',
        '#BBE800',
        '#FE8A26',
      ],
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
        fields: ['sourceName', 'targetName', 'sourceWeight', 'targetWeight'],
        formatter: (datum: Datum) => {
          const { sourceName, targetName, sourceWeight, targetWeight } = datum;
          let value = sourceWeight;
          if (sourceWeight != targetWeight) value = `${sourceWeight} -> ${targetWeight}`;
          return {
            name: `${sourceName} -> ${targetName}`,
            value,
          };
        },
      },
      weight: true,
      marginRatio: 0.1,
      thickness: 0.05,
    };
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<ChordOptions> {
    return adaptor;
  }
}
