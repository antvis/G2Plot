import { mobile } from '../data/mobile';
import { gdp } from '../data/gdp';
import { dice } from '../../src/plots/treemap/layout/dice';
import { slice } from '../../src/plots/treemap/layout/slice';
import { squarify } from '../../src/plots/treemap/layout/squarify';
import { VoronoiIterator } from '../../src/plots/treemap/layout/voronoi-iterator';
import { weightedVoronoi } from '../../src/plots/treemap/layout/weighted-voronoi';
import * as G from '@antv/g';
import { each, clone,hasKey } from '@antv/util';
import { triangulation } from '../../src/plots/treemap/layout/util/polygon';
import { randomPointsInPolygon, randomPointsInCircle } from '../../src/plots/treemap/layout/util/random-position';

const canvasDiv = document.createElement('div');
canvasDiv.style.width = '600px';
canvasDiv.style.height = '400px';
canvasDiv.id = 'test';
document.body.appendChild(canvasDiv);

const containerBBox = {
  x: 0,
  y: 0,
  width: 600,
  height: 400,
};

const canvas = new G.Canvas({
  containerId: 'test',
  width: 600,
  height: 400,
  pixelRatio: 2,
  renderer: 'canvas',
});

const data = processData(mobile);

describe('tree layout', () => {
  it('dice layout', () => {
    const data = mobile[1];
    dice(data, containerBBox.x, containerBBox.y, containerBBox.width, containerBBox.height);
    each(data.children, (d) => {
      canvas.addShape('rect', {
        attrs: {
          x: d.x,
          y: d.y,
          width: d.width,
          height: d.height,
          fill: '#ccc',
          stroke: 'black',
          lineWidth: 1,
        },
      });
    });
    canvas.draw();
  });

  it('slice layout', () => {
    const data = mobile[1];
    slice(data, containerBBox.x, containerBBox.y, containerBBox.width, containerBBox.height);
    each(data.children, (d) => {
      canvas.addShape('rect', {
        attrs: {
          x: d.x,
          y: d.y,
          width: d.width,
          height: d.height,
          fill: '#ccc',
          stroke: 'black',
          lineWidth: 1,
        },
      });
    });
    canvas.draw();
  });
  it('squarify layout', () => {
    const rows = squarify(data, containerBBox.x, containerBBox.y, containerBBox.width, containerBBox.height);
    each(rows, (row) => {
      each(row.children, (c) => {
        const width = c.x1 - c.x0;
        const height = c.y1 - c.y0;
        drawRect(c.x0, c.y0, width, height);
      });
    });
  });

  it('triangulate polygon', () => {
    const points = [
      [100, 10],
      [300, 10],
      [400, 300],
      [10, 300],
    ];
    const vertex = triangulation(points);
    const polygonPath = [];
    each(points, (p, index) => {
      const flag = index === 0 ? 'M' : 'L';
      polygonPath.push([flag, p[0], p[1]]);
    });
    const trianglePath = [];
    for (let i = 0; i < vertex.length; i += 3) {
      const p0 = points[vertex[i]];
      const p1 = points[vertex[i + 1]];
      const p2 = points[vertex[i + 2]];
      trianglePath.push(
        ...[
          ['M', p0[0], p0[1]],
          ['L', p1[0], p1[1]],
          ['L', p2[0], p2[1]],
          ['L', p0[0], p0[1]],
        ]
      );
    }
    canvas.addShape('path', {
      attrs: {
        path: polygonPath,
        fill: '#ccc',
      },
    });
    canvas.addShape('path', {
      attrs: {
        path: trianglePath,
        stroke: 'black',
        lineWidth: 1,
      },
    });
    canvas.draw();
  });

  it('random points in ploygon', () => {
    const polygon = [
      [100, 10],
      [300, 10],
      [400, 300],
      [10, 300],
    ];
    const points = randomPointsInPolygon(polygon, 500);
    const polygonPath = [];
    each(polygon, (p, index) => {
      const flag = index === 0 ? 'M' : 'L';
      polygonPath.push([flag, p[0], p[1]]);
    });
    canvas.addShape('path', {
      attrs: {
        path: polygonPath,
        fill: '#ccc',
      },
    });
    each(points, (p) => {
      canvas.addShape('circle', {
        attrs: {
          x: p[0],
          y: p[1],
          r: 1,
          fill: 'black',
        },
      });
      canvas.draw();
    });
    canvas.draw();
  });

  
  it('weighted voronoi', () => {
    const { x, y, width, height } = containerBBox;
    const { children } = data;
    const clipPolygon = [
      [x, y],
      [x, height],
      [width, height],
      [width, y],
    ];
 
    each(children, (c, index) => {
      c.weight = c.value;
    });
    children.sort((a,b)=>{
      return b.weight - a.weight;
    })
    const randomPoints = randomPointsInPolygon(clipPolygon, children.length);
    //const randomPoints = spiralLayout(600,400, 10,10,children.length);
    each(children, (c, index) => {
      c.x = randomPoints[index][0];
      c.y = randomPoints[index][1];
      //c.weight = c.value / data.value;
    });

    const cells = weightedVoronoi(data.children, clipPolygon);
    each(cells, (c) => {
      const path = [];
      each(c, (p, index) => {
        const flag = index === 0 ? 'M' : 'L';
        path.push([flag, p[0], p[1]]);
      });
      canvas.addShape('path', {
        attrs: {
          path,
          fill: '#ccc',
          stroke: 'black',
          lineWidth: 1,
        },
      });
      canvas.draw();
    });
  });

  it('circle voronoi',()=>{
    const gdpData = processGdpData();
    const { children } = gdpData;
    const { x, y, width, height } = containerBBox;
    const cx = x + width/2;
    const cy = y + height/2;
    const radius = Math.min(width,height)*0.5;
    const clipPolygon =  createCircleClip(cx,cy,radius);
    const randomPoints = randomPointsInPolygon(clipPolygon, children.length);
    // const randomPoints = randomPointsInCircle(cx,cy,radius,children.length);
    each(children, (c, index) => {
      c.x = randomPoints[index][0];
      c.y = randomPoints[index][1];
      c.weight = gdpData.value / c.value;
    });
    const cells = weightedVoronoi(children, clipPolygon);
    each(cells, (c) => {
      const path = [];
      each(c, (p, index) => {
        const flag = index === 0 ? 'M' : 'L';
        path.push([flag, p[0], p[1]]);
      });
      path.push(['Z']);
      canvas.addShape('path', {
        attrs: {
          path,
          fill: '#ccc',
          stroke: 'black',
          lineWidth: 1,
        },
      });
      canvas.draw();
    });
  });

  it.only('recursive voronoi',()=>{
    const gdpData = processGdpData();
    const { children } = gdpData;
    const { x, y, width, height } = containerBBox;
    const cx = x + width/2;
    const cy = y + height/2;
    const radius = Math.min(width,height)*0.5;
    const clipPolygon =  createCircleClip(cx,cy,radius);
    const cells = recursive(gdpData,clipPolygon,0);
    each(cells,(c,index)=>{
      const root = c.site.originalObject.data.originalData;
      recursive(root,c,1);
    });
  });
});

