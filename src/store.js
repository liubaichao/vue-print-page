import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import my from './assets/js/common.js'
import { Message } from 'element-ui';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loginInfo:{}
    
  },
  getters: {
    // noShow (state) {
    //   return !state.show
    // }
  },
  mutations: {
    // setApplyDetail (state, playload) {
    //   state.applyDetail = playload
    //   console.log( playload)
    // },
    setLoginInfo(state, playload = {}){
      console.log(playload)
      state.loginInfo = {...state.loginInfo,...playload}
    },
    // getList (state, playload) {
    //   state[playload.type] = playload.res,
    //   state.loading = false
    // },
    // setArticle(state, playload){
    //   state.article = playload
    //   state.question = playload.questionList
    //   console.log(playload)
    // }
  },
  actions: {
    getRoleArr ({commit},playload) {//获取权限树
      return new Promise((resolve,reject)=>{
        axios.get(my.api+"/getRoleArr?id="+playload.id)
        .then((res) => {
          if (res.data.code == 200) {
            let userInfo=JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')):{}
            localStorage.setItem("userInfo", JSON.stringify({...userInfo,roleArr:res.data.data})) //读到最新数据后，重新录入权限树
            commit('setLoginInfo', {roleArr:res.data.data}) //重新录入权限树
            resolve(res.data.data)
          }else{
            Message({
                message: res.data.message,
                type: 'success',
                duration: 1500
            })
          }
        })
        .catch((error) => {
          Message({
              message: error,
              type: 'success',
              duration: 1500
          })
          reject(error)
        });   
      })
      
    },
    // getArticleList ({commit},playload) {
    //   axios.post(my.api+"/userArticle/getArticle",playload)
    //     .then(function(res) {
    //       if (res.data.code == 200) {
    //         commit('setArticle', res.data.data)
    //       }else{
    //         this.$toast(res.data.message);
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error)
    //     });
    // },
    // getListLi ({commit}) {
    //   axios.get('http://datainfo.duapp.com/shopdata/getclass.php', {emulateJSON: true})
    //     .then(response => {
    //       console.log(response.data)
    //       commit('getList', {
    //         res: response.data,
    //         type :'listLi' //偷懒不想再写一个mutations方法
    //       })
    //     }, response => {
    //       console.log('error')
    //     })
    // },

  }
})
