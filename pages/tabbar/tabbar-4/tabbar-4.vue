<template>
	<view>
		
		
		
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
		
		
		
		
		<view>
			<view class="QS-tabs-box">
				<QSTabs 
				ref="tabs" 
				:tabs="tabs" 
				animationMode="line3" 
				:current="current" 
				@change="change"
				activeColor="#adadad"
				swiperWidth="750">
				</QSTabs>
			</view>
			<swiper 
			:style="{'height': '1800rpx'}" 
			:current="current" 
			@change="swiperChange" 
			@transition="transition"
			@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, swindex) in tabs" :key="swindex">
					
					<scroll-view scroll-y style="height: 100%;width: 100%;" >
						<view class="scroll-items">
							
							<!-- 作品展示 -->
							<block v-if="swindex === 0" v-for="(list, index) in 1" :key="index">
								<view class="row bgcolor-grey-fcfcfc">
									<view class="card card-list2 box-shadow" 
									v-for="(item,key) in worksData" 
									@click="goPage('/pages/works/works-detail?worksId=' + item.id)" 
									v-if="item.images.length != 0"
									:key="key">
										<view class="" >
											<image class="card-img card-list2-img"
											  :src="item.images[0]"
											  mode="widthFix"></image>
											<text class="card-num-view card-list2-num-view">{{item.images.length}}P</text>
											<view class="card-bottm row">
												<view class="car-title-view row">
													<image :src="item.tuser.headPortraitImg" mode="" class="icon-size-100upx"></image>
													<text class="card-title card-list2-title">
														{{item.tuser.nickname}}
													</text>
												</view>
												
											</view>
										</view>
										
										
									</view>
								</view>
							</block>
							
							
							
							<!-- 摄影技巧 -->
							<view class="cu-card case no-card mb-10" v-if="swindex === 1" v-bind:key="item">
								<view class="">
									<br>
									<view class="box-content-align-center">
										这里空空如也
									</view>
									<view class="p-40upx" >
										<image src="/static/img/no.png" class="icon-size-200upx" mode="widthFix"></image>
									</view>
								</view>
							</view>
							
							
							<!-- tab3 -->
							<view class="cu-card case no-card mb-10" v-if="swindex === 2" v-bind:key="item">
								<view class="">
									<br>
									<view class="box-content-align-center">
										这里空空如也
									</view>
									<view class="p-40upx" >
										<image src="/static/img/no.png" class="icon-size-200upx" mode="widthFix"></image>
									</view>
								</view>
							</view>
							
						</view>
					</scroll-view>
					
					 
					 
				</swiper-item>
			</swiper>
		</view>
		
		
		
	</view>
</template>

<script>
	import QSTabs from '../../../components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			QSTabs
		},
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
				
				imgurl:"https://hbimg.huabanimg.com/4cb5b23c18158e4021d3d87983a201187bf317353cef6-mO3Eim_fw658",
				
				//摄影技巧
				
				
				br:'\n',
				tabs: ['作品展示','摄影技巧','其他'],
				current: 0,
				tabsHeight: 0,
				dx: 0,
				
				//瀑布流
				
				refreshing: false,
				lists: [],
				fetchPageNum: 1,
				
				
				worksData:{},
			};
		},
		onShow() {
			this.getWorksAndUser();
		},
		onPullDownRefresh() {
			this.getWorksAndUser();
			setTimeout(function(){
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			goPage:function(pagePath){
				this.gotoPage(pagePath);
			},
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
			
			//滑动tab栏的方法
			change(index) {
				this.current = index;
			},
			swiperChange({detail: { current }}) {
				this.current = current;
			},
			transition({detail: { dx }}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: { current }}) {
				this.$refs.tabs.setFinishCurrent(current);
			},
			
			
			getWorksAndUser:function(){
				uni.request({
					url: this.createApiUrl('works/get/all-user'),
					method: 'GET',
					data: {},
					success: res => {
						this.worksData = res.data.data;
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
	.mb-10{
		margin-bottom: 10px;
	}
	
	/*瀑布流样式*/
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
		background-color: #888888;
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
	
	
	/*双列表*/
	
	.card-list2 {
		width: 345upx;
		margin: 20upx 0 20upx 20upx;
		display: inline-block;
	}
	
	.card-list2-img {
		width: 345upx;
		height: 517upx;
	}
	
	.card-list2-num-view {
		transform: scale(0.8);
	    transform-origin: right;
	}
	
	.card-list2-num {
		font-size: 22upx;
	}
	
	.card-list2-title {
		font-size: 26upx;
	}
	
	
	.loadMore {
		font-size: 30upx;
		color: #555;
		margin-bottom: 20upx;
	}
	
	
	
	
	/*滑动tab栏的样式*/
	.QS-tabs-box{
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: white;
	}
	.swiper-item{
		background-color: #fff;
	}
	.scroll-items{
		display: flex;
		flex-direction: column;
		width: 100%;
		/* padding: 40rpx; */
	}
	.scroll-item{
		margin-top: 15rpx;
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
		font-weight: bold;
		margin-left: 15rpx;
	}
	.scroll-item-image{
		border-radius: 4rpx;
		width: 180rpx;
		height: 150rpx;
	}
</style>
