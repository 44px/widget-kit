!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="https://44px.github.io/widget-kit/popup",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i="@widget-kit/rpc/request",r="@widget-kit/rpc/response";function o(e,t,n){void 0===n&&(n="*");var o=function(e){return t.postMessage(e,n)},u={};function a(e){var t=u[e.method];if("function"==typeof t){t.apply(void 0,[function(t,n){o(function(e,t,n){return{payload:t,error:n,type:r,sequenceId:e.sequenceId}}(e,t,n))}].concat(e.args))}}var d={};e.addEventListener("message",function(e){if(function(e,t,n){return e.source===t&&("*"===n||e.origin===n)}(e,t,n)){var o,c,f=function(e){if(e&&"number"==typeof e.sequenceId&&"string"==typeof e.type)return e;return null}(e.data);if(f)switch(f.type){case i:return a(f);case r:return void("function"==typeof(c=d[(o=f).sequenceId])&&(c(o),delete u[o.sequenceId]))}}});var c,f=(c=0,function(){return c+=1});return{handle:function(e,t){if("function"==typeof u[e])throw new Error("Handler for "+e+" already declared");u[e]=t},send:function(e,t){e.sequenceId=f(),t&&(d[e.sequenceId]=t),o(e)}}}function u(e,t){return void 0===t&&(t="*"),o(window,e,t)}var a=function(e,t){void 0===t&&(t={});var n=window.document,i=t.parentElement||n.body,r=n.createElement("iframe");r.src=e,r.frameBorder="0",r.scrolling="no",i.appendChild(r);var o=u(r.contentWindow,function(e,t){var n=t.match(/^(https?:)?\/\/[.\w]+(:\d+)?/i);if(!n)throw new Error("Invalid url");return n[0].replace(/^\/\//,e.location.protocol+"//")}(window,e));return{send:o.send,handle:o.handle,iframe:r}}(n.p+"/widget.html");!function(e,t){void 0===t&&(t={});var n=e.iframe,i=e.handle;function r(e){e.width&&(n.style.width=e.width),e.height&&(n.style.height=e.height),e.maxWidth&&(n.style.maxWidth=e.maxWidth),e.maxHeight&&(n.style.maxHeight=e.maxHeight)}t.initialSize&&r(t.initialSize),i("plugins.size.setSize",function(e,t){r(t)})}(a,{initialSize:{width:"0",height:"0"}}),function(e,t){void 0===t&&(t={});var n=e.iframe,i=e.handle;function r(e){e.top&&(n.style.top=e.top),e.left&&(n.style.left=e.left),e.right&&(n.style.right=e.right),e.bottom&&(n.style.bottom=e.bottom)}n.style.position="fixed",t.initialPosition&&r(t.initialPosition),i("plugins.positionFixed.setPosition",function(e,t){r(t)})}(a)}]);
//# sourceMappingURL=loader.js.map