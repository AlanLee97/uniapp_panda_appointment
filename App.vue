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


/* 分割线 */
.divide-line-grey{
		height: 1upx;
		background-color: #EFEFEF;
}


/*================BEGIN 显示================*/
/* 显示为块状,让元素不会独占一行 */
.d-il-blk{
	display: inline-block;
}

.d-blk{
	display: block;
}

/* 显示边框：查看元素位置时使用 */
.show-border{
	border: red 1px solid;
}

/*================END 显示================*/

/* 元素宽度为50% */
.width-50{
	width: 50%;
	text-align: center;
}


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

/*内外边距组合*/
.box-margin-padding{
		background-color: #FFFFFF;
		padding: 10upx;
		margin: 16upx;
	}

/*================END 边距================*/



/*================BEGIN 字体================*/
/* 字体灰色 */
.font-color-grey{
	color: #bcbcbc;
}

/*================END 字体================*/

</style>
