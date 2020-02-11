interface PointType {
  readonly x: number;
  readonly y: number;
}

export default class BBox {
  readonly x: number;
  readonly y: number;
  readonly height: number;
  readonly width: number;

  readonly minX: number;
  readonly maxX: number;
  readonly minY: number;
  readonly maxY: number;

  readonly tl: PointType;
  readonly tr: PointType;
  readonly bl: PointType;
  readonly br: PointType;

  readonly bottom?: number;
  readonly left?: number;
  readonly right?: number;
  readonly top?: number;

  static fromRange(minX: number, minY: number, maxX: number, maxY: number) {
    return new BBox(minX, minY, maxX - minX, maxY - minY);
  }

  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    // range
    this.height = height;
    this.width = width;
    this.x = this.minX = x;
    this.y = this.minY = y;
    const maxX = (this.maxX = x + width);
    const maxY = (this.maxY = y + height);

    // points
    this.tl = { x, y };
    this.tr = { x: maxX, y };
    this.bl = { x, y: maxY };
    this.br = { x: maxX, y: maxY };

    // TODO
    this.bottom = 0;
    this.left = this.x;
    this.right = 0;
    this.top = this.y;
  }

  equals(bbox: BBox): boolean {
    return this.x === bbox.x && this.y === bbox.y && this.width === bbox.width && this.height === bbox.height;
  }
}
