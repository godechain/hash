<template>
	<view class="content">
		<view class="head">
			<img src="https://g3-static-67238u.gzjbqc.com/upimages/1655732240.png"
           >
		</view>
		<!-- <view class="account">
			<text>账号:xyabc</text><text class="split"></text>
			<text>ID:2956469</text>
		</view> -->

		<textarea readonly="" id="uidCopy" class="text_address"
			style="opacity: 0; height: 0px; width: 0px;"></textarea>
		<textarea readonly="" id="addressCopy"
			class="text_address" style="opacity: 0; height: 0px; width: 0px;"></textarea>

		<!-- <view class="address">
			<h2>TRC地址</h2>
			<view class="addr_ct">TAv5T4U11p3At5F8f8hBmCj9fAfQ4JvKGV</view>
		</view> -->
		<ul class="animate__animated animate__lightSpeedInLeft" style="padding: 20px;">
			<li @click="navToUrl('/pages/my/my_rank')">
				<view>
					<image class="item_logo" src="@/static/img/pond.png" mode="aspectFit"></image>
					<label>{{$t('我的池子')}}</label>
				</view>
				<text class="right_arrow"></text>
			</li>

			<li @click="navToUrl('/pages/my/betting_record')">
				<view>
					<image class="item_logo" src="@/static/img/bet_record.png" mode="aspectFit"></image>
					<label>{{$t('投注记录')}}</label>
				</view>
				<text class="right_arrow"></text>
			</li>
			<li @click="navToUrl('/pages/my/common_record?type=2')">
				<view>
					<image class="item_logo" src="@/static/img/rebate_record.png" mode="aspectFit"></image>
					<label>{{$t('返水结算记录')}}</label>
				</view>
				<text class="right_arrow"></text>
			</li>
			<li @click="navToUrl('/pages/my/common_record?type=1')">
				<view>
					<image class="item_logo" src="@/static/img/commision_record.png" mode="aspectFit"></image>
					<label>{{$t('佣金结算记录')}}</label>
				</view>
				<text class="right_arrow"></text>

			</li>
			<li>
				<view>
					<image class="item_logo" src="@/static/img/share.png" mode="aspectFit"></image>
					<label>{{$t('分享好友')}}</label>
				</view>
				<text class="right_arrow"></text>

			</li>
			<!-- <li>
				<view>
					<image class="item_logo" src="@/static/img/logoout.png" mode="aspectFit"></image>
					<label>退出登录</label>
				</view>
				<text class="right_arrow"></text>
			</li> -->
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow(){
			uni.setNavigationBarTitle({
				title:this.$t('我的')
			})
		},
		methods: {
			navToUrl(url){
				this.$common.navigateTo(url)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #0f0e0f;
		min-height: 100vh;
		padding-bottom: 90rpx;
		.head {
			padding-top: 90rpx;
			text-align: center;
			img {
				width: 270rpx;
				height: 270rpx;
				border-radius: 50%;
				background-color: red;
			}
		}
		.account {
			margin: 45rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 30rpx;
			text {
				font-size: 30rpx;
    			color: #fff;
			}

			text.split {
				display: inline-block;
				width: 3rpx;
				height: 30rpx;
				background-color: #fff;
				margin: 0 30rpx;
			}
		}

		textarea#uidCopy.text_address {
		}
		textarea#addressCopy.text_address {
		}

		.address {
			width: 90vw;
			background: #191819;
			border-radius: 20rpx;
			margin: 0 auto 45rpx auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #fff;
			padding: 45rpx 0;
			h2 {
				font-size: 30rpx;
				margin-bottom:28rpx;
				width: 100%;
				color: #fff;
				text-align: center;
			}

			.addr_ct {
				width: 60vw;
				height: 90rpx;
				background: #0f0e0f;
				color: #fff;
				font-size: 20rpx;
				line-height: 90rpx;
				padding: 0 50rpx;
				border-radius: 28rpx;
				text-align: center;
			}
		}

		ul.animate__animated.animate__lightSpeedInLeft {
			padding: 40rpx;
			li {
				background-color: #191819;
				padding-left: 45rpx;
				padding-right: 60rpx;
				list-style: none;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 120rpx;
				view {
					.item_logo {
						display: inline-block;
						width: 50rpx;
						height: 50rpx;
						vertical-align: middle;
						margin-right: 30rpx;
					}

					label {
						color: #fff;
						font-size: 30rpx;
						vertical-align: middle;
					}
				}

				.right_arrow {
					display: inline-block;
					width: 30rpx;
					height: 35rpx;
					background: url(@/static/img/arrow.png) 0 no-repeat;
					background-size: contain;
				}
			}
			li:first-child {
				border-top-right-radius: 20rpx;
				border-top-left-radius: 20rpx;
			}
		}
	}

</style>
