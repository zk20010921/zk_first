<template>
	<view class="page-user">
		<view class="address-list">
			<radio-group v-show="isShow" v-for="(item,index) in addressArr" :key="index">
				<view class="addr-list">
					<view class="list-con">
						<view class="tops flex-row">
							<text class="name">{{item.name}}</text>
							<text class="phone">{{item.tel}}</text>
							<!-- <view class="moren-defalut" :class="item.is_default == 1 ?'':'hide'">默认</view> -->
						</view>
						<view class="address">{{item.addr_text}}</view>
						<view class="arrow"><text class="iconfont icon-fanhui1"></text></view>
					</view>
					<view class="list-btm flex-row-between">
						<view class="moren act" @click="selectMo(index)">
							<uni-icons :color="item.is_default ? '#FDD61E':''"  :type="item.is_default ? 'checkbox-filled':'circle'" size="18"></uni-icons>
							默认地址
						</view>
						<view class="caozuo" @click="toAddressX(index)">
							<uni-icons type="compose" size="18"></uni-icons>
							<text><text class="shanchu">编辑</text></text>
						</view>
						<view class="caozuo" @click="delAddress(index)">
							<uni-icons type="trash" size="18"></uni-icons>
							<text><text class="shanchu">删除</text></text>
						</view>
					</view>
				</view>
			</radio-group>
			<view v-show="!isShow" style="margin: 120rpx 0pt;text-align: center;">
				<view class="act">
					<text class="iconfont icon-zanwushuju iconfonts" style="color: #FDD61E;"></text>
					<view class="cont" style="color: #afafaf;font-size: 26rpx;margin-top: 20rpx;">您还没有收货地址</view>
				</view>
			</view>
				<view class="add act" @click="navTo('/subpkg/addressManage/addressManage')">
					<uni-icons type="plusempty" size="14" color="#FDD61E"></uni-icons>
					<text style="color: #FDD61E;">添加收货地址</text>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: 0,
				token: 0,
				isShow: false, //是否显示——您还没有收货地址
				addressArr:[],//收获地址数组
				_id:[],//地址详情id
			}
		},
		onLoad() {
			this.getUid_token()
			this.getAddressList()
		},
		methods: {
			//获取uid和token
			getUid_token() {
				this.uid = uni.getStorageSync('uid')
				this.token = uni.getStorageSync('token')
			},
			//获取地址列表
			getAddressList() {
				this.$http.post('/order/getAddrList', {
						uid: this.uid,
						token: this.token
					})
					.then((res => {
						console.log(res);
						this.addressArr = res.data
						this._id = res.data.map(item=>{
							return item._id
						})
						if(res.length !=0 ){
							this.isShow = true
						}
					}))
					.catch((err) => {
						console.log(err);
					})
			},
			//进入编辑地址
			toAddressX(e){
				uni.navigateTo({
					url:`/subpkg/addressManage/addressManage?_id=${this._id[e]}`
				})
			},
			//删除地址
			delAddress(index){
				console.log(this.uid);
				console.log(this._id);
				this.$http.post('/order/del_addr',
				{uid:this.uid,_id:this._id[index]}
				)
				.then((res)=>{
					console.log(res);
					this.getAddressList()
					console.log(this.addressArr);
					uni.showToast({
						title:'删除成功',
						icon:"none"
					})
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			//选择默认地址
			selectMo(index){
				this.$http.post('/order/set_default_addr',
				{uid:this.uid,_id:this._id[index]}
				)
				.then((res)=>{
					console.log(res);
					if(res.msg == "设置成功"){
						this.getAddressList()
					}
				})
				.catch((err)=>{
					console.log(err);
				})
			}

		}
	}
</script>

<style lang="scss">
	.iconfonts {
		width: 28upx;
		height: 28upx;
		margin-right: 10upx;
		color: #999999;
		font-size: 260upx;
	}
page {
	background: #f6f6f6;
}

uni-radio-group {
	display: block;
	width: 750upx;
}

.address-list .addr-list .list-con .tops .moren-defalut.hide {
	display: none;
}

.address-list {
	width: 750upx;
	padding: 0 32upx 32upx;
	overflow: hidden;
	min-width: 100%;
	display: block;

	.addr-list {
		background: #fff;
		width: 690upx;
		box-shadow: 0px 10px 28px rgba(0, 0, 0, 0.08);
		display: block;
		border-radius: 16upx;
		overflow: hidden;
		box-sizing: border-box;
		margin-top: 40upx;

		.list-con {
			border-bottom: 1px solid #f5f5f7;
			padding: 22upx;
			position: relative;
			display: block;
			overflow: hidden;
			width: 690upx;

			.arrow {
				position: absolute;
				height: 80upx;
				width: 80upx;
				text-align: center;
				line-height: 80upx;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}

			.tops {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 0 20upx;
				font-size: 28upx;
				color: #333;

				.phone {
					margin-left: 20upx;
				}

				.moren-defalut {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 80upx;
					height: 40upx;
					margin-left: 40upx;
					border-radius: 30upx;
					border: 1px solid #333333;
					font-size: 26upx;
					color: #333333;
				}
			}

			.address {
				padding: 0upx 60upx 0 0;
				box-sizing: border-box;
				font-size: 28upx;
				color: #999;
			}
		}

		.list-btm {
			padding: 20upx;
			font-size: 28upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.moren {
				color: #333333;

				.iconfont {
					width: 28upx;
					height: 28upx;
					margin-right: 10upx;
					color: #999999;
					font-size: 30upx;
				}

				&.act {
					.iconfont {
						color: #333333;

						&:before {
							content: '\e67a';
						}
					}
				}
			}

			.caozuo {
				color: #333;
				display: inline-flex;
				align-items: center;
				.iconImg {
					width: 32rpx;
					height: 32rpx;
				}
				.bianji {
					display: inline-block;
					margin: 0 20upx 0 10upx;
				}

				.shanchu {
					margin-left: 10upx;
				}
			}
		}
	}

	uni-radio .uni-radio-input.uni-radio-input-checked:before {
		content: '\EA08';
	}

	.add.act {
		width: 100%;
		margin-top: 50px;
	}

	.add {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		margin-top: 40upx;
		text-align: center;
		font-size: 28upx;
		color: #333333;
		background-color: #fff;
		border-radius: 16upx;

		.iconfont {
			margin-right: 10upx;
		}
	}
}
</style>
