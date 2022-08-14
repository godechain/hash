<template>
	<view class="content">
		<view style="text-align:center">
			<image class="top_img" style="width: 75vw;height: 55vw;margin:80rpx 0;" src="@/static/img/promote_banner@2x.63919bd6.png" mode="aspectFill" ></image>

		</view>
		<view class="promote_main">

			<!-- <view class="coin_type">
				<view>
					<text :class="coinType == 0?'coin':''" @click="coinType = 0">USDT</text>
					<text :class="coinType == 1?'coin':''" @click="coinType = 1">TRX</text>
				</view>
			</view> -->

			<view class="data_info">
				<view class="second">
					<view class="row">
						<view class="item">
							<text class="num">{{spreadInfo.gain.totalwater}}</text>
							<text class="name">{{$t('历史总返水')}}</text>
						</view>
						<view class="item">
							<text class="num">{{spreadInfo.gain.bet}}</text>
							<text class="name">{{$t('历史总投注')}}</text>
						</view>
					</view>
					<view class="row">
						<view class="item">
							<text class="num">{{spreadInfo.gain.water}}</text>
							<text class="name">{{$t('已结算')}}</text>
						</view>
						<view class="item">
							<text class="num">{{spreadInfo.gain.readywater}}</text>
							<text class="name">{{$t('未结算')}}</text>
						</view>
					</view>
				</view>
			</view>


			<view class="wallet_ct">
				<view class="img_ct"><text>{{$t('结算到钱包')}}</text></view>
				<view class="min_settle">{{$t('* 最低结算金额：1 USDT *')}}</view>
				<view class="info">
					<view class="num">{{webAddshow}}</view>
					<u-input color='#ffffff' type='number' v-model="num" style="background-color: #363342;margin-bottom: 40px;"></u-input>
					<view class="btn" @click="pay">{{$t('结算')}}</view>
				</view>
			</view>

			<view class="guide_ct">
				<view class="img_ct"><text>{{$t('活动规则')}}</text></view>
				<view class="title_ct">
					<view class="dots"><image class="dots_icon" src="@/static/img/bg_cylc_span2.png" mode="aspectFit" ></image>{{$t('返水结算发放时间:每日的00: 00:00系统自动派发(发放前一日)')}}</view>
					<view class="dots"><image class="dots_icon" src="@/static/img/bg_cylc_span2.png" mode="aspectFit" >{{$t('未领取的返水,可以通过点击【领取】直接结算到钱包')}}</view>
					<view class="dots"><image class="dots_icon" src="@/static/img/bg_cylc_span2.png" mode="aspectFit" >{{$t('返水计算方式-返水=用户的总投注*0.5%',{rate:"0.5%"})}}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coinType:0,
				spreadInfo:{},
				webAddshow:'',
				num:''
			}
		},
		onLoad() {
			this.getSpreadInfo()
			this.address=uni.getStorageSync('hashAddress')
			this.webAddshow=this.address.slice(0,8)+'****'+this.address.slice(this.address.length-8,this.address.length)
		},
		onShow(){
			uni.setNavigationBarTitle({
				title:this.$t('流水返现')
			})
		},
		watch:{
			coinType(val){
				this.getSpreadInfo()
			}
		},
		methods: {
			pay(){
				if(!this.num){
					uni.showToast({
						title:this.$t('请输入正常的数量'),
						icon:'none'
					})
					return false
				}
				this.$api.post('/api/water_back/withdraw',{coin:'GODE',num:this.num},res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.num=''
					if(res.code==1){
						this.getSpreadInfo()
					}
				})
			},
			getSpreadInfo(){
				this.$api.post('/api/water_back/spread_info',{coin:'GODE'},res=>{
					if(res.code==1){
						this.spreadInfo=res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		// height: 100vh;
		width: 100vw;
 	 	background: #000;
		color: #fff;
		.promote_main{
			padding-bottom: 50rpx;
			.coin_type{
				color: #fff;
				text-align: center;
				margin: 40rpx 0 0 0;
				view{
					width: 450rpx;
					margin: auto;
					background: #fff;
					border-radius: 50rpx;
					height: 90rpx;
					display: flex;
					justify-content: center;
					color: #000;
					text{
						border-radius: 0.50rpx;
						display: inline-block;
						width: 270rpx;
						font-size: 36rpx;
						line-height: 90rpx;
					}
					.coin{
						background: #f56a00;
    					color: #fff;
						border-radius: 50rpx;
					}
				}
			}

			.data_info {
				margin: 20rpx;
				border-radius:20rpx;
				background: #0c0c0c;
				>view{
					border-bottom: 2rpx solid #3b3328;
				}
				.num {
					color: #fff;
					font-size: 46rpx;
					font-weight: 700;
				}
				.name {
					color: #bebebe;
					font-size: 32rpx;
					text-align: center;
				}
				.row {
					display: flex;
					border-bottom: 2rpx solid #3b3328;
					.item {
						border-right: 2rpx solid #3b3328;
						height: 170rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
					}
					.item:last-child{
						border-right: transparent;
					}
				}

				.second {
					.item {
						width: 50%;
					}
				}
			}


			.wallet_ct{

				border-radius: 20rpx;
				padding-top: 50rpx;
				padding-bottom: 60rpx;
				background-color: #0c0c0c!important;
				margin: 45rpx 20rpx;
				.img_ct {
					text-align: center;
					color: #fff;
					margin: 0 20rpx 15rpx 20rpx;
					border-bottom: 2rpx solid #333;
					height: 100rpx;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					text {
						font-size: 45rpx;
					}
				}
	
				.min_settle {
					margin-bottom: 45rpx;
					color: #787878;
					font-size: 28rpx;
					text-align: center;
				}	
	
				.info {
					padding: 0 38rpx;
					display: flex;
					align-items: center;
					flex-direction: column;
					.num {
						width: 450rpx;
						height: 90rpx;
						background: rgba(0,0,0,.32);
						border-radius:45rpx;
						font-size: 28rpx;
						color: #fff;
						letter-spacing: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 50rpx 0 90rpx 0;
					}
	
					.btn {
						width: 220rpx;
						height: 90rpx;
						background: linear-gradient(90deg,#fc7712,#ff2f18);
						border-radius: 45rpx;
						font-size: 20rpx;
						color: #fff;
						text-align: center;
						line-height: 90rpx;
					}
				}
			}

			.guide_ct {
				padding: 50rpx 45rpx;
				border-radius: 20rpx;
				background-color: #0c0c0c!important;
				margin: 45rpx 20rpx;
				.img_ct {
					text-align: center;
					color: #fff;
					margin: 0 20rpx 15rpx 20rpx;
					border-bottom: 2rpx solid #333;
					height: 100rpx;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					text {
						font-size: 45rpx;
					}
				}

				.title_ct {
					.dots {
						position: relative;
						padding-left: 15rpx;
						margin: 15rpx 0;
						color: #d4d4d4;
						font-size:30rpx;
						line-height: 2;
						.dots_icon{
							width: 20rpx;
							height: 20rpx;
							margin: 0 20rpx;
						}
					}

					text {
						padding-left: 140rpx;
    					margin: 15rpx 0;

						color: #d4d4d4;
						font-size:30rpx;
						line-height: 2;
					}
				}
			}
		}
	}
</style>
