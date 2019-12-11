<template>
	<view>
		<!-- #ifndef MP-ALIPAY -->
		<!-- 顶部轮播图 -->
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- #endif -->
		
		<view class="cu-bar  bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-green">最新约拍</text>
				<text class="bg-green" style="width:2rem"></text>
				<!-- last-child选择器-->
			</view>
		</view>
		
		<!-- 最新约拍 -->
		<scroll-view scroll-y style="height: 100%;width: 100%;" >
			<view class="scroll-items">
				<view class="scroll-item" 
					@tap="gotoPage('/pages/appointment/appointment-detail?apid=' + item.id)"
					v-for="(item, index) in newestApt" 
					:key="index">
					<view class="scroll-item-image-box">
						<image :src="item.image" mode="aspectFill" class="scroll-item-image"></image>
					</view>
					<view class="scroll-item-text-box">
						<view class="fontsize-50upx font-weight-200">
							{{item.title}}
						</view>
						<view>
							{{item.address}}
						</view>
						<view>
							约拍时间：{{item.startDatetime}}
						</view>
						
						<view>
							发布于：{{item.date}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		
		
		<view class="cu-bar  bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-green">模特推荐</text>
				<text class="bg-green" style="width:2rem"></text>
				<!-- last-child选择器-->
			</view>
		</view>
		
		<!-- 模特推荐 -->
		<scroll-view class="slider" scroll-x="true">
			<template v-for="(item,i) in 6">
				<view :key="'item_'+i" class="s_item">
					<view class="recommend-box">
						<image src="../../../static/panda.png" class="recommend-img"></image>
						<text class="name">Alan</text>
						<text class="desc">专业模特</text>
						<text class="btn">去约拍</text>
					</view>
				</view>
			</template>
		</scroll-view>
		
		
		<view class="cu-bar  bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-green">摄影师推荐</text>
				<text class="bg-green" style="width:2rem"></text>
				<!-- last-child选择器-->
			</view>
		</view>
		
		<!-- 摄影师推荐 -->
		<scroll-view class="slider" scroll-x="true">
			<template v-for="(item,i) in 6">
				<view :key="'item_'+i" class="s_item">
					<view class="recommend-box">
						<image src="../../../static/panda.png" class="recommend-img"></image>
						<text class="name">Alan</text>
						<text class="desc">专业摄影师</text>
						<text class="btn">去约拍</text>
					</view>
				</view>
			</template>
		</scroll-view>
		
	
		
		
		<view class="cu-bar  bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-green">动态</text>
				<text class="bg-green" style="width:2rem"></text>
				<!-- last-child选择器-->
			</view>
		</view>
	
		
		<!-- 动态 -->
		<view class="cu-card dynamic no-card " v-for="(item, index) in worksAndUser" :key='index'>
			<view class="cu-item shadow ">
				<view class="bgcolor-grey-fcfcfc ">
					<view class="p-20upx mt-20upx bgcolor-white-ffffff box-raduis box-shadow">
						<!-- 用户信息部分 -->
						<view class="cu-list menu-avatar">
							<view class="cu-item ">
								<!-- 头像 -->
								<view class="cu-avatar round lg" >
									<image class="cu-avatar round lg" :src="item.tuser.headPortraitImg" @tap="gotoPage('/pages/user/profile?uid=' + item.tuser.id)"></image>
								</view>
								<!-- 昵称与时间 -->
								<view class="content flex-sub">
									<view>
										<!-- 昵称 -->
										<view class="width-50">
											{{item.tuser.nickname}}
										</view>
										
										<!-- 时间 -->
										<view class="text-gray text-sm flex width-50">
											
											<view class="width-100 text-right">
												{{item.datetime}}
											</view>
										</view>
									</view>
									<view>
										<view v-if="item.tuser.identity == 0" class="text-gray text-sm flex justify-between">
											摄影师
										</view>
										<view v-if="item.tuser.identity == 1" class="text-gray text-sm flex justify-between">
											模特
										</view>
									</view>
									
								</view>
							</view>
						</view>
						
						<!-- 发布的内容 -->
						<view class="text-content m-20upx ">
							{{item.introduction}}
						</view>
						
						<!-- 配图 -->
						<view class="grid flex-sub padding-lr" :class="item.images.length > 1 ?'col-3 grid-square':'col-1'">		
							<view v-for="(imgurl, img_index)  in item.images" :key="img_index">
								<image @tap="previewImage(img_index, item.images)" :src="imgurl" mode="aspectFill"></image>
							</view>
							
						</view>
					</view>		
				</view>	
			</view>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				isCard: true,
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/DTb3l563tdj4oLwmdj6soz0oUN0WiIi6HTayN4oa8B3.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/IJMyc5AM3BV3KopTfIHaHF6nG56XGMJpcoZD9M5p2Gv.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/QlOpWqTDznuWIOABg5djTreijHQs6WzUzsVu0rBHghN.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://qzonestyle.gtimg.cn/qzone/qzactStatics/imgs/20171122191532_f2975b.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://cdn-isux.qq.com/upload/detail/f57Y2wEryDwjWmTr2BypYaCA6CgSKjknAJtGRIR4FcR.jpeg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/2LtQ2KZEDOUFAcWfLEzL49EKXsDPVjeOv2NtsWFLbZP.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/UlS5cEY2AksTMvw9EWUDEx5p6yqFrhnj6oYrkpBcglk.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				worksAndUser:[],
				newestApt:[],
				
				
			};
		},
		onLoad() {
			//this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		onShow() {
			//获取最新约拍
			this.getNewestApt();
			
			
			//获取用户动态
			this.getWorksAndUser();
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			
			//获取最新约拍
			getNewestApt:function(){
				uni.request({
					url: this.createApiUrl('appointment/get/newest'),
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						res = res.data.data;
						this.newestApt = res;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//获取用户动态
			getWorksAndUser:function(){
				uni.request({
					url: this.createApiUrl('works/get/all-user'),
					method: 'GET',
					data: {},
					success: res => {
						
						res = res.data.data;
						this.worksAndUser = res;
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	
	
	.recommend-img {
		margin-top: 10px;
		width: 50px;
		height: 50px;
	}
	
	.slider {
		white-space: nowrap;
		width: 100%;
	}
	
	.s_item {
		display: inline-block;
		width: 35%;
		margin-left: 20px;
		margin-bottom: 10px;
	}
	
	.recommend-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: white;
		margin-top: 5px;
		box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);
	}
	
	
	
	/* 最新约拍 内容样式 */
	.scroll-items{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 10rpx;
	}
	.scroll-item{
		margin-top: 10rpx;
		padding: 25rpx;
		background-color: white;
		border-radius: 8rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		border: 1px solid #f8f8f8;
	}
	.scroll-item-image-box{
		flex-grow: 0;
	}
	.scroll-item-text-box{
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 28rpx;
		
		margin-left: 15rpx;
	}
	.scroll-item-image{
		border-radius: 4rpx;
		width: 180rpx;
		height: 150rpx;
	}
	
	
</style>
