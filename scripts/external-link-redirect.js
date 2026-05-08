// 外部链接安全跳转
// 构建时将所有外部链接重写为 /go/?url=<encoded_url>，经过中间提示页跳转

const cheerio = require("cheerio");

hexo.extend.filter.register("after_render:html", function (html) {
  const siteUrl = hexo.config.url || "";
  const siteHost = siteUrl ? new URL(siteUrl).hostname : "";
  const excludedHosts = [siteHost, "localhost"].filter(Boolean);

  const $ = cheerio.load(html, null, false);

  $("a[href]").each(function () {
    const el = $(this);
    const href = el.attr("href");
    if (!href) return;
    if (/^\/go\/|^#|^mailto:|^javascript:|^tel:/.test(href)) return;

    let linkHost;
    try {
      if (/^https?:\/\//i.test(href)) {
        linkHost = new URL(href).hostname;
      } else if (/^\/\/[^/]/.test(href)) {
        linkHost = new URL("https:" + href).hostname;
      } else {
        return;
      }
    } catch (e) {
      return;
    }

    if (excludedHosts.some((h) => linkHost === h || linkHost.endsWith("." + h))) return;

    el.attr("href", "/go/?url=" + encodeURIComponent(href));
    if (!el.attr("target")) el.attr("target", "_blank");
    if (!el.attr("rel")) el.attr("rel", "noopener noreferrer");
  });

  return $.html();
});
