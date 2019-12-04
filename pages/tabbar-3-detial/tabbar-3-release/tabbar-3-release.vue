<template>
	<view class="content">
		
		<scroll-view scroll-y class="page">
			<view bgImage="https://image.weilanwl.com/color2.0/plugin/cjkz2329.jpg">
				<block slot="content">
					<image src="/static/cjkz.png" mode="aspectFill" style="width: 240upx;height: 60upx;"></image>
				</block>
			</view>
			<view class="cu-card">
				<view class="cu-item bg-img shadow-blur" 
				:style="[{backgroundImage:'url('+item.img+')'}]" 
				@tap="goToPage(item.url)" 
				:data-url="item.url"
				 v-for="(item,index) in list" :key="index">
					<view class="cardTitle">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				list: [{
						title: '普通拍照',
						img: 'https://cdn-isux.qq.com/upload/detail/f57Y2wEryDwjWmTr2BypYaCA6CgSKjknAJtGRIR4FcR.jpeg',
						url: '/pages/publish/publish-appointment'
					},
					{
						title: '毕业证',
						img: 'https://hbimg.huabanimg.com/0f120dca08e283119854305f5ebaf32f1e6252ec2bb36-hDRXuO_fw658',
						url: '/pages/select/select'
					},
					{
						title: '婚纱照',
						img: 'http://5b0988e595225.cdn.sohucs.com/images/20180913/9bd63d1aff0844a392a7cf0108e2cbc2.jpeg',
						url: '/pages/select/select'
					},
					{
						title: '电商模特',
						img: 'https://i1.mifile.cn/f/i/2019/mi9/index/index1.jpg',
						url: '/pages/select/select'
					}
				]
			};
		},
		onLoad() {

		},
		methods: {
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
	
	.page {
		height: 100vh;
	}
	
	.cardTitle {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		font-weight: 300;
		transform: skew(-10deg, 0deg);
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3)
	}
	
	.cardTitle::before {
		content: "";
		position: absolute;
		width: 60upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #fff;
		display: block;
		top: 60upx;
		left: 50upx;
		transform: skew(10deg, 0deg);
	}
	
	.cardTitle::after {
		content: "";
		position: absolute;
		width: 140upx;
		border-radius: 6upx;
		height: 24upx;
		background-color: #fff;
		display: block;
		bottom: 76upx;
		left: 90upx;
		transform: skew(10deg, 0deg);
		opacity: 0.1;
	}
	
</style>
