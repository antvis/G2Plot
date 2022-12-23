import React, { useRef, useEffect } from 'react';
import { Plot, Options, G2, TreemapOptions } from '@antv/g2plot';
import { CopyOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { copyToClipboard } from '../utils/copy-to-board';
import './use-g2plot.less';

type CommonOptions = Options | TreemapOptions;
type Props<O extends CommonOptions = CommonOptions> = {
  /** g2plot 图表类型 */
  Ctor: new (dom: HTMLDivElement, options: O) => Plot<O>;
  /** plot title */
  title: string;
  /** g2plot 图表配置 */
  options: Partial<O>;
  /** plot ready 回调 */
  onReady?: (P: Plot<O>) => void;
  className?: string;
  style?: object;
};

export function UseG2Plot<O extends CommonOptions = CommonOptions>({
  className,
  Ctor,
  options,
  style = {},
  title,
  onReady,
}: Props<O>) {
  const container = useRef<HTMLDivElement>();
  const plotRef = useRef<Plot<O>>();

  const listenEvents = () => {
    if (plotRef.current) {
      plotRef.current.on(G2.VIEW_LIFE_CIRCLE.AFTER_RENDER, () => {
        onReady && onReady(plotRef.current);
      });
    }
  };

  useEffect(() => {
    if (plotRef.current) {
      plotRef.current.destroy();
    }
    if (container.current) {
      const plot = new Ctor(container.current, options as O);
      plotRef.current = plot;
      listenEvents();
      plot.render();
    }
  }, [container]);

  useEffect(() => {
    if (plotRef.current) {
      plotRef.current.update(options);
    }
  }, [options]);

  const onCopy = () => {
    if (plotRef.current) {
      copyToClipboard(JSON.stringify(plotRef.current.options));
    }
  };

  return (
    <div className="plot-container" style={{ ...style, height: '300px' }}>
      <div className="plot-title">
        {title}
        <Popover
          content="复制当前图表配置项"
          overlayInnerStyle={{ color: 'rgba(0,0,0,0.65)', fontSize: '12px' }}
          arrowPointAtCenter
        >
          <CopyOutlined id="copy-icon" className="copy-icon" onClick={onCopy} />
        </Popover>
      </div>
      <div
        className={className}
        ref={container}
        style={{ height: 'calc(100% - 28px - 8px)' }}
      />
    </div>
  );
}
