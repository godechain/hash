

// export const nowBaseUrl = 'http://192.168.2.10:83/'
// export const nowBaseUrl = 'http://192.168.2.210:5011/'
export const nowBaseUrl = 'https://hashadmin.godechain.com/'



// export const apiBaseUrl = 'http://192.168.2.10:83/api/'
export const apiBaseUrl = nowBaseUrl 
// #ifdef H5
export const baseUrl=process.env.NODE_ENV === 'development'?window.location.origin+'/':apiBaseUrl
// #endif
export const paymentType = {
  //支付单类型
  order: 1, //订单
  recharge: 2, //充值
  form_order: 5, //表单付款码
  form_pay: 6 //表单订单
}