/*tslint:disable*/
const containerStyle =
  "color:#4d4d4d;font-size:14px;text-align:center;line-height:2;font-family:'-apple-system',BlinkMacSystemFont,'SegoeUI',Roboto,'HelveticaNeue',Helvetica,'PingFangSC','HiraginoSansGB','MicrosoftYaHei',SimSun,'sans-serif';pointer-events:none;";
const valueStyle = 'font-size:32px;font-weight:bold;color:#4D4D4D';

export function getTemplate(value, className) {
  const valueDomStr = `<span class="liquid-guide-value" style=${valueStyle}>${value}</span>`;

  return `<div class="liquid-guide-html ${className}" style=${containerStyle}>${valueDomStr}</div>`;
}
