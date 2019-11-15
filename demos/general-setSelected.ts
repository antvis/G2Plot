// 设置状态量：selected

const data = [
  {
    year: '1991',
    value: 31,
  },
  {
    year: '1992',
    value: 41,
  },
  {
    year: '1993',
    value: 35,
  },
  {
    year: '1994',
    value: 55,
  },
  {
    year: '1995',
    value: 49,
  },
  {
    year: '1996',
    value: 15,
  },
  {
    year: '1997',
    value: 17,
  },
  {
    year: '1998',
    value: 29,
  },
  {
    year: '1999',
    value: 33,
  },
];

const columnPlot = new g2plot.Column(document.getElementById('canvas'), {
  padding: 'auto',
  data,
  xField: 'year',
  yField: 'value',
});
columnPlot.render();
columnPlot.setSelected(
  { name: 'year', exp: '1994' },
  {
    stroke: 'black',
    lineWidth: 2,
  }
);
/*
        // select多值
        columnPlot.setSelected({
            name:'year',
            exp:(v)=>{
                return v !== '1994';
            }
        },
        {
            stroke: 'black',
            lineWidth: 2
        });
        */

// 作为模块 避免变量冲突
export {};
