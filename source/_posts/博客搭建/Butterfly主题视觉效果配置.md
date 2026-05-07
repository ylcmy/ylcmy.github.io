---
title: Butterfly主题视觉效果配置
date: 2026-05-07 11:00:00
categories:
  - 博客搭建
tags:
  - Butterfly
  - CSS
  - Hexo
cover: /img/cover1.png
description: 介绍Butterfly主题的视觉效果配置，包括加载动画、进入动画、暗色模式、字体美化、首页打字效果、激活能量模式等。
---

## 前言

Butterfly 主题提供了丰富的视觉效果配置，可以让博客更加生动有趣。本文将介绍如何配置加载动画、进入动画、暗色模式、字体美化、首页打字效果和激活能量模式等功能。

<!-- more -->

---

## 一、加载动画

加载动画会在页面加载时显示，提升用户体验。

```yaml
# 加载动画
preloader:
  enable: true
  source: 1  # 1=全屏动画, 2=进度条
```

- `source: 1` - 全屏动画效果
- `source: 2` - 进度条效果

> **注意**: 加载动画会略微增加页面加载时间，如果追求极致速度可以关闭。

---

## 二、进入动画

页面元素进入时的动画效果，让页面切换更加流畅。

```yaml
# 进入动画
enter_transitions:
  enable: true
```

开启后，页面元素会在加载完成后以动画形式依次出现。

---

## 三、暗色模式

支持用户手动切换暗色/亮色模式。

```yaml
# 暗色模式
darkmode:
  enable: true
  button: true        # 显示切换按钮
  autoChangeMode: false # 是否跟随系统自动切换
```

- `button: true` - 在侧边栏显示切换按钮
- `autoChangeMode: false` - 不跟随系统，用户手动切换

> **注意**: 开启暗色模式后，自定义样式需要适配暗色主题，使用 `[data-theme="dark"]` 选择器。

---

## 四、字体美化

### 4.1 全局字体配置

```yaml
# 字体美化
font:
  global_font_size: 16px
  code_font_size: 14px
  font_family: '"LXGW WenKai", "Noto Sans SC", sans-serif'
  code_font_family: '"Fira Code", "JetBrains Mono", monospace'
```

### 4.2 博客标题字体

```yaml
# 博客标题字体
blog_title_font:
  font_link: https://fonts.googleapis.com/css2?family=LXGW+WenKai&display=swap
  font_family: '"LXGW WenKai", cursive'
```

### 4.3 自定义 CSS 引入字体

在 `_config.butterfly.yml` 的 `inject.head` 中引入字体：

```yaml
inject:
  head:
    - <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css">
```

> **提示**: 霞鹜文楷（LXGW WenKai）是一款开源中文字体，非常适合博客阅读。

---

## 五、首页副标题打字效果

在首页显示动态打字效果的副标题，支持接入第三方 API。

```yaml
# 首页副标题打字效果
subtitle:
  enable: true
  effect: true    # 开启打字机动画
  source: 1       # 1=一言 (hitokoto.cn)
```

可选的 `source` 值：
- `1` - 一言 (hitokoto.cn)
- `2` - 一言 (aa1.cn)
- `3` - 今日诗词 (jinrishici.com)

---

## 六、激活能量模式（Activate Power Mode）

打字时触发粒子发光和抖动特效，非常炫酷。

```yaml
activate_power_mode:
  enable: true
  colorful: true   # 开启粒子动画（发光特效）
  shake: true      # 开启 shake（抖动特效）
  mobile: false    # 手机端关闭（性能考虑）
```

> **注意**: 此特效在手机端默认关闭，避免影响性能。

---

## 七、文章美化

为文章标题添加图标前缀，提升视觉效果。

```yaml
# 美化页面
beautify:
  enable: true
  field: post
  title-prefix-icon: '\f0c1'
  title-prefix-icon-color: "#F47466"
```

- `field: post` - 仅在文章页生效
- `title-prefix-icon` - FontAwesome 图标的 Unicode 值
- `title-prefix-icon-color` - 图标颜色

---

## 八、图片相关配置

### 8.1 图片懒加载

```yaml
# 图片懒加载
lazyload:
  enable: true
  native: false    # true=浏览器原生懒加载, false=vanilla-lazyload
  field: site      # site=全站, post=仅文章页
  placeholder:     # 加载占位图（留空则显示模糊缩略图）
  blur: false      # true=模糊过渡效果
```

### 8.2 图片放大查看（灯箱效果）

```yaml
# 图片放大查看
lightbox: fancybox  # fancybox: 功能丰富 | medium_zoom: 轻量级
```

- `fancybox` - 功能丰富，支持缩放、幻灯片
- `medium_zoom` - 轻量级，简洁放大

---

## 总结

通过以上配置，可以让博客在视觉效果上更加出色。建议根据个人喜好逐步开启各项功能，避免一次性开启过多影响性能。

---

> **参考资料**:
> - [Butterfly 主题文档](https://butterfly.js.org/)
> - [一言 API](https://hitokoto.cn/)
