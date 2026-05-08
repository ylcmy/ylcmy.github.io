---
title: Bilibili追番追剧页面配置
date: 2026-05-08 12:00:00
categories:
  - 博客搭建
tags:
  - Hexo
  - Butterfly
  - Bilibili
cover: /img/cover1.png
description: 介绍如何使用hexo-bilibili-bangumi插件为Hexo博客接入Bilibili追番追剧数据，实现想看/在看/看过三标签切换，并自定义样式适配Butterfly主题。
---

## 前言

在博客中展示自己的追番追剧记录是一件很有趣的事情。本文将介绍如何使用 `hexo-bilibili-bangumi` 插件，将 Bilibili 的追番追剧数据自动同步到 Hexo 博客中，并自定义样式使其与 Butterfly 主题风格统一。

<!-- more -->

---

## 一、安装插件

在博客根目录执行：

```bash
npm install hexo-bilibili-bangumi --save
```

插件依赖 `hexo-renderer-pug`，如果未安装需先执行：

```bash
npm install hexo-renderer-pug --save
```

---

## 二、获取 Bilibili SESSDATA

插件需要 Bilibili 的 `SESSDATA` cookie 来获取观看进度数据。获取方式：

1. 在浏览器中登录 [bilibili.com](https://www.bilibili.com)
2. 按 `F12` 打开开发者工具
3. 切换到 **Application**（应用程序）标签页
4. 左侧找到 **Cookies** > `https://www.bilibili.com`
5. 在右侧列表中找到 `SESSDATA`，复制它的 **Value**

**注意**：`SESSDATA` 会过期（通常几个月），过期后需要重新获取。没有 `SESSDATA` 插件也能工作，只是不会显示观看进度条。

---

## 三、站点配置

在 `_config.yml`（站点根目录，不是主题配置文件）中添加以下配置：

```yaml
# hexo-bilibili-bangumi 追番/追剧配置
bangumi:
  enable: true
  source: bili
  path: bangumis/index.html
  vmid: 你的Bilibili UID
  title: '最近追番'
  quote: '生命不息，追番不止！'
  show: 1
  lazyload: true
  webp: true
  progress: true
  progressBar: true
  order: -score
  pagination: false

cinema:
  enable: true
  source: bili
  path: cinemas/index.html
  vmid: 你的Bilibili UID
  title: '最近追剧'
  quote: '追剧是最好的放松方式。'
  show: 1
  lazyload: true
  webp: true
  progress: true
  progressBar: true
  order: -score
  pagination: false
```

### 配置项说明

| 配置项 | 说明 |
|--------|------|
| `source` | 数据源，`bili` 表示 Bilibili |
| `vmid` | Bilibili 用户 UID（从个人空间 URL 中获取） |
| `path` | 生成页面的路径 |
| `show` | 默认显示的标签页：`0`=想看，`1`=在看，`2`=看过 |
| `lazyload` | 封面图懒加载 |
| `webp` | 封面图使用 webp 格式（更小体积） |
| `progress` | 显示观看进度 |
| `progressBar` | 显示进度条 |
| `order` | 排序方式：`-score` 按评分降序，`latest` 按更新时间 |

### 前置条件

需要在 Bilibili 的**隐私设置**中将追番追剧列表设为**公开**，否则 API 返回空数据。

---

## 四、导航菜单配置

在 `_config.butterfly.yml` 中添加追番追剧的导航入口：

```yaml
menu:
  列表||fas fa-list:
    音乐: /music/ || fas fa-music
    追番: /bangumis/ || fas fa-tv
    追剧: /cinemas/ || fas fa-film
```

---

## 五、样式美化

插件默认样式比较朴素，可以通过自定义 CSS 覆盖来适配博客的整体风格。在 `source/css/custom.css` 中添加以下样式：

```css
/* 追番/追剧页面样式覆盖 */

/* 标签页导航 */
.bangumi-tabs {
  display: flex;
  gap: 8px;
  margin: 24px 0 20px !important;
  padding: 6px;
  background: rgba(102, 126, 234, 0.06);
  border-radius: 14px;
  width: fit-content;
}

a.bangumi-tab {
  padding: 10px 24px !important;
  border-radius: 10px;
  font-size: 0.95em;
  font-weight: 500;
  color: #555;
  transition: all 0.3s ease;
}

a.bangumi-tab.bangumi-active,
.bangumi-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: #fff !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* 内容卡片 */
.bangumi-item {
  background: #fff;
  border-radius: 14px !important;
  padding: 20px !important;
  margin-bottom: 16px !important;
  border-bottom: none !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.bangumi-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 封面图片 */
.bangumi-picture img {
  border-radius: 10px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

/* 进度条 */
.bangumi-info .bangumi-progress .progress-bar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 8px !important;
}

/* 暗色模式 */
[data-theme="dark"] .bangumi-item {
  background: #1e293b !important;
}

[data-theme="dark"] .bangumi-title a {
  color: #e2e8f0;
}
```

以上样式使用了渐变色标签页、圆角卡片、悬浮上移效果和暗色模式适配，可根据自己的博客风格调整颜色和圆角大小。

---

## 六、GitHub Actions 配置

### 6.1 添加仓库 Secret

1. 进入 GitHub 仓库的 **Settings** > **Secrets and variables** > **Actions**
2. 点击 **New repository secret**
3. 添加：
   - **Name**: `BILIBILI_SESSDATA`
   - **Secret**: 第二步中复制的 `SESSDATA` 值

### 6.2 修改 Workflow 文件

在 `.github/workflows/deploy.yml` 中，在 `Build Hexo` 步骤之前添加数据拉取步骤：

```yaml
      - name: Update bangumi data
        run: npx hexo bangumi -u ${{ secrets.BILIBILI_SESSDATA }}
        continue-on-error: true

      - name: Update cinema data
        run: npx hexo cinema -u ${{ secrets.BILIBILI_SESSDATA }}
        continue-on-error: true
```

`continue-on-error: true` 的作用是：当 Bilibili API 暂时不可用或触发限流时，构建不会失败，而是使用上次缓存的数据。

---

## 七、使用方式

### 7.1 本地开发

```bash
# 拉取追番数据
npx hexo bangumi -u 你的SESSDATA

# 拉取追剧数据
npx hexo cinema -u 你的SESSDATA

# 启动本地服务
npx hexo server
```

访问 `http://localhost:4000/bangumis/` 和 `http://localhost:4000/cinemas/` 查看效果。

### 7.2 删除数据

```bash
npx hexo bangumi -d   # 删除追番数据
npx hexo cinema -d    # 删除追剧数据
```

### 7.3 补充手动条目

可以在 `source/_data/extra_bangumis.json` 中添加 Bilibili 上没有的番剧，格式与自动拉取的数据一致。

---

## 八、常见问题

### 8.1 页面显示为空

- 确认 Bilibili 追番追剧列表已设为**公开**
- 检查 `vmid` 是否正确（从个人空间 URL `space.bilibili.com/数字` 中获取）
- 确认 `source` 设置为 `bili`

### 8.2 进度条不显示

- 需要提供有效的 `SESSDATA` cookie
- `SESSDATA` 可能已过期，重新获取并更新 GitHub Secret

### 8.3 页面路径 404

- 检查 `path` 配置是否为 `index.html` 而非 `index.md`
- 执行 `npx hexo clean` 清理缓存后重新生成

---

## 总结

通过 `hexo-bilibili-bangumi` 插件，我们可以轻松将 Bilibili 追番追剧数据集成到 Hexo 博客中：

1. **插件安装**：`npm install hexo-bilibili-bangumi --save`
2. **站点配置**：在 `_config.yml` 中添加 `bangumi` 和 `cinema` 配置
3. **导航菜单**：在 Butterfly 主题配置中添加入口
4. **样式美化**：通过自定义 CSS 适配博客风格
5. **自动更新**：通过 GitHub Actions 在每次部署时自动拉取最新数据

这样每次推送代码后，追番追剧页面都会自动更新，无需手动维护。

---

## 参考资料

- [hexo-bilibili-bangumi GitHub](https://github.com/HCLonely/hexo-bilibili-bangumi)
- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Butterfly 主题文档](https://butterfly.js.org/)
