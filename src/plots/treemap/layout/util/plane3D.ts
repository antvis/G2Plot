export class Plane3D {
  public a: number;
  public b: number;
  public c: number;
  public d: number;
  constructor(face) {
    const p1 = face.verts[0];
    const p2 = face.verts[1];
    const p3 = face.verts[2];
    this.a = p1.y * (p2.z - p3.z) + p2.y * (p3.z - p1.z) + p3.y * (p1.z - p2.z);
    this.b = p1.z * (p2.x - p3.x) + p2.z * (p3.x - p1.x) + p3.z * (p1.x - p2.x);
    this.c = p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
    this.d =
      -1 *
      (p1.x * (p2.y * p3.z - p3.y * p2.z) + p2.x * (p3.y * p1.z - p1.y * p3.z) + p3.x * (p1.y * p2.z - p2.y * p1.z));
  }

  public getNormZPlane() {
    return [-1 * (this.a / this.c), -1 * (this.b / this.c), -1 * (this.d / this.c)];
  }

  public getDualPointMappedToPlane() {
    const nplane = this.getNormZPlane();
    const dualPoint = new Point2D(nplane[0] / 2, nplane[1] / 2);
    return dualPoint;
  }
}

export function Point2D(x, y) {
  this.x = x;
  this.y = y;
}
