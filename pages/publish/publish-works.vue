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

		<button type="primary" class="m-20upx" @tap="publishWorks()">发表</button>
        

    </view>
</template>

<script>
	
    export default {
        data() {
            return {
                br:'\n',
                imageList: [],
				imgId:'',
				strImgID:'',
				imgArr:[],
				count:0,
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
						console.log(this.imageList);
						console.log(res);
                    }
                })
            },

            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
			
			startUpload(index){
				let userinfo = this.getUserInfo();
				this.sendData.uid = userinfo.id;
				
				uni.uploadFile({
				    url: 'http://localhost:8083/upload/image/return-id', //上传地址
				    filePath: this.imageList[index],
				    name: 'file',
					formData:{
						uid:this.sendData.uid
					},
				    success:res => {
						this.count++;
				    	console.log("上传成功的回调函数");
						console.log(res);
						this.imgArr.push(res.data);
						this.imgId = this.imgId + res.data + ";";
						this.startUpload(this.count);
						
				    }
				});
	
			},
			
            sendRequest() { //发表添加作品请求
			
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
						uni.hideLoading();
						if(res.code == 200){
							uni.showToast({
								title:'发表成功',
								duration:1000,
								success:function(){
									uni.switchTab({
										url:'../tabbar/tabbar-1/tabbar-1',
									})
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
				
				

            },
        
			publishWorks:function(){	
				uni.showLoading({
					title:'发送请求中...',
				})
				this.startUpload(this.count);
				let that = this;
				
				
				setTimeout(function(){
					that.imgId = that.imgArr.join(";");
					console.log(that.imgId);
					that.sendData.imgIds = that.imgId;
					console.log(that.sendData);
					that.sendRequest();
				},2000);
				
				
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
    

</style>
