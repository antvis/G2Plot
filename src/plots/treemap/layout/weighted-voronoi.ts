import { extent as Extent } from './util/assist';
import { hull } from './util/polygon';
import { epsilon, polygonDirection } from './util/assist';
import { Vertex } from './util/vertex';
import { computePowerDiagramIntegrated } from './util/powerDiagram';

export function weightedVoronoi(data) {
  const x = function(d) {
    return d.x;
  };
  const y = function(d) {
    return d.y;
  };
  const weight = function(d) {
    return d.weight;
  };
  let clip = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ];
  let extent = [
    [0, 0],
    [1, 1],
  ];
  let size = [1, 1];

  function _weightedVoronoi(data) {
    const formatedSites = data.map(function(d) {
      return new Vertex(x(d), y(d), null, weight(d), d, false);
    });
    return computePowerDiagramIntegrated(formatedSites, boundingSites(), clip);
  }

  _weightedVoronoi.run = function(data) {
    const formatedSites = data.map(function(d) {
      return new Vertex(x(d), y(d), null, weight(d), d, false);
    });

    return computePowerDiagramIntegrated(formatedSites, boundingSites(), clip);
  };

  _weightedVoronoi.clip = function(_) {
    if (!arguments.length) {
      return clip;
    }

    const xExtent = Extent(
      _.map(function(c) {
        return c[0];
      })
    );
    const yExtent = Extent(
      _.map(function(c) {
        return c[1];
      })
    );
    const direction = polygonDirection(_);
    if (direction === undefined) {
      clip = hull(_);
    } else if (direction === 1) {
      clip = _.reverse();
    } else {
      clip = _;
    }
    extent = [
      [xExtent[0], yExtent[0]],
      [xExtent[1], yExtent[1]],
    ];
    size = [xExtent[1] - xExtent[0], yExtent[1] - yExtent[0]];
    return _weightedVoronoi;
  };

  function boundingSites() {
    const boundingData = [];
    const boundingSites = [];

    const minX = extent[0][0];
    const maxX = extent[1][0];
    const minY = extent[0][1];
    const maxY = extent[1][1];
    const width = maxX - minX;
    const height = maxY - minY;
    const x0 = minX - width;
    const x1 = maxX + width;
    const y0 = minY - height;
    const y1 = maxY + height;

    boundingData[0] = [x0, y0];
    boundingData[1] = [x0, y1];
    boundingData[2] = [x1, y1];
    boundingData[3] = [x1, y0];

    for (let i = 0; i < 4; i++) {
      boundingSites.push(
        new Vertex(
          boundingData[i][0],
          boundingData[i][1],
          null,
          epsilon,
          new Vertex(boundingData[i][0], boundingData[i][1], null, epsilon, null, true),
          true
        )
      );
    }

    return boundingSites;
  }

  return _weightedVoronoi;
}
