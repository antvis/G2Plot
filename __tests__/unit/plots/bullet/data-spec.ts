import { transformData } from '../../../../src/plots/bullet/utils';

describe('bullet*data*transfrom', () => {
  it('data*transfrom', () => {
    const bulletData = [{ title: '数学', ranges: [30, 50, 100], measures: [20], target: 85 }];
    // 校验数据转换
    const { min, max, ds } = transformData({
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });

    // min > 0 ? 0 : min
    expect(min).toEqual(0);
    // 所有数据中的最大值
    expect(max).toEqual(100);

    // 转化为的数据应该为
    const transDS = [
      {
        title: '数学',
        ranges: 30,
        index: 'ranges_0',
      },
      {
        title: '数学',
        ranges: 20,
        index: 'ranges_1',
      },
      {
        title: '数学',
        ranges: 50,
        index: 'ranges_2',
      },
      {
        title: '数学',
        measures: 20,
        index: 'measures', // 只有一个数据
      },
      {
        title: '数学',
        target: 85,
        index: 'target',
      },
    ];
    expect(ds).toEqual(transDS);
  });

  it('data*transfrom*modify', () => {
    const bulletData = [{ title: 'antv', subTitle: 'g2', count: [30, 50, 100, 150], measures: [20, 30], target: 85 }];
    // 校验数据转换
    const { min, max, ds } = transformData({
      data: bulletData,
      measureField: 'measures',
      rangeField: 'count',
      targetField: 'target',
      xField: 'subTitle',
    });
    // min > 0 ? 0 : min
    expect(min).toEqual(0);

    // 所有数据中的最大值
    expect(max).toEqual(150);

    // 转化为的数据应该为
    const transDS = [
      {
        subTitle: 'g2',
        count: 30,
        index: 'count_0',
      },
      {
        subTitle: 'g2',
        count: 20,
        index: 'count_1',
      },
      {
        subTitle: 'g2',
        count: 50,
        index: 'count_2',
      },
      {
        subTitle: 'g2',
        count: 50,
        index: 'count_3',
      },
      {
        subTitle: 'g2',
        measures: 20,
        index: 'measures_0', // 多个数据
      },
      {
        subTitle: 'g2',
        measures: 30,
        index: 'measures_1',
      },
      {
        subTitle: 'g2',
        target: 85,
        index: 'target',
      },
    ];
    expect(ds).toEqual(transDS);
  });
});
