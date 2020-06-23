/*tslint:disable*/
const containerStyle =
  "color:#4d4d4d;font-size:14px;text-align:center;line-height:2;font-family:'-apple-system',BlinkMacSystemFont,'SegoeUI',Roboto,'HelveticaNeue',Helvetica,'PingFangSC','HiraginoSansGB','MicrosoftYaHei',SimSun,'sans-serif';pointer-events:none;";

const nameStyle = 'font-weight:300;white-space: nowrap;text-overflow: ellipsis;';

const valueStyle = 'font-size:32px;font-weight:bold;color:#4D4D4D';

function getSingleDataTemplate(value, classId, size) {
  const domStyle = `${containerStyle}width:${size}px;`;
  return `<div class="ring-guide-html ${classId}" style=${domStyle}><span class="ring-guide-value" style=${valueStyle}>${value}</span></div>`;
}

function getTwoDataTemplate(name, value, classId, size) {
  const domStyle = `${containerStyle}width:${size}px;`;
  return `<div class="ring-guide-html ${classId}" style=${domStyle}><span class="ring-guide-name" style=${nameStyle}>${name}</span><br/><span class="ring-guide-value" style=${valueStyle}>${value}</span></div>`;
}

export { getSingleDataTemplate, getTwoDataTemplate };
