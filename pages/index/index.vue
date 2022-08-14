<template>
  <view class="content">
    <backTabbar></backTabbar>
    <view>
      <image
        style="width: 100vw; height: 85vw"
        src="@/static/img/test_banner.2a7ed1ab.png"
        mode="aspectFill"
      ></image>
      <view
        style="
          position: absolute;
          top: 12vh;
          right: 1.0667rem;
          font-family: bate2;
          font-weight: 900;
        "
      >
        <h5 class="title1">{{ $t("数字货币抽奖平台") }}</h5>
        <view class="title3">{{ $t("公平、安全、公开") }}</view>
      </view>

      <view class="img-list bottom-cell-group group-buying">
        <view
          class="flex-row-flex mid_padding"
          style="background: #0f0e0f; margin-top: 1.0667rem"
        >
          <image
            style="width: 50rpx; height: 50rpx; margin-right: 20rpx"
            src="@/static/img/icon1.png"
            mode="aspectFill"
          ></image>
          <view
            class="cell-item-hd group-title"
            style="color: #fff"
            v-html="$t('热门活动')"
          >
          </view>
        </view>
        <view
          class="swiper-grids"
          style="padding: 20rpx 16rpx; position: relative"
        >
         <!-- <u-swiper
            :list="swiperList"
			keyName='img'
            :autoplay="false"
            height="172rpx"
            bgColor="#000"
            @change="(e) => (current = e.current)"
            @click="handlerSwiper"
            imgMode="widthFix"
          >
            <view slot="indicator" class="indicator">
              <view
                class="indicator__dot"
                v-for="(item, index) in swiperList"
                :key="index"
                :class="[index === current && 'indicator__dot--active']"
              >
              </view>
            </view>
			<view class="">
				1
			</view>
          </u-swiper> -->
		  <u-scroll-list indicatorActiveColor='#fd8316'>
		          <view v-for="(item, index) in swiperList" :key="index" @click="srcollClick(index)">
		              <view class="sroll_back">
		              	 <view class="uni-h2">
		              	 	{{$t(item.title)}}
		              	 </view>
						 <view class="uni-h5">
						 	{{$t(item.content)}}
						 </view>
		              </view>
		          </view>
		      </u-scroll-list>
        </view>

        <view
          class="flex-row-flex mid_padding"
          style="background: #0f0e0f; margin-top: 2.1333rem"
        >
          <image
            style="width: 50rpx; height: 50rpx; margin-right: 20rpx"
            src="@/static/img/icon2.png"
            mode="aspectFill"
          ></image>
          <view
            class="cell-item-hd group-title"
            style="color: #fff"
            v-html="$t('区块链游戏')"
          >
          </view>
        </view>

        <view class="swiper-grids">
          <view
            class="game_menu_item"
            @click="navToUrl('/pages/game_rule/game_rule?current=1')"
          >
            <image
              class="game_menu_back"
              src="@/static/img/game1_big.a4c1334a.png"
              mode="aspectFit"
            ></image>
            <view class="game_text">
              <view>{{ $t("幸运哈希") }}</view>
              <view class="game_menu_sm">{{ $t("游戏赔率1") }}</view>
            </view>
          </view>
          <view class="game_menu2">
            <view
              class="game_menu_item2"
              @click="navToUrl('/pages/game_rule/game_rule?current=2')"
            >
              <image
                class="game_menu_back"
                src="@/static/img/game3_sm.90298d70.png"
                mode="aspectFit"
              ></image>
              <view class="game_text">
                <view>{{ $t("幸运数字") }}</view>
                <view class="game_menu_sm">{{ $t("游戏赔率3") }}</view>
              </view>
            </view>
            <view
              class="game_menu_item2"
              @click="navToUrl('/pages/game_rule/game_rule?current=3')"
            >
              <image
                class="game_menu_back"
                src="@/static/img/game2_sm.bb61548f.png"
                mode="aspectFit"
              ></image>
              <view class="game_text">
                <view>{{ $t("哈希牛牛") }}</view>
                <view class="game_menu_sm">{{ $t("游戏赔率2") }}</view>
              </view>
            </view>
            <view
              class="game_menu_item2"
              @click="navToUrl('/pages/game_rule/game_rule?current=4')"
            >
              <image
                class="game_menu_back"
                src="@/static/img/game4_sm.68237e83.png"
                mode="aspectFit"
              ></image>
              <view class="game_text">
                <view>{{ $t("幸运庄闲") }}</view>
                <view class="game_menu_sm">{{ $t("游戏赔率3") }}</view>
              </view>
            </view>
            <view
              class="game_menu_item2"
              @click="navToUrl('/pages/game_rule/game_rule?current=0')"
            >
              <image
                class="game_menu_back"
                src="@/static/img/game5.png"
                mode="aspectFit"
              ></image>
              <view class="game_text">
                <view>{{ $t("我要开池") }}</view>
                <view class="game_menu_sm">{{ $t("自己做庄") }}</view>
              </view>
            </view>
          </view>
        </view>

        <view class="rank">
          <view class="rank_label flex-row-between">
            <view class="label_left flex-row-flex">
              <image
                style="width: 50rpx; height: 50rpx; margin-right: 20rpx"
                src="@/static/img/list_label.png"
                mode="aspectFit"
              ></image>
              <view>{{ $t("个人池子排行") }}</view>
            </view>
            <view class="label_right" @click="navToUrl('/pages/rank/rank')">{{
              $t("查看更多")
            }}</view>
          </view>
          <view
            class="rank_item flex-row-between"
            v-for="(item, index) in rankList"
            :key="index"
            @click="goIn(item)"
          >
            <!-- <image class="item_img" :src="require('@/static/img/rank'+(index+1)+'.png')" mode="aspectFit" ></image> -->
            <view class="item_main">
              <view class="main_name">{{ item.name }}</view>
              <view class="main_num"
                >{{ $t("池子") }}：{{ Number(item.pool).toFixed(2) }}</view
              >
            </view>
            <view class="item_right">{{ $t("去参与") }}</view>
          </view>
        </view>

        <view>
          <view class="bg_cylc">
            <image
              class="cylc_span"
              src="@/static/img/bg_cylc_span.png"
              mode="aspectFit"
            ></image>
            <view style="color: rgb(255, 255, 255); font-size: 46rpx">{{
              $t("参与流程")
            }}</view>
            <image
              class="cylc_span"
              src="@/static/img/bg_cylc_span.png"
              mode="aspectFit"
            ></image>
          </view>
          <view class="info">
            <view
              :class="active == 0 ? 'active' : ''"
              @click="active = 0"
              style="flex: 1"
            >
              <view class="circle">1</view>
              <view style="text-align: center">{{ $t("注册钱包") }}</view>
            </view>
            <view
              :class="active == 1 ? 'active' : ''"
              @click="active = 1"
              style="flex: 1"
            >
              <view class="circle">2</view>
              <view style="text-align: center">{{ $t("购买虚拟币") }}</view>
            </view>
            <view
              :class="active == 2 ? 'active' : ''"
              @click="active = 2"
              style="flex: 1"
            >
              <view class="circle">3</view>
              <view style="text-align: center">{{ $t("转账抽奖") }}</view>
            </view>
            <view
              :class="active == 3 ? 'active' : ''"
              @click="active = 3"
              style="flex: 1"
            >
              <view class="circle">4</view>
              <view style="text-align: center">{{ $t("中奖回款") }}</view>
            </view>
          </view>

          <view class="list">
            <view class="list_title">{{ titleSwitch(active) }}</view>

            <view class="list_card">
              <view class="list_label">
                <block v-if="active == 0 || active == 1">
                  <view class="label_item">{{ $t("平台") }}</view>
                  <view class="label_item">{{ $t("网址") }}</view>
                  <view class="label_item">{{ $t("教程") }}</view>
                </block>
                <block v-if="active == 2">
                  <view class="label_item2">{{
                    $t("向下方地址按规定金额转账后即成功参与抽奖")
                  }}</view>
                </block>
                <block v-if="active == 3">
                  <view class="label_item2">{{
                    $t("中奖后系统10秒内自动反奖")
                  }}</view>
                </block>
              </view>
              <block v-if="active == 0 || active == 1">
                <view
                  class="list_item"
                  v-for="(item, index) in active == 0 ? list : list2"
                  :key="index"
                >
                  <view class="img_view">
                    <image
                      class="item_img"
                      :src="item.img"
                      mode="aspectFit"
                    ></image>
                  </view>
                  <view class="item_name">{{ item.name }}</view>
                  <view class="item_a">{{ $t("查看教程") }}</view>
                </view>
              </block>
              <block v-if="active == 2">
                <view class="card_main">
                  <u-tabs
                    :activeStyle="activeStyle"
                    :inactiveStyle="inactiveStyle"
                    :list="tabsList"
                    lineWidth="60"
                    :scrollable="false"
                    lineHeight="7"
                    lineColor="#FFF"
                    @click="handlerTabs"
                  ></u-tabs>

                  <view class="addr">
                    <view
                      style="text-align: center; color: #fff; font-size: 26rpx"
                      >{{ $t("官方投注地址") }}</view
                    >
                    <view>
                      <view
                        readonly=""
                        id="infoSwitch_tab"
                        style="text-align: center; color: #fc7712; resize: none"
                      >
                        {{ gameAddress.substr(0,8)+"*****"+gameAddress.substr(gameAddress.length-8,gameAddress.length) }}
                      </view>
                    </view>
                  </view>
                  <view
                    class="copy_btn"
                    style="margin: auto"
                    @click="copyClick(gameAddress)"
                    >{{ $t("点击复制") }}</view
                  >
                </view>
              </block>
              <block v-if="active == 3">
                <view class="card_main">
                  <image
                    class="card_img"
                    src="@/static/img/icon_ct.png"
                    mode="aspectFit"
                  ></image>
                </view>
              </block>
            </view>
          </view>
        </view>

        <view>
          <view class="bg_cylc bg_FAQS">
            <image
              class="cylc_span"
              src="@/static/img/bg_cylc_span.png"
              mode="aspectFit"
            ></image>
            <view style="color: rgb(255, 255, 255); font-size: 46rpx">{{
              $t("常见问题")
            }}</view>
            <image
              class="cylc_span"
              src="@/static/img/bg_cylc_span.png"
              mode="aspectFit"
            ></image>
          </view>
          <view class="question_list">
            <view
              class="question_item"
              v-for="(item, index) in questionList"
              :key="index"
            >
              <view class="question_title">{{ $t(item.title) }}</view>
              <view class="question_cont">{{ $t(item.cont) }}</view>
            </view>
          </view>
        </view>

        <view>
          <view class="bg_cylc bg_ARTNEWR">
            <image
              class="cylc_span"
              src="@/static/img/bg_cylc_span.png"
              mode="aspectFit"
            ></image>
            <view style="color: rgb(255, 255, 255); font-size: 46rpx">{{
              $t("合作伙伴")
            }}</view>
            <image
              class="cylc_span"
              src="@/static/img/bg_cylc_span.png"
              mode="aspectFit"
            ></image>
          </view>
          <view class="item_ct">
            <view class="row">
              <image
                class="row_img"
                style="opacity: 1"
                src="@/static/img/row1.png"
                mode="aspectFit"
              ></image>
              <image
                class="row_img"
                style="opacity: 1"
                src="@/static/img/row2.png"
                mode="aspectFit"
              ></image>
              <image
                class="row_img"
                style="opacity: 1"
                src="@/static/img/row3.png"
                mode="aspectFit"
              ></image>
            </view>
            <view class="row">
              <image
                class="row_img"
                style="opacity: 1"
                src="@/static/img/row4.png"
                mode="aspectFit"
              ></image>
              <image
                class="row_img"
                style="opacity: 1"
                src="@/static/img/row5.png"
                mode="aspectFit"
              ></image>
            </view>
            <view class="row">
              <image
                class="row_img"
                style="opacity: 1"
                src="@/static/img/row6.png"
                mode="aspectFit"
              ></image>
            </view>
          </view>
          <view
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              position: absolute;
              width: 100%;
              opacity: 1;
            "
            class="animate__animated animate__fadeInLeft"
            data-ani="animate__fadeInLeft"
            data-delay="100"
          >
            <view style="height: 2vh"></view>
            <view
              style="
                width: 0.16rem;
                height: 10vh;
                background: linear-gradient(0deg, #facc22 0%, #f83600 100%);
              "
            ></view>
            <view class="title">
              <view style="height: 5vh"></view>
              <view style="color: #fff; font-weight: bold">AS SEEN IN</view>
            </view>
            <view style="height: 5vh"></view>
          </view>
          <view style="background-color: #020304; padding: 400rpx 0 100rpx">
            <image
              style="width: 100vw; height: 35vw"
              src="@/static/img/advertisers.9ecad796.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>

        <view>
          <view class="bg_cylc bg_ARTNEWR">
            <image
              class="cylc_span"
              src="@/static/img/bg_cylc_span.png"
              mode="aspectFit"
            ></image>
            <view style="color: rgb(255, 255, 255); font-size: 46rpx">{{
              $t("联系我们")
            }}</view>
            <image
              class="cylc_span"
              src="@/static/img/bg_cylc_span.png"
              mode="aspectFit"
            ></image>
          </view>
          <view class="contact">
            <view class="contact_title">{{ $t("联系专属客服") }}</view>
            <view class="contact_list flex-row-center">
              <view class="contact_item" v-for="(item,index) in customerList" :key="index" @click="handlerGoCustomer">
                <image
                  class="item_image"
                  :src="item.icon"
                  mode="aspectFill"
                ></image>
                <view class="item_label">{{ $t(item.name) }}</view>
              </view>
              <!-- <view class="contact_item">
                <image
                  class="item_image"
                  src="@/static/img/telegram.png"
                  mode="aspectFill"
                ></image>
                <view class="item_label">telegram</view>
              </view>
              <view class="contact_item">
                <image
                  class="item_image"
                  src="@/static/img/WhatsApp.png"
                  mode="aspectFill"
                ></image>
                <view class="item_label">WhatsApp</view>
              </view> -->
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import backTabbar from "@/components/backTabbar";
export default {
  components: {
    backTabbar,
  },
  data() {
    return {
      list: [
        {
          img: require("@/static/img/token.im.png"),
          name: "token.im",
          url: "",
        },
        {
          img: require("@/static/img/trustwallet.com.png"),
          name: "trustwallet.com",
          url: "",
        },
        {
          img: require("@/static/img/ownbit.io.png"),
          name: "ownbit.io",
          url: "",
        },
        {
          img: require("@/static/img/trolink.org.png"),
          name: "trolink.org",
          url: "",
        },
        {
          img: require("@/static/img/bitpie.com.png"),
          name: "bitpie.com",
          url: "",
        },
        {
          img: require("@/static/img/tokenpocket.pro.png"),
          name: "tokenpocket.pro",
          url: "",
        },
      ],
      list2: [
        {
          img: require("@/static/img/gate.io.png"),
          name: "gate.io",
          url: "",
        },
        {
          img: require("@/static/img/binance.com.png"),
          name: "binance.com",
          url: "",
        },
        {
          img: require("@/static/img/huobi.com.png"),
          name: "huobi.com",
          url: "",
        },
        {
          img: require("@/static/img/okex.com.png"),
          name: "okex.com",
          url: "",
        },
      ],
      tabsList: [
        {
          name: this.$t("幸运哈希"),
          type: 2,
        },
        {
          name: this.$t("幸运数字"),
          type: 3,
        },
        {
          name: this.$t("哈希牛牛"),
          type: 4,
        },
        {
          name: this.$t("幸运庄闲"),
          type: 5,
        },
      ],
      active: 0,
      activeStyle: { color: "#fff", fontSize: "30rpx" },
      inactiveStyle: { color: "#fff", fontSize: "26rpx" },
      questionList: [
        {
          title: "Q1：什么是区块哈希值(Block hash)？",
          cont: 
            "区块哈希值是一段数据的DNA，每个区块哈希值都是唯一的、随机的且不可破解的。"
          ,
        },
        {
          title: "Q2：什么是区块链？",
          cont: 
            "区块链从本质上讲，它是一个共享数据库，存储于其中的数据或信息。具有不可伪造、全程留痕、可以追溯、公开透明、集体维护等特征。"
          ,
        },
        {
          title: 
            "Q3：中心化钱包？去中心化钱包？为什么中心化钱包无法查询转账？"
          ,
          cont: 
            "举一个例子：您自己的钱包地址是A，您给地址E转入10个USDT，但您用交易哈希值去查询，只能查询到服务商随机某个账本地址B（或C或D等等）与E的转账。 同理E也无法得知这10个USDT是否是您转出的，因为E只能看见是账本地址B给他转入10个USDT。这就是为什么中心化钱包无法在区块链上查询真实转账信息。"
          ,
        },
        {
          title: "Q4：为什么我会连续中奖或不中奖？",
          cont: 
            "首先连续多次不中奖的是小概率事件（小概率事件定义），其次中奖与不中奖是随机事件，随机事件的发生的频率会趋于一个稳定值。 在非迭代的情况下，事物出现的概率对每个人来讲是相等的，这个情况下，每个人都是公平的。 同时随机事件会遵大数定律（在试验不变的条件下，重复试验多次，随机事件的频率近似于它的概率大数定律定义），在转账频次不断增加的情况下，中奖与不中奖的概率会趋于一个稳定值。 所以请您继续转账，随着转账频次增加则中奖总概率会提升。"
          ,
        },
        {
          title: "Q5：为什么会延迟到帐？",
          cont: 
            "全球有许多知名公链（点击查看全球知名公链）都支持进行USDT转账，而我们平台是基于波场TRC20技术。 所以我们平台的转账地址是属于USDT-TRC20， 您应该选择USDT-TRC20； 如果您选择了其他类型，幸运哈希则无法收到您的USDT，这会造成您和幸运哈希双方的损失。"
          ,
        },
      ],

      rankList: [],
      currentType: 2,
      gameAddress: "",
      swiperList: [
		 {img:require("@/static/img/hot_menu_bg.ac3a0d31.png"),title:'开池做庄',content:'邀朋友一起玩'},
        {img:require("@/static/img/hot_menu_bg.ac3a0d31.png"),title:'联系客服',content:'享新手体验大礼包'}
       
      ],
      current: 0,
      customerList:[]
    };
  },
  onLoad(e) {
    this.getPools();
    this.getCutomerInfo()
  },
  methods: {
    getCutomerInfo(){
				this.$api.post("/api/common/customer_service",{},res=>{
					if(res.code==1){
						this.customerList=res.data
					}
				})
			},
    goIn(item) {
      uni.navigateTo({
        url: `/pages/game_rule/game_rule?current=0&type=0&uid=${item.uid}`,
      });
    },
    handlerGoCustomer(){
       uni.navigateTo({
        url: "/pages/customer/customer",
      });
    },
	srcollClick(index){
		let url=index==1?'/pages/customer/customer':'/pages/game_rule/game_rule?current=0'
		uni.navigateTo({
			url:url
		})
	},
    titleSwitch(active) {
      let title = "";
      switch (active) {
        case 0:
          title = this.$t("数字币 【去中心化】钱包下载地址");
          break;
        case 1:
          title = this.$t("数字货币交易所中购买TRX");
          break;
        case 2:
          title = this.$t("向本平台转账参与抽奖");
          break;
        case 3:
          title = this.$t("中奖自动回款");
          break;

        default:
          break;
      }
      return title;
    },
    copyClick(cont) {
      uni.setClipboardData({
        data: cont,
        success: function () {
          uni.showToast({
            title: this.$t("复制成功"),
            duration: 2000,
          });
        },
        fail: function (err) {
          uni.showToast({
            title: this.$t("复制失败"),
            duration: 2000,
            icon: "none",
          });
        },
      });
    },
    navToUrl(url) {
      this.$common.navigateTo(url);
    },

    getPools() {
      this.$api.post("/api/game_pool/pools", {}, (res) => {
        let arr = Array.from(res.data);
        this.rankList = arr.slice(0, 3);
        this.gameAddress = arr[0].info[1].address;
      });
    },
    handlerTabs(e) {
      this.currentType = e.type;
    },
    handlerSwiper(index) {
      if (index) {
        this.navToUrl("/pages/customer/customer");
      } else {
        this.navToUrl("/pages/promote/promote");
      }
    },
  },
  watch: {
    currentType: {
      handler(value) {
        this.gameAddress = this.rankList[0].info[value - 1].address;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #000;
  .title1 {
    width: 240rpx;
    font-size: 55rpx;
    text-align: center;
    color: #fff;
    margin: 10rpx auto;
  }
  .title3 {
    color: #dadada;
    text-align: center;
    margin: 10rpx auto;
    font-size: 35rpx;
  }
	.sroll_back{
		width: 348px;
		height: 78px;
		background: no-repeat center/100% url("@/static/img/hot_menu_bg.ac3a0d31.png");
		color: #FFFFFF;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}
  .rank {
    color: #fff;
    padding: 30rpx;
    .rank_label {
      font-weight: bold;
      padding: 40rpx 0;
      .label_left {
      }

      .label_right {
      }
    }

    .rank_item {
      height: 200rpx;
      margin: 20rpx 0;
      padding: 0 0.5333rem;
      .item_img {
        width: 120rpx;
        height: 120rpx;
        margin-right: 20rpx;
        margin-left: 10rpx;
      }
      .item_main {
        flex: 1;
        .main_name {
          font-size: 36rpx;
          font-weight: bold;
        }
        .main_num {
          margin-top: 20rpx;
          border-radius: 80rpx;
          padding: 4rpx 64rpx 4rpx 24rpx;
          width: 6.9333rem;
        }
      }
      .item_right {
        margin-right: 40rpx;
        font-size: 36rpx;
        font-weight: bold;
      }
    }
    .rank_item:nth-child(2) {
      background: url(@/static/img/rank1_bg.png);
      background-size: 100% 100%;
      .item_main {
        .main_name {
          text-shadow: 0rem 2rpx 2rpx #944e11;
          -webkit-text-stroke: 1rpx #944e11;
        }
        .main_num {
          background: #944e11;
        }
      }
      .item_right {
        text-shadow: 0rem 2rpx 2rpx #944e11;
        -webkit-text-stroke: 1rpx #944e11;
      }
    }
    .rank_item:nth-child(3) {
      background: url(@/static/img/rank2_bg.png);
      background-size: 100% 100%;
      .item_main {
        .main_name {
          text-shadow: 0rem 2rpx 2rpx #8c8c8c;
          -webkit-text-stroke: 1rpx #8c8c8c;
        }
        .main_num {
          background: #8c8c8c;
        }
      }
      .item_right {
        text-shadow: 0rem 2rpx 2rpx #8c8c8c;
        -webkit-text-stroke: 1rpx #8c8c8c;
      }
    }
    .rank_item:nth-child(4) {
      background: url(@/static/img/rank3_bg.png);
      background-size: 100% 100%;
      .item_main {
        .main_name {
          text-shadow: 0rem 2rpx 2rpx #f46c0a;
          -webkit-text-stroke: 1rpx #f46c0a;
        }
        .main_num {
          background: #f46c0a;
        }
      }
      .item_right {
        text-shadow: 0rem 2rpx 2rpx #f46c0a;
        -webkit-text-stroke: 1rpx #f46c0a;
      }
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 40rpx 40rpx;
    font-weight: 900;
    color: #fff;
    .circle {
      width: 100rpx;
      height: 100rpx;
      background: url(@/static/img/circle_none.png);
      background-size: 100% 100%;

      margin: 10rpx auto;
      line-height: 100rpx;
      text-align: center;
      font-size: 45rpx;
    }
    .active {
      color: #fc7712;
      .circle {
        color: #fff;
        width: 100rpx;
        height: 100rpx;
        background: url(@/static/img/circle.png);
        background-size: 100% 100%;

        margin: 10rpx auto;
        line-height: 100rpx;
        text-align: center;
        font-size: 45rpx;
      }
    }
    // .circle_active{
    // 	background: url(@/static/img/circle.png);
    // 	width: 100rpx;
    // 	height: 100rpx;
    // 	background-size: 100% 100%;
    // }
  }
  .bg_cylc {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(@/static/img/OADMA.png) no-repeat;
    background-size: 100% 100%;
    height: 10vh;
    font-weight: 900;
    margin: 100rpx 0;
    .cylc_span {
      width: 10rpx;
      height: 10rpx;
      margin: 20rpx;
    }
  }
  .bg_FAQS {
    background: url(@/static/img/FAQS.png) no-repeat;
    background-size: 100% 100%;
  }
  .bg_ARTNEWR {
    background: url(@/static/img/ARTNEWR.png) no-repeat;
    background-size: 100% 100%;
  }
  .game_menu_item {
    position: relative;
    .game_menu_back {
      width: calc(100vw - 40rpx);
      height: 40vw;
      margin: 20rpx;
    }
    .game_text {
      z-index: 1;
      position: absolute;

      top: 90rpx;
      left: 70rpx;
      font-size: 60rpx;

      font-family: PingFang SC;
      font-weight: 700;
      font-style: italic;
      color: #fff;
    }
    .game_menu_sm {
      font-size: 35rpx;
    }
  }
  .game_menu2 {
    display: grid;
    width: 100vw;
    grid-row-gap: 20rpx;
    grid-template-columns: 50vw 50vw;
    grid-template-rows: 20vw 20vw;
    justify-items: center;
    // margin:20rpx;
    .game_menu_item2 {
      position: relative;
      // margin:20rpx;
      .game_menu_back {
        width: calc(50vw - 40rpx);
        height: 20vw;
      }

      .game_text {
        z-index: 1;
        position: absolute;

        top: 30rpx;
        left: 30rpx;
        font-size: 35rpx;

        font-family: PingFang SC;
        font-weight: 700;
        font-style: italic;
        color: #fff;

        .game_menu_sm {
          font-size: 26rpx;
        }
      }
    }
  }
  .swiper-list {
    white-space: normal !important;
    /deep/ .uni-scroll-view-content {
      display: flex;
    }
  }
  .img-list,
  .img-grids {
    background-color: #0f0e0f;
  }
  .group-buying .group-title {
    font-size: 40rpx;
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list {
    .list_title {
      color: #fff;
      font-size: 32rpx;
      margin: 80rpx;
      text-align: center;
    }
    .list_card {
      padding: 0 36rpx;
      .list_label {
        display: flex;
        height: 80rpx;
        align-items: center;
        justify-content: start;
        padding: 0 20rpx;
        text-transform: uppercase;

        color: #dadada;
        font-size: 26rpx;
        font-weight: 700;
        background: url(@/static/img/bg1.png);
        background-size: 100% 100%;
        .label_item {
          text-align: center;
          color: #dadada;
          width: 30%;
        }
        .label_item:nth-child(2) {
          width: 40%;
        }
        .label_item2 {
          text-align: center;
          color: #dadada;
          width: 100%;
        }
      }

      .list_item {
        background: url(@/static/img/bg2.png);
        background-size: 100% 100%;

        color: #dadada;
        font-size: 26rpx;
        border-bottom: 2rpx solid #dadada;
        // margin: 0 20rpx;
        height: 160rpx;

        display: flex;
        justify-content: start;
        padding: 0 20rpx;
        text-transform: uppercase;
        align-items: center;
        .img_view {
          width: 30%;
          text-align: center;
          .item_img {
            max-width: 140rpx;
            max-height: 40rpx;
          }
        }
        .item_name {
          width: 40%;
          text-align: center;
          color: #dadada;
          font-weight: 900;
        }
        .item_a {
          text-align: center;
          width: 30%;
          color: #fff;
          text-decoration: underline;
        }
      }

      .card_main {
        background: url(@/static/img/bg2.png);
        background-size: 100% 100%;
        height: 500rpx;
        padding-top: 140rpx;
        text-align: center;
        .addr {
          padding: 40rpx 0;
        }
        .copy_btn {
          width: 330rpx;
          height: 100rpx;
          color: #fff;
          background: url(@/static/img/btn.png);
          background-size: 100% 100%;
          border-radius: 50rpx;
          font-size: 28rpx;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 0 14rpx;
          line-height: 0.9;
          text-align: center;
        }
        .card_img {
          width: 40vw;
          height: 40vw;
          margin: 0 auto;
        }
      }
    }
  }

  .question_list {
    // padding: 0 36rpx;
    color: #fff;
    .question_item {
      background-color: #1a1a1a;
      padding: 26rpx 26rpx 52rpx;
      margin: 0 36rpx 26rpx;
      border-radius: 20rpx;
      .question_title {
        font-size: 28rpx;
        color: #dadada;
        margin-bottom: 26rpx;
        line-height: 38rpx;
      }

      .question_cont {
        font-size: 28rpx;
        color: #dadada;
        margin-bottom: 26rpx;
        line-height: 40rpx;
      }
    }
  }

  .item_ct {
    position: relative;
    height: 500rpx;
    .row {
      position: absolute;
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      .row_img {
        width: 230rpx;
        height: 230rpx;
        margin-right: 10rpx;
      }
    }
    .row:nth-child(1) {
      top: 0;
    }
    .row:nth-child(2) {
      top: 125rpx;
    }
    .row:nth-child(3) {
      top: 250rpx;
    }
  }

  .contact {
    .contact_title {
      text-align: center;
      opacity: 1;
      margin: 40rpx 0;
      color: #fff;
      font-size: 28rpx;
    }
    .contact_list {
      padding-bottom: 80rpx;
      .contact_item {
        padding: 36rpx 40rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex:1;
        height: 200rpx;
        .item_image {
          width: 120rpx;
          height: 120rpx;
        }
        .item_label {
          // margin: 6px 0;
          font-weight: 900;
          color: #646566;
          font-size: 26rpx;
          text-align: center;
          line-height: 2.5;
          word-break: break-all;
        }
      }
    }
  }
}
.indicator {
  position: relative;
  @include flex(row);
  justify-content: center;

  &__dot {
    height: 6px;
    width: 6px;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.35);
    margin: 0 5px;
    transition: background-color 0.3s;

    &--active {
      background-color: #ffffff;
    }
  }
}

.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;

  &__text {
    color: #ffffff;
    font-size: 12px;
  }
}
</style>
