<template>
	<view style="display: flex;justify-content: space-between;">
		<!-- 左侧导航栏 -->
		<scroll-view class="left_list" scroll-y="true">
			<view class="active" :class="index1 == index ? 'select':''" v-for="(item,index) in leftarr" :key="index"
				@click="Tap(index)">{{item.name}}</view>
		</scroll-view>
		<!-- 右侧物品 -->
		<view class="right_big">
			<scroll-view scroll-y="true" enable-flex="true">
				<view class="right_list">
					<view class="right_list2" v-for="(item,index) in leftarr[index1].children" :key="index">
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
			};
		},
		onLoad() {
			this.getCateList()
		},
		methods: {
			//获取分类列表
			getCateList() {
				this.$http.post('/api/get_cate')
					.then((res) => {
						console.log(res);
						this.leftarr = res.data
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//点击左侧导航栏
			Tap(index) {
				this.index1 = index
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

	.right_big {
		width: 70vw;
		background-color: #F5F5F5;

		.right_list {
			width: 100%;
			display: flex;
			background-color: #ffffff;
			flex-wrap: wrap;
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
