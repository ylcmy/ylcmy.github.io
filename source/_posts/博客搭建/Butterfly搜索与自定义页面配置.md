---
title: Butterfly搜索与自定义页面配置
date: 2026-05-07 13:00:00
categories:
  - 博客搭建
tags:
  - Butterfly
  - Hexo
  - CSS
cover: /img/cover2.png
description: 介绍Butterfly主题的搜索功能配置，以及如何创建音乐、电影、友链等自定义页面，包括页面样式和暗色模式适配。
---

## 前言

除了常规的文章页面，博客还可以添加搜索功能和自定义页面来丰富内容。本文将介绍如何配置搜索功能，以及如何创建音乐、电影、友链等自定义页面。

<!-- more -->

---

## 一、搜索功能配置

### 1.1 安装搜索插件

首先需要安装 `hexo-generator-search` 插件来生成搜索索引文件：

```bash
npm install hexo-generator-search --save
```

### 1.2 Butterfly 主题配置

在 `_config.butterfly.yml` 中配置搜索功能：

```yaml
# 搜索
search:
  use: local_search      # 指定搜索引擎：local_search / algolia_search
  placeholder: 搜索文章...  # 搜索框提示文字
  local_search:
    preload: true          # 页面加载时预加载搜索数据
    top_n_per_article: 1   # 每篇文章显示的搜索结果数量
    unescape: false        # 是否转义 HTML
```

**注意**：必须使用 `use` 字段指定搜索引擎，否则搜索图标不会显示。

### 1.3 Hexo 配置

在根目录 `_config.yml` 中配置搜索数据生成：

```yaml
# Search
search:
  path: search.xml
  field: post
  content: true
  format: html
```

- `field: post` - 只搜索文章内容
- `content: true` - 搜索文章正文

### 1.4 本地搜索 vs Algolia

| 特性 | 本地搜索 (local_search) | Algolia |
|------|------------------------|---------|
| **工作原理** | 浏览器加载XML索引，前端匹配 | 云端服务器处理搜索请求 |
| **是否需要服务器** | 否，纯前端 | 是，需要Algolia账号 |
| **费用** | 免费 | 免费额度有限（10k搜索/月） |
| **搜索速度** | 首次加载后快 | 始终快（CDN加速） |
| **搜索质量** | 基础匹配 | 支持模糊、纠错、同义词 |
| **中文分词** | 较弱 | 支持（需配置） |
| **数据隐私** | 数据在本地 | 数据上传到Algolia |
| **配置复杂度** | 简单 | 需要注册、配置、同步 |
| **适用场景** | 个人博客、小站 | 大型文档站、商业网站 |

对于个人博客，推荐使用本地搜索，免费且配置简单。

---

## 二、自定义页面概述

Butterfly 支持创建自定义页面，如音乐、电影、友链等。需要：

1. 创建页面目录和 `index.md`
2. 在导航菜单中添加链接
3. 编写页面内容和样式

---

## 三、音乐页面

### 3.1 创建页面

```bash
hexo new page music
```

编辑 `source/music/index.md`：

```markdown
---
title: 音乐
type: "music"
date: 2026-05-07 00:00:00
---

## 我的音乐

<div class="music-page">
  <p>在这里分享我喜欢的音乐，放松心情，享受旋律。</p>
</div>

## 推荐歌单

### 学习编程时听的音乐

<div class="music-card">
  <h3>Lo-Fi Hip Hop</h3>
  <p>适合编程时聆听的轻松节拍</p>
  <a href="https://music.163.com/" target="_blank">前往收听</a>
</div>
```

### 3.2 页面样式

在 `source/css/custom.css` 中添加：

```css
/* 音乐页面样式 */
.music-page {
  text-align: center;
  margin-bottom: 30px;
}

.music-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.music-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
}
```

---

## 四、电影页面

### 4.1 创建页面

```bash
hexo new page movies
```

编辑 `source/movies/index.md`：

```markdown
---
title: 电影
type: "movies"
date: 2026-05-07 00:00:00
---

## 我的观影记录

<div class="movies-page">
  <p>记录看过的电影和剧集，分享观影感受。</p>
</div>

## 最近观看

### 科幻/技术类

<div class="movie-card">
  <div class="movie-info">
    <h3>星际穿越</h3>
    <p class="movie-meta">2014 | 科幻 | 评分：9.4</p>
    <p class="movie-desc">关于时间、空间和人类情感的史诗级科幻巨作。</p>
  </div>
</div>
```

### 4.2 页面样式

```css
/* 电影页面样式 */
.movie-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  border-left: 4px solid #e74c3c;
  transition: all 0.3s ease;
}

.movie-card:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}
```

---

## 五、友链页面

### 5.1 创建页面

```bash
hexo new page links
```

编辑 `source/links/index.md`：

```markdown
---
title: 友链
type: "links"
date: 2026-05-07 00:00:00
---

## 友情链接

<div class="flink-desc">欢迎交换友链，一起学习进步！</div>

<div class="flink">
  <div class="flink-list">
    <div class="flink-list-item">
      <a href="https://github.com/你的用户名" target="_blank">
        <div class="flink-item-icon">
          <img src="https://github.com/fluidicon.png" />
        </div>
        <div class="flink-item-name">GitHub</div>
        <div class="flink-item-desc">我的GitHub主页</div>
      </a>
    </div>
  </div>
</div>
```

### 5.2 页面样式

```css
/* 友链页面样式 */
.flink-desc {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  margin-bottom: 30px;
}

.flink-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.flink-list-item {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.flink-list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
```

---

## 六、暗色模式适配

自定义页面需要适配暗色模式：

```css
/* 暗色模式适配 */
[data-theme="dark"] .flink-list-item {
  background: #2d2d2d;
}

[data-theme="dark"] .flink-item-name {
  color: #fff;
}

[data-theme="dark"] .movie-card {
  background: #2d2d2d;
}

[data-theme="dark"] .movie-info h3 {
  color: #fff;
}

[data-theme="dark"] .now-playing {
  background: #2d2d2d;
  color: #ccc;
}
```

---

## 七、导航菜单添加

在 `_config.butterfly.yml` 中添加页面链接：

```yaml
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  分类: /categories/ || fas fa-folder-open
  标签: /tags/ || fas fa-tags
  列表||fas fa-list:
    音乐: /music/ || fas fa-music
    电影: /movies/ || fas fa-video
  友链: /links/ || fas fa-link
  关于: /about/ || fas fa-heart
```

---

## 总结

自定义页面可以让博客内容更加丰富多样。音乐和电影页面可以展示个人兴趣，友链页面则有助于建立博客社区。记得为所有自定义页面添加暗色模式适配。

---

> **参考资料**:
> - [Butterfly 主题文档 - 自定义页面](https://butterfly.js.org/)
