// 页脚运行时间脚本
function showRuntime() {
  // 建站时间：2026年5月6日
  var createDate = new Date("2026-05-06T00:00:00");
  var now = new Date();
  var timeDiff = now.getTime() - createDate.getTime();
  var msPerDay = 24 * 60 * 60 * 1000;
  var days = Math.floor(timeDiff / msPerDay);
  var hours = Math.floor((timeDiff % msPerDay) / (60 * 60 * 1000));
  var minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
  var seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);

  var runtimeElement = document.getElementById("runtime");
  if (runtimeElement) {
    runtimeElement.innerHTML = "已运行 " + days + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒";
  }
}

// 页面加载完成后执行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    showRuntime();
    setInterval(showRuntime, 1000);
  });
} else {
  showRuntime();
  setInterval(showRuntime, 1000);
}
