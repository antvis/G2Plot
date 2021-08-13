/**
 * @param canvas
 * @param x和y 呈现的坐标位置
 */
export function getPixelColor(canvas: HTMLCanvasElement, x: number, y: number) {
  const dpr = window.devicePixelRatio || 2;
  const ctx = canvas.getContext('2d');
  // ctx 获取的是实际渲染的图形的位置，所以需要：呈现的坐标位置 * dpr
  const pixel = ctx.getImageData(x * dpr, y * dpr, 1, 1);
  const data = pixel.data; // [r, g, b, a] 暂不处理透明度情况

  // 如果 x, y 超出图像边界，则是透明黑色（全为零，即 rgba(0,0,0,0)）
  // 详见：https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
  const rHex = fixTwoDigit(data[0].toString(16));
  const gHex = fixTwoDigit(data[1].toString(16));
  const bHex = fixTwoDigit(data[2].toString(16));
  const hex = `#${rHex}${gHex}${bHex}`;

  const alpha = data[3] / 255;

  return { hex, alpha };
}

function fixTwoDigit(str) {
  return str.length < 2 ? `0${str}` : `${str}`;
}
