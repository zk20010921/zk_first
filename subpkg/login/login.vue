<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<view class="title-contents">
			<view class="top-view status"></view>
		</view>
		<!-- #endif -->
		<view class="login-title">
			<view class="logo">
				<image src="/static/images/common/logo.png" mode=""></image>
			</view>
		</view>
		<view class="login-phone form-wapper">
			<view class="phone input-wapper">
				<view class="lside"><uni-icons type="phone" color="#FDD51A"></uni-icons></view>
				<view class="mobile rside"><input placeholder-class="input-placeholder" v-model="username" type="number"
						placeholder="请输入手机号" /></view>
			</view>
			<view class="code input-wapper">
				<view class="lside"><uni-icons type="locked" color="#FDD51A"></uni-icons></text></view>
				<view class="rside"><input placeholder-class="input-placeholder" v-model="password" type="password" maxlength="12"
						placeholder="请输入密码(6-12位) " /></view>
			</view>
			<view class="paw">
				<view class="btn">验证码登录</view>
			</view>
		</view>

		<button type="primary" class="login-btn" @click="logins">登录</button>
		<view class="reg-paw">
			<text class="active" @click="toReg">注册账号</text>
			<text >忘记密码</text>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="quick">
			<view class="quick-title">
				<text class="line"></text>
				<text class="txt">快捷登陆</text>
				<text class="line"></text>
			</view>
			<view class="sanfang">
				<image src="../../static/temp/share_wechat.png" mode=""></image>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				username:'',//账号
				password:'',//密码
				token:'',//token
				uid:'',//uid
			};
		},
		onLoad(e) {},
		onShow() {},
		methods: {
			//登录
			logins(){
				this.$http.post('/user/login',
				{username:this.username,password:this.password}
				)
				.then((res)=>{
					console.log(res);
					this.token = res.token
					this.uid = res.uid
					this.toHome()
					this.setToken()
					this.setUid()
					
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			//跳转注册页面
			toReg(){
				uni.navigateTo({
					url: '/subpkg/reg/reg',
				});
			},
			//储存token
			setToken(){
				uni.setStorage({
					data:this.token,
					key:'token'
				})
			},
			//储存uid
			setUid(){
				uni.setStorage({
					data:this.uid,
					key:'uid'
				})
			},
			//跳转我的页面
			toHome(){
				uni.switchTab({
					url: '/pages/my/my',
				});
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

				&:after {
					border: 0;
				}
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
			color: #FDD51A;
			font-size: 26rpx;
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
		background-color: #FDD51A;

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
		.active {
		}

		text:first-child {
			
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
