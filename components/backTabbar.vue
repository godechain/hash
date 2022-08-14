<template>
	<view class="tabbar">
		<view class="tabbar_fixed flex-row-between">
			<image class="icon_logo" src="@/static/logo.png" mode="aspectFit" ></image>
			<view >
				<view class="flex-row-between">
					<u-button :text="walletName?walletName:$t('链接钱包')" color="#FF9C39" class="money_button" @click="exchange(true)"></u-button>
					<image v-if="!moreShow" class="more_logo" src="@/static/img/more.png" mode="aspectFit"  @click="moreShow = !moreShow"></image>
					<image v-if="moreShow" class="close_logo" src="@/static/img/close.png" mode="aspectFit"  @click="moreShow = !moreShow"></image>
				</view>
			</view>
		</view>
		<view class="more_list" v-if="moreShow" >
			<view class="list_item" @click="navToUrl('/pages/index/index')">{{$t("主页")}}</view>
			<!-- <view class="list_item">优惠</view> -->
			<view class="list_item"  @click="navToUrl('/pages/promote/promote')">{{$t("推广")}}</view>
			<view class="list_item"  @click="navToUrl('/pages/rebate/rebate')">{{$t("返水")}}</view>
			<view class="list_item" @click="navToUrl('/pages/my/my')">{{$t("我的")}}</view>
			<!-- <view class="list_item">游戏教程</view> -->
			<view class="list_item list_icon" @click="langShow=true">
				{{langText}}
				<u-icon name="arrow-down-fill" color="#f1d6a3" size="20" style='margin-left: 40rpx;position: absolute;top:52rpx;right: 266rpx;'></u-icon>
			</view>
			<u-picker keyName="label" :show="langShow" :columns="langColumns" :closeOnClickOverlay='true' @confirm='langConfirm' @close='langShow=false' @cancel='langShow=false'></u-picker>
		</view>
	</view>
</template>

<script>
	import Web3 from 'web3';
	export default {
		name:"backTabbar",
		props:{
			backText:String
		}, 
		data() {
			return {
				moreShow:false,
				hashAddress:'',
				addshow:'',
				walletName:'',
				code:'',
				langShow:false,
				langColumns:[ [{
                        label: '中文简体',
                        lang: "zh-CN"
                    }, {
                        label: 'English',
                        lang: "en-US"
                    },
					{
						label:"日本",
						lang:"ja-JP"
					},
					{
						label:"한국인",
						lang:"ko-KR"
					},
					{
						label:"ไทย",
						lang:"th-TH"
					},
					{
						label:'Tiếng Việt',
						lang:'vi-VN'
					},
					{
						label:'Русский',
						lang:'rs-RH'
					},
					{
						label:'español',
						lang:'xb-Xh'
					},
					{
						label:'عربي',
						lang:'ab-AN'
					},
					]],
				langText:"",
				locale: this.$i18n.locale
			};
		},
		mounted() {
			if(this.$route.query.code)this.code=this.$route.query.code
			this.exchange()
			let locale=uni.getStorageSync('locale')
			console.log(locale);
			switch (locale){
			    case 'zh-CN': this.langText = '中文简体'
			        break;
			    case 'en-US': this.langText = 'English'
			        break;
				case 'ja-JP': this.langText = '日本'
				    break;	
				case 'ko-KR': this.langText = '한국인'
				    break;
				case 'th-TH': this.langText = 'ไทย'
				    break;	
				case 'vi-VN': this.langText = 'Tiếng Việt'
				    break;
				case 'rs-RH': this.langText = 'Русский'
				    break;
				case 'xb-Xh': this.langText = 'español'
				    break;
				case 'ab-AN': this.langText = 'عربي'
				    break;		
				}
		},
		onLoad(e) {
			
		},
		watch: {
			locale(val) {
			this.$i18n.locale = val;
			uni.setStorageSync('locale', val)
			}
		},
		methods:{
			langConfirm(e){
				console.log('e',e);
				this.langShow=false
				this.langDetails=e
				this.langText=e.value[0].label
				this.locale=e.value[0].lang
			},
			navToUrl(url){
				this.moreShow=false
				this.$common.navigateTo(url)
			},
			goback(){
				uni.navigateBack()
			},
			async exchange(isClick){
				 if(!this.walletName){
					 if (window.ethereum) {
						window.web3 = new Web3(ethereum);
						try {
							await ethereum.enable();
						  } catch (err) {
							$("#status").html("User denied account access", err);
						}
					} else if (window.web3) {
					  return (window.web3 = new Web3(web3.currentProvider));					  
					} else {
					  return $("#status").html("No Metamask (or other Web3 Provider) installed");
					}
					this.hashAddress =  ethereum.selectedAddress;
					uni.setStorageSync('hashAddress',this.hashAddress)
					let addshow = this.hashAddress.substr(0,4)+'****'+this.hashAddress.substr(this.hashAddress.length-4,this.hashAddress.length)
					this.walletName=addshow
					let sumAddress=web3.utils.toChecksumAddress(this.hashAddress);
					this.$api.post("/api/user/wallet_login",{address:sumAddress,code:this.code},res=>{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						if(res.code==1){
							uni.setStorageSync('hashToken',res.data.userinfo.token)
							uni.setStorageSync('userinfo',res.data.userinfo)

						}
					})
				 }else{
					let aux = document.createElement("input");
					aux.setAttribute("value", this.hashAddress);
					document.body.appendChild(aux);
					aux.select();
					document.execCommand("copy");
					document.body.removeChild(aux);
					uni.showToast({
						title:this.$t('复制成功'),
						icon:'none'
				})
				 }
				},
		}
	}
</script>

<style lang="scss" scoped>
	.back_iamge{
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
		margin-left: 30rpx;
	}
	.icon_logo{
		height: 80rpx;
		width: 200rpx;
	}
	.money_button{
		height: 60rpx;
	}
	.more_logo{
		height: 40rpx;
		width: 100rpx;
	}
	.close_logo{
		height: 60rpx;
		width: 100rpx;
	}
	.flex-row-between{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.flex-row-flex {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.tabbar{
		.tabbar_fixed{
			background: linear-gradient(180deg,#0b0b0b 34.81%,hsla(0,0%,4%,.65) 71.87%,hsla(0,0%,4%,0));
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			// height: 88rpx;
			// padding-top: 88rpx;
			padding-top: 40rpx;
			padding-bottom: 20rpx;
			font-size: 40rpx;
			font-weight: bold;
            .backText{
                font-size: 40rpx;
			    font-weight: bold;
            }
		}
	}
	.more_list{
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		height:100vh;
		width: 100vw;
		z-index: 10;
		padding-top:100rpx;
		.list_item{
			font-size: 36rpx;
			letter-spacing:4rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #fff;
			padding: 30rpx;
		}
		.list_icon{
			position: relative;
		}
	}
</style>
