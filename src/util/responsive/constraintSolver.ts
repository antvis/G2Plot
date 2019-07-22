/** 简单的单variable型constraint solver */
import * as _ from '@antv/util';

const CONDITION_TYPE = {
    '==' : (a,b)=>{ return b; },
    '===': (a,b) => { return b; },
    '>': (a,b) => { return b+1; },
    '>=': (a,b) => { return b; },
    '<': (a,b) => { return b-1 },
    '<=': (a,b) => { return b; }
};

interface IConsytaintSolverCfg {
    expression: Function,
    param: any,
    variable: any
}


export default class SimpleConstraintSolver {
    expression: Function;
    param: any;
    localVariableMapper: any;
    variable: string;

    constructor(cfg: IConsytaintSolverCfg){
        _.assign(this, cfg);
        this.localVariableMapper = _.deepMix({},cfg.param);
    }

    public solve(){
        const functionString = this.expression.toString();
        const functionSegments = functionString.split('\n');
        _.each(functionSegments,(s,index)=>{
            if(index!==0 && index !==functionSegments.length-1){
                this._codeStringParser(s);
            }
        });
    }

    /**express内部函数代码块解析 */
    private _codeStringParser(str) {
        const condition = this._conditionParser(str);
        if(condition){
            return this._conditionSolver(condition);
        }else{
            this._variableParser(str);
        }
    }

    private _conditionParser(str) {
        const string = str.replace(/\s/g,'');
        const reg = /^return/;
        const isCondition = reg.test(string);
        if(isCondition){
            const condition = string.split('return')[1];
            return condition.replace(/;/,"");
        }
        return false;
    }

    private _conditionSolver(str){
        const reg = / ==|===|>=|>|<=|< /;
        const mach = str.match(reg);
        if(mach){
            const sign = mach[0];
            const segments = str.split(sign);
            if(segments[0] === this.variable){
                const outcome = this._assignVariable(segments[1]);
                const func = CONDITION_TYPE[sign];
                const variableValue = func(this.localVariableMapper[this.variable],outcome);
                return variableValue;
            }else{
                this._solveInequality(segments);
            }
        }
    }

    private _variableParser(str){
        const strSeg = str.split('=');
        const variable = this._findVariable(strSeg[0]);
        if(variable){
            const value = this._assignVariable(strSeg[1]);
            this.localVariableMapper[variable] = value;
        }
    }

    private _findVariable(str){
        const string = str.replace(/\s/g,'');
        const reg = /^var|const/;
        const newVariable = reg.test(string);
        if(newVariable){
            const variable = string.match(/([^const]|[^var]+)$/)[1];
            if(!this.localVariableMapper.hasOwnProperty(variable)){
               this.localVariableMapper[variable] = null;
               return  variable;
            }
        }else{
            const keys = Object.keys(this.localVariableMapper);
            if(keys.indexOf(string)>=0){
                return string;
            } 
        }
        return false;
    }

    private _assignVariable(str){
        /**对变量求解 */
        const string = str.replace(/;/,""); 
        const keys = Object.keys(this.localVariableMapper);
        const values = Object.values(this.localVariableMapper);
        const func = new Function(...keys,'return '+string);
        const v = func(...values);
        return v;
    }


    private _solveInequality(segments){

    }

}