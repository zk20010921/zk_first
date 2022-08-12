
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//uView组件库
import uView from "uview-ui";
Vue.use(uView);


import fly from './request.js'
Vue.prototype.$http = fly

//封装弹框的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif