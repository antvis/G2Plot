import * as _ from '@antv/util';

interface StatisticContent {
  name?: string | number;
  value?: string | number;
}

export interface Size {
  width: number;
  height: number;
}

/** 中心文本 配置 */
export interface StatisticConfig {
  /** 是否显示中心文本 */
  visible: boolean;
  position?: 'center';
  /** 中心文本内容，单行 或 多行 */
  content?: string | StatisticContent;
  htmlContent?: (data: StatisticContent) => string;
  /** 是否响应状态量 */
  triggerOn?: 'hover' | 'click';
}

interface Annotation {
  type: string;
  top: boolean;
  position: string[] | number[];
  html: string;
  /** 作为 annotation 的唯一标识 */
  classId: string;
}

const textStyle = 'text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;';
/*tslint:disable*/
const containerStyle = `color:#8c8c8c;font-size:14px;text-align:center;line-height:2;font-family:'-apple-system',BlinkMacSystemFont,'SegoeUI',Roboto,'HelveticaNeue',Helvetica,'PingFangSC','HiraginoSansGB','MicrosoftYaHei',SimSun,'sans-serif';pointer-events:none;white-space:pre-wrap;${textStyle}`;
const nameStyle = `font-weight:300;${textStyle}`;
const valueStyle = `font-size:32px;font-weight:bold;color:#4D4D4D;${textStyle}`;

/**
 * 获取 中心文本 内容
 * 输入: StatisticContent
 * 输出: <div> value </div> (单行) 或 <><div> name </div><div> value </div></> (双行)
 *
 * @param config 中心文本统计量 配置
 * @param classId
 * @param size 中心文本统计量 区域大小
 */
export function getCentralAnnotation(config: StatisticConfig, classId: string, size: Size): Annotation {
  const { content: configContent = {} } = config;
  /** 中心文本内容 */
  const displayData = _.isString(configContent) ? { name: '', value: configContent } : configContent;
  /** 中心文本显示 */
  let htmlString = `<div class="guide-html ${classId}" style="width:${size.width}px;max-height:${size.height}px;${containerStyle}">`;
  if (config.htmlContent) {
    htmlString += config.htmlContent(displayData);
  } else {
    const { name = '', value = '' } = displayData;
    htmlString += `<div class="guide-name" style=${nameStyle}>${name}</div><div class="guide-value" style=${valueStyle}>${value}</span></div>`;
  }
  htmlString += '</div>';
  return {
    type: 'html',
    top: true,
    position: ['50%', '50%'],
    html: htmlString,
    classId,
  };
}
