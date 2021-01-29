<template>
  <div class="Login" v-loading="loading">
    <el-form label-position="right" class="formLogin" ref="form" :model="form" :rules="rules">
        <h1 class="loginStyle tc pt20">再见了喵小姐</h1>
        <h5 class="loginStyle tc mb20 pb20">后台管理系统</h5>
        <el-row>
            <el-col :span="4">
                <p class="loginStyle">账号</p>
            </el-col>
            <el-col :span="16">
                <el-form-item prop="loginName">
                    <input type="text" class="formInput" v-model="form.loginName" @keyup="onKeyUp"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <p class="loginStyle">密码</p>
            </el-col>
            <el-col :span="16">
                <el-form-item prop="password">
                    <input type="password" class="formInput" v-model="form.password" @keyup="onKeyUp"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <p style="color:#2d3a4b">.</p>
            </el-col>
            <el-col :span="16">
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="submitLogin('form')">登录</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            loading: false, //页面loading
            form: {
                loginName: 'admin',
                password: '123456'
            },
            rules: { // 表单规则验证
                loginName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ]
            }
        }
  },
  methods: {
    ...mapMutations(['setLoginInfo']),
    onKeyUp(e){
        if(e.keyCode === 13){
	    	this.submitLogin('form')
	    }  
    },
    submitLogin(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.loading = true
            // this.$http.loginApi(this.form).then(res => { // 登录
            //     if(res.data.code === 200){
                    // localStorage.setItem("userInfo", JSON.stringify(res.data.data))
                    // this.setLoginInfo(res.data.data)
                    // this.$my.loadRouter(res.data.data.roleArr ,this.$router)
                    // this.loading = false
                    // this.$message({
                    //     message: res.data.message,
                    //     type: 'success',
                    //     duration: 1500
                    // })
                    let obj = {
                        "id": 1,
                        "name": "admin",
                        "loginName": "admin",
                        "password": "e10adc3949ba59abbe56e057f20f883e",
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
                    this.setLoginInfo(obj)
                    this.$my.loadRouter(obj.roleArr ,this.$router)
                    this.$router.push('/print')      
            //     }else{
            //         this.loading = false
            //         this.$message({
            //             message: res.data.message,
            //             type: 'error',
            //             duration: 1500
            //         })
            //         return false
            //     }
            // })
          } else {
            return false
          }
        })
    },
  },
  mounted() {
    setTimeout(function(){
        this.loading = false
    },200)
  },
  computed: {

  },
  created() {

  }
}
</script>

<style scoped>
.Login{
    width: 100%; min-height: 100%; 
    background: url('../assets/images/bg.jpg') no-repeat center center;
    background-size:100% 100%;
    overflow: hidden;
    }
.formLogin{
    position: relative;
    width: 500px;
    top: 160px;
    padding: 0px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    background: rgba(22,131,110,.4);
    border-radius: 10px;
    box-shadow: 0px 0px 20px #aaa;
}
.loginStyle{color: white; line-height: 40px;}
.formInput{
    color: white; 
    background-color: #2d3a4b;
    width: 94%; 
    height: 40px; 
    border-radius: 5px;
    border: 1px solid hsla(0,0%,100%,.1);
    padding-left: 10px;
    padding-right: 10px;
    background: rgba(0,0,0,.1);
}
@media (max-width: 500px){
.formLogin{width:70%;}
}
</style>
