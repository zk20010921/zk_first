<template>
	<view class="content">
		<view class="navbar">
			<view @click="oneClick" class="nav-item current" :class="oneShow ? 'changeColor':'' ">
				综合排序
			</view>
			<view @click="twoClick" class="nav-item current" :class="twoShow ? 'changeColor':'' ">
				销量优先
			</view>
			<view class="nav-item current" @click="threeClick" :class="threeShow ? 'changeColor2':''">
				<text :class="threeShow ? 'changeColor1':''">价格</text>
				<view class="p-box">
					<uni-icons :color="threeShow1 ? '#FDD61E': ''" type="top" size="15" style="margin-bottom: -20rpx;">
					</uni-icons>
					<uni-icons :color="threeShow2 ? '#FDD61E': ''" type="bottom" size="15"></uni-icons>
				</view>
			</view>
		</view>
		<view class="goods-list">
			<view class="goods-item" v-for="(item,index) in listArr" :key="index" @click="navTo(`/subpkg/goods_detail/goods_detail?_id=${item._id}`)">
				<view class="image-wrapper">
					<image :src="item.img" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.name}}</text>
				<view class="price-box">
					<text class="price" style="color: #FDD100;">{{item.price}}</text>
					<text style="color: #afafaf;">已售 {{item.sales}}</text>
				</view>
			</view>
		</view>

		<view style="text-align: center;margin-top:10rpx">
			<u-loading :show="show2" :calss="show2 ? 'bottom3':''" mode="circle"></u-loading>
		</view>
		<view class="bottom" :class="show ? 'bottom2':''">
			<text>已经到底了</text>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				cate_id: 0, //分类id
				listArr: [], //商品列表
				num: 0,
				show: false, //是否显示到底了文字
				show2: false, //是否显示加载动画
				oneShow: true,
				twoShow: false,
				threeShow: false,
				threeShow1: false,
				threeShow2: false,
				sort_type: 1,
				number: 0,
			}
		},
		onLoad(e) {
			this.cate_id = e.cate_id
			this.getList()
		},
		onShow() {
			uni.showToast({
				title: '加载中',
				icon: 'loading',
				duration: 500
			})
		},
		methods: {
			getList() {
				this.show2 = false
				this.$http.post('/api/get_goods_list', {
						cate_id: this.cate_id,
						is_top: 1,
						skip: this.num,
						limit: 10,
						sort_type: this.sort_type
					})
					.then((res) => {
						console.log(res);
						this.listArr = [...this.listArr, ...res.data]
						if (res.data.length == 0 || res.data.length < 10) {
							this.show = true
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//上拉触底
			onReachBottom() {
				this.num += 10
				this.show2 = true
				setTimeout(() => {
					this.getList()
				}, 1500)
			},
			//综合排序
			oneClick() {
				this.number = 0
				this.num = 0
				this.listArr = []
				this.sort_type = 1
				this.oneShow = true
				this.twoShow = false
				this.threeShow = false
				this.threeShow1 = false
				this.threeShow2 = false
				this.getList()
			},
			//销量优先
			twoClick() {
				this.number = 0
				this.num = 0
				this.sort_type = 2
				this.oneShow = false
				this.twoShow = true
				this.threeShow = false
				this.threeShow1 = false
				this.threeShow2 = false
				this.listArr = []
				this.getList()
			},
			threeClick() {
				this.number++
				console.log(this.number % 2 == 0);
				if (this.number % 2 == 0) {
					this.num = 0
					this.sort_type = 4
					this.listArr = []
					this.oneShow = false
					this.twoShow = false
					this.threeShow = true
					this.threeShow1 = true
					this.threeShow2 = false
					this.getList()
				} else {
					this.num = 0
					this.sort_type = 3
					this.listArr = []
					this.oneShow = false
					this.twoShow = false
					this.threeShow = true
					this.threeShow1 = false
					this.threeShow2 = true
					this.getList()
				}
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {}

	.content {
		padding-top: 96upx;
	}

	.navbar {
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			position: relative;

			&.current {
				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}

		.active {}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			line-height: 80upx;
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
		}

		.price {
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}

	.bottom {
		display: none;
	}

	.bottom2 {
		display: block;
		text-align: center;
		padding-bottom: 20rpx;
		font-size: 26rpx;
		color: #a6a6a6;
	}

	.bottom3 {
		display: block;
		text-align: center;
		padding-bottom: 20rpx;
		font-size: 26rpx;
		color: #FDD61E;
	}

	.changeColor {
		color: #FDD61E;
		border-bottom: 7rpx solid #FDD61E;
	}

	.changeColor1 {
		color: #FDD61E;
	}

	.changeColor2 {
		border-bottom: 7rpx solid #FDD61E;
	}
</style>
