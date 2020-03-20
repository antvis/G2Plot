import { Line } from '@antv/g2plot';

const { gCanvas } = window;

const container = document.getElementById('container');
const chartsWraper = document.createElement('div');
chartsWraper.style.width = '600px';
chartsWraper.style.height = '600px';
container.appendChild(chartsWraper);

const canvasDiv = document.createElement('div');
canvasDiv.style.width = '600px';
canvasDiv.style.height = '50px';
canvasDiv.style.left = '10px';
canvasDiv.style.top = '10px';
canvasDiv.id = 'aaa';
chartsWraper.appendChild(canvasDiv);

const canvasDiv2 = document.createElement('div');
canvasDiv2.style.width = '600px';
canvasDiv2.style.height = '500px';
canvasDiv2.style.left = '10px';
canvasDiv2.style.top = '80px';
canvasDiv2.id = 'bbb';
chartsWraper.appendChild(canvasDiv2);

const canvas = new gCanvas.Canvas({
  container: 'aaa',
  width: 500,
  height: 50,
});

const sliderWidth = 500;
const sliderHeight = 10;
const padding = 40;
const minSize = 150;
const maxSize = 600;
const tickCount = 9;
const slider = canvas.addGroup();
slider.translate(0, 20);

const sliderBackground = slider.addShape('rect', {
  attrs: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: 'white',
  },
});

const axisLinePath = [
  ['M', padding, sliderHeight],
  ['L', padding, 0],
  ['L', sliderWidth - padding, 0],
  ['L', sliderWidth - padding, sliderHeight],
];

slider.addShape('path', {
  attrs: {
    path: axisLinePath,
    stroke: '#b1b1b1',
    lineWidth: 1,
  },
});

const valueStep = (maxSize - minSize) / tickCount;
const posStep = (sliderWidth - padding) / tickCount;
for (let i = 0; i < tickCount; i++) {
  const text = Math.floor(minSize + i * valueStep);
  const x = padding + i * posStep;
  const y = sliderHeight + 6;
  slider.addShape('text', {
    attrs: {
      text,
      x,
      y,
      fill: 'black',
      fontSize: 12,
      textAlign: 'center',
      textBaseline: 'top',
    },
  });
}

const sliderBar = slider.addShape('circle', {
  attrs: {
    y: 0,
    x: padding,
    r: 6,
    fill: 'grey',
    stroke: 'black',
    lineWidth: 1,
  },
});

const sliderBbox = slider.getBBox();
sliderBackground.attr('x', sliderBbox.minX);
sliderBackground.attr('y', sliderBbox.minY);
sliderBackground.attr('width', sliderBbox.width);
sliderBackground.attr('height', sliderBbox.height);

canvas.draw();

// create plot & add interaction
fetch('../data/income.json')
  .then((res) => res.json())
  .then((data) => {
    const plotData = [];
    for (let i = 0; i < data.length; i += 10) {
      plotData.push(data[i]);
    }
    const linePlot = new Line(canvasDiv2, {
      width: 150,
      height: 150,
      padding: [20, 20, 80, 40],
      data: plotData,
      xField: 'time',
      yField: 'rate',
      xAxis: {
        type: 'dateTime',
        autoRotateLabel: false,
      },
      yAxis: {
        visible: true,
      },
      label: {
        visible: true,
      },
      forceFit: false,
      animation: false,
      responsive: true,
    });

    linePlot.render();
    let onDrag = false;
    sliderBar.on('mousedown', () => {
      onDrag = true;
    });
    sliderBar.on('mouseUp', () => {
      onDrag = false;
    });
    slider.on('mousemove', (e) => {
      if (onDrag) {
        const xPos = Math.max(padding, Math.min(e.x - 0, sliderWidth - 0));
        sliderBar.attr('x', xPos);
        canvas.draw();
        const currentValue = minSize + (maxSize - minSize) * ((xPos - padding) / (maxSize - minSize));
        onSizeUpdate(currentValue, linePlot);
      }
    });
  });

function onSizeUpdate(currentSize, plot) {
  plot.updateConfig({
    width: currentSize,
    height: currentSize,
  });
  plot.render();
}
