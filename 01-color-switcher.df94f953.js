!function(){var t={body:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")},n=null,e=!1;function o(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.btnStart.addEventListener("click",(function(){if(e)return;n=setInterval((function(){o()}),1e3),e=!0})),t.btnStop.addEventListener("click",(function(){clearInterval(n),e=!1}))}();
//# sourceMappingURL=01-color-switcher.df94f953.js.map
