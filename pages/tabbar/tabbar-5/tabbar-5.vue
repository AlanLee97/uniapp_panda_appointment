<template>
	<view class="content">
		<view>
			<!-- 上半部分 -->
			<view class='top-container'>
				<!-- 背景图 -->
				<image class='bg-img' src='https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/2LtQ2KZEDOUFAcWfLEzL49EKXsDPVjeOv2NtsWFLbZP.jpg'></image>

				<br><br><br>
				<!-- 头像部分 -->
				<view v-show="!isLogin" class='user-wrapper'>
					<navigator url='/pages/user/login' hover-class="opcity" :hover-stay-time="150" class='user'>
						<!-- 头像：未登录 -->
						<image class='avatar-img' src='../staic/icon/login.png'></image>
						<text class='user-info-mobile'>请登录</text>
					</navigator>
				</view>
				<view v-show='isLogin' class='user'>
					<!-- 头像：已登录 -->
					<image @tap="_gotoPage('/pages/user/info')" class='avatar-img' :src='face'></image>
					<view class='user-info-mobile'>
						<text>{{nickname}}</text>
						<view class='edit-img' hover-class="opcity" :hover-stay-time="150" @tap="edit">
							<image src='../../static/images/my/mine_icon_bianji_3x.png'></image>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 中间部分 -->
			<view class='middle-container'>
				<view @tap="_gotoPage('/pages/appointment/appointment-personal')" data-index="1" class='middle-item' hover-class="opcity"
				 :hover-stay-time="150">
					<image class='ticket-img' src='../../static/images/my/thorui.png'></image>
					<text class='middle-tag'>约拍</text>
				</view>
				<!-- #ifdef APP-PLUS || MP -->
				<view @tap="this.gotoPage('/pages/user/my-order')" class='middle-item' hover-class="opcity" :hover-stay-time="150">
					<image class='car-img' src='../../static/images/my/github_3x.png'></image>
					<text class='middle-tag'>订单</text>
				</view>
				<!-- #endif -->
			
				<!-- #ifdef H5 -->
				<view @tap="_gotoPage('/pages/user/my-order')" class='middle-item' hover-class="opcity" :hover-stay-time="150">
					<image class='car-img' src='../../static/images/my/github_3x.png'></image>
					<text class='middle-tag'>订单</text>
				</view>
				<!-- #endif -->
			</view>
		
		</view>
		
		<text>{{br}}</text>
		
		
		<!-- 下半部分 -->
		<view class="user_bottom_content">
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
			:style="{'height': '1200rpx'}" 
			:current="current" 
			@change="swiperChange" 
			@transition="transition"
			@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
					<scroll-view scroll-y class="box-shadow-raduis" style="height: 100%;width: 100%; background-color: #fcfcfc;" >
						<view class="scroll-items">
		
							<!-- 滑动tab1：作品 -->
							<view v-if="index == 0" class=" scroll-item" v-for="(item, windex) in works" :key='windex'>
								
								<view class="scroll-item-text-box ">
									<!-- 时间 -->
									<view class="font-color-grey">
										{{item.datetime}}
										{{br}}
									</view>
									
									<!-- 内容 -->
									<view class="fontsize-30upx p-bottom-20upx">
										{{item.introduction}}
									</view>
									
									<!-- 配图 -->
									<view class=" " v-if="item.images.length == 1">
										<image @tap="previewImage(img_index, item.images)"
											:src="item.images[0]" 
											class="text-center"
											mode="widthFix"></image>
											
									</view>
									<view v-else>
										<uni-grid :column="3">
											<view v-for="(imgurl, img_index)  in item.images" :key="img_index">
												<uni-grid-item>
													<image @tap="previewImage(img_index, item.images)" 
														:src="imgurl" 
														mode="aspectFill"></image>
												</uni-grid-item>
											</view>
										</uni-grid>
									</view>
								</view>
							</view>
						
							<!-- 滑动tab2：相册 -->
							<view v-if="index == 1" class="" >						
									<view class="">
										
										<uni-grid :column="3" >
										    <view  v-for="(url, img_index) in images" :key='img_index'>
												<uni-grid-item>
												    <image
												    	:src="url" 
												    	@tap="previewImg(img_index, images)" 
												    	mode="aspectFill" 
												    	class="scroll-item-image ">
												    </image>
												</uni-grid-item>
											</view>
										    
										</uni-grid>
									</view>
								<br>
							</view>
													
							<!-- 滑动tab3：文章 -->
							<view v-if="index == 2" class="">
								<br>
								<view class="">
									<center>暂无文章</center>
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
	import uniGrid from '../../../components/uni-grid/uni-grid.vue';
	import uniGridItem from '../../../components/uni-grid-item/uni-grid-item.vue';
	
	
	import {
		mapState
	} from 'vuex'
	
	let _this = this;
	let loginResult;
	
	export default {
		
		
		components: {
			QSTabs,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				title: 'Hello',
				br:'\n',
				tabs: ['作品','相册','文章'],
				current: 0,
				tabsHeight: 0,
				dx: 0,
				nickname:'昵称',
				face:'',
				uid:'',
				// isLogin1:false,
				
				works:{},
				images:[]
				
				
			}
		},
		
		onLoad() {
			loginResult = this.checkLogin('/pages/tabbar-5/tabbar-5', 0);
			if(!loginResult){return;}
		},
		
		onShow() {
			let userinfo = uni.getStorageSync('userinfo');
			console.log('userinfo:');
			console.log(userinfo);
			
			this.nickname = userinfo.nickname;
			this.face = userinfo.headPortraitImg;
			this.uid = userinfo.id;
			
			this.getWorksByUserId();
			this.getImagesByUserId();
			
		},
		
		methods: {
			
			_gotoPage:function(pageUrl){
				this.gotoPage(pageUrl);
			},
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
			isLogin(){
				var SNAME = uni.getStorageSync('SNAME');
				if(SNAME != ''){
					return true;
				}else{
					return false;
				}
			},
			getWorksByUserId:function(){
				uni.request({
					url:this.createApiUrl('/works/get/uid'),
					data:{
						uid:this.uid
					},
					success: (res) => {
						this.works = res.data.data;
						console.log(this.works);
					}
				})
			},
			
			//获取相册图片
			getImagesByUserId:function(){
				uni.request({
					url:this.createApiUrl('user/images'),
					data:{
						uid:this.uid
					},
					success: (res) => {
						console.log(res);
						this.images = res.data.data;
						console.log(this.images);
						
					}
				})
			},
			
			previewImg:function(index, urls){
				uni.previewImage({
					current:index,
					urls:urls,
					indicator:"default",
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
			

		}
	}
</script>

<style>	
	.test{
		width: 200upx;
		height: 200upx;
	}
	
	/*上半部分*/
	.user_top_box{
		z-index: -10px;
		position: fixed;
		top: 0px;
		width: 100%;
		height: 400upx;
	}
	.user_top_bg{
		width: 100%;
		
	}
	
	/*中间*/
	.user_middle_content{
		padding-top: 400upx;
	}
	.show-info-box{
		background: #FFFFFF;
		z-index: 10;
	}
	.show-info{
		margin-left: 30upx;
		margin-right: 30upx;
		padding: 30upx;
	}
	
	/*按钮*/
	.btn-box{
		display: inline-block;
	}
	.btn-reg-login{
		width: 200upx;
		display: inline-block;
		margin: 20upx;
	}
	
	
	

	
	
	
	
	
	
	
	
	
	
	/* pages/my/my.wxss */
	.container {
		position: relative;
	}
	
	.top-container {
		height: 440rpx;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	
	.bg-img {
		position: absolute;
		width: 100%;
		height: 440rpx;
	}
	
	.logout {
		width: 110rpx;
		height: 36rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 42rpx 0 24rpx 32rpx;
		position: relative;
		z-index: 2;
	}
	
	.logout-img {
		width: 36rpx;
		height: 36rpx;
		margin-right: 11rpx;
	}
	
	.logout-txt {
		font-size: 28rpx;
		color: #FEFEFE;
		line-height: 28rpx;
	}
	
	.user-wrapper {
		display: flex;
		justify-content: center;
		position: relative;
		z-index: 2;
	}
	
	.user {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		z-index: 2;
	}
	
	.avatar-img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		align-self: center;
	}
	
	.user-info {
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		align-items: center;
	}
	
	.user-info-mobile {
		margin-top: 30rpx;
		position: relative;
		font-size: 28rpx;
		color: #FEFEFE;
		line-height: 28rpx;
		align-self: center;
		padding: 0 50rpx;
	}
	
	.edit-img {
		position: absolute;
		width: 42rpx;
		height: 42rpx;
		right: 0;
		bottom: -4rpx;
	}
	
	.edit-img>image {
		width: 42rpx;
		height: 42rpx;
		padding-left: 25rpx;
	}
	
	.middle-container {
		height: 138rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		margin: -30rpx 30rpx 26rpx 30rpx;
		box-shadow: 0 15rpx 10rpx -15rpx #efefef;
		position: relative;
		z-index: 2;
	
	}
	
	.middle-item {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.ticket-img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 65rpx;
	}
	
	.middle-tag {
		font-size: 28rpx;
		color: #333333;
		line-height: 28rpx;
		font-weight: bold;
		padding-left: 22rpx;
	}
	
	.car-img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 97rpx;
	}
	
	.bottom-container {
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40rpx 74rpx 40rpx 95rpx;
		margin: 0 30rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		box-sizing: border-box;
		box-shadow: 0 0 10rpx #efefef
	}
	
	.ul-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
	
	.item-img {
		width: 64rpx;
		height: 64rpx;
	}
	
	.item-name {
		padding-top: 13rpx;
		font-size: 24rpx;
		color: #666666;
		min-width: 80rpx;
		text-align: center;
	}

	
	
</style>
