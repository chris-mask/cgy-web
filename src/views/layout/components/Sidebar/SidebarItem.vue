<template>
  <div class="menu-wrapper">


    <router-link :to="resolvePath(item.webUrl)" v-if="item.isShow == '1'">
<!--      !isNest ? 'submenu-title-noDropdown' :-->
      <el-menu-item :index="resolvePath(item.webUrl)" :class="item.hideColor ? '' : 'submenu-title-noDropdown' ">
        <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="item.permissionName" slot="title">{{item.permissionName}}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-if="item.isShow == '2'" :index="item.permissionCode||item.webUrl">
      <template slot="title">
        <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="item.permissionName" slot="title">{{item.permissionName}}</span>
      </template>

<!--      v-if="item.permissionType == 1"-->
      <template v-for="child in item.child" v-if="child.permissionType == '1'">
        <template>
          <!--              <sidebar-item :is-nest="true" class="nest-menu" v-if="child.child&&child.child.length>0" :item="child"-->
          <!--                            :key="child.permissionCode" :base-path="resolvePath(child.webUrl)">-->

          <!--              </sidebar-item>-->
          <router-link :to="resolvePath(child.webUrl)" :key="child.permissionCode">
            <el-menu-item :index="resolvePath(child.webUrl)">
              <!--                  <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>-->
              <span v-if="child.permissionName" slot="title">{{child.permissionName}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </template>
    </el-submenu>

  </div>
</template>

<script>
  import path from 'path'

  export default {
    name: 'SidebarItem',
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null,
        isShow: false
      }
    },
    mounted() {
    },
    methods: {
      resolvePath(...paths) {
        if (paths[0] != null) {
          return path.resolve(this.basePath, ...paths)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
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
</style>

