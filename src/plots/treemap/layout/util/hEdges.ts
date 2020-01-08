export function HEdge (orig, dest, face) {
    this.next = null;
    this.prev = null;
    this.twin = null;
    this.orig = orig;
    this.dest = dest;
    this.iFace = face;
  }
  
  HEdge.prototype.isHorizon = function() {
    return this.twin !== null && !this.iFace.marked && this.twin.iFace.marked;
  }
  
  // IN: array horizon
  HEdge.prototype.findHorizon = function(horizon) {
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
  
  // IN: vertices origin and dest
  HEdge.prototype.isEqual = function(origin, dest) {
    return ((this.orig.equals(origin) && this.dest.equals(dest)) || (this.orig.equals(dest) && this.dest.equals(origin)));
  }