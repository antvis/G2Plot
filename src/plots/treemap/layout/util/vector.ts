export class Vector {
  public x: number;
  public y: number;
  public z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public negate() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
  }

  public normalize() {
    const lenght = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if (lenght > 0) {
      this.x /= lenght;
      this.y /= lenght;
      this.z /= lenght;
    }
  }
}
