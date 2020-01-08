export const epsilon = 1e-10;

export function epsilonesque(n) {
  return n <= epsilon && n >= -epsilon;
}

export function dot(v0, v1) {
  return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
}

export function linearDependent(v0, v1) {
  return (
    epsilonesque(v0.x * v1.y - v0.y * v1.x) &&
    epsilonesque(v0.y * v1.z - v0.z * v1.y) &&
    epsilonesque(v0.z * v1.x - v0.x * v1.z)
  );
}

export function polygonDirection(polygon) {
  let direction, crossproduct, p0, p1, p2, v0, v1, i;

  p0 = polygon[polygon.length - 2];
  p1 = polygon[polygon.length - 1];
  p2 = polygon[0];
  v0 = vect(p0, p1);
  v1 = vect(p1, p2);
  crossproduct = calculateCrossproduct(v0, v1);

  const sign = Math.sign(crossproduct);

  p0 = p1;
  p1 = p2;
  p2 = polygon[1];
  v0 = v1;
  v1 = vect(p1, p2);
  crossproduct = calculateCrossproduct(v0, v1);

  if (Math.sign(crossproduct) !== sign) {
    return undefined;
  }

  for (i = 2; i < polygon.length - 1; i++) {
    p0 = p1;
    p1 = p2;
    p2 = polygon[i];
    v0 = v1;
    v1 = vect(p1, p2);
    crossproduct = calculateCrossproduct(v0, v1);

    if (Math.sign(crossproduct) !== sign) {
      return undefined;
    }
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
