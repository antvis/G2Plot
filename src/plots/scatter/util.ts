/**
 * 获取四象限默认配置
 * @param {number} xBaseline
 * @param {number} yBaseline
 */
export function getQuadrantDefaultConfig(xBaseline: number, yBaseline: number) {
  // 文本便宜距离
  const textOffset = 10;
  // 四象限默认样式
  const defaultConfig: { [key: string]: any } = {
    regionStyle: [
      {
        position: {
          start: [xBaseline, 'max'],
          end: ['max', yBaseline],
        },
        style: {
          fill: '#d8d0c0',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: ['min', 'max'],
          end: [xBaseline, yBaseline],
        },
        style: {
          fill: '#a3dda1',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: ['min', yBaseline],
          end: [xBaseline, 'min'],
        },
        style: {
          fill: '#d8d0c0',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: [xBaseline, yBaseline],
          end: ['max', 'min'],
        },
        style: {
          fill: '#a3dda1',
          opacity: 0.4,
        },
      },
    ],
    lineStyle: {
      stroke: '#9ba29a',
      lineWidth: 1,
    },
    labelStyle: [
      {
        position: ['max', yBaseline],
        offsetX: -textOffset,
        offsetY: -textOffset,
        style: {
          textAlign: 'right',
          textBaseline: 'bottom',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['min', yBaseline],
        offsetX: textOffset,
        offsetY: -textOffset,
        style: {
          textAlign: 'left',
          textBaseline: 'bottom',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['min', yBaseline],
        offsetX: textOffset,
        offsetY: textOffset,
        style: {
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['max', yBaseline],
        offsetX: -textOffset,
        offsetY: textOffset,
        style: {
          textAlign: 'right',
          textBaseline: 'top',
          fontSize: 14,
          fill: '#ccc',
        },
      },
    ],
  };
  return defaultConfig;
}
