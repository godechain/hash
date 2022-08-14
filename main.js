import App from './App'
import * as Common from './common/common.js'
import * as Api from './config/api.js'
import * as Config from './config/config.js'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$config = Config;

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from "./common/lang/zh-CN"
import en from "./common/lang/en-US"
import ja from "./common/lang/ja-JP"
import ko from "./common/lang/ko-KR"
import th from "./common/lang/th-TH"
import vi from "./common/lang/vi-VN"
import rs from "./common/lang/rs-RH"
import xb from "./common/lang/xb-Xh"
import ab from "./common/lang/ab-AN"
Vue.use(VueI18n)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
const lang=['zh-CN', 'en-US', 'ja-JP','ko-KR','th-TH','vi-VN','rs-RH','xb-Xh','ab-AN']
if(lang.includes(uni.getStorageSync('locale'))){
  let index=lang.indexOf(uni.getStorageSync('locale'))
  uni.setStorageSync('locale', lang[index])
}else{
  uni.setStorageSync('locale', 'zh-CN')
}
 /*---------使用语言包-----------*/
 const i18n = new VueI18n({
    locale: uni.getStorageSync('locale'),    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': {...zh.homeView},   // 中文语言包
      'en-US': {...en.homeView},    // 英文语言包
      'ja-JP': {...ja.homeView},    // 日语语言包
      'ko-KR': {...ko.homeView},    // 韩语语言包
      'th-TH': {...th.homeView},    // 泰语语言包
      'vi-VN': {...vi.homeView},    // 越南语语言包
      'rs-RH': {...rs.homeView},    // 俄语语言包
      'xb-Xh': {...xb.homeView},    // 西班牙语言包
      'ab-AN': {...ab.homeView},    // 西班牙语言包

    }
 })
 Vue.prototype._i18n = i18n;
 Vue.prototype.$t = (key, value) => i18n.t(key, value);

 
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { log } from 'console'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
    i18n,
  }
}
// #endif