import { epsilon, dot } from './assist';
import { Plane3D } from './plane3D';
import { ConflictList } from './conflictList';
import { Vector } from './vector';
import { HEdge } from './hEdges';

// IN: Vertices a, b, c
export function Face(a, b, c, orient?) {
  this.conflicts = new ConflictList(true);
  this.verts = [a, b, c];
  this.marked = false;
  const t = a.subtract(b).crossproduct(b.subtract(c));

  this.normal = new Vector(-t.x, -t.y, -t.z);
  this.normal.normalize();
  this.createEdges();
  this.dualPoint = null;

  if (orient != undefined) {
    this.orient(orient);
  }
}

// OUT: Point2D
Face.prototype.getDualPoint = function() {
  if (this.dualPoint == null) {
    const plane3d = new Plane3D(this);
    this.dualPoint = plane3d.getDualPointMappedToPlane();
  }
  return this.dualPoint;
};

Face.prototype.isVisibleFromBelow = function() {
  return this.normal.z < -1.4259414393190911e-9;
};

Face.prototype.createEdges = function() {
  this.edges = [];
  this.edges[0] = new HEdge(this.verts[0], this.verts[1], this);
  this.edges[1] = new HEdge(this.verts[1], this.verts[2], this);
  this.edges[2] = new HEdge(this.verts[2], this.verts[0], this);
  this.edges[0].next = this.edges[1];
  this.edges[0].prev = this.edges[2];
  this.edges[1].next = this.edges[2];
  this.edges[1].prev = this.edges[0];
  this.edges[2].next = this.edges[0];
  this.edges[2].prev = this.edges[1];
};

// IN: vertex orient
Face.prototype.orient = function(orient) {
  if (!(dot(this.normal, orient) < dot(this.normal, this.verts[0]))) {
    const temp = this.verts[1];
    this.verts[1] = this.verts[2];
    this.verts[2] = temp;
    this.normal.negate();
    this.createEdges();
  }
};

// IN: two vertices v0 and v1
Face.prototype.getEdge = function(v0, v1) {
  for (let i = 0; i < 3; i++) {
    if (this.edges[i].isEqual(v0, v1)) {
      return this.edges[i];
    }
  }
  return null;
};

// IN: Face face, vertices v0 and v1
Face.prototype.link = function(face, v0, v1) {
  if (face instanceof Face) {
    const twin = face.getEdge(v0, v1);
    if (twin === null) {
      console.log('ERROR: when linking, twin is null');
    }
    const edge = this.getEdge(v0, v1);
    if (edge === null) {
      console.log('ERROR: when linking, edge is null');
    }
    twin.twin = edge;
    edge.twin = twin;
  } else {
    const twin = face; // face is a hEdge
    const edge = this.getEdge(twin.orig, twin.dest);
    twin.twin = edge;
    edge.twin = twin;
  }
};

// IN: vertex v
Face.prototype.conflict = function(v) {
  return dot(this.normal, v) > dot(this.normal, this.verts[0]) + epsilon;
};

Face.prototype.getHorizon = function() {
  for (let i = 0; i < 3; i++) {
    if (this.edges[i].twin !== null && this.edges[i].twin.isHorizon()) {
      return this.edges[i];
    }
  }
  return null;
};

Face.prototype.removeConflict = function() {
  this.conflicts.removeAll();
};
