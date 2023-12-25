import { register } from '@antv/g2';

export const reisterShape = () => {
  /**
   * Draw 2.5d bar shape.
   */
  const draw25DBar = (style, context) => {
    return (points) => {
      const { fill = '#2888FF', stroke, fillOpacity = 1, strokeOpacity = 0.2, pitch = 8 } = style;
      const [p1, p2, p3, p4] = points;
      const height = (p2[1] - p1[1]) / 2;
      const { document } = context;
      const g = document.createElement('g', {});
      const top = document.createElement('polygon', {
        style: {
          points: [p1, [p1[0] - pitch, p1[1] + height], [p3[0] - pitch, p1[1] + height], p4],
          fill,
          fillOpacity,
          stroke,
          strokeOpacity,
          inset: 30,
        },
      });

      const bottom = document.createElement('polygon', {
        style: {
          points: [[p1[0] - pitch, p1[1] + height], p2, p3, [p3[0] - pitch, p1[1] + height]],
          fill,
          fillOpacity,
          stroke,
          strokeOpacity,
        },
      });

      const right = document.createElement('polygon', {
        style: {
          points: [p1, [p1[0] - pitch, p1[1] + height], p2, [p1[0] + pitch, p1[1] + height]],
          fill,
          fillOpacity: fillOpacity - 0.2,
        },
      });

      g.appendChild(top);
      g.appendChild(bottom);
      g.appendChild(right);

      return g;
    };
  };
  // @ts-ignore
  register('shape.interval.bar25D', draw25DBar);
};
