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
        rKey: 'ranges_0',
      },
      {
        title: '数学',
        ranges: 20,
        rKey: 'ranges_1',
      },
      {
        title: '数学',
        ranges: 50,
        rKey: 'ranges_2',
      },
      {
        title: '数学',
        measures: 20,
        mKey: 'measures', // 只有一个数据
      },
      {
        title: '数学',
        target: 85,
        tKey: 'target',
      },
    ];
    expect(ds).toEqual(transDS);
  });

  it('data*moretarget', () => {
    const bulletData = [{ title: '数学', ranges: [30, 50, 100], measures: [20], target: [90, 85, 66] }];
    // 校验数据转换
    const { ds } = transformData({
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });

    // 转化为的数据应该为
    const transDS = [
      {
        title: '数学',
        ranges: 30,
        rKey: 'ranges_0',
      },
      {
        title: '数学',
        ranges: 20,
        rKey: 'ranges_1',
      },
      {
        title: '数学',
        ranges: 50,
        rKey: 'ranges_2',
      },
      {
        title: '数学',
        measures: 20,
        mKey: 'measures', // 只有一个数据
      },
      {
        title: '数学',
        target: 90,
        tKey: 'target_0',
      },
      {
        title: '数学',
        target: 85,
        tKey: 'target_1',
      },
      {
        title: '数学',
        target: 66,
        tKey: 'target_2',
      },
    ];
    expect(ds).toEqual(transDS);
  });

  it('data*one', () => {
    const bulletData = [{ title: '数学', ranges: 100, measures: 20, target: 90 }];
    // 校验数据转换
    const { ds } = transformData({
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });

    // 转化为的数据应该为
    const transDS = [
      {
        title: '数学',
        ranges: 100,
        rKey: 'ranges_0',
      },
      {
        title: '数学',
        measures: 20,
        mKey: 'measures', // 只有一个数据
      },
      {
        title: '数学',
        target: 90,
        tKey: 'target',
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
        rKey: 'count_0',
      },
      {
        subTitle: 'g2',
        count: 20,
        rKey: 'count_1',
      },
      {
        subTitle: 'g2',
        count: 50,
        rKey: 'count_2',
      },
      {
        subTitle: 'g2',
        count: 50,
        rKey: 'count_3',
      },
      {
        subTitle: 'g2',
        measures: 20,
        mKey: 'measures_0', // 多个数据
      },
      {
        subTitle: 'g2',
        measures: 30,
        mKey: 'measures_1',
      },
      {
        subTitle: 'g2',
        target: 85,
        tKey: 'target',
      },
    ];
    expect(ds).toEqual(transDS);
  });

  it('data*transfrom*layout', () => {
    const bulletData = [{ title: '数学', ranges: [-30, 50, 100], measures: [20], target: 85 }];
    // 校验数据转换
    const { min, max, ds } = transformData({
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      layout: 'vertical',
    });
    // min > 0 ? 0 : min
    expect(min).toEqual(-30);
    // 所有数据中的最大值
    expect(max).toEqual(100);

    // 转化为的数据应该为
    const transDS = [
      {
        rKey: 'ranges_0',
        title: '数学',
        ranges: -30,
      },
      {
        rKey: 'ranges_1',
        title: '数学',
        ranges: 80,
      },
      {
        rKey: 'ranges_2',
        title: '数学',
        ranges: 50,
      },
      {
        mKey: 'measures', // 只有一个数据
        title: '数学',
        measures: 20,
      },
      {
        tKey: 'target',
        title: '数学',
        target: 85,
      },
    ];
    transDS.reverse();
    expect(ds).toStrictEqual(transDS);
  });
});
