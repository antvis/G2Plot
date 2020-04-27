const lineMarker = (x: number, y: number, r: number) => {
  return [
    ['M', x - r, y],
    ['L', x + r, y],
  ];
};

export default {
  line: lineMarker,
};
