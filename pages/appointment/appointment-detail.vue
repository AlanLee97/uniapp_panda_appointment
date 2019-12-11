<template>
	<view>
		<view class="">
			<image :src="aptDetail.image" mode="aspectFill" class="width-100"></image>
		</view>
			
		<view class="p-20upx">
			<!-- 标题 -->
			<view class="">
				<text class=" 
					fontsize-80upx 
					font-color-light-black 
					font-weight-200">
					
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
				<image class="icon-size-50upx" src="../../static/icon/说明.png" mode="aspectFill"></image>
				<text class="p-20upx">要求</text>
				<text>{{aptDetail.ask}}</text>
			</view>
			
			
			
			
			<!-- 约拍时间 -->
			<view class="p-top-20upx p-bottom-20upx">
				<image class="icon-size-50upx" src="../../static/icon/时间.png" mode="aspectFill"></image>
				<text class="p-20upx">时间</text>
				<text>{{aptDetail.startDatetime}}</text>
			</view>
			
			<!-- 地点 -->
			<view class="p-top-20upx p-bottom-20upx">
				<image class="icon-size-50upx" src="../../static/icon/位置.png" mode="aspectFill"></image>
				<text class="p-20upx">地点</text>
				<text>{{aptDetail.address}}</text>
			</view>
			
			<!-- 约拍类型 -->
			<view class="p-top-20upx p-bottom-20upx">
				<image class="icon-size-50upx" src="../../static/icon/分类.png" mode="aspectFill"></image>
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

				
				btnDisable:false
				
			}
		},

		onLoad: function(option){	
			uni.showLoading({
				title:'加载数据中'
			});
			this.aptId = option.apid;
			this.getAppointmentDetail();
			
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
