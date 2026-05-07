---
title: Butterfly导航菜单与侧边栏配置
date: 2026-05-07 11:30:00
categories:
  - 博客搭建
tags:
  - Butterfly
  - Hexo
  - CSS
cover: /img/cover1.png
description: 介绍Butterfly主题的导航菜单配置（含下拉子菜单）和侧边栏卡片配置，包括作者信息、公告、最新文章、分类和标签等。
---

## 前言

导航菜单和侧边栏是博客的重要组成部分，合理的配置可以让博客结构清晰、信息丰富。本文将介绍如何配置导航菜单（含下拉子菜单）和侧边栏的各个卡片组件。

<!-- more -->

---

## 一、导航菜单配置

### 1.1 基础菜单

```yaml
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  分类: /categories/ || fas fa-folder-open
  标签: /tags/ || fas fa-tags
  友链: /links/ || fas fa-link
  关于: /about/ || fas fa-heart
```

格式说明：`显示名称: 路径 || FontAwesome图标`

### 1.2 下拉子菜单

支持将多个页面归组为下拉菜单：

```yaml
menu:
  列表||fas fa-list:
    音乐: /music/ || fas fa-music
    电影: /movies/ || fas fa-video
```

格式说明：`分组名称||图标:` 后缩进填写子菜单项。

> **注意**: 下拉菜单的图标使用 `||` 分隔，而不是 `: `。

---

## 二、导航栏 Logo

```yaml
nav:
  logo: /img/logo.jpg
```

将 Logo 图片放置在 `source/img/` 目录下即可。

---

## 三、侧边栏配置

### 3.1 基础设置

```yaml
aside:
  enable: true        # 启用侧边栏
  hide: false          # 是否隐藏
  button: true         # 显示收起/展开按钮
  mobile: true         # 手机端显示
  position: right      # 位置：left 或 right
  display:
    archive: true      # 归档页显示
    tag: true          # 标签页显示
    category: true     # 分类页显示
```

### 3.2 作者信息卡片

```yaml
aside:
  card_author:
    enable: true
    description: 计算机硕士研究生<br>后端开发 & AI应用研发
    button:
      enable: true
      icon: fab fa-github
      text: Follow Me
      link: https://github.com/你的用户名
```

### 3.3 公告卡片

```yaml
aside:
  card_announcement:
    enable: true
    content: 欢迎来到我的个人主页，这里记录我的学习笔记和日常思考。
```

### 3.4 最新文章卡片

```yaml
aside:
  card_recent_post:
    enable: true
    limit: 5           # 显示数量
    sort: date          # 排序方式：date 或 updated
    sort_order:         # 排序顺序
```

### 3.5 分类卡片

```yaml
aside:
  card_categories:
    enable: true
    limit: 8            # 显示数量
    expand: none        # 是否展开：none / false / true
    sort_order:         # 排序顺序
```

### 3.6 标签卡片

```yaml
aside:
  card_tags:
    enable: true
    limit: 40           # 显示数量
    color: true          # 随机颜色
    orderby: random      # 排序方式
    order: 1             # 排序顺序
    sort_order:
```

---

## 四、头像配置

```yaml
# 头像（侧边栏）
avatar:
  img: /img/avatar.jpg
  effect: false          # 是否开启头像特效
```

---

## 五、社交图标

```yaml
# 社交图标
social:
  fab fa-github: https://github.com/你的用户名 || Github || '#24292e'
  fas fa-envelope: mailto:你的邮箱 || Email || '#4a7dbe'
```

格式说明：`FontAwesome图标: 链接 || 提示文字 || 颜色`

---

## 六、文章封面配置

```yaml
# 文章封面
cover:
  index_enable: true     # 首页显示封面
  aside_enable: true     # 侧边栏显示封面
  archives_enable: true  # 归档页显示封面
  position: both         # 封面位置：left / right / both
  default_cover:
    - /img/cover1.png    # 默认封面（随机选择）
    - /img/cover2.png
```

---

## 总结

导航菜单和侧边栏的合理配置可以让博客更加专业和易用。建议根据实际需求选择开启哪些侧边栏卡片，避免信息过载。

---

> **参考资料**:
> - [Butterfly 主题文档 - 侧边栏](https://butterfly.js.org/posts/4aa8abbe/#%E4%BE%A7%E8%BE%B9%E6%A0%8F)
