/**
 * 统一跳转
 */
 function navigateTo(url) {
	uni.navigateTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300
	})
}

export {
	navigateTo
}
