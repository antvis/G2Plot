import { deepMix } from '../../../src/utils';

describe('deepMix', () => {
  it('deepMix', () => {
    const fn = jest.fn();
    // undefined -> number
    expect(deepMix({}, { value: 0 }, { value: undefined })).toEqual({ value: undefined });
    expect(deepMix({}, { value: undefined }, { value: 0 })).toEqual({ value: 0 });
    // boolean -> boolean
    expect(deepMix({}, { value: false }, { value: true })).toEqual({
      value: true,
    });
    expect(deepMix({}, { value: true }, { value: false })).toEqual({
      value: false,
    });
    // null -> boolean
    expect(deepMix({}, { value: true }, { value: null })).toEqual({
      value: null,
    });
    expect(deepMix({}, { value: false }, { value: null })).toEqual({
      value: null,
    });
    // boolean => ''
    expect(deepMix({}, { value: true }, { value: '' })).toEqual({
      value: '',
    });
    expect(deepMix({}, { value: '' }, { value: false })).toEqual({
      value: false,
    });
    expect(deepMix({}, { value: '' }, { value: true })).toEqual({
      value: true,
    });
    // string => string
    expect(deepMix({}, { value: 'a' }, { value: 'b' })).toEqual({
      value: 'b',
    });
    // string => NaN
    expect(deepMix({}, { value: NaN }, { value: 'NaN' })).toEqual({
      value: 'NaN',
    });
    // boolean => NaN
    expect(deepMix({}, { value: true }, { value: NaN })).toEqual({
      value: NaN,
    });
    // fn
    expect(deepMix({}, { value: 0 }, { value: undefined, callback: fn })).toEqual({
      value: undefined,
      callback: fn,
    });
    // Array
    expect(deepMix({}, { value: 0, callback: fn }, { value: 1, callback: fn, list: [0, 2, 1] })).toEqual({
      value: 1,
      callback: fn,
      list: [0, 2, 1],
    });
    expect(deepMix({}, { value: 0, callback: fn, list: [1] }, { value: 1, callback: fn, list: [0, 2, 1] })).toEqual({
      value: 1,
      callback: fn,
      list: [0, 2, 1],
    });
    // object
    expect(
      deepMix(
        {},
        {
          value: null,
          callback: fn,
          data: {
            list: [
              {
                age: 19,
                name: 'xiaoming',
              },
            ],
          },
        },
        { value: undefined, callback: fn }
      )
    ).toEqual({
      value: undefined,
      callback: fn,
      data: {
        list: [
          {
            age: 19,
            name: 'xiaoming',
          },
        ],
      },
    });

    expect(
      deepMix(
        {},
        {
          value: null,
          callback: fn,
          data: {
            list: [
              {
                age: 19,
                name: 'xiaoming',
              },
            ],
          },
        },
        {
          value: undefined,
          callback: fn,
          data: {
            list: [
              {
                age: 18,
                name: 'xiaoming',
              },
            ],
          },
        }
      )
    ).toEqual({
      value: undefined,
      callback: fn,
      data: {
        list: [
          {
            age: 18,
            name: 'xiaoming',
          },
        ],
      },
    });

    expect(
      deepMix(
        {},
        {
          value: null,
          callback: fn,
          data: {
            list: [
              {
                age: 19,
                name: 'xiaoming',
              },
            ],
          },
        },
        {
          value: undefined,
          callback: fn,
          status: 200,
          data: {
            list: [
              {
                age: 18,
                name: 'xiaoming',
              },
            ],
          },
        }
      )
    ).toEqual({
      value: undefined,
      callback: fn,
      status: 200,
      data: {
        list: [
          {
            age: 18,
            name: 'xiaoming',
          },
        ],
      },
    });
  });
});
