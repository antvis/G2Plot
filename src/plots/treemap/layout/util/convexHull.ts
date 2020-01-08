import { dot, linearDependent } from './assist';
import { ConflictList, ConflictListNode } from './conflictList';
import { Vertex } from './Vertex';
import { Face } from './face';

export class ConvexHull {
  public points: any[];
  public facets: any[];
  public created: any[];
  public horizon: any[];
  public visible: any[];
  public current: number;

  constructor() {
    this.points = [];
    this.facets = [];
    this.created = [];
    this.horizon = [];
    this.visible = [];
    this.current = 0;
  }

  public init(boundingSites, sites) {
    this.points = [];
    for (let i = 0; i < sites.length; i++) {
      this.points[i] = new Vertex(sites[i].x, sites[i].y, sites[i].z, null, sites[i], false);
    }
    this.points = this.points.concat(boundingSites);
  }

  public permutate() {
    const pointSize = this.points.length;
    for (let i = pointSize - 1; i > 0; i--) {
      const ra = Math.floor(Math.random() * i);
      const temp = this.points[ra];
      temp.index = i;
      const currentItem = this.points[i];
      currentItem.index = ra;
      this.points.splice(ra, 1, currentItem);
      this.points.splice(i, 1, temp);
    }
  }

  public prep() {
    if (this.points.length <= 3) {
      console.log('ERROR: Less than 4 points');
    }
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].index = i;
    }

    const v0 = this.points[0];
    const v1 = this.points[1];
    let v2 = null;
    let v3 = null;

    for (let i = 2; i < this.points.length; i++) {
      if (!(linearDependent(v0, this.points[i]) && linearDependent(v1, this.points[i]))) {
        v2 = this.points[i];
        v2.index = 2;
        this.points[2].index = i;
        this.points.splice(i, 1, this.points[2]);
        this.points.splice(2, 1, v2);
        break;
      }
    }
    if (v2 === null) {
      console.log('ERROR: v2 is null');
    }

    const f0 = new Face(v0, v1, v2);
    for (let i = 3; i < this.points.length; i++) {
      if (dot(f0.normal, f0.verts[0]) !== dot(f0.normal, this.points[i])) {
        v3 = this.points[i];
        v3.index = 3;
        this.points[3].index = i;
        this.points.splice(i, 1, this.points[3]);
        this.points.splice(3, 1, v3);
        break;
      }
    }
    if (v3 === null) {
      console.log('ERROR: v3 is null');
    }

    f0.orient(v3);
    const f1 = new Face(v0, v2, v3, v1);
    const f2 = new Face(v0, v1, v3, v2);
    const f3 = new Face(v1, v2, v3, v0);
    this.addFacet(f0);
    this.addFacet(f1);
    this.addFacet(f2);
    this.addFacet(f3);
    // Connect facets
    f0.link(f1, v0, v2);
    f0.link(f2, v0, v1);
    f0.link(f3, v1, v2);
    f1.link(f2, v0, v3);
    f1.link(f3, v2, v3);
    f2.link(f3, v3, v1);
    this.current = 4;

    let v;
    for (let i = this.current; i < this.points.length; i++) {
      v = this.points[i];
      if (f0.conflict(v)) {
        this.addConflict(f0, v);
      }
      if (f1.conflict(v)) {
        this.addConflict(f1, v);
      }
      if (f2.conflict(v)) {
        this.addConflict(f2, v);
      }
      if (f3.conflict(v)) {
        this.addConflict(f3, v);
      }
    }
  }

  public addConflicts(old1, old2, fn) {
    const l1 = old1.conflicts.getVertices();
    const l2 = old2.conflicts.getVertices();
    const nCL = [];
    let v1, v2;
    let i, l;
    i = l = 0;
    // Fill the possible new Conflict List
    while (i < l1.length || l < l2.length) {
      if (i < l1.length && l < l2.length) {
        v1 = l1[i];
        v2 = l2[l];
        // If the index is the same, it's the same vertex and only 1 has to be added
        if (v1.index === v2.index) {
          nCL.push(v1);
          i++;
          l++;
        } else if (v1.index > v2.index) {
          nCL.push(v1);
          i++;
        } else {
          nCL.push(v2);
          l++;
        }
      } else if (i < l1.length) {
        nCL.push(l1[i++]);
      } else {
        nCL.push(l2[l++]);
      }
    }
    // Check if the possible conflicts are real conflicts
    for (let i = nCL.length - 1; i >= 0; i--) {
      v1 = nCL[i];
      if (fn.conflict(v1)) this.addConflict(fn, v1);
    }
  }

  public addConflict(face, vert) {
    const e = new ConflictListNode(face, vert);
    face.conflicts.add(e);
    vert.conflicts.add(e);
  }

  public removeConflict(f) {
    f.removeConflict();
    const index = f.index;
    f.index = -1;
    if (index === this.facets.length - 1) {
      this.facets.splice(this.facets.length - 1, 1);
      return;
    }
    if (index >= this.facets.length || index < 0) return;
    const last = this.facets.splice(this.facets.length - 1, 1);
    last[0].index = index;
    this.facets.splice(index, 1, last[0]);
  }

  public addFacet(face) {
    face.index = this.facets.length;
    this.facets.push(face);
  }

  public compute() {
    this.prep();
    while (this.current < this.points.length) {
      const next = this.points[this.current];
      if (next.conflicts.isEmpty()) {
        this.current++;
        continue;
      }
      this.created = [];
      this.horizon = [];
      this.visible = [];
      next.conflicts.fill(this.visible);
      let e;
      for (let jF = 0; jF < this.visible.length; jF++) {
        e = this.visible[jF].getHorizon();
        if (e !== null) {
          e.findHorizon(this.horizon);
          break;
        }
      }
      let last = null,
        first = null;
      for (let hEi = 0; hEi < this.horizon.length; hEi++) {
        const hE = this.horizon[hEi];
        const fn = new Face(next, hE.orig, hE.dest, hE.twin.next.dest);
        fn.conflicts = new ConflictList(true);
        this.addFacet(fn);
        this.created.push(fn);
        this.addConflicts(hE.iFace, hE.twin.iFace, fn);
        fn.link(hE);
        if (last !== null) fn.link(last, next, hE.orig);
        last = fn;
        if (first === null) first = fn;
      }
      if (first !== null && last !== null) {
        last.link(first, next, this.horizon[0].orig);
      }
      if (this.created.length != 0) {
        for (let f = 0; f < this.visible.length; f++) {
          this.removeConflict(this.visible[f]);
        }
        this.current++;
        this.created = [];
      }
    }
    return this.facets;
  }

  public clear() {
    this.points = [];
    this.facets = [];
    this.created = [];
    this.horizon = [];
    this.visible = [];
    this.current = 0;
  }
}
