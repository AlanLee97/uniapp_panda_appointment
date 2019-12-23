<template>
	<view>
		<view class="icon-size-100upx"></view>

		<uni-nav-bar 
			class=""
			left-icon="back" 
			left-text="返回" 
			right-text="确定" 
			title="选择城市" 
			@clickLeft="selectedCancel()" 
			@clickRight="selectedOK(selectedCity)">
		</uni-nav-bar>
		
		<view class="">
			<ss-select-city :hotCitys="hotCitys" v-model="selectedCity" @on-select="selectCity" />
		</view>
		
	</view>
</template>

<script>
	//导航栏组件
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	
	//导入城市选择组件
	import ssSelectCity from '@/components/ss-select-city/ss-select-city.vue'
	
	export default {
		components: {
		  ssSelectCity,
		  uniNavBar
		},
		data() {
			return {
				hotCitys: ['杭州', '天津', '北京', '上海', '深圳', '广州', '成都', '重庆', '厦门'],
				selectedCity: '杭州'
			}
		},
		methods: {
			selectCity:function(city) {
			    console.log(city)
			},
			selectedCancel:function(){
				uni.navigateBack({
					delta:2
				})
			},
			selectedOK:function(city){
				// uni.switchTab({
				// 	url:'/pages/tabbar/tabbar-2/tabbar-2',
				// 	data:{
				// 		city:this.selectedCity
				// 	}
				// })
				
				uni.setStorageSync("apt-city", this.selectedCity);
				uni.reLaunch({
					url:'/pages/tabbar/tabbar-2/tabbar-2',
					
				})
				

			}
		}
	}
</script>

<style>

</style>
