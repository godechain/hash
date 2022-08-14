<template>
	<view class="content">
		<view style="text-align:center">
			<image class="top_img" style="width: 75vw;height: 75vw;margin:80rpx 0;" src="@/static/img/whatsapp.c3ccf010.png" mode="aspectFill" ></image>

		</view>
		<view class="promote_main">
			<view class="main_title">
				<view class="title1">{{$t('客服24小时')}}</view>
				<view class="title1">{{$t("为您竭诚服务")}}</view>
				<view class="title2">{{$t("如遇到问题需要需要帮助，请联系线上客服")}}</view>
			</view>

			<ul class="connect">
				<li v-for="item in customer">
					<view class="left">
						<!-- <i class="leftImg contract"></i> -->
						<image class="leftImg" :src="item.icon" mode="aspectFit" ></image>
						<view>
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="consult" @click="urlClick(item.link)">{{$t('咨询')}}</view>
				</li>
			</ul>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customer:[]
			}
		},
		onLoad() {
			this.getCutomerInfo()
		},
		onShow(){
			uni.setNavigationBarTitle({// 修改头部标题
				title: this.$t('客服')
			});
		},
		methods: {
			copyClick(cont){
				uni.setClipboardData({
					data: cont,
					success: function() {
						uni.showToast({
							title: this.$t("复制成功"),
							duration: 2000,
						});
					},
					fail: function(err) {
						uni.showToast({
							title: this.$t("复制失败"),
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			getCutomerInfo(){
				this.$api.post("/api/common/customer_service",{},res=>{
					if(res.code==1){
						this.customer=res.data
					}
				})
			},
			urlClick(url){
				uni.showLoading({
					title: this.$t("正在打开")
				});
				window.location.href = url;
				uni.hideLoading();

			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height: 100vh;
		width: 100vw;
 	 	background: #000;
		color: #fff;
		.promote_main{
			padding-bottom: 50rpx;
			.main_title{
				text-align: center;
				.title1{
					font-size:54rpx;
					font-weight:bold;
				}
				.title2{
					margin: 20rpx;
					font-size:30rpx;
					
				}
			}

			ul.connect {
				min-width: 80vw;
				padding: 45rpx;
				border-radius: 30rpx;
				margin: 0 40rpx;
				background: #020304;
				li {
					list-style: none;
					margin-bottom: 45rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #fff;
					padding: 20rpx;
					border-radius: 20rpx;
					.left {
						display: flex;
    					align-items: center;
						.leftImg{
							display: inline-block;
							width: 90rpx;
							height:90rpx;
							margin-right: 20rpx;
						}

						view {
							text {
								font-size: 30rpx;
								color: #000;
								font-weight: 700;
								margin-bottom: 10rpx;
							}
						}
					}

					.consult {
						width: 180rpx;
						padding: 10rpx;
						background: #f56a00;
						border-radius: 40rpx;
						color: #fff;
						text-align: center;
						font-size: 30rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;

					}
				}
			}
		}
	}
</style>
