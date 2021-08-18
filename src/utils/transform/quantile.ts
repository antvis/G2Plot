// from https://github.com/simple-statistics

/**
 * This is the internal implementation of quantiles: when you know
 * that the order is sorted, you don't need to re-sort it, and the computations
 * are faster.
 *
 * @param {Array<number>} x sample of one or more data points
 * @param {number} p desired quantile: a number between 0 to 1, inclusive
 * @returns {number} quantile value
 * @throws {Error} if p ix outside of the range from 0 to 1
 * @throws {Error} if x is empty
 * @example
 * quantileSorted([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
export function quantileSorted(x: number[], p: number) {
  const idx = x.length * p;
  if (x.length === 0) {
    throw new Error('quantile requires at least one data point.');
  } else if (p < 0 || p > 1) {
    throw new Error('quantiles must be between 0 and 1');
  } else if (p === 1) {
    // If p is 1, directly return the last element
    return x[x.length - 1];
  } else if (p === 0) {
    // If p is 0, directly return the first element
    return x[0];
  } else if (idx % 1 !== 0) {
    // If p is not integer, return the next element in array
    return x[Math.ceil(idx) - 1];
  } else if (x.length % 2 === 0) {
    // If the list has even-length, we'll take the average of this number
    // and the next value, if there is one
    return (x[idx - 1] + x[idx]) / 2;
  } else {
    // Finally, in the simple case of an integer value
    // with an odd-length list, return the x value at the index.
    return x[idx];
  }
}

/**
 * 交换数组位置
 * @param arr T[]
 * @param i number
 * @param j number
 */
export function swap<T = any>(arr: T[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

/**
 * Rearrange items in `arr` so that all items in `[left, k]` range are the smallest.
 * The `k`-th element will have the `(k - left + 1)`-th smallest value in `[left, right]`.
 *
 * Implements Floyd-Rivest selection algorithm https://en.wikipedia.org/wiki/Floyd-Rivest_algorithm
 *
 * @param {Array<number>} arr input array
 * @param {number} k pivot index
 * @param {number} [left] left index
 * @param {number} [right] right index
 * @returns {void} mutates input array
 * @example
 * var arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
 * quickselect(arr, 8);
 * // = [39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]
 */
export function quickselect(arr: number[], k, left?: number, right?: number): void {
  left = left || 0;
  right = right || arr.length - 1;

  while (right > left) {
    // 600 and 0.5 are arbitrary constants chosen in the original paper to minimize execution time
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp((2 * z) / 3);
      let sd = 0.5 * Math.sqrt((z * s * (n - s)) / n);
      if (m - n / 2 < 0) sd *= -1;
      const newLeft = Math.max(left, Math.floor(k - (m * s) / n + sd));
      const newRight = Math.min(right, Math.floor(k + ((n - m) * s) / n + sd));
      quickselect(arr, k, newLeft, newRight);
    }

    const t = arr[k];
    let i = left;
    let j = right;

    swap(arr, left, k);
    if (arr[right] > t) swap(arr, left, right);

    while (i < j) {
      swap(arr, i, j);
      i++;
      j--;
      while (arr[i] < t) i++;
      while (arr[j] > t) j--;
    }

    if (arr[left] === t) swap(arr, left, j);
    else {
      j++;
      swap(arr, j, right);
    }

    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
}

/**
 * The [quantile](https://en.wikipedia.org/wiki/Quantile):
 * this is a population quantile, since we assume to know the entire
 * dataset in this library. This is an implementation of the
 * [Quantiles of a Population](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
 * algorithm from wikipedia.
 *
 * Sample is a one-dimensional array of numbers,
 * and p is either a decimal number from 0 to 1 or an array of decimal
 * numbers from 0 to 1.
 * In terms of a k/q quantile, p = k/q - it's just dealing with fractions or dealing
 * with decimal values.
 * When p is an array, the result of the function is also an array containing the appropriate
 * quantiles in input order
 *
 * @param {Array<number>} x sample of one or more numbers
 * @param {Array<number> | number} p the desired quantile, as a number between 0 and 1
 * @returns {number} quantile
 * @example
 * quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
function quantile(x: number[], p: number): number;
function quantile(x: number[], p: number[]): number[];
function quantile(x: any, p: any): any {
  const copy = x.slice();

  if (Array.isArray(p)) {
    // rearrange elements so that each element corresponding to a requested
    // quantile is on a place it would be if the array was fully sorted
    multiQuantileSelect(copy, p);
    // Initialize the result array
    const results: number[] = [];
    // For each requested quantile
    for (let i = 0; i < p.length; i++) {
      results[i] = quantileSorted(copy, p[i]);
    }
    return results;
  } else {
    const idx = quantileIndex(copy.length, p);
    quantileSelect(copy, idx, 0, copy.length - 1);
    return quantileSorted(copy, p);
  }
}

function quantileSelect(arr, k, left, right) {
  if (k % 1 === 0) {
    quickselect(arr, k, left, right);
  } else {
    k = Math.floor(k);
    quickselect(arr, k, left, right);
    quickselect(arr, k + 1, k + 1, right);
  }
}

function multiQuantileSelect(arr, p) {
  const indices = [0];
  for (let i = 0; i < p.length; i++) {
    indices.push(quantileIndex(arr.length, p[i]));
  }
  indices.push(arr.length - 1);
  indices.sort(compare);

  const stack = [0, indices.length - 1];

  while (stack.length) {
    const r = Math.ceil(stack.pop());
    const l = Math.floor(stack.pop());
    if (r - l <= 1) continue;

    const m = Math.floor((l + r) / 2);
    quantileSelect(arr, indices[m], Math.floor(indices[l]), Math.ceil(indices[r]));

    stack.push(l, m, m, r);
  }
}

function compare(a, b) {
  return a - b;
}

function quantileIndex(len, p) {
  const idx = len * p;
  if (p === 1) {
    // If p is 1, directly return the last index
    return len - 1;
  } else if (p === 0) {
    // If p is 0, directly return the first index
    return 0;
  } else if (idx % 1 !== 0) {
    // If index is not integer, return the next index in array
    return Math.ceil(idx) - 1;
  } else if (len % 2 === 0) {
    // If the list has even-length, we'll return the middle of two indices
    // around quantile to indicate that we need an average value of the two
    return idx - 0.5;
  } else {
    // Finally, in the simple case of an integer index
    // with an odd-length list, return the index
    return idx;
  }
}

export { quantile };
