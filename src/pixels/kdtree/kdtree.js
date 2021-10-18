/**
 * @typedef {{x:number, y: number, z?: number}} Point
 * @typedef {{
 *  pos: Point[],
 *  cuv: Float32Array,
 *  fastID: Uint16Array | Uint32Array,
 *  offsets: Uint16Array | Uint32Array,
 *  sizes: Uint8Array | Uint16Array | Uint32Array,
 *  lineID: number[],
 *  segIndex: [number, number][],
 * }} TSRD segIndex: [segStart id, segEnd id, slope][]
 * @typedef {{segs: [Point, Point, number, number]}} CCHLeafNode
 * @typedef {{left: CCHInternalode|CCHLeafNode, right: CCHInternalode|CCHLeafNode}} CCHInternalode
 */
import { lineRectCollide } from "./util";
import Heap from "heap";

const kdparam = {
  deg: 3,
  b: 1.128,
  k: 5,
  r: 0.05,
  cuveq: 0.06,
};

/**
 * @type {{
 *  id: number,
 *  value: number,
 *  point: Point
 * }}
 */
let globalHashCache = {};

export default class CCHTree {
  /**
   * @type {CCHInternalode}
   */
  root = null;
  // prebuiltPixel = null;
  segs = [];

  /**
   *
   * @param {Point[][]} lines
   * @param {number} precision
   */
  constructor(lines, precision = 1000) {
    //#region init tsrd
    //console.time('init tsrd');
    //#region generate tsrd
    //console.time('gen tsrd');
    /**
     * @type {TSRD}
     */
    const tsrd = {
      pos: undefined,
      cuv: undefined,
      offsets: undefined,
      sizes: undefined,
      fastID: undefined,
      lineID: [],
      segIndex: [],
    };

    const totalPoints = lines.reduce((p, v) => p + v.length, 0);
    const maxPoints = lines.reduce((p, v) => Math.max(p, v.length), 0);
    const lineIndexType = lines.length > 65535 ? Uint32Array : Uint16Array;
    const pointIndexType = totalPoints > 65535 ? Uint32Array : Uint16Array;
    const sizeType =
      maxPoints > 65535
        ? Uint32Array
        : maxPoints > 127
        ? Uint16Array
        : Uint8Array;
    tsrd.pos = new Array(totalPoints);
    tsrd.cuv = new Float32Array(totalPoints);
    tsrd.fastID = new lineIndexType(totalPoints);
    tsrd.offsets = new pointIndexType(lines.length);
    tsrd.sizes = new sizeType(lines.length);

    let pointer = 0;
    lines.forEach((line, i) => {
      tsrd.offsets[i] = pointer;
      tsrd.sizes[i] = line.length;
      line.forEach((point, j) => {
        tsrd.pos[pointer] = point;
        tsrd.fastID[pointer] = i;
        if (j <= 0 || j >= line.length - 1) {
          tsrd.cuv[pointer] = 0;
        } else {
          tsrd.cuv[pointer] = computeCurvature(line[j - 1], point, line[j + 1]);
        }
        pointer++;
      });
    });
    // this.prebuiltPixel = new Map();
    // for (let i = 0; i < 1000; i++) {
    //   for (let j = 0; j < 500; j++) {
    //     this.prebuiltPixel.set(`${i}-${j}`, []);
    //   }
    // }
    //console.timeEnd('gen tsrd');
    // console.log(tsrd);
    //#endregion
    //#region resample data
    //console.time('resample data');
    tsrd.sizes.forEach((size, i) => {
      const beginIndex = tsrd.offsets[i];
      const endIndex = size + beginIndex - 1;
      splitIntoSegmentsByMaximumDistance(
        beginIndex,
        endIndex,
        precision,
        i,
        tsrd
      );
    });
    //console.timeEnd('resample data');
    //#endregion
    //console.timeEnd('init tsrd');
    //#endregion
    //#region prepare data
    //console.time('prepare data');
    // const weights = new Float64Array(tsrd.pos.length);
    const length = new Float32Array(tsrd.pos.length);
    let totalLen = 0;
    let totalCount = 0;
    tsrd.sizes.forEach((size, i) => {
      const beginIndex = tsrd.offsets[i];
      const endIndex = size + beginIndex - 1;
      for (let j = beginIndex; j < endIndex; j++) {
        const distance = pointDist(tsrd.pos[j], tsrd.pos[j + 1]);
        length[j] = distance;
        totalLen += distance;
        ++totalCount;
      }
      length[endIndex] = 0;
    });
    // const averageLen = totalLen / totalCount;
    // const expectCurvature = precision / averageLen;
    // const defaultWeight = precision * averageLen;

    tsrd.sizes.forEach((size, i) => {
      const beginIndex = tsrd.offsets[i];
      const endIndex = size + beginIndex - 1;
      for (let j = beginIndex + 1; j < endIndex; j++) {
        // const avgLength = (length[j] + length[j - 1]) / 2;
        // weights[j] = tsrd.cuv[j] * avgLength;
        const right = pointSub(tsrd.pos[j + 1], tsrd.pos[j]);
        const left = pointSub(tsrd.pos[j], tsrd.pos[j - 1]);
        tsrd.pos[j].z =
          (length[j] * (right.y / right.x) +
            length[j - 1] * (left.y / left.x)) /
          (length[j] + length[j - 1]);
        if (j === beginIndex + 1) {
          tsrd.pos[beginIndex].z = left.y / left.x;
        }
        if (j === endIndex - 1) {
          tsrd.pos[endIndex].z = right.y / right.x;
        }
      }
      // weights[beginIndex] = defaultWeight;
      // weights[endIndex] = defaultWeight;
    });

    const allci = [];
    let curSegIndex = 0;

    tsrd.sizes.forEach((size, i) => {
      const beginIndex = tsrd.offsets[i];
      const endIndex = size + beginIndex;
      const ci = {
        aabb: undefined,
        from: beginIndex,
        to: endIndex - 1,
        sp: [],
      };
      allci.push(ci);
      updateAABB(ci, tsrd.pos);
      let lastIndex = -1;
      while (curSegIndex < tsrd.segIndex.length) {
        const cs = tsrd.segIndex[curSegIndex];
        if (tsrd.fastID[cs[0]] < i) {
          ++curSegIndex;
          continue;
        } else if (tsrd.fastID[cs[0]] > i) {
          --curSegIndex;
          break;
        }
        if (lastIndex !== cs[0]) {
          ci.sp.push(cs[0]);
        }
        ci.sp.push(cs[1]);
        lastIndex = cs[1];
        ++curSegIndex;
      }
    });
    //console.timeEnd('prepare data');
    //#endregion
    //#region split
    //console.time('split');
    const stacks = [];
    const segMapping = new Map();
    // let segcount = 0;
    // let totalTry = 0;
    // let futileTry = 0;
    stacks.push(allci, false, null, 0);
    while (stacks.length) {
      //console.time('single stack');
      const si = stacks.slice(stacks.length - 4, stacks.length);
      //console.time('compute variance & dim');
      // let average = { x: 0, y: 0 };
      // let variance = { x: 0, y: 0 };
      let minv = tsrd.pos[si[0][0].from];
      let maxv = minv;
      // let pointCount = 0;
      for (let ci of si[0]) {
        // pointCount += ci.to - ci.from + 1;
        // for (let i = ci.from; i <= ci.to; i++) {
        //   average = pointAdd(average, tsrd.pos[i]);
        // }
        minv = pointMin(ci.aabb.a, minv);
        maxv = pointMax(ci.aabb.b, maxv);
      }
      const delta = pointSub(maxv, minv);
      // average = pointDiv(average, pointCount);
      // for (let ci of si[0]) {
      //   for (let i = ci.from; i <= ci.to; i++) {
      //     const delta0 = pointSub(average, tsrd.pos[i]);
      //     variance = pointAdd(variance, pointMultiply(delta0, delta0));
      //   }
      // }
      //console.timeEnd('compute variance & dim');

      // //console.time('extract variance for each dim');
      // let vars = [];
      // vars.push([variance.x, 0], [variance.y, 1], [variance.z, 2]);
      // vars.sort((a, b) => a[0] - b[0]);
      // //console.timeEnd('extract variance for each dim');

      //console.time('try each dim');
      let leftResult = [],
        rightResult = [];
      const allc2 = countSegs(si[0]);
      // const allc = countWeight(si[0], weights, defaultWeight);
      let pass = false;
      let dim = 0;
      let expectPos = 0;

      // Accelerate first 3 level
      const level = si[3];
      const startDim = level > 2 ? 0 : level;
      const endDim = level > 2 ? 2 : level;
      // const startDim = 0;
      // const endDim = 2;

      if (level < 10) {
        for (let dimIndex = startDim; dimIndex <= endDim; dimIndex++) {
          if (delta[dim2xyz(dim)] < kdparam.r * 2) {
            continue;
          }
          dim = dimIndex;

          let candidates = [];
          // let totalWeight = 0;
          for (let ci of si[0]) {
            for (let i = ci.from + 1; i < ci.to; i++) {
              const candidatePos = tsrd.pos[i][dim2xyz(dim)] ?? 0;
              // candidates.push([candidatePos, weights[i]]);
              candidates.push([candidatePos]);
              // totalWeight += weights[i];
            }
            let cpos1 = tsrd.pos[ci.from][dim2xyz(dim)] ?? 0;
            let cpos2 = tsrd.pos[ci.to][dim2xyz(dim)] ?? 0;
            // candidates.push([cpos1, defaultWeight + weights[ci.from]]);
            // candidates.push([cpos2, defaultWeight + weights[ci.to]]);
            candidates.push([cpos1]);
            candidates.push([cpos2]);
            // totalWeight += defaultWeight * 2;
          }

          expectPos = getMidWeightedVal(candidates, 0.5);

          leftResult = [];
          rightResult = [];
          splitCurves(dim, expectPos, si[0], leftResult, rightResult, tsrd);
          const leftC2 = countSegs(leftResult);
          const rightC2 = countSegs(rightResult);
          const leftCurveCount = leftResult.length;
          const rightCurveCount = rightResult.length;
          const p = (expectPos - minv[dim2xyz(dim)]) / delta[dim2xyz(dim)];
          const cost = computeCost(leftC2, rightC2, allc2, p, 0, 0);

          if (
            cost < allc2 &&
            leftCurveCount >= kdparam.k &&
            rightCurveCount >= kdparam.k &&
            delta[dim2xyz(dim)] * p > kdparam.r &&
            delta[dim2xyz(dim)] * (1 - p) > kdparam.r
          ) {
            pass = true;
            break;
          }
        }
      }

      //console.timeEnd('try each dim');

      //console.time('LR split');
      if (pass) {
        const ns = {
          dim,
          pos: expectPos,
        };
        if (si[2] === null) {
          this.root = ns;
        } else {
          connectNode(si[2], ns, si[1]);
        }
        stacks.pop();
        stacks.pop();
        stacks.pop();
        stacks.pop();
        stacks.push(
          leftResult,
          true,
          ns,
          si[3] + 1,
          rightResult,
          false,
          ns,
          si[3] + 1
        );
      } else {
        const startIndex = this.segs.length;
        const nl = { segs: [] };
        for (let ci of si[0]) {
          let lastIndex = ci.from;
          for (let currIndex of ci.sp) {
            if (lastIndex == currIndex) continue;
            const key = `${tsrd.pos[lastIndex].x}-${tsrd.pos[currIndex].x}-${tsrd.fastID[currIndex]}`;
            const mapKey = segMapping.get(key);
            if (mapKey !== undefined) {
              nl.segs.push(mapKey);
            } else {
              const diff = pointSub(tsrd.pos[currIndex], tsrd.pos[lastIndex]);
              const ls = [
                tsrd.pos[lastIndex],
                tsrd.pos[currIndex],
                diff.y / diff.x,
                tsrd.fastID[currIndex],
              ];
              const lid = this.segs.length;
              this.segs.push(ls);
              nl.segs.push(lid);
              segMapping.set(key, lid);
              // brensenham(ls, lid, this.prebuiltPixel);
            }
            lastIndex = currIndex;
          }
          if (lastIndex == ci.to) continue;
          const key = `${tsrd.pos[lastIndex].x}-${tsrd.pos[ci.to].x}-${
            tsrd.fastID[ci.to]
          }`;
          const mapKey = segMapping.get(key);
          if (mapKey !== undefined) {
            nl.segs.push(mapKey);
          } else {
            const diff = pointSub(tsrd.pos[lastIndex], tsrd.pos[ci.to]);
            const ls = [
              tsrd.pos[lastIndex],
              tsrd.pos[ci.to],
              diff.y / diff.x,
              tsrd.fastID[ci.to],
            ];
            const lid = this.segs.length;
            this.segs.push(ls);
            nl.segs.push(lid);
            segMapping.set(key, lid);
            // brensenham(ls, lid, this.prebuiltPixel);
          }
        }
        const endIndex = this.segs.length - 1;

        // segcount += nl.segs.length;
        if (si[2] === null) {
          this.root = nl;
        } else {
          connectNode(si[2], nl, si[1]);
        }
        stacks.pop();
        stacks.pop();
        stacks.pop();
        stacks.pop();
      }
      //console.timeEnd('LR split');
      //console.timeEnd('single stack');
    }

    //console.timeEnd('split');
    //#endregion
  }

