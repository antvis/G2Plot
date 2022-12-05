---
title: G2Plot
order: 0
---

全局 G2Plot 对象，在 script 标签引入 g2plot.min.js 文件后获得，或者通过 `import` 或 `require` 进行引用。

### 所有属性

#### setGlobal

<description> _Function_ </description>

```sign
setGlobal(globals: Object): void;
```

设置全局变量。

> 目前支持的全局变量有：
>
> - `locale` 使用的语言，内置 'zh-CN' 和 'en-US'。

**使用示例：**

```ts
// 方式1: 浏览器
<script type="text/javascript" src="https://unpkg.com/@antv/g2plot@latest/dist/g2plot.min.js"></script>
<script>
  const { setGlobal } = G2Plot;
</script>

// 方式2
import { setGlobal } from '@antv/g2plot';

// 设置全局语言
setGlobal({ locale: 'zh-CN' });
```

#### registerLocale

<description> _Function_ </description>

注册语言包。

```sign
registerLocale(locale: string, localeCfg: Object): void;
```

目前内置 'zh-CN' and 'en-US' 两个语言，你也可以使用 `G2Plot.registerLocale` 方法注册新的语言。语言包格式参考：[src/locales/en_US.ts](https://github.com/antvis/G2Plot/blob/master/src/locales/en_US.ts)

#### G2

获取 G2 对象，相当于引入了 G2 的全部能力。借助 G2 对象，我们可以自定义交互、自定义 Shape、自定义主题等。

**使用示例：**

使用 G2 的自定义注册主题机制，进行主题定制。

<Playground path="general/theme/demo/register-theme.ts" rid="register-theme"></playground>