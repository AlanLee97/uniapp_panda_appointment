<template>
	<view>
		<button type="primary" @click='goPage()'>带参数跳转</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goPage:function(){
				uni.navigateTo({
					url: '/pages/test/test3?id=100',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>

</style>
