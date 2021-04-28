<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  // import webSocket from "@/utils/webSocket.js"
  export default {
    name: 'App',
    data(){
      return{}
    },
    // activated() {
      // webSocket.connect();
    // }
    mounted() {
      // console.log(this.$store.getters.secretKey)
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .el-button--primary {
    color: #FFF;
    background-color: #05AAFF;
    border-color: #05AAFF;
  }

  /deep/ .app-main {
    background: #F5F9FF;
    padding-top: 16px;
  }

  #app .hideSidebar .fixed_header {
    padding-left: 36px !important;
  }

  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }

  /deep/ .spanButton {
    &:hover {
      cursor: pointer !important;
    }
  }

  /deep/ .el-input__inner {
    &::placeholder {
      color: rgba(68, 68, 68, .5);
    }

    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: rgba(68, 68, 68, .5);
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: rgba(68, 68, 68, .5);
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: rgba(68, 68, 68, .5);
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: rgba(68, 68, 68, .5);
    }
  }


  .el-table .sort-caret.descending {
    border-top-color: #fff !important;
  }

  .el-table .sort-caret.ascending {
    border-bottom-color: #fff !important
  }

  /deep/ .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-input{
      width: auto !important;
      margin: 0 5px;
      height: auto !important;
    }
    .el-select .el-input{
      width: 100px !important;
      margin: 0 5px;
    }

  }

  /deep/ .el-pagination__total {
    flex: 1
  }

  /deep/ .app-container {
    padding: 11px;
  }

  /deep/ .el-card__header, /deep/ .el-card__body {
    /*padding: 10px 10px;*/
  }

  /deep/ .el-table td, .el-table th {
    padding: 7px 0;
  }

  /deep/ .someLong {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; //作为弹性伸缩盒子模型显示。
    -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
    -webkit-line-clamp: 2; //显示的行
  }

  /deep/ .el-input--small .el-input__icon {
    line-height: inherit;
  }

  /*/deep/ .el-tree-node__label{*/
  /*  word-wrap:break-word;*/
  /*}*/

  /deep/ .el-tree>.el-tree-node .span-ellipsis{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      font-size:14px;
  }

  /deep/ .el-table__body tbody tr td .cell{
    text-align: left;
    padding-left: 10px;
  }

  /deep/ figure{
    margin:0;
  }

  /deep/ .longSuo{
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
  }

  //数字默认样式
  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  /deep/ input:focus{
    outline:none;
  }

  /deep/ .star{
    color: #ff2f34;
    position: absolute;
  }

  /deep/ .noMore{
    text-align: center;
    padding: 10px 0;
  }

  /deep/ span{
    font-size:14px;
  }

  /deep/ div{
    font-size:14px;
  }

  /deep/ .el-input-group__append{
    padding: 0 6px;
  }

  /deep/ .el-input__inner{
    padding: 0 5px;
  }

  /deep/ .el-select{
    .el-input__inner{
      padding: 0 5px;
      padding-right: 25px;
    }
  }

  /deep/ .el-date-editor{
    .el-input__inner{
      padding: 0 30px;
    }
  }
</style>
