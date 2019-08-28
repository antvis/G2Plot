import { defaultTheme } from '../../theme';

const PIE_ACTIVE_STYLE = (style)=>{
    const opacity = style.opacity || 1;
    return { opacity: opacity* 0.5 };
};

const PIE_DISABLE_STYLE = (style) =>{
    const opacity = style.opacity || 1;
    return { opacity: opacity* 0.5 };
};


defaultTheme.registerPlotTheme('pie',{
    columnStyle:{
        normal:{},
        active: PIE_ACTIVE_STYLE,
        disable: PIE_DISABLE_STYLE,
        selected: { lineWidth: 1, stroke: 'black' }
    }
});