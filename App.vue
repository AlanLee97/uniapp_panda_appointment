<script>
export default {

	onLaunch: function() {
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: ''
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
		getApp().globalData = true;
	},
	onHide: function() {
		// console.log('App Hide');
	},
	methods:{

	}
};
</script>

<style>
/*每个页面公共css */ 
@import "colorui/main.css";
@import "colorui/icon.css";
/* @import "app.css";*/ /* 你的项目css */

/* #ifndef APP-NVUE */
@import './common/uni.css';
/* #endif */


	




/* 分割线 */
.divide-line-grey{
		height: 1upx;
		background-color: #EFEFEF;
}

/*================BEGIN 背景颜色================*/
/* 白色背景 */
.bgcolor-white-ffffff{
	background-color: #FFFFFF;
}

/* 灰白色背景 */
.bgcolor-grey-fcfcfc{
	background-color: #FCFCFC;
}

/* 灰白色背景 */
.bgcolor-grey-f1f1f1{
	background-color: #F1F1F1;
}

/*================END 背景颜色================*/



/*================BEGIN 显示================*/
/* 显示为块状,让元素不会独占一行 */
.d-il-blk{
	display: inline-block;
}

/* 显示为块状,让元素不会独占一行 */
.d-blk{
	display: block;
}

/* 显示边框-红色：查看元素位置时使用 */
.show-border{
	border: red 1px solid;
}

/* 显示边框-绿色：查看元素位置时使用 */
.show-border-green{
	border: #39B54A 1px solid;
}

/* 显示边框-蓝色：查看元素位置时使用 */
.show-border-blue{
	border: #0081FF 1px solid;
}

/*----------- 位置 ----------*/
.position-abs{
	position: absolute;
}

.position-rela{
	position: relative;
}

.float-left{
	float: left;
}


.float-right{
	float: right;
}

.text-right{
	text-align: right;
}


/*----------- 显示效果 ----------*/
/* 显示圆角，有阴影10upx */
.box-shadow-raduis{
	box-shadow: 2upx 2upx 8upx #EFEFEF;
	border-radius: 10upx;
	background-color: #FFFFFF;
}

/* 显示圆角，无阴影10upx */
.box-raduis{
	background-color: #FFFFFF;
	border-radius: 10upx;
}

/* 显示阴影 */
.box-shadow{
	background-color: #FFFFFF;
	box-shadow: 3upx 3upx 8upx #DBDBDB;
	
}

/*================END 显示================*/




/*================BEGIN 宽度================*/
/* 元素宽度为50% */
.width-10{
	width: 10%;
}

.width-20{
	width: 20%;
}

.width-25{
	width: 25%;
}

.width-30{
	width: 30%;
}

.width-33{
	width: 33.3%;
}

.width-40{
	width: 40%;
}

.width-50{
	width: 50%;
}

.width-60{
	width: 60%;
}

.width-70{
	width: 70%;
}

.width-80{
	width: 80%;
}

.width-90{
	width: 90%;
}

.width-100{
	width: 100%;
}

/* ----- 高度 -----*/
.height-10{
	height: 10%;
}
.height-20{
	height: 20%;
}
.height-30{
	height: 30%;
}
.height-100{
	height: 100%;
}.height-40{
	height: 40%;
}
.height-50{
	height: 50%;
}.height-60{
	height: 60%;
}
.height-70{
	height: 70%;
}
.heght-80{
	height: 80%;
}
.height-90{
	height: 90%;
}
.height-100{
	height: 100%;
}


/*================END 宽度================*/



/*================BEGIN 边距================*/
/*---------- 外边距 ----------*/
/* 距离左边20upx */
.m-left-20upx{
	margin-left: 20upx;
}

/* 距离顶部20upx */
.mt-20upx{
	margin-top: 20upx;
}
.m-top--30upx{
	margin-top: 10upx;
}
.m-top--20upx{
	margin-top: 10upx;
}
.m-top--10upx{
	margin-top: 10upx;
}

.m-top-10upx{
	margin-top: 10upx;
}
.m-top-20upx{
	margin-top: 20upx;
}
.m-top-30upx{
	margin-top: 30upx;
}
.m-top-40upx{
	margin-top: 40upx;
}
.m-top-10upx{
	margin-top: 10upx;
}
.m-top-50upx{
	margin-top: 50upx;
}



/* 距离底部upx */
.m-bottom-10upx{
	margin-bottom: 10upx;
}
.m-bottom-20upx{
	margin-bottom: 20upx;
}
.m-bottom-30upx{
	margin-bottom: 20upx;
}
.m-bottom-20upx{
	margin-bottom: 30upx;
}
.m-bottom-40upx{
	margin-bottom: 40upx;
}
.m-bottom-20upx{
	margin-bottom: 20upx;
}
.m-bottom-50upx{
	margin-bottom: 50upx;
}
.m-bottom-60upx{
	margin-bottom: 60upx;
}
.m-bottom-70upx{
	margin-bottom: 70upx;
}
.m-bottom-80upx{
	margin-bottom: 80upx;
}
.m-bottom-90upx{
	margin-bottom: 90upx;
}
.m-bottom-100upx{
	margin-bottom: 100upx;
}


/* 外边距10upx */
.m-10upx{
	margin: 10upx;
}

/* 外边距20upx */
.m-20upx{
	margin: 20upx;
}

/* 外边距30upx */
.m-30upx{
	margin: 30upx;
}

/* 外边距40upx */
.m-40upx{
	margin: 40upx;
}


/*---------- 外边距 ----------*/
/* 内边距10upx */
.p-10upx{
	padding: 10upx;
}

