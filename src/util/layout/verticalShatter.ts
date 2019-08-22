export default function verticalShatter(items, view) {
  items.sort((a, b) => {
    const ay = a.attr('matrix')[7];
    const by = b.attr('matrix')[7];
    return ay - by;
  });
  let overlapping = true;
  const plotRange = view.get('panelRange');
  const startY = plotRange.tl.y;
  const totalHeight = Math.abs(startY - plotRange.bl.y);
  const elementHeight = items[0].getBBox().height;
  let minY = Number.MIN_VALUE;
  let maxY = 0;

  const boxes = items.map((item) => {
    const y = item.attr('matrix')[7];
    if (y > maxY) {
      maxY = y;
    }
    if (y < minY) {
      minY = y;
    }
    return {
      size: item.getBBox().height,
      targets: [y - startY],
    };
  });
  minY -= startY;

  let i = 0;
  while (overlapping) {
    for (const box of boxes) {
      const target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
      box.pos = Math.min(Math.max(minY, target - box.size / 2), totalHeight - box.size);
    }
    overlapping = false;
    i = boxes.length;
    while (i--) {
      if (i > 0) {
        const previous = boxes[i - 1];
        const current = boxes[i];
        if (previous.pos + previous.size > current.pos) {
          // overlapping
          previous.size += current.size;
          previous.targets = previous.targets.concat(current.targets);
          boxes.splice(i, 1);
          overlapping = true;
        }
      }
    } // end of while i
  } // end of while
  // adjust y
  i = 0;
  boxes.forEach((b) => {
    let posInCompositeBox = startY + elementHeight;
    b.targets.forEach(() => {
      const origin_y = items[i].attr('matrix')[7];
      const y = b.pos + posInCompositeBox - elementHeight / 2;
      items[i].translate(0, -origin_y);
      items[i].translate(0, y);
      posInCompositeBox += elementHeight;
      i++;
    });
  });
}
