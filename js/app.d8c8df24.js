(function(){"use strict";var e={9684:function(e,n,t){var r=t(6252);function o(e,n,t,o,i,a){const u=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(u)])}var i={name:"App",components:{}},a=t(3744);const u=(0,a.Z)(i,[["render",o]]);var c=u,f=t(9963),s=t(2119);const d=[{path:"/",redirect:"/indexPage"},{path:"/indexPage",name:"indexPage",component:()=>t.e(600).then(t.bind(t,7600))},{path:"/enquireConvertibleBonds",name:"enquireConvertibleBonds",component:()=>t.e(846).then(t.bind(t,5846))},{path:"/handleDAUData",name:"handleDAUData",component:()=>t.e(704).then(t.bind(t,3704))},{path:"/showCube",name:"showCube",component:()=>t.e(749).then(t.bind(t,1749))},{path:"/convertImgIntoCanvas",name:"convertImgIntoCanvas",component:()=>t.e(420).then(t.bind(t,2420))},{path:"/muyu",name:"muyu",component:()=>t.e(408).then(t.bind(t,3004))}],l=(0,s.p7)({history:(0,s.r5)(),routes:d});var p=l,h=t(7371);t(4415);const m=(0,f.ri)(c);m.use(p).use(h.Z).mount("#app")}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={exports:{}};return e[r].call(i.exports,i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,i){if(!r){var a=1/0;for(s=0;s<e.length;s++){r=e[s][0],o=e[s][1],i=e[s][2];for(var u=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(u=!1,i<a&&(a=i));if(u){e.splice(s--,1);var f=o();void 0!==f&&(n=f)}}return n}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[r,o,i]}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+e+"."+{408:"be6cf5f3",420:"f53216bb",600:"4e8b1b38",704:"ac7d4ef1",749:"7559867a",846:"f22f48e7"}[e]+".js"}}(),function(){t.miniCssF=function(e){return"css/"+e+"."+{408:"f72c59be",420:"26b3f717",600:"32488900",704:"fc4f63ec",749:"e2d0ea42",846:"f1cbcad2"}[e]+".css"}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="happy-birthday:";t.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var u,c;if(void 0!==i)for(var f=document.getElementsByTagName("script"),s=0;s<f.length;s++){var d=f[s];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==n+i){u=d;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,t.nc&&u.setAttribute("nonce",t.nc),u.setAttribute("data-webpack",n+i),u.src=r),e[r]=[o];var l=function(n,t){u.onerror=u.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(t)})),n)return n(t)},p=setTimeout(l.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=l.bind(null,u.onerror),u.onload=l.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var e=function(e,n,t,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)t();else{var a=i&&("load"===i.type?"missing":i.type),u=i&&i.target&&i.target.href||n,c=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=u,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=i,o.href=n,document.head.appendChild(o),o},n=function(e,n){for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=t[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===n))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],i=o.getAttribute("data-href");if(i===e||i===n)return o}},r=function(r){return new Promise((function(o,i){var a=t.miniCssF(r),u=t.p+a;if(n(a,u))return o();e(r,u,o,i)}))},o={143:0};t.f.miniCss=function(e,n){var t={408:1,420:1,600:1,704:1,749:1,846:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=r(e).then((function(){o[e]=0}),(function(n){throw delete o[e],n})))}}(),function(){var e={143:0};t.f.j=function(n,r){var o=t.o(e,n)?e[n]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(t,r){o=e[n]=[t,r]}));r.push(o[2]=i);var a=t.p+t.u(n),u=new Error,c=function(r){if(t.o(e,n)&&(o=e[n],0!==o&&(e[n]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;u.message="Loading chunk "+n+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,o[1](u)}};t.l(a,c,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,i,a=r[0],u=r[1],c=r[2],f=0;if(a.some((function(n){return 0!==e[n]}))){for(o in u)t.o(u,o)&&(t.m[o]=u[o]);if(c)var s=c(t)}for(n&&n(r);f<a.length;f++)i=a[f],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(s)},r=self["webpackChunkhappy_birthday"]=self["webpackChunkhappy_birthday"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(9684)}));r=t.O(r)})();
//# sourceMappingURL=app.d8c8df24.js.map