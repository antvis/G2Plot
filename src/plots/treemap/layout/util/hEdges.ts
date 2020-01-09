export class HEdge {
  public next: any;
  public prev: any;
  public twin: any;
  public orig: any;
  public dest: any;
  public iFace: any;
  
  constructor(orig, dest, face) {
    this.next = null;
    this.prev = null;
    this.twin = null;
    this.orig = orig;
    this.dest = dest;
    this.iFace = face;
  }

  public isHorizon() {
    return this.twin !== null && !this.iFace.marked && this.twin.iFace.marked;
  }

  public findHorizon(horizon) {
    if (this.isHorizon()) {
      if (horizon.length > 0 && this === horizon[0]) {
        return;
      } else {
        horizon.push(this);
        this.next.findHorizon(horizon);
      }
    } else {
      if (this.twin !== null) {
        this.twin.next.findHorizon(horizon);
      }
    }
  }

  public isEqual(origin, dest) {
    return (this.orig.equals(origin) && this.dest.equals(dest)) || (this.orig.equals(dest) && this.dest.equals(origin));
  }
}
