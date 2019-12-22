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

		<!-- 选择图片 -->
        <view class="box-margin-padding box-raduis">
            <view class="uni-uploader">
                <view class="uni-uploader-head">
                    <view class="m-10upx">点击预览图片</view>
                    <view class="uni-uploader-info m-10upx">{{imageList.length}}/1</view>
                </view>
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files">
                        <block v-for="(image,index) in imageList" :key="index">
                            <view class="uni-uploader__file" style="position: relative;">
                                <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
                                <view class="close-view" @click="close(index)">x</view>
                            </view>
                        </block>
                        <view class="uni-uploader__input-box" v-show="imageList.length < 1">
                        	<view class="uni-uploader__input" @tap="chooseImg"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
		
		<!-- 选择约拍类型 -->
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

		<!-- 选择约拍日期、地点 -->
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
			:defaultVal="['广东省','广州市','天河区']"
			:areaCode="['33','3301','330108']"
			:hideArea="false"
			@confirm="onConfirm" 
			ref="region" 
		></w-picker>
		

		<view class="box-raduis box-margin-padding2 ">
			
			<view class=" ">
				<view class=" d-il-blk">费用</view>
				
				<view class=" width-20 d-il-blk p-left-20upx">
					<input type="text" value=""
							v-model="sendData.apt_fee"
						   class="input-money"/>
				</view>
			</view>
			   
		</view>

		<button type="primary" class="feedback-submit" @tap="publishAppointment()">发布</button>
        

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
					apt_image:'',
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
			let res = this.getUserInfo();
			
			let uid = res.id;
			this.sendData.userId = uid;
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
                    
                    count: 1 - this.imageList.length,
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
						console.log(this.imageList);
                    }
                })
            },
			
			uploadImage:function(){
				uni.showLoading({
					title:'发布中...'
				})
				uni.uploadFile({
					url:this.createApiUrl('/upload/return-url'),
					filePath: this.imageList[0],
					name: 'file',
					formData:{
						uid:this.sendData.userId
					},
					success:res => {
						
						console.log("上传成功的回调函数");
						console.log(res);
						this.sendData.apt_image = res.data;
						
						//发送请求
						this.sendRequest();
						
					},
					fail:err => {
						console.log(err);
						uni.showToast({
							title:'发表失败，原因：图片上传失败。'
						});
						return;
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
            
            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
			
			publishAppointment:function(){
				this.uploadImage();
				// this.sendRequest();
			},
			
            sendRequest:function() { //发送请求
				
				uni.showLoading({
					title:'正在发布',
					
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
						uni.hideLoading();
						if(res.data.code == 200){
							
							uni.showToast({
								title:'发布成功'
							})
							uni.switchTab({
								url:'/pages/tabbar/tabbar-1/tabbar-1'
							})
						}else{
							uni.showToast({
								title:'发布失败，请稍候再试！'
							})
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
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
	
	
	
	.box-margin-padding2{
		padding: 20upx;
		margin: 16upx;
	}
	
	.input-money{
		/* background-color: #FCFCFC; */
		font-size: 40upx;
		border-bottom: #BBBBBB 1px solid;
		margin-bottom: -10upx;
	}
	
	
	
	
</style>