  /**
   *
   * @param {[number, number]} point
   * @param {number} k
   * @returns {number[]}
   */
  knn(point, k) {
    globalHashCache = {};
    const result = new Heap((a, b) => b.value - a.value);
    this.#search(result, { x: point[0], y: point[1] }, k, this.root);
    // console.log(result.toArray());
    return result.toArray();
  }

  rnn(point, r) {
    // if (r <= 1 && r > 0) {
    //   const search = { x: point[0], y: point[1] };
    //   return this.ghost(point)
    //     .map((segId) => {
    //       const seg = this.segs[segId];
    //       const ap = pointSub(search, seg[0]);
    //       let dir = pointSub(seg[1], seg[0]);
    //       ap.z = 0;
    //       dir.z = 0;
    //       const len = Math.sqrt(pointDot(dir, dir));
    //       dir = pointDiv(dir, len);
    //       const dv = pointDot(ap, dir);
    //       const lineId = seg[3];
    //       let dis, point;
    //       if (dv <= 0) {
    //         dis = pointDist2D(seg[0], search);
    //         point = seg[0];
    //       } else if (dv >= len) {
    //         dis = pointDist2D(seg[1], search);
    //         point = seg[1];
    //       } else {
    //         dis = Math.sqrt(pointDot(ap, ap) - dv * dv);
    //         point = pointAdd(seg[0], pointMul(dir, dv));
    //       }
    //       return {
    //         id: lineId,
    //         value: dis,
    //         point,
    //       };
    //     })
    //     .filter((seg) => seg.value <= r);
    // }
    const result = {};
    this.#searchRNN(result, { x: point[0], y: point[1] }, r, this.root);
    // console.log(Object.values(result));
    return Object.values(result);
  }

