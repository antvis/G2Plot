import * as _ from '@antv/util';

/*tslint:disable*/
const container_style =
  "color:#8c8c8c;font-size:14px;text-align:center;line-height:2;font-family:'-apple-system',BlinkMacSystemFont,'SegoeUI',Roboto,'HelveticaNeue',Helvetica,'PingFangSC','HiraginoSansGB','MicrosoftYaHei',SimSun,'sans-serif';";

const name_style = 'font-weight:300;';

const value_style = 'font-size:20px;font-weight:bold;color:#4D4D4D';

function getSingleDataTemplate(value) {
  return `<div class="ring-guide-html" style=${container_style}><span class="ring-guide-value" style=${value_style}>${value}</span></div>`;
}

function getTwoDataTemplate(name, value) {
  return `<div class="ring-guide-html" style=${container_style}><span class="ring-guide-name" style=${name_style}>${name}</span><br/><span class="ring-guide-value" style=${value_style}>${value}</span></div>`;
}

export { getSingleDataTemplate, getTwoDataTemplate };
