/** finds the zeros of a function, given two starting points (which must
 * have opposite signs */
export function bisect(f, a, b, parameters?: any) {
  parameters = parameters || {};
  const maxIterations = parameters.maxIterations || 100;
  const tolerance = parameters.tolerance || 1e-10;
  const fA = f(a);
  const fB = f(b);
  let delta = b - a;

  if (fA * fB > 0) {
    throw new Error('Initial bisect points must have opposite signs');
  }

  if (fA === 0) {
    return a;
  }
  if (fB === 0) {
    return b;
  }

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

export function zeros(x) {
  const result = new Array(x);
  for (let i = 0; i < x; ++i) {
    result[i] = 0;
  }
  return result;
}

export function zerosM(x, y) {
  return zeros(x).map(() => zeros(y));
}

function dot(a, b) {
  let result = 0;
  for (let i = 0; i < a.length; ++i) {
    result += a[i] * b[i];
  }
  return result;
}

export function norm2(a) {
  return Math.sqrt(dot(a, a));
}

export function scale(ret, value, c?) {
  if (c === undefined) {
    for (let i = 0; i < ret.length; ++i) {
      ret[i] *= value;
    }
    return;
  }

  for (let i = 0; i < value.length; ++i) {
    ret[i] = value[i] * c;
  }
}

function weightedSum(ret, w1, v1, w2, v2) {
  for (let i = 0; i < ret.length; ++i) {
    ret[i] = w1 * v1[i] + w2 * v2[i];
  }
}

function wolfeLineSearch(f, pk, current, next, a, c1?, c2?) {
  const phi0 = current.fx;
  const phiPrime0 = dot(current.fxprime, pk);
  let phi = phi0;
  let phiOld = phi0;
  let phiPrime = phiPrime0;
  let a0 = 0;

  a = a || 1;
  c1 = c1 || 1e-6;
  c2 = c2 || 0.1;

  function zoom(aLo, aHigh, phiLo) {
    for (let iteration = 0; iteration < 16; ++iteration) {
      a = (aLo + aHigh) / 2;
      weightedSum(next.x, 1.0, current.x, a, pk);
      phi = next.fx = f(next.x, next.fxprime);
      phiPrime = dot(next.fxprime, pk);

      if (phi > phi0 + c1 * a * phiPrime0 || phi >= phiLo) {
        aHigh = a;
      } else {
        if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
          return a;
        }

        if (phiPrime * (aHigh - aLo) >= 0) {
          aHigh = aLo;
        }

        aLo = a;
        phiLo = phi;
      }
    }

    return 0;
  }

  for (let iteration = 0; iteration < 10; ++iteration) {
    weightedSum(next.x, 1.0, current.x, a, pk);
    phi = next.fx = f(next.x, next.fxprime);
    phiPrime = dot(next.fxprime, pk);
    if (phi > phi0 + c1 * a * phiPrime0 || (iteration && phi >= phiOld)) {
      return zoom(a0, a, phiOld);
    }

    if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
      return a;
    }

    if (phiPrime >= 0) {
      return zoom(a, a0, phi);
    }

    phiOld = phi;
    a0 = a;
    a *= 2;
  }

  return a;
}

export function conjugateGradient(f, initial, params?: any) {
  const yk = initial.slice();
  let current = { x: initial.slice(), fx: 0, fxprime: initial.slice() };
  let next = { x: initial.slice(), fx: 0, fxprime: initial.slice() };
  const pk = current.fxprime.slice();
  let temp;
  let a = 1;

  params = params || {};
  const maxIterations = params.maxIterations || initial.length * 20;

  current.fx = f(current.x, current.fxprime);
  scale(pk, current.fxprime, -1);

  for (let i = 0; i < maxIterations; ++i) {
    a = wolfeLineSearch(f, pk, current, next, a);

    if (params.history) {
      params.history.push({
        x: current.x.slice(),
        fx: current.fx,
        fxprime: current.fxprime.slice(),
        alpha: a,
      });
    }

    if (!a) {
      scale(pk, current.fxprime, -1);
    } else {
      weightedSum(yk, 1, next.fxprime, -1, current.fxprime);

      const deltaK = dot(current.fxprime, current.fxprime);
      const betaK = Math.max(0, dot(yk, next.fxprime) / deltaK);

      weightedSum(pk, betaK, pk, -1, next.fxprime);

      temp = current;
      current = next;
      next = temp;
    }

    if (norm2(current.fxprime) <= 1e-5) {
      break;
    }
  }

  if (params.history) {
    params.history.push({
      x: current.x.slice(),
      fx: current.fx,
      fxprime: current.fxprime.slice(),
      alpha: a,
    });
  }

  return current;
}
