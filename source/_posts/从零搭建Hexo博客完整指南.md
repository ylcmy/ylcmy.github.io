---
title: 从零搭建Hexo博客完整指南
date: 2026-05-07 10:00:00
updated: 2026-05-07 10:00:00
categories:
  - 博客搭建
tags:
  - Hexo
  - Butterfly
  - 博客搭建
  - GitHub Pages
cover: /img/cover1.png
description: 详细介绍从零开始搭建Hexo博客并使用Butterfly主题的完整过程，包含环境配置、主题安装、评论系统集成等关键步骤。
---

## 前言

本文将详细介绍从零开始搭建一个基于 Hexo 的个人博客，并使用 Butterfly 主题进行美化的完整过程。Hexo 是一个快速、简洁且高效的博客框架，而 Butterfly 则是目前最受欢迎的 Hexo 主题之一。

<!-- more -->

---

## 一、环境准备

### 1.1 安装 Node.js

Hexo 是基于 Node.js 构建的，因此首先需要安装 Node.js。

1. 访问 [Node.js 官网](https://nodejs.org/) 下载 LTS 版本
2. 安装时勾选"Add to PATH"选项
3. 安装完成后打开终端，验证安装：

```bash
node -v
npm -v
```

> **注意**: 推荐使用 Node.js 16.x 或更高版本，Hexo 8.x 需要 Node.js 14.0 以上。

### 1.2 安装 Git

Git 是版本控制工具，也是部署博客到 GitHub Pages 的必要工具。

1. 访问 [Git 官网](https://git-scm.com/) 下载对应系统版本
2. 安装完成后验证：

```bash
git --version
```

### 1.3 配置 GitHub 仓库

1. 登录 [GitHub](https://github.com/)
2. 创建新仓库，仓库名格式：`用户名.github.io`
3. 例如：`username.github.io`

> **注意**: 仓库名必须与你的 GitHub 用户名完全一致，否则无法正确部署。

---

## 二、安装 Hexo

### 2.1 全局安装 Hexo CLI

```bash
npm install -g hexo-cli
```

验证安装：

```bash
hexo -v
```

### 2.2 初始化博客项目

```bash
hexo init username.github.io
cd username.github.io
npm install
```

> **注意**: 如果 `hexo init` 报错，可以尝试使用管理员权限运行终端，或者检查网络连接。

### 2.3 目录结构说明

初始化后的目录结构如下：

```
username.github.io/
├── _config.yml          # 站点配置文件
├── package.json         # 项目依赖
├── scaffolds/           # 模板文件夹
│   ├── draft.md
│   ├── page.md
│   └── post.md
├── source/              # 资源文件夹
│   └── _posts/          # 文章存放目录
└── themes/              # 主题文件夹
```

---

## 三、安装 Butterfly 主题

### 3.1 通过 npm 安装（推荐）

```bash
npm install hexo-theme-butterfly
```

### 3.2 或通过 Git 克隆安装

```bash
cd themes
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git
```

> **注意**: npm 安装方式更便于版本管理和更新，推荐使用 npm 方式。但如果你想要对主题魔改，使用Git方式安装。

### 3.3 修改站点配置

编辑根目录的 `_config.yml`，修改主题配置：

```yaml
# Extensions
theme: butterfly
```

> **重要**: 如果使用 npm 安装主题，不需要在 `themes` 文件夹中放置主题文件，Hexo 会自动从 `node_modules` 加载。

---

## 四、Butterfly 主题配置

### 4.1 创建主题配置文件

在项目根目录创建 `_config.butterfly.yml` 文件：

```bash
touch _config.butterfly.yml
```

> **注意**: Butterfly 主题支持将配置分离到单独的文件中，便于管理和版本控制。**不要直接修改 `themes/butterfly/_config.yml`**，因为更新主题时会被覆盖。

### 4.2 基础配置

```yaml
# Butterfly Theme Configuration

# 导航菜单
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  分类: /categories/ || fas fa-folder-open
  标签: /tags/ || fas fa-tags
  关于: /about/ || fas fa-heart

# 侧边栏
aside:
  enable: true
  hide: false
  button: true
  mobile: true
  position: right
  display:
    archive: true
    tag: true
    category: true
  card_author:
    enable: true
    description: 你的个人简介
    button:
      enable: true
      icon: fab fa-github
      text: Follow Me
      link: https://github.com/你的用户名
  card_announcement:
    enable: true
    content: 欢迎来到我的个人主页！
  card_recent_post:
    enable: true
    limit: 5
    sort: date
  card_categories:
    enable: true
    limit: 8
    expand: none
  card_tags:
    enable: true
    limit: 40
    color: true
    orderby: random
    order: 1

# 头像
avatar:
  img: /img/avatar.jpg
  effect: false

# 文章封面
cover:
  index_enable: true
  aside_enable: true
  archives_enable: true
  position: both
  default_cover:
    - /img/cover1.png
    - /img/cover2.png

# 社交图标
social:
  fab fa-github: https://github.com/你的用户名 || Github || '#24292e'
  fas fa-envelope: mailto:你的邮箱 || Email || '#4a7dbe'
```

### 4.3 创建必要的页面

#### 分类页面

```bash
hexo new page categories
```

编辑 `source/categories/index.md`：

```markdown
---
title: 分类
date: 2026-05-07 10:00:00
type: "categories"
---
```

#### 标签页面

```bash
hexo new page tags
```

编辑 `source/tags/index.md`：

```markdown
---
title: 标签
date: 2026-05-07 10:00:00
type: "tags"
---
```

#### 关于页面

```bash
hexo new page about
```

编辑 `source/about/index.md`，填写你的个人介绍。

> **注意**: 页面的 `type` 字段必须与菜单配置中的路径对应，否则页面无法正确显示。

---

## 五、代码块配置

Butterfly 主题对代码块有很好的支持：

```yaml
# 代码块配置
code_blocks:
  # 主题: darker / pale night / light / ocean / false
  theme: light
  macStyle: true # Mac 风格
  height_limit: 300 # 代码块高度限制
  word_wrap: false # 自动换行
  copy: true # 复制按钮
  language: true # 显示语言
  shrink: false # 是否可收缩
  fullpage: false # 全屏按钮
```

---

## 六、文章编写规范

### 6.1 Front-matter 格式

每篇文章的开头需要包含 Front-matter：

```markdown
---
title: 文章标题
date: 2026-05-07 10:00:00
updated: 2026-05-07 10:00:00
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
cover: /img/cover.jpg
description: 文章摘要描述
---
```

### 6.2 文章摘要

使用 `<!-- more -->` 标记分割文章摘要和正文：

```markdown
这是文章的摘要部分，会显示在首页。

<!-- more -->

这是文章的正文部分，点击"阅读更多"后才能看到。
```

> **注意**: 如果不使用 `<!-- more -->`，Butterfly 会自动截取前 500 个字符作为摘要。

---

## 七、本地预览与调试

### 7.1 启动本地服务器

```bash
hexo clean && hexo server
```

或者简写：

```bash
hexo s
```

访问 `http://localhost:4000` 预览博客。

### 7.2 常用命令

```bash
hexo clean    # 清除缓存和已生成的文件
hexo generate # 生成静态文件（简写 hexo g）
hexo server   # 启动本地服务器（简写 hexo s）
hexo deploy   # 部署到远程（简写 hexo d）
```

> **注意**: 修改配置文件后，需要重启服务器才能看到变化。使用 `hexo clean && hexo server` 确保加载最新配置。

---

## 八、部署到 GitHub Pages

### 8.1 安装部署插件

```bash
npm install hexo-deployer-git --save
```

### 8.2 配置部署信息

编辑根目录的 `_config.yml`：

```yaml
# Deployment
deploy:
  type: git
  repo: https://github.com/你的用户名/你的用户名.github.io.git
  branch: main
```

### 8.3 生成并部署

```bash
hexo clean && hexo generate && hexo deploy
```

或者使用快捷命令：

```bash
hexo clean && hexo g && hexo d
```

> **注意**: 首次部署时，GitHub 会要求授权。部署完成后，等待几分钟，访问 `https://你的用户名.github.io` 即可看到博客。

---

## 九、自定义域名（可选）

如果需要绑定自定义域名：

1. 在 `source` 文件夹中创建 `CNAME` 文件，内容为你的域名
2. 在域名服务商处添加 CNAME 记录，指向 `你的用户名.github.io`
3. 在 GitHub 仓库的 Settings > Pages 中配置自定义域名

---

## 十、常见问题

### 10.1 主题样式不生效

- 检查 `_config.yml` 中的 `theme` 配置是否正确
- 运行 `hexo clean` 清除缓存
- 确认 `_config.butterfly.yml` 文件位置正确

### 10.2 页面 404

- 检查页面的 `type` 字段是否正确
- 确认菜单路径与页面路径一致

### 10.3 部署失败

- 检查 Git 仓库地址是否正确
- 确认 GitHub Token 或 SSH 密钥配置正确
- 查看错误日志定位问题

---

## 总结

通过以上步骤，你已经成功搭建了一个基于 Hexo 和 Butterfly 主题的个人博客。接下来可以继续：

- [添加评论系统（Giscus）](/posts/Giscus评论系统配置指南/)
- 配置搜索功能
- 添加看板娘等特效
- 自定义主题样式

更多配置请参考 [Butterfly 官方文档](https://butterfly.js.org/)。

---

> **参考资料**:
>
> - [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
> - [Butterfly 官方文档](https://butterfly.js.org/)
> - [GitHub Pages 官方文档](https://docs.github.com/en/pages)
