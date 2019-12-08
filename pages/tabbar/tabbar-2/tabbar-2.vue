<template>
	<view class="index">
		<text>{{br}}</text>
		<text>{{br}}</text>
		<text>{{br}}</text>
		<text>{{br}}</text>
		
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header">
			<!-- 定位城市 -->
			<view class="addr">
				<view class="icon location"></view>
				{{ city }}
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input
					placeholder="默认关键字"
					placeholder-style="color:#c0c0c0;"
					
				/>
				<view class="icon search"></view>
			</view>
			<!-- 右侧图标按钮 -->
			<view class="icon-btn">
				<view class="icon yuyin-home"></view>
				<view class="icon tongzhi" ></view>
			</view>
		</view>
		
		
		
		<!-- 发布的约拍 -->
		<view class="card-container cu-card case no-card mb-10"  v-for="(item, index) in jsonArr" v-bind:key="index" >
			
			<view class=" cu-item shadow" @click="goPage('/pages/appointment/appointment-detail?apid=' + item.id)">
				
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
							
							
				<view class="image">
					<image :src="item.image"
					 mode="widthFix"></image>
					<view class="cu-tag bg-blue">标签</view>
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
				
				jsonArr:[]
			}
		},
		onLoad() {
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
			
			
			
		},
		onShow() {
			uni.showLoading({
				title: '加载数据中...',
				mask: false
			});
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
		
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.refreshing = true;
			
		},
		onReachBottom() {
			
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
	background-color: #f1f1f1;
}

.row {
	flex-direction: row;
}

.column {
	flex-direction: column;
}

.card {
	position: relative;
	width: 710upx;
	margin: 20upx 20upx 20upx 20upx;
	border-radius: 10upx;
	overflow: hidden;
	flex-direction: column;
	background-color: #FFFFFF;
}

.card-container{
	margin: 20upx;
	border-radius: 10upx;
	box-shadow: 1px 1px 8px #c1c1c1;
	
	
}

.card-img {
	width: 710upx;
	height: 1065upx;
}

.card-num {
	color: #FFFFFF;
	font-size: 13px;
	text-align: center;
}

.card-num-view {
	background-color: #FF80AB;
    line-height: 1;
    display: inline-block;
	padding: 3px 6px;
    color: #FFFFFF;
    font-size: 12px;
    text-align: center;
	justify-content: center;
    align-items: center;
	border-radius: 15px;
	position: absolute;
	top: 20upx;
	right: 20upx;
}

.card-bottm {
	justify-content: center;
	align-items: center;
}

.card-share-view {
	justify-content: center;
	align-items: center;
	padding: 14upx 0;
	color: #FF80AB;
	margin: 20upx 20upx 20upx;
	font-size: 30upx;
	font-family: texticons;
}

.card-share-view:before {
	content: '\e62d';
}

.car-title-view {
	flex: 1;
	padding: 14upx 0upx 14upx 20upx;
}

.card-title {
	flex: 1;
	font-size: 30upx;
	text-align: left;
	color: #555555;
	text-overflow: ellipsis;
	lines: 2;
	display: -webkit-box;
	white-space: normal;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}





</style>