  brush(lo, hi) {
    const result = new Set();
    this.#range(
      result,
      { x: lo[0], y: lo[1], z: -Infinity },
      { x: hi[0], y: hi[1], z: Infinity },
      {
        a: { x: -Infinity, y: -Infinity, z: -Infinity },
        b: { x: Infinity, y: Infinity, z: Infinity },
      },
      this.root
    );
    const removal = new Set();
    this.#range(
      removal,
      { x: lo[0], y: lo[1] - 1, z: -Infinity },
      { x: hi[0], y: lo[1], z: Infinity },
      {
        a: { x: -Infinity, y: -Infinity, z: -Infinity },
        b: { x: Infinity, y: Infinity, z: Infinity },
      },
      this.root
    );
    this.#range(
      removal,
      { x: lo[0], y: hi[1], z: -Infinity },
      { x: hi[0], y: hi[1] + 1, z: Infinity },
      {
        a: { x: -Infinity, y: -Infinity, z: -Infinity },
        b: { x: Infinity, y: Infinity, z: Infinity },
      },
      this.root
    );
    return [...result].filter((x) => !removal.has(x));
  }

  angular(lo, hi) {
    const result = new Set();
    this.#range(
      result,
      { x: lo[0], z: lo[1], y: -Infinity },
      { x: hi[0], z: hi[1], y: Infinity },
      {
        a: { x: -Infinity, y: -Infinity, z: -Infinity },
        b: { x: Infinity, y: Infinity, z: Infinity },
      },
      this.root
    );

    const removal = new Set();
    this.#range(
      removal,
      { x: lo[0], z: hi[1], y: -Infinity },
      { x: hi[0], z: Infinity, y: Infinity },
      {
        a: { x: -Infinity, y: -Infinity, z: -Infinity },
        b: { x: Infinity, y: Infinity, z: Infinity },
      },
      this.root
    );

    this.#range(
      removal,
      { x: lo[0], z: -Infinity, y: -Infinity },
      { x: hi[0], z: lo[1], y: Infinity },
      {
        a: { x: -Infinity, y: -Infinity, z: -Infinity },
        b: { x: Infinity, y: Infinity, z: Infinity },
      },
      this.root
    );
    return [...result].filter((x) => !removal.has(x));
  }

  // ghost(point) {
  //   return this.prebuiltPixel.get(`${point[0]}-${point[1]}`);
  // }

  #search(result, point, k, node) {
    if (!node || k <= 0) return;
    if (node.segs) {
      // Leaf node
      return this.#searchLeaf(result, point, k, node);
    }
    const s = point[dim2xyz(node.dim)];
    if (s < node.pos) {
      this.#search(result, point, k, node.left);
      if (result.top().value > node.pos - s || result.size() < k) {
        this.#search(result, point, k, node.right);
      }
    } else {
      this.#search(result, point, k, node.right);
      if (result.top().value > s - node.pos || result.size() < k) {
        this.#search(result, point, k, node.left);
      }
    }
  }

  #searchLeaf(result, search, k, node) {
    for (let i of node.segs) {
      const seg = this.segs[i];
      const ap = pointSub(search, seg[0]);
      let dir = pointSub(seg[1], seg[0]);
      ap.z = 0;
      dir.z = 0;
      const len = Math.sqrt(pointDot(dir, dir));
      dir = pointDiv(dir, len);
      const dv = pointDot(ap, dir);
      const lineId = seg[3];
      let dis, point;
      if (dv <= 0) {
        dis = pointDist2D(seg[0], search);
        point = seg[0];
      } else if (dv >= len) {
        dis = pointDist2D(seg[1], search);
        point = seg[1];
      } else {
        dis = Math.sqrt(pointDot(ap, ap) - dv * dv);
        point = pointAdd(seg[0], pointMul(dir, dv));
      }
      const obj = {
        id: lineId,
        value: dis,
        point,
      };
      this.#insertHeapLimit(result, k, obj);
    }
  }

  #insertHeapLimit(heap, k, obj) {
    if (globalHashCache[obj.id] === undefined) {
      if (heap.size() < k) {
        heap.push(obj);
      } else {
        heap.pushpop(obj);
      }
      globalHashCache[obj.id] = obj;
    } else if (obj.value < globalHashCache[obj.id].value) {
      globalHashCache[obj.id].value = obj.value;
      globalHashCache[obj.id].point = obj.point;
      heap.updateItem(obj);
    }
  }

  #searchRNN(result, point, r, node) {
    if (!node || r <= 0) return;
    if (node.segs) {
      // Leaf node
      return this.#searchLeafRNN(result, point, r, node);
    }
    const s = point[dim2xyz(node.dim)];
    if (s < node.pos) {
      this.#searchRNN(result, point, r, node.left);
      if (r > node.pos - s) {
        this.#searchRNN(result, point, r, node.right);
      }
    } else {
      this.#searchRNN(result, point, r, node.right);
      if (r > s - node.pos) {
        this.#searchRNN(result, point, r, node.left);
      }
    }
  }

  #searchLeafRNN(result, search, r, node) {
    for (let i of node.segs) {
      const seg = this.segs[i];
      const ap = pointSub(search, seg[0]);
      let dir = pointSub(seg[1], seg[0]);
      ap.z = 0;
      dir.z = 0;
      const len = Math.sqrt(pointDot(dir, dir));
      dir = pointDiv(dir, len);
      const dv = pointDot(ap, dir);
      const lineId = seg[3];
      let dis, point;
      if (dv <= 0) {
        dis = pointDist2D(seg[0], search);
        point = seg[0];
      } else if (dv >= len) {
        dis = pointDist2D(seg[1], search);
        point = seg[1];
      } else {
        dis = Math.sqrt(pointDot(ap, ap) - dv * dv);
        point = pointAdd(seg[0], pointMul(dir, dv));
      }
      if (dis < r) {
        if (result[lineId] === undefined) {
          result[lineId] = {
            id: lineId,
            value: dis,
            point,
          };
        } else if (result[lineId].value > dis) {
          result[lineId].value = dis;
          result[lineId].point = point;
        }
      }
    }
  }

  #range(result, p1, p2, aabb, node) {
    if (p1.x >= p2.x || p1.y >= p2.y || p1.z >= p2.z || !node) return;
    if (node.segs) {
      return this.#rangeLeaf(result, p1, p2, node);
    }
    if (
      aabb.a.x >= p1.x &&
      aabb.a.y >= p1.y &&
      aabb.a.z >= p1.z &&
      aabb.b.x <= p2.x &&
      aabb.b.y <= p2.y &&
      aabb.b.z <= p2.z
    ) {
      return this.#iterRange(result, p1, p2, node);
    }
    const s1 = p1[dim2xyz(node.dim)];
    const s2 = p2[dim2xyz(node.dim)];
    let skipLeft = false,
      skipRight = false;
    if (s1 >= node.pos) {
      skipLeft = true;
    }
    if (s2 <= node.pos) {
      skipRight = true;
    }
    skipLeft ||
      this.#range(
        result,
        p1,
        p2,
        {
          a: aabb.a,
          b: { ...aabb.b, [dim2xyz(node.dim)]: node.pos },
        },
        node.left
      );
    skipRight ||
      this.#range(
        result,
        p1,
        p2,
        {
          a: { ...aabb.a, [dim2xyz(node.dim)]: node.pos },
          b: aabb.b,
        },
        node.right
      );
  }

  #iterRange(result, p1, p2, node) {
    if (!node) return;
    if (node.segs) {
      return this.#rangeLeaf(result, p1, p2, node);
    }
    this.#iterRange(result, p1, p2, node.left);
    this.#iterRange(result, p1, p2, node.right);
  }

  #rangeLeaf(result, p1, p2, node) {
    for (let i of node.segs) {
      const seg = this.segs[i];
      const lineId = seg[3];
      if (!result.has(lineId)) {
        if (isFinite(p1.z) || isFinite(p2.z)) {
          if (
            seg[2] >= p1.z &&
            seg[2] <= p2.z &&
            seg[0].x < p2.x &&
            seg[1].x > p1.x
          ) {
            result.add(lineId);
          }
        } else {
          if (
            (seg[0].x >= p1.x &&
              seg[0].y >= p1.y &&
              seg[0].x <= p2.x &&
              seg[0].y <= p2.y) ||
            (seg[1].x >= p1.x &&
              seg[1].y >= p1.y &&
              seg[1].x <= p2.x &&
              seg[1].y <= p2.y) ||
            lineRectCollide(
              { x1: seg[0].x, y1: seg[0].y, x2: seg[1].x, y2: seg[1].y },
              { x: p1.x, y: p1.y, width: p2.x - p1.x, height: p2.y - p1.y }
            )
          )
            result.add(lineId);
        }
      }
    }
  }
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @param {Point} p3
 * @return {number}
 */
