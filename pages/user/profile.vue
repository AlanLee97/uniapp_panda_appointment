<template>
	<view class="bgcolor-grey-fcfcfc">
		<!-- 背景图 -->
		<view class="">
			<image class="width-100" mode="aspectFill" 
			@tap="previewImage(1, test.images)"
			src="https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/BioLWLH8ttBH9S6vMFl6ZpR86jWsKpOWpa6XhrVOYAP.jpg"></image>
		</view>
		<!-- 头像 -->
		<view class="box-shadow-raduis p-20upx m-top--20upx m-bottom-20upx">
			
				<view class="box-content-align-center">
					<image class="cu-avatar round icon-size-200upx"
					:src="userinfo.headPortraitImg"></image>
				</view>
				
				<view class="box-content-align-center mt-20upx">
					<text>{{userinfo.nickname}}</text>
				</view>
			
				
				
				<view class="uni-flex uni-row box-content-align-center ">
					
				</view>
				
				
				<!-- 身份 -->
				<view class="uni-flex uni-row box-content-align-center">
					<image src="/static/icon/location.png" mode="" class="icon-size-50upx p-10upx"></image>
					<text class="uni-flex-item p-10upx">{{userinfo.city}}</text>
					<br>
					<image src="/static/icon/status.png" mode="" class="icon-size-50upx p-10upx"></image>
					<text v-if="userinfo.identity == 0">管理员</text>
					<text v-if="userinfo.identity == 1">摄影师</text>
					<text v-if="userinfo.identity == 2">模特</text>
					<text v-if="userinfo.identity == 3">普通用户</text>
				</view>
			
			
			
			
			
		</view>
		

		<!-- 作品、相册、文章 -->
		<view class="show">
			<view class="QS-tabs-box ">
				<QSTabs 
				ref="tabs" 
				class=""
				:tabs="tabs" 
				animationMode="line3" 
				:current="current" 
				@change="change"
				activeColor="#adadad"
				swiperWidth="750">
				</QSTabs>
			</view>
			<swiper 
			class=""
			:style="{'height': '1200rpx'}" 
			:current="current" 
			@change="swiperChange" 
			@transition="transition"
			@animationfinish="animationfinish">
				<swiper-item class=" swiper-item" v-for="(item, index) in tabs" :key="index">
					<scroll-view scroll-y class="box-shadow-raduis" style="height: 100%;width: 100%; background-color: #fcfcfc;" >
						<view class="scroll-items">
		
							<!-- 滑动tab1：作品 -->
							<view v-if="index == 0" 
							class=" scroll-item" 
							v-for="(item, windex) in works" 
							:key='windex'
							>
								
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
									<view class=""
									@tap="previewImage(0, item.images)"
									 v-if="item.images.length == 1">
										<image 
											:src="item.images[0]" 
											class="text-center"
											mode="widthFix"></image>
											
									</view>
									<view v-else>
										<uni-grid :column="3">
											<view 
											v-for="(imgurl, img_index)  in item.images" 
											:key="img_index"
											@tap="previewImage(imgurl, item.images)"
											>
												<uni-grid-item >
							
													<image
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
										    <view  
											@tap="previewImage(img_index, images)" 
											v-for="(url, img_index) in images" 
											:key='img_index'>
												<uni-grid-item>
												    <image
												    	:src="url" 
												    	
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
	import QSTabs from '../../components/QS-tabs/QS-tabs.vue';
	import uniGrid from '../../components/uni-grid/uni-grid.vue';
	import uniGridItem from '../../components/uni-grid-item/uni-grid-item.vue';
	
	
	export default {
		components: {
			QSTabs,
			uniGrid,
			uniGridItem
		},
		
		onLoad(options) {
			// console.log(options);
			this.uid = options.uid;
		},
		onShow() {
			this.getUserInfo();
			this.getWorksByUserId();
			this.getImagesByUserId(this.uid);
			
			
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
				works:{},
				images:[],
				test:{
					images:['https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/BioLWLH8ttBH9S6vMFl6ZpR86jWsKpOWpa6XhrVOYAP.jpg']
				},
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
						// console.log(res);
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
			
			//获取相册图片
			getImagesByUserId:function(uid){
				uni.request({
					url:this.createApiUrl('user/images'),
					data:{
						uid:uid
					},
					success: (res) => {
						// console.log(res);
						this.images = res.data.data;
						// console.log(this.images);
						
					}
				})
			},
			
			//预览图片
			previewImage:function(index, urls){
				console.log("预览图片");
				uni.previewImage({
					current:index,
					urls:urls,
					indicator:"default"
				})
			},
			
			testPre:function(){
				console.log("预览图片");
			}
			
		}
	}
</script>

<style>

</style>
