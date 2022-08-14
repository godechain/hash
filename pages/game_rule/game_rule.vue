<template>
  <view class="content">
    <u-tabs
      @click="tabClick"
      :current="current"
      class="tabs"
      :activeStyle="activeStyle"
      :inactiveStyle="inactiveStyle"
      :list="tabsList"
      lineWidth="60"
      :scrollable="false"
      lineHeight="7"
      lineColor="#FFF"
    ></u-tabs>
    <!-- {{gameInfo.map4}} -->
    <view class="video_View" v-if="current != 0">
      <video
        id="myVideo"
        :src="gameInfo.map4"
        :poster="gameInfo.map4img"
        controls
      ></video>
    </view>

    <view class="rule_main">
      <view class="rule_title">{{
        current == 0 ? `${$t("开池规则")}` : `${$t("中奖规则")}`
      }}</view>
      <view class="rule_list" v-if="current != 0">
        <view class="list_title flex-row-flex" v-if="current != 4">
          <image
            class="title_icon"
            src="@/static/img/bg_cylc_span.png"
            mode="aspectFit"
          ></image>
          <view style="color: rgb(255, 255, 255); font-size: 38rpx"
            >{{$t("游戏规则")}}</view
          >
        </view>

        <view
          class="rule_item flex-row-flex"
          style="align-items: flex-start"
          v-for="(item, index) in nowRuleList"
          :key="index"
        >
          <image
            class="item_icon"
            src="@/static/img/bg_cylc_span2.png"
            mode="aspectFit"
          ></image>
          <view v-html="item"></view>
        </view>
      </view>
      <view class="rule_list" v-if="current == 0">
        <view class="list_title flex-row-flex" v-if="current != 4">
          <image
            class="title_icon"
            src="@/static/img/bg_cylc_span.png"
            mode="aspectFit"
          ></image>
          <view style="color: rgb(255, 255, 255); font-size: 38rpx"
            >{{$t('开池规则')}}</view
          >
        </view>

        <view
          class="rule_item flex-row-flex"
          style="align-items: flex-start"
          v-for="(item, index) in nowRuleList"
          :key="index"
        >
          <image
            class="item_icon"
            src="@/static/img/bg_cylc_span2.png"
            mode="aspectFit"
          ></image>
          <view v-html="item"></view>
        </view>
      </view>

      <view class="rule_list" v-if="current != 0">
        <view class="list_title flex-row-flex">
          <image
            class="title_icon"
            src="@/static/img/bg_cylc_span.png"
            mode="aspectFit"
          ></image>
          <view style="color: rgb(255, 255, 255); font-size: 38rpx"
            >{{$t("中奖实列")}}</view
          >
        </view>
        <view class="list_item" v-for="(item, index) in winList[current]">
          <view class="item_title">{{ item.title }}</view>
          <view class="item_cont" v-html="$t(item.cont)">
          </view>
        </view>
      </view>
    </view>

    <view style="width: 100vw; height: 600rpx"></view>
    <view class="bottom_content">
      <!-- <view class="addr">
				<view style="text-align: center;color:#fff;font-size:26rpx">{{current == 4?'官方开池地址':'官方投注地址'}}</view>
				<view>
					<view readonly="" id="infoSwitch_tab" style="text-align: center; color: #fc7712; resize: none;">
						{{webAddshow}}
					</view>
				</view>
			</view>
			<view class="bottom_btn" style="margin: auto;" @click="copyClick(webAddress)">一键复制</view> -->

      <view class="bottom_item">
        <view class="bottom_label">{{$t("投注地址")}}</view>
        <view class="bottom_input flex-row-between">
          <view class="input_main">{{ webAddshow }}</view>
          <image
            class="input_icon"
            src="@/static/img/copy.png"
            mode="aspectFit"
            @click="copyClick(webAddress)"
          ></image>
        </view>
      </view>
      <view class="bottom_item">
        <view class="bottom_label">{{$t("投注金额")}}</view>
        <view class="bottom_input flex-row-between">
          <u-input
            class="input_main"
            :placeholder="$t('请输入您的投注金额')"
            border="surround"
            v-model="amount"
          ></u-input>
        </view>
      </view>

      <view class="bottom_btn" style="margin: auto" @click="pay">{{$t("确认投注")}}</view>
    </view>
  </view>
