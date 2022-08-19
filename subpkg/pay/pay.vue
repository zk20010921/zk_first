<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{ all_amount }}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<view class="iconfont icon-xuanzhong checkbox" :class="payWays == 'weixinpay'? 'checked': '' "></view>
			</view>

			<view class="type-item b-b">
				<text class="icon yticon icon-alipay"></text>
				<view class="con"><text class="tit">支付宝支付</text></view>
				<view class="iconfont icon-xuanzhong checkbox" :class="payWays == 'alipay'? 'checked': '' "></view>
			</view>

			<!-- <view class="type-item" >
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥198.5</text>
				</view>
<view class="iconfont icon-xuanzhong checkbox "></view>
			</view> -->
		</view>

		<text class="mix-btn" @click="confirmPay">确认支付</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				all_amount: Number,
				orderId: '',
				payWays: 'alipay'
			}
		},
		onLoad(op) {
			this.all_amount = op.all_amount
			this.orderId = op.id
		},
		methods: {
			confirmPay() {
				let orderId = this.orderId
				this.$fly.post('/order/payOrder', {
						pay_type: 'alipay',
						orderId
					})
					.then(res => {
						console.log(res)
						let orderInfo = res.data.orderInfo
						uni.requestPayment({
							provider: 'alipay',
							orderInfo,
							success: (res) => {
								console.log('success:' + JSON.stringify(res));
								this.$fly.post('/order/query_order', {
										order_id: orderId
									})
									.then(res => {
										console.log(res)
										uni.navigateTo({
											url: '/pages/money/paySuccess'
										})
									})
							},
							fail: (err) => {
								console.log('fail:' + JSON.stringify(err));
							}
						})
					})
			}
		}
	}
</script>

<style lang="scss">
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		text {
			font-size: 36rpx;
		}

		.price {
			font-size: 50upx;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		color: #fff;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.checkbox {
		color: #d1d1d1;
		font-size: 40upx;

		&.checked {
			color: rgb(250, 67, 106);
		}
	}
</style>
