<template>
	<view>
		<text>图片上传</text>
		<view class="uni-uploader">
		    <view class="uni-uploader-head">
		        <view class="m-10upx">点击预览图片</view>
		        <view class="uni-uploader-info m-10upx">{{imageList.length}}/8</view>
		    </view>
		    <view class="uni-uploader-body">
		        <view class="uni-uploader__files">
		            <block v-for="(image,index) in imageList" :key="index">
		                <view class="uni-uploader__file" style="position: relative;">
		                    <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
		                    <view class="close-view" @click="close(index)">x</view>
		                </view>
		            </block>
		            <view class="uni-uploader__input-box" v-show="imageList.length < 8">
		            	<view class="uni-uploader__input" @tap="chooseImg"></view>
		            </view>
		        </view>
		    </view>
			
		</view>
		
		<!-- <button type="primary" @tap="startUpload()">上传图片</button> -->
		<button type="primary" @tap="startUpload2()">上传图片</button>
		<!-- <button type="primary" @tap="startUploadMulti(imageList)">上传多张图片</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				imgId:'',
				imgArr:[],
				count:-1,
				sendData: {
					uid:2,
				    content:'哈哈',
					imgIds:''
				},
			}
		},
		
		methods: {
			uploadFile2(imgPath, index, str){
				
				
				
				return str;
			},
			
			
			startUpload(){
				for (var i = 0; i < this.imageList.length; i++) {
					this.count++;
					console.log("count:" + this.count);
					// uni.uploadFile({
					//     url: 'http://localhost:8083/upload/image/return-id', //上传地址
					//     // url: 'https://jsonplaceholder.typicode.com/posts/', //上传地址
					//     filePath: this.imageList[this.count],
					// 	// files:imgs,
					//     name: 'file',
					// 	formData:{
					// 		uid:2
					// 	},
					//     success:(res) => {
					//     	console.log("上传成功的回调函数");
					// 		// res = JSON.parse(res);
					// 		console.log(res.data);
					// 		res = this.imgArr.push(res.data);
							
					// 		if(this.count == this.imageList.length - 1){
					// 			console.log("判断输出：count：" + this.count);
					// 			this.sendData.imgIds = res;
					// 			console.log(this.sendData);
					// 		}
					//     }
					// });
				}
				
			},
			
			startUpload2(){
				let str = '';
				for (var i = 0; i < this.imageList.length; i++) {
					this.count++;
					console.log("count:" + this.count);
					uni.uploadFile({
					    // url: 'http://localhost:8083/upload/image/return-id', //上传地址
					    url: 'https://jsonplaceholder.typicode.com/posts/', //上传地址
					    filePath: this.imageList[this.count],
						// files:imgs,
					    name: 'file',
						formData:{
							uid:2
						},
					    success:(res) => {
					    	console.log("上传成功的回调函数");
							console.log(JSON.parse(res.data));
							res = JSON.parse(res.data);
					
							this.imgArr.push(res.id);
							
							
					    }
					});
				}
				
				
				setTimeout(function(){
					str = this.imgArr;
					console.log("imgIds:" + this.imgArr);
					this.sendData.imgIds = str;
				},2000);
				
			},
			
			startUploadMulti(imageList){
				for (let i = 0; i < imageList.length; i++) {
					this.startUpload(imageList[i]);
				}
			},
			
			chooseImg(){
				// let startUploadVar = startUpload();
				
				uni.chooseImage({
					
					sourceType: ["camera", "album"],
					
					count: 8 - this.imageList.length,
					success: (res) => {
					    this.imageList = this.imageList.concat(res.tempFilePaths);
						console.log(this.imageList);
					},
					
					
				    
				});
			},
			
			previewImage() { //预览图片
			    uni.previewImage({
			        urls: this.imageList
			    });
			},
			
			
		},
		onLoad:function(option){
			console.log('test3-->option:');
			console.log(option.id);
		}
	}
</script>

<style>

</style>
