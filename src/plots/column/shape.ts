import { register } from '@antv/g2';

export const reisterShape = () => {
  /**
   * Draw 2.5d column shape.
   */
  const draw25DColumn = (style, context) => {
    return (points) => {
      const { fill = '#2888FF', stroke, fillOpacity = 1, strokeOpacity = 0.2, pitch = 8 } = style;
      const x3 = points[1][0] - points[0][0];
      const x4 = x3 / 2 + points[0][0];
      const { document } = context;
      const g = document.createElement('g', {});

      const left = document.createElement('polygon', {
        style: {
          points: [
            [points[0][0], points[0][1]],
            [x4, points[1][1] + pitch],
            [x4, points[3][1] + pitch],
            [points[3][0], points[3][1]],
          ],
          fill,
          fillOpacity,
          stroke,
          strokeOpacity,
          inset: 30,
        },
      });

      const right = document.createElement('polygon', {
        style: {
          points: [
            [x4, points[1][1] + pitch],
            [points[1][0], points[1][1]],
            [points[2][0], points[2][1]],
            [x4, points[2][1] + pitch],
          ],
          fill,
          fillOpacity,
          stroke,
          strokeOpacity,
        },
      });

      const top = document.createElement('polygon', {
        style: {
          points: [
            [points[0][0], points[0][1]],
            [x4, points[1][1] - pitch],
            [points[1][0], points[1][1]],
            [x4, points[1][1] + pitch],
          ],
          fill,
          fillOpacity: fillOpacity - 0.2,
        },
      });

      g.appendChild(right);
      g.appendChild(left);
      g.appendChild(top);

      return g;
    };
  };
  // @ts-ignore
  register('shape.interval.column25D', draw25DColumn);
};
