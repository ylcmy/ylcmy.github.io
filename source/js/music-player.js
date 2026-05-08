// Music player: show toast when user-initiated play fails
// Let MetingJS handle skip logic itself
(function () {
  function showToast(msg) {
    var existing = document.querySelector('.music-error-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'music-error-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    }, 2500);
  }

  function bindPlayers() {
    document.querySelectorAll('.aplayer').forEach(function (el) {
      if (el.aplayer && !el._errorBound) {
        el._errorBound = true;
        var ap = el.aplayer;
        var userInitiated = false;
        var skipCount = 0;
        var maxSkips = 10;

        // Listen for real user clicks on player controls
        el.addEventListener('pointerdown', function (e) {
          if (
            e.target.closest('.aplayer-icon-play') ||
            e.target.closest('.aplayer-list li')
          ) {
            userInitiated = true;
          }
        });

        ap.on('error', function () {
          if (userInitiated && skipCount < maxSkips) {
            skipCount++;
            showToast('播放失败，自动跳转下一首');
          }
          // Reset flag — let MetingJS handle the actual skip
          userInitiated = false;
        });

        ap.on('play', function () {
          // Successful play — reset counters
          userInitiated = false;
          skipCount = 0;
        });
      }
    });
  }

  var observer = new MutationObserver(bindPlayers);
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(bindPlayers, 2000);
  setTimeout(bindPlayers, 5000);
})();
