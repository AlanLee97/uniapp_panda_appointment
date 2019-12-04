<template>
	<view>
		<view v-for="(item, index) in rtData" :key="index"
			class="box-shadow-raduis p-10upx m-10upx">
			<view class="">
				
				<text>标题：</text>
				<text>{{item.title}}</text>
				<text>{{br}}</text>
				
				<text>地点：</text>
				<text>{{item.address}}</text>
				<text>{{br}}</text>
				
				<text>时间：</text>
				<text>{{item.startDatetime}}</text>
				<text>{{br}}</text>
			</view>
			
			<view class="divide-line-grey m-10upx"></view>
			
			<view class="btn">
				<button class="mini-btn" plain="true" type="primary" size="mini">取消</button>
				<button class="m-left-20upx mini-btn" plain="true" type="primary" size="mini">删除</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				br:'\n',
				title:'',
				apt_site:'',
				apt_date:'',
				
				rtData:[]
				
				
				
			}
		},
		methods: {
			
		},
		onShow:function(){
			let userinfo = this.getUserInfo();
			let uid = userinfo.id;
			uni.request({
				url: this.createApiUrl('appointment/get/uid'),
				method: 'GET',
				data: {uid:uid},
				success: res => {
					console.log(res);
					res = res.data.data;
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
