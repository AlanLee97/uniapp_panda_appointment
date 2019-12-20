<template>
	<view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			pay:function(){
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: 'test',
					success: res => {
						console.log('success:' + JSON.stringify(res));
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
