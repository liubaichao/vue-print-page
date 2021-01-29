import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './assets/js/api'

import './assets/css/style.css'

import Viewer from 'v-viewer'//图片查看器
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
      zIndex: 9999
  }
})

import my from './assets/js/common.js' //全局函数

import { 
  Form,FormItem,Row,Col,Button,Upload ,Loading,Message,
  Pagination,Table,TableColumn,Select,Option,Radio,RadioGroup,
  Card,Input ,DatePicker ,Footer,Divider,InputNumber, Dialog,Popover,
  Menu,MenuItem,MenuItemGroup,Container,Header,Aside,Main,Dropdown,DropdownMenu,DropdownItem,Submenu,
  Tabs,TabPane,Checkbox ,CheckboxGroup,MessageBox
  } from 'element-ui';

const arr = [
  Form,FormItem,Row,Col,Button ,Pagination,Upload ,Message,
  Table,TableColumn,Select,Option,Card,Radio,RadioGroup,
  Input,DatePicker ,Footer,Divider,InputNumber,Dialog,Popover,
  Menu,MenuItem,MenuItemGroup,Container,Header,Aside,Main,Dropdown,DropdownMenu,DropdownItem,Submenu,
  Tabs,TabPane,Checkbox ,CheckboxGroup,MessageBox
  ] 
arr.map((e)=>{  //动态生成全局组件
  //  Vue.use(e);
   Vue.component(e.name, e)
})

/*
根据环境读取config配置；开发与测试环境配置相同，没有区分
dev：读取.env.development文件（开发环境）
test：读取.env.test文件（测试环境）
pro：读取.env.production文件（生产环境）
------运行------
yarn serve-dev
yarn serve-test
yarn serve-pro
------打包------
yarn build-dev
yarn build-test
yarn build-pro
*/

const config = JSON.parse(process.env.VUE_APP_BASE_CONFIG) 
Vue.prototype.$config = config 

Vue.use(Loading.directive);
Vue.prototype.$my = my //全局函数  使用方法  this.$my.getQueryString('openid')
Vue.prototype.$http = http  //请求封装
Vue.prototype.$message = Message 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
