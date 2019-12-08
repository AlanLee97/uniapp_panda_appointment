<template>
	<view>
		<!-- 背景图 -->
		<view class="">
			<image src="../../static/top_bg.jpg"></image>
		</view>
		<br>
		<!-- 头像 -->
		<view class="">
			<image class="cu-avatar round lg" :src="userinfo.headPortraitImg"></image><br>
			<text>{{userinfo.nickname}}</text><br>
			<text>{{userinfo.city}}</text><br>
			<text v-if="userinfo.identity == 0">摄影师</text><br>
			<text v-if="userinfo.identity == 1">模特</text><br>
			
		</view>
		
		<view class="">
			<text>TA的作品</text>
		</view>
		
		<view class="">
			<text>TA的约拍</text>
		</view>
		



	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(options);
			this.uid = options.uid;
		},
		onShow() {
			this.getUserInfo();
			
			
		},
		data() {
			return {
				br:'\n',
				uid:'',
				userinfo:{},
				newestApt:[]
			}
		},
		methods: {
			getUserInfo:function(){
				uni.request({
					url:this.createApiUrl('/user/get/user'),
					data:{
						uid:this.uid
					},
					success:res => {
						console.log(res);
						this.userinfo = res.data.data;
					}
				})
			}
		}
	}
</script>

<style>

</style>
