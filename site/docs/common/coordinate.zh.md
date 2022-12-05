#### coordinate

<description>**optional** _Transformation[] _</description>

坐标转换配置。

__Transformation_ 类型定义如下:

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
