(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{358:function(t,e,n){!function(t){"use strict";var e={},n={inheritAttrs:!1,render:function(t){return this.svgElSource?t("svg",{on:this.$listeners,attrs:Object.assign(this.getSvgAttrs(this.svgElSource),(e=this.$attrs,Object.keys(e).reduce((function(t,n){return!1!==e[n]&&null!==e[n]&&void 0!==e[n]&&(t[n]=e[n]),t}),{}))),domProps:{innerHTML:this.getSvgContent(this.svgElSource)}}):null;var e},props:{src:{type:String,required:!0},title:{type:String},transformSource:{type:Function,default:function(t){return t}},keepDuringLoading:{type:Boolean,default:!0}},data:function(){return{svgElSource:null}},watch:{src:function(t){this.getSource(t)}},mounted:function(){this.getSource(this.src)},methods:{getSvgAttrs:function(t){var e={},n=t.attributes;if(!n)return e;for(var i=n.length-1;i>=0;i--)e[n[i].name]=n[i].value;return e},getSvgContent:function(t){return t=t.cloneNode(!0),t=this.transformSource(t),this.title&&function(t,e){var n=t.getElementsByTagName("title");if(n.length)n[0].textContent=e;else{var i=document.createElementNS("http://www.w3.org/2000/svg","title");i.textContent=e,t.appendChild(i)}}(t,this.title),t.innerHTML},getSource:function(t){var n=this;e[t]||(e[t]=this.download(t)),this.svgElSource&&e[t].isPending()&&!this.keepDuringLoading&&(this.svgElSource=null,this.$emit("unloaded")),e[t].then((function(t){n.svgElSource=t,n.$nextTick((function(){n.$emit("loaded",n.$el)}))})).catch((function(i){n.svgElSource&&(n.svgElSource=null,n.$emit("unloaded")),delete e[t],n.$emit("error",i)}))},download:function(t){return function(t){if(t.isPending)return t;var e=!0,n=t.then((function(t){return e=!1,t}),(function(t){throw e=!1,t}));return n.isPending=function(){return e},n}(new Promise((function(e,n){var i=new XMLHttpRequest;i.open("GET",t,!0),i.onload=function(){if(i.status>=200&&i.status<400)try{var t=(new DOMParser).parseFromString(i.responseText,"text/xml").getElementsByTagName("svg")[0];t?e(t):n(new Error('Loaded file is not valid SVG"'))}catch(t){n(t)}else n(new Error("Error loading SVG"))},i.onerror=n,i.send()})))}}},i={install:function(t){t.component("inline-svg",n)}};t.InlineSvgComponent=n,t.InlineSvgPlugin=i,t.default=n,Object.defineProperty(t,"__esModule",{value:!0})}(e)},364:function(t,e,n){"use strict";n.r(e);var i=n(358),r=n.n(i),o=n(331),s={name:"HomePage",components:{InlineSvg:r.a,Navbar:o.a},computed:{data:function(){return this.$page.frontmatter},shouldShowNavbar:function(){var t=this.$site.themeConfig;return!1!==this.$page.frontmatter.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav||this.$themeLocaleConfig.nav)},shouldShowSidebar:function(){var t=this.$page.frontmatter;return!t.home&&!1!==t.sidebar&&this.sidebarItems.length}},methods:{toggleSidebar:function(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)}}},a=n(45),u=Object(a.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$page.frontmatter.home?n("main",{staticClass:"home-layout"},[t.shouldShowNavbar?n("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),n("div",{staticClass:"column-1"},[n("inline-svg",{staticClass:"home-image",attrs:{src:t.data.heroImage}})],1),t._v(" "),n("div",{staticClass:"column-2"},[n("h1",{staticClass:"home-heading"},[t._v("Welcome to"),n("br"),t._v(t._s(t.$site.title))]),t._v(" "),n("h2",{staticClass:"home-subheading"},[t._v(t._s(t.data.tagline))]),t._v(" "),n("p",{staticClass:"home-description"},[t._v(t._s(t.data.description))])])],1):t._e()}),[],!1,null,null,null);e.default=u.exports}}]);