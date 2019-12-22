<template>
	<view>
		<view v-for="(item, index) in aptData" :key="index"
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
				
				<button 
					@tap="confirmDelete(item.id)"
					class="m-left-20upx mini-btn" 
					plain="true" 
					type="primary" 
					size="mini">
					取消
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export default {
		conponents:{
			
		},
		data() {
			return {
				br:'\n',
				uid:'',
				title:'',
				apt_site:'',
				apt_date:'',
				aptData:[]
				
			}
		},
		methods: {
			
		},
		onShow:function(){
			let userinfo = this.getUserInfo();
			this.uid = userinfo.id;
			
			this.getAppointment(this.uid);
		},
		onPullDownRefresh:function() {
			console.log("下拉刷新");
			this.getAppointment(this.uid);
			setTimeout(function(){
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods:{
			//获取约拍
			getAppointment:function(uid){
				uni.request({
					url: this.createApiUrl('appointment/get/uid'),
					method: 'GET',
					data: {uid:uid},
					success: res => {
						console.log(res);
						res = res.data.data;
						this.aptData = res;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//删除约拍
			deleteAppointment:function(aptId){
				uni.request({
					url: this.createApiUrl('appointment/delete/apt'),
					method: 'GET',
					data: {
						aptId:aptId,
					},
					success: res => {
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			confirmDelete:function(aptId){
				uni.showModal({
					title: '取消约拍',
					content: '您是否要取消约拍？',
					showCancel: true,
					cancelText: '算了',
					confirmText: '是的',
					success: res => {
						if(res.confirm){
							this.deleteAppointment(aptId);
						}else if(res.cancel){
							console.log('用户点击取消');
						}
						
					},
					fail: () => {},
					complete: () => {
						uni.startPullDownRefresh({
							success() {
								this.getAppointment(this.uid);
							}
						})
					}
				});
			}
		}
	}
</script>

<style>

</style>
