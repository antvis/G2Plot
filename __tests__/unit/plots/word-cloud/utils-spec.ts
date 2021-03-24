import { deepMix } from '@antv/util';
import { Params } from '../../../../src/core/adaptor';
import { WordCloudOptions } from '../../../../src/plots/word-cloud';
import {
  getFontSizeMapping,
  getSingleKeyValues,
  getSize,
  processImageMask,
  transform,
} from '../../../../src/plots/word-cloud/utils';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe.skip('word-cloud utils', () => {
  const params: Params<WordCloudOptions> = {
    chart: {
      width: 500,
      height: 500,
      padding: 10,
      appendPadding: 10,
    } as any,
    options: {
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      autoFit: false,
      timeInterval: 2000,
      imageMask: null,
      wordStyle: {
        fontFamily: 'Verdana',
        fontWeight: 'normal',
        padding: 1,
        fontSize: [20, 60],
        rotation: [0, 90],
        rotationSteps: 2,
      },
    },
  };

  it('utils: transform', () => {
    const result = transform(params).filter((v) => v.hasText);

    expect(CountryEconomy.some((v) => v.Country === result[0].text)).toBe(true);
    expect(CountryEconomy.some((v) => v.GDP === result[0].value)).toBe(true);
    expect(result[0].font).toBe('Verdana');
    expect(result[0].style).toBe('normal');
    expect(result[0].weight).toBe('normal');
    expect(result.every((row) => row.size >= 20 && row.size <= 60)).toBe(true);
    expect(result.every((row) => row.rotate === 0 || row.rotate === 90)).toBe(true);
  });

  it('utils: transform, no data', () => {
    const p = deepMix({}, params, {
      options: {
        data: null,
      },
    });
    expect(transform(p).length).toBe(0);
  });

  it('utils: transform, data is empty', () => {
    const p = deepMix({}, params, {
      options: {
        data: [],
      },
    });
    expect(transform(p).length).toBe(0);
  });

  it('utils: getSize & autoFit is true', () => {
    const container = createDiv();
    container.setAttribute('style', 'display: inline-block; width: 100px; height: 100px');

    const size = getSize({
      autoFit: true,
      width: 200,
      height: 200,
      padding: 0,
      appendPadding: 0,
      container,
    });

    expect(size).toEqual([100, 100]);
  });

  it('utils: getSize & autoFit is false', () => {
    const container = createDiv();
    container.setAttribute('style', 'display: inline-block; width: 100px; height: 100px');

    const size = getSize({
      autoFit: false,
      width: 200,
      height: 200,
      padding: 0,
      appendPadding: 0,
      container,
    });

    expect(size).toEqual([200, 200]);
  });

  it('utils: getSize & width and height both 0', () => {
    const container = createDiv();
    container.setAttribute('style', 'display: inline-block; width: 100px; height: 100px');

    const size = getSize({
      autoFit: false,
      width: 0,
      height: 0,
      padding: 0,
      appendPadding: 0,
      container,
    });

    expect(size).toEqual([400, 400]);
  });

  it('utils: getSize & padding and appendPadding', () => {
    const container = createDiv();
    container.setAttribute('style', 'display: inline-block; width: 100px; height: 100px');

    const size = getSize({
      autoFit: false,
      width: 200,
      height: 200,
      padding: 10,
      appendPadding: 10,
      container,
    });

    expect(size).toEqual([160, 160]);
  });

  it('utils: padding is Array', () => {
    const p1 = deepMix({}, params, {
      chart: {
        padding: [10],
      },
    });
    const p2 = deepMix({}, params, {
      chart: {
        padding: [10, 10],
      },
    });
    const p3 = deepMix({}, params, {
      chart: {
        padding: [10, 10, 10],
      },
    });
    const p4 = deepMix({}, params, {
      chart: {
        padding: [10, 10, 10, 10],
      },
    });
    const p5 = deepMix({}, params, {
      chart: {
        padding: [],
      },
    });

    const r1 = transform(p1).filter((v) => v.hasText);
    const r2 = transform(p2).filter((v) => v.hasText);
    const r3 = transform(p3).filter((v) => v.hasText);
    const r4 = transform(p4).filter((v) => v.hasText);
    const r5 = transform(p5).filter((v) => v.hasText);

    expect(r1.length > 0).toBe(true);
    expect(r2.length > 0).toBe(true);
    expect(r3.length > 0).toBe(true);
    expect(r4.length > 0).toBe(true);
    expect(r5.length > 0).toBe(true);
  });

  it('utils: padding is String', () => {
    const p1 = deepMix({}, params, {
      chart: {
        padding: 'auto',
      },
    });
    expect(transform(p1).length > 0).toBe(true);
  });

  it('utils: fontSize is a function', () => {
    const p1 = deepMix({}, params, {
      options: {
        wordStyle: {
          fontSize: () => 20,
        },
      },
    });

    const result = transform(p1).filter((v) => v.hasText);
    expect(result.every((row) => row.size === 20)).toBe(true);
  });

  it('utils: fontSize is a number', () => {
    const p1 = deepMix({}, params, {
      options: {
        wordStyle: {
          fontSize: 20,
        },
      },
    });

    const result = transform(p1).filter((v) => v.hasText);
    expect(result.every((row) => row.size === 20)).toBe(true);
  });

  it('utils: rotation is number', () => {
    const p1 = deepMix({}, params, {
      options: {
        wordStyle: {
          rotation: 10,
        },
      },
    });

    const result = transform(p1).filter((v) => v.hasText);
    expect(result.every((row) => row.rotate === 10)).toBe(true);
  });

  it('utils: rotation is function', () => {
    const p1 = deepMix({}, params, {
      options: {
        wordStyle: {
          rotation: () => 10,
        },
      },
    });

    const result = transform(p1).filter((v) => v.hasText);
    expect(result.every((row) => row.rotate === 10)).toBe(true);
  });

  it('utils: rotation is array', () => {
    const p1 = deepMix({}, params, {
      options: {
        wordStyle: {
          rotation: [10, 10],
        },
      },
    });

    const result = transform(p1).filter((v) => v.hasText);
    expect(result.every((row) => row.rotate === 10)).toBe(true);
  });

  it('utils: rotationSteps is 0', () => {
    const p1 = deepMix({}, params, {
      options: {
        wordStyle: {
          rotationSteps: 0, // 等于 0 时，自动转换成默认值 1
        },
      },
    });

    const result = transform(p1).filter((v) => v.hasText);
    expect(result.every((row) => row.rotate === 0)).toBe(true);
  });

  it('utils: processImageMask, HTMLImageElement', async () => {
    const image = new Image();

    const img = await processImageMask(image);
    expect(img).toBe(image);
  });

  it('utils: processImageMask with url, error', async () => {
    // 无效 url
    const url = 'something';
    let img;

    try {
      img = await processImageMask(url);
      expect(img).toBe(undefined);
    } catch (img) {
      expect(img).toBe(undefined);
    }
  });

  it('utils: processImageMask with invalid value', async () => {
    // 无效值
    const url = {} as any;
    let img;

    try {
      img = await processImageMask(url);
      expect(img).toBe(undefined);
    } catch (img) {
      expect(img).toBe(undefined);
    }
  });

  it('utils: processImageMask, base64', async () => {
    const base64 =
      'data:image/png;base64,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';

    const img = await processImageMask(base64);
    expect(img instanceof HTMLImageElement).toBe(true);
  });

  it('option: placementStrategy', () => {
    const p = deepMix({}, params, {
      options: {
        placementStrategy: () => ({ x: 100, y: 100 }),
        wordStyle: {
          fontFamily: '字体',
          fontWeight: '字重',
          fontSize: 66,
          rotation: 99,
        },
      },
    });

    const result = transform(p).filter((v) => v.hasText);
    expect(result.length).toBe(CountryEconomy.length);
    result.forEach((item) => {
      expect(item.font).toBe('字体');
      expect(item.weight).toBe('字重');
      expect(item.size).toBe(66);
      expect(item.rotate).toBe(99);
      expect(item.x).toBe(100);
      expect(item.y).toBe(100);
    });
  });

  it('getFontSizeMapping', () => {
    const f1: any = getFontSizeMapping(10);
    expect(f1()).toBe(10);

    const foo = () => 10;
    const f2 = getFontSizeMapping(foo);
    expect(f2).toBe(foo);

    const data = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
    // 数据中字体权重都相同时，返回字体大小的中间值
    const f3: any = getFontSizeMapping([10, 20], [10, 10]);
    data.forEach((v) => {
      expect(f3(v)).toBe(15);
    });

    // 没有提供字体权重范围的话，返回字体大小的中间值
    const f4: any = getFontSizeMapping([10, 20]);
    data.forEach((v) => {
      expect(f4(v)).toBe(15);
    });

    const f5: any = getFontSizeMapping([10, 20], [1, 5]);
    data.forEach((v) => {
      expect(f5(v) >= 10 && f5(v) <= 20).toBe(true);
    });
  });

  it('getSingleKeyValues', () => {
    const data = [
      { value: 0 },
      { value: 1 },
      { value: '4' },
      { value: null },
      { value: undefined },
      { value: '' },
      { value: NaN },
      { value: false },
      { value: true },
      { value: Symbol('') },
      { value: {} },
      { value: () => 10 },
    ];

    // 只保留数字
    expect(getSingleKeyValues(data, 'value')).toEqual([0, 1]);
  });
});
