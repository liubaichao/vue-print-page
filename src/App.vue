<template>
  <div id="app">
    <el-container class="h100">
      <el-aside :width="collapse?'auto':'200px'" style="background-color: rgb(238, 241, 246)" v-show="isShow" class="flex colu">
        <div class="logo"></div>
        <el-menu
          router
          ref='menu'
          @select='selectChange'
          :collapse="collapse"
          :default-active='$route.path'
          class="el-menu-vertical-demo"
          background-color="#002140"
          text-color="#fff"
          active-text-color="#ffd04b">

          <template v-for="(item,i) in loginInfo.roleArr">
            <el-menu-item :index="'/'+item.path" v-if="item.children.length == 0" :key='i' >
              <i :class="item.icon"></i>              
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu :index="'/'+item.path" v-else :key='i'>
              <template slot="title" >
                <div class="flex alic">
                  <i :class="item.icon"></i>
                  <span slot="title" class="flex1 flex">
                    <span class="flex1">{{item.name}}</span>
                    <span>
                      <span class="redBox mr15">5</span>
                    </span>
                  </span>
                </div> 
              </template>
                <el-menu-item :index="'/'+n.path" v-for="(n,j) in item.children" :key='j'>{{n.name}}</el-menu-item>
            </el-submenu>
          </template>

        </el-menu>
      </el-aside>
      
      <el-container>

        <el-header class="tr fz12 flex justs header bgf" v-show="isShow">
          <span :class="[collapse?'el-icon-s-unfold':'el-icon-s-fold','fz16','lh60','cursor']" @click="collapse = !collapse"></span>
          <span>
            <el-dropdown @command="handleCommand" :hide-timeout='1000'>
              <i class="el-icon-setting cursor" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changeppPw">修改密码</el-dropdown-item>
                <el-dropdown-item command="loginOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>{{userInfo?userInfo.name:''}}</span>
          </span>
        </el-header>
        
        <el-main class="padding0 h100">
          <router-view  v-if="$route.path == '/'"/>
          <el-tabs 
            v-else
            v-model="editableTabsValue" 
            type="card" 
            closable 
            @tab-remove="removeTab" 
            @tab-click='clickTab'
            class='tabs mt10 ml20 mr20'
            >
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <router-view  v-if='$route.path == item.name'/>
            </el-tab-pane>
          </el-tabs>
        </el-main>

      </el-container>
    </el-container>

    <!-- 录入 start -->
    <el-dialog title="修改密码" :visible.sync="newFormVisible" width='30%'>
        <el-form :model="newForm" ref='newForm' :rules="newRules" label-width='100px'>
          <el-form-item label="原密码：" prop="oldPassword" size="small">
            <el-input v-model.number="newForm.oldPassword" show-password clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassword" size="small">
            <el-input v-model.number="newForm.newPassword" show-password clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="surePassword" size="small">
            <el-input v-model.number="newForm.surePassword" show-password clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="newFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit('newForm')">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 录入 end -->

  </div>
