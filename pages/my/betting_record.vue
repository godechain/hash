<template>
	<view class="content">
		<u-tabs :current="current" class="tabs" @change='currentChange' :activeStyle="activeStyle" :inactiveStyle="inactiveStyle" :list="tabsList" lineWidth="60" :scrollable="false" lineHeight="7" lineColor="#FFF"></u-tabs>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="record">
				<view class="record_item uni-h5 uni_margin_15" v-for="item in dataList">
					<view class="flex-row-between">
						<view class="">
							{{$t('下注金额')}}
						</view>
						<view class="">
							{{item.val}}
						</view>
					</view>
					<view class="flex-row-between uni_margin_10">
						<view class="">
							{{$t('下注结果')}}
						</view>
						<view class="">
							{{betComput(item.bet)}}
						</view>
					</view>
					<view class="flex-row-between uni_margin_10" v-if="current==1||current==3">
						<view class="">
							{{$t('下注类型')}}
						</view>
						<view class="">
							{{current == 1?typeComput1(item.type):typeComput(item.type)}}
						</view>
					</view>
					<view class="flex-row-between">
						<view class="">
							{{$t('开奖时间')}}
						</view>
						<view class="">
							{{item.creat_time}}
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				tabsList: [{
					name: this.$t('幸运哈希'),
				}, {
					name: this.$t('幸运数字'),
				}, {
					name: this.$t('哈希牛牛'),
				},{
					name: this.$t('幸运庄闲'),
				},],
				current:0,
				activeStyle:{color: '#fff' ,fontSize: '30rpx'},
				inactiveStyle:{color: '#fff',fontSize: '26rpx' },
				dataList: [],
				api:'',
				upOption:{
					auto:false
				},
				downOption:{
					auto:false
				},
			}
		},
		onLoad(option){
			this.current = option.current
		},
		onShow(){
			uni.setNavigationBarTitle({
				title:this.$t('投注记录')
			})
		},
		watch:{
			current:{
				handler(val,oldVal){
					switch(val){
						case 0:
						this.api='/api/log/bet_hash';
						break;
						case 1:
						this.api='/api/log/bet_number';
						break;
						case 2:
						this.api='/api/log/bet_cattle';
						break;
						case 3:
						this.api='/api/log/bet_zx';
						break;
					}
					this.getInfo(1)
				},
				immediate: true
			}
		},
		computed:{
			betComput(){
				return function(value){
					switch(value){
						case '1':
						 return value=this.$t('币种无玩法')
						 break;
						 case '2':
						  return value=this.$t('无效下注')
						  break;
						case '3':
						 return value=this.$t('输')
						  break;
						 case '4':
						  return value=this.$t('赢')
						 break;
					}
				}
			},
			typeComput1(value){
				return function(value){
				console.log(value)
					switch(value){
						case '0':
						 return value=this.$t('小')
						 break;
						 case '9':
						  return value=this.$t('大')
						  break;
						case '1':
						 return value=this.$t('单')
						 break
						 case "8":
						 return value=this.$t('双')
					}
				}
			},
			typeComput(){
				return function(value){
					switch(value){
						case '1':
						 return value=this.$t('压庄')
						 break;
						 case '2':
						  return value=this.$t('压闲')
						  break;
						case '3':
						 return value=this.$t('压和')
					}
				}
			}
		},
		methods: {
			currentChange(e){
				this.current=e.index
			},
			upCallback(page) {
				this.getInfo(page.num)
			},
			downCallback(){
				this.getInfo(1)
			},
			getInfo(page){
				this.$api.post(this.api,{coin:'gode',page:page},res=>{
					if(res.code==1){
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.rows; 
						let curPageLen = curPageData.length; 
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.count
						//设置列表数据
						if(page == 1) this.dataList = []; //如果是第一页需手动置空列表
						this.dataList = this.dataList.concat(curPageData); //追加新数据
						this.mescroll.endByPage(curPageLen, totalSize); ; 
					}else{
						this.mescroll.endErr()
					}
				})
			},
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
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height: 100vh;
		width: 100vw;
 	 	background: #000;
		color: #fff;
		.tabs{
			padding: 10rpx 36rpx;
			background: #8e3d00;
		}
		.record{
			padding: 30rpx;
		}
		.record_item{
			background-color: #191819;
			padding: 30rpx;
			border-radius: 30rpx;
		}
	}
</style>
