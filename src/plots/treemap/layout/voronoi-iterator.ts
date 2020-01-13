import { centroid, area, contains } from './util/polygon';
import { randomPointsInPolygon, randomPointsInCircle } from './util/random-position';
import { weightedVoronoi } from './weighted-voronoi';

const convergenceRatio = 0.01;
const maxIterationCount = 50;
const minWeightRatio = 0.01;

export class VoronoiIterator {
  public data: any;
  public polygons: any;
  private cliper: number[][];
  private shapeType: string;
  private containerWidth: number;
  private containerHeight: number;
  private iterationCount: number;
  private handleOverweightedVariant: number;
  private handleOverweighted: any;
  private epsilon: number;
  private areaErrorTreshold: number;
  private totalArea: number;
  private ended: boolean;
  private initialPosition: number[][];
  private mapPoints: any;

  constructor(data, cliper, shapeType, containerWidth, containerHeight) {
    this.data = data;
    this.cliper = cliper;
    this.shapeType = shapeType;
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.handleOverweightedVariant = 1;
    this.handleOverweighted = this.setHandleOverweighted();
    this.epsilon = 1;
    this.ended = false;

    this.totalArea = Math.abs(area(cliper));
    this.areaErrorTreshold = convergenceRatio * this.totalArea;
    this.iterationCount = 0;
    this.initialize();
    this.run();
  }

  public run() {
    while (!this.ended || this.iterationCount < maxIterationCount) {
      this.iterate();
    }
  }

  private getInitialPositionByType(type) {
    if (type === 'circle') {
      const cx = this.containerWidth / 2;
      const cy = this.containerHeight / 2;
      const radius = Math.min(this.containerHeight, this.containerWidth) * 0.8;
      return randomPointsInCircle(cx, cy, radius, this.data.length);
    }
    return randomPointsInPolygon(this.cliper, this.data.length);
  }

  private initialize() {
    const initialWeight = halfAverageArea(this.cliper, this.data);
    const initialPosition = this.getInitialPositionByType(this.shapeType);
    this.initialPosition = initialPosition;
    const maxWeight = this.data.reduce(function(max, d) {
        return Math.max(max, d.weight);
      }, -Infinity),
      minAllowedWeight = maxWeight * minWeightRatio;

    //begin: extract weights
    const weights = this.data.map(function(d, i, arr) {
      return {
        index: i,
        weight: Math.max(d.weight, minAllowedWeight),
        initialPosition: initialPosition[i],
        initialWeight: initialWeight,
        originalData: d,
      };
    });
    this.mapPoints = this.createMapPoints(weights);
    this.polygons = weightedVoronoi(this.mapPoints, this.cliper);
  }

  private iterate() {
    const ratio = this.iterationCount / maxIterationCount;
    this.iterationCount++;
    this.polygons = this.adapt(this.polygons, ratio);
    const areaError = this.computeAreaError(this.polygons);
    const converged = areaError < this.areaErrorTreshold;
    this.ended = converged || this.iterationCount >= maxIterationCount;
  }

  private adapt(polygons, ratio) {
    let adaptedMapPoints;
    this.adaptPositions(polygons, ratio);
    adaptedMapPoints = polygons.map(function(p, i) {
      return p.site.originalObject;
    });
    polygons = weightedVoronoi(adaptedMapPoints, this.cliper);
    if (polygons.length < this.data.length) {
      return;
    }
    this.daptWeights(polygons, ratio);
    adaptedMapPoints = polygons.map(function(p, i) {
      return p.site.originalObject;
    });
    polygons = weightedVoronoi(adaptedMapPoints, this.cliper);
    if (polygons.length < this.data.length) {
      return;
    }
    return polygons;
  }

  private adaptPositions(polygons, ratio) {
    const newMapPoints = [],
      flickeringInfluence = 0.5;
    const flickeringMitigation = flickeringInfluence * ratio;
    const d = 1 - flickeringMitigation; // in [0.5, 1]
    for (let i = 0; i < this.data.length; i++) {
      const polygon = polygons[i];
      const mapPoint = polygon.site.originalObject;
      const centr = centroid(polygon);
      let dx = centr[0] - mapPoint.x;
      let dy = centr[1] - mapPoint.y;
      dx *= d;
      dy *= d;
      mapPoint.x += dx;
      mapPoint.y += dy;
      newMapPoints.push(mapPoint);
    }
    this.handleOverweighted1(newMapPoints);
  }

