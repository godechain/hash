import {
	apiBaseUrl
} from './config.js';
import * as db from './db.js' //引入common

let url = apiBaseUrl

export const post = (method, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	let myToken = ''
	if(method !== 'ems/send'||'user/register'){
		// 获取用户token
		myToken = db.get("hashToken");
	}
	uni.request({
		url: url + method,
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'token': myToken,
		},
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (!result.status) {
				// 登录信息过期或者未登录
				if (result.data === 14007 || result.data === 14006 || result.code == 401) {
					db.del("userToken");
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								// #ifdef H5 || APP-PLUS
								uni.navigateTo({
									url: '/pages/login/login/index1'
								})
								// #endif
								// #ifdef MP-WEIXIN || MP-ALIPAY	
								uni.navigateTo({
									url: '/pages/login/choose/index',
									animationType: 'pop-in',
									animationDuration: 200
								});
								// #endif
							}, 1000)
						}
					});
				}
			}
			callback(result);
		},
		complete: () => {
			uni.hideLoading();
		},
		fail: (error) => {
			uni.hideLoading();
		},
	});

}

export const get = (method , data , callback) => {
	uni.showLoading({
		title: '加载中'
	});
	let myToken = ''
	if(method !== 'account/login'||'account/register'){
		// 获取用户token
		myToken = db.get("userToken");
		// console.log(myToken);
	}
	uni.request({
		url: url + method,
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
			'token': myToken,
		},
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			if (response.data.code == 401 ) {
				uni.showToast({
					title: response.data.msg,
					icon: 'none',
					duration: 1000,
					complete: function() {
						setTimeout(function() {
							uni.hideToast();
							// #ifdef H5 || APP-PLUS
							uni.navigateTo({
								url: '/pages/login/login/index1'
							})
							// #endif
						}, 1000)
					}
				});
			}
			callback(response.data);
		},
		fail: (error) => {
			uni.hideLoading();
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});
}






// // 分销图
// export const poster = (data, callback) => post('user/getShareImg', data, callback);
// // 首页公告
// export const indexnotice = (data,callback) => get('index/notice', data,callback);


