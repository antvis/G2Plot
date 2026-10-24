/*
 * The numerical helpers below are adapted from fmin@0.0.4.
 * Copyright 2016, Ben Frederickson. All rights reserved.
 * BSD-3-Clause license: see FMIN-LICENSE.txt in this directory.
 */

interface VectorState {
  x: number[];
  fx: number;
  fxprime: number[];
}

type DifferentiableFunction = (x: number[], gradient: number[]) => number;

/** Finds a zero of a function between points with opposite signs. */
export function bisect(f: (value: number) => number, a: number, b: number, parameters?: any): number {
  parameters = parameters || {};
  const maxIterations = parameters.maxIterations || 100;
  const tolerance = parameters.tolerance || 1e-10;
  const fA = f(a);
  const fB = f(b);
  let delta = b - a;

  if (fA * fB > 0) {
    throw new Error('Initial bisect points must have opposite signs');
  }
  if (fA === 0) return a;
  if (fB === 0) return b;

  for (let i = 0; i < maxIterations; ++i) {
    delta /= 2;
    const mid = a + delta;
    const fMid = f(mid);
    if (fMid * fA >= 0) {
      a = mid;
    }
    if (Math.abs(delta) < tolerance || fMid === 0) {
      return mid;
    }
  }
  return a + delta;
}

export function zeros(length: number): number[] {
  const result = new Array(length);
  for (let i = 0; i < length; ++i) {
    result[i] = 0;
  }
  return result;
}

export function zerosM(rows: number, columns: number): number[][] {
  return zeros(rows).map(() => zeros(columns));
}

function dot(a: number[], b: number[]): number {
  let result = 0;
  for (let i = 0; i < a.length; ++i) {
    result += a[i] * b[i];
  }
  return result;
}

export function norm2(values: number[]): number {
  return Math.sqrt(dot(values, values));
}

/** Scales in place with two arguments, or writes value * factor into result. */
export function scale(result: number[], value: number[] | number, factor?: number): void {
  if (factor === undefined) {
    const multiplier = value as number;
    for (let i = 0; i < result.length; ++i) {
      result[i] *= multiplier;
    }
    return;
  }

  const values = value as number[];
  for (let i = 0; i < values.length; ++i) {
    result[i] = values[i] * factor;
  }
}

function weightedSum(result: number[], weight1: number, vector1: number[], weight2: number, vector2: number[]): void {
  for (let i = 0; i < result.length; ++i) {
    result[i] = weight1 * vector1[i] + weight2 * vector2[i];
  }
}

function wolfeLineSearch(
  f: DifferentiableFunction,
  direction: number[],
  current: VectorState,
  next: VectorState,
  initialStep: number
): number {
  const phi0 = current.fx;
  const phiPrime0 = dot(current.fxprime, direction);
  let phi = phi0;
  let phiOld = phi0;
  let phiPrime = phiPrime0;
  let previousStep = 0;
  let step = initialStep || 1;
  const c1 = 1e-6;
  const c2 = 0.1;

  function zoom(stepLow: number, stepHigh: number, phiLow: number): number {
    for (let iteration = 0; iteration < 16; ++iteration) {
      step = (stepLow + stepHigh) / 2;
      weightedSum(next.x, 1, current.x, step, direction);
      phi = next.fx = f(next.x, next.fxprime);
      phiPrime = dot(next.fxprime, direction);

      if (phi > phi0 + c1 * step * phiPrime0 || phi >= phiLow) {
        stepHigh = step;
      } else {
        if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
          return step;
        }
        if (phiPrime * (stepHigh - stepLow) >= 0) {
          stepHigh = stepLow;
        }
        stepLow = step;
        phiLow = phi;
      }
    }
    return 0;
  }

  for (let iteration = 0; iteration < 10; ++iteration) {
    weightedSum(next.x, 1, current.x, step, direction);
    phi = next.fx = f(next.x, next.fxprime);
    phiPrime = dot(next.fxprime, direction);

    if (phi > phi0 + c1 * step * phiPrime0 || (iteration > 0 && phi >= phiOld)) {
      return zoom(previousStep, step, phiOld);
    }
    if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
      return step;
    }
    if (phiPrime >= 0) {
      return zoom(step, previousStep, phi);
    }

    phiOld = phi;
    previousStep = step;
    step *= 2;
  }
  return step;
}

export function conjugateGradient(f: DifferentiableFunction, initial: number[], parameters?: any): VectorState {
  let current: VectorState = { x: initial.slice(), fx: 0, fxprime: initial.slice() };
  let next: VectorState = { x: initial.slice(), fx: 0, fxprime: initial.slice() };
  const yk = initial.slice();
  let temporary: VectorState;
  let step = 1;
  parameters = parameters || {};
  const maxIterations = parameters.maxIterations || initial.length * 20;

  current.fx = f(current.x, current.fxprime);
  const direction = current.fxprime.slice();
  scale(direction, current.fxprime, -1);

  for (let i = 0; i < maxIterations; ++i) {
    step = wolfeLineSearch(f, direction, current, next, step);

    if (parameters.history) {
      parameters.history.push({
        x: current.x.slice(),
        fx: current.fx,
        fxprime: current.fxprime.slice(),
        alpha: step,
      });
    }

    if (!step) {
      scale(direction, current.fxprime, -1);
    } else {
      weightedSum(yk, 1, next.fxprime, -1, current.fxprime);
      const delta = dot(current.fxprime, current.fxprime);
      const beta = Math.max(0, dot(yk, next.fxprime) / delta);
      weightedSum(direction, beta, direction, -1, next.fxprime);
      temporary = current;
      current = next;
      next = temporary;
    }

    if (norm2(current.fxprime) <= 1e-5) {
      break;
    }
  }

  if (parameters.history) {
    parameters.history.push({
      x: current.x.slice(),
      fx: current.fx,
      fxprime: current.fxprime.slice(),
      alpha: step,
    });
  }
  return current;
}
