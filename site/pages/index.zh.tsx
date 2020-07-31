import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: 'https://gw.alipayobjects.com/zos/basement_prod/eae0ee4e-acbf-4486-88eb-ea17f441a0d5.svg',
      title: t('开箱即用'),
      description: t('配置项优化精简，仅需几行代码轻松生成图表'),
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/basement_prod/7269ccc5-fbe2-4e55-85d1-17c05917e8b0.svg',
      title: t('默认好用'),
      description: t('即使你是可视化或设计小白，也能制作优雅、标准的统计图表'),
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/basement_prod/d77e48ed-4e4c-43f5-bd83-329e12c28c16.svg',
      title: t('响应式图表'),
      description: t('保证图表在任何显示尺寸、任何数据状态下的可读性'),
    },
  ];

  const bannerButtons = [
    {
      text: t('图表示例'),
      link: `/${i18n.language}/examples/gallery`,
      type: 'primary',
    },
    {
      text: t('开始使用'),
      link: `/${i18n.language}/docs/manual/introduction`,
    },
  ];

  const cases = [
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Uh1MSpdcj-kAAAAAAAAAAABkARQnAQ',
      title: t('图表实验室'),
      description: t('来这里尝试一下我们正在开发中的高级图表功能'),
      link: `/${i18n.language}/examples/advanced/connection`,
      image: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*SXLtRaVPGvMAAAAAAAAAAABkARQnAQ',
      isAppLogo: true,
    },
  ];

  const notifications = [
    {
      type: 'News',
      title: 'G2Plot 2.0 发布了',
      date: '2020.08.18',
      link: 'https://charts.ant.design/',
    },
  ];

  return (
    <>
      <SEO title={t('G2Plot 开箱即用的图表库')} titleSuffix="AntV" lang={i18n.language} />
      <Banner
        coverImage={
          <img
            width="100%"
            style={{ marginLeft: '125px', marginTop: '50px' }}
            src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*f_gcSbpq-6kAAAAAAAAAAABkARQnAQ"
          />
        }
        title={t('G2Plot 开箱即用的图表库')}
        description={t('G2Plot 是开箱即用、易于配置、具有良好视觉和交互体验的通用统计图表库。')}
        className="banner"
        buttons={bannerButtons}
        notifications={notifications}
      />
      <Features features={features} style={{ width: '100%' }} />
      <Cases cases={cases} />
    </>
  );
};

export default IndexPage;
