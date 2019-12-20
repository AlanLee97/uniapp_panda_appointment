<template>
	<view>
		<!-- 背景图 -->
		<view class="">
			<image class="width-100" mode="aspectFill" src="../../static/top_bg.jpg"></image>
		</view>
		<!-- 头像 -->
		<view class="bgcolor-white-ffffff p-20upx mt-20upx mb-20upx">
			<image class="cu-avatar round lg" :src="userinfo.headPortraitImg"></image><br>
			<text>{{userinfo.nickname}}</text><br>
			<text>{{userinfo.city}}</text><br>
			<text v-if="userinfo.identity == 0">摄影师</text><br>
			<text v-if="userinfo.identity == 1">模特</text><br>
			
		</view>
		
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
		
							<view class="scroll-item" v-for="(item, windex) in works" :key='windex'>
								
								<view class="scroll-item-text-box">
									<view class="font-color-grey">
										{{item.datetime}}
										{{br}}
									</view>
									<view>
										{{item.introduction}}
									</view>
									
									<view class="grid flex-sub " :class="item.images.length > 1 ?'col-3 grid-square':'col-1'">
										<view class="" v-for="(imgurl, img_index)  in item.images" :key="img_index">
											<view class="scroll-item-image-box">
												<image :src="imgurl" @tap="previewImage(img_index, item.images)" mode="aspectFill" class="scroll-item-image"></image>
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
	import QSTabs from '../../components/QS-tabs/QS-tabs.vue';
	
	
	export default {
		components: {
			QSTabs
		},
		
		onLoad(options) {
			console.log(options);
			this.uid = options.uid;
		},
		onShow() {
			this.getUserInfo();
			this.getWorksByUserId();
			
			
		},
		data() {
			return {
				br:'\n',
				uid:'',
				userinfo:{},
				newestApt:[],
				tabs: ['TA的作品','TA的相册','TA的约拍'],
				current: 0,
				tabsHeight: 0,
				dx: 0,
				works:{}
			}
		},
		methods: {
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
		}
	}
</script>

<style>

</style>
