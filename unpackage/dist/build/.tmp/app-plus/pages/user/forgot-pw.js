(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/forgot-pw"],{"495f":function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){return n.e("components/cmd/cmd-nav-bar/cmd-nav-bar").then(n.bind(null,"a8af"))},i=function(){return n.e("components/cmd/cmd-page-body/cmd-page-body").then(n.bind(null,"d13e"))},s=function(){return n.e("components/cmd/cmd-transition/cmd-transition").then(n.bind(null,"08c8"))},c=function(){return n.e("components/cmd/cmd-input/cmd-input").then(n.bind(null,"3f6c"))},r={components:{cmdNavBar:a,cmdPageBody:i,cmdTransition:s,cmdInput:c},data:function(){return{mobile:{phone:"",code:"",passwordOne:"",passwordTwo:""},passwordReg:/^\w+$/,phoneReg:/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,safety:{time:60,state:!1,interval:""},forgotMobile:!1}},watch:{mobile:{handler:function(e){this.phoneReg.test(e.phone)&&6==e.code.length&&e.passwordOne.length>=8&&e.passwordOne==e.passwordTwo?this.forgotMobile=!0:this.forgotMobile=!1},deep:!0}},methods:{fnForgot:function(){console.log(e(JSON.stringify(this.mobile)," at pages\\user\\forgot-pw.vue:83"))},fnGetPhoneCode:function(){var e=this;this.phoneReg.test(this.mobile.phone)?o.showToast({title:"正在发送验证码",icon:"loading",success:function(){e.safety.state=!0,e.safety.interval=setInterval(function(){e.safety.time--<=0&&(e.safety.time=60,e.safety.state=!1,clearInterval(e.safety.interval))},1e3),o.showToast({title:"发送成功",icon:"success"})}}):o.showToast({title:"手机号不正确",icon:"none"})}},beforeDestroy:function(){clearInterval(this.safety.interval)}};t.default=r}).call(this,n("0de9")["default"],n("6e42")["default"])},"53a5":function(e,t,n){"use strict";(function(e){n("8f0e"),n("921b");o(n("66fd"));var t=o(n("de6e"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"54d9":function(e,t,n){"use strict";n.r(t);var o=n("495f"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=a.a},bb5f:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){!e.safety.state&&e.fnGetPhoneCode()})},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},d503:function(e,t,n){"use strict";var o=n("ee87"),a=n.n(o);a.a},de6e:function(e,t,n){"use strict";n.r(t);var o=n("bb5f"),a=n("54d9");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("d503");var s=n("2877"),c=Object(s["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=c.exports},ee87:function(e,t,n){}},[["53a5","common/runtime","common/vendor"]]]);