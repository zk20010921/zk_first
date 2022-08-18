<template>
	<view class="app" id="aaa">
		<view class="top_text" v-show="headerActive">
			<view v-for="(item,index) in option3" :key="index">
				<view @click="textTap(index)">
					<text :class="indexs == index ? 'show' : ''">{{item.text}}</text>
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
		<!--  提交订单栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item">
					<uni-icons type="contact" size="22"></uni-icons>
					<view class="text u-line-1">客服</view>
				</view>
				<view class="item car" @click="fav">
					<uni-icons :type="favs ? 'star-filled' : 'star'" :size="22" :color="favs ? '#FDD61E' : ''"></uni-icons>
					<view class="text u-line-1">收藏</view>
				</view>
				<view class="item">
					<uni-icons type="home" size="22"></uni-icons>
					<view class="text u-line-1">店铺</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">加入购物车</view>
				<view class="buy btn u-line-1" @click="show = true">立即购买</view>
			</view>
		</view>
		<!-- 购买弹出层 -->
		<view>
			<u-popup v-model="show" mode="bottom" closeable="true" close-icon-size="20">
				<scroll-view scroll-y="true">
					<view class="big">
						<view class="top">
							<view class="imas">
								<image src="../../static/images/shop/goods_banner1.jpg" mode=""></image>
							</view>
							<view class="texts">
								<text style="color: red;">￥{{Xiang.default_sku_info.price}}</text>
								<text>库存:{{Xiang.default_sku_info.stock}}</text>
								<view style="color: #ababab;display: flex;">
									<text>已选:</text>
									<view>
										<text v-for="(item,index) in Xiang.default_sku_info.text"
											:key="index">{{item}}</text>
									</view>
								</view>

							</view>
						</view>
						<view class="zhong">
							<view class="zhong2" v-for="(item,index) in Xiang.attr" :key="index">
								<view class="title">
									<text class="">{{item.text}}</text>
								</view>
								<view class="selects">
									<view v-for="(item1,index1) in item.values" :key="index1"
										@click="Tap(index,index1)">
										<text :class="item.check == index1 ? 'xuanzhong' : ''">{{item1.text}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="title">
								<text>数量</text>
							</view>
							<view class="right">
								<u-number-box @plus="addNum" @minus="redNum" v-model="value" :max="Xiang.default_sku_info.stock" min="1"
									size='26' :input-width="30" :input-height="15"></u-number-box>
							</view>
						</view>
						<view class="bottom2" @click="addShop">
							<text>确定</text>
						</view>
					</view>
				</scroll-view>
			</u-popup>
		</view>
		<!-- 加入购物车弹出层 -->
		<view>
			<u-popup v-model="show2" mode="bottom" closeable="true" close-icon-size="20">
				<scroll-view scroll-y="true">
					<view class="big">
						<view class="top">
							<view class="imas">
								<image src="../../static/images/shop/goods_banner1.jpg" mode=""></image>
							</view>
							<view class="texts">
								<text style="color: red;">￥{{Xiang.default_sku_info.price}}</text>
								<text>库存:{{Xiang.default_sku_info.stock}}</text>
								<view style="color: #ababab;display: flex;">
									<text>已选:</text>
									<view>
										<text v-for="(item,index) in Xiang.default_sku_info.text"
											:key="index">{{item}}</text>
									</view>
								</view>

							</view>
						</view>
						<view class="zhong">
							<view class="zhong2" v-for="(item,index) in Xiang.attr" :key="index">
								<view class="title">
									<text class="">{{item.text}}</text>
								</view>
								<view class="selects">
									<view v-for="(item1,index1) in item.values" :key="index1"
										@click="Tap(index,index1)">
										<text :class="item.check == index1 ? 'xuanzhong' : ''">{{item1.text}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="title">
								<text>数量</text>
							</view>
							<view class="right">
								<u-number-box @plus="addNum" @minus="redNum" v-model="value" :max="stock" min="1"
									size='26' :input-width="30" :input-height="15"></u-number-box>
							</view>
						</view>
						<view class="bottom2" @click="addCard">
							<text>确定</text>
						</view>
					</view>
				</scroll-view>
			</u-popup>
		</view>
	</view>
</template>
<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				//头部导航栏show
				headerActive: false,
				//字体选中样式show
				textShow: false,
				option3: [{
						text: '商品',
						value: 0
					},
					{
						text: '评论',
						value: 1
					},
					{
						text: '详情',
						value: 2
					},
				],
				tapSelect: false, //顶部导航栏是否选中
				hightArr: [],
				indexs: 0,
				_id: 0, //详情id值
				Xiang: [], //详情数据
				show: false, //购买弹出层是否展示
				num: 1, //数量
				jy: true, //加减禁用状态
				attr: [], //购买物品详情
				favs: false, //是否收藏
				uid: 0, //uid
				is_fav: 0, //是否收藏
				index1: 0, //规格索引
				check: 0,
				kuArr: null, //价格库存数组
				value: 1,
				stock: 0, //库存
				shopNum: 1, //购买数量
			};
		},
		onLoad(e) {
			// console.log(e);
			this._id = e._id
			// console.log(this._id);
			uni.hideTabBar()
			this.getUid() //获取uid
			this.getKu() //获取库存/价格
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
				// console.log(this.headerActive);
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
				this.indexs = e
				this.tapSelect = true
				uni.pageScrollTo({
					scrollTop: this.hightArr[this.indexs]
				})
			},
			//检测盒子的高度
			gaoDu() {
				//第一个
				const query = uni.createSelectorQuery().in(this);
				query.select('#aaa').boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
					this.hightArr.push(data.top)
					// console.log(this.hightArr);
				}).exec();
			},
			gaoDu2() {
				//第二个
				const query = uni.createSelectorQuery().in(this);
				query.select('#aaa2').boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
					this.hightArr.push(data.top - 40)
					// console.log(this.hightArr);
				}).exec();
			},
			gaoDu3() {
				//第三个
				const query = uni.createSelectorQuery().in(this);
				query.select('#aaa3').boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
					this.hightArr.push(data.top - 40)
					// console.log(this.hightArr);
				}).exec();
			},
			//获取详情
			getXiang() {
				// console.log(this.uid);
				this.$http.post('/api/get_goods_detail', {
						goods_id: this._id,
						uid: this.uid
					})
					.then((res) => {
						console.log(res);
						this.is_fav = res.is_fav//收藏
						this.attr = res.data[0].attr
						console.log(this.attr);
						this.Xiang = res.data[0]
						// console.log(this.Xiang)
						this.Xiang.desc = this.Xiang.desc.replaceAll('<img', '<img style="width:100%;"')
						this.xun()
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//跳转购物车页面
			toCart() {
				uni.switchTab({
					url: '/pages/cart/cart',
				});
			},
			//循环购买列表数组
			xun() {
				this.Xiang.attr.forEach((item, index) => {
					item.check = 0
					console.log(this.Xiang.attr);
				})
			},
			Tap(index, index1) {
				console.log(index);
				console.log(index1);
				this.attr[index].check = index1;
				Vue.set(this.attr, index, this.attr[index])
				// this.check = index1
				console.log(this.attr[index].check);
				this.getKu()
				// console.log(this.attr);
				this.value = 1
			},

			//获取uid
			getUid() {
				this.uid = uni.getStorageSync('uid')
				this.getXiang()
			},
			//收藏
			fav(){
				console.log(this.is_fav);
				if(this.is_fav == 0){
					this.$http.post('/api/toggle_fav',
					{goods_id:this._id,uid:this.uid,is_fav:this.is_fav}
					)
					.then((res)=>{
						console.log(res);
						this.favs = !this.favs
						this.is_fav = res.is_fav
					})
					.catch((err)=>{
						console.log(err);
					})
				}else{
					this.$http.post('/api/toggle_fav',
					{goods_id:this._id,uid:this.uid,is_fav:this.is_fav}
					)
					.then((res)=>{
						console.log(res);
						this.favs = !this.favs
						this.is_fav = res.is_fav
					})
					.catch((err)=>{
						console.log(err);
					})
				}
			},
			//获取库存/价格
			getKu() {
				let choose_attr = this.attr.map(el => {
					return el.values[el.check].text
				})
				console.log(choose_attr);
				this.$http.post('/api/get_sku', {
					goods_id: this._id,
					sku: choose_attr
				}).then(res => {
					console.log(res)
					this.kuArr = res.data
					this.stock = res.data.stock
					this.Xiang.default_sku_info.price = this.kuArr.price
					this.Xiang.default_sku_info.stock = this.stock
					this.Xiang.default_sku_info.text = this.kuArr.text
				})
			},
			//减少购买数量
			addNum(e) {
				this.shopNum = e.value
			},
			//增加购买数量
			redNum(e) {
				this.shopNum = e.value
			},
			//直接购买
			addShop() {
				// console.log(this.uid);
				// console.log(this.Xiang.name);
				// console.log(this.kuArr.price);
				// console.log(this.Xiang.img);
				// console.log(this._id);
				// console.log(this.shopNum);
				// console.log(this.attr);
				let attrs = []
				let attr = this.Xiang.default_sku_info.text.map((item,index)=>{
					attrs.push(item)
				})

				this.$http.post('/api/add_cart', {
						uid: this.uid,
						name: this.Xiang.name,
						price: this.Xiang.default_sku_info.price,
						img: this.Xiang.img,
						goods_id: this._id,
						num: this.shopNum,
						attr: attrs,
						type: 'buy'
					})
					.then((res) => {
						console.log(res);
						if(res.msg == "库存不足"){
							uni.showToast({
								title:"库存不足",
								icon:'none'
							})
						}
						let cart_id = res.data.id
						uni.navigateTo({
							url:`/subpkg/creatOrder/creatOrder?cart_id=${cart_id}`,
						});
					})
					.catch((err) => {
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
		padding-bottom: 85rpx;
	}

	.navigation {
		display: flex;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		position: fixed;
		bottom: 0;
		width: 100%;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}

	.big {
		width: 100%;
		height: 50vh;
		background-color: #ffffff;

		.top {
			display: flex;
		}

		.imas {
			margin-top: 15rpx;
			margin-left: 15rpx;

			image {
				width: 18vh;
				height: 25vw;
			}
		}

		.texts {
			display: flex;
			flex-direction: column;
			margin-top: 85rpx;
			margin-left: 15rpx;
		}

		.texts text:nth-child(1) {
			font-size: 28rpx;
		}

		.texts text:nth-child(2) {
			color: #ababab;
			font-size: 28rpx;
		}

		.texts text:nth-child(3) {
			color: #ababab;
			font-size: 28rpx;
		}

		.zhong .zhong2:nth-child(1) {
			margin-bottom: 60rpx;
		}

		.zhong .zhong2:nth-child(2) {
			margin-bottom: 60rpx;
		}

		.zhong {
			margin-top: 40rpx;
			margin-left: 20rpx;

			.selects {
				display: flex;
			}

			.title {
				color: #737373;
				font-size: 26rpx;
				padding-bottom: 20rpx;
			}

			.selects text {
				background-color: #ececec;
				padding: 8rpx 30rpx;
				margin: 0 15rpx;
				border-radius: 50rpx;
				font-size: 28rpx;
			}
		}

		.bottom {
			margin-top: 40rpx;
			margin-left: 20rpx;
			display: flex;
			justify-content: space-between;
			padding-right: 20rpx;
			padding-bottom: 150rpx;

			.title {
				color: #737373;
				font-size: 26rpx;
				padding-bottom: 20rpx;
			}

			.right text:nth-child(2) {
				background-color: #ececec;
				padding: 5rpx 20rpx;
				margin: 0 8rpx;
			}
		}
	}

	.bottom2 {
		width: 100%;
		background-color: rgb(253, 209, 0);
		height: 8vh;
		position: fixed;
		bottom: 0;
		text-align: center;
		line-height: 8vh;
		font-size: 32rpx;
		font-weight: 600;
		z-index: 1000;
	}

	.jinyong {
		color: #ececec;
	}

	.xuanzhong {
		background-color: #ffd7d7 !important;
		color: #ed3f14 !important;
	}
	wx-swiper .wx-swiper-dot{
		width: 32rpx;
		height: 6rpx;
		border-radius: 2rp;
		background-color: #ffffff;
		opacity: 0.8;
	}
	wx-swiper .wx-swiper-dot-active{
		background-color: #565656;
		width: 32rpx;
		height: 6rpx;
		border-radius: 2rpx;
	}
</style>
