(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/QS-tabs/QS-tabs"],{"04e9":function(t,e,n){"use strict";n.r(e);var i=n("d3dc"),r=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=r.a},"6ab8":function(t,e,n){},"8f52":function(t,e,n){"use strict";n.r(e);var i=n("a131"),r=n("04e9");for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);n("d444");var u=n("2877"),a=Object(u["a"])(r["default"],i["a"],i["b"],!1,null,"117b331b",null);e["default"]=a.exports},a131:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,Number(t.zIndex)),i=Number(t.zIndex);t.$mp.data=Object.assign({},{$root:{m0:n,m1:i}})},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},d3dc:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t.getSystemInfoSync(),i=n.windowWidth,r={props:{tabs:{type:Array,default:function(){return[]}},current:{type:Number,default:0},height:{type:[String,Number],default:80},width:{type:[String,Number],default:250},fontSize:{type:[String,Number],default:30},duration:{type:[String,Number],default:.5},activeColor:{type:String,default:"#33cc33"},defaultColor:{type:String,default:"#888"},animationLineWidth:{type:[String,Number],default:20},line2Style:{type:String,default:"height: 8rpx;border-radius: 4rpx;"},animationMode:{type:String,default:"line1"},autoCenter:{type:Boolean,default:!0},autoCenterMode:{type:String,default:"component"},activeStyle:{type:String,default:"bottom:0;left:50%;transform: translate(-50%,-100%);height: 8rpx;border-radius:4rpx;"},defaultStyle:{type:String,default:"bottom:0;left:50%;transform: translate(-50%,-100%);height: 8rpx;border-radius:4rpx;"},backgroundColor:{type:String,default:"rgba(255,255,255,0)"},hasItemBackground:{type:Boolean,default:!1},itemBackgroundColor:{type:String,default:"rgba(255,255,255,0)"},itemBackgroundStyle:{type:String,default:""},zIndex:{type:[String,Number],default:99},swiperWidth:{type:[String,Number],default:750}},computed:{getCurrent:function(){var t=Number(this.current);return t>this.getTabs.length-1?this.getTabs.length-1:t},getTabs:function(){return this.tabs},getHeight:function(){return Number(this.height)},getWidth:function(){return Number(this.width)},getFontSize:function(){return this.fontSize},getDuration:function(){return Number(this.duration)},getBgColor:function(){var t=this.backgroundColor||"rgba(255,255,255,0)";return this.getTabs[this.getCurrent]instanceof Object&&this.getTabs[this.getCurrent].backgroundColor||t},getItemBackgroundColor:function(){var t=this.itemBackgroundColor||"rgba(255,255,255,0)";return this.getTabs[this.getCurrent]instanceof Object&&this.getTabs[this.getCurrent].itemBackgroundColor||t},getDurationStyle:function(){return"transition-duration: ".concat(this.getDuration,"s;")},getActiveColor:function(){var t;return t=this.getTabs[this.getCurrent]instanceof Object&&this.getTabs[this.getCurrent].activeColor?this.getTabs[this.getCurrent].activeColor:this.activeColor,t},getDefaultColor:function(){var t;return t=this.getTabs[this.getCurrent]instanceof Object&&this.getTabs[this.getCurrent].defaultColor?this.getTabs[this.getCurrent].defaultColor:this.defaultColor,t},getActiveStyle:function(){return"width:".concat(this.animationLineWidth,"%;background-color:").concat(this.getActiveColor,";").concat(this.activeStyle,";")},getDefaultStyle:function(){return"width:0;background-color:".concat(this.getActiveColor,";").concat(this.defaultStyle,";")},getLinezIndexNum:function(){return Number(this.zIndex)+2},getLinezIndex:function(){return"z-index: ".concat(this.getLinezIndexNum,";")},getLw:function(){var t=Number(this.line2Width),e=Number(this.width)*(t/100);return e},getBoxStyle2:function(){var t=this.getLw,e=Number(this.width)*(this.getCurrent+1)-Number(this.width)/2-t/2;return"transform:translate(".concat(e,"rpx, -100%);width:").concat(this.getLw,"rpx;background-color: ").concat(this.getActiveColor,";").concat(this.line2Style,";")},getItemBackgroundBoxStyle:function(){return"height: ".concat(this.getHeight,"rpx;\n\t\t\t\t\twidth: ").concat(this.getWidth,"rpx;\n\t\t\t\t\tz-index: ").concat(Number(this.zIndex)+1,";\n\t\t\t\t\ttransition-duration: ").concat(this.getDuration,"s;\n\t\t\t\t\ttransform: translateX(").concat(Number(this.width)*this.getCurrent,"rpx);")},getItemBackgroundStyle:function(){return"transition-duration: ".concat(this.getDuration,"s;\n\t\t\t\t\tbackground-color: ").concat(this.getItemBackgroundColor,";\n\t\t\t\t\tbox-shadow: 0 0 5rpx 5rpx ").concat(this.getItemBackgroundColor,";\n\t\t\t\t\t").concat(this.itemBackgroundStyle,";")},getFinishDx:function(){var t=this.getLw,e=Number(this.animationFinishCurrent),n=e+1,i=Number(this.width)*n,r=Number(this.width)/2,o=t/2,u=i-r-o;return u},getDxNum:function(){var t=Number(this.swiperWidth)/750*i,e=this.dx/t,n=Number(this.width),r=e*n;return r},getBoxStyle3:function(){var t=this.getFinishDx+this.getDxNum;return"transform:translate(".concat(t,"rpx, -100%);width:").concat(this.getLw,"rpx;background-color: ").concat(this.getActiveColor,";").concat(this.line2Style,";")}},watch:{current:function(t,e){this.change(t)}},data:function(){return{left:0,line2Width:Number(this.animationLineWidth),setTimeoutFc:null,componentsWidth:0,animationFinishCurrent:this.current,dx:0}},onReady:function(){var t=this;this.getQuery(function(){t.countScrollX()})},methods:{emit:function(t){this.$emit("change",t)},change:function(){var t=this;this.countScrollX(),"line2"===this.animationMode&&(this.line2Width=2,this.setTimeoutFc&&clearTimeout(this.setTimeoutFc),this.setTimeoutFc=setTimeout(function(){t.line2Width=t.animationLineWidth},1e3*this.getDuration*3/5))},getQuery:function(e){var n=this;try{var r=t.createSelectorQuery().in(this).select(".QS-tabs");r.fields({size:!0},function(t){t?(n.componentsWidth=t.width,e&&"function"===typeof e&&e(t)):n.retryGetQuery(e)}).exec()}catch(o){this.componentsWidth=i}},retryGetQuery:function(){var e=this;try{var n=t.createSelectorQuery().select(".QS-tabs");n.fields({size:!0},function(t){e.componentsWidth=t?t.width:i,cb&&"function"===typeof cb&&cb(t)}).exec()}catch(r){this.componentsWidth=i}},countScrollX:function(){if(this.autoCenter){var t,e=Number(this.width),n=e/750*i,r=n*(this.getCurrent+1)-n/2;t="window"===this.autoCenterMode?i:this.componentsWidth,this.left=r-t/2}},setDx:function(t){this.dx=t},setFinishCurrent:function(t){this.dx=0,this.animationFinishCurrent=t}}};e.default=r}).call(this,n("543d")["default"])},d444:function(t,e,n){"use strict";var i=n("6ab8"),r=n.n(i);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/QS-tabs/QS-tabs-create-component',
    {
        'components/QS-tabs/QS-tabs-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8f52"))
        })
    },
    [['components/QS-tabs/QS-tabs-create-component']]
]);                
