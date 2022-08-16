<template>
	<view class="app" id="aaa">
		<view class="top_text" v-show="headerActive">
			<view v-for="(item,index) in option3" :key="index">
			<view @click="textTap(index)">
				<text>{{item.text}}</text>
			</view>
			</view>
		</view>
		<!-- 顶部轮播图 -->
		<view class="top_icon">
			<uni-icons @click="returns" type="back" size="20" color="#ffffff"></uni-icons>
		</view>
		<view class="top_icon2">
			<uni-icons @click="toShoping" type="cart" size="20" color="#ffffff"></uni-icons>
		</view>
		<swiper class="banner" indicator-color="rgb(255,255,255)" :indicator-dots="true" :autoplay="true"
			:interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in Xiang.banner" :key="index">
				<view class="swiper-item">
					<image :src="item" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="shangpinxx">
			<view class="spxx">
				<text>￥</text>
				<text>{{Xiang.price}}</text>
				<text>￥{{Xiang.old_price}}</text>
			</view>
			<view class="spname">
				<text>{{Xiang.name}}</text>
			</view>
			<view class="by_xl">
				<text>快递:包邮</text>
				<text>月销{{Xiang.sales}}</text>
			</view>
		</view>
		<!-- 评价 -->
		<view class="pingjia" id="aaa2">
			<view class="pj_top">
				<text>评价23</text>
				<text>查看更多</text>
			</view>
			<view class="users">
				<image class="toux" src="../../static/images/my/001.png" mode=""></image>
				<text>用户名称</text>
				<view class="pingjia2">
					<text>太香了太香了太香了太香了太香了太香了太香了太香了太香了太香了太香了太香了太香了太香了</text>
				</view>
				<view class="pingjia_tupian">
					<view class="pj_image">
						<image src="../../static/images/home/goods1.jpg" mode=""></image>
					</view>
					<view class="pj_image">
						<image src="../../static/images/home/goods1.jpg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 图文详情 -->
		<view class="tuwen" id="aaa3">
			<view style="margin-bottom: 40rpx;">
			<text>图文详情</text>
			</view>
			<rich-text class="tupian" :nodes="Xiang.desc"></rich-text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				//头部导航栏show
				headerActive: false,
				//字体选中样式show
				textShow: false,
				option3: [
				      {text:'商品',value:0},
				      { text: '评论', value: 1},
				      { text: '详情', value: 2},
				    ],
				hightArr:[],
				index1:0,
				_id:0,//详情id值
				Xiang:[],//详情数据
			};
		},
		onLoad(e) {
			// console.log(e);
			this._id = e._id
			// console.log(this._id);
			this.getXiang()
		},
		mounted() {
				this.gaoDu()
				this.gaoDu2()
				this.gaoDu3()
		},
		methods: {
			//监控页面滚动,控制头部变色
			onPageScroll(e) {
				this.headerActive = e.scrollTop >= 40;
				console.log(this.headerActive);
			},
			//返回上一页
			returns() {
				uni.navigateBack()
			},
			//进入购物车页面
			toShoping() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			//点击字体
			textTap(e) {
				console.log(e);
				this.index1 = e
				uni.pageScrollTo({
					scrollTop:this.hightArr[this.index1]
				})
			},
			//检测盒子的高度
			gaoDu() {
				//第一个
				const query = uni.createSelectorQuery().in(this);
				query.select('#aaa').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				  this.hightArr.push(data.top)
				  console.log(this.hightArr);
				}).exec();
			},
			gaoDu2() {
				//第一个
				const query = uni.createSelectorQuery().in(this);
				query.select('#aaa2').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				  this.hightArr.push(data.top - 40)
				  console.log(this.hightArr);
				}).exec();
			},
			gaoDu3() {
				//第一个
				const query = uni.createSelectorQuery().in(this);
				query.select('#aaa3').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				  this.hightArr.push(data.top - 40)
				  console.log(this.hightArr);
				}).exec();
			},
			//获取详情
			getXiang(){
				this.$http.post('/api/get_goods_detail',
				{goods_id:this._id}
				)
				.then((res)=>{
					console.log(res);
					this.Xiang = res.data[0]
					console.log(this.Xiang)
					this.Xiang.desc = this.Xiang.desc.replaceAll('<img','<img style="width:100%;"')
				})
				.catch((err)=>{
					console.log(err);
				})
			}
		}
	};
</script>

<style lang="scss">
	.app {
		background-color: #F5F5F5;
	}

	.top_text {
		width: 100%;
		display: flex;
		justify-content: space-around;
		font-size: 34rpx;
		color: #818181;
		font-weight: 550;
		position: fixed;
		top: 0;
		z-index: 1;
		height: 120rpx;
		line-height: 90rpx;
		background-color: #ffffff;
	}

	.show {
		color: #000000;
		border-bottom: 6rpx solid rgba(253, 214, 30, 0.8);
		margin-bottom: 30rpx;
	}

	.beijing {
		background-color: #ffffff;
	}

	.banner {
		height: 60vh;
	}

	.swiper-item image {
		width: 100vw;
		height: 60vh;
	}

	.top_icon {
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 1000;
		left: 15rpx;
		top: 15rpx;
		width: 50rpx;
		height: 50rpx;

		uni-icons {
			background-color: rgba(94, 94, 94, 0.6);
			border-radius: 50%;
			padding: 5rpx;
		}
	}

	.top_icon2 {
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 1;
		right: 15rpx;
		top: 15rpx;
		width: 50rpx;
		height: 50rpx;

		uni-icons {
			background-color: rgba(94, 94, 94, 0.6);
			border-radius: 50%;
			padding: 5rpx;
		}
	}

	.shangpinxx {
		width: 100%;
		background-color: #ffffff;
		padding: 20rpx 20rpx;

		.spxx {
			padding-bottom: 50rpx;
		}

		.spxx text:nth-child(1) {
			color: #f86007;
			font-size: 24rpx;
		}

		.spxx text:nth-child(2) {
			padding-right: 26rpx;
			color: #f86007;
			font-size: 36rpx;
		}

		.spxx text:nth-child(3) {
			color: #acacac;
			font-size: 24rpx;
			text-decoration: line-through;
		}

		.spname {
			font-size: 30rpx;
			padding-bottom: 28rpx;
		}

		.by_xl {
			font-size: 24rpx;
			color: #747474;
			display: flex;
			justify-content: space-between;
			padding-bottom: 5rpx;
		}
	}

	.pingjia {

		width: 100%;
		background-color: #ffffff;
		padding-bottom: 25rpx;

		.pj_top {
			display: flex;
			justify-content: space-between;
			padding: 40rpx 20rpx;
			margin-top: 25rpx;
		}

		.pj_top text:nth-child(1) {
			font-size: 28rpx;
			font-weight: 600;
		}

		.pj_top text:nth-child(2) {
			font-size: 24rpx;
			color: #747474;
		}

		.pingjia2 {
			padding: 10rpx 20rpx;
		}

		.users {
			.toux {
				width: 60rpx;
				height: 60rpx;
				padding: 0 20rpx;
			}

			.pingjia_tupian {
				display: flex;

				.pj_image {
					width: 160rpx;
					padding: 10rpx 20rpx;

					image {
						width: 160rpx;
						height: 170rpx;
					}
				}
			}
		}
	}

	.tuwen {
		margin-top: 25rpx;
		width: 100%;
		background-color: #ffffff;
		padding: 20rpx 20rpx;
		font-weight: 600;
		font-size: 30rpx;
	}
</style>
