<template>
	<view>
		约拍详情页
		<text>{{br}}{{br}}</text>
		
		<text>标题:{{title}}</text>
		<text>{{br}}{{br}}</text>
		
		<text>要求:{{ask}}</text>
		<text>{{br}}{{br}}</text>
		
		<text>发布于:{{datetime}}</text>
		<text>{{br}}{{br}}</text>
		
		<text>约拍时间:{{startDatetime}}</text>
		<text>{{br}}{{br}}</text>
		
		<text>地点:{{address}}</text>
		<text>{{br}}{{br}}</text>
		
		<text>约拍类型:{{aptTypeId}}</text>
		<text>{{br}}{{br}}</text>
		
		<button type="primary" :disabled="btnDisable" @tap="addOrder()">约拍TA</button>
	</view>
</template>

<script>
	
	let _this = this;
	export default {
		
		data() {
			return {
				br:'\n',
				aptId:0,
				pub_uid:0,
				title:'',
				datetime:'',
				address:'',
				ask:'',
				startDatetime:'',
				aptTypeId:'',
				
				btnDisable:false
				
			}
		},
		methods: {
			addOrder:function(){
				let userinfo = this.getUserInfo();
				let _pubUid = this.pub_uid;
				let _acptUid = userinfo.id;
				let _aptId = parseInt(this.aptId);
				
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
					data: {
						pub_uid:_acptUid,
						acpt_uid: _acptUid,
						apt_id:_aptId,
						evaluate:'',
						date:'',
						image:''
					},
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
			
			
		},
		onLoad: function(option){
			console.log('option:');
			console.log(option.apid);
			
			uni.showLoading({
				title:'加载数据中'
			});
			this.aptId = option.apid;
			let url = this.createApiUrl('appointment/get/one?appointmentId=' + this.aptId);
			
			uni.request({
				url: url,
				method: 'GET',
				data: {},
				success: res => {
					console.log('url')
					console.log(url);
					uni.hideLoading();
					res = res.data.data;
					console.log(res);
					
					this.title = res.title;
					this.ask = res.ask;
					this.datetime = res.date;
					this.address = res.address;
					this.startDatetime = res.startDatetime;
					this.aptTypeId = res.aptTypeId;
					this.pub_uid = res.userId;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onShow:function(options){

			
			
		}
	}
</script>

<style>

</style>