function computeCurvature(p1, p2, p3) {
  const a = pointDist(p1, p2);
  const b = pointDist(p3, p2);
  const c = pointDist(p1, p3);

  const cosC = (a * a + b * b - c * c) / 2 / a / b;
  const sinC = Math.sqrt(1 - sqr(cosC));
  const curvature = (2 * sinC) / c;
  return curvature;
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {number}
 */
function pointDist(p1, p2) {
  return Math.sqrt(
    sqr(p1.x - p2.x) + sqr(p1.y - p2.y) + sqr((p1.z ?? 0) - (p2.z ?? 0))
  );
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {number}
 */
function pointDist2D(p1, p2) {
  return Math.sqrt(sqr(p1.x - p2.x) + sqr(p1.y - p2.y));
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {Point}
 */
function pointAdd(p1, p2) {
  return { x: p1.x + p2.x, y: p1.y + p2.y, z: (p1.z ?? 0) + (p2.z ?? 0) };
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {Point}
 */
function pointSub(p1, p2) {
  return { x: p1.x - p2.x, y: p1.y - p2.y, z: (p1.z ?? 0) - (p2.z ?? 0) };
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {Point}
 */
function pointMultiply(p1, p2) {
  return {
    x: p1.x * p2.x,
    y: p1.y * p2.y,
    z: (p1.z ?? 0) * (p2.z ?? 0),
  };
}

/**
 *
 * @param {Point} p1
 * @param {number} scalar
 * @return {Point}
 */
function pointMul(p1, scalar) {
  return { x: p1.x * scalar, y: p1.y * scalar, z: (p1.z ?? 0) * scalar };
}

/**
 *
 * @param {Point} p1
 * @param {number} scalar
 * @return {Point}
 */
function pointDiv(p1, scalar) {
  return { x: p1.x / scalar, y: p1.y / scalar, z: (p1.z ?? 0) / scalar };
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {Point}
 */
function pointMin(p1, p2) {
  return {
    x: Math.min(p1.x, p2.x),
    y: Math.min(p1.y, p2.y),
    z: Math.min(p1.z ?? 0, p2.z ?? 0),
  };
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {Point}
 */
function pointMax(p1, p2) {
  return {
    x: Math.max(p1.x, p2.x),
    y: Math.max(p1.y, p2.y),
    z: Math.max(p1.z ?? 0, p2.z ?? 0),
  };
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @return {number}
 */
function pointDot(p1, p2) {
  return p1.x * p2.x + p1.y * p2.y + (p1.z ?? 0) * (p2.z ?? 0);
}

/**
 *
 * @param {Point} p
 * @return {Point}
 */
function pointNormalize(p) {
  const l = Math.sqrt(sqr(p.x) + sqr(p.y) + sqr(p.z ?? 0));
  return { x: p.x / l, y: p.y / l, z: (p.z ?? 0) / l };
}

/**
 *
 * @param {number} n
 * @return {number}
 */
function sqr(n) {
  return n * n;
}

/**
 *
 * @param {number} from
 * @param {number} to
 * @param {number} threshold
 * @param {TSRD} tsrd
 */
function splitIntoSegmentsByMaximumDistance(from, to, threshold, line, tsrd) {
  if (to < from) return;
  if (to - from <= 1) {
    applySegment(from, to, line, tsrd);
    return;
  }
  const beginPos = tsrd.pos[from];
  const endPos = tsrd.pos[to];
  const dir = pointNormalize(pointSub(endPos, beginPos));
  let maximumDis = 0;
  let bestIndex = from;
  for (let i = from; i <= to; i++) {
    const curPos = tsrd.pos[i];
    const ap = pointSub(curPos, beginPos);
    const abLen = pointDot(ap, dir);
    const curDis = pointDot(ap, ap) - abLen * abLen;
    if (curDis > maximumDis) {
      bestIndex = i;
      maximumDis = curDis;
    }
  }
  if (maximumDis < threshold || bestIndex === from || bestIndex === to) {
    applySegment(from, to, line, tsrd);
  } else {
    splitIntoSegmentsByMaximumDistance(from, bestIndex, threshold, line, tsrd);
    splitIntoSegmentsByMaximumDistance(bestIndex, to, threshold, line, tsrd);
  }
}

/**
 *
 * @param {number} from
 * @param {number} to
 * @param {TSRD} tsrd
 */
function applySegment(from, to, line, tsrd) {
  // const start = tsrd.pos[from];
  // const end = tsrd.pos[to];
  tsrd.lineID.push(line);
  // tsrd.segIndex.push([from, to, (end.y - start.y) / (end.x - start.x)]);
  tsrd.segIndex.push([from, to]);
}

/**
 *
 * @param {*} org
 * @returns {number}
 */
function countSegs(org) {
  let count = 0;
  for (let ci of org) {
    count += ci.sp.length + 1;
  }
  return count;
}

/**
 *
 * @param {*} org
 * @param {Float32Array} w
 * @param {number} defaultv
 * @returns {number}
 */
// function countWeight(org, w, defaultv) {
//   let count = 0;
//   for (let ci of org) {
//     for (let i = ci.from + 1; i < ci.to; i++) {
//       count += w[i];
//     }
//     count += defaultv;
//   }
//   return count / defaultv;
// }

function getMidWeightedVal(data, weight) {
  data.sort((a, b) => a[0] < b[0]);
  return data[Math.floor(data.length / 2)][0];
  // return randomizedWeightedSelect(data, 0, data.length - 1, weight, 0, 0);
}

// function randomizedWeightedSelect(a, p, r, w, wlsum, wrsum) {
//   const q = randomizedPartition(a, p, r);
//   let wl = wlsum,
//     wr = wrsum;
//   for (let i = p; i < q; i++) wl += a[i][1];
//   for (let i = q + 1; i <= r; i++) wr += a[i][1];
//   const curw = a[q][1];
//   const allw = wl + wr + curw;
//   const expectW = allw * w;
//   if ((wl <= expectW && wr <= expectW) || p >= r) return a[q][0];
//   if (wl > expectW && p != q)
//     return randomizedWeightedSelect(a, p, q - 1, w, wlsum, wr + curw);
//   if (r != q) return randomizedWeightedSelect(a, q + 1, r, w, wl + curw, wrsum);
//   return a[q][0];
// }

// function randomizedPartition(a, p, r) {
//   const i = p + Math.round(Math.random() * (r - p));
//   swap(a, i, r);
//   return partition(a, p, r);
// }

// function partition(a, p, r) {
//   const x = a[r];
//   let i = p - 1,
//     j;
//   for (j = p; j < r; j++) {
//     if (a[j][0] < x[0]) {
//       i++;
//       swap(a, i, j);
//     }
//   }
//   swap(a, j, i + 1);
//   return i + 1;
// }

// function swap(a, i, j) {
//   const temp = a[i];
//   a[i] = a[j];
//   a[j] = temp;
// }

function dim2xyz(dim) {
  return dim == 0 ? "x" : dim == 1 ? "y" : "z";
}

function updateAABB(ci, pos) {
  const beginIndex = ci.from;
  const endIndex = ci.to;
  ci.aabb = {
    a: {
      x: pos[beginIndex].x,
      y: pos[beginIndex].y,
      z: pos[beginIndex].z ?? 0,
    },
    b: {
      x: pos[beginIndex].x,
      y: pos[beginIndex].y,
      z: pos[beginIndex].z ?? 0,
    },
  };
  for (let j = beginIndex + 1; j <= endIndex; j++) {
    ci.aabb = {
      a: {
        x: Math.min(ci.aabb.a.x, pos[j].x),
        y: Math.min(ci.aabb.a.y, pos[j].y),
        z: Math.min(ci.aabb.a.z, pos[j].z ?? 0),
      },
      b: {
        x: Math.max(ci.aabb.b.x, pos[j].x),
        y: Math.max(ci.aabb.b.y, pos[j].y),
        z: Math.max(ci.aabb.b.z, pos[j].z ?? 0),
      },
    };
  }
}

function splitCurves(dim, pos, org, resultLeft, resultRight, tsrd) {
  for (let ci of org) {
    let a = ci.aabb.a[dim2xyz(dim)];
    let b = ci.aabb.b[dim2xyz(dim)];
    if (a > b) {
      const temp = a;
      a = b;
      b = temp;
    }
    if (pos <= a) {
      resultRight.push(ci);
    } else if (pos >= b) {
      resultLeft.push(ci);
    } else {
      let candidateIndex = 0;
      let newci = { sp: [] };
      let lastNewci = newci;
      let curIsLeft = tsrd.pos[ci.from][dim2xyz(dim)] < pos;
      newci.from = ci.from;
      for (let index = ci.from + 1; index <= ci.to; index++) {
        const p = tsrd.pos[index][dim2xyz(dim)];
        let changed = false;
        if (p < pos) {
          if (!curIsLeft) {
            newci.to = index;
            resultRight.push(newci);
            lastNewci = newci;
            checkSpUnion(lastNewci, tsrd);
            updateAABB(lastNewci, tsrd.pos);
            newci = { sp: [] };
            newci.from = index - 1;
            curIsLeft = true;
            changed = true;
          }
        } else {
          if (curIsLeft) {
            newci.to = index;
            resultLeft.push(newci);
            lastNewci = newci;
            checkSpUnion(lastNewci, tsrd);
            updateAABB(lastNewci, tsrd.pos);
            newci = { sp: [] };
            newci.from = index - 1;
            curIsLeft = false;
            changed = true;
          }
        }

        if (ci.sp.length > candidateIndex) {
          if (ci.sp[candidateIndex] < index) ++candidateIndex;
          if (ci.sp[candidateIndex] == index) {
            if (!changed) {
              let lc = newci.sp;
              newci.sp.push(index);
            } else {
              let lc = lastNewci.sp;
              lc.push(index);
            }
          }
        }
      }
      newci.to = ci.to;
      if (curIsLeft) {
        resultLeft.push(newci);
        updateAABB(newci, tsrd.pos);
      } else {
        resultRight.push(newci);
        updateAABB(newci, tsrd.pos);
      }
    }
  }
}

function checkSpUnion(result, tsrd) {
  if (!result.sp || result.sp.length == 0) return;
  if (result.sp.length == 1) {
    if (canUnion(result.from, result.sp[0], result.to, tsrd)) {
      result.sp = [];
    }
  } else if (result.sp.length > 1) {
    let shiftFlag = false,
      popFlag = false;
    if (canUnion(result.from, result.sp[0], result.sp[1], tsrd)) {
      shiftFlag = true;
    }
    if (
      canUnion(
        result.sp[result.sp.length - 2],
        result.sp[result.sp.length - 1],
        result.to,
        tsrd
      )
    ) {
      popFlag = true;
    }
    if (shiftFlag) {
      result.sp.shift();
    }
    if (popFlag) {
      result.sp.pop();
    }
  }
}

function canUnion(ai, bi, ci, tsrd) {
  const cosLimit = Math.cos((kdparam.deg / 180) * Math.PI);
  const a = tsrd.pos[ai];
  const b = tsrd.pos[bi];
  const c = tsrd.pos[ci];
  const dirAB = pointNormalize(pointSub(b, a));
  const dirBC = pointNormalize(pointSub(c, b));
  const cosValue = pointDot(dirAB, dirBC);
  return isNaN(cosValue) || cosValue >= cosLimit;
}

function computeCost(l, r, n, p, x, y, factor) {
  const leftRatio = n / (l + 1e-10);
  let leftV;
  if (leftRatio <= 1) {
    return Infinity;
  }
  leftV = Math.log(n) / Math.log(leftRatio);

  const rightRatio = n / (r + 1e-10);
  let rightV;
  if (rightRatio <= 1) {
    return Infinity;
  }

  if (p == 0 || p == 1) {
    return Infinity;
  }
  rightV = Math.log(n) / Math.log(rightRatio);

  // const wL = computeW(n, x / p, y / p);
  // const wR = computeW(n, x / (1 - p), y / (1 - p));
  const cost1 = p * l + (1 - p) * r;
  const cost2 = (leftV + rightV) * 0.5;
  return cost1 + cost2 * kdparam.b;
}

// function computeW(n, x, y) {
//   const a = 53.20996717; // 2.04518789f;
//   const b = 55.29978444; // 2.73675685f;
//   const c = 197.2404396; // 23.68092824f;
//   const d = 1.06480181; // 7.8658251f;
//   // const float e = 0.02091861f;
//   const result = ((1 - a / (b + x)) * (1 - a / (b + y)) * c) / (n + d); // +e;
//   return Math.min(1, result);
// }

function connectNode(father, node, isLeft) {
  if (isLeft) {
    father.left = node;
  } else {
    father.right = node;
  }
}

// function generateSeg(from, to, tsrd) {
//   let si;
//   const segID = segs.length;
// }

/**
 *
 * @param {[Point, Point]} ls
 * @param {number} id
 * @param {Map<string, number[]>} hashmap
 */
export function brensenham(ls, id, hashmap) {
  let xx = Math.floor(ls[1].x);
  let yy = Math.floor(ls[1].y);
  let x = Math.floor(ls[0].x);
  let y = Math.floor(ls[0].y);
  if (Math.abs(yy - y) > Math.abs(xx - x)) {
    if (yy < y) return brensenhamHigh(xx, yy, x, y, id, hashmap);
    return brensenhamHigh(x, y, xx, yy, id, hashmap);
  } else {
    if (xx < x) return brensenhamLow(xx, yy, x, y, id, hashmap);
    return brensenhamLow(x, y, xx, yy, id, hashmap);
  }
}

function brensenhamLow(x0, y0, x1, y1, id, hashmap) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let yi = dy < 0 ? ((dy = -dy), -1) : 1;
  let D = 2 * dy - dx;
  for (let x = x0, y = y0; x <= x1; ++x, D += 2 * dy) {
    hashmap.get(`${x}-${y}`)?.push(id);
    if (D > 0) (y += yi), (D -= 2 * dx);
  }
}

function brensenhamHigh(x0, y0, x1, y1, id, hashmap) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let xi = dx < 0 ? ((dx = -dx), -1) : 1;
  let D = 2 * dx - dy;
  for (let x = x0, y = y0; y <= y1; ++y, D += 2 * dx) {
    hashmap.get(`${x}-${y}`)?.push(id);
    if (D > 0) (x += xi), (D -= 2 * dy);
  }
}
