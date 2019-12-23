<template>
	<view>
		<view v-for="(item, index) in orderData" :key="index"
			class="box-shadow-raduis p-10upx m-10upx mt-20upx">
			<view class="">
				<text>订单编号：</text>
				<text>{{item.id}}</text>
				<text>{{br}}</text>
				
				<text>标题：</text>
				<text>{{item.title}}</text>
				<text>{{br}}</text>
				
				<text>地点：</text>
				<text>{{item.address}}</text>
				<text>{{br}}</text>
				
				<text>时间：</text>
				<text>{{item.date}}</text>
				<text>{{br}}</text>
			</view>
			
			<view class="divide-line-grey m-10upx"></view>
			
			<view class="btn">
				<button class="mini-btn" plain="true" type="primary" size="mini" @tap="confirmDelete(item.id)">取消</button>
				<button class="m-left-20upx mini-btn" plain="true" type="primary" size="mini">付款</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				br:'\n',
				orderId:0,
				uid:'',
				title:'',
				apt_site:'',
				apt_date:'',
				
				orderData:[],
				
				
				
			}
		},
		
		onShow:function(){
			let userinfo = this.getUserInfo();
			this.uid = userinfo.id;
			
			//获取订单
			this.getOrderByUid(this.uid);
		},
		
		onPullDownRefresh:function(){
			this.getOrderByUid(this.uid);
			setTimeout(function(){
				uni.stopPullDownRefresh();
			}, 1000);
		},
		
		methods:{
			getOrderByUid:function(uid){
				uni.request({
					url: this.createApiUrl('order/get/uid'),
					method: 'GET',
					data: {uid: this.uid},
					success: res => {
						res = res.data.data;
						console.log(res);
						this.orderData = res;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//删除前确认
			confirmDelete:function(orderId){
				uni.showModal({
					title: '删除作品',
					content: '您是否要删除作品？',
					showCancel: true,
					cancelText: '算了',
					confirmText: '是的',
					success: res => {
						if(res.confirm){
							console.log(orderId);
							//this.deleteWorks(orderId);
						}else if(res.cancel){
							console.log('用户点击取消');
						}
						
					},
					fail: () => {},
					complete: () => {
						uni.startPullDownRefresh({
							success() {
								setTimeout(function(){
									uni.stopPullDownRefresh();
								}, 1000);
							}
						})
					}
				});
			},
			
			//删除订单
			deleteWorks:function(orderId){
				console.log(orderId);
				uni.request({
					url: this.createApiUrl('order/delete'),
					method: 'POST',
					header: {
					        'content-type': 'application/x-www-form-urlencoded'  
					},
					data: {
						orderId: orderId
					},
					success: res => {
						console.log(res);
						if(res.data.code == 200){
							uni.showToast({
								title:'删除成功'
							})
						}else{
							uni.showToast({
								title:'删除失败'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
		}
	}
</script>

<style>

</style>
