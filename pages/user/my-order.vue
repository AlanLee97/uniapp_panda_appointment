<template>
	<view>
		<view v-for="(item, index) in rtData" :key="index"
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
				<button class="mini-btn" plain="true" type="primary" size="mini">取消</button>
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
				title:'',
				apt_site:'',
				apt_date:'',
				
				rtData:[],
				
				
				
			}
		},
		methods: {
			
		},
		onShow:function(){
			let userinfo = this.getUserInfo();
			let _uid = userinfo.id;
			uni.request({
				url: this.createApiUrl('order/get/uid'),
				method: 'GET',
				data: {uid: _uid},
				success: res => {
					res = res.data.data;
					console.log(res);
					this.rtData = res;
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style>

</style>
