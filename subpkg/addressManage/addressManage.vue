<template>
	<view class='container'>
		<view class="wrapper">
			<view class='mui-content input-content'>
				<view class='input-item'>
					<text class="tit">姓名</text>
					<input class='minput' v-model="name" type='text' placeholder='联系人姓名'></input>
				</view>
				<view class='input-item'>
					<text class="tit">手机</text>
					<input class='minput' v-model="phone" type='number' placeholder='请输入联系方式'></input>
				</view>
				<view id='showCityPicker3' class='input-item' @click="show_addr_picker = true">
					<text class="tit">地址</text>
					<input class='minput' v-model="address" placeholder="请选择所属区域" disabled="ture"></input>
					<text class="iconfont icon-fanhui1"></text>
				</view>
				<view class='input-item'>
					<textarea class="xiangxi" v-model="addressX" placeholder="请输入详细地址"
						placeholder-style="color:#999;" />
				</view>
				<view class="moren">
					<view class="uni-list">
						<view class="uni-list-cell uni-list-cell-pd">
							<view class="uni-list-cell-db">设为默认地址</view>
							<switch @change="isMo" color="#FDD100" :checked="isMoRen" class="kaiguan" />
						</view>
					</view>
				</view>
			</view>
			<button class="confirm-btn" @click="addAddress">确认</button>
		</view>
		<w-picker :visible.sync="show_addr_picker" mode="region" :value="addr_code" default-type="value"
			:hide-area="false" @confirm="onConfirm($event)" @cancel="onCancel" ref="region"></w-picker>

	</view>
</template>
<script>
	import wPicker from '../../components/w-picker/w-picker.vue';
	export default {
		data() {
			return {
				show_addr_picker: false,
				addr_code: [],
				name: '', //名字
				phone: '', //手机号
				address: '', //地区
				addresscode: [], //地区编码
				addressX: '', //地址详情
				isMoRen: false, //是否为默认地址
				uid: '', //uid
				token: '', //token
				_id: 0, //地址详情id
			}
		},
		onLoad(e) {
			this._id = e._id
			this.getUid_token()
			this.getAddressX()
		},
		methods: {
			onConfirm(e) {
				console.log(e);
				this.address = e.result
				this.addresscode = e.value
			},
			//获取uid和token
			getUid_token() {
				this.uid = uni.getStorageSync('uid')
				this.token = uni.getStorageSync('token')
			},
			//是否设置默认地址
			isMo(e) {
				this.isMoRen = e.detail.value
			},
			//点击添加地址
			addAddress() {
				this.$http.post('/order/saveAddress', {
						name: this.name,
						tel: this.phone,
						addr_text: this.address,
						addr_code: this.addresscode,
						detail: this.addressX,
						is_default: this.isMoRen,
						uid: this.uid,
						token: this.token,
						addr_id: this._id,
					})
					.then((res) => {
						console.log(res);
						uni.navigateTo({
							url: '/subpkg/address/address'
						})
						if (res.msg == "修改成功") {
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '添加成功',
								icon: 'none'
							})
						}

					})
					.catch((err) => {
						console.log(err);
					})
			},
			//
			getAddressX() {
				this.$http.post('/order/get_addr_detail', {
						uid: this.uid,
						_id: this._id
					})
					.then((res) => {
						console.log(res);
						this.name = res.data[0].name
						this.phone = res.data[0].tel
						this.address = res.data[0].addr_text
						this.addressX = res.data[0].detail
						this.isMoRen = res.data[0].is_default

					})
					.catch((err) => {
						console.log(err);
					})
			},
			//地址取消按钮
			onCancel() {

			},
		},
		components: {
			wPicker
		},
	}
</script>


<style lang="scss">
	.uni-input-placeholder {
		color: #999
	}

	.container {
		position: relative;
		width: 100vw;
		height: 90vh;
		overflow: hidden;
		background: #f7f7f7;
	}

	.input-content {
		background: #fff;
	}


	.input-item {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: auto;
		padding: 16upx 30upx;
		background: #fff;
		border-bottom: 1px solid #f5f5f7;

		&:last-child {
			margin-bottom: 0;
		}

		.pieckerInput {
			color: #333;
			width: calc(100% - 230upx);
			font-size: 30upx;
			display: inline-block;
			line-height: 60upx;
		}

		.xiangxi {
			width: 100%;
			height: 162upx;
			padding: 14upx 10upx;
			font-size: 30upx;
		}

		.tit {
			height: 60upx;
			line-height: 60upx;
			font-size: 30upx;
			width: 200upx
		}

		.iconfont {
			color: #999;
			line-height: 60upx;
			position: absolute;
			right: 30upx;
		}

		input {
			height: 60upx;
			flex: 1;
			width: calc(100% - 50upx);
			text-align: right;
		}

		.clear_input {
			position: absolute;
			right: 0;
			top: 10upx;
			padding: 10upx;

			.iconfont {
				font-size: 40upx;
			}
		}
	}

	.confirm-btn {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		border-radius: 4px;
		color: #fff;
		background-color: #FDD61E;

		&:after {
			border-radius: 100px;
			border: none;
		}
	}

	.moren {
		border-top: 20upx solid #f7f7f7;
		padding: 0 30upx;
		height: 110upx;
		line-height: 90upx;
		overflow: hidden;
		font-size: 30upx;

		.uni-list-cell-db {
			float: left;
			color: #333;
		}

		.kaiguan {
			float: right;
		}
	}

	.allinfo {
		width: 100%;
		height: 100%;
		background: #fff;
	}

	.xzdz .box01 {
		width: 94%;
		height: 45px;
		border-bottom: 1px solid #f7f7f7;
		margin-left: 3%;
	}

	.xzdz .box01 input {
		width: 72%;
		height: 45px;
		float: right;
	}

	.xzdz .box01 text {
		width: 70px;
		line-height: 45px;

	}


	.xzdz .box01.mr .iconfont {
		line-height: 42px;
		font-size: 18px;
		vertical-align: middle;
	}

	.xzdz .box01.gouxuan .iconfont:before {
		color: #4499ee;
		content: "\e61e";
	}

	.allinfo .btn {
		width: 100%;
		height: 45px;
		line-height: 45px;
		background: #4499ee;
		border-radius: 0;
		position: fixed;
		bottom: 0;
		color: #fff;
		font-size: 16px;
	}

	.pickerMask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	uni-switch .wx-switch-input:not([class*="bg-"]),
	uni-switch .uni-switch-input:not([class*="bg-"]) {}
</style>
