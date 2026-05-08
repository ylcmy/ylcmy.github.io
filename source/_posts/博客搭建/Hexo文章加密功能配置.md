---
title: Hexo文章加密功能配置
date: 2026-05-08 10:00:00
categories:
  - 博客搭建
tags:
  - Hexo
  - Butterfly
  - 加密
cover: /img/cover1.png
description: 详细介绍如何为Hexo博客配置文章加密功能，使用hexo-blog-encrypt插件实现分类自动加密，保护私密文章内容。
---

## 前言

在搭建个人博客的过程中，有时候我们需要对某些文章进行加密保护，比如面试笔记、私人日记等敏感内容。本文将详细介绍如何使用 `hexo-blog-encrypt` 插件为 Hexo 博客添加文章加密功能，并实现按分类自动加密。

<!-- more -->

---

## 一、安装加密插件

首先需要安装 `hexo-blog-encrypt` 插件：

```bash
npm install hexo-blog-encrypt --save
```

安装完成后，插件会自动注册到 Hexo 的过滤器系统中。

---

## 二、基础配置

### 2.1 站点配置

在站点根目录的 `_config.yml` 文件中添加加密配置：

```yaml
# hexo-blog-encrypt 文章加密配置
encrypt:
  abstract: 本文已加密，请输入密码查看
  wrong_pass_message: 密码错误，请重新输入
```

**注意**：配置字段名必须是 `encrypt`，而不是 `hexo_blog_encrypt`。

### 2.2 配置项说明

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `abstract` | 加密文章显示的提示文字 | "Here's something encrypted..." |
| `wrong_pass_message` | 密码错误时的提示 | "Oh, this is an invalid password..." |
| `theme` | 加密页面主题 | "default" |
| `silent` | 是否禁用日志 | false |
| `autoSave` | 是否自动保存密码到 localStorage | false |

---

## 三、单篇文章加密

### 3.1 手动加密

在文章的 front-matter 中添加 `password` 字段即可加密：

```yaml
---
title: 我的私密文章
date: 2026-05-08
password: my_secret_password
---
```

### 3.2 按标签加密

也可以为特定标签设置密码：

```yaml
# _config.yml
encrypt:
  tags:
    - name: 私密
      password: tag_password
```

---

## 四、分类自动加密

### 4.1 需求场景

如果我们希望某个分类下的所有文章都自动加密，而不是每篇文章手动添加 `password` 字段，可以通过自定义脚本实现。

### 4.2 创建加密脚本

在 `scripts/` 目录下创建 `auto-encrypt.js` 文件：

```javascript
// 自动为指定分类的文章注入加密密码
// 密码来源：环境变量 > .env 文件（本地开发用）

const fs = require("fs");
const path = require("path");

// 读取 .env 文件（仅本地开发用）
function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env");
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...val] = trimmed.split("=");
      env[key.trim()] = val.join("=").trim();
    }
  }
  return env;
}

const fileEnv = loadEnvFile();

// 优先使用环境变量（GitHub Actions），其次使用 .env 文件
const defaultPasswords = {
  暑期实习面经: process.env.ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE || fileEnv["ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE"] || "",
  // 可添加更多分类：
  // '日记': process.env.ENCRYPT_DIARY || fileEnv['ENCRYPT_DIARY'] || '',
};

hexo.extend.filter.register("before_post_render", function (data) {
  if (data.password) return data;

  const cats = data.categories;
  if (cats && cats.length) {
    const catNames = cats.map((c) => (typeof c === "string" ? c : c.name));

    for (const [cat, pwd] of Object.entries(defaultPasswords)) {
      if (catNames.includes(cat)) {
        data.password = pwd;
        break;
      }
    }
  }

  return data;
});
```

### 4.3 创建环境变量文件

在站点根目录创建 `.env` 文件存放密码：

```env
# 文章加密密码（此文件不会被提交到 Git）
ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE=your_password_here
```

### 4.4 配置 .gitignore

确保 `.env` 文件不会被提交到 Git：

```gitignore
# .gitignore
.env
```

---

## 五、GitHub Actions 配置

### 5.1 添加仓库 Secrets

1. 进入 GitHub 仓库的 **Settings** > **Secrets and variables** > **Actions**
2. 点击 **New repository secret**
3. 添加：
   - **Name**: `ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE`
   - **Secret**: `你的密码`

### 5.2 修改 Workflow 文件

在 `.github/workflows/` 目录下的 workflow 文件中，添加环境变量：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npx hexo generate
        env:
          ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE: ${{ secrets.ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE }}
      # 部署步骤...
```

---

## 六、工作原理

### 6.1 加密流程

1. Hexo 构建时，`auto-encrypt.js` 脚本会在文章渲染前执行
2. 脚本检查文章的 `categories` 字段
3. 如果文章属于配置的加密分类，自动注入 `password` 字段
4. `hexo-blog-encrypt` 插件检测到 `password` 字段后，对文章内容进行加密

### 6.2 密码读取优先级

```
环境变量 > .env 文件 > 空字符串
```

- **本地开发**：从 `.env` 文件读取密码
- **GitHub Actions**：从 Secrets 环境变量读取密码

### 6.3 加密算法

插件使用 **AES-256-GCM** 加密算法，配合 **PBKDF2-SHA256** 密钥派生函数，安全性较高。

---

## 七、使用方式

### 7.1 本地开发

1. 编辑 `.env` 文件设置密码
2. 运行 `npx hexo server` 预览
3. 访问加密文章时输入密码即可查看

### 7.2 添加新的加密分类

1. 在 `auto-encrypt.js` 中添加分类和环境变量名：

```javascript
const defaultPasswords = {
  暑期实习面经: process.env.ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE || fileEnv["ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE"] || "",
  日记: process.env.ENCRYPT_DIARY || fileEnv["ENCRYPT_DIARY"] || "",
};
```

2. 在 `.env` 和 GitHub Secrets 中添加对应的密码

### 7.3 文章分类设置

确保文章的 front-matter 中设置了正确的分类：

```yaml
---
title: 面试笔记
categories:
  - 暑期实习面经
---
```

---

## 八、常见问题

### 8.1 配置不生效

- 确保配置字段名是 `encrypt`，不是 `hexo_blog_encrypt`
- 配置应放在 `_config.yml`（站点根目录），而不是 `_config.butterfly.yml`
- 执行 `npx hexo clean` 清理缓存后重新生成

### 8.2 GitHub Actions 构建失败

- 检查 Secrets 是否正确配置
- 确认环境变量名与脚本中一致
- 查看构建日志排查具体错误

### 8.3 密码忘记

- 本地开发：查看 `.env` 文件
- 线上部署：查看 GitHub Secrets

---

## 总结

通过 `hexo-blog-encrypt` 插件和自定义脚本，我们可以轻松实现 Hexo 博客的文章加密功能：

1. **插件安装**：`npm install hexo-blog-encrypt --save`
2. **配置文件**：在 `_config.yml` 中添加 `encrypt` 配置
3. **自动加密**：通过 `auto-encrypt.js` 脚本实现分类自动加密
4. **密码管理**：使用 `.env` 文件（本地）和 GitHub Secrets（线上）

这样既能保护私密文章，又不会将密码暴露在代码仓库中。

---

## 参考资料

- [hexo-blog-encrypt GitHub](https://github.com/D0n9X1n/hexo-blog-encrypt)
- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Butterfly 主题文档](https://butterfly.js.org/)
