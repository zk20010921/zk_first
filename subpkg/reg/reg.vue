<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<view class="title-contents"><view class="top-view status"></view></view>
		<!-- #endif -->
		<view class="login-title">
			<view class="logo"><image src="/static/images/common/logo.png" mode=""></image></view>
		</view>
		<!-- 密码登录 -->
		<view class="login-phone form-wapper">
			<view class="phone input-wapper">
				<view class="lside"><text style="color: #FDD51A;" class="iconfont icon-shouji"></text></view>
				<view class="mobile rside"><input placeholder-class="input-placeholder" v-model="username" type="number" placeholder="请输入手机号" /></view>
			</view>
			<view class="phone input-wapper">
				<view class="lside"><text style="color: #FDD51A;"  class="iconfont icon-yanzhengma"></text></view>
				<view class="mobile rside"><input placeholder-class="input-placeholder" type="number" v-model="vercode"  placeholder="请输入验证码" /></view>

				<view >
					<button @click="yanzheng" type="default" >获取验证码</button>
				</view>
			</view>
			<view class="code input-wapper">
				<view class="lside"><text style="color: #FDD51A;"  class="iconfont icon-mima2"></text></view>
				<view class="rside"><input placeholder-class="input-placeholder" type="password" v-model="password" maxlength="12"  placeholder="请输入密码(6-12位) " /></view>
			</view>
		</view>

		<button type="primary" style="background-color: #FDD51A;" class="login-btn" @click="reg" >注册</button>
		<view class="reg-paw"><text style="color: #FDD51A;" class="active" @click="toLogin">已有账号,返回登录</text></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				username:'',//手机号
				password:'',//密码
				vercode:'',//验证码
			};
		},
		onLoad(e) {},
		onShow() {},
		methods: {
			//发送验证码
			yanzheng(){
				this.$http.post('/user/sendSms',
				{mobile:this.username,type:'register'}
				)
				.then((res)=>{
					console.log(res);
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			//注册
			reg(){
				this.$http.post('/user/reg',
				{username:this.username,password:this.password,vercode:this.vercode}
				)
				.then((res)=>{
					setTimeout(function() {
					this.toLogin()
					}, 1000);
					console.log(res);
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			//跳转login
			toLogin(){
				uni.redirectTo({
					url:'/subpkg/login/login'
				})
			}
		}
	};
</script>
<style lang="scss">
uni-button[type='default'] {
	background: #eee;
}
body,
page {
	font-size: 28upx;
	background: #fff;
	min-height: 100%;
}

/* #ifdef APP-PLUS || H5 */
.title-contents {
	position: fixed;
	top: 0upx;
	width: 100%;

	.top-view {
		width: 100%;
		height: var(--status-bar-height);
		background: #fff;
	}
}

/* #endif */
.warp {
	background: #fff;
	background: #fff;
	.login-title {
		position: relative;
		z-index: 9;
		height: 380upx;
		.navback {
			padding: 5px;
			position: absolute;
			left: 20upx;
			top: 70upx;
			border-radius: 50%;
			// background: rgba(0,0,0,0.5);
			// .iconfont{
			// 	color: #fff;
			// }
		}

		.logo {
			padding-top: 160upx;
			width: 100%;
			text-align: center;
			image {
				width: 160upx;
				height: 160upx;
				border-radius: 20upx;
			}
		}
	}

	.form-wapper {
		width: 100%;
		box-sizing: border-box;
		padding: 80upx 40upx 20upx;
		border-radius: 10upx;
		background: #fff;

		.input-wapper {
			display: flex;
			flex-direction: row;
			width: 94%;
			height: 120upx;
			margin-left: 3%;
			flex-wrap: wrap;
			align-items: center;
			position: relative;

			&:after {
				border-bottom: 1px solid #eee;
			}

			.lside {
				width: 54upx;
				text-align: left;
			}

			.rside {
				flex: 1;
			}

			.iconfont {
				font-size: 40upx;
			}

			input {
				height: 120upx;
			}

			.input-placeholder {
				color: #c2c2c2;
			}
                button{
					opacity: .8;background: #fdd100;color: #fff;
				}
			.get-code-btn {
				border: 0;
				background: #fff;
				font-size: 24upx;
				text-align: right;
				padding-left: 0;
				padding-right: 0;
			}
		}

		.paw {
			line-height: 80upx;
			width: 94%;
			height: 80upx;
			margin: 0 3%;
			text-align: right;
			display: flex;
			justify-content: flex-end;
		}
	}

	.login-btn {
		display: block;
		line-height: 90upx;
		text-align: center;
		width: 600upx;
		height: 90upx;
		font-size: 32upx;
		color: #fff;
		background-blend-mode: normal, normal;
		border-radius: 45px;

		&:after {
			border: 0;
		}
	}

	.reg-paw {
		margin: 20upx 0;
		text-align: center;

		text {
			font-size: 28upx;
			display: inline-block;
			width: 40%;
			color: #c5c5c5;
			position: relative;
			padding: 20upx 0;
		}
	}

	.quick {
		text-align: center;
		padding-bottom: 80upx;

		.quick-title {
			margin: 140upx 0 50upx 0;
			display: flex;
			align-items: center;
			justify-content: center;

			.txt {
				font-size: 24upx;
				color: #999;
				padding: 0 20upx;
			}

			.line {
				display: block;
				width: 120upx;
				position: relative;

				&:after {
					border-bottom: 1px solid #eee;
				}
			}
		}

		image {
			width: 72upx;
			height: 72upx;
			margin: 0 35upx;
		}
	}
}
</style>
