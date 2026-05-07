---
title: Butterfly分类标签导航栏配置
date: 2026-05-07 18:00:00
categories:
  - 博客搭建
tags:
  - Butterfly
  - Hexo
  - JavaScript
cover: /img/cover1.png
description: 为Butterfly主题的分类和标签页面添加横向导航栏，支持当前页面高亮、横向滚动和暗色模式。
---

## 前言

默认的Butterfly主题在分类和标签页面没有导航栏，用户需要返回总页面才能切换到其他分类或标签。本文介绍如何通过JavaScript动态注入的方式，在具体分类/标签页面添加一个横向导航栏。

<!-- more -->

---

## 实现思路

由于使用npm安装的Butterfly主题无法直接修改pug模板文件，采用以下方案：

1. **JavaScript动态注入** - 检测页面类型，动态创建导航栏
2. **从侧边栏获取数据** - 利用侧边栏已有的分类/标签列表
3. **CSS样式美化** - 添加导航栏样式和高亮效果

---

## 一、创建JavaScript脚本

在 `source/js/catalog-bar.js` 创建脚本：

```javascript
// 分类/标签页导航栏
(function() {
  function initCatalogBar() {
    var path = decodeURIComponent(window.location.pathname);
    var segments = path.split('/').filter(Boolean);

    // 只在具体分类/标签页面显示，不在总页面显示
    var isCategoryPage = segments[0] === 'categories';
    var isTagPage = segments[0] === 'tags';
    var isDetailPage = segments.length >= 2;

    if (!((isCategoryPage || isTagPage) && isDetailPage)) return;

    // 避免重复添加
    if (document.getElementById('catalog-bar')) return;

    var content = document.getElementById('content-inner');
    if (!content) return;

    // 创建导航栏容器
    var bar = document.createElement('div');
    bar.id = 'catalog-bar';
    bar.innerHTML = '<i class="fa-fw fas ' + (isCategoryPage ? 'fa-shapes' : 'fa-tags') + '"></i>' +
      '<div id="catalog-list"></div>' +
      '<a class="catalog-more" href="' + (isCategoryPage ? '/categories/' : '/tags/') + '">更多</a>';

    var listContainer = bar.querySelector('#catalog-list');
    var items = [];

    if (isCategoryPage) {
      // 从侧边栏获取分类数据
      var categoryLinks = document.querySelectorAll('.card-category-list-link, .card-category-list a');
      categoryLinks.forEach(function(a) {
        var nameEl = a.querySelector('.card-category-list-name');
        var name = nameEl ? nameEl.textContent.trim() : a.textContent.trim();
        name = name.replace(/\(\d+\)/, '').trim();
        var href = a.getAttribute('href');
        if (href && name && href.includes('/categories/') &&
            !items.some(function(i) { return i.href === href; })) {
          items.push({ name: name, href: href });
        }
      });
    } else {
      // 从侧边栏获取标签数据
      var tagLinks = document.querySelectorAll('.card-tag-cloud a');
      tagLinks.forEach(function(a) {
        var name = a.textContent.trim();
        var href = a.getAttribute('href');
        if (href && name && href.startsWith('/tags/') &&
            !items.some(function(i) { return i.href === href; })) {
          items.push({ name: name, href: href });
        }
      });
    }

    // 渲染导航项
    items.forEach(function(item) {
      var div = document.createElement('div');
      div.className = 'catalog-list-item';
      div.setAttribute('data-href', item.href);
      div.innerHTML = '<a href="' + item.href + '">' + item.name + '</a>';
      listContainer.appendChild(div);
    });

    // 如果没有获取到数据，不显示导航栏
    if (items.length === 0) return;

    // 插入到页面（在文章列表标题之前）
    var insertPoint = content.querySelector('.article-sort-title');
    if (insertPoint) {
      insertPoint.parentNode.insertBefore(bar, insertPoint);
    }

    // 高亮当前页面
    var currentPath = path.replace(/page\/[0-9]+\//g, '').replace(/index\.html$/, '');
    if (!currentPath.endsWith('/')) currentPath += '/';

    var allItems = listContainer.querySelectorAll('.catalog-list-item');
    var currentItem = null;

    allItems.forEach(function(item) {
      var itemHref = item.getAttribute('data-href');
      if (!itemHref) return;

      // 解码URL编码的路径（关键：匹配中文路径）
      itemHref = decodeURIComponent(itemHref);
      itemHref = itemHref.replace(/index\.html$/, '');
      if (!itemHref.endsWith('/')) itemHref += '/';

      if (itemHref === currentPath) {
        currentItem = item;
      }
    });

    if (currentItem) {
      currentItem.classList.add('selected');
      var list = document.getElementById('catalog-list');
      if (list) {
        setTimeout(function() {
          list.scrollLeft = (currentItem.offsetLeft - list.offsetLeft) -
            (list.offsetWidth - currentItem.offsetWidth) / 2;
        }, 100);
      }
    }

    // 鼠标滚轮横向滚动
    var list = document.getElementById('catalog-list');
    if (list) {
      list.addEventListener('mousewheel', function(e) {
        list.scrollLeft -= e.wheelDelta / 2;
        e.preventDefault();
      }, false);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalogBar);
  } else {
    initCatalogBar();
  }

  // pjax 兼容
  document.addEventListener('pjax:complete', initCatalogBar);
})();
```