</template>
<script>
import Vue from 'vue'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  name: 'App',
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value,value.toString().length)
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(value.toString().length < 6){
        callback(new Error('密码最少6位!'));
      } else{
        if (this.newForm.surePassword !== '') {
          this.$refs.newForm.validateField('surePassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.newForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    
    return {
      isShow:false, //是否显示菜单栏
      collapse:false, //是否展开菜单栏
      userInfo:{name:'admin'},

      editableTabsValue: '',
      editableTabs:[],
      newForm:{
        oldPassword:'',
        newPassword:'',
        surePassword:''
      },
      newRules:{
        oldPassword:[{ required: true,message: '请输入', trigger: 'blur'}],
        newPassword:[{ required: true,validator: validatePass, trigger: 'blur' }],
        surePassword:[{ required: true,validator: validatePass2, trigger: 'blur' }]
      },
      newFormVisible:false,
      // 此处作用，有些路由不需要写在数据库，例如新增一个患者（复杂表单需要单独一个页面，一般都是弹窗形式）
      // 此时，你需要左侧列表显示，且tab选项卡增加
      // NotMenuPage:['/addPatient']
      NotMenuPage:[] 
    }
  },
  created() {
  },
  computed: {
    ...mapState(['loginInfo']),
  },
  methods: {
    ...mapMutations(['setLoginInfo']),
    handleCommand(command) { //退出登录
      if(command == 'loginOut'){
        localStorage.setItem('userInfo','') 
        this.setLoginInfo()
        this.$router.push({
          path:'/'
        })
        this.editableTabs=[]
      }else if(command == 'changeppPw'){
         this.newFormVisible = true
      }
    },
    submit(formName){  //修改密码
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data ={
            id:JSON.parse(localStorage.getItem('userInfo')).id,
            ...this.newForm
          }
          if(data.newPassword !== data.surePassword){
            this.$message({
                message: '两次密码不一致！',
                type: 'error',
                duration: 1500
            })
            return false
          }
          this.$axios.post(this.$my.api + '/bms/employee/changePassword', data).then(res => { 
              if(res.data&&res.data.code === 200){       
                  this.newFormVisible = false
                  this.$message({
                      message: res.data.message,
                      type: 'success',
                      duration: 1500
                  })
                  this.$router.push('/')
                  this.$refs[formName].resetFields();
              }else{
                  this.$message({
                      message: res.data.message,
                      type: 'error',
                      duration: 1500
                  })
                  return false
              } 
          }).catch(function (error) {})
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    removeTab(targetName) {//删除
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push(nextTab.name)
            }
          }
        });
      } 

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    clickTab(val){ //点击tab，左侧选中
      this.$router.push(val.name)
    },
    selectChange(index,indexPath){ //点击左侧菜单，追加tab
     
      let userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{name:'',roleArr:[]}
      let currentRoute = null
      userInfo.roleArr.map((item)=>{
        if(item.children.length == 0){
          if(`/${item.path}` == index){
            currentRoute = item
          }
        }else{ 
          if(item.children.find( n => `/${n.path}` == index )){
            currentRoute = item.children.find( n => `/${n.path}` == index )
          }
        }
      })
      this.editableTabs.push({
        title: currentRoute.name,
        name: index,
      });
      this.editableTabs = this.editableTabs.quChong('name')
      this.editableTabsValue = index;
    },
    init () {
      let canvas = document.createElement('canvas')
      let user = JSON.parse(localStorage.getItem('userInfo'))
      canvas.id = 'canvas'
      canvas.width = '200' // 单个水印的宽高
      canvas.height = '130'
      let maskDiv = document.createElement('div')
      let ctx = canvas.getContext('2d')
      ctx.font = 'normal 18px Microsoft Yahei' // 设置样式
      ctx.fillStyle = 'rgba(112, 113, 114, 0.2)' // 水印字体颜色
      ctx.rotate(30 * Math.PI / 180) // 水印偏转角度
      ctx.fillText(user.roleDesc, 30, 20)    //第一行字体
      ctx.fillText(user.loginName, 30, 40)  //第二行字体
      let src = canvas.toDataURL('image/png')
      maskDiv.style.position = 'fixed'
      maskDiv.style.zIndex = '9999'
      maskDiv.id = '_waterMark'
      maskDiv.style.top = '30px'
      maskDiv.style.left = '0'
      maskDiv.style.height = '100%'
      maskDiv.style.width = '100%'
      maskDiv.style.pointerEvents = 'none'
      maskDiv.style.backgroundImage = 'URL(' + src + ')'
      // 水印节点插到body下
      document.body.appendChild(maskDiv)
    },
  },
  mounted () {
    let userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{name:'',roleArr:[]}
    let currentRoute = null
    userInfo.roleArr.map((item)=>{
      if(item.children.length == 0){
        if(`/${item.path}` == this.$route.path){
          currentRoute = item
        }
      }else{ 
        if(item.children.find( n => `/${n.path}` == this.$route.path )){
          currentRoute = item.children.find( n => `/${n.path}` == this.$route.path )
        }
      }
    })
    this.userInfo = userInfo   
    this.isShow = currentRoute?currentRoute.showLeftMenu:this.NotMenuPage.find(n=>n==this.$route.path)?true:false

    if(currentRoute || this.NotMenuPage.find(n=>n==this.$route.path)?true:false){//刷新后，tab选项卡选中
      this.editableTabs.push({ 
        title: currentRoute?currentRoute.name:this.$route.meta.title,
        name: currentRoute?`/${currentRoute.path}`:this.$route.path,
      });
      this.editableTabsValue = currentRoute?`/${currentRoute.path}`:this.$route.path
    }

    setTimeout(() => {
      this.$refs.menu.defaultActive = localStorage.getItem('index')
      this.editableTabsValue = localStorage.getItem('index');
    }, 100)

    if(this.$route.path != '/'){
      this.init() //水印
    }  
  },
  watch: {
    $route() {
      let i = this.$route.path;
      let userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{name:'',roleArr:[]}
      let currentRoute = null
      userInfo.roleArr.map((item)=>{
        if(item.children.length == 0){
          if(`/${item.path}` == this.$route.path){
            currentRoute = item
          }
        }else{         
          
          if(item.children.find( n => `/${n.path}` == this.$route.path )){
            currentRoute = item.children.find( n => `/${n.path}` == this.$route.path )
          }
        }
      })

      localStorage.setItem('index',i)
      this.userInfo = userInfo
      this.isShow=currentRoute?currentRoute.showLeftMenu:this.NotMenuPage.find(n=>n==this.$route.path)?true:false

      if(this.$route.path != '/'){ //登录显示默认页面
        this.editableTabs.push({
          title: currentRoute?currentRoute.name:this.$route.meta.title,
          name: i,
        });
        this.editableTabs = this.editableTabs.quChong('name')
      }

      setTimeout(() => {
        this.$refs.menu.activeIndex = i
        this.editableTabsValue = i;
      }, 100)
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f1f1f1;
}
.el-menu{flex:1;}
.el-header {
  color: #333;
  line-height: 60px;
}
.el-tabs__item.is-active{background:#fff;}
.el-tabs__header{margin:0}
.padding0{padding:0}
.el-aside {
  color: #333;
}
.logo{
  width: calc(100% - 1px);
  height: 60px;
  background: url('./assets/images/logo.jpg') no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.redBox{
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
}
.lh60{line-height: 60px;}
/*修改滚动条样式*/
.el-aside::-webkit-scrollbar{
  width:2px;
  height:2px;
  /**/
}
.el-aside::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
.el-aside::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
.el-aside::-webkit-scrollbar-thumb:hover{
  background: #333;
}
.el-aside::-webkit-scrollbar-corner{
  background: #179a16;
}
</style>
