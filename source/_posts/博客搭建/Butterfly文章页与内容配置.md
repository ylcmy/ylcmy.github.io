---
title: Butterfly文章页与内容配置
date: 2026-05-07 12:00:00
categories:
  - 博客搭建
tags:
  - Butterfly
  - Hexo
  - KaTeX
cover: /img/cover1.png
description: 介绍Butterfly主题的文章页配置，包括代码块样式、文章元信息、目录、相关文章、版权信息、字数统计和访问统计等。
---

## 前言

文章页是博客的核心页面，良好的配置可以提升阅读体验。本文将介绍代码块样式、文章元信息、目录、相关文章、版权信息、字数统计和访问统计等配置。

<!-- more -->

---

## 一、代码块配置

```yaml
# 代码块配置
code_blocks:
  theme: darker          # 主题：darker / pale night / light / ocean / false
  macStyle: true         # Mac 风格（红绿黄按钮）
  height_limit: 300      # 代码块高度限制（px）
  word_wrap: false       # 自动换行
  copy: true             # 复制按钮
  language: true         # 显示语言
  shrink: false          # 是否可收缩
  fullpage: false        # 全屏按钮
```

> **提示**: `macStyle: true` 会让代码块顶部显示 Mac 风格的红绿黄按钮，视觉效果更好。

---

## 二、文章元信息

### 2.1 页面元信息

```yaml
post_meta:
  page:
    date_type: updated    # 显示日期类型：created / updated / both
    date_format: relative # 日期格式：relative（相对时间）/ date（绝对日期）
    categories: true      # 显示分类
    tags: true            # 显示标签
    label: true           # 显示标签
```

### 2.2 文章元信息

```yaml
post_meta:
  post:
    date_type: both       # 同时显示创建和更新时间
    date_format: relative
    categories: true
    tags: true
    label: true
```

---

## 三、文章目录

```yaml
# 目录
toc:
  post: true              # 文章页显示目录
  page: true              # 页面显示目录
  number: false           # 是否显示编号
  expand: false           # 是否展开
  style_simple: false     # 简洁样式
  scroll_percent: true    # 显示滚动百分比
```

---

## 四、相关文章

```yaml
# 相关文章
related_post:
  enable: true
  limit: 6                # 显示数量
  date_type: created      # 日期类型
```

相关文章会自动根据标签和分类推荐相似内容。

---

## 五、文章版权信息

```yaml
# 文章版权
post_copyright:
  enable: true
  decode: true
  author_href:            # 作者链接（留空则使用博客地址）
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/
```

开启后，文章底部会显示版权声明，包括作者、链接、许可证等信息。

---

## 六、数学公式支持（KaTeX）

```yaml
# 数学公式（KaTeX）
katex:
  enable: true
  per_page: true          # 每页加载
  hide_scrollbar: false   # 隐藏滚动条
```

开启后可以在文章中使用 LaTeX 数学公式：

```markdown
行内公式：$E = mc^2$

独立公式：
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$
```

---

## 七、字数统计

```yaml
# 文章字数统计
wordcount:
  enable: true
  post_wordcount: true    # 文章页显示字数
  min2read: true          # 显示预计阅读时间
  total_wordcount: true   # 侧边栏显示全站总字数
```

---

## 八、访问统计

### 8.1 不蒜子统计

```yaml
# 网站访问人数统计
busuanzi:
  site_uv: true           # 站点访客数
  site_pv: true           # 站点访问量
  page_pv: true           # 页面访问量
```

### 8.2 浏览器标签页图标

```yaml
# 浏览器标签页图标
favicon: /img/favicon.jpg
```

---

## 九、返回顶部按钮

```yaml
# 在返回顶部按钮中显示滚动百分比
rightside_scroll_percent: true
```

---

## 总结

文章页的配置直接影响阅读体验。建议开启目录、字数统计和版权信息，这些功能对读者非常友好。KaTeX 数学公式对技术博客尤其重要。

---

> **参考资料**:
> - [Butterfly 主题文档](https://butterfly.js.org/)
> - [KaTeX 文档](https://katex.org/)
