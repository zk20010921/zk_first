<template>
	<view>
		<!-- 搜索 -->
		<view class="search" :class="headerActive ? 'top_background' : ''">
			<view class="search_icon">
				<uni-icons :color="headerActive ? '#ffffff' : '#F97168'" type="notification-filled" size="25">
				</uni-icons>
			</view>
			<view class="search_ipt">
				<uni-icons type="search" color="#afafaf" size="20"></uni-icons>
				<text>搜索商品</text>
			</view>
		</view>
		<view class="swiperlist">
			<!-- 轮播图 -->
			<swiper circular="true" :indicator-dots="true" indicator-color="#959595" indicator-active-color="#ffffff"
				:autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in swiperlist" :key="index">
					<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?_id={{item._id}}'">
						<image :src="item.img" mode="scaleToFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 按钮--分类 -->
		<view class="cate">
			<view class="catelist" v-for="(item,index) in catalist" :key="index">
				<navigator class="cateurl" url="/pages/cate/cate" open-type="switchTab">
					<image :src="item.img"></image>
					<text>{{item.name}}</text>
				</navigator>
			</view>
		</view>
		<!-- 精选物品 -->
		<view class="jxwp">
			<text class="one">精选物品</text>
			<view class="bd">
				<scroll-view style="width: 100%;nowrap;display: flex;height: 300rpx;" scroll-x="true"
					enable-flex="true">
					<view class="bd_list" v-for="(item,index) in bdlist" :key="index">
						<view class="bd_image">
							<image style="height: 225rpx;width: 225rpx;" :src="item.img" mode=""></image>
						</view>
						<view class="bd_text">
							<image src="../../static/images/home/rank.png" mode=""></image>
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="cnxh">
			<text class="one">猜你喜欢</text>
			<view style="display: flex;flex-wrap: wrap;padding-top: 40rpx;">
				<view class="cnxh_list" style="width: 45.5vw;height: 30vh;" v-for="(item,index) in cailist"
					:key="index">
					<image :src="item.img" mode=""></image>
					<view class="cnxh_text">
						<text class="tx">{{item.name}}</text>
						<view class="cnxh_price">
							<view class="cnxh_left">
								<text>￥</text>
								<text>{{item.price}}</text>
							</view>
							<view class="cnxh_right">
								<text>已售{{item.sales}}件</text>
							</view>
						</view>
					</view>
				</view>
			</view>
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
				swiperlist: [], //轮播图列表
				catalist: [], //按钮分类列表
				bdlist: [], //榜单列表
				headerActive: false,
				cailist: [], //猜你喜欢列表
				num:0,
				show:false,//底部字体的显示
			}
		},
		onLoad() {
			//轮播图
			this.getSwiper()
			//按钮
			this.getCataList()
			//推荐榜单
			this.getBangDan()
			//猜你喜欢
			this.getCai()
		},
		//滚动监听事件
		onPageScroll(e) {
			this.headerActive = e.scrollTop >= 40;
		},
		//下拉触底
		onReachBottom(){		
			this.num+=10
			this.getCai()
			// this.cailist = [...this.cailist,...res.data]
		},
		methods: {
			//轮播图
			getSwiper() {
				this.$http.post('/api/get_banner')
					.then((res) => {
						console.log(res);
						this.swiperlist = res.data
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//分类
			getCataList() {
				this.$http.post('/api/get_cate',
				{position:'index'}
				)
					.then((res) => {
						console.log(res)
						this.catalist = res.data
					})
					.catch((err) => {
						console.log(err)
					})
			},
			//获取精选
			getBangDan() {
				this.$http.post('/api/get_competitive', {
						skip: 0,
						limit: 1000
					})
					.then((res) => {
						console.log(res);
						this.bdlist = res.data
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//猜你喜欢
			getCai() {
				this.$http.post('/api/get_like', {
						skip: this.num,
						limit: 10,
					})
					.then((res) => {
						console.log(res);
						this.cailist = [...this.cailist,...res.data]
						if(res.data.length == 0 || res.data.length <10){
							this.show = true
						}
					})
					.catch((err) => {
						console.log(err);
					})
			}
		},
	}
</script>

<style lang="scss">
	.app {
		background-color: red;
	}

	.top_background {
		background-color: rgba(253, 214, 30, 0.8);
	}

	.top_icon {
		color: #ffffff;
	}

	.search {
		display: flex;
		position: fixed;
		top: 0;
		flex-direction: row;
		align-items: center;
		padding-left: 20rpx;
		z-index: 1;
		height: 100rpx;
		width: 100%;
		padding-top: 50rpx;

		.search_ipt {
			width: 430rpx;
			height: 67rpx;
			border-radius: 100rpx;
			background-color: #ffffff;
			margin-left: 25rpx;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
			color: #afafaf;
			font-size: 22rpx;

			.uni-mt-10 {
				height: 10rpx;
			}
		}
	}

	.swiperlist swiper {
		height: 480rpx;
	}

	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}

	.cate {
		width: 95%;
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0 auto;
		border-radius: 10rpx;
		margin-top: 40rpx;
		height: 250rpx;

		.catelist {
			.cateurl {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 27rpx;
				justify-content: center;

				text {
					display: inline-block;
					height: 20px;
					padding-top: 24rpx;
				}
			}

			image {
				height: 90rpx;
				width: 90rpx;
			}
		}
	}

	.jxwp {
		width: 95%;
		padding-top: 40rpx;
		margin: 0 auto;
		height: 410rpx;

		.bd_list {
			margin-right: 15rpx;
			margin-left: 5rpx;
			margin-top: 30rpx;
			height: 300rpx;
		}

		.bd_text {
			width: 210rpx;
			height: 40rpx;
			font-size: 26rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 5rpx;
				display: inline-block;
			}
		}
	}

	.jxwp .one,
	.cnxh .one {
		font-weight: 600;
		color: #545454;
		font-size: 33rpx;
	}

	.cnxh {
		width: 95%;
		margin: 0 auto;
		padding-bottom: 80rpx;

		.cnxh_list {
			width: 100%;
			margin: 1vh 1vw;
			padding-bottom: 150rpx;
			font-size: 26rpx;

			.tx {
				height: 64rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				background-color: #ffffff;
				margin-top: -10rpx;
				padding-bottom: 6rpx;
				padding-left: 10rpx;
				padding-right: 10rpx;
			}

			.cnxh_price {
				display: flex;
				justify-content: space-between;
				padding: 0 5rpx;
				background-color: #ffffff;
				padding-top: 20rpx;
				padding-bottom: 35rpx;

				.cnxh_left text:nth-child(1) {
					font-size: 24rpx;
					color: red;
				}

				.cnxh_left text:nth-child(2) {
					font-size: 28rpx;
					color: red;
				}

				.cnxh_right {
					font-size: 22rpx;
					padding-right: 15rpx;
					color: #a6a6a6;
				}
			}
		}
	}
	.bottom{
		display: none;
	}
	.bottom2{
		display: block;
		text-align: center;
		padding-bottom: 20rpx;
		font-size: 26rpx;
		color: #a6a6a6;
	}
</style>
