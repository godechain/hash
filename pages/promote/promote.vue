<template>
	<view class="content">
		<view style="text-align:center">
			<image class="top_img" style="width: 75vw;height: 55vw;margin:80rpx 0;" src="@/static/img/promote_banner@2x.63919bd6.png" mode="aspectFill" ></image>

		</view>
		<view class="promote_main">
			<view class="main_title">
				<view class="title1">{{$t('推者有礼')}}</view>
				<view class="title1">{{$t('人脉变钱买')}}</view>
				<view class="title2">{{$t('-呼朋呼友，享多多好礼-')}}</view>
			</view>

			<!-- <view class="coin_type">
				<view>
					<text :class="coinType == 0?'coin':''" @click="coinType = 0">USDT</text>
					<text :class="coinType == 1?'coin':''" @click="coinType = 1">TRX</text>
				</view>
			</view> -->

			<view class="data_info">
				<view class="total">
					<text class="num">{{spreadInfo.gain.totalback}}</text>
					<text class="name">{{$t('总佣金')}}</text>
				</view>
				<view class="second">
					<view class="row">
						<view class="item">
							<text class="num">{{spreadInfo.gain.back}}</text>
							<text class="name">{{$t('已结算')}}</text>
						</view>
						<view class="item">
							<text class="num">{{spreadInfo.gain.readyback}}</text>
							<text class="name">{{$t('未结算')}}</text>
						</view>
					</view>
					<view class="row">
						<view class="item">
							<text class="num">{{spreadInfo.pcount}}</text>
							<text class="name">{{$t('一级人脉')}}</text>
						</view>
						<view class="item">
							<text class="num">{{spreadInfo.ppcount}}</text>
							<text class="name">{{$t('二级人脉')}}</text>
						</view>
					</view>
				</view>
				<view class="third">
					<view class="row">
						<view class="item">
							<text class="num">{{spreadInfo.gain.pbet}}</text>
							<text class="name">{{$t('一级总投注')}}</text>
						</view>
						<view class="item">
							<text class="num">0.8% </text>
							<text class="name">{{$t('比例')}}</text>
						</view>
						<view class="item">
							<text class="num">{{spreadInfo.gain.pback}}</text>
							<text class="name">{{$t('一级总返佣')}}</text>
						</view>
					</view>
					<view class="row">
						<view class="item">
							<text class="num">{{spreadInfo.gain.ppbet}}</text>
							<text class="name">{{$t('二级总投注')}}</text>
						</view>
						<view class="item">
							<text class="num">0.2% </text>
							<text class="name">{{$t('比例')}}</text>
						</view>
						<view class="item">
							<text class="num">{{spreadInfo.gain.ppback}}</text>
							<text class="name">{{$t('二级总返佣')}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="share_ct">
				<view class="img_ct"><text>{{$t('分享好友')}}</text></view>
				<view class="qrcode_ct">
					<view class="qr">
						<u-qrcode class="qrCode" ref="qrcode" canvas-id="qrcode" :value="spreadUrl" size="200"></u-qrcode>
						<!-- <img
							:src="spreadUrl"
							style="display: inline-block;"> -->
					</view>
					<view style="height: 40rpx;"></view>
					<view class="btn">{{$t('保存二维码')}}</view>
				</view>
				<view class="url_ct">
					<view class="txt">
						<text>{{$t('复制链接分享好友')}}</text>
						<view>{{address}}</view>
					</view><textarea readonly="" id="copy" class="text_address"
						style="opacity: 0; height: 0rpx; width: 0rpx;"></textarea>
					<view class="btn" @click="copyClick(address)">{{$t('复制链接')}}</view>
				</view>
			</view>

			<view class="wallet_ct">
				<view class="img_ct"><text>{{$t('结算到钱包')}}</text></view>
				<view class="min_settle">{{$t('* 最低结算金额：1 USDT *')}}</view>
				<view class="info">
					<view class="num">{{addshow}}</view>
					<u-input color='#ffffff' type='number' v-model="num" style="background-color: #363342;margin-bottom: 80rpx;"></u-input>
					<view class="btn" @click="pay">{{$t('结算')}}</view>
				</view>
			</view>

			<view class="guide_ct">
				<view class="img_ct"><text>{{$t('活动规则')}}</text></view>
				<view class="title_ct">
					<view class="dots"><image class="dots_icon" src="@/static/img/bg_cylc_span2.png" mode="aspectFit" ></image>{{$t('佣金结算发放时间:每日的00: 00: 00系统自动派发(发放前一日)')}}</view>
					<view class="dots"><image class="dots_icon" src="@/static/img/bg_cylc_span2.png" mode="aspectFit" >{{$t('“未结算”的佣金，可以通过点击【结算】直接结算到钱包')}}</view>
					<view class="dots"><image class="dots_icon" src="@/static/img/bg_cylc_span2.png" mode="aspectFit" >{{$t('佣金计算方式')}}</view>
					<text>{{$t('一级返佣--级用户的总投注*0.8%',{rate:"0.8%"})}}</text>
					<text>{{$t('二级返佣=二级用户的总投注*0.2%',{rate:"0.2%%"})}}</text>
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
				address:'',
				spreadUrl:'',
				hashAddress:'',
				addshow:'',
				num:10
			}
		},
		onLoad() {
			this.hashAddress=uni.getStorageSync('hashAddress')
			this.addshow = this.hashAddress.substr(0,4)+'****'+this.hashAddress.substr(this.hashAddress.length-4,this.hashAddress.length)
			this.getSpreadInfo()
		},
		onShow(){
			uni.setNavigationBarTitle({
				title:this.$t('推广赚钱')
			})
		},
		watch:{
			coinType(){
				this.getSpreadInfo()
			}
		},
		methods: {
			copyClick(cont){
				uni.setClipboardData({
					data: cont,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
						});
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			pay(){
				if(!this.num){
					uni.showToast({
						title:'请输入正常的数量',
						icon:'none'
					})
					return false
				}
				this.$api.post('/api/agent_spread/withdraw',{coin:'gode',num:this.num},res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.num=''
					if(res.code==1){
						
					}
				})
			},
			getSpreadInfo(){
				this.$api.post("/api/agent_spread/spread_info",{coin:'gode'},res=>{
					if(res.code==1){
						this.spreadInfo=res.data
						this.address=res.data.address
						this.spreadUrl=res.data.spread_url
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
				.total {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					height: 170rpx;
					
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

				.third {
					.item {
						width: 33.3%;
					}
				}
			}

			.share_ct {
				margin: 45rpx 20rpx;
				// margin-top: 45rpx;
				padding-top: 50rpx;
				padding-bottom: 90rpx;
				border-radius: 20rpx;
				background-color: #151516!important;
				.img_ct {
					text-align: center;
					color: #fff;
					margin: 0 20rpx 80rpx 20rpx;
					border-bottom: 2rpx solid #333;
					height: 100rpx;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					text {
						font-size: 45rpx;
					}
				}

				.qrcode_ct {
					text-align: center;
					.qr {
						width: 450rpx;
						height: 450rpx;
						margin: 0 auto;
						display: flex;
						border-radius: 20rpx;
						align-items: center;
						justify-content: center;
						background: url(@/static/img/qr_border.png);
						background-size: 100% 100%;
						background-color: #fff;
						.qrCode {
							width: 450rpx;
							height: 450rpx;
							// max-width: 100%;
    						// font-size: .16rem;
						}
					}


					.btn {
						width: 270rpx;
						height:90rpx;
						background: linear-gradient(90deg,#fc7712,#ff2f18);
						border-radius:45rpx;
						font-size: 30rpx;
						color: #fff;
						text-align: center;
						margin: 0 auto 80rpx auto;
						display: flex;
						align-items: center;
						justify-content: center;
						line-height: 1;
					}
				}

				.url_ct {
					margin: 0 18rpx;
					border-radius:80rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-direction: column;
					.txt {
						text-align: center;
						width: 80%;
    					word-break: break-all;
						text {
							font-size: 30rpx;
							color: #dadada;
							text-align: center;
						}
						view{
							margin: 60rpx 0 95rpx 0;
						}
					}

					textarea#copy.text_address {

					}

					.btn {
						width: 230rpx;
						height:90rpx;
						line-height: 90rpx;
						text-align: center;
						font-size: 30rpx;
						background: linear-gradient(90deg,#fc7712,#ff2f18);
						border-radius:60rpx;
						color: #fff;
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
						display: block;
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
