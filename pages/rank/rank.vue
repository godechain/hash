<template>
	<view class="content">
		<view class="rank">
			<view class="rank_item flex-row-between" v-for="(item,index) in rankList" :key="item.id" @click="goIn(item)">
				<image v-if="index<3" class="item_img" :src="require('@/static/img/rank'+((index>2?2:index)+1)+'.png')" mode="aspectFit" ></image>
				<view class="item_img item_index"  v-else>{{index}}</view>
				<view class="item_main">
					<view class="main_name">{{item.name}}</view>
					<view class="main_num">{{$t('池子')}}：{{Number(item.pool).toFixed(2)}}/{{Number(item.cap).toFixed(2)}}</view>
				</view>
				<view  class="item_right">{{$t('去参与')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankList:[]
			}
		},
		onLoad() {
			this.getPools()
		},
		methods: {
			goIn(item) {
				uni.navigateTo({
					url: `/pages/game_rule/game_rule?current=0&type=0&uid=${item.uid}`,
				});
			},
			getPools(){
				this.$api.post('/api/game_pool/pools',{},res=>{
					let arr = Array.from(res.data);
					this.rankList = arr
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #000;
		height: 100vh;
		.rank {
			padding: 30rpx;
			.rank_label {
				font-weight: bold;
				padding: 40rpx 0;
			}

			.rank_item {
				width: calc(100vw - 60rpx);
				height: 200rpx;
				margin: 20rpx 0;
				background: url(@/static/img/rank_bg.png);
				background-size: 100% 100%;
				.item_img{
					width: 120rpx;
					height: 120rpx;
					margin-right:20rpx;
					margin-left: 10rpx;

					text-align: center;
				}
				.item_index{
					color: #ed172b;
					font-size: 50rpx;
					border: 2rpx solid #ed172b;
					border-radius: 50%;
					background: #fff;
					margin: 20rpx;
					line-height: 120rpx;
				}
				.item_main{
					flex: 1;
					.main_name{
						font-size: 36rpx;
						font-weight: bold;
					}
					.main_num{
						margin-top: 20rpx;
						border-radius: 80rpx;
						padding: 4rpx 64rpx 4rpx 24rpx;
						width: 130px;
						background: #DBDBDB;
					}
				}
				.item_right{
					color: #fff;
					text-shadow: 0px 2rpx 2rpx #ED172B;
					-webkit-text-stroke: 1rpx #ED172B;
					margin-right:40rpx;
					font-size: 36rpx;
					font-weight: bold;
				}
			}
			.rank_item:nth-child(1){
				background: url(@/static/img/rank1_bg.png);
				background-size: 100% 100%;
				color: #fff;
				.item_main{
					.main_name{
						text-shadow: 0px 2rpx 2rpx #944e11;
						-webkit-text-stroke: 1rpx #944E11;
					}
					.main_num{
						background: #944E11;
					}
				}
				.item_right{
					text-shadow: 0px 2rpx 2rpx #944e11;
					-webkit-text-stroke: 1rpx #944E11;
				}
			}
			.rank_item:nth-child(2){
				background: url(@/static/img/rank2_bg.png);
				background-size: 100% 100%;
				color: #fff;
				.item_main{
					.main_name{
						text-shadow: 0px 2rpx 2rpx #8C8C8C;
						-webkit-text-stroke: 1rpx #8C8C8C;
					}
					.main_num{
						background: #8C8C8C;
					}
				}
				.item_right{
					text-shadow: 0px 2rpx 2rpx #8C8C8C;
					-webkit-text-stroke: 1rpx #8C8C8C;
				}
			}
			.rank_item:nth-child(3){
				background: url(@/static/img/rank3_bg.png);
				background-size: 100% 100%;
				color: #fff;
				.item_main{
					.main_name{
						text-shadow: 0px 2rpx 2rpx #F46C0A;
						-webkit-text-stroke: 1rpx #F46C0A;
					}
					.main_num{
						background: #F46C0A;
					}
				}
				.item_right{
					text-shadow: 0px 2rpx 2rpx #F46C0A;
					-webkit-text-stroke: 1rpx #F46C0A;
				}
			}
		}
	}
</style>
