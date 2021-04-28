<template>
  <div :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div class="fixed_header">
        <navbar></navbar>
        <tags-view></tags-view>
      </div>
      <app-main></app-main>
<!--      <div class="fixed_footer">-->
<!--        <footer-bottom></footer-bottom>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, FooterBottom } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    FooterBottom
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        // hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'app-wrapper mobile'
      }
    }
  },
  data(){
    return{
      screenWidth: document.body.clientWidth, // 屏幕尺寸
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  /*修改部分*/
  .main-container{
    padding-top:80px;
  }
  .fixed_header{
    position: fixed;
    top:0;
    /*width: 100%;*/
    left:0;
    right:0;
    z-index: 99;
    padding-left:180px;
    transition: all .28s linear;
  }

  .fixed_footer{
    position: fixed;
    bottom:0;
    /*width: 100%;*/
    left:0;
    right:0;
    z-index: 99;
    padding-left:180px;
    transition: all .28s linear;
  }
</style>
