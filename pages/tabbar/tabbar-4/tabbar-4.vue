<template>
	<view>
		
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
								<view class="row">
									<view class="card card-list2" v-for="(item,key) in 10" @click="goDetail(item)" :key="key">
										<image class="card-img card-list2-img" :src="imgurl"></image>
										<text class="card-num-view card-list2-num-view">{{key + 1}}P</text>
										<view class="card-bottm row">
											<view class="car-title-view row">
												<text class="card-title card-list2-title">拍照</text>
											</view>
											<view @click.stop="share(item)" class="card-share-view"></view>
										</view>
									</view>
								</view>
							</block>
							
							
							
							<!-- 摄影技巧 -->
							<view class="cu-card case no-card mb-10" v-if="swindex === 1" v-for="item in 10" v-bind:key="item">
								<view class="cu-item shadow">
									<view class="image">
										<image src="https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/2M9HRolQpJpPfWGeqgmajGkbbUF9kJUCDh3Bq58MUTH.jpg"
										 mode="widthFix"></image>
										<view class="cu-tag bg-blue">标签</view>
										<view class="cu-bar bg-shadeBottom"> <text class="text-cut">文字描述</text></view>
									</view>
									<view class="cu-list menu-avatar">
										<view class="cu-item">
											<view class="cu-avatar round lg" style="background-image:url(https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/2M9HRolQpJpPfWGeqgmajGkbbUF9kJUCDh3Bq58MUTH.jpg);"></view>
											<view class="content flex-sub">
												<view class="text-grey">昵称</view>
												<view class="text-gray text-sm flex justify-between">
													十天前
													<view class="text-gray text-sm">
														<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
														<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
														<text class="cuIcon-messagefill margin-lr-xs"></text> 30
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							
							
							<!-- tab3 -->
							<view class="cu-card case no-card mb-10" v-if="swindex === 2" v-for="item in 10" v-bind:key="item">
								<view class="cu-item shadow">
									<view class="image">
										<image src="https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/2M9HRolQpJpPfWGeqgmajGkbbUF9kJUCDh3Bq58MUTH.jpg"
										 mode="widthFix"></image>
										<view class="cu-tag bg-blue">标签</view>
										<view class="cu-bar bg-shadeBottom"> <text class="text-cut">文字描述</text></view>
									</view>
									<view class="cu-list menu-avatar">
										<view class="cu-item">
											<view class="cu-avatar round lg" style="background-image:url(https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/2M9HRolQpJpPfWGeqgmajGkbbUF9kJUCDh3Bq58MUTH.jpg);"></view>
											<view class="content flex-sub">
												<view class="text-grey">昵称</view>
												<view class="text-gray text-sm flex justify-between">
													十天前
													<view class="text-gray text-sm">
														<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
														<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
														<text class="cuIcon-messagefill margin-lr-xs"></text> 30
													</view>
												</view>
											</view>
										</view>
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
				imgurl:"https://hbimg.huabanimg.com/4cb5b23c18158e4021d3d87983a201187bf317353cef6-mO3Eim_fw658",
				
				//摄影技巧
				
				isCard: true,
				br:'\n',
				tabs: ['作品展示','摄影技巧','其他'],
				current: 0,
				tabsHeight: 0,
				dx: 0,
				
				//瀑布流
				
				refreshing: false,
				lists: [],
				fetchPageNum: 1
			};
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
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
