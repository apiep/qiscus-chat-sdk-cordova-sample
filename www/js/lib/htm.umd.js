!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.htm=e()}(this,function(){var n=function(e,t,u,r){for(var o=1;o<t.length;o++){var f=t[o],p="number"==typeof f?u[f]:f,s=t[++o];1===s?r[0]=p:3===s?r[1]=Object.assign(r[1]||{},p):5===s?(r[1]=r[1]||{})[t[++o]]=p:6===s?r[1][t[++o]]+=p+"":r.push(s?e.apply(null,n(e,p,u,["",null])):p)}return r},e=function(n){for(var e,t,u=1,r="",o="",f=[0],p=function(n){1===u&&(n||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?f.push(n||r,0):3===u&&(n||r)?(f.push(n||r,1),u=2):2===u&&"..."===r&&n?f.push(n,3):2===u&&r&&!n?f.push(!0,5,r):u>=5&&((r||!n&&5===u)&&(f.push(r,u,t),u=6),n&&(f.push(n,u,t),u=6)),r=""},s=0;s<n.length;s++){s&&(1===u&&p(),p(s));for(var h=0;h<n[s].length;h++)e=n[s][h],1===u?"<"===e?(p(),f=[f],u=3):r+=e:4===u?"--"===r&&">"===e?(u=1,r=""):r=e+r[0]:o?e===o?o="":r+=e:'"'===e||"'"===e?o=e:">"===e?(p(),u=1):u&&("="===e?(u=5,t=r,r=""):"/"===e&&(u<5||">"===n[s][h+1])?(p(),3===u&&(f=f[0]),u=f,(f=f[0]).push(u,2),u=0):" "===e||"\t"===e||"\n"===e||"\r"===e?(p(),u=2):r+=e),3===u&&"!--"===r&&(u=4,f=f[0])}return p(),f},t="function"==typeof Map,u=t?new Map:{},r=t?function(n){var t=u.get(n);return t||u.set(n,t=e(n)),t}:function(n){for(var t="",r=0;r<n.length;r++)t+=n[r].length+"-"+n[r];return u[t]||(u[t]=e(n))};return function(e){var t=n(this,r(e),arguments,[]);return t.length>1?t:t[0]}});
