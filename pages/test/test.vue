<template>
	<view>
		<input type="text" v-model="username" placeholder="username" />
		<text>{{br}}{{br}}</text>
		<input type="password" v-model="password" placeholder="password" />
		<text>{{br}}{{br}}</text>
		<button type="primary" @tap="login()">登录</button>
		<text>{{br}}{{br}}</text>
		
		<input type="text" v-model="content" placeholder="content" />
		<text>{{br}}{{br}}</text>
		<button type="primary" @tap="sendPost()">测试发送post请求</button>
		<text>{{br}}{{br}}</text>
		
		<input type="text" v-model="content2" placeholder="content" />
		<text>{{br}}{{br}}</text>
		<button type="primary" @tap="sendGet()">测试发送get请求</button>
		<text>{{br}}{{br}}</text>
		
		
		<button type="primary" @tap="getAllAppointment()">查询信息</button>
		<text>{{msg}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				br:'\n',
				username:'',
				password:'',
				msg:'',
				content:'',
				content2:''
			}
		},
		methods: {
			login(){
				console.log("username:" + this.username);
				console.log("password:" + this.password);
				uni.request({
					url: 'http://localhost:8080/apiLoginDo',
					method: 'GET',
					data: {
						username : this.username,
						password : this.password
					},
					success: res => {
						console.log(res.statusCode);
						console.log(res)
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			getAllAppointment(){
				uni.request({
					url: 'http://localhost:8080/get-all-appointment',
					method: 'GET',
					data: {
						
					},
					success: res => {
						console.log(res);
						this.msg = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			sendPost(){
				uni.request({
					url: 'http://47.103.204.62:8083/post',
					method: 'POST',
					header: {  
					        'content-type': 'application/x-www-form-urlencoded'  
					},
					data: {
						arg:'haha'
					},
					success: res => {
						console.log(res)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			sendGet(){
				uni.request({
					url: 'http://localhost:8080/get',
					method: 'GET',
					header: {  
					        'content-type': 'application/json'  
					},
					data: {
						arg:'haha'
					},
					success: res => {
						console.log(res)
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
