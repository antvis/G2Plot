import { Animate } from '@antv/g2';
import * as G from '@antv/g';
import * as _ from '@antv/util';

/**记录之前的状态**/
const preState = {};

/**更新动画 */
function progressUpdate(shape, animateCfg, coord) {
    const path = shape.attr('path');
    let clip;
    let uniform:any = {};
    const index = shape.get('index');
    const { startAngle, endAngle } = getAngle(shape, coord);
    if (preState[shape.id]) {
        const { preStart,preEnd,prePath } = getState(shape);
        const anchor = getAnchor(preStart,startAngle);
        const direction = getDirection(preStart,preEnd,startAngle,endAngle);
        direction === 'antiClockWise' && shape.attr('path',prePath);

        if(anchor === 'start'){
          clip = createClip(coord, startAngle, preEnd);  
          uniform.endAngle = endAngle;
        }else{
          clip = createClip(coord,preStart,endAngle);
          uniform.startAngle = startAngle;
        }

        shape.attr('clip', clip);
        shape.setSilent('animating', true);
        animateCfg.callback = () => {
            if (shape && !shape.get('destroyed')) {
                shape.attr('clip', null);
                shape.setSilent('cacheShape', null);
                shape.setSilent('animating', false);
                clip.remove();
                direction === 'antiClockWise' && shape.attr('path',path);
            }
        };
        /** 执行动画 */
        /** 准备动画参数 */
        let delay = animateCfg.delay;
        if (_.isFunction(delay)) {
            delay = animateCfg.delay(index);
        }
        let easing = animateCfg.easing;
        if (_.isFunction(easing)) {
            easing = animateCfg.easing(index);
        }
        /** 动起来 */
        clip.animate(uniform, animateCfg.duration, easing, animateCfg.callback, delay);
    }
       
    setState(shape,startAngle,endAngle);
}



export function setState(shape,start,end){
    if(!preState[shape.id]) preState[shape.id] = {};
    preState[shape.id].preStart = start;
    preState[shape.id].preEnd = end;
    preState[shape.id].prePath = shape.attr('path');
}

function getState(shape){
    return  preState[shape.id] || null; 
}

/**
 * 获取动画锚点(固定不变的端点)是头部还是尾部
 * 锚点会决定clip的生成和动画
 */
function getAnchor(preStart,startAngle){
    if(preStart === startAngle){
        return 'start';
    }
    return 'end';
}

/**
 * 获取动画方向是顺时针还是逆时针
 * 动画方向决定在shape在动画开始前是否采用前一帧的path
 */

function getDirection(preStart,preEnd,startAngle,endAngle){
    if(preStart < startAngle || preEnd > endAngle){
        return 'antiClockWise';
    }
    return 'clockWise';
}

function createClip(coord, from, to) {
    const margin = 200;
    const center = coord.getCenter();
    const radius = coord.getRadius();
    const clip = new G.Shapes.Fan({
        attrs: {
            x: center.x,
            y: center.y,
            rs: 0,
            re: radius + margin,
            startAngle: from,
            endAngle: to,
        },
    });
    return clip;
}


export function getAngle(shape, coord) {
    const points = shape.points || shape.get('origin').points;
    const box = getPointsBox(points);
    let endAngle;
    let startAngle;
    const coordStartAngle = coord.startAngle;
    const coordEndAngle = coord.endAngle;
    const diffAngle = coordEndAngle - coordStartAngle;

    if (coord.isTransposed) {
        endAngle = box.maxY * diffAngle;
        startAngle = box.minY * diffAngle;
    } else {
        endAngle = box.maxX * diffAngle;
        startAngle = box.minX * diffAngle;
    }
    endAngle += coordStartAngle;
    startAngle += coordStartAngle;
    return {
        startAngle,
        endAngle,
    };
}

function getPointsBox(points: any[]) {
    if (_.isEmpty(points)) {
        return null;
    }

    let minX = points[0].x;
    let maxX = points[0].x;
    let minY = points[0].y;
    let maxY = points[0].y;
    _.each(points, (point) => {
        minX = minX > point.x ? point.x : minX;
        maxX = maxX < point.x ? point.x : maxX;
        minY = minY > point.y ? point.y : minY;
        maxY = maxY < point.y ? point.y : maxY;
    });
    return {
        minX,
        maxX,
        minY,
        maxY,
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
    };
}

Animate.registerAnimation('update', 'groupProgress', progressUpdate);