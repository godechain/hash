<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="record">
				<view class="record_item uni-h5 uni_margin_15" v-for="item in dataList">
					<view class="flex-row-between">
						<view class="">
							{{$t('结算金额')}}
						</view>
						<view class="">
							{{item.number}}
						</view>
					</view>
					<view class="flex-row-between uni_margin_10">
						<view class="">
							
							{{$t('结算状态')}}

						</view>
						<view class="">
							{{statusComput(item.status)}}
						</view>
					</view>
					<view class="flex-row-between">
						<view class="">
							{{$t('申请时间')}}
						</view>
						<view class="">
							{{item.create_time}}
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
				dataList: [],
				api:'',
				upOption:{
					auto:false
				},
				downOption:{
				},
			}
		},
		onLoad(e){
			if(e.type==2){
				this.api='/api/log/draw_water'
				uni.setNavigationBarTitle({
					title:this.$t('流水返现')
				})
			}else if(e.type==1){
				this.api='/api/log/draw_back'
				uni.setNavigationBarTitle({
					title: this.$t("佣金结算"),
				})
			}
		},
		computed:{
			statusComput(){
				return function(val){
					switch(val){
						case '0':
						return val= this.$t("待审核");
						break;
						case '1':
						return val=this.$t("待转账");
						break;
						case '2':
						return val=this.$t("转账中");
						break;
						case '3':
						return val=this.$t("转账成功");
						break;
						case '4':
						return val=this.$t("转账失败");
						break;
						case '5':
						return val=this.$t("审核拒绝");
						break;
					}
				}
			}
		},
		methods: {
			upCallback(page) {
				this.getInfo(page.num)
			},
			downCallback(){
				this.getInfo(1)
			},
			getInfo(page){
				this.$api.post(this.api,{page:page},res=>{
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
		}
	}
</script>

<style lang="scss" scoped>
 page{
	 background-color: #020304;
 }
	.record{
		padding: 30rpx;
		color: #FFFFFF;
	}
	.record_item{
		background-color: #191819;
		padding: 30rpx;
		border-radius: 30rpx;
	}
</style>
