<template>
	<view class="content">
		<view class="rank">
			<view v-for="(item,index) in rankList" :key="item.id">

				<view class="rank_item flex-row-between" v-if="item.uid == userId">
					<!-- <image v-if="index<3" class="item_img" :src="require('@/static/img/rank'+((index>2?2:index)+1)+'.png')" mode="aspectFit" ></image>
					<view class="item_img item_index"  v-else>{{index}}</view> -->
					<view class="item_main">
						<view class="main_name flex-row-flex">
							<view>{{item.name}}</view>
							<image @click="setName(item)" class="edit_icon" src="@/static/img/edit.png" mode="aspectFit" ></image>
						</view>
						<view class="main_num">{{$t('池子')}}：{{Number(item.pool).toFixed(2)}}/{{Number(item.cap).toFixed(2)}}</view>
					</view>
					<!-- <view  class="item_right">去参与</view> -->
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="center" @close="show = false" :round="20" :closeable="true">
            <view class="popup_main">
                <u-input
					:placeholder="$t('池子名称')"
					:border="surround"
					v-model="rankName"
					style="    border: 1px solid #dadbde;"
				></u-input>
			<view class="popup_btn" @click="setPoolName">{{$t('确认修改')}}</view>
            </view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				rankList:[
				],
				value:'池子名称',
				surround:'surround',
				rankInfo:{},
				rankName:'',
				userId:''

			}
		},
		onLoad() {
			let userinfo = uni.getStorageSync('userinfo')
			console.log(userinfo.id);
			this.userId = userinfo.id
			this.getGamePools()
		},
		onShow(){
			uni.setNavigationBarTitle({
				title:this.$t('我的池子')
			})
		},
		methods: {
			setName(item){
				this.rankInfo=item
				this.rankName=item.name
				this.show = true
			},
			setPoolName(){
				this.$api.post('/api/game_pool/set_pool_name',{name:this.rankName,uid:this.rankInfo.uid},res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.show=false
					this.getGamePools()
				})
			},
			getGamePools(){
				this.$api.post('/api/game_pool/pools',{},res=>{
					if(res.code==1){
						this.rankList=res.data
					}
				})
			}
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
				.item_main{
					flex: 1;
					padding: 0 40rpx;
					.main_name{
						font-size: 36rpx;
						font-weight: bold;
						.edit_icon{
							width: 50rpx;
							height: 50rpx;
							margin-left: 20rpx;
						}
					}
					.main_num{
						margin-top: 20rpx;
						border-radius: 80rpx;
						padding: 10rpx 64rpx 10rpx 24rpx;
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
		}

		.popup_main{
			margin-top: 50rpx;
			padding: 20rpx;
			width: 75vw;
			.popup_btn{
				margin: 20rpx auto;
				width: 200rpx;
				height: 80rpx;
				color: #fff;
				background: url(@/static/img/btn.png);
				background-size: 100% 100%;
				border-radius: 50rpx;
				font-size: 24rpx;
				font-weight: 600;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				padding: 0 14rpx;
				line-height: .9;
				text-align: center;
			}
		}
	}
</style>
