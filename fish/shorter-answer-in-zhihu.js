// ==UserScript==
// @name        shorter-answer-in-zhihu
// @namespace   redoc
// @include     http://www.zhihu.com/question/*
// @version     1
// @grant       none
// ==/UserScript==

var list = document.querySelectorAll('div.zm-item-answer div.zm-editable-content.clearfix');
for(var i=0; i<list.length; i++)
  list[i].innerHTML = list[i].innerHTML.replace(/(<br>){3,}/g, '<br><br>');
