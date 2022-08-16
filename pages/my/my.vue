<template>
	<scroll-view scroll-y class="container">
		<view class="header" @click="toXinxi">
			<view class="title-contents">
				<!--  #ifdef APP-PLUS||MP -->
				<view class="top-view status"></view>
				<!--  #endif -->
				<view class="header_pic">
					<image src="/static/images/my/my_bj.png" mode=""></image>
				</view>
				<view class="header_content">
					<view class="header_content_perple">
						<view class="">
							<image src="/static/images/my/001.png" mode=""></image>
						</view>
						<view class=""><text>{{nickname}}</text></view>
					</view>
				</view>
			</view>
		</view>

		<view class="order-section" @click="navTo('/pages/order/order')">
			<view class="order-item">
				<uni-icons type="calendar" color="#FDD51A" size="28"></uni-icons>
				<text>全部订单</text>
			</view>
			<view class="order-item">
				<uni-icons type="shop" color="#FDD51A" size="28"></uni-icons>
				<text>待付款</text>
			</view>
			<view class="order-item">
				<uni-icons type="upload" color="#FDD51A" size="28"></uni-icons>
				<text>待发货</text>
			</view>
			<view class="order-item">
				<uni-icons type="download" color="#FDD51A" size="28"></uni-icons>
				<text>待收货</text>
			</view>
			<view class="order-item">
				<uni-icons type="checkbox" color="#FDD51A" size="28"></uni-icons>
				<text>已完成</text>
			</view>
		</view>
		<view class="my_list">
			<view class="my_list_menu">
				<uni-icons class="iconfont" size="24" color="#888888" type="star-filled"></uni-icons>
				<view class="">
					<text>我的收藏</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
			<view class="my_list_menu">
				<uni-icons class="iconfont" size="24" color="#888888" type="location-filled"></uni-icons>
				<view class="">
					<text>地址管理</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
			<view class="my_list_menu">
				<uni-icons class="iconfont" size="22" color="#888888" type="heart-filled"></uni-icons>
				<view class="">
					<text>关于我们</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
			<view class="my_list_menu">
				<uni-icons class="iconfont" size="22" color="#888888" type="phone-filled"></uni-icons>
				<view class="">
					<text>联系我们</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
			<view class="my_list_menu">
				<uni-icons class="iconfont" size="22" color="#888888" type="gear-filled"></uni-icons>
				<view class="">
					<text>设置</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
	export default {
		data() {
			return {
				token: 0,
				nickname:'',//用户名
			};
		},
		onLoad(e) {
			//获取token
			try {
				const value = uni.getStorageSync('token');
				if (value) {
					this.token = value
				}
			} catch (e) {
				// error
			}
		},
		onShow() {
			//获取用户信息
			this.getXinxi()
		},
		methods: {
			//进入信息页面
			toXinxi() {
				uni.navigateTo({
					url: '/subpkg/xinxi/xinxi'
				});
			},
			//获取用户信息
			getXinxi() {
				this.$http.post('/user/getuserInfo', {
						token: this.token
					})
					.then((res) => {
						console.log(res);
						this.nickname = res.userInfo.nickname
					})
					.catch((err) => {
						console.log(err);
					})
			},
		}
	};
</script>

<style lang="scss">
	page {
		font-size: 28upx;
		background: #f5f5f5;

		.container {
			height: calc(100% - 100upx);
		}

		.header {
			position: relative;
			width: 100%;
			height: 400upx;
			// background-image: url('/static/assets/my/my_bg.png');
			background-size: cover;
			overflow: hidden;
			/*  #ifndef  APP-PLUS  */
			height: 400upx;
			background-size: 100% 100%;

			/*  #endif  */
			.title-contents {
				position: relative;
				top: 0;
				width: 100%;
				height: calc(var(--status-bar-height) + 88upx);
				z-index: 99;
				color: #fff;

				.top-view {
					width: 100%;
					height: var(--status-bar-height);
					background: #fb8173;
				}

				.header_pic {
					width: 100%;
					height: 280upx;
					position: relative;

					image {
						width: 100%;
						max-height: 400upx;
					}
				}

				.header_content {
					position: absolute;
					width: 94%;
					margin: 0 3%;
					top: 50upx;

					.header_content_top {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: flex-end;

						.iconfont {
							font-size: 52upx;
							margin-left: 20upx;
						}
					}

					.header_content_perple {
						height: 120upx;
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						align-items: center;
						font-size: 28upx;

						image {
							width: 120upx;
							height: 120upx;
							margin-right: 30upx;
							border-radius: 50%;
						}
					}
				}
			}
		}

		.order-section {
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;
			border-radius: 10upx;
			height: 180upx;
			margin: -120upx auto 0;
			border-radius: 10px;
			width: 96%;
			position: relative;
			z-index: 998;
			background: #fff;

			.order-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: 24rpx;

				uni-icons {
					padding-bottom: 20rpx;
				}
			}

			.yticon,
			.iconfont {
				font-size: 48upx;
				margin-bottom: 18upx;
				color: #FDD100;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

		.my_list {
			width: 94%;
			margin: 40upx 3% 40upx;
			background: #fff;
			border-radius: 15upx;

			.my_list_menu {
				width: 94%;
				margin: 0 3%;
				height: 100upx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;

				.iconfont,
				.yticon {
					width: 15%;
					text-align: center;
					color: #888;
				}

				view {
					width: 85%;
					height: 100upx;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #eeeeee;

					.iconfont {
						text-align: right;
						color: #cbcbcb;
					}
				}
			}
		}
	}
</style>
