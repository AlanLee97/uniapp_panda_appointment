<template>
  <view>
    <view class="row-tx">
		<text>头像</text>
		<image :src="userinfo.headPortraitImg" class="float-right round" style="width: 100upx; height: 100upx;"></image>
		
	</view>
	
	<view class="row">
		<text>用户名</text>
		<text class="float-right">{{userinfo.username}}</text>
	</view>
	
	<view class="row">
		<text>昵称</text>
		<text class="float-right">{{userinfo.nickname}}</text>
	</view>
	
	<view class="row">
		<text>联系方式</text>
		<text class="float-right">{{userinfo.phone}}</text>
	</view>
	
	<view class="row">
		<text>实名认证</text>
		<text class="float-right" v-if="userinfo.identity == 1">已认证</text>
		<text class="float-right" v-if="userinfo.identity == 0">未认证</text>
	</view>
	
	<view class="row">
		<text>修改密码</text>
	</view>
	
	<button class="btn-logout" @tap="logout()">退出登录</button>
  </view>
</template>

<script>
  import cmdNavBar from "@/components/cmd/cmd-nav-bar/cmd-nav-bar.vue"
  import cmdPageBody from "@/components/cmd/cmd-page-body/cmd-page-body.vue"
  import cmdTransition from "@/components/cmd/cmd-transition/cmd-transition.vue"
  import cmdCelItem from "@/components/cmd/cmd-cell-item/cmd-cell-item.vue"
  import cmdAvatar from "@/components/cmd/cmd-avatar/cmd-avatar.vue"

  export default {
    components: {
      cmdNavBar,
      cmdPageBody,
      cmdTransition,
      cmdCelItem,
      cmdAvatar
    },
	onShow() {
		let userinfo = this.getUserInfo();
		this.userinfo = userinfo;
		
	},

    data() {
      return {
		  userinfo:{},
	  };
    },

    mounted() {},
    
    methods:{
      /**
       * 点击触发
       * @param {Object} type 跳转页面名或者类型方式
       */
      fnClick(type){
        if(type == 'modify'){
          uni.navigateTo({
            url:'/pages/user/modify/modify'
          })
        }
      },
	  
	  logout: function() {
	  	uni.showModal({
	  		title: '提示',
	  		content: '确定退出登录？',
	  		confirmColor: '#5677FC',
	  		success: (res) => {
	  			if (res.confirm) {
	  				uni.clearStorage();
	  				uni.clearStorageSync();
	  				uni.reLaunch({
	  					url: '/pages/user/login'
	  				})
	  			}
	  		}
	  	});
	  },
    }
  }
</script>

<style>
  .btn-logout {
    margin-top: 100upx;
    width: 80%;
    border-radius: 50upx;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(to right, #365fff, #36bbff);
  }

  .btn-logout-hover {
    background: linear-gradient(to right, #365fdd, #36bbfa);
  }
  
  .row{
	  line-height: 2.0rem;
	  padding: 10upx 40upx 10upx 40upx;
  }
  .row-tx{
	 line-height: 3.0rem;
	 padding: 10upx 40upx 10upx 40upx; 
  }
  .float-right{
	  display: inline-block;
	  float: right;
  }
</style>
