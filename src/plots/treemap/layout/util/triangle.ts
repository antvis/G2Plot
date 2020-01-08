import { clone } from '@antv/util';
import { sub2D, crossProduct2D, crossProduct3D, dotProduct2D,angleTo } from '../../../../util/math';

export default class  Triangle {
    public points:number[][];
    public edge: any;
    private reference: any;

    constructor(cfg){
        this.points = cfg.points;
        this.edge = {
            a:[this.points[0],this.points[1]],
            b:[this.points[1],this.points[2]],
            c:[this.points[0],this.points[2]]
        };
        this.reference = {
            a:this.points[2],
            b:this.points[0],
            c:this.points[1]
        };
    }

    public containPoint(p){
        for(let e in this.edge){
            const edge=this.edge[e],
                refer=this.reference[e];
            const edgeV = sub2D( clone(edge[1]),edge[0] ),
                  rv = sub2D( clone(refer),edge[0] ),
                  pv = sub2D( clone(p),edge[0] );
            const c1 = crossProduct2D(clone(pv),edgeV),
                  c2 = crossProduct2D(clone(rv),edgeV);
            const d = dotProduct2D(clone(c1),c2);
            if(d<0) return false;
        }
        return true;
    }

    public calAngle(tip){
        let p1,p2;
    	if(tip==0) { p1=1; p2=2; }
    	if(tip==1) { p1=0; p2=2; }
        if(tip==2) { p1=0; p2=1; }
        const v1 = sub2D(clone(this.points[p1]),this.points[tip]);
        const v2 = sub2D(clone(this.points[p2]),this.points[tip]);
        return angleTo(v1,v2); 
    }

    public isConcave(){
        const v1:any = sub2D(this.points[0],this.points[1]);
        const v2:any = sub2D(this.points[1],this.points[2]);
        v1.z = 0;
        v2.z = 0;

        const cross= crossProduct3D(v1,v2);
        if(cross.z>=0) return true;

        return false;
    };

    


}