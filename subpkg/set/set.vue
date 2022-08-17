<template>
	<view class="container">
		<view class="list-cell b-b m-t">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" >
			<text class="cell-tit">修改密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell m-t b-b" >
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" >
			<text class="cell-tit">关于小莱</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- #ifdef APP-PLUS -->
	
		<view class="list-cell" >
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 1.0</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
			<!-- #endif -->
		<view class="list-cell log-out-btn" ><text class="cell-tit">退出登录</text></view>

		
	</view>
</template>

<script>
export default {
	
};
</script>

<style lang="scss">
page {
}
.list-cell {
	display: flex;
	align-items: baseline;
	line-height: 60upx;
	position: relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;

		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;

		margin-right: 10upx;
	}
	.cell-tip {

	}
	switch {
		transform: translateX(16upx) scale(0.84);
	}
}
</style>