/* 内边距20upx */
.p-20upx{
	padding: 20upx;
}

/* 内边距30upx */
.p-30upx{
	padding: 30upx;
}

/* 内边距40upx */
.p-40upx{
	padding: 40upx;
}



/* 内边距-左-10upx */
.p-left-10upx{
	padding-left: 10upx;
}

/* 内边距-左-20upx */
.p-left-20upx{
	padding-left: 20upx;
}

/* 内边距-左-30upx */
.p-left-30upx{
	padding-left: 30upx;
}

/* 内边距-左-40upx */
.p-left-40upx{
	padding-left: 40upx;
}


/* 内边距-上-10upx */
.p-top-10upx{
	padding-top: 10upx;
}

/* 内边距-上-20upx */
.p-top-20upx{
	padding-top: 20upx;
}

/* 内边距-上-30upx */
.p-top-30upx{
	padding-top: 30upx;
}

/* 内边距-上-40upx */
.p-top-40upx{
	padding-top: 40upx;
}


/* 内边距-右-10upx */
.p-right-10upx{
	padding-right: 10upx;
}

/* 内边距-右-20upx */
.p-right-20upx{
	padding-right: 20upx;
}

/* 内边距-右-30upx */
.p-right-30upx{
	padding-right: 30upx;
}

/* 内边距-右-40upx */
.p-right-40upx{
	padding-right: 40upx;
}


/* 内边距-下-10upx */
.p-bottom-10upx{
	padding-bottom: 10upx;
}

/* 内边距-下-20upx */
.p-bottom-20upx{
	padding-bottom: 20upx;
}

/* 内边距-下-30upx */
.p-bottom-30upx{
	padding-bottom: 30upx;
}

/* 内边距-下-40upx */
.p-bottom-40upx{
	padding-bottom: 40upx;
}


/*内外边距组合*/
.box-margin-padding{
	padding: 10upx;
	margin: 16upx;
}
	
.box-margin-no-bottom{
	margin-top: 16upx;
	margin-left: 16upx;
	margin-right: 16upx;
}

/*================END 边距================*/



/*================BEGIN 字体================*/
/* ---------- 字体大小 ----------*/
.fontsize-10upx{
	font-size: 10upx;
}

.fontsize-20upx{
	font-size: 20upx;
}

.fontsize-30upx{
	font-size: 30upx;
}

.fontsize-40upx{
	font-size: 40upx;
}

.fontsize-50upx{
	font-size: 50upx;
}

.fontsize-60upx{
	font-size: 60upx;
}

.fontsize-70upx{
	font-size: 70upx;
}

.fontsize-80upx{
	font-size: 80upx;
}

.fontsize-90upx{
	font-size: 90upx;
}

.fontsize-100upx{
	font-size: 100upx;
}



/* ---------- 字体粗细程度 ----------*/
.font-weight-50{
	font-weight: 50;
}

.font-weight-100{
	font-weight: 100;
}

.font-weight-200{
	font-weight: 200;
}

.font-weight-300{
	font-weight: 300;
}

.font-weight-400{
	font-weight: 400;
}


/* ---------- 字体颜色 ----------*/
/* 字体灰色 */
.font-color-grey{
	color: #bcbcbc;
}

.font-color-light-blue{
	color: #00e5ff;
}

.font-color-light-red{
	color: #f44336;
}

.font-color-light-black{
	color: #5f5f5f;
}

.font-color-light-green{
	color: #1de9b6;
}

/*================END 字体================*/



/*================BEGIN 图标================*/

.icon-size-50upx{
	width: 50upx;
	height: 50upx;
}

.icon-size-100upx{
	width: 100upx;
	height: 100upx;
}

.icon-size-150upx{
	width: 150upx;
	height: 150upx;
}

.icon-size-200upx{
	width: 200upx;
	height: 200upx;
}

/*================END 图标================*/




	/*滑动tab栏的样式*/
	.QS-tabs-box{
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: white;
	}
	.swiper-item{
		background-color: #fff;
	}
	.scroll-items{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 40rpx;
	}
	.scroll-item{
		margin-top: 15rpx;
		padding: 25rpx;
		background-color: white;
		border-radius: 8rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		border: 1px solid #f8f8f8;
	}
	.scroll-item-image-box{
		flex-grow: 0;
	}
	.scroll-item-text-box{
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 28rpx;
		/* font-weight: bold; */
		margin-left: 15rpx;
	}
	.scroll-item-image{
		border-radius: 4rpx;
		width: 180rpx;
		height: 150rpx;
	}
	
	
	
	.vbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.top_back_img {
		z-index: -1;
		position: absolute;
		top: 0upx;
		width: 100%;
		height: 420upx;
	
	}
	
	.top {
		display: flex;
		width: 100%;
		height: 420upx;
		align-items: center;
	}
	
	.circle {
		margin-left: 100upx;
		width: 120upx;
		height: 120upx;
		border: 10upx solid #a4f4f6;
		border-radius: 150upx;
		overflow: hidden;
	}
	
	.head {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
	}
	
	.top-texts {
		display: flex;
		flex-direction: column;
		margin-left: 15upx;
		color: white;
	}
	
	.name {
		font-size: 36upx;
		font-weight: 500;
	}
	
	.set-top-hr {
		width: 210upx;
		height: 6upx;
	}
	
	.top-changeInfo {
		margin-top: 250upx;
		width: 120upx;
		height: 28upx;
		line-height: 28upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		padding: 10upx;
		color: #33dce8;
	}
	
	.box-content-align-center{
		display: flex;
		align-items: center; /*定义body的元素垂直居中*/
		justify-content: center; /*定义body的里的元素水平居中*/
	}
</style>
