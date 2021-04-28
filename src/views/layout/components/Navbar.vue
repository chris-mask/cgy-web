<template>
  <el-menu class="navbar" mode="horizontal" id="navbar">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->

      <span class="user-name" @click="goUserInfo">{{user_name}}</span>
      <div class="shu">|</div>

      <span class="company-title">切换企业</span>
      <div class="choosePession">
        <el-select size='small' v-model="company"
                   placeholder="请选择"
                   class="company-list"
                   @change="companyHandle"
                   popper-class="select-company-option"
                   :popper-append-to-body="false"
        >
          <el-option v-for="item in companyList"
                     :key="item.companyId"
                     :label="item.companyName"
                     :value="item.companyId"
          >
            <div v-if="item.permissionState == 0 || item.permissionState == 1">
              <span style="float: left" class="theImg"><img src="@/assets/warning.png"></span>
              <span>{{ item.companyName }}</span>
            </div>
          </el-option>
        </el-select>
        <div class="floatTips" v-if="differenceTime">
          <span>{{differenceTxt}}还剩 <span>{{differenceTime}}</span></span>
        </div>
      </div>

      <div class="shu">|</div>
      <!--<router-link to="/changePassword">-->
      <!--<span class="spanButton">修改密码</span>-->
      <!--</router-link>-->
      <!--<div class="shu">|</div>-->
      <span class="spanButton" @click="logout" style="display:block;"><i class="iconfont icon-exit2"></i>&nbsp;&nbsp;
        退出登陆
      </span>
    </div>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import store from '@/store'
  import bus from "../../../utils/bus";
  import {diffTime} from "@/utils/auth";
  import {getCompanyMenu} from '@/api/user'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    data() {
      return {
        companyType: this.$store.getters.companyType,
        // user_name: store.getters.name,
        user_name: store.getters.username,
        companyId: this.$store.getters.companyId,
        companyName: this.$store.getters.companyName,
        company: "",//选中当前企业
        companyList: {},//企业列表
        differenceTime: '',
        differenceTxt: '',
      }
    },
    activated() {
      this.permissionState = this.$store.getters.permissionState;
      this.permissionTime = this.$store.getters.permissionTime;

      if (this.permissionState == 0 || this.permissionState == 1) {
        this.differenceTxt = '试用期'
      } else if (this.permissionState == 2 || this.permissionState == 3) {
        this.differenceTxt = '使用期限'
      }

      let date = new Date();
      let nowDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.differenceTime = diffTime(nowDate, this.permissionTime);
    },
    mounted() {
      if (!this.$store.state.app.sidebar.opened) {
        // document.getElementsByClassName('fixed_header')[0].style.paddingLeft = '36px'
      } else {
        document.getElementsByClassName('fixed_header')[0].style.paddingLeft = '180px'
      }
      this.getCompanyList();
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
        if (!this.$store.state.app.sidebar.opened) {
          // document.getElementsByClassName('fixed_header')[0].style.paddingLeft = '36px'
        } else {
          document.getElementsByClassName('fixed_header')[0].style.paddingLeft = '180px'
        }
      },

      //退出登陆
      logout() {
        // this.$router.push({path:'/login'});
        // location.href('/#/login')
        this.$store.dispatch('logOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      },

      //跳转到个人信息
      goUserInfo() {
        this.$router.push({
          path: '/userInfo'
        })
      },

      //获取企业列表
      getCompanyList() {
        getCompanyMenu().then(res => {
          if (res.code == 200) {
            this.companyList = res.data;
            let newArr = Object.values(this.companyList);
            newArr.forEach(item => {
              if (item.companyId == this.$store.getters.companyId) {
                this.company = item.companyId;
                this.$store.commit('SET_COMPANY_ID', this.company);
                this.$store.commit('SET_COMPANY_NAME', this.companyName);
                this.$store.commit('SET_COMPANY_TYPE', this.companyType);
                this.$store.commit('SET_PERMISSION_STATE', item.permissionState);
                this.$store.commit('SET_PERMISSION_TIME', item.permissionToTime);
              }
            })
          }
        })
      },
      //切换企业
      companyHandle() {
        if (this.company != "") {
          bus.$emit('getNavList', this.company);
          this.$store.commit('SET_COMPANY_ID', this.company);
          let newArr = Object.values(this.companyList);
          newArr.forEach(item => {
            if (item.companyId == this.company) {
              this.$store.commit('SET_COMPANY_NAME', item.companyName);
              this.$store.commit('SET_COMPANY_TYPE', item.companyType);
              this.$store.commit('SET_PERMISSION_STATE', item.permissionState);
              this.$store.commit('SET_PERMISSION_TIME', item.permissionToTime);
            }
          })
          this.$router.push({path: '/dashboard'});
          location.reload()
        }
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 64px;
    line-height: 64px;
    border-radius: 0 !important;
    background: #003C5C;

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
      color: #D0E8F2;
      margin-right: 60px;
      position: relative;

      &:focus {
        outline: none;
      }
    }

    .shu {
      margin: 0 20px;
    }

    .user-name {
      cursor: pointer;
    }

    .company-title {
      margin-right: 10px;
    }

    .company-list {
      /deep/ .el-input__inner {
        height: 33px;
        line-height: 43px;
        /*padding-left: 30px;*/
      }

      /deep/ .el-input__prefix, /deep/ .el-input__suffix {
        position: absolute;
        top: -2px;
        -webkit-transition: all .3s;
        height: 100%;
        color: #C0C4CC;
        text-align: center;
      }
    }
  }

  .theImg {
    width: 15px;
    margin-right: 10px;

    img {
      width: 100%;
    }
  }

  .choosePession:hover > .floatTips {
    animation: twinkling 1s 1 ease-in-out alternate forwards;
    display: block;
  }

  @keyframes twinkling {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .floatTips {
    background: #37BBFF;
    box-shadow: 0px 2px 7px rgba(5, 170, 255, 0.15);
    position: absolute;
    /*left: 36%;*/
    top: 47px;
    z-index: 2;
    height: auto;
    line-height: initial;
    padding: 8px 20px;
    font-size: 14px;
    display: none;
    opacity: 0;
  }

  .floatTips::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 7px solid #37BBFF;
    position: absolute;
    left: 9px;
    top: -7px;
  }

  /deep/ .select-company-option{
    z-index: 2016 !important;
  }
</style>
