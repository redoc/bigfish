// ==UserScript==
// @name        VimFx Lite
// @namespace   redoc
// @include     *
// @version     1.0.2
// @grant       none
// @icon        https://roboq.sinaapp.com/roboq/flower.ico
// @updateURL   https://github.com/redoc/bigfish/raw/master/fish/vimfx-lite.user.js
// ==/UserScript==

var step = 80;
var gap = 40;
var mode = 'normal';
var delta = {
  left: 0,
  top: 0
};
var moveleft = function (d) {
  document.documentElement.scrollLeft += d;
};
var movetop = function (d) {
  //   console.log('top', d, delta);
  document.documentElement.scrollTop += d;
};
setInterval(function () {
  var dist = Math.abs(delta.left);
  var sign = Math.sign(delta.left);
  if (dist > 0) {
    moveleft(sign * Math.ceil(dist / 3));
    delta.left = sign * Math.floor(dist * 2 / 3);
  }
  dist = Math.abs(delta.top);
  sign = Math.sign(delta.top);
  if (dist > 0) {
    movetop(sign * Math.ceil(dist / 3));
    delta.top = sign * Math.floor(dist * 2 / 3);
  }
}, 40);
var ischar = function (c) {
  c = c.toUpperCase();
  return c.length == 1 && ((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'));
};
window.addEventListener('keydown', function (e) {
  if (mode == 'ignore' && e.key != 'Escape') {
    return true;
  }
  if (ischar(e.key) && (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA')) {
    return true;
  }
  var body = document.documentElement;
  switch (e.key.toUpperCase()) {
    case 'ESCAPE': // 失焦
      e.target.blur();
      mode = 'normal';
      break;
    case 'J': // 向下
      delta.top += step;
      break;
    case 'K': // 向上
      delta.top += - step;
      break;
    case 'H': // 向左
      delta.left += - step;
      break;
    case 'L': // 向右
      delta.left += step;
      break;
    case 'Y': // 到顶部
      body.scrollTop = 0;
      break;
    case 'N': // 到底部
      body.scrollTop = body.scrollTopMax;
      break;
    case 'U': // 上一页
      delta.top += - (body.clientHeight - gap);
      break;
    case 'M': // 下一页
      delta.top += (body.clientHeight - gap);
      break;
    case 'R': // 刷新
      location.reload();
      break;
    case 'X': // 关闭
      // 必须设置：about:config 中的 dom.allow_scripts_to_close_windows 为 true
      window.close();
      break;
    case 'I': // 屏蔽
      mode = 'ignore';
      break;
    default:
      console.log(e);
      break;
  }
});
