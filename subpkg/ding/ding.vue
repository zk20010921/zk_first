<template>
	<view class="">
		<view class="order_tit">
			<scroll-view scroll-x="true" class="scroll">
				<text class="act" >全部</text>
				<text  >待付款</text>
				<text >待发货</text>
				<text >待收货</text>
				<text >已完成</text>
				<!-- <text :class="[(params.status == 5||params.status == 4)?'act':'']" data-index="5">售后</text> -->
			</scroll-view>
		</view>

		<view class="order_box">
			<view class="order_list" @click="navTo('/pages/order/order_detail')">
				<view class="order_top">
					<text class="order_pa">订单号：202132432432423</text>
					<text class="order_pb">待付款</text>
				</view>
				<view class="order_center" >
					<image src="/static/images/shop/goods_banner1.jpg"></image>
					<view class="order_good">
						<view class="order_pc">超级精品进口狗粮 艾肯 1kg</view>
						<view class="order_pd">大包</view>
						<view class="order_pe">
							<text class="price">¥100</text>
							<text>x1</text>
						</view>
					</view>
				</view>
				<view class="order_fee">
					<!-- <text class="order_pf">14:00</text> -->
					<text class="order_pg">
						共 1件商品 实付款
						<text style="color: #FDD100;font-size: 34rpx;margin-left: 5px;">¥100</text>
					</text>
				</view>

				<template>
					<view class="order_bottom">
						<!-- <text data-type="del"  >删除订单</text> -->
						<text data-type="detail" >查看详情</text>
						<text data-type="pay"  class="act" >去付款</text>
					<!-- 	<text data-type="shouhuo"  class="act" >确认收货</text>
						<text data-type="del"  class="act" >删除订单</text>
						<text data-type="del"  >删除订单</text>
						<text data-type="detail"  class="act" >去评价</text> -->
					</view>
				</template>
			</view>
		</view>

	</view>
</template>

<script>

</script>

<style lang="scss">
input::-webkit-input-placeholder {
	color: #ccc;
}

input::-moz-input-placeholder {
	color: #ccc;
}

input::-ms-input-placeholder {
	color: #ccc;
}

// .uni-load-more{

// 	margin-top: 100upx;
// }
.order_ipt {
	width: 580upx;
	height: 30px;
	border: 1px #eee solid;
	border-radius: 20px;
	font-size: 30upx;
	line-height: 30px;
	color: #666;
	padding: 0 10px;
	margin: 7.5px 0;
	text-align: center;
}

.order_box {
	width: 100%;
	height: auto;
	overflow: hidden;
	padding: 100rpx 30rpx 20rpx;

	.order_list {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: white;
		border-radius: 16upx;
		margin-top: 30upx;
		padding: 20upx;

		.order_top {
			width: 100%;
			height: auto;
			overflow: hidden;

			image {
				display: block;
				width: 40upx;
				height: 38upx;
				float: left;
				border-radius: 6rpx;
			}

			.order_pa {
				font-size: 28upx;
				color: #333;
				line-height: 38upx;
				float: left;
				margin-left: 16upx;
			}

			.order_pb {
				font-size: 24upx;
				line-height: 38upx;
				float: right;
			}
		}

		.order_center {
			width: 100%;
			height: auto;
			overflow: hidden;
			margin-top: 24upx;

			image {
				display: block;
				width: 200upx;
				height: 200upx;
				float: left;
			}

			.order_good {
				width: calc(100% - 200upx);
				height: 200rpx;
				padding-left: 20upx;
				overflow: hidden;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.order_pc {
					font-size: 24upx;
					color: #000000;
					height: 76upx;
					width: 100%;
					line-height: 36upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.order_pd {
					font-size: 24upx;
					color: #999999;
					margin-top: 16upx;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.order_pe {
					font-size: 32upx;
					font-weight: bold;
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;

					text {
						color: #999999;
						font-size: 24upx;
						font-weight: normal;
					}
					.price {
					}
				}
			}
		}

		.order_fee {
			width: 100%;
			height: 50rpx;
			overflow: hidden;
			line-height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-top: 8px;

			.order_pf {
				font-size: 24upx;
				display: block;
				float: left;
				line-height: 29upx;
				color: #999999;
			}

			.order_pg {
				font-size: 24upx;
				display: block;
				float: right;
				line-height: 29upx;
				color: #999999;
			}
		}

		.order_bottom {
			width: auto;
			height: auto;
			float: right;
			margin-top: 16upx;
			overflow: hidden;

			text {
				display: inline-block;
				min-width: 130upx;
				height: 48upx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(191, 191, 191, 1);
				opacity: 1;
				border-radius: 30upx;
				font-size: 24upx;
				text-align: center;
				padding: 0 17upx;
				line-height: 48upx;
				margin-left: 24upx;
			}

			.act {
				color: white;
			}
		}
	}
}

.icon-sousuo11 {
	font-size: 40upx;
	color: #999999;
}

.icon-fanhui11 {
	font-size: 32upx;
}

.order_tit {
	width: 100%;
	height: 87upx;
	position: fixed;
	left: 0;
	z-index: 22;
	background: white;

	.scroll {
		height: 87upx;

		text {
			display: block;
			width: 20%;
			height: auto;
			line-height: 87upx;
			float: left;
			text-align: center;
			font-size: 28upx;
			position: relative;
			color: #999999;
		}

		.act {

			&:before {
				content: '';
				width: 64upx;
				height: 8upx;
				border-radius: 80upx;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}
		}
	}
}
</style>
