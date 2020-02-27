import PaddingController from '../../../../src/base/controller/padding';
import { ViewLayer } from '../../../../src';
import BBox from '../../../../src/util/bbox';

describe('PaddingController', () => {
  // @ts-ignore
  const MockLayer = jest.fn<ViewLayer, any[]>().mockImplementation(() => ({
    type: 'mock',
    options: {
      data: [],
      width: 400,
      height: 360,
    },
    layerBBox: new BBox(0, 0, 400, 360),
  }));
  const inst = new PaddingController({
    plot: new MockLayer(),
  });

  beforeEach(() => {
    inst.clear();
  });

  it('registerPadding outer top', () => {
    const c1 = {
      position: 'top',
      getBBox: () => new BBox(0, 0, 400, 20),
    };
    inst.registerPadding(c1, 'outer');
    const range = inst.processOuterPadding();

    expect(range.minX).toBe(0);
    expect(range.maxX).toBe(400);
    expect(range.minY).toBe(20);
    expect(range.maxY).toBe(360);
  });

  it('registerPadding outer right', () => {
    const c1 = {
      position: 'right',
      getBBox: () => new BBox(380, 0, 20, 360),
    };
    inst.registerPadding(c1, 'outer');
    const range = inst.processOuterPadding();

    expect(range.minX).toBe(0);
    expect(range.maxX).toBe(380);
    expect(range.minY).toBe(0);
    expect(range.maxY).toBe(360);
  });

  it('registerPadding outer bottom', () => {
    const c1 = {
      position: 'bottom',
      getBBox: () => new BBox(0, 340, 400, 20),
    };
    inst.registerPadding(c1, 'outer');
    const range = inst.processOuterPadding();

    expect(range.minX).toBe(0);
    expect(range.maxX).toBe(400);
    expect(range.minY).toBe(0);
    expect(range.maxY).toBe(340);
  });

  it('registerPadding outer left', () => {
    const c1 = {
      position: 'left',
      getBBox: () => new BBox(0, 0, 20, 360),
    };
    inst.registerPadding(c1, 'outer');
    const range = inst.processOuterPadding();

    expect(range.minX).toBe(20);
    expect(range.maxX).toBe(400);
    expect(range.minY).toBe(0);
    expect(range.maxY).toBe(360);
  });

  it('registerPadding multiple outer', () => {
    const c1 = {
      position: 'top',
      getBBox: () => new BBox(0, 0, 400, 20),
    };
    const c2 = {
      position: 'bottom',
      getBBox: () => new BBox(0, 340, 400, 20),
    };
    const c3 = {
      position: 'bottom',
      getBBox: () => new BBox(0, 320, 400, 20),
    };
    const c4 = {
      position: 'left',
      getBBox: () => new BBox(0, 0, 20, 360),
    };
    const c5 = {
      position: 'right',
      getBBox: () => new BBox(380, 0, 20, 360),
    };
    inst.registerPadding(c1, 'outer');
    inst.registerPadding(c2, 'outer');
    inst.registerPadding(c3, 'outer');
    inst.registerPadding(c4, 'outer');
    inst.registerPadding(c5, 'outer');
    const range = inst.processOuterPadding();

    expect(range.minX).toBe(20);
    expect(range.maxX).toBe(380);
    expect(range.minY).toBe(20);
    expect(range.maxY).toBe(320);
  });

  it('clear', () => {
    const c1 = {
      position: 'top',
      getBBox: () => new BBox(0, 0, 400, 20),
    };
    const c2 = {
      position: 'bottom',
      getBBox: () => new BBox(0, 340, 400, 20),
    };
    const c3 = {
      position: 'bottom',
      getBBox: () => new BBox(0, 320, 400, 20),
    };
    const c4 = {
      position: 'left',
      getBBox: () => new BBox(0, 0, 20, 360),
    };
    const c5 = {
      position: 'right',
      getBBox: () => new BBox(380, 0, 20, 360),
    };
    inst.registerPadding(c1, 'outer');
    inst.registerPadding(c2, 'outer');
    inst.registerPadding(c3, 'outer');
    inst.registerPadding(c4, 'outer');
    inst.registerPadding(c5, 'outer');
    inst.clear();

    const range = inst.processOuterPadding();
    expect(range.minX).toBe(0);
    expect(range.maxX).toBe(400);
    expect(range.minY).toBe(0);
    expect(range.maxY).toBe(360);
  });
});
