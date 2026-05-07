---
title: Giscus评论系统配置指南
date: 2026-05-07 11:00:00
categories:
  - 博客搭建
tags:
  - Giscus
  - GitHub
  - Butterfly
cover: /img/cover2.png
description: 详细介绍如何为Hexo博客配置基于GitHub Discussions的Giscus评论系统，无需后端服务，国内可正常访问。
---

## 前言

评论系统是博客的重要组成部分，它能让读者与作者进行互动。Giscus 是一个基于 GitHub Discussions 的评论系统，具有以下优势：

- **无需后端服务** - 利用 GitHub Discussions 作为数据存储
- **国内可访问** - 不像 Disqus 需要翻墙
- **免费开源** - 完全免费使用
- **支持暗色模式** - 自动跟随系统或手动切换
- **支持多语言** - 包括中文

<!-- more -->

---

## 一、前置条件

在配置 Giscus 之前，需要满足以下条件：

1. **GitHub 仓库** - 你的博客必须托管在 GitHub 上
2. **开启 Discussions** - 仓库需要开启 Discussions 功能
3. **安装 Giscus App** - 需要在仓库中安装 Giscus GitHub App

> **注意**: 如果你的仓库是私有的，Giscus 也能工作，但评论内容只有仓库协作者可见。建议博客仓库使用公开仓库。

---

## 二、开启 GitHub Discussions

### 2.1 进入仓库设置

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Features**

### 2.2 开启 Discussions

在 Features 部分，勾选 **Discussions** 选项。

> **注意**: 开启 Discussions 后，仓库会出现一个新的 Discussions 选项卡，这里将存放所有的评论数据。

---

## 三、安装 Giscus App

### 3.1 访问 Giscus 安装页面

