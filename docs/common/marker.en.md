| Properties | Type                         | Default | Description                                                   |
| ---------- | ---------------------------- | ------- | ------------------------------------------------------------- |
| symbol     | _Marker_ \| _MarkerCallback_ | -       | The symbol shape of a legend marker is configured             |
| style      | ShapeAttrs                   | -       | The configuration item of legend item Marker                  |
| spacing    | number                       | -       | The spacing between legend item marker and the following name |

_Marker_ The supported tag types are： _circle | square | line | diamond | triangle | triangle-down | hexagon | bowtie | cross | tick | plus | hyphen_；
_MarkerCallback_ is `(x: number, y: number, r: number) => PathCommand`；

[DEMO](/zh/examples/component/legend#legend-marker-customize) of `Customize legend marker`.