{"filter":false,"title":"requestAnimationFrame.js","tooltip":"/client/js/requestAnimationFrame.js","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":10,"column":5},"action":"insert","lines":["// shim layer with setTimeout fallback","window.requestAnimFrame = (function(){","  return  window.requestAnimationFrame       || ","          window.webkitRequestAnimationFrame || ","          window.mozRequestAnimationFrame    || ","          window.oRequestAnimationFrame      || ","          window.msRequestAnimationFrame     || ","          function(/* function */ callback, /* DOMElement */ element){","            window.setTimeout(callback, 1000 / 60);","          };","})();"],"id":1}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":10,"column":5},"end":{"row":10,"column":5},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":11,"mode":"ace/mode/javascript"}},"timestamp":1447181102000,"hash":"490fb310a9e7251d26825938534493ae60ac8fbe"}