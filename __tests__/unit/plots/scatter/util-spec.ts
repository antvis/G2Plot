import { getRegressionEquation } from '../../../../src/plots/scatter/util';

describe('scatter util', () => {
  describe('equation format tests', () => {
    it('should get linear equation', () => {
      const type = 'linear';
      const equation = getRegressionEquation(type, { a: 0.1, b: 0.5, rSquared: 0.92 });
      expect(equation).toBe('y = 0.1x + 0.5, R^2 = 0.92');
    });

    it('should get linear equation with nagtive coefficient', () => {
      const type = 'linear';
      const equation = getRegressionEquation(type, { a: -0.1, b: -0.5, rSquared: 0 });
      expect(equation).toBe('y = -0.1x + -0.5, R^2 = 0');
    });

    it('should get qustion mark when coefficient is not a number', () => {
      const type = 'linear';
      const equation = getRegressionEquation(type, { a: NaN, b: Infinity, rSquared: undefined });
      expect(equation).toBe('y = ?x + ?, R^2 = ?');
    });

    it('should get exponential equation', () => {
      const type = 'exp';
      const equation = getRegressionEquation(type, { a: 0.1, b: 0.5, rSquared: 0.92 });
      expect(equation).toBe('y = 0.1e^(0.5x), R^2 = 0.92');
    });

    it('should get quadratic equation', () => {
      const type = 'quad';
      const equation = getRegressionEquation(type, { a: 0.1, b: 0.5, c: 1, rSquared: 0.92 });
      expect(equation).toBe('y = 0.1x^2 + 0.5x + 1, R^2 = 0.92');
    });

    it('should get polynomial equation', () => {
      const type = 'poly';
      const equation = getRegressionEquation(type, { coefficients: [0.1, 0.2, 0.3], rSquared: 0.92 });
      expect(equation).toBe('y = 0.1 + 0.2x + 0.3x^2, R^2 = 0.92');
    });

    it('should get polynomial equation with more coefficients', () => {
      const type = 'poly';
      const equation = getRegressionEquation(type, { coefficients: [0.1, 0.2, 0.3, 0.4, 0.5], rSquared: 0.92 });
      expect(equation).toBe('y = 0.1 + 0.2x + 0.3x^2 + 0.4x^3 + 0.5x^4, R^2 = 0.92');
    });

    it('should get power law equation', () => {
      const type = 'pow';
      const equation = getRegressionEquation(type, { a: 0.1, b: 2, rSquared: 0.92 });
      expect(equation).toBe('y = 0.1x^2, R^2 = 0.92');
    });

    it('should get loess equation', () => {
      const type = 'loess';
      const equation = getRegressionEquation(type, { a: 0.1, b: 2, rSquared: 0.92 });
      expect(equation).toBeNull();
    });

    it('should round number by default presicion', () => {
      const type = 'linear';
      const equation = getRegressionEquation(type, { a: -0.1234567, b: -0.12345678, rSquared: 0.12345678 });
      expect(equation).toBe('y = -0.1235x + -0.1235, R^2 = 0.1235');
    });

    it('should round polynomial equation with more than 3 coefficients', () => {
      const type = 'poly';
      const equation = getRegressionEquation(type, {
        coefficients: [0.1234567, 0.1234567, 0.1234567, 0.1234567, 0.1234567],
        rSquared: 0.1234567,
      });
      expect(equation).toBe('y = 0.1235 + 0.1235x + 0.1235x^2 + 0.1235x^3 + 0.1235x^4, R^2 = 0.1235');
    });
  });
});
