<template>
  <!-- 111 -->
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <!-- :class="$store.state.app.sidebar.opened ? '' : 'paddingLeft'" -->
<!--    <h1>-->
<!--      <img :src="logo" />-->
<!--    </h1>-->
<!--    <el-menu-->
<!--      default-active="2"-->
<!--      class="el-menu-vertical-demo"-->
<!--      :router="true"-->
<!--      :unique-opened="true"-->
<!--      background-color="#005682"-->
<!--      text-color="#D0E8F2"-->
<!--      active-text-color="#ffd04b">-->
<!--      <el-menu-item index="/dashboard" class="submenu-title-noDropdown">-->
<!--        <i class="nav_icon home-icon"></i>-->
<!--        <span slot="title">首页</span>-->
<!--      </el-menu-item>-->
<!--      <el-submenu index="3">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>政策通知</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/policy">-->
<!--            政策通知-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/policy/project/list">-->
<!--            项目库管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="4">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>立项协同</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/approvalCollaborative">-->
<!--            立项管理-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/approvalCollaborative/publicityResult">-->
<!--            公示结果-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="5">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>客户管理</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/customer">-->
<!--            客户中心-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/customer/performanceManagement">-->
<!--            绩效管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/customer/salesPlan">-->
<!--            销售计划-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/customer/serviceTrace/list">-->
<!--            需求投诉-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/customer/cashBackPlan">-->
<!--            回款计划-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="12">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>企业信息</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/enterprise/list">-->
<!--            基础信息-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="6">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>申报协同</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/declareCoordination/orderManage">-->
<!--            订单管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/declareCoordination/orderArrange">-->
<!--            订单安排统计-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="7">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>文件管理</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/file">-->
<!--            文件库-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/file/fileType">-->
<!--            文件分类-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/file/ossFileManage">-->
<!--            oss文件库-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="8">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>合同管理</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/contract">-->
<!--            合同列表-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="9">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>知识产权</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/ipr/patent/list">-->
<!--            专利列表-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/ipr/copyright/list">-->
<!--            著作权-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/ipr/trademark/list">-->
<!--            商标-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/ipr/certificate/list">-->
<!--            企业证书-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-menu-item index="/message/list" class="submenu-title-noDropdown">-->
<!--        <i class="el-icon-setting"></i>-->
<!--        消息中心-->
<!--      </el-menu-item>-->
<!--      <el-submenu index="10">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>申报管理</span>-->
<!--        </template>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="11">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>后台管理</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/department">-->
<!--            部门管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/userManage">-->
<!--            用户管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/rolesManage">-->
<!--            角色管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/operatePrivileges">-->
<!--            操作权限管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/dictionariesManage">-->
<!--            字典管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/configManage">-->
<!--            配置管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/process">-->
<!--            流程管理-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/enterpriseDetail">-->
<!--            企业信息-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/enterpriseList">-->
<!--            企业列表-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/backend/changePassword">-->
<!--            修改密码-->
<!--          </el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--    </el-menu>-->

    <!-- 根据权限生成菜单，暂时未做权限控制先不开放 -->
        <el-menu
          mode="vertical"
          :show-timeout="200"
          :default-active="$route.path"
          background-color="#304156"
          text-color="#bfcbd9"
          :unique-opened='true'
        >
    <!--      v-if="companyId == ''"-->
          <router-link to="/dashboard">
            <el-menu-item index="/dashboard" class="submenu-title-noDropdown">
              <i class="nav_icon home-icon"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
    <!--      <router-link to="/mission/myBusiness" v-else>-->
    <!--        <el-menu-item index="/mission/myBusiness" class="submenu-title-noDropdown">-->
    <!--          <i class="nav_icon home-icon"></i>-->
    <!--          <span slot="title">首页</span>-->
    <!--        </el-menu-item>-->
    <!--      </router-link>-->
          <sidebar-item v-for="route in colList" :key="route.permissionCode" :item="route"
                        :base-path="route.webUrl">
          </sidebar-item>
          <router-link to="/backend/changePassword">
            <el-menu-item index="/backend/changePassword" class="submenu-title-noDropdown">
              <i class="nav_icon edit-code-icon"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
          </router-link>
        </el-menu>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'
  import bus from "../../../../utils/bus";
  import logo from "../../../../../static/logo.png"

  export default {
    components: {SidebarItem},
    computed: {
      ...mapGetters([
        'colList',
      ]),
    },
    data() {
      return {
        logo,
        companyId: this.$store.getters.companyId,
      }
    },
    mounted() {
      this.getNavsList();
      bus.$on('getNavList', args => {
        let param = {
          companyId: args,
        };
        this.$store.dispatch('getNavsData', param);
      });
    },
    methods: {
      //获取左侧列表数据
      getNavsList() {
        if (this.companyId != "") {
          let param = {
            companyId: this.companyId,
          };
          this.$store.dispatch('getNavsData', param);

        }
      }
    },
  }
</script>
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  h1 {
    text-align: center;
    padding: 20px 0;
    background-color: #003C5C !important;
  }

  .paddingLeft {
    padding-left: 4px;
  }

  /deep/ .el-menu {
    background-color: #003C5C !important;
  }

  /deep/ .is-active {
    /*background-color: #05AAFF !important;*/
    color: #fff !important;
  }

  /deep/ .el-submenu__title {
    background-color: #003C5C !important;

    &:hover {
      background: #014c73 !important;
    }
  }

  /deep/ .submenu-title-noDropdown {
    background-color: #003C5C !important;

    &:hover {
      background: #014c73 !important;
    }
  }

  /deep/ .submenu-title-noDropdown.is-active {
    background-color: #05AAFF !important;
  }

  #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title, #app .sidebar-container .el-submenu .el-menu-item {
    background-color: #012F46 !important;
    text-indent: 13px;

    &:hover {
      background: #014c73 !important;
    }
  }

  #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title.is-active, #app .sidebar-container .el-submenu .el-menu-item.is-active {
    background-color: #05AAFF !important;
  }

  /deep/ .el-menu-item-group__title {
    padding: 0;
  }

  .nav_icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-bottom: 3px;
    margin-right: 16px;
    background-position: center !important;
    background-size: contain !important;
  }

  .home-icon {
    background: url("../../../../../static/icon/home.png");
  }

  .edit-code-icon {
    background: url("../../../../../static/icon/editCode.png");
  }

  .home-icon.cur {
    background: url("../../../../../static/icon/a_home.png");
  }


</style>
