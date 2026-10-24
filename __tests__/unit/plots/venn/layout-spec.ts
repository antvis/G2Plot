import { constrainedMDSLayout, distanceFromIntersectArea } from '../../../../src/plots/venn/layout/layout';

describe('Venn layout numerical helpers', () => {
  it('bisects a synthetic circle-overlap distance', () => {
    const radiusA = Math.sqrt(10 / Math.PI);
    const radiusB = Math.sqrt(8 / Math.PI);
    const distance = distanceFromIntersectArea(radiusA, radiusB, 3);

    expect(distance).toBeGreaterThan(Math.abs(radiusA - radiusB));
    expect(distance).toBeLessThan(radiusA + radiusB);
  });

  it('computes a finite constrained layout from synthetic set areas', () => {
    const randomValues = [0.11, 0.82, 0.47, 0.32, 0.91, 0.63];
    const randomSpy = jest.spyOn(Math, 'random').mockImplementation(() => {
      const value = randomValues.shift();
      return value === undefined ? 0.5 : value;
    });
    const history: any[] = [];

    try {
      const circles = constrainedMDSLayout(
        [
          { sets: ['A'], size: 10 },
          { sets: ['B'], size: 8 },
          { sets: ['C'], size: 6 },
          { sets: ['A', 'B'], size: 3 },
          { sets: ['A', 'C'], size: 1 },
          { sets: ['B', 'C'], size: 2 },
        ],
        { restarts: 1, maxIterations: 4, history }
      );

      expect(Object.keys(circles).sort()).toEqual(['A', 'B', 'C']);
      Object.keys(circles).forEach((set) => {
        expect([circles[set].x, circles[set].y, circles[set].radius].every(Number.isFinite)).toBe(true);
      });
      expect(history.length).toBeGreaterThan(0);
      history.forEach((entry) => {
        expect(entry.x.every(Number.isFinite)).toBe(true);
      });
    } finally {
      randomSpy.mockRestore();
    }
  });
});
