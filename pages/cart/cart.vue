<template>
	<scroll-view scroll-y class="container">
		<view class="content-wrap">
			<view class="content-item">
				<view class="goods" v-for="(item,index) in cardList" :key="index">
					<label class="act"><uni-icons @click="isSelect(item.checked,item._id)" :type="item.checked ? 'checkbox-filled': 'circle'" size="25" :color="item.checked ? '#FDD61E':'#bbb'"></uni-icons></text></label>
					<view class="good">
						<view class="img-wrapper">
							<image :src="item.img" mode=""></image>
						</view>
						<view class="good-content">
							<view class="good-title text-line">{{item.name}}</view>
							<view class="spec">
								<view class="spec1"><text class="name ellipsis">{{item.attr}}</text></view>
							</view>
							<view class="good-desc">
								<view class="good-price">
									<text>￥</text>
									{{item.price}}
								</view>
								<u-number-box @plus="addNum" @minus="delNum" :max="item.stock" min="1" v-model="item.num" @change="valChange"></u-number-box>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="total-wrap">
			<view class="total-left">
				<label class="act">
					<uni-icons :type="item.checked ? 'checkbox-filled': 'circle'" size="25" :color="item.checked ? '#FDD61E':'#bbb'"></uni-icons>
					全选
				</label>

				<view class="total-con">
					<view class="top-con">
						合计:
						<text class="symbol">￥</text>
						<text class="total">15555</text>
					</view>
				</view>
			</view>

			<view class="total-right">购买</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				uid: 0, //uid
				cardList:[],//购物车列表
			};
		},
		onLoad() {
			this.getUid()
		},
		onShow() {
			this.getCartlist()
		},
		methods: {
			numberChange() {

			},
			valChange(){
				
			},
			//获取uid
			getUid() {
				this.uid = uni.getStorageSync('uid')
			},
			//获取购物车列表
			getCartlist() {
				this.$http.post('/api/get_cart_list', {
						uid: this.uid
					})
					.then((res) => {
						console.log(res);
						this.cardList = res.data
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//是否选中
			isSelect(checked,_id){
				this.$http.post('/api/toggle_check_cart',
				{_id:_id,checked:checked}
				)
				.then((res)=>{
					console.log(res);
					this.cardList = res.data
					this.getCartlist()
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			addNum(e){
				console.log(e);
				// let num = e.value
				// this.$http.post('/api/change_cart_num',
				// {_id:this._id[index],num:num}
				// )
				// .then((res)=>{
				// 	console.log(res);
				// })
				// .catch((err)=>{
				// 	console.log(err);
				// })
			},
			//映射出数组中是否全部选中
			isSelectAll(){
				let isSelectAll = this.cardList.map((item,index)=>{
					return item.checked
				})
				console.log(isSelectAll);
			}
		}
	};
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.header {
			position: relative;
			width: 100%;
			height: 360upx;
			background: #fc7827;
			background-size: cover;
			overflow: hidden;
			/*  #ifndef  APP-PLUS  */
			height: 280upx;
			background-size: 100% 100%;

			/*  #endif  */
			.title-contents {
				position: fixed;
				top: 0;
				width: 100%;
				height: calc(var(--status-bar-height) + 88upx);
				z-index: 100008;

				.top-view {
					width: 100%;
					height: var(--status-bar-height);
					background: #fc7827;
				}

				.titles {
					display: flex;
					flex-direction: row;
					height: 88upx;
					background: #fc7827;

					.titleLeftButton {
						width: 88upx;
						height: 88upx;
						line-height: 88upx;
						text-align: center;

						image {
							width: 40upx;
							height: 40upx;
						}
					}

					.titleText {
						width: 574upx;
						line-height: 88upx;
						text-align: center;
						font-size: 36upx;
						color: #fff;
					}

					.titleRightButton {
						width: 88upx;
						height: 88upx;
						line-height: 88upx;
						text-align: center;
						font-size: 32upx;
						color: #fff;
					}
				}
			}
		}

		.content-wrap {
			margin-top: 20upx;
			margin-left: 24upx;
			width: 702upx;

			//
			.content-item {
				margin-bottom: 20upx;
				border-radius: 20upx;
				background: #fff;
			}

			.goods {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20upx;


				label {
					margin-left: 20upx;
					line-height: 214upx;

					.iconfont {
						font-size: 46upx;
						color: #bbb;
					}
				}

				.good {
					display: flex;
					justify-content: space-between;
					width: 624upx;
					padding: 20upx 0 0;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;

					.img-wrapper {
						width: 180upx;
						height: 180upx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.good-content {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						width: 440upx;
						height: 180upx;
						padding: 0 20upx;
						box-sizing: border-box;

						.good-title {
							font-size: 28upx;
							color: #111;
						}

						.spec {
							display: flex;
							flex-direction: row;

							.spec1 {
								display: flex;
								flex-direction: row;
								align-items: center;
								padding: 0 16upx;
								box-sizing: border-box;
								width: 100%;
								height: 40upx;
								border-radius: 8upx;
								//

								.name {
									display: inline-block;
									// width: 85%;
									padding: 0 15upx;
									line-height: 40upx;
									font-size: 24upx;
									color: #666;
									background: #f6f6f6;
								}

								.iconfont {
									color: #999;
								}
							}
						}

						.good-desc {
							display: flex;
							justify-content: space-between;

							.good-price {
								line-height: 38upx;
								color: #fb5248;
								font-size: 30upx;
							}
						}
					}
				}
			}
		}

		.total-wrap {
			position: fixed;
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			background: #fff;
			z-index: 9;
			/*  #ifndef  H5  */
			bottom: 0px;
			/*  #endif  */
			/*  #ifdef  H5  */
			bottom: 50px;
			/*  #endif  */

			.total-left {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding-left: 20upx;
				width: 490upx;
				height: 100%;
				color: #333;
				box-sizing: border-box;

				label {
					font-size: 28upx;
					display: flex;
					align-items: center;

					.iconfont {
						font-size: 46upx;
						color: #bbb;
						margin-right: 5px;
					}
				}

				.total-con {
					display: flex;
					flex-direction: column;
					margin-right: 20upx;

					.top-con {
						display: flex;
						flex-direction: row;
						line-height: 100upx;
						font-size: 30upx;
						color: #333;

						.freight {
							margin-right: 16upx;
							font-size: 22upx;
							color: #999;
						}

						.symbol {
							font-size: 24upx;
							color: #fc511f;
						}

						.total {
							color: #fc511f;
						}
					}

					.bottom-con {
						display: flex;
						flex-direction: row;
						line-height: 36upx;
						font-size: 22upx;

						.discounts {
							color: #fb5248;
							margin-right: 16upx;
						}

						.detail {
							color: #666;
						}

						.iconfont {
							font-size: 14px;
						}
					}
				}
			}

			.total-right {
				width: 200upx;
				height: 80upx;
				line-height: 80upx;
				margin-top: 10upx;
				margin-right: 20upx;
				background: #fc511f;
				color: #fff;
				text-align: center;
				font-size: 28upx;
				border-radius: 40upx;
			}
		}

		.mask {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 10009;
		}

		.mask-content {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 510upx;
			background: #fff;
			z-index: 10009;

			.head {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0 25upx;
				box-sizing: border-box;
				height: 110upx;

				.title {
					position: relative;
					padding-left: 20upx;
					box-sizing: border-box;
					line-height: 110upx;
					font-size: 32upx;
					color: #010101;
					font-weight: bold;

					text {
						margin-left: 20upx;
						font-weight: normal;
						font-size: 24upx;
						color: #666;
					}
				}

				image {
					width: 30upx;
					height: 30upx;
				}
			}

			.holder {
				color: #999;
			}

			.list {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin: 0 auto;
				width: 700upx;
				height: 70upx;

				// border-bottom: 1px solid #eee;
				text {
					font-size: 28upx;
					color: blue;

					text {
						margin-left: 20upx;
						font-size: 24upx;
						color: #666;
					}
				}
			}

			.footer {
				position: absolute;
				bottom: 0;
				width: 100%;
				line-height: 94upx;
				color: blue;
				background: blue;
				text-align: center;
				font-size: 34upx;
			}
		}
	}
</style>
