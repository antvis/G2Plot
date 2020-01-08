export const epsilon = 1e-10;

export function epsilonesque(n) {
  return n <= epsilon && n >= -epsilon;
}

// IN: vectors or vertices
// OUT: dot product
export function dot(v0, v1) {
  return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
}

// IN: two vertex objects, v0 and v1
// OUT: true if they are linearly dependent, false otherwise
// from https://math.stackexchange.com/questions/1144357/how-can-i-prove-that-two-vectors-in-%E2%84%9D3-are-linearly-independent-iff-their-cro
export function linearDependent(v0, v1) {
  return (
    epsilonesque(v0.x * v1.y - v0.y * v1.x) &&
    epsilonesque(v0.y * v1.z - v0.z * v1.y) &&
    epsilonesque(v0.z * v1.x - v0.x * v1.z)
  );
}

// IN: an array of 2D-points [x,y]
// OUT: true if the set defines a convex polygon (non-intersecting, hole-free, non-concave)
// from https://gist.github.com/annatomka/82715127b74473859054, adapted to [x,y] syntax (instead of {x: ..., y: ...}) and optimizations
export function polygonDirection(polygon) {
  let direction, crossproduct, p0, p1, p2, v0, v1, i;

  //begin: initialization
  p0 = polygon[polygon.length - 2];
  p1 = polygon[polygon.length - 1];
  p2 = polygon[0];
  v0 = vect(p0, p1);
  v1 = vect(p1, p2);
  crossproduct = calculateCrossproduct(v0, v1);
  // console.log(`[[${p0}], [${p1}], [${p2}]] => (${v0}) x (${v1}) = ${crossproduct}`);
  const sign = Math.sign(crossproduct);
  //end: initialization

  p0 = p1; // p0 = polygon[polygon.length - 1];
  p1 = p2; // p1 = polygon[0];
  p2 = polygon[1];
  v0 = v1;
  v1 = vect(p1, p2);
  crossproduct = calculateCrossproduct(v0, v1);
  // console.log(`[[${p0}], [${p1}], [${p2}]] => (${v0}) x (${v1}) = ${crossproduct}`);
  if (Math.sign(crossproduct) !== sign) {
    return undefined;
  } //different signs in cross products means concave polygon

  //iterate on remaining 3 consecutive points
  for (i = 2; i < polygon.length - 1; i++) {
    p0 = p1;
    p1 = p2;
    p2 = polygon[i];
    v0 = v1;
    v1 = vect(p1, p2);
    crossproduct = calculateCrossproduct(v0, v1);
    // console.log(`[[${p0}], [${p1}], [${p2}]] => (${v0}) x (${v1}) = ${crossproduct}`);
    if (Math.sign(crossproduct) !== sign) {
      return undefined;
    } //different signs in cross products means concave polygon
  }

  return sign;
}

function vect(from, to) {
  return [to[0] - from[0], to[1] - from[1]];
}

function calculateCrossproduct(v0, v1) {
  return v0[0] * v1[1] - v0[1] * v1[0];
}

export function extent(values, valueof?) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}
