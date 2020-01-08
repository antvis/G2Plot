export class ConflictList {
  public forFace: boolean;
  public head: any;
  constructor(forFace) {
    this.forFace = forFace;
    this.head = null;
  }

  public add(cln) {
    // conflict node
    if (this.head === null) {
      this.head = cln;
    } else {
      if (this.forFace) {
        this.head.prevv = cln;
        cln.nextv = this.head;
        this.head = cln;
      } else {
        this.head.prevf = cln;
        cln.nextf = this.head;
        this.head = cln;
      }
    }
  }

  public isEmpty() {
    return this.head === null;
  }

  public fill(visible) {
    if (this.forFace) {
      return;
    }
    let curr = this.head;
    while (curr !== null) {
      visible.push(curr.face);
      curr.face.marked = true;
      curr = curr.nextf;
    }
  }

  public removeAll() {
    if (this.forFace) {
      let curr = this.head;
      do {
        if (curr.prevf === null) {
          if (curr.nextf === null) {
            curr.vert.conflicts.head = null;
          } else {
            curr.nextf.prevf = null;
            curr.vert.conflicts.head = curr.nextf;
          }
        } else {
          if (curr.nextf != null) {
            curr.nextf.prevf = curr.prevf;
          }
          curr.prevf.nextf = curr.nextf;
        }
        curr = curr.nextv;
        if (curr != null) {
          curr.prevv = null;
        }
      } while (curr != null);
    } else {
      let curr = this.head;
      do {
        if (curr.prevv == null) {
          if (curr.nextv == null) {
            curr.face.conflicts.head = null;
          } else {
            curr.nextv.prevv = null;
            curr.face.conflicts.head = curr.nextv;
          }
        } else {
          if (curr.nextv != null) {
            curr.nextv.prevv = curr.prevv;
          }
          curr.prevv.nextv = curr.nextv;
        }
        curr = curr.nextf;
        if (curr != null) curr.prevf = null;
      } while (curr != null);
    }
  }

  public getVertices() {
    const list = [];
    let curr = this.head;
    while (curr !== null) {
      list.push(curr.vert);
      curr = curr.nextv;
    }
    return list;
  }
}

export function ConflictListNode(face, vert) {
  this.face = face;
  this.vert = vert;
  this.nextf = null;
  this.prevf = null;
  this.nextv = null;
  this.prevv = null;
}
