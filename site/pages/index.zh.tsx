import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
      title: t('开箱即用'),
      description: t(
        '配置项优化精简，仅需几行代码轻松生成图表',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
      title: t('默认好用'),
      description: t(
        '即使你不懂可视化或者设计小白，也能制作优雅、标准的统计图表',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
      title: t('响应式图表'),
      description: t(
        '保证图表在任何显示尺寸、任何数据状态下的可读性',
      ),
    },
  ];

  const notifications = [
    {
      type: t('测试'),
      title: t('G6 3.2 全新上线！'),
      date: '2019.12.04',
      link: '#',
    },
  ];

  const bannerButtons = [
    {
      text: t('图表示例'),
      link: '/zh/examples/general/title-description',
      type: 'primary',
    },
    {
      text: t('下载使用'),
      link: '/zh/docs/manual/getting-started',
    },
  ];

  const cases = [
    {
      logo:
        'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*2Ij9T76DyCcAAAAAAAAAAABkARQnAQ',
      title: t('精品 Gallery'),
      description:
        '真实的数据可视化案例，我们将它们归纳为一个个故事性的设计模板，然用户达到开箱即用的效果。',
      link: 'examples/gallery/line',
      image:
        'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*oCd7Sq3N-QEAAAAAAAAAAABkARQnAQ',
    },
  ];

  return (
    <>
      <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
      <Banner
        coverImage = {
          <img width="100%" class="Notification-module--number--31-3Z" style={{ marginLeft: '125px', marginTop: '50px' }} src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*JWXcTY-VMmYAAAAAAAAAAABkARQnAQ" /> }
        title={t('g2plot 开箱即用的图表库')}
        description={t(
          'g2plot 是开箱即用、易于配置、具有良好视觉和交互体验的通用统计图表库。',
        )}
        buttonText={t('继续了解')}
        buttonHref={'/zh/docs/manual/getting-started'}
        notifications={notifications}
        className='banner'
        githubStarLink="https://ghbtns.com/github-btn.html?user=antvis&repo=g2plot&type=star&count=true&size=large"
        buttons={bannerButtons}
      />
      <Features
        features={features}
        style={{ width: '100%' }}
      />
      <Cases cases={cases} />
    </>
  );
};

export default IndexPage;
