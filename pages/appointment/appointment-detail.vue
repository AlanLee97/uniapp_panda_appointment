<template>
	<view>
		<view class="">
			<image :src="aptDetail.image" mode="aspectFill" class="width-100"></image>
		</view>
			
		<view class="p-20upx">
			
			<view class="">
				<!-- 用户信息 -->
				<view class="box-shadow-raduis bgcolor-white-ffffff">

					<!-- 用户信息部分 -->
					<view class="cu-list menu-avatar">
						<view class="cu-item ">
							<!-- 头像 -->
							<view class="cu-avatar round lg" >
								<image 
								class="cu-avatar round lg" 
								:src="userinfo.headPortraitImg" 
								@tap="gotoPage('/pages/user/profile?uid=' + userinfo.id)"></image>
							</view>
							<!-- 昵称与时间 -->
							<view class="content flex-sub">
								<view>
									<!-- 昵称 -->
									<view class="width-50">
										{{userinfo.nickname}}
									</view>
									
								</view>
								<view>
									<view v-if="userinfo.identity == 0" class="text-gray text-sm flex justify-between">
										摄影师
									</view>
									<view v-if="userinfo.identity == 1" class="text-gray text-sm flex justify-between">
										模特
									</view>
								</view>
								
							</view>
						</view>
					</view>
					

				
				</view>
				
				<!-- 标题 -->
				<text class="fontsize-80upx font-color-light-black font-weight-200">
					
					{{aptDetail.title}}
				</text>
				
				<!-- 发布时间 -->
				<view class="">
					<text class="fontsize-30upx font-color-grey">发布于 {{aptDetail.datetime}}</text>
					<br>
					<br>
				</view>
				
			</view>
			
			<!-- 要求 -->
			<view class="p-top-20upx p-bottom-20upx">
				<image class="icon-size-50upx" src="../../static/icon/statement.png" mode="aspectFill"></image>
				<text class="p-20upx">要求</text>
				<text>{{aptDetail.ask}}</text>
			</view>
			
			
			
			
			<!-- 约拍时间 -->
			<view class="p-top-20upx p-bottom-20upx">
				<image class="icon-size-50upx" src="../../static/icon/time.png" mode="aspectFill"></image>
				<text class="p-20upx">时间</text>
				<text>{{aptDetail.startDatetime}}</text>
			</view>
			
			<!-- 地点 -->
			<view class="p-top-20upx p-bottom-20upx">
				<image class="icon-size-50upx" src="../../static/icon/location.png" mode="aspectFill"></image>
				<text class="p-20upx">地点</text>
				<text>{{aptDetail.address}}</text>
			</view>
			
			<!-- 约拍类型 -->
			<view class="p-top-20upx p-bottom-20upx">
				<image class="icon-size-50upx" src="../../static/icon/sort.png" mode="aspectFill"></image>
				<text class="p-20upx">类型</text>
				<text>{{aptDetail.aptTypeId}}</text>
			</view>
			
			<br>
		</view>
		<button type="primary" :disabled="btnDisable" @tap="addOrder()">约拍TA</button>
	</view>
</template>

<script>
	
	let _this = this;
	export default {
		
		data() {
			return {
				br:'\n',
				aptDetail:{
					aptId:0,
					pub_uid:0,
					title:'',
					datetime:'',
					address:'',
					ask:'',
					startDatetime:'',
					aptTypeId:'',
					image:''
				},
				
				userinfo:{},

				
				btnDisable:false
				
			}
		},

		onLoad: function(option){	
			uni.showLoading({
				title:'加载数据中'
			});
			this.aptId = option.apid;
			this.getAppointmentDetail();
			// this.getUserInfo(this.aptDetail.userId);
			
		},
		onShow:function(options){

		},
		
		methods:{
			getAppointmentDetail:function(){
				let url = this.createApiUrl('appointment/get/one?appointmentId=' + this.aptId);
				
				uni.request({
					url: url,
					method: 'GET',
					data: {},
					success: res => {
						uni.hideLoading();
						res = res.data.data;
						console.log(res);
						
						this.aptDetail.title = res.title;
						this.aptDetail.ask = res.ask;
						this.aptDetail.datetime = res.date;
						this.aptDetail.address = res.address;
						this.aptDetail.startDatetime = res.startDatetime;
						this.aptDetail.aptTypeId = res.aptTypeId;
						this.aptDetail.pub_uid = res.userId;
						this.aptDetail.image = res.image;
						
						this.getUserInfo(this.aptDetail.pub_uid);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			getUserInfo:function(uid){
				uni.request({
					url: this.createApiUrl('user/get/user'),
					method: 'GET',
					data: {
						uid:uid
					},
					success: res => {
						console.log(res);
						this.userinfo = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			addOrder:function(){
				let userinfo = this.getUserInfo();
				let _pubUid = this.aptDetail.pub_uid;
				let _acptUid = userinfo.id;
				let _aptId = parseInt(this.aptDetail.aptId);
				
				let sendData = {
					pub_uid:_acptUid,
					acpt_uid: _acptUid,
					apt_id:_aptId,
					evaluate:'',
					date:'',
					image:''
				};
				console.log(sendData);
				
				
				uni.request({
					url: this.createApiUrl('/order/add'),
					method: 'POST',
					header: {
					        'content-type': 'application/x-www-form-urlencoded'  
					},
					data: sendData,
					success: res => {
						res = res.data;
						console.log(res);
						if(res.code == 200){
							uni.showToast({
								title:'预约成功',
							});
							this.btnDisable = true
						}else{
							uni.showToast({
								title:'网络开小差了！，请稍候再试',
							});
						}
						
						
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style scoped>
 page{
	 background-color: #FFFFFF;
 }
</style>
