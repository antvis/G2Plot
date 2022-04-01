/**
 * Transformations of coordinate
 */
export type Transformations = Array<
  | {
      /** send (x, y) to (-x, y) */
      type: 'reflectX';
    }
  | {
      /** send (x, y) to (x, -y) */
      type: 'reflectY';
    }
  | {
      /** send (x, y) to (y, x) */
      type: 'transpose';
    }
>;
