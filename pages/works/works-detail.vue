<template>
	<view>
		<!-- 用户信息 -->
		<view class="cu-list menu-avatar bgcolor-white-ffffff">
			<view class="cu-item">
				<image class="cu-avatar round lg" :src="worksData.tuser.headPortraitImg"></image>
				<view class="content flex-sub">
					<view class="text-grey">{{worksData.tuser.nickname}}</view>
					<view class="text-gray text-sm flex justify-between" v-if="worksData.tuser.identity == 0">
						管理员
					</view>
					<view class="text-gray text-sm flex justify-between" v-if="worksData.tuser.identity == 1">
						摄影师
					</view>
					<view class="text-gray text-sm flex justify-between" v-if="worksData.tuser.identity == 2">
						模特
					</view>
					<view class="text-gray text-sm flex justify-between" v-if="worksData.tuser.identity == 3">
						普通用户
					</view>
				</view>
				
			</view>
		</view>	
		
		<!-- 文字内容 -->
		<view class="">
			<view class="box-shadow-raduis bgcolor-white-ffffff p-20upx">
				{{worksData.introduction}}
			</view>
		</view>
		
		<!-- 图片 -->
		<view class="">
			<view class="" v-for="(img_url, img_index) in worksData.images" :key="img_index">
				<image 
					class="width-100"
					@tap="previewImage(img_url, worksData.images)" 
					:src="img_url" 
					mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				worksId:'',
				worksData:{},
			}
		},
		onLoad(options) {
			console.log(options);
			this.worksId = parseInt(options.worksId);
			console.log(this.worksId);
			this.getWorksAndUserById(this.worksId);
		},
		methods: {
			getWorksAndUserById:function(worksId){
				uni.request({
					url: this.createApiUrl('works/get/works'),
					method: 'GET',
					data: {
						worksId:worksId
					},
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

</style>
