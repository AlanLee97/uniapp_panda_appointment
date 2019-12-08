<template>
    <view class="page">
        <view class="box-margin-padding box-shadow-raduis  mt-20upx">
            <textarea placeholder="给作品附上一句美文吧" v-model="sendData.content" class="p-10upx" />
        </view>

        <view class="box-shadow-raduis box-margin-padding mt-20upx feedback-uploader">
            <view class="uni-uploader">
                <view class="uni-uploader-head">
                    <view class="p-10upx">点击预览图片</view>
                    <view class="p-10upx">{{imageList.length}}/9</view>
                </view>
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files">
                        <block v-for="(image,index) in imageList" :key="index">
                            <view class="uni-uploader__file" style="position: relative;">
                                <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
                                <view class="close-view" @click="close(index)">x</view>
                            </view>
                        </block>
                        <view class="uni-uploader__input-box" v-show="imageList.length < 9">
                        	<view class="uni-uploader__input" @tap="chooseImg"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

		<button type="primary" class="m-20upx" @tap="startUpload()">发表</button>
        

    </view>
</template>

<script>
	
    export default {
        data() {
            return {
                br:'\n',
                imageList: [],
				imgId:[],
				strImgID:'',
                sendData: {
					uid:0,
                    content:'',
					imgIds:''
                },
				
            }
        },
        onLoad() {
            
        },
		onShow() {
			console.log(this.strImgID);
		},
		
        methods: {
            close(e){
                this.imageList.splice(e,1);
            },

            chooseImg() { //选择图片
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    
                    count: 9 - this.imageList.length,
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
                    }
                })
            },

            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
			
			startUpload(){
				let userinfo = this.getUserInfo();
				this.sendData.uid = userinfo.id;
				
				let str = '';
				uni.setStorageSync("imgIds", str);
				for (var i = 0; i < this.imageList.length; i++) {
					uni.uploadFile({
					    url: 'http://localhost:8083/upload/image/return-id', //上传地址
					    // url: 'https://jsonplaceholder.typicode.com/posts/', //上传地址
					    filePath: this.imageList[i],
					    name: 'file',
						formData:{
							uid:2
						},
					    success:(res) => {
					    	console.log("上传成功的回调函数");
							console.log(res.data);
							str = str + res.data + ";";
							uni.setStorageSync("imgIds", str);
							str = uni.getStorageSync("imgIds");
							console.log(str);
							if(i == this.imageList.length){
								this.sendData.imgIds = str;
								console.log(this.sendData);
								this.sendRequest();
							}
							
					    }
					});
				}	
											
											
				// setTimeout(function(){
				// 	str = uni.getStorageSync("imgIds");
				// 	console.log(str);
				// 	this.sendData.imgIds = uni.getStorageSync("imgIds");
				// }, 2000);
				
			},
			
            sendRequest() { //发表作品
				console.log(this.sendData);
				uni.request({
					url: this.createApiUrl('works/add'),
					method: 'POST',
					header: {
					        'content-type': 'application/x-www-form-urlencoded'  
					},
					data: this.sendData,
					success: res => {
						console.log(res);
						res = res.data;
						if(res.code == 200){
							uni.showToast({
								title:'发表成功',
								success:function(){
									// uni.switchTab({
									// 	url:'../tabbar/tabbar-1/tabbar-1',
									// })
								}
							});
							
						}else{
							uni.showToast({
								title:'发表失败，请稍候再试',
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
				
				

            }
        }
    }
</script>

<style>
    @font-face {
    	font-family: uniicons;
    	font-weight: normal;
    	font-style: normal;
    	src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
    }
    /*页面背景颜色f8f8f8*/
    page{
    	background-color: #F8F8F8;
    }
    view{
        font-size: 28upx;
    }
    .input-view {
        font-size: 28upx;
    }
    .close-view{
        text-align: center;line-height:14px;height: 16px;width: 16px;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -6px;right: -4px;font-size: 12px;
    }
    /* 上传 */
    .uni-uploader {
    	flex: 1;
    	flex-direction: column;
    }
    .uni-uploader-head {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    }
    .uni-uploader-info {
    	color: #B2B2B2;
    }
    .uni-uploader-body {
    	margin-top: 16upx;
    }
    .uni-uploader__files {
    	display: flex;
    	flex-direction: row;
    	flex-wrap: wrap;
    }
    .uni-uploader__file {
    	margin: 10upx;
    	width: 210upx;
    	height: 210upx;
    }
    .uni-uploader__img {
    	display: block;
    	width: 210upx;
    	height: 210upx;
    }
    .uni-uploader__input-box {
    	position: relative;
    	margin:10upx;
    	width: 208upx;
    	height: 208upx;
    	border: 2upx solid #D9D9D9;
    }
    .uni-uploader__input-box:before,
    .uni-uploader__input-box:after {
    	content: " ";
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	-webkit-transform: translate(-50%, -50%);
    	transform: translate(-50%, -50%);
    	background-color: #D9D9D9;
    }
    .uni-uploader__input-box:before {
    	width: 4upx;
    	height: 79upx;
    }
    .uni-uploader__input-box:after {
    	width: 79upx;
    	height: 4upx;
    }
    .uni-uploader__input-box:active {
    	border-color: #999999;
    }
    .uni-uploader__input-box:active:before,
    .uni-uploader__input-box:active:after {
    	background-color: #999999;
    }
    .uni-uploader__input {
    	position: absolute;
    	z-index: 1;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	opacity: 0;
    }
    

</style>
