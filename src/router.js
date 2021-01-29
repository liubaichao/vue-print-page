import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import my from './assets/js/common.js' //全局函数

import Login from './views/Login.vue'
import print from './views/print'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Login,
      meta: {
        title: '登陆',
      }
    },
    // {
    //   path: '/print',
    //   name: 'print',
    //   component: print,
    //   meta: {
    //     title: '打印',
    //     requireAuth: false
    //   }
    // },
  ]
})

//动态加载路由 start
let userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):''
if(userInfo){ //此处解决用户手动清除缓存||刷新页面（store刷新就会清空），跳转login
  // let userId = JSON.parse(localStorage.getItem('userInfo')).id
  // store.dispatch('getRoleArr',{id:userId}).then(res=>{ //获取权限树，生成路由
  //   my.loadRouter(res ,router)
  // })
  let obj = {
    "id": 1,
    "name": "admin",
    "loginName": "admin",
    "password": "123456",
    "mobile": "13323739380",
    "email": null,
    "status": 1,
    "roleId": null,
    "roleArr": [{
            "name": "打印",
            "path": "print",
            "icon": "el-icon-finished",
            "showLeftMenu": true,
            "requireAuth": true,
            "children": []
        }]
    }

  localStorage.setItem("userInfo", JSON.stringify(obj))
  my.loadRouter(obj.roleArr,router)
  store.commit('setLoginInfo',obj)
}else{
  router.push('/')
}
//动态加载路由 end

//路由钩子函数 start
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if(to.matched.some(record => record.meta.requireAuth)){
    if(localStorage.getItem('userInfo')){
      next()
    }else{
      next('/')
    }
  }else{
    next()
  }
})
//路由钩子函数 end

export default router