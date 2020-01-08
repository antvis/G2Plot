import { polygonLength } from './polygon';
import { epsilon } from './assist';
import { ConvexHull } from './convexHull';
import { polygonClip } from './polygon-clip';

// IN: HEdge edge
function getFacesOfDestVertex(edge) {
  const faces = [];
  let previous = edge;
  const first = edge.dest;
  const site = first.originalObject;
  const neighbours = [];
  do {
    previous = previous.twin.prev;
    const siteOrigin = previous.orig.originalObject;
    if (!siteOrigin.isDummy) {
      neighbours.push(siteOrigin);
    }
    const iFace = previous.iFace;
    if (iFace.isVisibleFromBelow()) {
      faces.push(iFace);
    }
  } while (previous !== edge);
  site.neighbours = neighbours;
  return faces;
}

// IN: Omega = convex bounding polygon
// IN: S = unique set of sites with weights
// OUT: Set of lines making up the voronoi power diagram
export function computePowerDiagramIntegrated(sites, boundingSites, clippingPolygon) {
  const convexHull = new ConvexHull();
  convexHull.clear();
  convexHull.init(boundingSites, sites);

  const facets = convexHull.compute();
  const polygons = [];
  const verticesVisited = [];
  const facetCount = facets.length;

  for (let i = 0; i < facetCount; i++) {
    const facet = facets[i];
    if (facet.isVisibleFromBelow()) {
      for (let e = 0; e < 3; e++) {
        // go through the edges and start to build the polygon by going through the double connected edge list
        const edge = facet.edges[e];
        const destVertex = edge.dest;
        const site = destVertex.originalObject;

        if (!verticesVisited[destVertex.index]) {
          verticesVisited[destVertex.index] = true;
          if (site.isDummy) {
            // Check if this is one of the sites making the bounding polygon
            continue;
          }
          // faces around the vertices which correspond to the polygon corner points
          const faces = getFacesOfDestVertex(edge);
          const protopoly = [];
          let lastX = null;
          let lastY = null;
          let dx = 1;
          let dy = 1;
          for (let j = 0; j < faces.length; j++) {
            const point = faces[j].getDualPoint();
            const x1 = point.x;
            const y1 = point.y;
            if (lastX !== null) {
              dx = lastX - x1;
              dy = lastY - y1;
              if (dx < 0) {
                dx = -dx;
              }
              if (dy < 0) {
                dy = -dy;
              }
            }
            if (dx > epsilon || dy > epsilon) {
              protopoly.push([x1, y1]);
              lastX = x1;
              lastY = y1;
            }
          }

          site.nonClippedPolygon = protopoly.reverse();
          if (!site.isDummy && polygonLength(site.nonClippedPolygon) > 0) {
            const clippedPoly = polygonClip(clippingPolygon, site.nonClippedPolygon);
            site.polygon = clippedPoly;
            clippedPoly.site = site;
            if (clippedPoly.length > 0) {
              polygons.push(clippedPoly);
            }
          }
        }
      }
    }
  }
  return polygons;
}