function processData(data) {
  let sumValue = 0;
  each(data, (d) => {
    sumValue += d.value;
  });

  return { name: 'root', value: sumValue, children: data };
}

function drawRect(x, y, width, height) {
  canvas.addShape('rect', {
    attrs: {
      x: x,
      y: y,
      width: width,
      height: height,
      fill: '#ccc',
      stroke: 'black',
      lineWidth: 1,
    },
  });
  canvas.draw();
}


function createCircleClip(cx,cy,radius){
  const step = 50;
  const interval = Math.PI * 2 / step;
  const points = [];
  for(let i = 0; i<step; i++){
    const angle = interval * i;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    points.push([x,y]);
  }
  return points;
}


function processGdpData(){
  const  root:any = {};
  const data = [];
  let sum = 0;
  each(gdp,(d)=>{
    if(d.year === 2016){
      const countries = d.countries;
      const region = d.region_simple;
      const population = d.population;
      if(!hasKey(root,region)){
        root[region] = { name:region, region,value:0,children:[]};
      }
      root[region].value += population;
      sum += population;
      root[region].children.push({name:countries,value: population,region});
    }
  });

  each(root,(r) =>{
    data.push(r);
  });

  return { name:'root', value:sum, children:data };
}

function recursive(root,cliper,iii){
  const colors = {
    "Middle East and Africa": "#596F7E",
    "Americas": "#168B98",
    "Asia": "#ED5B67",
    "Oceania": "#fd8f24",
    "Europe": "#919c4c"
  };
  const { children } = root;
  // const randomPoints = randomPointsInPolygon(cliper,children.length);
  each(children, (c, index) => {
    c.weight =  c.value;
  });
  const shapeType = iii === 0 ? 'circle' : 'polygon';
  const iterator = new VoronoiIterator(clone(children), cliper,'polygon', 600, 400);
  // const cells = weightedVoronoi(children, cliper);
  const cells = iterator.polygons;
  each(cells, (c,index) => {
    const color = colors[c.site.originalObject.data.originalData.region];
    const path = [];
    each(c, (p, index) => {
      const flag = index === 0 ? 'M' : 'L';
      path.push([flag, p[0], p[1]]);
    });
    path.push(['Z']);
    canvas.addShape('path', {
      attrs: {
        path,
        fill: iii === 0 ? color : null,
        stroke: 'white',
        lineWidth: iii === 0 ? 4 : 1
      },
    });
    canvas.draw();
  });

  return cells;
}