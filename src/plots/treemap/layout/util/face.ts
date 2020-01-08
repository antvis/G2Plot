import { epsilon, dot } from './assist';
import { Plane3D } from './plane3D';
import { ConflictList } from './conflictList';
import { Vector } from './vector';
import { HEdge } from './hEdges';

export class Face {
  public conflicts: any;
  public verts: any[];
  public edges: any[];
  public marked: boolean;
  public normal: any;
  private dualPoint: any;

  constructor(a, b, c, orient?) {
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

  public getDualPoint() {
    if (this.dualPoint == null) {
      const plane3d = new Plane3D(this);
      this.dualPoint = plane3d.getDualPointMappedToPlane();
    }
    return this.dualPoint;
  }

  public isVisibleFromBelow() {
    return this.normal.z < -1.4259414393190911e-9;
  }

  public createEdges() {
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
  }

  public orient(orient) {
    if (!(dot(this.normal, orient) < dot(this.normal, this.verts[0]))) {
      const temp = this.verts[1];
      this.verts[1] = this.verts[2];
      this.verts[2] = temp;
      this.normal.negate();
      this.createEdges();
    }
  }

  public getEdge(v1, v0) {
    for (let i = 0; i < 3; i++) {
      if (this.edges[i].isEqual(v0, v1)) {
        return this.edges[i];
      }
    }
    return null;
  }

  public link(face, v0?, v1?) {
    if (face instanceof Face) {
      const twin = face.getEdge(v0, v1);
      if (twin === null) {
        return;
      }
      const edge = this.getEdge(v0, v1);
      if (edge === null) {
        return;
      }
      twin.twin = edge;
      edge.twin = twin;
    } else {
      const twin = face;
      const edge = this.getEdge(twin.orig, twin.dest);
      twin.twin = edge;
      edge.twin = twin;
    }
  }

  public conflict(v) {
    return dot(this.normal, v) > dot(this.normal, this.verts[0]) + epsilon;
  }

  public getHorizon() {
    for (let i = 0; i < 3; i++) {
      if (this.edges[i].twin !== null && this.edges[i].twin.isHorizon()) {
        return this.edges[i];
      }
    }
    return null;
  }

  public removeConflict() {
    this.conflicts.removeAll();
  }
}
