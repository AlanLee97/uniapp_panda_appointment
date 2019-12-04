<template>
	<view class="content">

		<view>
			<view class='top-container'>
				<image class='bg-img' src='https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/2LtQ2KZEDOUFAcWfLEzL49EKXsDPVjeOv2NtsWFLbZP.jpg'></image>
				<view @tap='logout' class='logout' hover-class="opcity" :hover-stay-time="150">
					<image class='logout-img' src='../../static/images/my/icon_out_3x.png' v-show='isLogin'></image>
					<text class='logout-txt' v-show='isLogin'>退出</text>
				</view>
				<view v-show="!isLogin" class='user-wrapper'>
					<navigator url='/pages/user/login' hover-class="opcity" :hover-stay-time="150" class='user'>
						<!-- 头像：未登录 -->
						<image class='avatar-img' :src='face'></image>
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
			
			<view class='bottom-container'>
				<view class='ul-item'>
					<view @tap='tapEvent' data-index="2" data-key='粉丝' class='item' hover-class="opcity" :hover-stay-time="150">
						<image class='item-img' src='../../static/images/my/mine_icon_jiayouzhan_3x.png'></image>
						<text class='item-name'>粉丝</text>
					</view>
					<view @tap='tapEvent' data-index="2" data-key='关注' class='item' hover-class="opcity" :hover-stay-time="150">
						<image class='item-img' src='../../static/images/my/mine_icon_tingche_3x.png'></image>
						<text class='item-name'>关注</text>
					</view>
					<view @tap='tapEvent' data-index="2" data-key='相册' class='item' hover-class="opcity" :hover-stay-time="150">
						<image class='item-img' src='../../static/images/my/mine_icon_chongdian_3x.png'></image>
						<text class='item-name'>相册</text>
					</view>
				</view>
				<view class='ul-item'>
					<view @tap='previewReward' class='item' hover-class="opcity" :hover-stay-time="150">
						<image class='item-img' src='../../static/images/my/reward.png'></image>
						<text class='item-name'>动态</text>
					</view>
					<view class='item' hover-class="opcity" :hover-stay-time="150">
						<button open-type="feedback" class="btn-feedback"> </button>
						<image class='item-img' src='../../static/images/my/feedback.png'></image>
						<text class='item-name'>作品</text>
			
					</view>
					<view @tap='tapEvent' data-index="3" class='item' hover-class="opcity" :hover-stay-time="150">
						<image class='item-img' src='../../static/images/my/log.png'></image>
						<text class='item-name'>文章</text>
					</view>
				</view>
			</view>
		</view>
			
			
<!-- 		<view class="user_top_box">
			<image class="user_top_bg" 
					src="https://isuxdesign-1251263993.file.myqcloud.com/upload/detail/2LtQ2KZEDOUFAcWfLEzL49EKXsDPVjeOv2NtsWFLbZP.jpg" mode=""></image>
		</view> -->
		
		
<!-- 		
		<view class="user_middle_content">
			<view v-if="!isLogin()" id="btn" class="btn-box">
				<navigator class="d-il-blk" url="../../user/register">
					<button type="primary" class="btn-reg-login">注册</button>
				</navigator>
				
				<navigator class="d-il-blk" url="../../user/login">
					<button type="primary" class="btn-reg-login" >登录</button>
				</navigator>
			</view>
			
			<view v-if="isLogin()" class="user_middle_main">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<image :src="face" class="cu-avatar round lg" ></image>
						
						<view class="content flex-sub">
							<view>{{nickname}}</view>
							<view class="text-gray text-sm flex justify-between">
								2019年12月3日
							</view>
						</view>
						
					</view>
					
					
					<view class="show-info-box cu-item">
						<view class="show-info d-il-blk">
							<text>10</text>
							<text>{{br}}</text>
							<text>约拍</text>
						</view>
						
						<view class="show-info d-il-blk">
							<text>5</text>
							<text>{{br}}</text>
							<text>关注</text>
						</view>
						
						<view class="show-info d-il-blk">
							<text>12</text>
							<text>{{br}}</text>
							<text>粉丝</text>
						</view>
						
						<view class="show-info d-il-blk">
							<text>6</text>
							<text>{{br}}</text>
							<text>收藏</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		 -->
		<text>{{br}}</text>
		

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
					<scroll-view scroll-y style="height: 100%;width: 100%;" >
						<view class="scroll-items">
							<view class="scroll-item" v-for="(ite, ind) in 10" :key="ind">
								<view class="scroll-item-image-box">
									<image src="../../../static/panda.png" mode="aspectFill" class="scroll-item-image"></image>
								</view>
								<view class="scroll-item-text-box">
									<view>
										小调皮
									</view>
									<view>
										真可爱
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
	import {
		mapState
	} from 'vuex'
	
	let _this = this;
	let loginResult;
	export default {
		components: {
			QSTabs
		},
		data() {
			return {
				title: 'Hello',
				br:'\n',
				tabs: ['动态','作品','文章'],
				current: 0,
				tabsHeight: 0,
				dx: 0,
				nickname:'昵称',
				face:'',
				uid:'',
				// isLogin1:false,
				
				
			}
		},
		
		onLoad() {
			
		},
		
		onShow() {
			let userinfo = uni.getStorageSync('userinfo');
			console.log('userinfo:');
			console.log(userinfo);
			
			this.nickname = userinfo.nickname;
			this.face = userinfo.headPortraitImg;
			this.uid = userinfo.id;
			
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
			
			
			
			
			logout: function() {
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					confirmColor: '#5677FC',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorage();
							uni.clearStorageSync();
							uni.reLaunch({
								url: '/pages/user/login'
							})
						}
					}
				});
			},
			edit() {
				this.tui.toast("功能开发中~")
			},
			tapEvent: function(e) {
				let index = e.currentTarget.dataset.index;
				let url = "";
				if (index == 1) {
					url = '../about/about'
				} else if (index == 2) {
					let key = e.currentTarget.dataset.key;
					url = '../maps/maps?key=' + key
					// #ifdef MP-ALIPAY
					 this.tui.toast("功能开发中~");
					 return
					// #endif
				} else {
					url = '../log/log'
				}
				uni.navigateTo({
					url: url
				})
			},
			
			previewReward: function() {
				uni.previewImage({
					urls: ["https://thorui.cn/img/reward.jpg"]
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: auto;
		/* margin-top: 200upx; */
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
		padding: 40rpx;
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
	
	
	
	.vbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.top_back_img {
		z-index: -1;
		position: absolute;
		top: 0upx;
		width: 100%;
		height: 420upx;
	
	}
	
	.top {
		display: flex;
		width: 100%;
		height: 420upx;
		align-items: center;
	}
	
	.circle {
		margin-left: 100upx;
		width: 120upx;
		height: 120upx;
		border: 10upx solid #a4f4f6;
		border-radius: 150upx;
		overflow: hidden;
	}
	
	.head {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
	}
	
	.top-texts {
		display: flex;
		flex-direction: column;
		margin-left: 15upx;
		color: white;
	}
	
	.name {
		font-size: 36upx;
		font-weight: 500;
	}
	
	.set-top-hr {
		width: 210upx;
		height: 6upx;
	}
	
	.top-changeInfo {
		margin-top: 250upx;
		width: 120upx;
		height: 28upx;
		line-height: 28upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		padding: 10upx;
		color: #33dce8;
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
		height: 334rpx;
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
	
	.btn-feedback {
		background: transparent !important;
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
	}
	
	
</style>
