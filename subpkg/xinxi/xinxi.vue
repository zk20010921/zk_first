<template>
	<view class="page-user">
		<view class="bgwhite">
			<view class="info_main">
				<view>头像</view>
				<view class="" style="width: 120upx; height: 120upx;">
					<avatar selWidth="400upx" selHeight="400upx" @upload="myUpload"
						:avatarSrc="'../../static/missing-face.png'" avatarStyle="width: 120upx; height: 120upx; ">
					</avatar>
				</view>
			</view>
			<view class="info_cont">
				<view>昵称</view>
				<input class="color999" type="text" v-model="nickname" placeholder="输入中文或英文，1~8个字" />
			</view>
			<view class="info_cont" @click="show = true">
				<view>性别</view>
				<text class="iconfont icon-fanhui1"></text>
				<view class="color999 uni-input" style="color: #000000;">
					{{userInfo.sex == '' ? '请选择性别' : sex}}
				</view>
			</view>
			<view class="info_cont" @click="show2 = true">
				<view>生日</view>
				<text class="iconfont icon-fanhui1"></text>
				<view class="color999 uni-input" style="color: #000000;">
				{{userInfo.birthday == '' ? '请选择生日' : birthday}}
				</view>
			</view>
			<view class="info_cont" @click="show_addr_picker = true">
				<view>所在地</view>
				<text class="iconfont icon-fanhui1"></text>
				<input class="color999" type="text" v-model="addr" disabled placeholder="请输入地址" />
			</view>
			<view class="info_cont">
				<view>手机号</view>
				<text class="iconfont icon-fanhui1"></text>
				<input class="color999" type="text" :value="userInfo.username" disabled="true" />
			</view>
		</view>
		<view class="confirm-btn" @click="queding">确定</view>
		<!-- 性别弹出层 -->
		<view>
			<u-picker @cancel="show = false" @confirm="ok" mode="selector" v-model="show" :default-selector="[0]"
				:range="selector"></u-picker>
		</view>
		<!-- 年龄弹出层 -->
		<view>
			<u-picker @confirm="ok2" mode="time" v-model="show2" :params="params"></u-picker>
		</view>
		
		<w-picker
			:visible.sync="show_addr_picker"
			mode="region"
			:value="addr_code"
			default-type="value"
			:hide-area="false"
			@confirm="onConfirm($event)"
			@cancel="onCancel"
			ref="region"
		></w-picker>
	</view>
</template>

<script>
	import wPicker from '../../components/w-picker/w-picker.vue';
	export default {
		data() {
			return {
				token: '', //token
				nickname: '', //昵称
				username: '', //手机号
				userInfo: [], //用户信息
				birthday: '', //生日
				addr: '', //地址
				uid: '', //uid
				show: false,
				show2: false,
				selector: ['男', '女'],
				sex: '', //选择性别
				show_addr_picker:false,
				addr_code:[],
				
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},

			}
		},
		onLoad() {
			//获取Token
			this.getToken()
			//获取用户信息
			this.getXinxi()
			//获取Uid
			this.getUid()
		},
		methods: {
			//获取本地token
			getToken() {
				try {
					const value = uni.getStorageSync('token');
					if (value) {
						this.token = value
					}
				} catch (e) {
					// error
				}
			},
			//获取信息
			getXinxi() {
				this.$http.post('/user/getuserInfo', {
						token: this.token
					})
					.then((res) => {
						console.log(res);
						this.userInfo = res.userInfo
						this.nickname = res.userInfo.nickname
						this.sex = res.userInfo.sex
						this.birthday = res.userInfo.birthday
						this.addr = res.userInfo.addr
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//性别改变
			ok(e) {
				if (e[0] == 0) {
					this.sex = '男'
					console.log(this.sex);
				} else {
					this.sex = '女'
					console.log(this.sex);
				}
			},
			//选择日期
			ok2(e) {
				this.birthday = e.year + '年' + e.month + '月' + e.day + '日'
			},
			//选择所在地
			onConfirm(e){
			this.addr = e.result
			},
			//修改信息
			queding() {
				this.$http.post('/user/editUserInfo', {
						avatar: '',
						nickname: this.nickname,
						sex: this.sex,
						birthday: this.birthday,
						addr: this.addr,
						addr_code: '',
						uid: this.uid
					})
					.then((res) => {
						console.log(res);
						uni.switchTab({
							url:'/pages/my/my',
						})
						uni.showToast({
							title:'修改成功',
							icon:'none',
						})
					})
					.catch((err) => {
						console.log(err);
					})
			},
			getUid(){
				try {
					const value = uni.getStorageSync('uid');
					if (value) {
						this.uid = value
					}
				} catch (e) {
					// error
				}
			}



		},
	}
</script>

<style lang="scss">
	.bgwhite {
		background: #fff;
	}

	.page-user {
		width: 100%;
		height: 100%;

		.info_main {
			width: 100%;
			height: 151upx;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;
			padding: 0 30upx;

			view {
				font-size: 30upx;
				color: #999999;
			}

			image {
				float: right;
				width: 94upx;
				height: 94upx;
				border-radius: 50%;
			}
		}

		.info_main:after {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			background-color: #eeeeee;
		}

		.info_cont {
			width: 100%;
			height: 101upx;
			position: relative;
			overflow: hidden;
			padding: 0 30upx;

			view {
				font-size: 30upx;
				line-height: 101upx;
				color: #999999;
				float: left;
			}

			.txt {
				display: block;
				width: auto;
				height: 101upx;
				float: right;
				text-align: right;
				margin-right: 10upx;
				font-size: 30upx;
				width: 500upx;
			}

			.uni-input,
			input {
				display: block;
				width: auto;
				height: 101upx;
				float: right;
				text-align: right;
				margin-right: 10upx;
				font-size: 30upx;
				width: 500upx;
			}

			text {
				font-size: 14upx;
				color: #bfbfbf;
				float: right;
				line-height: 101upx;
			}

			.iconfont {
				font-size: 28upx;
			}
		}

		.uni-input-placeholder {
			color: #999;
		}

		.info_cont:after {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			background-color: #eeeeee;
		}
	}

	.confirm-btn {
		width: 80%;
		height: 80upx;
		background: #fdd100;

		border-radius: 60upx;
		margin: 40upx auto;

		text-align: center;
		color: #fff;
		line-height: 80upx;
		font-size: 30upx;
	}

	.sex {
		background-color: #ffffff;
		width: 100%;
		text-align: center;

		uni-data-checkbox {
			margin: 50rpx;
		}
	}

	.shengri {
		width: 100%;
		background-color: #ffffff;
	}

	.checklist-group {
		display: flex;
		justify-content: center;
	}
</style>
