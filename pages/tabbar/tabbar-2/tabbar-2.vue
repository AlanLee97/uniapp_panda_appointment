<template>
	<view class="index">

		
		<!-- 定位与天气信息 -->
		<view class="box-shadow-raduis m-20upx p-20upx uni-flex uni-row box-content-align-center" >
			<!-- 定位城市 -->
			<span 
			class="uni-flex-item  " 
			@tap="goPage('/pages/commons/select-city')">
				<image src="../../../static/icon/location.png" mode="" class="icon-size-50upx"></image>
				<text class="p-10upx fontsize-40upx" >
					{{ city }}
				</text>
			</span>
			
			
			<!-- 占位符 -->
			<text class="uni-flex-item text-center fontsize-50upx ">
				
			</text>
			
			<!-- 天气信息 -->
			<view class="uni-flex-item text-center fontsize-80upx font-color-light-black  p-20upx">
				{{weather.temp}}
				<text class="fontsize-50upx p-left-10upx">℃</text>
				<view class="fontsize-30upx">{{weather.weather}}</view>
			</view>
			
			<!-- 天气图片 -->
			<span class="uni-flex-item">
				<image 
				:src="this.getWeatherImg(this.weather.img)" 
				mode="" 
				class="icon-size-150upx  p-20upx"></image>
			</span>
			
		</view>
				
		
		
		
		<!-- 发布的约拍 -->
		<view class="box-shadow-raduis show-bg-red cu-card case no-card m-20upx "  
			v-for="(item, index) in jsonArr" v-bind:key="index" >
			<view class=" cu-item shadow" @click="goPage('/pages/appointment/appointment-detail?apid=' + item.id)">
				<!-- 用户信息 -->
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<image class="cu-avatar round lg" :src="item.tuser.headPortraitImg"></image>
						<view class="content flex-sub">
							<view class="text-grey">{{item.tuser.nickname}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{item.date}}
							</view>
						</view>
					</view>
				</view>	
				
				<!-- 封面图 -->
				<view class="image">
					<image :src="item.image"
					 mode="widthFix"></image>
					 <!-- 标签 -->
					<view class="cu-tag bg-blue" v-if="item.aptType == 1">普通拍照</view>
					<view class="cu-tag bg-blue" v-if="item.aptType == 2">毕业照</view>
					<view class="cu-tag bg-blue" v-if="item.aptType == 3">婚纱照</view>
					<view class="cu-tag bg-blue" v-if="item.aptType == 4">电商模特</view>
					
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.title}}</text></view>
				</view>
				<text>{{br}}</text>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	//高德SDK
	import amap from '@/common/SDK/amap-wx.js';

	var loginResult;
	
	export default {
		onLoad(options) {
			loginResult = this.checkLogin('/pages/tabbar-2/tabbar-2', 0);
			if(!loginResult){return;}
			
			//高德地图
			this.amapPlugin = new amap.AMapWX({
				//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
				key: 'c08443fc8d0bf377d98806a2f30d565a'
			});
			//定位地址
			this.amapPlugin.getRegeo({
				success: data => {
					this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉
					// #ifdef APP-PLUS
					this.nVueTitle.postMessage({type: 'location',city:this.city});
					// #endif
				}
			}); 
			console.log(options);
		},
		
		onShow() {
			uni.showLoading({
				title: '加载数据中...',
				mask: false
			});
			//获取城市
			this.getCity();
			//获取约拍信息
			this.getAppointmentUser();
			//获取天气信息
			this.getWeatherInfo(this.city);
		},
		
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.refreshing = true;
			
		},
		onReachBottom() {
			
		},
		
		data() {
			return {
				br:'\n',
				refreshing: false,
				lists: [],
				fetchPageNum: 1,
				
				showHeader:true,
				afterHeaderOpacity: 1,//不透明度
				headerPosition: '',
				
				
				statusTop:null,
				nVueTitle:null,
				city: '北京',
				currentSwiper: 0,
				
				jsonArr:[],
				weather:{}
				
				
			}
		},
		
		methods: {
			goPage:function(url){
				uni.navigateTo({
					url: url,
					success: res => {
						console.log('navigateTo-->url:');
						console.log(url);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//获取约拍信息
			getAppointmentUser:function(){
				uni.request({
					url: this.createApiUrl('appointment/get/apt-user'),
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						this.jsonArr = res.data.data;
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {}
				});
			},
			
			//获取城市
			getCity:function(){
				let city = uni.getStorageSync('apt-city');
				console.log(city);
				this.city = city;
			},
			
			//获取天气信息
			getWeatherInfo:function(city){
				uni.request({
					url: 'http://jisutqybmf.market.alicloudapi.com/weather/query',
					method: 'GET',
					header:{
						Authorization: "APPCODE 22d4a321bdaf4eefbe6709bd7d4e2ed1"
					},
					data: {
						city:city
					},
					success: res => {
						console.log(res);
						this.weather = res.data.result;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//获取天气图片：传入天气图片文件名
			getWeatherImg:function(imgName){
				return '/static/icon/weathercn/' + imgName + '.png';
			}
			
		}
	}
</script>

<style>
@font-face {
	font-family: texticons;
	font-weight: normal;
	font-style: normal;
	src: url('https://at.alicdn.com/t/font_702773_g9f89om4v3j.ttf') format('truetype');
}

.index {
	flex: 1;
    width: 750upx;
    min-height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #fcfcfc;
}






</style>
