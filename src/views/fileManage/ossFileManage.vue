<template>
  <div class="app-container">
    <!--搜索-->
    <el-card class="search-box top-margin-10 center-items">
      <el-form class="search-bar" @submit.native.prevent>
        <el-form-item class="search">
          <input type="text" @keyup.enter="getList" clearable v-model="listQuery.name" class="search_input width-400" placeholder="请输入文件夹或文件名">
          <el-button class="btn bt_blue" @click="getList"><span class="bt_font">搜一下</span></el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!--搜索记录总数、操作栏-->
    <div class="handle-bar">
      <div class="left">
        <div class="search-total">搜索到<span class="num">{{folderList.length}}</span>条记录</div>
      </div>
    </div>

    <!--路径-->
    <div class="route-list">
      <div class="item" @click="handleRouteItem(item.val)" v-for="item in routerList">
        {{item.key}}
      </div>
    </div>

    <!--列表-->
    <div class="list-box">
      <div class="list-title">
        <div class="item">名称</div>
        <div class="item">修改日期</div>
        <div class="item">类型</div>
        <div class="item">大小</div>
      </div>
      <div class="list-detail">
        <div class="cate-item" v-for="(item,index) in folderList">
          <div class="person">
            <div class="item title">
              <span class="num">{{index+1}}</span>
              <span class="type-name" @click="handleName(item)">{{item.folderName || item.fileName}}</span>
            </div>
            <div class="item">{{item.lastModifyTime}}</div>
            <div class="item">{{item.type == 0 ? '文件夹' : '文件' }}</div>
            <div class="item">{{item.fileSize ? item.fileSize + 'B' : ''}}</div>
          </div>
        </div>
        <div class="noMore" v-if="folderList.length == 0 || folderList == ''">
          没有更多
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {ossFileSystem} from '@/api/fileManage'
  import {ossFileSystemFileDownload} from '@/api/utils'
  export default {
    data() {
      return {
        index: 1,
        listQuery: {
          folderId: ''
        },
        // 路径
        routerList: [
          { 'key': '根目录/', 'val': null }
        ],
        // 总条数
        total: '',
        folderList:[],
        folderPath:'',

        allowGetList: this.authorityControl('SYSTEM:FILE:MANAGE','SYSTEM:FILE:OSSLIBRARY','SYSTEM:FILE:OSSLIBRARY:LIST'),//OSS文件列表
        allowDownload: this.authorityControl('SYSTEM:FILE:MANAGE','SYSTEM:FILE:OSSLIBRARY','SYSTEM:FILE:OSSLIBRARY:DOWNLOAD'),//OSS文件下载
      }
    },
    activated() {
      this.getList();
    },
    methods: {
      // 获取文件列表
      getList(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
        });

        if(this.allowGetList.twoAllow){
          ossFileSystem(this.listQuery).then(res=>{
            if(res.code == 200){
              //分类： 0 文件夹，1 文件
              res.data.ossFolderVos.forEach(item=>{
                item.type = 0
              })
              res.data.ossFileVos.forEach(item=>{
                item.type = 1
              })
              let folderList = res.data.ossFolderVos;

              this.folderList = folderList.concat(res.data.ossFileVos)

              setTimeout(() => {
                loading.close();
              }, 200);
            }else{
              this.$message.warning(res.message)
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取此列表')
        }
      },

      // 点击父级名称
      handleName(item) {
        let flag = true;
        this.listQuery.folderPath = item.filePath
        const obj = {
          key: `${item.folderName}/`,
          val: item.filePath
        }

        if(item.type == 0){
          this.routerList.forEach(data=>{
            if(data.val != obj.val){
              flag = true;
            }else{
              flag = false;
            }
          })

          if(flag){
            this.routerList.push(obj)
          }

          this.getList()
        }
        if(item.type == 1){
          this.downFileHandle(item)
        }
      },

      //下载文件
      downFileHandle(data) {
        if(this.allowDownload.twoAllow){
          ossFileSystemFileDownload(data).then(res => {
            if (res.code == 200) {
              let url = res.data.replace(/http/,'https')
              window.open(url)
              this.$message.success('下载成功')
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限下载文件')
        }
      },

      // 点击路径上的名称
      handleRouteItem(name) {
        this.listQuery.folderPath = name
        this.routerList.forEach((item, index) => {
          if (name === item.val) {
            this.routerList = this.routerList.slice(0, index + 1)
          }
        })
        this.getList()
      },
    }
  }
</script>

<style lang="less" scoped>
  .width-400 {
    width: 400px;
  }

  .center-items {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search_input {
    height: 48px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(5, 170, 255, 0.7294117647058823);
    opacity: 1;
  }

  // 修改筛选条件框框样式
  .box-card {
    margin-bottom: 14px;

    /deep/ .el-button {
      border-radius: 0;
    }

    /deep/ .filter-item {
      margin-bottom: 0 !important;
    }

    /deep/ .el-input {
      width: 200px;
      height: 36px;
      margin-right: 10px;
    }
  }

  /deep/ .el-date-editor.el-input {
    width: auto;
  }

  /deep/ .el-input__inner {
    border-radius: 0;
  }

  // 修改列表页面表格样式
  /deep/ .el-table {
    border: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }

  /deep/ .el-table--border th {
    background: #2CB1F5 !important;
    color: #fff;
    font-weight: 400;
    border-right: 1px solid rgba(220, 223, 230, 0.21);
  }

  /deep/ .el-table__row {
    &:nth-child(even) {
      background: rgb(235, 248, 255) !important;
    }
  }

  /deep/ .el-table--border td {
    border: none;
    box-sizing: border-box;

    &:first-child {
      border-right: rgb(217, 242, 255) 1px solid !important;
    }

    &:last-child {
      border-left: rgb(217, 242, 255) 1px solid !important;
    }
  }

  .spanButton {
    color: #05AAFF;
  }

  .shu {
    margin: 0 10px;
    color: #ccc;
  }

  // 分页样式
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    /deep/ .el-pagination__total {
      flex: 1
    }

    .totalText {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 20px;
      color: rgba(68, 68, 68, 1);

      span {
        margin-right: 20px;
      }
    }

    /deep/ .el-pagination.is-background .btn-next,
    /deep/ .el-pagination.is-background .btn-prev,
    /deep/ .el-pagination.is-background .el-pager li {
      background: none;
      border: #D5D5D5 1px solid;
      color: #8B8B8B;
      font-size: 12px;
      font-weight: normal;
    }

    /deep/ .el-pagination.is-background .el-pager li.active {
      background: #05AAFF;
      color: #fff;
      border: #05AAFF 1px solid;
    }

    /deep/ .el-card.is-always-shadow,
    /deep/ .el-card.is-hover-shadow:focus,
    /deep/ .el-card.is-hover-shadow:hover {
      box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;
    }
  }

  // 全局文字颜色和背景颜色的公用样式
  .col_skyblue {
    color: #05AAFF !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_green {
    color: rgb(133, 206, 97) !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_blue {
    color: #008DD6 !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_orange {
    color: #FF8527 !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_red {
    color: #FF6B6B !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_black {
    color: rgb(180, 180, 180) !important;

    &:hover {
      opacity: 0.5;
    }
  }

  // 公用背景颜色样式
  .bg_orange {
    background: #FD903C;
    margin-right: 10px; // 单独设置本页面
    color: #fff;

    &:hover {
      background: #FD903C;
      opacity: 0.5;
    }
  }

  .bg_gray {
    background: rgb(180, 180, 180);
    color: #fff;

    &:hover {
      background: rgba(180, 180, 180, .5);
    }
  }

  .bg_blue {
    background: #05AAFF;
    color: #fff;

    &:hover {
      background: #05AAFF;
      opacity: 0.5;
    }
  }

  .character {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .control {
    border: none;

    /deep/ .el-card__header {
      border-bottom: none;
      background: rgb(237, 249, 255);
    }
  }

  .df {
    display: flex;
  }

  // 针对本页面弹出框专门设置样式
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #ddd;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    padding:10px 10px;
    .el-dialog__title{
      color:#fff;
      font-size:14px;
    }
    .el-dialog__headerbtn{
      top:15px;
      background: #fff;
      border-radius: 100%;
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-dialog__close{
        font-size:12px;
        color:#05AAFF;
        margin-top: 2px;
      }
    }
  }

  /deep/ .el-dialog__body {
    padding: 30px 180px !important;
  }

  /deep/ .el-dialog__footer {
    border-top: 1px solid #ddd;
  }

  /deep/ .el-form-item__label {
    color: rgba(0, 0, 0, .85)
  }

  /deep/ label {
    font-weight: normal;
  }

  .state_name_class1,
  .state_name_class2 {
    width: 175px;
  }

  .state_name_class2 {
    width: 200px;
    padding-left: 24px;
  }

  /deep/ .el-button--medium {
    padding: 8px 20px;
  }


  /*--------------------*/
  ul{
    padding: 0;
    margin: 0;
  }
  ul li{
    list-style: none;
  }
  .search-box{
    box-shadow:0 2px 12px rgba(5,170,255,0.08);
  }
  .search-bar {
    display: flex;
    align-items: center;

    /deep/ .el-form-item {
      margin-bottom: 0;
    }

    .btn {
      border: 0;
      border-radius: 0;
      font-size: 16px;
      color: #fff;
    }

    .search {
      display: flex;
      margin-right: 20px;

      /deep/ .el-form-item__content {
        display: flex;
      }

      .search_input {
        border-right: 0;
        padding-left: 20px;
      }
    }
  }
  .hot-search-list {
    display: flex;
    justify-content: flex-start;
    font-size: 12px;
    color: #042B40;
    margin-top: 4px;

    .list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .item {
        color: #979797;
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
  .bt_blue {
    min-width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }
  .handle-bar {
    margin-top: 6px;
    background: #fff;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(5, 170, 255, 0.08);
    box-shadow:0 1px 1px rgba(5,170,255,0.08);

    .left {
      display: flex;
      align-items: center;

      .search-total {
        font-size: 14px;
        color: rgba(68, 68, 68, 0.75);
        margin-right: 40px;
        padding-left: 20px;

        .num {
          color: #F56C6C;
          margin: 0 4px;
        }
      }

      .btn {
        min-width: 50px;
        height: 30px;
        border-radius: 2px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 20px;
        padding: 0 6px;

        &.blue {
          border: 1px solid #05AAFF;
          color: #05AAFF;

          &.active, &:hover {
            color: #fff;
            background: #05AAFF;
          }
        }

        &.red {
          border: 1px solid #F56C6C;
          color: #F56C6C;

          &.active, &:hover {
            color: #fff;
            background: #F56C6C;
          }
        }
      }
    }

    .select-sort {
      /deep/ .el-input__inner {
        border: 0;
        font-size: 16px;
        color: #05AAFF;
        text-align: right;
      }
    }

  }
  .list-box{
    background: #fff;
    .list-title{
      color: #05AAFF;
      font-size: 16px;
      display: flex;
      border-bottom: 1px solid rgba(68,68,68,0.15);
      padding: 13px 0;
      .item{
        flex: 1;
        padding:0 10px;
        &:first-child{
          /*padding-left: 88px;*/
        }
      }
    }

    .list-detail {
      .cate-item {
        /*padding: 0 10px;*/
        border-bottom: 1px solid rgba(68,68,68,.15);
        .person {
          display: flex;
          padding:10px 0;
          .item {
            display: flex;
            align-items: center;
            flex:1;
            padding:0 10px;
            &.title {
              .sanjiao{
                display: inline-block;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-top-color: rgba(68,68,68,0.75);
                cursor: pointer;
                margin-right: 6px;
                margin-top: 6px;
                transition: all 1s ease 0s;

                &.right{
                  transition: 0.2s;
                  transform-origin:46% 28%;
                  transform: rotateZ(-90deg);
                }
                &.down{
                  transition: 0.2s;
                  transform-origin:46% 28%;
                  transform: rotateZ(0deg);
                }
              }
              .no-sanjiao{
                width: 11px;
                height: 11px;
                display: inline-block;
                margin-right: 6px;
              }
              .num {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: rgba(105, 204, 255, 1);
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
              }
              .type-name{
                cursor: pointer;
                flex:1;
                &:hover{
                  color: #05AAFF;
                }
              }
            }
            .table-handle-bar{
              display: flex;
              align-items: center;
              width:100%;
              .item-bar{
                font-size: 14px;
                margin-right: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                &.add,&.edit{
                  color: #05AAFF;
                }
                &.del{
                  color: #F56C6C;
                }
                &.sort{
                  color: #FFA96A;
                }
                img{
                  vertical-align: baseline;
                  margin-right:5px;
                }
              }
            }
            &:last-child{
              flex:1;
            }
          }
        }

        .children {
          margin-bottom: 10px;
          background: #E9F8FF;
          .floor{
            .person{
              .item:first-child{
                /*padding-left: 37px;*/
              }
              .item{
                .num{
                  width:24px;
                  height:24px;
                  background:rgba(145,229,161,1);
                  border-radius: 50%;
                  margin-right: 5px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                }
              }
            }
            &:last-child{
              margin-bottom: 0;
            }
          }
          .floor:nth-child(even){
            background: #DEE6FF;
            &:hover{
              background: #C5D4FF;
            }
          }
          .floor:nth-child(odd){
            background: #EFFAFF;
            &:hover{
              background: #CDEEFF;
            }
          }
        }
      }
    }
  }

  .route-list{
    margin-top: 10px;
    background: #fff;
    padding: 10px 20px;
    display: flex;
    font-size: 14px;
    cursor: pointer;
    .item:hover{
      color: #05AAFF;
    }
  }

  .roleChoose{
    border: 1px solid #C0C4CC;
    padding: 10px;
    border-radius: 4px;
  }

  .noMore{
    text-align: center;
    padding:20px 0;
  }

</style>
