import { ext } from '@antv/matrix-util';
import { registerInteraction } from '@antv/g2';

/*
 * points:
 *   3  2
 *   0  1
 */
registerInteraction('treemap-element-zoom', {
  start: [
    {
      trigger: 'element:click',
      // action: ['scale-translate:start', 'scale-translate:translate'],
      action: (context) => {
        const { event, view } = context;
        const { data } = event;
        const elementCenterPoint = {
          x: (data.x[2] + data.x[3]) / 2,
          y: (data.y[2] + data.y[1]) / 2,
        };

        const coord = context.view.getCoordinate();

        const coordCenterPoint = coord.getCenter();

        const matrix = ext.transform(coord.matrix, [
          ['t', coordCenterPoint.x - elementCenterPoint.x, coordCenterPoint.y - elementCenterPoint.y],
        ]);

        view.backgroundGroup.setMatrix(matrix);
        view.foregroundGroup.setMatrix(matrix);
        view.middleGroup.setMatrix(matrix);
      },
    },
  ],
});
