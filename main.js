import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.checkLogin = function(backpage, backtype){
	var SUID = uni.getStorageSync('SUID');
	var SRAND = uni.getStorageSync('SRAND');
	var SNAME = uni.getStorageSync('SNAME');
	var SFACE = uni.getStorageSync('SFACE');
	if(SUID == '' || SRAND == '' || SFACE== ''){
		uni.redirectTo({
			url:'/pages/user/login?backpage=' + backpage + '&backtype=' + backtype
		});
		return false;
	}
	return {
		SUID:'',
		SRAND:'',
		SNAME:'',
		SFACE:''
	}
}

// let domain = 'localhost';
let domain = '47.103.204.62';
let port = '8083';

Vue.prototype.createApiUrl = function(reqUrl){
	return 'http://' + domain + ':' + port + '/' + reqUrl;
}

Vue.prototype.getUserInfo = function(){
	let userinfo = uni.getStorageSync('userinfo');
	// console.log('main.js -> userinfo:');
	// console.log(userinfo);
	return userinfo;
}

Vue.prototype.gotoPage = function (pageUrl){
	uni.navigateTo({
		url: pageUrl
	});
}

Vue.prototype.previewImage = function(index, urls){
	uni.previewImage({
		current:index,
		urls:urls,
		indicator:"default"
	})
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