  private setHandleOverweighted() {
    switch (this.handleOverweightedVariant) {
      case 0:
        this.handleOverweighted = this.handleOverweighted0;
        break;
      case 1:
        this.handleOverweighted = this.handleOverweighted1;
        break;
      default:
        console.log("Variant of 'handleOverweighted' is unknown");
    }
  }

  private handleOverweighted0(mapPoints) {
    let fixCount = 0;
    let fixApplied, weightest, lightest;
    do {
      fixApplied = false;
      for (let i = 0; i < this.data.length; i++) {
        const tpi = mapPoints[i];
        for (let j = i + 1; j < this.data.length; j++) {
          const tpj = mapPoints[j];
          if (tpi.weight > tpj.weight) {
            weightest = tpi;
            lightest = tpj;
          } else {
            weightest = tpj;
            lightest = tpi;
          }
          const sqrD = squaredDistance(tpi, tpj);
          if (sqrD < weightest.weight - lightest.weight) {
            let adaptedWeight = sqrD + lightest.weight / 2;
            adaptedWeight = Math.max(adaptedWeight, this.epsilon);
            weightest.weight = adaptedWeight;
            fixApplied = true;
            fixCount++;
            break;
          }
        }
        if (fixApplied) {
          break;
        }
      }
    } while (fixApplied);
  }

  private handleOverweighted1(mapPoints) {
    let fixCount = 0;
    let fixApplied, weightest, lightest;
    do {
      fixApplied = false;
      for (let i = 0; i < this.data.length; i++) {
        const tpi = mapPoints[i];
        for (let j = i + 1; j < this.data.length; j++) {
          const tpj = mapPoints[j];
          if (tpi.weight > tpj.weight) {
            weightest = tpi;
            lightest = tpj;
          } else {
            weightest = tpj;
            lightest = tpi;
          }
          const sqrD = squaredDistance(tpi, tpj);
          if (sqrD < weightest.weight - lightest.weight) {
            const overweight = weightest.weight - lightest.weight - sqrD;
            lightest.weight += overweight + this.epsilon;
            fixApplied = true;
            fixCount++;
            break;
          }
        }
        if (fixApplied) {
          break;
        }
      }
    } while (fixApplied);
  }

  private daptWeights(polygons, ratio) {
    const newMapPoints = [],
      flickeringInfluence = 0.1;
    const flickeringMitigation = flickeringInfluence * ratio;
    for (let i = 0; i < this.data.length; i++) {
      const polygon = polygons[i];
      const mapPoint = polygon.site.originalObject;
      const currentArea = area(polygon);
      let adaptRatio = mapPoint.targetedArea / currentArea;

      adaptRatio = Math.max(adaptRatio, 1 - flickeringInfluence + flickeringMitigation);
      adaptRatio = Math.min(adaptRatio, 1 + flickeringInfluence - flickeringMitigation);

      let adaptedWeight = mapPoint.weight * adaptRatio;
      adaptedWeight = Math.max(adaptedWeight, this.epsilon);

      mapPoint.weight = adaptedWeight;

      newMapPoints.push(mapPoint);
    }

    this.handleOverweighted1(newMapPoints);
  }

  private computeAreaError(polygons) {
    let areaErrorSum = 0;
    for (let i = 0; i < this.data.length; i++) {
      const polygon = polygons[i];
      const mapPoint = polygon.site.originalObject;
      const currentArea = area(polygon);
      areaErrorSum += Math.abs(mapPoint.targetedArea - currentArea);
    }
    return areaErrorSum;
  }

  private createMapPoints(basePoints) {
    const { cliper, totalArea, initialPosition } = this;
    const totalWeight = basePoints.reduce(function(acc, bp) {
      return (acc += bp.weight);
    }, 0);
    let initialPos;

    return basePoints.map(function(bp, i, bps) {
      initialPos = bp.initialPosition;

      if (!contains(cliper, initialPosition)) {
        initialPos = initialPosition[i];
      }

      return {
        index: bp.index,
        targetedArea: (totalArea * bp.weight) / totalWeight,
        data: bp,
        x: initialPosition[i][0],
        y: initialPosition[i][1],
        weight: bp.initialWeight,
      };
    });
  }
}

function halfAverageArea(cliper, data) {
  const num = data.length;
  const totalArea = Math.abs(area(cliper));
  return totalArea / num / 2;
}

function squaredDistance(s0, s1) {
  return sqr(s1.x - s0.x) + sqr(s1.y - s0.y);
}

function sqr(d) {
  return Math.pow(d, 2);
}
