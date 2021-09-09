import { nelderMead } from 'fmin';
import { intersectionArea, distance, getCenter } from './circleintersection';

function circleMargin(current, interior, exterior) {
  let margin = interior[0].radius - distance(interior[0], current),
    i,
    m;
  for (i = 1; i < interior.length; ++i) {
    m = interior[i].radius - distance(interior[i], current);
    if (m <= margin) {
      margin = m;
    }
  }

  for (i = 0; i < exterior.length; ++i) {
    m = distance(exterior[i], current) - exterior[i].radius;
    if (m <= margin) {
      margin = m;
    }
  }
  return margin;
}

// compute the center of some circles by maximizing the margin of
// the center point relative to the circles (interior) after subtracting
// nearby circles (exterior)
export function computeTextCentre(interior, exterior) {
  // get an initial estimate by sampling around the interior circles
  // and taking the point with the biggest margin
  const points = [];
  let i;
  for (i = 0; i < interior.length; ++i) {
    const c = interior[i];
    points.push({ x: c.x, y: c.y });
    points.push({ x: c.x + c.radius / 2, y: c.y });
    points.push({ x: c.x - c.radius / 2, y: c.y });
    points.push({ x: c.x, y: c.y + c.radius / 2 });
    points.push({ x: c.x, y: c.y - c.radius / 2 });
  }
  let initial = points[0],
    margin = circleMargin(points[0], interior, exterior);
  for (i = 1; i < points.length; ++i) {
    const m = circleMargin(points[i], interior, exterior);
    if (m >= margin) {
      initial = points[i];
      margin = m;
    }
  }

  // maximize the margin numerically
  const solution = nelderMead(
    function (p) {
      return -1 * circleMargin({ x: p[0], y: p[1] }, interior, exterior);
    },
    [initial.x, initial.y],
    { maxIterations: 500, minErrorDelta: 1e-10 }
  ).x;
  let ret: any = { x: solution[0], y: solution[1] };

  // check solution, fallback as needed (happens if fully overlapped
  // etc)
  let valid = true;
  for (i = 0; i < interior.length; ++i) {
    if (distance(ret, interior[i]) > interior[i].radius) {
      valid = false;
      break;
    }
  }

  for (i = 0; i < exterior.length; ++i) {
    if (distance(ret, exterior[i]) < exterior[i].radius) {
      valid = false;
      break;
    }
  }

  if (!valid) {
    if (interior.length == 1) {
      ret = { x: interior[0].x, y: interior[0].y };
    } else {
      const areaStats: any = {};
      intersectionArea(interior, areaStats);

      if (areaStats.arcs.length === 0) {
        ret = { x: 0, y: -1000, disjoint: true };
      } else if (areaStats.arcs.length == 1) {
        ret = { x: areaStats.arcs[0].circle.x, y: areaStats.arcs[0].circle.y };
      } else if (exterior.length) {
        // try again without other circles
        ret = computeTextCentre(interior, []);
      } else {
        // take average of all the points in the intersection
        // polygon. this should basically never happen
        // and has some issues:
        // https://github.com/benfred/venn.js/issues/48#issuecomment-146069777
        ret = getCenter(
          areaStats.arcs.map(function (a) {
            return a.p1;
          })
        );
      }
    }
  }

  return ret;
}

// given a dictionary of {setid : circle}, returns
// a dictionary of setid to list of circles that completely overlap it
function getOverlappingCircles(circles) {
  const ret = {},
    circleids = [];
  for (const circleid in circles) {
    circleids.push(circleid);
    ret[circleid] = [];
  }
  for (let i = 0; i < circleids.length; i++) {
    const a = circles[circleids[i]];
    for (let j = i + 1; j < circleids.length; ++j) {
      const b = circles[circleids[j]],
        d = distance(a, b);

      if (d + b.radius <= a.radius + 1e-10) {
        ret[circleids[j]].push(circleids[i]);
      } else if (d + a.radius <= b.radius + 1e-10) {
        ret[circleids[i]].push(circleids[j]);
      }
    }
  }
  return ret;
}

export function computeTextCentres(circles, areas) {
  const ret = {},
    overlapped = getOverlappingCircles(circles);
  for (let i = 0; i < areas.length; ++i) {
    const area = areas[i].sets,
      areaids = {},
      exclude = {};
    for (let j = 0; j < area.length; ++j) {
      areaids[area[j]] = true;
      const overlaps = overlapped[area[j]];
      // keep track of any circles that overlap this area,
      // and don't consider for purposes of computing the text
      // centre
      for (let k = 0; k < overlaps.length; ++k) {
        exclude[overlaps[k]] = true;
      }
    }

    const interior = [],
      exterior = [];
    for (const setid in circles) {
      if (setid in areaids) {
        interior.push(circles[setid]);
      } else if (!(setid in exclude)) {
        exterior.push(circles[setid]);
      }
    }
    const centre = computeTextCentre(interior, exterior);
    ret[area] = centre;
    if (centre.disjoint && areas[i].size > 0) {
      console.log('WARNING: area ' + area + ' not represented on screen');
    }
  }
  return ret;
}

/**
 * 根据圆心(x, y) 半径 r 返回圆的绘制 path
 * @param x 圆心点 x
 * @param y 圆心点 y
 * @param r 圆的半径
 * @returns 圆的 path
 */
export function circlePath(x, y, r) {
  const ret = [];
  // ret.push('\nM', x, y);
  // ret.push('\nm', -r, 0);
  // ret.push('\na', r, r, 0, 1, 0, r * 2, 0);
  // ret.push('\na', r, r, 0, 1, 0, -r * 2, 0);
  const x0 = x - r;
  const y0 = y;
  ret.push('M', x0, y0);
  ret.push('A', r, r, 0, 1, 0, x0 + 2 * r, y0);
  ret.push('A', r, r, 0, 1, 0, x0, y0);

  return ret.join(' ');
}

// inverse of the circlePath function, returns a circle object from an svg path
export function circleFromPath(path) {
  const tokens = path.split(' ');
  return { x: parseFloat(tokens[1]), y: parseFloat(tokens[2]), radius: -parseFloat(tokens[4]) };
}

/** returns a svg path of the intersection area of a bunch of circles */
export function intersectionAreaPath(circles) {
  const stats: any = {};
  intersectionArea(circles, stats);
  const arcs = stats.arcs;

  if (arcs.length === 0) {
    return 'M 0 0';
  } else if (arcs.length == 1) {
    const circle = arcs[0].circle;
    return circlePath(circle.x, circle.y, circle.radius);
  } else {
    // draw path around arcs
    const ret = ['\nM', arcs[0].p2.x, arcs[0].p2.y];
    for (let i = 0; i < arcs.length; ++i) {
      const arc = arcs[i],
        r = arc.circle.radius,
        wide = arc.width > r;
      ret.push('\nA', r, r, 0, wide ? 1 : 0, 1, arc.p1.x, arc.p1.y);
    }
    return ret.join(' ');
  }
}