---

## 二、添加CSS样式

在 `source/css/custom.css` 中添加：

```css
/* 分类/标签导航栏样式 */
#catalog-bar {
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  margin-bottom: 1rem;
  background: #fff;
  transition: border-color 0.3s ease;
}

#catalog-bar:hover {
  border-color: #667eea;
}

#catalog-bar i {
  color: #667eea;
  margin-right: 0.5rem;
}

#catalog-list {
  margin: 0 0.5rem;
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  flex: 1;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#catalog-list::-webkit-scrollbar {
  display: none;
}

.catalog-list-item a {
  display: inline-block;
  margin: 0 0.2em;
  padding: 0.3em 0.6em;
  font-weight: 500;
  border-radius: 8px;
  color: #555;
  font-size: 0.9em;
  transition: all 0.3s ease;
  text-decoration: none;
}

.catalog-list-item:hover a {
  background: #667eea;
  color: #fff;
}

.catalog-list-item.selected a {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

a.catalog-more {
  min-width: fit-content;
  font-weight: bold;
  color: #667eea;
  font-size: 0.9em;
  text-decoration: none;
  margin-left: auto;
}

/* 暗色模式适配 */
[data-theme="dark"] #catalog-bar {
  background: #2d2d2d;
  border-color: #444;
}

[data-theme="dark"] .catalog-list-item a {
  color: #ccc;
}

[data-theme="dark"] .catalog-list-item:hover a,
[data-theme="dark"] .catalog-list-item.selected a {
  background: #667eea;
  color: #fff;
}
```

---

## 三、注入文件

在 `_config.butterfly.yml` 的 `inject` 配置中添加：

```yaml
inject:
  bottom:
    - <script src="/js/catalog-bar.js"></script>
```

---

## 四、实现效果

| 页面 | 导航栏 |
|------|--------|
| `/categories/` | 不显示 |
| `/categories/博客搭建/` | 显示所有分类，当前分类高亮 |
| `/tags/` | 不显示 |
| `/tags/Hexo/` | 显示所有标签，当前标签高亮 |

### 功能特点

- **当前高亮** - 自动高亮当前访问的分类/标签
- **横向滚动** - 分类/标签过多时支持横向滚动
- **滚轮支持** - 鼠标滚轮可横向滚动导航栏
- **更多按钮** - 点击跳转到全部分类/标签页面
- **暗色模式** - 自动适配深色主题
- **pjax兼容** - 支持pjax无刷新加载

---

## 五、踩坑记录

### 1. 中文路径编码问题

侧边栏生成的href是URL编码的（如 `%E5%8D%9A%E5%AE%A2`），而 `window.location.pathname` 是解码后的中文。匹配时需要先 `decodeURIComponent()` 解码：

```javascript
itemHref = decodeURIComponent(itemHref);
```

### 2. 选择器问题

Butterfly主题的侧边栏分类使用 `.card-category-list-link` 类名，名称在 `.card-category-list-name` 子元素中：

```javascript
var nameEl = a.querySelector('.card-category-list-name');
var name = nameEl ? nameEl.textContent.trim() : a.textContent.trim();
```

---

## 总结

通过JavaScript动态注入的方式，在不修改主题模板文件的前提下，实现了分类和标签页面的导航栏功能。核心要点是正确处理URL编码的中文路径匹配，以及从侧边栏已有的DOM元素获取数据。

---

> **参考资料**:
> - [Butterfly 主题文档](https://butterfly.js.org/)
> - [分类标签导航栏教程](https://blog.eurkon.com/post/65b72006.html)
