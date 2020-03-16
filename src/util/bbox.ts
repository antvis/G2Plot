export interface PointType {
  readonly x: number;
  readonly y: number;
}

export default class BBox {
  readonly x: number;
  readonly y: number;
  readonly height: number;
  readonly width: number;

  static fromBBoxObject(bbox: any) {
    return new BBox(bbox.x, bbox.y, bbox.width, bbox.height);
  }

  static fromRange(minX: number, minY: number, maxX: number, maxY: number) {
    return new BBox(minX, minY, maxX - minX, maxY - minY);
  }

  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    // range
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  public equals(bbox: BBox): boolean {
    return this.x === bbox.x && this.y === bbox.y && this.width === bbox.width && this.height === bbox.height;
  }

  public get minX() {
    return this.x;
  }

  public get maxX() {
    return this.x + this.width;
  }

  public get minY() {
    return this.y;
  }

  public get maxY() {
    return this.y + this.height;
  }

  public get tl() {
    return { x: this.x, y: this.y };
  }

  public get tr() {
    return { x: this.maxX, y: this.y };
  }

  public get bl() {
    return { x: this.x, y: this.maxY };
  }

  public get br() {
    return { x: this.maxX, y: this.maxY };
  }
}
