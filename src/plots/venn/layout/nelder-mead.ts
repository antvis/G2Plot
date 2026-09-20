/**
 * 内联自 fmin@0.0.4 的 nelderMead 实现。
 *
 * 原因：fmin 已停止维护，其 build/fmin.js 的 nelderMead 函数中
 * reduction 分支 `for (i = 1; i < simplex.length; ++i)` 未声明循环变量 i，
 * 在严格模式（ESM / jest）下会抛出 `ReferenceError: i is not defined`。
 * 这里拷贝该函数并修正变量声明，避免依赖第三方包的该缺陷。
 *
 * 仅导出 nelderMead；fmin 的其它函数（bisect / conjugateGradient / norm2 /
 * scale / zeros / zerosM）无此问题，仍直接从 'fmin' 导入。
 */

/** 向量加权和：ret = w1 * v1 + w2 * v2 */
function weightedSum(ret: number[], w1: number, v1: number[], w2: number, v2: number[]) {
  for (let j = 0; j < ret.length; ++j) {
    ret[j] = w1 * v1[j] + w2 * v2[j];
  }
}

export interface NelderMeadParameters {
  maxIterations?: number;
  nonZeroDelta?: number;
  zeroDelta?: number;
  minErrorDelta?: number;
  minTolerance?: number;
  rho?: number;
  chi?: number;
  psi?: number;
  sigma?: number;
  history?: Array<{ x: number[]; fx: number; simplex: any[] }>;
}

export interface NelderMeadSolution {
  fx: number;
  x: number[];
}

/** minimizes a function using the downhill simplex method */
export function nelderMead(
  f: (x: number[]) => number,
  x0: number[],
  parameters?: NelderMeadParameters
): NelderMeadSolution {
  parameters = parameters || {};

  const maxIterations = parameters.maxIterations || x0.length * 200;
  const nonZeroDelta = parameters.nonZeroDelta || 1.05;
  const zeroDelta = parameters.zeroDelta || 0.001;
  const minErrorDelta = parameters.minErrorDelta || 1e-6;
  const minTolerance = parameters.minErrorDelta || 1e-5;
  const rho = parameters.rho !== undefined ? parameters.rho : 1;
  const chi = parameters.chi !== undefined ? parameters.chi : 2;
  const psi = parameters.psi !== undefined ? parameters.psi : -0.5;
  const sigma = parameters.sigma !== undefined ? parameters.sigma : 0.5;
  let maxDiff;

  // initialize simplex.
  const N = x0.length;
  const simplex: any[] = new Array(N + 1);
  simplex[0] = x0;
  (simplex[0] as any).fx = f(x0);
  (simplex[0] as any).id = 0;
  for (let i = 0; i < N; ++i) {
    const point = x0.slice();
    point[i] = point[i] ? point[i] * nonZeroDelta : zeroDelta;
    simplex[i + 1] = point;
    (simplex[i + 1] as any).fx = f(point);
    (simplex[i + 1] as any).id = i + 1;
  }

  function updateSimplex(value) {
    for (let i = 0; i < value.length; i++) {
      simplex[N][i] = value[i];
    }
    simplex[N].fx = value.fx;
  }

  const sortOrder = (a, b) => a.fx - b.fx;

  const centroid = x0.slice();
  const reflected = x0.slice();
  const contracted = x0.slice();
  const expanded = x0.slice();

  for (let iteration = 0; iteration < maxIterations; ++iteration) {
    simplex.sort(sortOrder);

    if (parameters.history) {
      // copy the simplex (since later iterations will mutate) and
      // sort it to have a consistent order between iterations
      const sortedSimplex = simplex.map((x) => {
        const state = x.slice();
        state.fx = x.fx;
        state.id = x.id;
        return state;
      });
      sortedSimplex.sort((a, b) => a.id - b.id);

      parameters.history.push({
        x: simplex[0].slice(),
        fx: simplex[0].fx,
        simplex: sortedSimplex,
      });
    }

    maxDiff = 0;
    for (let i = 0; i < N; ++i) {
      maxDiff = Math.max(maxDiff, Math.abs(simplex[0][i] - simplex[1][i]));
    }

    if (Math.abs(simplex[0].fx - simplex[N].fx) < minErrorDelta && maxDiff < minTolerance) {
      break;
    }

    // compute the centroid of all but the worst point in the simplex
    for (let i = 0; i < N; ++i) {
      centroid[i] = 0;
      for (let j = 0; j < N; ++j) {
        centroid[i] += simplex[j][i];
      }
      centroid[i] /= N;
    }

    // reflect the worst point past the centroid  and compute loss at reflected
    // point
    const worst = simplex[N];
    weightedSum(reflected, 1 + rho, centroid, -rho, worst);
    (reflected as any).fx = f(reflected);

    // if the reflected point is the best seen, then possibly expand
    if ((reflected as any).fx < simplex[0].fx) {
      weightedSum(expanded, 1 + chi, centroid, -chi, worst);
      (expanded as any).fx = f(expanded);
      if ((expanded as any).fx < (reflected as any).fx) {
        updateSimplex(expanded);
      } else {
        updateSimplex(reflected);
      }
    }

    // if the reflected point is worse than the second worst, we need to
    // contract
    else if ((reflected as any).fx >= simplex[N - 1].fx) {
      let shouldReduce = false;

      if ((reflected as any).fx > worst.fx) {
        // do an inside contraction
        weightedSum(contracted, 1 + psi, centroid, -psi, worst);
        (contracted as any).fx = f(contracted);
        if ((contracted as any).fx < worst.fx) {
          updateSimplex(contracted);
        } else {
          shouldReduce = true;
        }
      } else {
        // do an outside contraction
        weightedSum(contracted, 1 - psi * rho, centroid, psi * rho, worst);
        (contracted as any).fx = f(contracted);
        if ((contracted as any).fx < (reflected as any).fx) {
          updateSimplex(contracted);
        } else {
          shouldReduce = true;
        }
      }

      if (shouldReduce) {
        // if we don't contract here, we're done
        if (sigma >= 1) break;

        // do a reduction
        // 修正点：fmin 原实现此处为 `for (i = 1; ...)`，未声明 i
        for (let i = 1; i < simplex.length; ++i) {
          weightedSum(simplex[i], 1 - sigma, simplex[0], sigma, simplex[i]);
          simplex[i].fx = f(simplex[i]);
        }
      }
    } else {
      updateSimplex(reflected);
    }
  }

  simplex.sort(sortOrder);
  return { fx: simplex[0].fx, x: simplex[0] };
}
