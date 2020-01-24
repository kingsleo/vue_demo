import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui'

// 注册成全局标签
Vue.component(Button.name, Button)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
