/*tslint:disable*/
const containerStyle =
  "color:#4d4d4d;font-size:14px;text-align:center;line-height:2;font-family:'-apple-system',BlinkMacSystemFont,'SegoeUI',Roboto,'HelveticaNeue',Helvetica,'PingFangSC','HiraginoSansGB','MicrosoftYaHei',SimSun,'sans-serif';pointer-events:none;";
const nameStyle = 'font-weight:300;white-space: nowrap;text-overflow: ellipsis;';
const valueStyle = 'font-size:32px;font-weight:bold;color:#4D4D4D';

export function getTemplate(name, value, classId, size) {
  const domStyle = `${containerStyle}width:${size}px;`;
  const nameDomStr = name ? `<span class="ring-guide-name" style=${nameStyle}>${name}</span><br/>` : '';
  const valueDomStr = `<span class="ring-guide-value" style=${valueStyle}>${value}</span>`;

  return `<div class="ring-guide-html ${classId}" style=${domStyle}>${nameDomStr}${valueDomStr}</div>`;
}
