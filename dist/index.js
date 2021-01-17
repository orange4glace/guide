!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Guide=e():t.Guide=e()}(self,(function(){return(()=>{"use strict";var t={93:(t,e,i)=>{i.r(e),i.d(e,{Guide:()=>n});var r=function(){return(r=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},o={minGridLength:80,gridProvider:function(t,e){return e>=4?{gridSize:30*Math.pow(2,e-4),subgrids:10}:{gridSize:[1,2,5,10][e],subgrids:10}},theme:{backgroundColor:"#232323",gridColor:"#4f4f4f",textColor:"#a3a3a3"}},n=function(){function t(t,e,i,n){this.parent_=t,this.canvasEl_=document.createElement("canvas"),this.ctx_=this.canvasEl_.getContext("2d"),this.parent_.append(this.canvasEl_),this.updateOption(r(r({},o),e)),this.layout(i,n)}return Object.defineProperty(t.prototype,"option",{get:function(){return this.option_},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this.width_},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.height_},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"start",{get:function(){return this.start_},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"end",{get:function(){return this.end_},enumerable:!1,configurable:!0}),t.prototype.updateOption=function(t){this.option_=r(r({},this.option_),t),this.update()},t.prototype.layout=function(t,e){this.width_=t,this.height_=e,this.canvasEl_.width=t,this.canvasEl_.height=e,this.update()},t.prototype.setRange=function(t,e){this.start_=t,this.end_=e,this.update()},t.prototype.findAppropriateGridSize=function(){for(var t,e=this.option_.minGridLength,i=this.width/(this.end-this.start),r=0,o=1e7;r<=o;){var n=Math.floor((r+o)/2),s=this.option_.gridProvider(this,n);s.gridSize*i<e?r=n+1:(t=s,o=n-1)}return t},t.prototype.update=function(){this.ctx_.fillStyle=this.option_.theme.backgroundColor,this.ctx_.fillRect(0,0,this.width,this.height),this.ctx_.strokeStyle=this.option_.theme.gridColor;var t=this.findAppropriateGridSize(),e=this.end-this.start,i=this.width/e,r=Math.floor(this.start/t.gridSize)*t.gridSize,o=Math.ceil(this.end/t.gridSize)*t.gridSize,n=i*this.start;this.ctx_.save(),this.ctx_.translate(Math.round(-n),0),this.ctx_.translate(.5,.5);for(var s=r;s<o;s+=t.gridSize){var h=Math.floor(i*s);this.ctx_.beginPath(),this.ctx_.moveTo(h,this.height),this.ctx_.lineTo(h,15),this.ctx_.stroke();var a=this.option_.textProvider&&this.option_.textProvider(s);if(a){var p=this.ctx_.measureText(a),d=Math.floor(h-p.width/2);this.ctx_.fillStyle=this.option_.theme.textColor,this.ctx_.fillText(a,d,10)}for(var c=1;c<t.subgrids;c++){var u=s+t.gridSize/t.subgrids*c,f=Math.floor(i*u);this.ctx_.beginPath(),this.ctx_.moveTo(f,this.height),this.ctx_.lineTo(f,20),this.ctx_.stroke()}}this.ctx_.restore()},t}()}},e={};function i(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r](o,o.exports,i),o.exports}return i.d=(t,e)=>{for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i(93)})()}));
//# sourceMappingURL=index.js.map