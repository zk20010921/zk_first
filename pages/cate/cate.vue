<template>
	<view style="display: flex;justify-content: space-between;">
		<!-- 左侧导航栏 -->
		<scroll-view class="left_list" scroll-y="true">
			<view class="active" :class="index1 == index ? 'select':''" v-for="(item,index) in leftarr" :key="index">
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 右侧物品 -->
		<view class="right_big" id="aa">
			<scroll-view scroll-y="true" enable-flex="true" style="height: 100vh;" @scroll="scrollCm">
				<view class="right_list" :id="'aaa' + index" v-for="(item1,index) in leftarr" :key="index">
					<view class="right_list2" v-for="(item,index) in item1.children" :key="index">
						<image :src="item.img" mode=""></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftarr: [], //左侧导航栏列表
				index1: 0,
				scrollTop: 0,
				hightArr: [], //高度数组
			};
		},
		onLoad() {},
		mounted() {

			this.getCateList()
			setTimeout(() => {
				this.gaoDu()

			}, 250)
		},
		methods: {
			//获取分类列表
			async getCateList() {
				await this.$http.post('/api/get_cate')
					.then((res) => {
						console.log(res);
						this.leftarr = res.data

					})
					.catch((err) => {
						console.log(err);
					})
			},
			//检测盒子的高度
			gaoDu() {
				this.leftarr.forEach((item, index) => {
					const query = uni.createSelectorQuery().in(this);
					query.select(`#aaa${index}`).boundingClientRect(data => {
						console.log("节点离页面顶部的距离为", data.top);
						this.hightArr.push(data.top)
						console.log(this);
					}).exec();
				})
				setTimeout(() => {
				this.hightArr.push(9999)
					console.log(this.hightArr);
				}, 250)
				
			},
			scrollCm(e) {
				let top = e.detail.scrollTop
				for (let i = 0; i < this.hightArr.length; i++) {
					if (top > this.hightArr[i] && top < this.hightArr[i + 1]) {
						this.index1 = i
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	.left_list {
		height: 100vh;
		width: 27vw;
		text-align: center;
		background-color: #ffffff;
		display: flex;

		text {
			font-size: 28rpx;
		}

		view {
			height: 8vh;
			line-height: 8vh;
			border-bottom: 1px solid #dfdfdf;
		}
	}

	.select {
		color: #FDD51A;
		background-color: #F5F5F5;
	}

	.right_big .right_list:last-child {
		padding-bottom: 680rpx;
	}

	.right_big {
		width: 70vw;
		background-color: #F5F5F5;


		.right_list {
			width: 100%;
			display: flex;
			background-color: #ffffff;
			flex-wrap: wrap;
			padding-bottom: 250rpx;
		}

		.right_list2 {
			padding: 20rpx 13.5rpx;
			font-size: 26rpx;

			image {
				width: 150rpx;
				height: 150rpx;
			}

			text {
				display: block;
				text-align: center;
			}
		}
	}
</style>
