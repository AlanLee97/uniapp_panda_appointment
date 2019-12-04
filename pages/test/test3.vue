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
		
		<button type="primary" @tap="startUpload(imageList[0])">上传图片</button>
		<button type="primary" @tap="startUploadMulti(imageList)">上传多张图片</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
			}
		},
		methods: {
			startUpload(image){
				
				const uploadTask = uni.uploadFile({
				    url: 'http://localhost:8083/testoss/upload-one', //上传地址
				    filePath: image,
				    name: 'file',
				    formData: {
				        'user': 'test'
				    },
				    success: (uploadFileRes) => {
				        console.log(uploadFileRes.data);
				    }
				});
								
				uploadTask.onProgressUpdate((res) => {
				    console.log('上传进度' + res.progress);
				    console.log('已经上传的数据长度' + res.totalBytesSent);
				    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
								
				    // 测试条件，取消上传任务。
				    if (res.progress > 50) {
				        uploadTask.abort();
				    }
				});
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
