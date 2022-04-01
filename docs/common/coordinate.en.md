#### coordinate

<description>**optional** _Transformation[] _</description>

Transformations of coordinate;

Types of _Transformation_ are as follows:

```ts
type Transformation =
  | {
      type: 'reflectX'; // send (x, y) to (-x, y)
    }
  | {
      type: 'reflectY'; // send (x, y) to (x, -y)
    }
  | {
      type: 'transpose'; // send (x, y) to (y, x)
    };
```
