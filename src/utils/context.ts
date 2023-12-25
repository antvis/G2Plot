let ctx: CanvasRenderingContext2D;

/**
 * 获取 canvas context
 */
export const getCanvasContext = () => {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d');
  }

  return ctx;
};