访问 [Giscus App 安装页面](https://github.com/apps/giscus)，点击 **Install** 按钮。

### 3.2 选择仓库

1. 选择 **Only select repositories**
2. 选择你的博客仓库（如 `username.github.io`）
3. 点击 **Install**

> **注意**: 建议只选择博客仓库，而不是所有仓库，以提高安全性。

---

## 四、获取 Giscus 配置

### 4.1 访问 Giscus 配置页面

访问 [giscus.app](https://giscus.app/)，这是 Giscus 的官方配置生成器。

### 4.2 配置选项

#### 仓库信息

- **仓库**: 输入你的仓库名，格式为 `用户名/仓库名`，例如 `username/username.github.io`
- **页面 ↔️ Discussions 映射**: 推荐选择 **pathname**（根据页面路径匹配）
- **Discussion 分类**: 推荐选择 **Announcements**（公告分类，只有管理员能创建）

#### 外观

- **主题**: 推荐选择 **Light**（亮色主题）
- **启用暗色模式**: 勾选，支持自动切换

#### 语言

- **语言**: 选择 **zh-CN**（简体中文）

### 4.3 获取配置代码

配置完成后，页面底部会生成一段 `<script>` 标签，其中包含三个重要参数：

```html
<script src="https://giscus.app/client.js"
        data-repo="你的用户名/你的仓库名"
        data-repo-id="你的仓库ID"
        data-category="Announcements"
        data-category-id="你的分类ID"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

记录以下三个关键参数：
- **repo**: 仓库名（格式：`用户名/仓库名`）
- **repo_id**: 仓库 ID（`data-repo-id`，自动生成）
- **category_id**: 分类 ID（`data-category-id`，自动生成）

> **注意**: `repo_id` 和 `category_id` 是自动生成的，每个仓库都不一样，不要直接复制别人的配置。

---

## 五、配置 Butterfly 主题

### 5.1 编辑主题配置

打开项目根目录的 `_config.butterfly.yml` 文件，找到评论系统配置部分。

### 5.2 配置评论系统启用

```yaml
# 评论系统
comments:
  use: Giscus
  count: true                    # 显示评论数
  card_post_count: false         # 首页卡片是否显示评论数
```

### 5.3 配置 Giscus 参数

```yaml
# Giscus 配置
giscus:
  repo: 你的用户名/你的仓库名                       # 仓库名
  repo_id: 你的仓库ID                               # 仓库 ID
  category_id: 你的分类ID                            # 分类 ID
  light_theme: light                              # 亮色主题
  dark_theme: dark                                # 暗色主题
  js:                                             # 自定义 JS（一般留空）
  option:                                         # 额外选项（一般留空）
```

> **重要**:
> - `repo_id` 和 `category_id` 必须从 giscus.app 获取，不能随意填写
> - 如果配置错误，评论区会显示空白或报错

---

## 六、高级配置

### 6.1 自定义主题

Giscus 支持多种内置主题：

- `light` - 亮色主题
- `dark` - 暗色主题
- `dark_dimmed` - 暗色柔和主题
- `dark_high_contrast` - 高对比度暗色主题
- `transparent_dark` - 透明暗色主题
- `preferred_color_scheme` - 跟随系统主题

也可以使用自定义主题 CSS：

```yaml
giscus:
  light_theme: https://your-domain.com/custom-light.css
  dark_theme: https://your-domain.com/custom-dark.css
```

### 6.2 映射方式

Giscus 支持多种页面与 Discussion 的映射方式：

| 映射方式 | 说明 | 推荐度 |
|---------|------|--------|
| pathname | 根据页面路径匹配 | ⭐⭐⭐⭐⭐ |
| url | 根据完整 URL 匹配 | ⭐⭐⭐⭐ |
| title | 根据页面标题匹配 | ⭐⭐⭐ |
| og:title | 根据 Open Graph 标题匹配 | ⭐⭐⭐ |

> **注意**: 推荐使用 `pathname` 映射方式，它最稳定且易于管理。

### 6.3 评论位置

```yaml
giscus:
  option: |
    data-input-position="top"
```

可选值：
- `top` - 输入框在评论列表上方
- `bottom` - 输入框在评论列表下方

---

## 七、验证配置

### 7.1 本地预览

启动本地服务器：

```bash
hexo clean && hexo server
```

访问任意文章页面，检查评论区是否正常显示。

### 7.2 常见问题排查

#### 评论区不显示

1. 检查 `repo_id` 和 `category_id` 是否正确
2. 确认 Giscus App 已安装到仓库
3. 确认仓库已开启 Discussions 功能

#### 显示 "An error occurred"

1. 检查仓库名格式是否正确（`用户名/仓库名`）
2. 确认仓库是公开的，或者你已登录 GitHub

#### 评论数不显示

1. 检查 `comments.count` 是否设置为 `true`
2. 确认 Discussion 中有对应的评论

---

## 八、部署

配置完成后，生成并部署：

```bash
hexo clean && hexo generate && hexo deploy
```

> **注意**: 部署后可能需要等待几分钟才能看到评论区，GitHub 需要时间来同步数据。

---

## 九、其他评论系统对比

| 评论系统 | 后端需求 | 国内访问 | 数据存储 | 费用 |
|---------|---------|---------|---------|------|
| Giscus | 无需 | ✅ 可访问 | GitHub Discussions | 免费 |
| Twikoo | 需要 | ✅ 可访问 | MongoDB/腾讯云 | 免费 |
| Valine | 需要 | ✅ 可访问 | LeanCloud | 免费/付费 |
| Disqus | 无需 | ❌ 需翻墙 | Disqus 服务器 | 免费/付费 |
| Gitalk | 无需 | ✅ 可访问 | GitHub Issues | 免费 |

> **推荐**: 对于 GitHub Pages 博客，Giscus 是最佳选择，因为它与 GitHub 生态完美集成，无需额外服务。

---

## 总结

通过以上步骤，你已经成功为博客配置了 Giscus 评论系统。主要步骤：

1. 开启 GitHub Discussions
2. 安装 Giscus App
3. 获取配置参数
4. 配置 Butterfly 主题

现在，读者可以在你的文章下方留下评论，与你进行互动了。

---

> **参考资料**:
> - [Giscus 官方文档](https://giscus.app/zh-CN)
> - [Butterfly 主题文档 - 评论系统](https://butterfly.js.org/posts/ceeb73f/#%E8%A9%95%E8%AB%96)
> - [GitHub Discussions 文档](https://docs.github.com/en/discussions)
