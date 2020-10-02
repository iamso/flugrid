/*!
 * flugrid - version 0.3.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2020 Steve Ottoz
 */
"use strict";module.exports=class{constructor({container:t=".flugrid",items:e=".flugrid__item",gutter:i=0,auto:s=!1,rtl:r=!1}={}){this.set({container:t,items:e,gutter:i,rtl:r}),this.auto=!!s,this.init()}init(){this.auto&&(this.build(),this.resizeHandler=this.build.bind(this),window.addEventListener("resize",this.resizeHandler))}set({container:t=this.container,items:e=this.items,gutter:i=this.gutter,rtl:s=this.rtl}={}){this.container=t instanceof Node?t:document.querySelector(t),this.items=this.container?[].slice.call(e instanceof NodeList?e:this.container.querySelectorAll(e),0):[],this.gutter=isFinite(parseInt(i))?parseInt(i):0,this.rtl=!!s}build(){return new Promise(((t,e)=>{if(this.container&&this.items.length){this.container.style.width="";const t=this.container.getBoundingClientRect().width,e=this.items[0].getBoundingClientRect().width+this.gutter,i=Math.max(Math.floor((t-this.gutter)/Math.floor(e)),1),s=[],r=[];this.container.style.width=e*i+this.gutter+"px",this.container.style.position="relative";for(let t=0;t<i;t++)r.push(t*e+this.gutter),s.push(this.gutter);this.rtl&&r.reverse();for(let t of this.items){let e=s.slice(0).sort((function(t,e){return t-e})).shift();e=s.indexOf(e);const i=parseInt(r[e]),n=parseInt(s[e]);t.style.position="absolute",t.style.webkitBackfaceVisibility=t.style.backfaceVisibility="hidden",t.style.transformStyle="preserve-3d",t.style.transform=`translate3D(${i}px, ${n}px, 0)`,s[e]+=t.getBoundingClientRect().height+this.gutter}const n=s.slice(0).sort((function(t,e){return t-e})).pop();this.container.style.height=n+"px"}t(this)}))}reset(){this.container.style.position="",this.container.style.width="",this.container.style.height="";for(let t of this.items)t.style.position="",t.style.webkitBackfaceVisibility=t.style.backfaceVisibility="",t.style.transformStyle="",t.style.transform=""}destroy(){this.reset(),this.auto&&window.removeEventListener("resize",this.resizeHandler)}};