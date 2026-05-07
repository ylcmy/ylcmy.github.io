// 分类/标签页导航栏
(function() {
  function initCatalogBar() {
    var path = decodeURIComponent(window.location.pathname);
    var segments = path.split('/').filter(Boolean);

    // 判断页面类型
    // 分类总页面: /categories/ (segments长度为1)
    // 具体分类页面: /categories/xxx/ (segments长度为2)
    // 标签总页面: /tags/ (segments长度为1)
    // 具体标签页面: /tags/xxx/ (segments长度为2)
    var isCategoryPage = segments[0] === 'categories';
    var isTagPage = segments[0] === 'tags';
    var isDetailPage = segments.length >= 2;

    // 只在具体分类/标签页面显示
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
      // 选择器：.card-category-list-link 或 .card-category-list a
      var categoryLinks = document.querySelectorAll('.card-category-list-link, .card-category-list a');
      categoryLinks.forEach(function(a) {
        // 从 .card-category-list-name 获取名称
        var nameEl = a.querySelector('.card-category-list-name');
        var name = nameEl ? nameEl.textContent.trim() : a.textContent.trim();
        name = name.replace(/\(\d+\)/, '').trim();
        var href = a.getAttribute('href');
        if (href && name && href.includes('/categories/') && !items.some(function(i) { return i.href === href; })) {
          items.push({ name: name, href: href });
        }
      });

      // 如果侧边栏没有，从页面内容获取
      if (items.length === 0) {
        var pageLinks = document.querySelectorAll('.category-lists a');
        pageLinks.forEach(function(a) {
          var name = a.textContent.trim().replace(/\(\d+\)/, '').trim();
          var href = a.getAttribute('href');
          if (href && name && href.includes('/categories/') && !items.some(function(i) { return i.href === href; })) {
            items.push({ name: name, href: href });
          }
        });
      }
    } else {
      // 从侧边栏获取标签数据
      var tagLinks = document.querySelectorAll('.card-tag-cloud a');
      tagLinks.forEach(function(a) {
        var name = a.textContent.trim();
        var href = a.getAttribute('href');
        if (href && name && href.startsWith('/tags/') && !items.some(function(i) { return i.href === href; })) {
          items.push({ name: name, href: href });
        }
      });

      // 如果侧边栏没有，从页面内容获取
      if (items.length === 0) {
        var pageTagLinks = document.querySelectorAll('.tag-cloud-list a, .tag-cloud a');
        pageTagLinks.forEach(function(a) {
          var name = a.textContent.trim();
          var href = a.getAttribute('href');
          if (href && name && href.startsWith('/tags/') && !items.some(function(i) { return i.href === href; })) {
            items.push({ name: name, href: href });
          }
        });
      }
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
    } else {
      var firstArticle = content.querySelector('.article-sort');
      if (firstArticle) {
        firstArticle.parentNode.insertBefore(bar, firstArticle);
      }
    }

    // 高亮当前页面
    // 标准化路径：移除分页路径，统一末尾斜杠，移除index.html
    var currentPath = path.replace(/page\/[0-9]+\//g, '').replace(/index\.html$/, '');
    if (!currentPath.endsWith('/')) currentPath += '/';

    // 遍历所有导航项，查找匹配项
    var allItems = listContainer.querySelectorAll('.catalog-list-item');
    var currentItem = null;

    allItems.forEach(function(item) {
      var itemHref = item.getAttribute('data-href');
      if (!itemHref) return;

      // 解码URL编码的路径
      itemHref = decodeURIComponent(itemHref);

      // 标准化href路径
      itemHref = itemHref.replace(/index\.html$/, '');
      if (!itemHref.endsWith('/')) itemHref += '/';

      // 精确匹配
      if (itemHref === currentPath) {
        currentItem = item;
      }
    });

    if (currentItem) {
      currentItem.classList.add('selected');
      var list = document.getElementById('catalog-list');
      if (list) {
        // 滚动到可视区域中央
        setTimeout(function() {
          list.scrollLeft = (currentItem.offsetLeft - list.offsetLeft) - (list.offsetWidth - currentItem.offsetWidth) / 2;
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

  document.addEventListener('pjax:complete', initCatalogBar);
})();
