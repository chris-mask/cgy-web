<template>
  <!--导航栏-->
  <div style="margin-bottom: 64px;">
    <el-menu class="navbar" mode="horizontal" id="navbar" style="z-index:99;position:fixed;top:0;width:100%">
      <img src="../../../static/logo.png" alt="" class="left-menu" @click="goHome" style="cursor: pointer;">
      <div class="right-menu">
        <!--头像-->
        <div class="avatar">
          <el-avatar src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/KUc3duLW_20200326171242_122.png"></el-avatar>
        </div>
        <!--名称-->
        <span>{{user_name}}</span>
        <!--修改密码-->
        <div class="shu">|</div>
        <router-link to="/sys-setup/change-pwd">
          <span class="spanButton">{{$t('navbar.changepwd')}}</span>
        </router-link>
        <!--登出-->
        <div class="shu">|</div>
        <span class="spanButton" @click="logout" style="display:block;"><i class="iconfont icon-exit2"></i>&nbsp;&nbsp;
        {{$t('navbar.logOut')}}</span>
      </div>
    </el-menu>
  </div>
</template>

<script>
  import store from '@/store'

  export default {
    components: {},
    computed: {},
    data() {
      return {
        user_name: store.getters.name
      }
    },
    mounted() {
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          this.closeConnect();

          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      },
      // 跳转到首页
      goHome() {
        this.$router.push({ 'path': '/dashboard' })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 64px;
    line-height: 64px;
    border-radius: 0px !important;
    background: #05AAFF;
    .hamburger-container {
      line-height: 72px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      display: flex;
      float: right;
      height: 100%;
      font-size: 14px;
      color: #FFFFFF;
      margin-right: 60px;
      &:focus {
        outline: none;
      }
    }
    .left-menu {
      display: flex;
      float: left;
      height: 60%;
      line-height: 60%;
      font-size: 14px;
      color: #FFFFFF;
      margin: 12px 60px;
      &:focus {
        outline: none;
      }
    }
    .avatar {
      display: flex;
      height: 60%;
      line-height: 60%;
      font-size: 14px;
      color: #FFFFFF;
      margin: 12px 12px;
      &:focus {
        outline: none;
      }
    }
    .shu {
      margin: 0 20px;
    }
  }
</style>