</template>

<script>
import Web3 from "web3";
export default {
  data() {
    return {
      tabsList: [],
      current: 0,
      activeStyle: { color: "#fff", fontSize: "26rpx" },
      inactiveStyle: { color: "#fff", fontSize: "26rpx" },
      gamesList: [],
      gameInfo: {},
      poolName: {},
      uid: "0",
      webAddress: "",
      webAddshow: "",
      ruleList0: [
        this.$t('充值任意金额，可开启专属游戏池，自己坐庄。'),
        this.$t("重复向开池地址充值，可扩充池子资金和容量。"),
        this.$t("池子资金，等于用户充值金额，与玩家对局失败将扣除对应池子资金，资金小于等于0时，池子将被关闭。"),
        this.$t("池子容量，等于用户充值金额*10，与玩家对局胜利将增加对应池子资金，资金大于池子容量时，将结算池子收益同时关闭池子"),
        this.$t("结算池子收益后，所得收益并不会直接结算到用户钱包，具体所得收益请与管理员联系。"),
      ],
      ruleList1: [
        this.$t('向游戏地址投注资金10-50000USDT', {min: 100, max: 10000}),
        // this.$t('向游戏地址投注资金10-50000TRX', {min: 20, max:20000  }),
        this.$t("获取您转账的Block Hash作为判定依据"),
        this.$t("Block Hash最后两位分别为数字和字母为赢"),
        this.$t("我们将及时返奖2.00倍USDT到您钱包"),
        this.$t("低于最低投注金额，视为无效金额，平台不给予返还"),
        this.$t("269"),
        this.$t("仅支持整数币参与抽奖，小数部分将自动忽略"),
      ],

      ruleList2: [
        this.$t('向游戏地址投注资金10-50000USDT', {min: 100, max: 10000}),
        // this.$t('向游戏地址投注资金10-50000TRX', {min: 20, max:30000  }),
        this.$t("获取您转账的Block Hash作为判定依据"),
        this.$t(`${this.$t('Block hash最后一位数字作为开奖结果')}<br/>${this.$t('0，1，2，3，4识别为小')}<br/>${this.$t('5，6，7，8，9识别为大')}<br/>${this.$t('1，3，5，7，9识别为单')}<br/>${this.$t('0，2，4，6，8识别为双')}`),
        this.$t(`${this.$t('根据押注的个位数来判定下注类型')}<br/>${this.$t('下注1000USDT个位数为0识别为押小')}<br/>${this.$t('下注1009USDT个位数为9识别为押大')}<br/>${this.$t('下注1001USDT个位数为1识别为押单')}<br/>${this.$t('下注1008USDT个位数为8识别为押双')}`),
        this.$t("赔率：2.00倍"),
        this.$t("个位数为其他数字，识别为无效押注，扣除千分之一手续费后原路退回"),
        this.$t("低于最低投注金额，视为无效金额，平台不给予返还"),
        this.$t("高于最高限额的投注。视为无效金额，平台抽取千一手续费，给予返还"),
        this.$t("仅支持整数币参与抽奖，小数部分将自动忽略"),
        this.$t("此游戏投注不返佣金"),
      ],
      ruleList3: [
        this.$t('向游戏地址投注资金10-50000USDT', {min: 100, max: 100000}),
        // this.$t('向游戏地址投注资金10-50000TRX', {min: 20, max:200000  }),
        this.$t("投注金额是转账金额的十分之一。"),
        this.$t("如押注10USDT，则需要转账100USDT。"),
        this.$t("转账后区块哈希值(Block hash)最后的5位作为牌面，如：（000***57aba）为牌面。"),
        this.$t("57aba字母为10，相加出得点个位数比较."),
        this.$t("庄家开奖号码：57a，5+7+10=22 牛二"),
        this.$t("闲家开奖号码是：aba，10+10+10=30 牛牛"),
        this.$t("1∽2点同点庄赢，其他同点扣千分之一手续费退还本金"),
        this.$t("低于最低投注金额，视为无效金额，平台不给予返还"),
        this.$t("高于最高限额的投注。视为无效金额，平台抽取千一手续费，给予返还"),
        this.$t("仅支持整数币参与抽奖，小数部分将自动忽略。"),
      ],
      ruleList4: [
        this.$t('向游戏地址投注资金10-50000USDT', {min: 100, max: 100000}),
        // this.$t('向游戏地址投注资金10-50000TRX', {min: 20, max:30000  }),
        this.$t("获取您转账的Block hash作为判定依据"),
        this.$t(`${this.$t('Block hash最后五位字符作为开奖结果')}<br/>${this.$t('例如Block hash为000*****a3B45')}<br/>${this.$t('0点最小')}<br/>${this.$t('9点最大')}<br/>${this.$t('字母识别为0')}<br/>${this.$t('a、3代表 庄的点数')}<br/>${this.$t('4、5代表 闲的点数')}`),
        this.$t(`${this.$t('根据押注的个位数来判定下注类型')}<br/>${this.$t('下注1001USDT个位数为1识别为押庄赢')}<br/>${this.$t('下注1002USDT个位数为2识别为押闲赢')}<br/>${this.$t('下注1003USDT个位数为3识别为押和赢')}`),
        this.$t(`${this.$t('赔率：2.00倍')}<br/>${this.$t('押注庄赢，比较点数后，庄赢则赔1.95倍')}<br/>${this.$t('押注闲赢，比较点数后，闲赢则赔1.95倍')}<br/>${this.$t('押注和赢，比较点数后，和赢则赔8倍')}`),
        this.$t("个位数为其他数字，识别为无效押注，扣除千分之一手续费后原路退回"),
        this.$t("押注庄或闲，开和，扣除千分之一手续费后原路返回"),
        this.$t("低于最低投注金额，视为无效金额，平台不给予返还"),
        this.$t("高于最高限额的投注。视为无效金额，平台抽取千一手续费，给予返还"),
        this.$t("仅支持整数币参与抽奖，小数部分将自动忽略"),
        this.$t("此游戏投注不返佣金"),
      ],

      nowRuleList: [],

      amount: "",
      hashAddress: "",
      winList: [
        [],
        [
          {
            title: this.$t("您的转账金额为")+"：1001",
            cont: `
								${this.$t('该笔转账的区块哈希为：000*****9e3a')}
                ${this.$t('区块哈希值最后两位3a为“数字+字母”组合')}
                ${this.$t('结果中奖系统汇款金额为')+'：1001*2.00=2002.00'}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：2800.03",
            cont: `								
                ${this.$t('该笔转账的区块哈希为')+'：000*****9ec4'}
                ${this.$t('区块哈希值最后两位3a为“数字+字母”组合')}
                ${this.$t('结果中奖系统汇款金额为')+'：2800 * 2.00 = 5600.00'}	
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：1051",
            cont: `
                ${this.$t('该笔转账的区块哈希为')+'：000*****9ead'}
								${this.$t('区块哈希值最后两位3a为“数字+字母”组合')}
								${this.$t('结果未中奖不返还数字币')}
								
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：2224.31",
            cont: `
                ${this.$t('该笔转账的区块哈希为')+'：000*****9e71'}
                ${this.$t('区块哈希值最后两位3a为“数字+字母”组合')}
                ${this.$t('结果未中奖不返还数字币')}
							`,
          },
        ],

        [
          {
            title: this.$t("您的转账金额为")+"：1000",
            cont: `
                ${this.$t('识别为押小')}
                ${this.$t('该笔转账的Block hash为：')+'000**1'}
                ${this.$t('Block hash最后一位数字为“1”识别为小')}
                ${this.$t('结果中奖系统回款金额为：')+'1000*1.95=1950'}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：2309",
            cont: `
                ${this.$t('识别为押大')}
                ${this.$t('该笔转账的Block hash为：')+'000*3a'}
                ${this.$t('Block hash最后一位数字为“3”识别为小')}
                ${this.$t('结果未中奖不返还数字币')}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：4213.23"+this.$t('572'),
            cont: `
             ${this.$t('个位数为其他数字，识别为无效投注')}
             ${this.$t('扣除千分之一手续费后原路退回')}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：151",
            cont: `
								${this.$t('识别为押单')}
								${this.$t('该笔转账的Block hash为：')+'000*7ba'}
								${this.$t('Block hash最后一位数字为“7”识别为单')}
								${this.$t('结果中奖系统回款金额为')+'151*1.95=294.45'}
							`,
          },
        ],

        [
          {
            title: this.$t("您的转账金额为")+"：1000",
            cont: `
                ${this.$t('该笔转账的区块哈希为')+'：000***57aba'}
                ${this.$t('庄家开奖号码：57a，5+7+10=22 牛二')}
                ${this.$t('闲家开奖号码是：aba，10+10+10=30 牛牛')}
                ${this.$t('结果中奖系统回款金额为')}
                ${this.$t('闲家投注100牛牛，赢10倍1000')}
                ${this.$t('闲赢抽百分5，盈1000抽50')}
                ${this.$t('连本带利')+'1000+1000-50=1950'}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：2800.03",
            cont: `
                ${this.$t('该笔转账的区块哈希为')+'：000*89ec7'}
								${this.$t('庄家开奖号码：89e，8+9+10=27 牛七')}
								${this.$t('闲家开奖号码是：ec7，10+10+7=27 牛七')}
								${this.$t('结果未中奖系统回款金额为')}
								${this.$t('因为1∽2点同点庄赢，其他同点扣千分之一手续费退还本金回款2800-2800*1‰=2797.2')}
								${this.$t('庄家开奖号码：89e，8+9+10=27 牛七')}

							`,
          },
          {
            title: this.$t("您的转账金额为")+"：2224.03",
            cont: `
                ${this.$t('该笔转账的区块哈希为')+'：000**c1e1f'}
                ${this.$t('庄家开奖号码：c1e，10+1+10=1 牛一')}
                ${this.$t('闲家开奖号码是：e1f，10+1+10=1 牛一')}
                ${this.$t('结果未中奖系统回款金额为')}
                ${this.$t('因为1∽2点同点庄赢')}
                ${this.$t('闲家投注222.4牛一，输1倍222.4')}
                ${this.$t('回款2224-222.4=2001.6')}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：1051",
            cont: `
             ${this.$t('该笔转账的区块哈希为')+'：000**c5e29'}
                ${this.$t('庄家开奖号码：c5e，10+5+10=25 牛五')}
                ${this.$t('闲家开奖号码是：e29，10+2+9=21 牛一')}
                ${this.$t('结果未中奖系统回款金额为')}
                ${this.$t('闲家投注105.1牛一，输5倍525.5')}
                ${this.$t('回款1051-525.5=525.5')}
							`,
          },
        ],
        [
          {
            title: this.$t("您的转账金额为")+"：1001",
            cont: `
                ${this.$t('识别为押庄赢')}
                ${this.$t('该笔转账的Block hash为：')+'000**a7B41'}
                ${this.$t('a、7代表 庄的点数为7点')}
                ${this.$t('4、1代表 闲的点数为5点')}
                ${this.$t('开奖为庄赢')}
                ${this.$t('结果中奖系统回款金额为')+'1001*1.95=1951.95'}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：3223",
            cont: `
                ${this.$t('识别为押和赢')}
                ${this.$t('该笔转账的Block hash为：')+'000**a7B43'}
                ${this.$t('a、7代表 庄的点数为7点')}
                ${this.$t('4、3代表 闲的点数为7点')}
                ${this.$t('开奖为和赢')}
                ${this.$t('结果中奖系统回款金额为')+'3223*8=25784'}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：1002.23",
            cont: `
                ${this.$t('识别为押闲赢')}
                ${this.$t('该笔转账的Block hash为：')+'000**a7B43'}
                ${this.$t('a、7代表 庄的点数为7点')}
                ${this.$t('4、3代表 闲的点数为7点')}
                ${this.$t('开奖为和赢')}
                ${this.$t('扣除千分之一手续费后原路退回')}
							`,
          },
          {
            title: this.$t("您的转账金额为")+"：2003",
            cont: `
                ${this.$t('识别为押和赢')}
                ${this.$t('该笔转账的Block hash为：')+'000**a7Bad'}
                ${this.$t('a、7代表 庄的点数为7点')}
                ${this.$t('a、d代表 闲的点数为0点')}
                ${this.$t('开奖为庄赢')}
                ${this.$t('结果未中奖不返还数字币')}
							`,
          },
        ],
      ],

      listType: "",
    };
  },
  onLoad(option) {
    this.current = option.current;
    this.listType = option.type;
    let now = "ruleList" + this.current;
    this.nowRuleList = this[now];
    if (option.uid) this.uid = option.uid;
    this.getGameInfo();
    this.hashAddress = uni.getStorageSync("hashAddress");
  },
  onShow(){
    uni.setNavigationBarTitle({// 修改头部标题
        title: this.$t('游戏规则')
    });
  },
  methods: {
    pay() {
      if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
      }
      let amount = web3.utils.toWei(this.amount, "ether");
      web3.eth.sendTransaction({
        to: this.webAddress,
        value: amount,
        from: this.hashAddress,
      });
    },
    tabClick(item) {
      this.current = item.index;
      console.log(this.current);
      let now = "ruleList" + this.current;
      this.nowRuleList = this[now];
      this.gameInfo = this.gamesList[this.current];
      this.getPoolName(this.gameInfo.type);
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
    getGameInfo() {
      this.$api.post("/api/game_pool/games", {}, (res) => {
        if (res.code == 1) {
          this.gamesList = res.data;
          let arr = [];
          res.data.forEach((item) => {
            const name=item.name.trim()
            arr.push({ name: this.$t(name) });
          });
          this.tabsList = arr;
          this.getPoolName(this.gamesList[0].type);
        }
      });
    },
    getPoolName(type) {
      this.$api.post("/api/game_pool/pool_game", { uid: this.uid }, (res) => {
        if (res.code == 1) {
          this.poolName = res.data;
          // console.log(this.current,);
          this.webAddress = res.data.info[this.current].address;
          this.webAddshow =
            this.webAddress.slice(0, 8) +
            "****" +
            this.webAddress.slice(
              this.webAddress.length - 8,
              this.webAddress.length
            );

          // res.data.info.filter(item=>{
          // 	if(item.type == type){
          // 		this.webAddress=item.address
          // 		this.webAddshow=this.webAddress.slice(0,8)+'****'+this.webAddress.slice(this.webAddress.length-8,this.webAddress.length)
          // 	}
          // })
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  // width: 100vw;
  background: #000;
  color: #fff;
  .tabs {
    padding: 10rpx 0;
    background: #8e3d00;
  }
  .video_View {
    text-align: center;
    #myVideo {
      // width: 100%;
      // margin: 20rpx;
    }
  }
  .rule_main {
    .rule_title {
      text-align: center;
      width: 100%;
      font-size: 50rpx;
      padding: 100rpx 0;
    }
    .rule_list {
      padding: 20rpx;
      .list_title {
        .title_icon {
          width: 20rpx;
          height: 20rpx;
          margin: 20rpx;
        }
      }
      .rule_item {
        padding: 5rpx 20rpx;
        .item_icon {
          width: 20rpx;
          height: 20rpx;
          margin: 20rpx;
        }
      }

      .list_item {
        padding: 40rpx 100rpx;
        .item_title {
          color: #d9d9d9eb;
          font-size: 38rpx;
          font-weight: bold;
          padding-bottom: 20rpx;
        }
        .item_cont {
          color: #dededeb0;
          font-size: 30rpx;
        }
      }
    }
  }

  .bottom_content {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 500rpx;
    padding: 0 0 40rpx;
    background: #000;
    .addr {
      padding: 40rpx 0;
    }
    .bottom_item {
      margin: 40rpx 100rpx;
      .bottom_label {
        font-size: 32rpx;
        margin-bottom: 10rpx;
      }

      .bottom_input {
        height: 50rpx;
        background: #393939;
        border-radius: 40rpx;
        padding: 10rpx 24rpx;
        // width: 80%;
        margin: 0 auto;
        .input_main {
          font-size: 24rpx;
          color: #f46c0a;
          /deep/.uni-input-input {
            color: #fff;
          }
        }

        .input_icon {
          height: 48rpx;
          width: 48rpx;
        }
      }
    }
    .bottom_btn {
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
  }
}
</style>
