import {polygonLength} from './polygon';
import {epsilon} from './assist';
import {Vertex} from './vertex';
import {ConvexHull} from './convexHull';
import {polygonClip} from './polygon-clip';

// IN: HEdge edge
function getFacesOfDestVertex(edge) {
  var faces = [];
  var previous = edge;
  var first = edge.dest;
  var site = first.originalObject;
  var neighbours = [];
  do {
    previous = previous.twin.prev;
    var siteOrigin = previous.orig.originalObject;
    if (!siteOrigin.isDummy) {
      neighbours.push(siteOrigin);
    }
    var iFace = previous.iFace;
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
export function computePowerDiagramIntegrated (sites, boundingSites, clippingPolygon) {
  var convexHull = new ConvexHull();
  convexHull.clear();
  convexHull.init(boundingSites, sites);

  var facets = convexHull.compute(sites);
  var polygons = []; 
  var verticesVisited = [];
  var facetCount = facets.length;

  for (var i = 0; i < facetCount; i++) {
    var facet = facets[i];
    if (facet.isVisibleFromBelow()) {
      for (var e = 0; e < 3; e++) {
        // go through the edges and start to build the polygon by going through the double connected edge list
        var edge = facet.edges[e];
        var destVertex = edge.dest;
        var site = destVertex.originalObject; 

        if (!verticesVisited[destVertex.index]) {
          verticesVisited[destVertex.index] = true;
          if (site.isDummy) {
            // Check if this is one of the sites making the bounding polygon
            continue;
          }
          // faces around the vertices which correspond to the polygon corner points
          var faces = getFacesOfDestVertex(edge);
          var protopoly = [];
          var lastX = null;
          var lastY = null;
          var dx = 1;
          var dy = 1;
          for (var j = 0; j < faces.length; j++) {
            var point = faces[j].getDualPoint();
            var x1 = point.x;
            var y1 = point.y;
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
            var clippedPoly = polygonClip(clippingPolygon, site.nonClippedPolygon);
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