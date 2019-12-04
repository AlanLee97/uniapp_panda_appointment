<template>
	<view>
		<view>
			<button type="primary" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release')">
				我要找摄影师
			</button>
			
			<button type="primary">
				我要找模特
			</button>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
		}
	}
</script>

<style>

</style>
