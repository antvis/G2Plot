import * as G from '@antv/g';
import { Line } from '../../src';
import { income } from '../data/income';


describe('responsive-slider', () => {

    it('responsive', () => {

        const canvasDiv = document.createElement('div');
        canvasDiv.style.width = '600px';
        canvasDiv.style.height = '50px';
        canvasDiv.style.left = '30px';
        canvasDiv.style.top = '30px';
        canvasDiv.id = 'canvas1';
        document.body.appendChild(canvasDiv);

        const canvasDiv2 = document.createElement('div');
        canvasDiv2.style.width = '600px';
        canvasDiv2.style.height = '500px';
        canvasDiv2.style.left = '30px';
        canvasDiv2.style.top = '120px';
        canvasDiv2.id = 'canvas2';
        document.body.appendChild(canvasDiv2);

        const canvas = new G.Canvas({
            containerId: 'canvas1',
            width: 600,
            height: 50
        });

        /** create plot */
        const plotData = [];
        for (let i = 0; i < income.length; i += 10) {
            plotData.push(income[i]);
        }
        const linePlot = new Line(canvasDiv, {
            width: 500,
            height: 500,
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
            tooltip: {
                visible: false,
            },
            label: {
                visible: false
            },
            forceFit: false,
            animation: false,
            responsive: true,
        });

        linePlot.render();


        /* create slider bar */
        const sliderWidth = 500;
        const sliderHeight = 10;
        const padding = 40;
        const minSize = 150;
        const maxSize = 600;
        const tickCount = 9;
        const slider = canvas.addGroup();
        slider.translate(0, 20);

        // axis line
        const axisLinePath = [
            ['M', padding, sliderHeight],
            ['L', padding, 0],
            ['L', sliderWidth - padding, 0],
            ['L', sliderWidth - padding, sliderHeight]
        ];

        slider.addShape('path', {
            attrs: {
                path: axisLinePath,
                stroke: '#b1b1b1',
                lineWidth: 1
            }
        });

        // slider labels
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
                    textBaseline: 'top'
                }
            });
        }

        // scroll bar
        const sliderBar = slider.addShape('circle', {
            attrs: {
                y: 0,
                x: sliderWidth - padding,
                r: 6,
                fill: 'grey',
                stroke: 'black',
                lineWidth: 1
            }
        });

        // add interaction
        let currentValue = 0;
        sliderBar.on('drag', (e) => {
            const xPos = Math.max(padding, Math.min(e.clientX - padding, sliderWidth - padding));
            sliderBar.attr('x', xPos);
            canvas.draw();
            currentValue = minSize + (maxSize - minSize) * ((xPos - padding) / (maxSize - minSize));
            onSizeUpdate(currentValue);
        });

        canvas.draw();

        function onSizeUpdate(currentSize) {
            linePlot.updateConfig({
                width: currentValue,
                height: currentValue
            });
        }

    });

});