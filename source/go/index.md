---
title: Lay - 安全中心
comments: false
aside: false
top_img: false
---

<style>html,body,#body-wrap,#page,#content-inner,#article-container{height:100%!important;margin:0!important;padding:0!important;overflow:hidden!important;background:#F5F5F5!important;max-width:100%!important}#nav,#footer,#sidebar,#rightside,.page-title,#page-header{display:none!important}[data-theme="dark"] #body-wrap,[data-theme="dark"] #page,[data-theme="dark"] #content-inner,[data-theme="dark"] #article-container{background:#1a1a2e!important}</style>
<div class="go-wrap"><div class="go-card-glow"><div class="go-card">
<div class="go-icon"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></div>
<h1 class="go-title">您即将离开本站，跳转到：</h1>
<div class="go-url-box"><code class="go-url" id="go-url"></code><button class="go-copy-btn" id="go-copy" title="复制链接"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button></div>
<div class="go-warn-group"><p class="go-warn"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>请自行确认链接安全性</span></p><p class="go-warn"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>请注意账号和财产安全</span></p></div>
<div class="go-actions"><a class="go-btn go-btn-primary" id="go-continue" href="#">继续访问</a><a class="go-btn go-btn-secondary" id="go-back" href="#">取消跳转</a></div>
<div class="go-error" id="go-error"><p>链接无效或缺失</p><a class="go-btn go-btn-secondary" href="/">返回首页</a></div>
</div></div></div>
<script>
(function(){
  document.title="Lay - 安全中心";
  var params=new URLSearchParams(window.location.search);
  var rawUrl=params.get("url");
  var urlBox=document.querySelector(".go-url-box");
  var urlEl=document.getElementById("go-url");
  var actionsEl=document.querySelector(".go-actions");
  var errorEl=document.getElementById("go-error");
  var warnGroup=document.querySelector(".go-warn-group");
  if(!rawUrl){urlBox.style.display="none";actionsEl.style.display="none";warnGroup.style.display="none";errorEl.style.display="block";return}
  var decodedUrl=decodeURIComponent(rawUrl);
  urlEl.textContent=decodedUrl;
  var copyBtn=document.getElementById("go-copy");
  var copyIcon='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var checkIcon='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  copyBtn.addEventListener("click",function(){
    navigator.clipboard.writeText(decodedUrl).then(function(){
      copyBtn.innerHTML=checkIcon;copyBtn.style.color="#22c55e";
      setTimeout(function(){copyBtn.innerHTML=copyIcon;copyBtn.style.color=""},1500)
    })
  });
  var continueBtn=document.getElementById("go-continue");
  continueBtn.href=decodedUrl;
  continueBtn.addEventListener("click",function(e){e.preventDefault();window.location.href=decodedUrl});
  var backBtn=document.getElementById("go-back");
  backBtn.addEventListener("click",function(e){
    e.preventDefault();window.close();
    setTimeout(function(){if(window.history.length>1){window.history.back()}else{window.location.href="/"}},300)
  })
})();
</script>
