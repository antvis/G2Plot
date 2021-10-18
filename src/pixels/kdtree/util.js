// import Heap from "heap";
import Queue from "tinyqueue";
import { RBush3D } from "rbush-3d";
const Heap = require("heap");
const kmeans = require("ml-kmeans").default;
// const kmeans = require('ml-kmeans');

export class VolKDTree {
  //#region props init
  /**
   * @type {[number,number,number,number,number,number][]}
   */
  #data = null;
  /**
   * @type {null | 'x' | 'yMin' | 'yMax' | 'slope'}
   */
  #dividedBy = null;
  /**
   * @type {number} actually is superficie
   */
  #volume = 0;
  /**
   * @type {[number,number,number,number]} [xMin, xMax, yMin, yMax]
   */
  #boundingBox = [0, 0, 0, 0];
  /**
   * @type {VolKDTree[]}
   */
  #children = [];

  get dividedBy() {
    return this.#dividedBy;
  }

  get volume() {
    return this.#volume;
  }

  get children() {
    return this.#children.slice();
  }

  get lineCount() {
    return this.#data.length;
  }

  get boundingBox() {
    return this.#boundingBox.slice();
  }

  toString() {
    return `VolKDTree (${this.#boundingBox.join(", ")}) ${
      this.#children.length
        ? `${this.dividedBy} {
  ${this.#children[0].toString()}
  ${this.#children[1].toString()}
}`
        : ""
    }`;
  }
  //#endregion

  /**
   *
   * @param {[number,number,number,number,number,number][]} data [xMin, xMax, yMin, yMax, slope, i][]
   */
  constructor(data, avoidRecursive) {
    this.#data = data;
    this.#boundingBox = data.reduce(
      (p, v) => [
        Math.min(p[0], v[0], v[1]),
        Math.max(p[1], v[0], v[1]),
        Math.min(p[2], v[2], v[3]),
        Math.max(p[3], v[2], v[3]),
      ],
      [Infinity, -Infinity, Infinity, -Infinity]
    );
    this.#volume = Math.abs(
      (this.#boundingBox[1] - this.#boundingBox[0]) *
        (this.#boundingBox[3] - this.#boundingBox[2])
    );
    if (!avoidRecursive) {
      this.#tryDivide();
    }
  }

  #tryDivide() {
    if (this.#data.length <= 1) return;
    const xDivide = (this.#boundingBox[0] + this.#boundingBox[1]) / 2; // Assume time are equally distributed in space
    const yMinDivide = selectK(
      this.#data.map((x) => x[2]),
      Math.floor(this.#data.length / 2)
    );
    const yMaxDivide = selectK(
      this.#data.map((x) => x[3]),
      Math.floor(this.#data.length / 2)
    );
    const slopeDivide = selectK(
      this.#data.map((x) => x[4]),
      Math.floor(this.#data.length / 2)
    );
    // console.log(xDivide, yMinDivide, yMaxDivide, slopeDivide);
    const xChildren = [
      splitLines(this.#data, this.#boundingBox[0], xDivide, 0),
      splitLines(this.#data, xDivide, this.#boundingBox[1], 0),
    ];
    const yMinChildren = [
      splitLines(this.#data, this.#boundingBox[2], yMinDivide, 1),
      splitLines(this.#data, yMinDivide, this.#boundingBox[3], 1),
    ];
    const yMaxChildren = [
      splitLines(this.#data, this.#boundingBox[2], yMaxDivide, 1),
      splitLines(this.#data, yMaxDivide, this.#boundingBox[3], 1),
    ];
    const slopeChildren = [
      splitLines(this.#data, -Infinity, slopeDivide, 2),
      splitLines(this.#data, slopeDivide, Infinity, 2),
    ];
    // console.log(xChildren, yMinChildren, yMaxChildren, slopeChildren);
    const xCost = calculateCost(xChildren, this);
    const yMinCost = calculateCost(yMinChildren, this);
    const yMaxCost = calculateCost(yMaxChildren, this);
    const slopeCost = calculateCost(slopeChildren, this);
    const minCost = Math.min(xCost[2], yMinCost[2], yMaxCost[2], slopeCost[2]);
    // console.log(minCost, this.lineCount);
    if (minCost >= this.lineCount) {
      return;
    }
    switch (minCost) {
      case xCost[2]:
        this.#dividedBy = "x";
        this.#children = xCost.slice(0, 2);
        break;
      case yMinCost[2]:
        this.#dividedBy = "yMin";
        this.#children = yMinCost.slice(0, 2);
        break;
      case yMaxCost[2]:
        this.#dividedBy = "yMax";
        this.#children = yMaxCost.slice(0, 2);
        break;
      case slopeCost[2]:
        this.#dividedBy = "slope";
        this.#children = slopeCost.slice(0, 2);
        break;
    }
    this.#children.forEach((child) => {
      child.#tryDivide();
    });
  }

  knn(point, k) {
    const heap = new Heap((a, b) => b.v - a.v);
    this.findKNN(point, k, heap);
    // console.log(heap.size());
    return heap;
  }

  rnn(point, r, visit) {
    let ret = [];
    this.findRNN(point, r, ret, visit);
  }

  range(lo, hi, visit) {
    let ret = [];
    this.findRange(lo, hi, ret, visit);
  }

  findKNN(point, k, heap) {
    if (this.#children.length) {
      let order = [...this.#children];
      if (inBox(this.#children[1].#boundingBox, point)) {
        swap(order[0], order[1]);
      }
      for (let i = 0; i < 2 && heap.size() < k; i++) {
        if (
          heap.size() < k ||
          closestDist(order[i].#boundingBox, point) < heap.top()
        )
          order[i].findKNN(point, k, heap);
      }
    } else {
      // if it's a leaf node
      // console.log('im leaf node')
      // console.log(`data length ${this.#data.length}`)
      for (let i = 0; i < this.#data.length; i++) {
        const dist = dist2Seg(this.#data[i], point);
        if (heap.size() < k || heap.top() > dist) {
          if (heap.size() === k) heap.pop();
          heap.push({ v: dist, d: this.#data[i] });
          // console.log(this.#data[i])
        }
      }
    }
  }

  findRNN(point, r, ret, visit) {
    if (largestDist(this.#boundingBox, point) <= r) {
      concat(ret, this.#data, visit);
      return;
    }
    if (closestDist(this.#boundingBox, point) > r) {
      return;
    }
    if (this.#children.length) {
      this.#children[0].findRNN(point, r, ret, visit);
      this.#children[1].findRNN(point, r, ret, visit);
    } else {
      this.#data.forEach((d) => {
        if (dist2Seg(d, point) <= r) {
          ret.push(d);
          visit(d);
        }
      });
    }
  }

  findRange(lo, hi, ret, visit) {
    const box = this.#boundingBox;
    if (lo[0] < box[0] && lo[1] < box[2] && hi[0] > box[1] && hi[1] > box[3]) {
      concat(ret, this.#data, visit);
      return;
    }
    if (this.#children.length) {
      this.#children[0].findRange(lo, hi, ret, visit);
      this.#children[1].findRange(lo, hi, ret, visit);
    } else {
      this.#data.forEach((d) => {
        const box = [lo[0], hi[0], lo[1], hi[1]];
        if (inBox(box, [d[0], d[2]]) || inBox(box, [d[1], d[3]])) {
          ret.push(d);
          visit(d);
        }
      });
    }
  }
}

function inBox(box, point) {
  return (
    point[0] >= box[0] &&
    point[0] <= box[1] &&
    point[1] >= box[2] &&
    point[1] <= box[3]
  );
}

function sqDist(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

function dist2Seg(seg, point) {
  const cross =
    (point[0] - seg[0]) * (seg[1] - seg[0]) +
    (point[1] - seg[2]) * (seg[3] - seg[2]);
  if (cross <= 0) return sqDist(...point, seg[0], seg[2]);

  const d2 =
    (seg[1] - seg[0]) * (seg[1] - seg[0]) +
    (seg[3] - seg[2]) * (seg[3] - seg[2]);
  if (cross >= d2) return sqDist(...point, seg[1], seg[3]);

  const r = cross / d2,
    px = seg[0] + (seg[1] - seg[0]) * r,
    py = seg[2] + (seg[3] - seg[2]) * r;
  return sqDist(...point, px, py);
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[j] = arr[i];
  arr[i] = tmp;
}

function closestDist(box, point) {
  const c1 = point[0] >= box[0] && point[0] <= box[1],
    c2 = point[1] >= box[2] && point[1] <= box[3];
  if (c1 && c2) return 0;
  let ret = [
    sqDist(...point, box[0], box[2]),
    sqDist(...point, box[0], box[3]),
    sqDist(...point, box[1], box[2]),
    ...point,
    box[1],
    box[3],
  ];
  if (c1) {
    ret.push(
      Math.min(Math.abs(box[2] - point[1]), Math.abs(box[3] - point[1]))
    );
  }
  if (c2) {
    ret.push(
      Math.min(Math.abs(box[0] - point[0]), Math.abs(box[1] - point[0]))
    );
  }
  return Math.min(...ret);
}

function largestDist(box, point) {
  let ret = [
    sqDist(...point, box[0], box[2]),
    sqDist(...point, box[0], box[3]),
    sqDist(...point, box[1], box[2]),
    ...point,
    box[1],
    box[3],
  ];
  ret.push(Math.max(Math.abs(box[2] - point[1]), Math.abs(box[3] - point[1])));
  ret.push(Math.max(Math.abs(box[0] - point[0]), Math.abs(box[1] - point[0])));
  return Math.max(...ret);
}

function concat(arr, tmp_arr, visit) {
  tmp_arr.forEach((d) => {
    visit(d);
    arr.push(d);
  });
}

//#region MOM algorithm to find median

function partition(arr, left, right, pivot) {
  var temp = arr[pivot];
  arr[pivot] = arr[right];
  arr[right] = temp;
  var track = left;
  for (var i = left; i < right; i++) {
    if (arr[i] < arr[right]) {
      var t = arr[i];
      arr[i] = arr[track];
      arr[track] = t;
      track++;
    }
  }
  temp = arr[track];
  arr[track] = arr[right];
  arr[right] = temp;
  return track;
}

function selectIdx(arr, left, right, k) {
  if (left == right) {
    return left;
  }
  var dest = left + k;
  while (true) {
    var pivotIndex =
      right - left + 1 <= 5
        ? Math.floor(Math.random() * (right - left + 1)) + left
        : medianOfMedians(arr, left, right);
    pivotIndex = partition(arr, left, right, pivotIndex);
    if (pivotIndex == dest) return pivotIndex;
    else if (pivotIndex < dest) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }
}

function medianOfMedians(arr, left, right) {
  var numMedians = Math.ceil((right - left) / 5);
  for (var i = 0; i < numMedians; i++) {
    var subLeft = left + i * 5;
    var subRight = subLeft + 4;
    if (subRight > right) {
      subRight = right;
    }
    var medianIdx = selectIdx(
      arr,
      subLeft,
      subRight,
      Math.floor((subRight - subLeft) / 2)
    );
    var temp = arr[medianIdx];
    arr[medianIdx] = arr[left + i];
    arr[left + i] = temp;
  }
  return selectIdx(
    arr,
    left,
    left + numMedians - 1,
    Math.floor(numMedians / 2)
  );
}

function selectK(arr, k) {
  if (!Array.isArray(arr) || arr.length == 0 || arr.length - 1 < k || k < 0) {
    return;
  }
  var idx = selectIdx(arr, 0, arr.length - 1, k);
  return arr[idx];
}

//#endregion

/**
 *
 * @param {[number,number,number,number,number,number][]} arr
 * @param {number} lo
 * @param {number} hi
 * @param {0|1|2} axis enum: x=0, y=1, slope=2
 * @return {[number,number,number,number,number,number][]}
 */
function splitLines(arr, lo, hi, axis) {
  const result = [];
  if (lo === undefined || hi === undefined) {
    return result;
  }
  arr.forEach((data) => {
    if (axis === 0) {
      if (lo >= data[1] || hi <= data[0]) {
        return;
      }
      if (lo <= data[0] && hi >= data[1]) {
        return result.push(data);
      }
      const x1 = data[0];
      const x2 = data[1];
      const y1 = data[2];
      const y2 = data[3];
      if (hi < x2) {
        return result.push([
          x1,
          hi,
          y1,
          ((y2 - y1) / (x2 - x1)) * (hi - x1) + y1,
          data[4],
          data[5],
        ]);
      }
      if (lo > x1) {
        return result.push([
          lo,
          x2,
          y2 - ((y2 - y1) / (x2 - x1)) * (x2 - lo),
          y2,
          data[4],
          data[5],
        ]);
      }
    } else if (axis === 1) {
      const yLow = Math.min(data[2], data[3]);
      const yHigh = Math.max(data[2], data[3]);
      if (lo >= yHigh || hi <= yLow) {
        return;
      }
      if (lo <= yLow && hi >= yHigh) {
        return result.push(data);
      }
      const x1 = data[0];
      const x2 = data[1];
      const y1 = data[2];
      const y2 = data[3];
      if (hi < yHigh) {
        if (y1 > y2) {
          return result.push([
            x2 - ((x2 - x1) / (y2 - y1)) * (y2 - hi),
            x2,
            hi,
            y2,
            data[4],
            data[5],
          ]);
        } else {
          return result.push([
            x1,
            ((x2 - x1) / (y2 - y1)) * (hi - y1) + x1,
            y1,
            hi,
            data[4],
            data[5],
          ]);
        }
      }
      if (lo > yLow) {
        if (y1 < y2) {
          return result.push([
            x2 - ((x2 - x1) / (y2 - y1)) * (y2 - lo),
            x2,
            lo,
            y2,
            data[4],
            data[5],
          ]);
        } else {
          return result.push([
            x1,
            ((x2 - x1) / (y2 - y1)) * (lo - y1) + x1,
            y1,
            lo,
            data[4],
            data[5],
          ]);
        }
      }
    } else if (axis === 2) {
      if (lo > data[4] || hi <= data[4]) {
        return;
      }
      return result.push(data);
    }
  });
  return result;
}

/**
 * @param {[number,number,number,number,number,number][][]} param0
 * @param {VolKDTree} parent
 */
function calculateCost([leftData, rightData], parent) {
  const treeLeft = new VolKDTree(leftData, true);
  const treeRight = new VolKDTree(rightData, true);
  const PTl = treeLeft.volume / parent.volume;
  const PTr = treeRight.volume / parent.volume;
  const costTraversal = 0.3 + (PTl * leftData.length + PTr * rightData.length);
  const costBacktracking =
    ((PTl * Math.log(parent.lineCount)) /
      Math.log(parent.lineCount / leftData.length) +
      (PTr * Math.log(parent.lineCount)) /
        Math.log(parent.lineCount / rightData.length)) *
    3;
  return [treeLeft, treeRight, costTraversal + costBacktracking];
}

export class VolRTree {
  #data = null;
  #treeRef = null;
  #repTree = null;

  constructor(data) {
    this.#data = data.map((raw) => ({
      minX: raw[0],
      maxX: raw[1],
      minY: Math.min(raw[2], raw[3]),
      maxY: Math.max(raw[2], raw[3]),
      minZ: raw[4],
      maxZ: raw[4],
      raw,
    }));
    this.#treeRef = new RBush3D(16);
    this.#treeRef.load(this.#data);
  }

  rnn(x, y, r) {
    return this.#treeRef
      .search({
        minX: x - r,
        minY: y - r,
        maxX: x + r,
        maxY: y + r,
        minZ: -Infinity,
        maxZ: Infinity,
      })
      .filter(
        ({ raw }) =>
          distToSegment([x, y], [raw[0], raw[2]], [raw[1], raw[3]]) <= r
      );
  }

  brush(minX, minY, maxX, maxY) {
    return this.#treeRef.search({
      minX,
      minY,
      maxX,
      maxY,
      minZ: -Infinity,
      maxZ: Infinity,
    });
  }

  angular(minX, minSlope, maxX, maxSlope) {
    return this.#treeRef.search({
      minX,
      minY: -Infinity,
      maxX,
      maxY: Infinity,
      minZ: minSlope,
      maxZ: maxSlope,
    });
  }

  knn(x, y, k) {
    /*
    let l = 0, r = 10000, ret, times = 40;
    while(times--) {
      let mid = (l + r) * 0.5;
      ret = this.rnn(x, y, mid);
      console.log(times,l, mid,ret.length, k, ret.length < k);
      if (ret.length === k)
        return ret;
      if (ret.length < k)
        l = mid;
      else
        r = mid;
    }
    return ret.slice(0, k);

     */

    // /*
    var node = this.#treeRef.data,
      result = [],
      i,
      child,
      dist,
      candidate;

    const heap = new Heap((a, b) => b.v - a.v);

    var queue = new Queue(undefined, this.#compareDist);

    while (node) {
      for (i = 0; i < node.children.length; i++) {
        child = node.children[i];
        dist = this.#boxDist(x, y, child);
        // dist = closestDist([child.minX, child.minY, child.maxX, child.maxY], [x, y]);
        if (heap.size() < k || heap.top().v > dist) {
          queue.push({
            node: child,
            isItem: node.leaf,
            dist: dist,
          });
        }
      }

      while (queue.length && queue.peek().isItem) {
        candidate = queue.pop();
        // dist = dist2Seg([candidate.node.minX, candidate.node.minY, candidate.node.maxX, candidate.node.maxY], [x, y]);
        dist = dist2Seg(candidate.node.raw, [x, y]);
        // result.push(candidate);
        // console.log(heap.top());
        // if (heap.size() > 1)
        //   return heap.top();
        if (heap.size() < k || heap.top().v > dist) {
          // console.log(dist, candidate.node.raw, dist2Seg(candidate.node.raw, [x, y]));
          // console.log(candidate);
          if (heap.size() === k) {
            heap.pop();
          }
          heap.push({
            // v: candidate.dist,
            node: candidate.node,
            v: dist,
          });
        }
        // if (k && result.length === k) return result;
      }

      node = queue.pop();
      if (node) node = node.node;
    }

    while (heap.size()) {
      // console.log(heap.top().v, heap.top().node, dist2Seg(heap.top().node.raw, [x,y]));
      result.push(heap.top().node);
      heap.pop();
    }
    // console.log(result);
    return result;

    // */
  }

  rep(lines, repNumber = 3) {
    this.#repTree = { children: [] };
    let stack = [[this.#treeRef.data, this.#repTree, 0]];

    const mp = new Map();
    new Array(lines.length).fill(undefined).forEach((_, i) => mp.set(i, i));

    for (let i = 0; i < lines.length; i++)
      for (let j = i + 1; j < lines.length; j++) {
        const length = Math.min(lines[i].length, lines[j].length);
        const subArr = lines[i]
          .slice(lines[i].length - length)
          .map((v, cnt) => v.y - lines[j][lines[j].length - length + cnt].y);
        const derivation = standardDeviation(subArr);
        mp.set(i, mp.get(i) + derivation);
        mp.set(j, mp.get(j) + derivation);
      }

    return Array.from(mp)
      .sort((a, b) => a[1] - b[1])
      .map((d) => d[0])
      .slice(0, 10);

    while (stack.length > 0) {
      const [treeNode, repNode, cnt] = stack.pop();
      // console.log(treeNode);
      if (cnt === treeNode.children.length || treeNode.leaf) {
        let indexes;

        if (cnt === treeNode.children.length) {
          indexes = [];
          // console.log(indexes);
          // console.log(repNode.children);
          repNode.children.forEach(
            (child) => (indexes = [...indexes, ...child.indexes])
          );
          // indexes = repNode.children.indexes.slice();
        } else {
          indexes = treeNode.children.map(({ raw }) => raw[5]);
        }

        indexes = Array.from(new Set(indexes));

        const points = this.#generatePoints(
          indexes,
          lines,
          treeNode,
          Math.sqrt(treeNode.height) * 5
        );

        // console.log(points, indexes.map(x => lines[x]), treeNode);
        const result = kmeans(points, repNumber, {
          initialization: "mostDistant",
        });
        // repNode.indexes = result.map(x => indexes[x]);

        const maxClusterMap = new Map();
        result.clusters.forEach((c, i) => {
          if (
            !maxClusterMap.has(c) ||
            mp.get(maxClusterMap.get(c)) > mp.get(indexes[i])
          ) {
            maxClusterMap.set(c, indexes[i]);
          }
        });

        // console.log(maxClusterMap, Array.from(maxClusterMap), result, points);
        repNode.indexes = Array.from(maxClusterMap).map((d) => d[1]);
      } else {
        const newNode = { children: [] };
        repNode.children.push(newNode);
        stack.push([treeNode, repNode, cnt + 1]);
        stack.push([treeNode.children[cnt], newNode, 0]);
      }
    }

    return this.#repTree.indexes;
  }
  #generatePoints(indexes, lines, box, sampleNumber) {
    // Generate sample x coordinates
    const startX = box.minX,
      endX = box.maxX,
      xStride = (endX - startX) / sampleNumber,
      xCoordinates = [];
    for (let i = 0; i < sampleNumber + 1; i++) {
      xCoordinates.push(i * xStride + startX);
    }

    const res = indexes.map((ind) => {
      const line = lines[ind];
      let pos1 = -1,
        pos2 = -1,
        xPos = 1;
      const angle = [];
      while (xPos <= sampleNumber) {
        while (
          pos1 + 1 < line.length &&
          xCoordinates[xPos - 1] > line[pos1 + 1].x
        ) {
          pos1++;
        }
        while (
          pos2 + 1 < line.length &&
          xCoordinates[xPos] > line[pos2 + 1].x
        ) {
          pos2++;
        }

        try {
          if (pos2 === -1 || pos1 === line.length - 1) angle.push(0);
          else if (pos1 === -1 && pos2 === line.length - 1)
            angle.push(getAngle(line[0], line[line.length - 1]));
          else if (pos1 === -1)
            angle.push(
              getAngle(
                line[0],
                mix(line[pos2], line[pos2 + 1], xCoordinates[xPos])
              )
            );
          else if (pos2 === line.length - 1)
            angle.push(
              getAngle(
                mix(line[pos1], line[pos1 + 1], xCoordinates[xPos - 1] - 1e-5),
                line[line.length - 1]
              )
            );
          else
            angle.push(
              getAngle(
                mix(line[pos1], line[pos1 + 1], xCoordinates[xPos - 1]),
                mix(line[pos2], line[pos2 + 1], xCoordinates[xPos])
              )
            );
        } catch (e) {
          console.log(
            pos1,
            pos2,
            line,
            xCoordinates,
            xCoordinates[xPos - 1],
            mix(line[pos1], line[pos1 + 1], xCoordinates[xPos - 1])
          );
          throw Error();
        }
        xPos++;
      }
      // console.log(angle, xPos, sampleNumber);
      // console.log(`This is pos1 ${pos1}, pos2: ${pos2}, line length: ${line.length}`);
      // console.log(`Line information`, line);
      // console.log(xCoordinates);
      return angle;
    });
    return res;
  }

  #compareDist(a, b) {
    return a.dist - b.dist;
  }

  #boxDist(x, y, box) {
    var dx = this.#axisDist(x, box.minX, box.maxX),
      dy = this.#axisDist(y, box.minY, box.maxY);
    return dx * dx + dy * dy;
  }

  #axisDist(k, min, max) {
    return k < min ? min - k : k <= max ? 0 : k - max;
  }
}

export function mix(point1, point2, x) {
  const r = Math.max(
      Math.min((x - point1.x) / (point2.x - point1.x), 1.0),
      0.0
    ),
    l = 1 - r;
  return { x: point1.x * l + point2.x * r, y: point1.y * l + point2.y * r };
}

function getAngle(point1, point2) {
  if (point1.x === point2.x) {
    console.log(point1, point2);
    throw Error("Same x coordinate");
  }
  return Math.atan((point2.y - point1.y) / (point2.x - point1.x));
}
export function getAngle2(point1, point2) {
  if (point1[0] === point2[0]) {
    console.log(point1, point2);
    throw Error("Same x coordinate");
  }
  return Math.atan((point2[1] - point1[1]) / (point2[0] - point1[0]));
}

export function sqr(x) {
  return x * x;
}

export function dist2(v, w) {
  return sqr(v[0] - w[0]) + sqr(v[1] - w[1]);
}

export function eq(x, y) {
  return Math.abs(x - y) <= 1;
}
export const updatePoint = (oldPoint, testPoint, newPoint) => {
  if (eq(oldPoint[0], testPoint[0])) oldPoint[0] = newPoint[0];
  if (eq(oldPoint[1], testPoint[1])) oldPoint[1] = newPoint[1];
};

export const movePoint = (point, offsetX, offsetY) => {
  point[0] += offsetX;
  point[1] += offsetY;
};

// p - point
// v - start point of segment
// w - end point of segment
export function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 === 0) return dist2(p, v);
  var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
}

// p - point
// v - start point of segment
// w - end point of segment
export function distToSegment(p, v, w) {
  return Math.sqrt(distToSegmentSquared(p, v, w));
}

export function lineRectCollide(line, rect) {
  // p=line startpoint, p2=line endpoint
  var p = { x: line.x1, y: line.y1 };
  var p2 = { x: line.x2, y: line.y2 };

  // top rect line
  var q = { x: rect.x, y: rect.y };
  var q2 = { x: rect.x + rect.width, y: rect.y };
  if (lineSegmentsCollide(p, p2, q, q2)) {
    return true;
  }
  // right rect line
  var q = q2;
  var q2 = { x: rect.x + rect.width, y: rect.y + rect.height };
  if (lineSegmentsCollide(p, p2, q, q2)) {
    return true;
  }
  // bottom rect line
  var q = q2;
  var q2 = { x: rect.x, y: rect.y + rect.height };
  if (lineSegmentsCollide(p, p2, q, q2)) {
    return true;
  }
  // left rect line
  var q = q2;
  var q2 = { x: rect.x, y: rect.y };
  if (lineSegmentsCollide(p, p2, q, q2)) {
    return true;
  }

  // not intersecting with any of the 4 rect sides
  return false;
}

// point object: {x:, y:}
// p0 & p1 form one segment, p2 & p3 form the second segment
// Get interseting point of 2 line segments (if any)
// Attribution: http://paulbourke.net/geometry/pointlineplane/
export function lineSegmentsCollide(p0, p1, p2, p3) {
  var unknownA = (p3.x - p2.x) * (p0.y - p2.y) - (p3.y - p2.y) * (p0.x - p2.x);
  var unknownB = (p1.x - p0.x) * (p0.y - p2.y) - (p1.y - p0.y) * (p0.x - p2.x);
  var denominator =
    (p3.y - p2.y) * (p1.x - p0.x) - (p3.x - p2.x) * (p1.y - p0.y);

  // Test if Coincident
  // If the denominator and numerator for the ua and ub are 0
  //    then the two lines are coincident.
  if (unknownA == 0 && unknownB == 0 && denominator == 0) {
    return null;
  }

  // Test if Parallel
  // If the denominator for the equations for ua and ub is 0
  //     then the two lines are parallel.
  if (denominator == 0) return null;

  // test if line segments are colliding
  unknownA /= denominator;
  unknownB /= denominator;
  var isIntersecting =
    unknownA >= 0 && unknownA <= 1 && unknownB >= 0 && unknownB <= 1;

  return isIntersecting;
}

function standardDeviation(values) {
  var avg = average(values);

  var squareDiffs = values.map(function(value) {
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data) {
  var sum = data.reduce(function(sum, value) {
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

export function calculateCurvature(points) {
  if (points.length < 3) return [];
  // return 0;

  // let cnt = 0, curSum = 0, bendingEnergy = 0;
  let result = [];
  for (let i = 1; i < points.length - 1; i++) {
    const step1 = points[i].x - points[i - 1].x + 0.001,
      step2 = points[i + 1].x - points[i].x + 0.001,
      step = Math.min(step1, step2);

    let lstPoint = points[i - 1],
      nxtPoint = points[i + 1];
    if (step1 < step2) {
      nxtPoint = mix(points[i], nxtPoint, points[i].x + step1);
    } else {
      lstPoint = mix(points[i - 1], points[i], points[i].x - step2);
    }
    const f1 = (nxtPoint.y - lstPoint.y) / step;
    const f2 = (lstPoint.y - 2 * points[i].y + nxtPoint.y) / (step * step);
    if (isNaN(f2)) {
      console.log(step1, step2, points[i - 1], points[i], points[i + 1]);
    }
    result.push({
      x: points[i].x,
      y: Math.abs(f2) / Math.pow(1 + f1 * f1, 1.5),
    });
    // const c = Math.abs(f2) / Math.pow(1 + f1 * f1, 1.5);
    // curSum += c* Math.sign(slopeR - slopeL);
    // bendingEnergy += c * c;
    // cnt ++;
  }
  // return curSum / cnt;
  return result;
  // return [curSum, bendingEnergy / cnt];
}

export function calculateDifference(line1, line2, diverse) {
  // return Math.abs(line1[0] - line2[0]) < diverse ||  Math.abs(line1[1] - line2[1]) < diverse;
  // if (!line1.length || !line2.length)
  //   return 0;
  let cnt = 0,
    sum = 0,
    pos1 = 0,
    pos2 = 0;
  while (pos1 < line1.length && pos2 < line2.length) {
    if (line1[pos1].x < line2[pos2].x) {
      if (pos2 !== 0) {
        const p2 = mix(line2[pos2 - 1], line2[pos2], line1[pos1].x);
        sum += Math.sqrt(
          Math.pow(p2.x - line1[pos1].x, 2) + Math.pow(p2.y - line1[pos1].y, 2)
        );
        cnt++;
      }
      pos1++;
    } else if (line2[pos2].x < line1[pos1].x) {
      if (pos1 !== 0) {
        const p1 = mix(line1[pos1 - 1], line1[pos1], line2[pos2].x);
        sum += Math.sqrt(
          Math.pow(p1.x - line2[pos2].x, 2) + Math.pow(p1.y - line2[pos2].y, 2)
        );
        cnt++;
      }
      pos2++;
    } else {
      sum += Math.abs(line1[pos1].y - line2[pos2].y);
      cnt++;
      pos1++;
      pos2++;
    }
    if (isNaN(sum)) {
      // console.log(line1[pos1], line2[pos2]);
      return 0.001;
    }
  }

  return cnt === 0 ? 0.0001 : sum / cnt;
  // return sum / cnt;
}

export function brensenham(ls, hashmap, slope) {
  let xx = Math.floor(ls[1].x);
  let yy = Math.floor(ls[1].y);
  let x = Math.floor(ls[0].x);
  let y = Math.floor(ls[0].y);
  if (xx == x) return;
  if (Math.abs(yy - y) > Math.abs(xx - x)) {
    if (yy < y) return brensenhamHigh(xx, yy, x, y, hashmap, slope);
    return brensenhamHigh(x, y, xx, yy, hashmap, slope);
  } else {
    if (xx < x) return brensenhamLow(xx, yy, x, y, hashmap, slope);
    return brensenhamLow(x, y, xx, yy, hashmap, slope);
  }
}

function brensenhamLow(x0, y0, x1, y1, hashmap, slope) {
  let delta = Math.min(1, Math.abs(1 / slope));
  if (!isFinite(delta) || isNaN(delta)) delta = 1;
  let dx = x1 - x0;
  let dy = y1 - y0;
  let yi = dy < 0 ? ((dy = -dy), -1) : 1;
  let D = 2 * dy - dx;
  let first = true;
  for (let x = x0, y = y0; x <= x1; ++x, D += 2 * dy) {
    if (x >= 0 && x < 1000 && y >= 0 && y < 500) {
      if (first) first = false;
      else hashmap[x * 500 + y] += delta;
    }
    if (D > 0) (y += yi), (D -= 2 * dx);
  }
}

function brensenhamHigh(x0, y0, x1, y1, hashmap, slope) {
  let delta = Math.min(1, Math.abs(1 / slope));
  if (!isFinite(delta) || isNaN(delta)) delta = 1;
  let dx = x1 - x0;
  let dy = y1 - y0;
  let xi = dx < 0 ? ((dx = -dx), -1) : 1;
  let D = 2 * dx - dy;
  let first = true;
  for (let x = x0, y = y0; y <= y1; ++y, D += 2 * dx) {
    if (x >= 0 && x < 1000 && y >= 0 && y < 500) {
      if (first) first = false;
      else hashmap[x * 500 + y] += delta;
    }
    if (D > 0) (x += xi), (D -= 2 * dy);
  }
}

export function brensenhamArr(ls, hashmap, lineId, slope) {
  let xx = Math.floor(ls[1].x);
  let yy = Math.floor(ls[1].y);
  let x = Math.floor(ls[0].x);
  let y = Math.floor(ls[0].y);
  if (xx == x) return;
  if (Math.abs(yy - y) > Math.abs(xx - x)) {
    if (yy < y) return brensenhamArrHigh(xx, yy, x, y, hashmap, lineId, slope);
    return brensenhamArrHigh(x, y, xx, yy, hashmap, lineId, slope);
  } else {
    if (xx < x) return brensenhamArrLow(xx, yy, x, y, hashmap, lineId, slope);
    return brensenhamArrLow(x, y, xx, yy, hashmap, lineId, slope);
  }
}

function brensenhamArrLow(x0, y0, x1, y1, hashmap, lineId, slope) {
  let delta = Math.min(1, Math.abs(1 / slope));
  if (!isFinite(delta) || isNaN(delta)) delta = 1;
  let dx = x1 - x0;
  let dy = y1 - y0;
  let yi = dy < 0 ? ((dy = -dy), -1) : 1;
  let D = 2 * dy - dx;
  let first = true;
  for (let x = x0, y = y0; x <= x1; ++x, D += 2 * dy) {
    if (x >= 0 && x < hashmap.length && y >= 0 && y < hashmap[0].length) {
      if (first) first = false;
      else hashmap[x][y][lineId] = (hashmap[x][y][lineId] ?? 0) + delta;
    }
    if (D > 0) (y += yi), (D -= 2 * dx);
  }
}

function brensenhamArrHigh(x0, y0, x1, y1, hashmap, lineId, slope) {
  let delta = Math.min(1, Math.abs(1 / slope));
  if (!isFinite(delta) || isNaN(delta)) delta = 1;
  let dx = x1 - x0;
  let dy = y1 - y0;
  let xi = dx < 0 ? ((dx = -dx), -1) : 1;
  let D = 2 * dx - dy;
  let first = true;
  for (let x = x0, y = y0; y <= y1; ++y, D += 2 * dx) {
    if (x >= 0 && x < hashmap.length && y >= 0 && y < hashmap[0].length) {
      if (first) first = false;
      else hashmap[x][y][lineId] = (hashmap[x][y][lineId] ?? 0) + delta;
    }
    if (D > 0) (x += xi), (D -= 2 * dy);
  }
}

export function getClosestPointOnLines(pXy, aXys) {

 var minDist;
 var fTo;
 var fFrom;
 var x;
 var y;
 var i;
 var dist;

 if (aXys.length > 1) {

     for (var n = 1 ; n < aXys.length ; n++) {

         if (aXys[n].x != aXys[n - 1].x) {
             var a = (aXys[n].y - aXys[n - 1].y) / (aXys[n].x - aXys[n - 1].x);
             var b = aXys[n].y - a * aXys[n].x;
             dist = Math.abs(a * pXy.x + b - pXy.y) / Math.sqrt(a * a + 1);
         }
         else
             dist = Math.abs(pXy.x - aXys[n].x)

         // length^2 of line segment 
         var rl2 = Math.pow(aXys[n].y - aXys[n - 1].y, 2) + Math.pow(aXys[n].x - aXys[n - 1].x, 2);

         // distance^2 of pt to end line segment
         var ln2 = Math.pow(aXys[n].y - pXy.y, 2) + Math.pow(aXys[n].x - pXy.x, 2);

         // distance^2 of pt to begin line segment
         var lnm12 = Math.pow(aXys[n - 1].y - pXy.y, 2) + Math.pow(aXys[n - 1].x - pXy.x, 2);

         // minimum distance^2 of pt to infinite line
         var dist2 = Math.pow(dist, 2);

         // calculated length^2 of line segment
         var calcrl2 = ln2 - dist2 + lnm12 - dist2;

         // redefine minimum distance to line segment (not infinite line) if necessary
         if (calcrl2 > rl2)
             dist = Math.sqrt(Math.min(ln2, lnm12));

         if ((minDist == null) || (minDist > dist)) {
             if (calcrl2 > rl2) {
                 if (lnm12 < ln2) {
                     fTo = 0;//nearer to previous point
                     fFrom = 1;
                 }
                 else {
                     fFrom = 0;//nearer to current point
                     fTo = 1;
                 }
             }
             else {
                 // perpendicular from point intersects line segment
                 fTo = ((Math.sqrt(lnm12 - dist2)) / Math.sqrt(rl2));
                 fFrom = ((Math.sqrt(ln2 - dist2)) / Math.sqrt(rl2));
             }
             minDist = dist;
             i = n;
         }
     }

     var dx = aXys[i - 1].x - aXys[i].x;
     var dy = aXys[i - 1].y - aXys[i].y;

     x = aXys[i - 1].x - (dx * fTo);
     y = aXys[i - 1].y - (dy * fTo);

 }

 return { 'x': x, 'y': y, 'i': i, 'fTo': fTo, 'fFrom': fFrom };
}