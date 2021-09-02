import { intersectionArea, distance, getCenter } from './circleintersection';
import { nelderMead } from 'fmin';

function circleMargin(current, interior, exterior) {
  var margin = interior[0].radius - distance(interior[0], current),
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
  var points = [],
    i;
  for (i = 0; i < interior.length; ++i) {
    var c = interior[i];
    points.push({ x: c.x, y: c.y });
    points.push({ x: c.x + c.radius / 2, y: c.y });
    points.push({ x: c.x - c.radius / 2, y: c.y });
    points.push({ x: c.x, y: c.y + c.radius / 2 });
    points.push({ x: c.x, y: c.y - c.radius / 2 });
  }
  var initial = points[0],
    margin = circleMargin(points[0], interior, exterior);
  for (i = 1; i < points.length; ++i) {
    var m = circleMargin(points[i], interior, exterior);
    if (m >= margin) {
      initial = points[i];
      margin = m;
    }
  }

  // maximize the margin numerically
  var solution = nelderMead(
    function (p) {
      return -1 * circleMargin({ x: p[0], y: p[1] }, interior, exterior);
    },
    [initial.x, initial.y],
    { maxIterations: 500, minErrorDelta: 1e-10 }
  ).x;
  var ret = { x: solution[0], y: solution[1] };

  // check solution, fallback as needed (happens if fully overlapped
  // etc)
  var valid = true;
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
      var areaStats = {};
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
  var ret = {},
    circleids = [];
  for (var circleid in circles) {
    circleids.push(circleid);
    ret[circleid] = [];
  }
  for (var i = 0; i < circleids.length; i++) {
    var a = circles[circleids[i]];
    for (var j = i + 1; j < circleids.length; ++j) {
      var b = circles[circleids[j]],
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
  var ret = {},
    overlapped = getOverlappingCircles(circles);
  for (var i = 0; i < areas.length; ++i) {
    var area = areas[i].sets,
      areaids = {},
      exclude = {};
    for (var j = 0; j < area.length; ++j) {
      areaids[area[j]] = true;
      var overlaps = overlapped[area[j]];
      // keep track of any circles that overlap this area,
      // and don't consider for purposes of computing the text
      // centre
      for (var k = 0; k < overlaps.length; ++k) {
        exclude[overlaps[k]] = true;
      }
    }

    var interior = [],
      exterior = [];
    for (var setid in circles) {
      if (setid in areaids) {
        interior.push(circles[setid]);
      } else if (!(setid in exclude)) {
        exterior.push(circles[setid]);
      }
    }
    var centre = computeTextCentre(interior, exterior);
    ret[area] = centre;
    if (centre.disjoint && areas[i].size > 0) {
      console.log('WARNING: area ' + area + ' not represented on screen');
    }
  }
  return ret;
}

// sorts all areas in the venn diagram, so that
// a particular area is on top (relativeTo) - and
// all other areas are so that the smallest areas are on top
export function sortAreas(div, relativeTo) {
  // figure out sets that are completly overlapped by relativeTo
  var overlaps = getOverlappingCircles(div.selectAll('svg').datum());
  var exclude = {};
  for (var i = 0; i < relativeTo.sets.length; ++i) {
    var check = relativeTo.sets[i];
    for (var setid in overlaps) {
      var overlap = overlaps[setid];
      for (var j = 0; j < overlap.length; ++j) {
        if (overlap[j] == check) {
          exclude[setid] = true;
          break;
        }
      }
    }
  }

  // checks that all sets are in exclude;
  function shouldExclude(sets) {
    for (var i = 0; i < sets.length; ++i) {
      if (!(sets[i] in exclude)) {
        return false;
      }
    }
    return true;
  }

  // need to sort div's so that Z order is correct
  div.selectAll('g').sort(function (a, b) {
    // highest order set intersections first
    if (a.sets.length != b.sets.length) {
      return a.sets.length - b.sets.length;
    }

    if (a == relativeTo) {
      return shouldExclude(b.sets) ? -1 : 1;
    }
    if (b == relativeTo) {
      return shouldExclude(a.sets) ? 1 : -1;
    }

    // finally by size
    return b.size - a.size;
  });
}

export function circlePath(x, y, r) {
  var ret = [];
  ret.push('\nM', x, y);
  ret.push('\nm', -r, 0);
  ret.push('\na', r, r, 0, 1, 0, r * 2, 0);
  ret.push('\na', r, r, 0, 1, 0, -r * 2, 0);
  return ret.join(' ');
}

// inverse of the circlePath function, returns a circle object from an svg path
export function circleFromPath(path) {
  var tokens = path.split(' ');
  return { x: parseFloat(tokens[1]), y: parseFloat(tokens[2]), radius: -parseFloat(tokens[4]) };
}

/** returns a svg path of the intersection area of a bunch of circles */
export function intersectionAreaPath(circles) {
  var stats = {};
  intersectionArea(circles, stats);
  var arcs = stats.arcs;

  if (arcs.length === 0) {
    return 'M 0 0';
  } else if (arcs.length == 1) {
    var circle = arcs[0].circle;
    return circlePath(circle.x, circle.y, circle.radius);
  } else {
    // draw path around arcs
    var ret = ['\nM', arcs[0].p2.x, arcs[0].p2.y];
    for (var i = 0; i < arcs.length; ++i) {
      var arc = arcs[i],
        r = arc.circle.radius,
        wide = arc.width > r;
      ret.push('\nA', r, r, 0, wide ? 1 : 0, 1, arc.p1.x, arc.p1.y);
    }
    return ret.join(' ');
  }
}
