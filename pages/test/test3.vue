<template>
	<view>
		<text>图片上传</text><br><br>
		
		<text>图片id：{{imgArr}}</text><br><br>
		
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
			
			<br><br>
			<text>2、图片id：{{imgId}}</text><br><br>
		</view>
		
		<!-- <button type="primary" @tap="startUpload()">上传图片</button> -->
		<button type="primary" @tap="sendRequest()">上传图片</button>
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
				imgArr2:[],
				count:0,
				sendData: {
					uid:2,
				    content:'哈哈',
					imgIds:''
				},
			}
		},
		
		methods: {
			
			startUpload(index){
				uni.uploadFile({
				    url: 'http://localhost:8083/upload/image/return-id', //上传地址
				    // url: 'https://jsonplaceholder.typicode.com/posts/', //上传地址
				    filePath: this.imageList[index],
					// files:imgs,
				    name: 'file',
					formData:{
						uid:2
					},
				    success:(res) => {
						this.count++;
				    	console.log("上传成功的回调函数");
						// res = JSON.parse(res);
						console.log(res);
						this.imgArr.push(res.data);
						this.imgId = this.imgId + res.data + ";";
				
						this.startUpload(this.count);
				    }
				});
				
			},
			
			startUpload2(index){
				uni.uploadFile({
				    // url: 'http://localhost:8083/upload/image/return-id', //上传地址
				    url: 'https://jsonplaceholder.typicode.com/posts/', //上传地址
				    filePath: this.imageList[index],
					// files:imgs,
				    name: 'file',
					formData:{
						uid:2
					},
				    success: res => {
						this.count++;
				    	console.log("上传成功的回调函数");
						console.log(JSON.parse(res.data));
						res = JSON.parse(res.data);
						this.imgArr.push(res.id);
						this.imgId = this.imgId + res.id + ";";
						this.startUpload2(this.count);
						
				    }
				});
				
				
			},
			
			sendRequest:function(){
				this.startUpload(this.count);
				let that = this;
				setTimeout(function(){

					
					that.imgId = that.imgArr.join(";");
					console.log(that.imgId);
					that.sendData.imgIds = that.imgId;
					
					console.log(that.sendData);
				},2000);
				
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

		}
	}
</script>

<style>

</style>
