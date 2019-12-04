<template>
	<view class="page">
		<view class="box-margin-padding box-raduis">
			<input type="text" 
				class="input-title m-10upx p-10upx" 
				value="" 
				placeholder="标题" 
				v-model="sendData.title"
			/>
			
			<view class="divide-line-grey">
				
			</view>
			<textarea placeholder="约拍说明" v-model="sendData.ask" class="input-content m-10upx p-10upx" />
		</view>

        <view class="box-margin-padding box-raduis">
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
        </view>
		
		<!-- picker -->
		<view class="box-margin-padding2 box-raduis m-10upx p-10upx">
			<view class="">
				<view class="d-il-blk">
					约拍类型
				</view>
				<view class="d-il-blk m-left-20upx">
					<picker @change="bindPickerChange" :value="index" :range="aptTypeArr">
						<view class="font-color-grey">{{aptTypeArr[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		
		
		
		<view 
			class="box-margin-padding2 box-raduis m-10upx p-10upx" 
			:class="{'active':index==tabIndex}" 
			@tap="toggleTab(item,index)" 
			v-for="(item,index) in tabList" 
			:key="index">
			
			<view class="d-il-blk">{{item.name}}</view>
			
			<view class="d-il-blk m-left-20upx">
				<view v-if="item.name == '约拍日期'" class="font-color-grey">{{resultInfo.pickDate.result}}</view>
				<view v-if="item.name == '选择地点'" class="font-color-grey">{{resultInfo.pickSite.result}}</view>
			</view>
			
		</view>
		
		<w-picker 
			mode="limit" 
			dayStep="60"
			startHour="8"
			endHour="20"
			minuteStep="5"
			afterStep="30"
			@confirm="onConfirm"
			ref="limit" 
			themeColor="#f00"
		></w-picker>
		
		<w-picker 
			mode="region"
			:defaultVal="['浙江省','杭州市','滨江区']"
			:areaCode="['33','3301','330108']"
			:hideArea="false"
			@confirm="onConfirm" 
			ref="region" 
		></w-picker>
		

		
		<view class="box-raduis box-margin-padding2 ">
			
			<span class="">费用</span>
			
			<view class="d-il-blk m-left-20upx">
				<input type="text" value=""
						v-model="sendData.apt_fee"
					   class="p-10upx input-money"/>
			</view>
			   
		</view>

		<button type="primary" class="feedback-submit" @tap="send">发布</button>
        

    </view>
</template>

<script>
	
	import wPicker from "@/components/w-picker/w-picker.vue";
    export default {
		components:{
			wPicker
		},
        data() {
            return {
				br:'\n',
                imageList: [],
				tabIndex:0,

				aptTypeArr: ['普通拍照', '毕业照', '婚纱照', '电商模特'],
				index:0,
				
				//发送的数据
				sendData:{
					userId:0,
					title:'',
					ask:'',
					apt_type:'',
					apt_date:'',
					apt_site:'',
					apt_fee:0
				},
				
				//picker
				startYear:new Date().getFullYear(),
				mode:"range",
				defaultVal:[0,0,0,0,0,0,0],
				tabList:[
					{
						mode:"limit",
						name:"约拍日期"
					},
					{
						mode:"region",
						name:"选择地点"
					}
				],
				resultInfo:{
					pickDate:"",
					pickSite:""
				},
				linkList:[
					{
						label:"浙江省",
						value:"10",
						children:[
							{
								label:"杭州市",
								value:"1010",
								children:[
									{
										label:"滨江区",
										value:"10101"
									},
									{
										label:"萧山区",
										value:"10102"
									}
								]
							},
							{
								label:"宁波市",
								value:"1012",
								children:[
									{
										label:"海曙区",
										value:"10121"
									},
									{
										label:"鄞州区",
										value:"10122"
									}
								]
							}
						]
				},
					{
						label:"广东省",
						value:"20",
						children:[
							{
								label:"广州市",
								value:"2010",
								children:[
									{
										label:"广州1区",
										value:"20101"
									},
									{
										label:"广州2区",
										value:"20102"
									}
								]
							},
							{
								label:"深圳市",
								value:"2012",
								children:[
									{
										label:"深圳1区",
										value:"20121"
									},
									{
										label:"深圳2区",
										value:"20122"
									}
								]
							}
						]
					}
				],			
            }
        },
        onLoad() {

        },
		onShow:function(){
			
		},
        methods: {
			bindPickerChange: function(e) {
						console.log(e);
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
						let i = e.target.value;
						let type = this.aptTypeArr[e.target.value];
						console.log("index:" + i + ", type:" + type);
						this.sendData.apt_type = this.aptTypeArr[e.target.value];
			},
            close(e){
                this.imageList.splice(e,1);
            },
            
            chooseImg() { //选择图片
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    
                    count: 8 - this.imageList.length,
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
						console.log(this.imageList);
                    }
                })
            },
            
            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
            send() { //发送请求
				let res = this.getUserInfo();
				
				let uid = res.id;
				this.sendData.userId = uid;
				
				console.log(res);
				
				console.log('sendData:');
                console.log(JSON.stringify(this.sendData));
                let imgs = this.imageList.map((value, index) => {
                    return {
                        name: "image" + index,
                        uri: value
                    }
                });
				
				uni.showLoading({
					title:'正在发布'
				})
				
				uni.request({
					url: this.createApiUrl('appointment/add'),
					method: 'POST',
					header: {
					        'content-type': 'application/x-www-form-urlencoded'  
					},
					data: this.sendData,
					success: res => {
						console.log(res);
						if(res.data.data.code == 200){
							uni.hideLoading();
							uni.showToast({
								title:'发布成功'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
				
				
                // uni.uploadFile({
                //     url: "https://service.dcloud.net.cn/feedback",
                //     files: imgs,
                //     formData: this.sendDate,
                //     success: (res) => {
                //         if (res.statusCode === 200) {
                //             uni.showToast({
                //                 title: "反馈成功!"
                //             });
                //             this.imageList = [];
                //             this.sendDate = {
                //                 score: 0,
                //                 content: "",
                //                 contact: ""
                //             }
                //         }
                //     },
                //     fail: (res) => {
                //         uni.showToast({
                //             title: "失败",
                //             icon:"none"
                //         });
                //         console.log(res)
                //     }
                // });
            },
			
			
			//picker
			toggleTab(item,index){
				this.tabIndex=index;
				this.mode=item.mode;
				this.defaultVal=item.value;
				this.$refs[item.mode].show();
			},
			onConfirm(val){
				console.log(val);
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				switch(this.mode){
					case "limit":
						this.resultInfo.pickDate = val;
						this.sendData.apt_date = val.result;
						break;
					case "region":
						this.resultInfo.pickSite=val;
						this.sendData.apt_site = val.result;
						break;
				}
				
			}
		}
    }
</script>

<style>
	/*页面背景颜色f8f8f8*/
	page{
		background-color: #F8F8F8;
	}
	
    @font-face {
    	font-family: uniicons;
    	font-weight: normal;
    	font-style: normal;
    	src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
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
    
    /*问题反馈*/
    .feedback-title {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    	padding: 20upx;
    	color: #8f8f94;
    	font-size: 28upx;
    }
    .feedback-star-view.feedback-title {
    	justify-content: flex-start;
    	margin: 0;
    }
    .feedback-quick {
    	position: relative;
    	padding-right: 40upx;
    }
    .feedback-quick:after {
    	font-family: uniicons;
    	font-size: 40upx;
    	content: '\e581';
    	position: absolute;
    	right: 0;
    	top: 50%;
    	color: #bbb;
    	-webkit-transform: translateY(-50%);
    	transform: translateY(-50%);
    }
    .feedback-body {
    	background: #fff;
    }
    .feedback-textare {
    	height: 200upx;
    	font-size: 34upx;
    	line-height: 50upx;
    	width: 100%;
    	box-sizing: border-box;
    	padding: 20upx 30upx 0;
    }
    .feedback-input {
    	font-size: 34upx;
    	height: 50upx;
    	min-height: 50upx;
    	padding: 15upx 20upx;
    	line-height: 50upx;
    }
    .feedback-uploader {
    	padding: 22upx 20upx;
    }
    .feedback-star {
    	font-family: uniicons;
    	font-size: 40upx;
    	margin-left: 6upx;
    }
    .feedback-star-view {
    	margin-left: 20upx;
    }
    .feedback-star:after {
    	content: '\e408';
    }
    .feedback-star.active {
    	color: #FFB400;
    }
    .feedback-star.active:after {
    	content: '\e438';
    }
    .feedback-submit {
    	background: #007AFF;
    	color: #FFFFFF;
    	margin: 20upx;
    }
	
	
	
	
	/* picker */
	.tab{
		padding:20upx 0;
		font-size: 32upx;
	}
	.tab.active{
		color:#f00;
	}
	.result{
		margin-top: 100upx;
		font-size: 32upx;
	}
	
	.input-title{
		font-size: 22px;
		font-weight: 600;
		color: #222222;
	}
	
	.input-content{
		color: #C1C1C1;
	}
	
	
	
	.box-margin-padding{
		background-color: #FFFFFF;
		padding: 10upx;
		margin: 16upx;
	}
	
	.box-margin-padding2{
		padding: 20upx;
		margin: 16upx;
	}
	
	.input-money{
		background-color: #F8F8F8;
		font-size: 40upx;
		margin-top: 10upx;
		
	}
	
	
	
	
</style>
