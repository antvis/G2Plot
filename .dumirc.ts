import { defineConfig } from 'dumi';
import { repository, version } from './package.json';

export default defineConfig({
  locales: [{ id: 'zh', name: '中文' }, { id: 'en', name: 'English' }],
  themeConfig: {
    title: 'G2Plot',
    description: 'A collection of charts made with the Grammar of Graphics',
    defaultLanguage: 'zh',
    siteUrl: 'https://g2plot.antv.vision',
    isAntVSite: false,
    githubUrl: repository.url,                                          // GitHub 地址
    showSearch: true,                                                   // 是否显示搜索框
    showGithubCorner: true,                                             // 是否显示头部的 GitHub icon
    showGithubStars: true,                                              // 是否显示 GitHub star 数量
    showAntVProductsCard: true,                                         // 是否显示 AntV 产品汇总的卡片
    showLanguageSwitcher: true,                                         // 是否显示官网语言切换
    showWxQrcode: true,                                                 // 是否显示头部菜单的微信公众号
    showChartResize: true,                                              // 是否在 demo 页展示图表视图切换
    showAPIDoc: true,                                                   // 是否在 demo 页展示API文档
    versions: {
      [version]: 'https://g2plot.antv.vision',
      '1.x': 'https://g2plot-v1.antv.vision',
    },
    navs: [
      {
        slug: 'docs/manual',
        title: {
          zh: '教程',
          en: 'Manual',
        },
        order: 2,
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API',
          en: 'API',
        },
        order: 1,
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
        order: 0,
      },
    ],
    ecosystems: [
      {
        name: {
          zh: 'Ant Design Charts（React）',
          en: 'Ant Design Charts (React)',
        },
        url: 'https://charts.ant.design/',
      },
      {
        name: {
          zh: 'G2Plot 可视化圈子（博客文章）',
          en: 'Blog posts of G2Plot',
        },
        url: 'https://www.yuque.com/antv/g2plot',
      },
      {
        name: {
          zh: '图表性能检测工具',
          en: 'Charts performance test',
        },
        url: 'https://git.hust.cc/charts-perf/'
      },
      {
        name: {
          zh: 'AntV ThemeSet（主题构建器）',
          en: 'AntV ThemeSet',
        },
        url: 'https://theme-set.antv.vision',
      },
      {
        name: {
          zh: 'Vis Dashboard（可视化精选集）',
          en: 'Vis Dashboard',
        },
        url: 'https://vis-dashboard.antv.vision',
      },
    ],
    detail: {
      title: {
        zh: 'G2Plot 开箱即用的图表库',
        en: 'G2Plot: a charting library',
      },
      description: {
        zh: 'G2Plot 是开箱即用、易于配置、具有良好视觉和交互体验的通用统计图表库。',
        en: 'G2Plot is an interactive and responsive charting library based on the grammar of graphics.',
      },
      image: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*f_gcSbpq-6kAAAAAAAAAAABkARQnAQ',
      buttons: [
        {
          text: {
            zh: '开始使用',
            en: 'Getting Started',
          },
          link: `/docs/manual/introduction`,
        },
        {
          text: {
            zh: '图表示例',
            en: 'Examples',
          },
          link: `/examples/`,
          type: 'primary',
        },
      ],
    },
    news: [
      {
        type: {
          zh: '论坛',
          en: 'Forum',
        },
        title: {
          zh: 'AntV 芒种日 图新物：GraphInsight 发布',
          en: 'AntV Seeds Day Graph New: GraphInsight Released',
        },
        date: '2022.06.06',
        link: 'https://github.com/antvis/GraphInsight',
      },
      {
        type: {
          zh: '论坛',
          en: 'Forum',
        },
        title: {
          zh: 'SEE Conf 2022 支付宝体验科技大会',
          en: 'SEE Conf 2022 Alipay Experience Technology Conference',
        },
        date: '2022.01.08',
        link: 'https://seeconf.antfin.com/',
      },
    ],
    features: [
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/eae0ee4e-acbf-4486-88eb-ea17f441a0d5.svg',
        title: {
          zh: '开箱即用',
          en: 'Easy to use',
        },
        description: {
          zh: '配置项优化精简，仅需几行代码轻松生成图表',
          en: 'Generating high quality statistical charts through a few lines of code.',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/7269ccc5-fbe2-4e55-85d1-17c05917e8b0.svg',
        title: {
          zh: '默认好用',
          en: 'Default by good',
        },
        description: {
          zh: '即使你是可视化或设计小白，也能制作优雅、标准的统计图表',
          en: 'Even though you are not an expert in data visualization and design, you still can create elegant as well as standard charts as you want by using G2Plot.',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/d77e48ed-4e4c-43f5-bd83-329e12c28c16.svg',
        title: {
          zh: '响应式图表',
          en: 'Responsive plots',
        },
        description: {
          zh: '保证图表在任何显示尺寸、任何数据状态下的可读性',
          en: 'The responsive ability of g2plot guarantee your chart\'s readability in any display space and data status.',
        },
      },
    ],
    cases: [
      {
        logo: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Uh1MSpdcj-kAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '图表实验室',
          en: 'Advanced Features',
        },
        description: {
          zh: '来这里尝试一下我们正在开发中的高级图表功能',
          en: 'We are now working on some advanced and powerful chart features.',
        },
        link: `/examples/plugin/multi-view`,
        image: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*SXLtRaVPGvMAAAAAAAAAAABkARQnAQ',
        isAppLogo: true,
      },
    ],
    /** 首页合作公司 */
    companies: [
      { name: '阿里云', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*V_xMRIvw2iwAAAAAAAAAAABkARQnAQ' },
      { name: '支付宝', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*lYDrRZvcvD4AAAAAAAAAAABkARQnAQ', },
      { name: '天猫', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BQrxRK6oemMAAAAAAAAAAABkARQnAQ', },
      { name: '淘宝网', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*1l8-TqUr7UcAAAAAAAAAAABkARQnAQ', },
      { name: '网上银行', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZAKFQJ5Bz4MAAAAAAAAAAABkARQnAQ', },
      { name: '京东', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*yh-HRr3hCpgAAAAAAAAAAABkARQnAQ', },
      { name: 'yunos', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_js7SaNosUwAAAAAAAAAAABkARQnAQ', },
      { name: '菜鸟', img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TgV-RZDODJIAAAAAAAAAAABkARQnAQ', },
    ],
    // 文档目录的信息
    docs: [
      {
        slug: 'manual/plots',
        title: {
          zh: '图表指引',
          en: 'Plot Guide',
        },
        order: 3,
      },
      {
        slug: 'api/plots',
        title: {
          zh: '基础图表',
          en: 'Plots',
        },
        order: 2,
      },
      {
        slug: 'api/advanced-plots',
        title: {
          zh: '高级图表',
          en: 'Advanced plots',
        },
        order: 3,
      },
      {
        slug: 'api/components',
        title: {
          zh: '图表组件',
          en: 'Components',
        },
        order: 4,
      },
      {
        slug: 'api/options',
        title: {
          zh: '通用配置',
          en: 'Common Configuration',
        },
        order: 5,
      }
    ],
    // 示例分类的信息
    examples: [
      {
        slug: 'case',
        icon: 'gallery',
        title: {
          zh: '场景案例',
          en: 'Show Case',
        },
      },
      {
        slug: 'line',
        icon: 'line', // 图表名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '折线图',
          en: 'Line',
        },
      },
      {
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area',
        },
      },
      {
        slug: 'column',
        icon: 'column',
        title: {
          zh: '柱形图',
          en: 'Column',
        },
      },
      {
        slug: 'bar',
        icon: 'bar',
        title: {
          zh: '条形图',
          en: 'Bar',
        },
      },
      {
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie',
        },
      },
      {
        slug: 'dual-axes',
        icon: 'line',
        title: {
          zh: '双轴图',
          en: 'Dual Axes',
        },
      },
      {
        slug: 'progress-plots',
        icon: 'gauge',
        title: {
          zh: '进度图',
          en: 'Progress Plots',
        },
      },
      {
        slug: 'scatter',
        icon: 'point',
        title: {
          zh: '散点气泡图',
          en: 'Scatter and Bubble',
        },
      },
      {
        slug: 'rose',
        icon: 'rose',
        title: {
          zh: '玫瑰图',
          en: 'Rose',
        },
      },
      {
        slug: 'relation-plots',
        icon: 'sankey',
        title: {
          zh: '关系图',
          en: 'Relation Plots',
        },
      },
      {
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'Heatmap',
        },
      },
      {
        slug: 'tiny',
        icon: 'other',
        title: {
          zh: '迷你图',
          en: 'Tiny Plots',
        },
      },
      {
        slug: 'more-plots',
        icon: 'other',
        title: {
          zh: '更多图表',
          en: 'More Plots',
        },
      },
      {
        slug: 'treemap',
        icon: 'other',
        title: {
          zh: '矩形树图',
          en: 'Treemap',
        },
      },
      // OTHERS
      {
        slug: 'plugin',
        icon: 'other',
        title: {
          zh: '高级图表',
          en: 'Advanced Plots',
        },
      },
      {
        slug: 'dynamic-plots',
        icon: 'other',
        title: {
          zh: '动态交互',
          en: 'Dynamic Plots',
        },
      },
      {
        slug: 'component',
        icon: 'other',
        title: {
          zh: '图表组件',
          en: 'Components',
        },
      },
      {
        slug: 'general',
        icon: 'other',
        title: {
          zh: '通用配置',
          en: 'General Configuration',
        },
      },
    ],
    playground: {
      extraLib: '',
      container: '<div id="container"><div id="container1"></div><div id="container2"></div></div>', // 定义演示的渲染节点，默认 <div id="container" />
      devDependencies: {
        typescript: 'latest',
      },
    },
    docsearchOptions: {
      apiKey: '0d19588d7661a81faa8b75f6ade80321',
      indexName: 'antv_g2plot',
    },
    announcement: {
      zh: '',
      en: ''
    }
  },
  // analytics: {
  //   // Google Analytics code, will be enabled after configuration
  //   ga: 'UA-148148901-2',
  //   // Baidu statistics code, will be enabled after configuration
  //   // baidu: '5a66cxxxxxxxxxx9e13',
  // },
  mfsu: false,
  // tnpm 安装的目录会导致 webpack 缓存快照 OOM，暂时禁用
  chainWebpack(memo) { memo.delete('cache'); return memo },
  links: [
  ],
  scripts: [
  ],
});
