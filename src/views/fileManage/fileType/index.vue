<template>
  <div class="app-container">
    <!--搜索-->
    <el-card class="search-box top-margin-10 center-items">
      <el-form class="search-bar" @submit.native.prevent>
        <el-form-item class="search">
          <input type="text" @keyup.enter="handleSearch" clearable v-model="folderName" class="search_input width-400"
                 placeholder="请输入分类名称">
          <el-button class="btn bt_blue" @click="handleSearch"><span class="bt_font">搜一下</span></el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn bt_blue" @click="goAddFile" v-if="allowAdd.twoAllow"><span class="bt_font">新增文件分类</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!--搜索记录总数、操作栏-->
    <div class="handle-bar">
      <div class="left">
        <div class="search-total">搜索到<span class="num">{{total}}</span>条记录</div>
        <div class="btn blue" @click="showALLHandle">
          {{isShowAllText?'全选展开':'全选收缩'}}
        </div>

      </div>
    </div>

    <!--路径-->
    <div class="route-list">
      <div class="item" @click="handleRouteItem(item.val)" v-for="item in routerList">
        {{item.key}}
      </div>
    </div>

    <!--列表-->
    <!--列表-->
    <div class="list-box">
      <div class="list-title">
        <div class="item">名称</div>
        <div class="item">分类管理角色</div>
        <div class="item">分类查看角色</div>
        <div class="item">文件管理角色</div>
        <div class="item">文件查看角色</div>
        <div class="item">操作</div>
      </div>
      <div class="list-detail">
        <div class="cate-item" v-for="(item,index) in tableData">
          <div class="person">
            <div class="item title">
              <span @click="isShowHandle(item)" :class="item.show?'sanjiao down' : 'sanjiao right'"
                    v-if="item.child && item.child.length !== 0"></span>
              <span v-else class="no-sanjiao"></span>
              <span class="num">{{index+1}}</span>
              <span class="type-name" @click="handleName(item)" :title="item.folderName">{{item.folderName}}</span>
            </div>
            <div class="item" :title="item.folderManageRoleNames">
              <span class="folderName">{{item.folderManageRoleNames}}</span>
            </div>
            <div class="item" :title="item.folderViewRoleNames">
              <span class="folderName">{{item.folderViewRoleNames}}</span>
            </div>
            <div class="item" :title="item.fileManageRoleNames">
              <span class="folderName">{{item.fileManageRoleNames}}</span>
            </div>
            <div class="item" :title="item.fileViewRoleNames">
              <span class="folderName">{{item.fileViewRoleNames}}</span>
            </div>
            <div class="item">
              <div class="table-handle-bar">
                <div class="item-bar add" @click="goAddSonCategory(item)" v-if="allowAdd.twoAllow">+新增子项</div>
                <div class="item-bar edit" @click="handleEdit(item)" v-if="allowUpdate.twoAllow">
                  <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/编辑_20200525162921_318.png"/>
                  编辑
                </div>
                <div class="item-bar del" @click="handleDelete(item.folderId)" v-if="allowDelete.twoAllow">
                  <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/删除_20200526093710_164.png"/>
                  删除
                </div>
                <div class="item-bar sort" @click="handleSort(item,1)" v-if="allowUpDown.twoAllow">
                  <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/消息中心/up_20200529111546_129.png"/>
                  上升
                </div>
                <div class="item-bar sort" @click="handleSort(item,2)" v-if="allowUpDown.twoAllow">
                  <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/消息中心/down_20200529111652_391.png"/>
                  下降
                </div>
              </div>
            </div>
          </div>
          <div class="children" v-if="item.child && item.child.length !== 0 && item.show">
            <div class="floor" v-for="(child,index) in item.child">
              <div class="person">
                <div class="item">
                  <span class="num">{{index+1}}</span>
                  <span class="folderName"> {{child.folderName}}</span>
                </div>
                <div class="item" :title="child.folderManageRoleNames">
                  <span class="folderName">{{child.folderManageRoleNames}}</span>
                </div>
                <div class="item" :title="child.folderViewRoleNames">
                  <span class="folderName">{{child.folderViewRoleNames}}</span>
                </div>
                <div class="item" :title="child.fileManageRoleNames">
                  <span class="folderName">{{child.fileManageRoleNames}}</span>
                </div>
                <div class="item" :title="child.fileViewRoleNames">
                  <span class="folderName">{{child.fileViewRoleNames}}</span>
                </div>
                <div class="item">
                  <div class="table-handle-bar">
                    <!--                    <div class="item-bar add" style="width: 64px;"></div>-->
                    <div class="item-bar edit" @click="handleEdit(child)" v-if="allowUpdate.twoAllow">
                      <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/编辑_20200525162921_318.png"/>
                      编辑
                    </div>
                    <div class="item-bar del" @click="handleDelete(child.folderId)" v-if="allowDelete.twoAllow">
                      <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/删除_20200526093710_164.png"/>
                      删除
                    </div>
                    <div class="item-bar sort" @click="handleSort(child,1)" v-if="allowUpDown.twoAllow">
                      <img
                        src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/消息中心/up_20200529111546_129.png"/>
                      上升
                    </div>
                    <div class="item-bar sort" @click="handleSort(child,2)" v-if="allowUpDown.twoAllow">
                      <img
                        src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/消息中心/down_20200529111652_391.png"/>
                      下降
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!--        <div class="noMore" v-if="tableData.length == 0 || tableData == ''">-->
        <!--          没有更多-->
        <!--        </div>-->
      </div>
      <!--加载更多-->
      <div class="get-more" v-if="tableData.length >= total">
        没有更多
      </div>
      <div v-else class="get-more" @click="getMore">
        加载更多
      </div>
    </div>


  </div>
</template>

<script>
  import {folderListAndChildTree, deleteCategory, goUpOrDown} from '@/api/fileManage'

  const floorNum = 0
  export default {
    data() {
      return {
        index: 1,
        listQuery: {
          page: 1,
          pageSize: 10,
          folderId: '',
          companyId: this.$store.getters.companyId
        },
        tableData: [],
        // 路径
        routerList: [
          {'key': '根目录/', 'val': null}
        ],
        // 总条数
        total: '',
        isShowAllText: false,
        folderName: '',

        //临时存放
        tempData: [],

        allowAdd: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:FILECLASS', 'SYSTEM:FILE:FILECLASS:INSERT'),//新建文件分类
        allowUpdate: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:FILECLASS', 'SYSTEM:FILE:FILECLASS:UPDATE'),//更新文件分类
        allowDetail: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:FILECLASS', 'SYSTEM:FILE:FILECLASS:DETAILS'),//查看文件分类详情
        allowDelete: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:FILECLASS', 'SYSTEM:FILE:FILECLASS:DELETE'),//删除分类
        allowUpDown: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:FILECLASS', 'SYSTEM:FILE:FILECLASS:UPORDOWN'),//分类上升下降
      }
    },
    filters: {},
    activated() {

      // this.listQuery.page = 1;
      // this.listQuery.pageSize = 10;
      if(this.$store.getters.fileTypePage != 0){
        this.listQuery.page = 1;
        this.listQuery.pageSize = this.$store.getters.fileTypePage;
        this.getList();
      }else{
        this.listQuery.page = 1;
        this.listQuery.pageSize = 4;
        this.getList();
      }
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_FILETYPE_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_FILETYPE_PAGE', this.tempData.length) //离开路由时把位置存起来
      next()
    },
    methods: {
      // 搜索
      handleSearch() {
        this.listQuery.page = 1;
        this.listQuery.pageSize = 10;
        this.listQuery.folderName = this.folderName;
        this.getList()
      },

      // 获取文件列表
      getList() {
        folderListAndChildTree(this.listQuery).then(res => {
          if (res.code == 200) {
            if (this.listQuery.page > 1) {
              this.tempData = this.tempData.concat(res.data.data);
            } else {
              this.tempData = res.data.data;

              // if(this.$store.getters.fileTypePage != 0){
              //   // this.listQuery.page = this.$store.getters.fileTypePage;
              //   // this.listQuery.pageSize = 4;
              // }
            }
            this.recursionList(this.tempData, floorNum);
            this.total = res.data.total;
          } else {
            this.$message.error(res.message ? res.message : '获取数据失败,请联系系统管理员!')
          }
        })
      },

      //获取更多
      getMore() {
        this.listQuery.page += 1;
        this.getList();
      },

      // 递归循环处理列表
      recursionList(data, floorNum) {
        const that = this
        that.tableData = data.map((item) => {
          item.floor = floorNum + 1
          item.show = true
          if (item.child && item.child.length !== 0) {
            that.recursionList(item.child, item.floor)
          }
          return item
        })
      },

      // 删除
      handleDelete(id) {
        this.$confirm('是否确认删除该文件分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            folderId: id,
            companyId: this.$store.getters.companyId
          }
          deleteCategory(params).then(res => {
            if (res.code == 200) {
              this.$message({type: 'success', message: '删除成功'})
              this.getList()
            } else {
              this.$message({type: 'error', message: res.message})
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      // 上升 下降
      handleSort(row, status) {
        const params = {
          operationType: status,
          parentId: row.parentId,
          folderId: row.folderId,
          levelNum: row.levelNum
        }
        goUpOrDown(params).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: res.message})
            this.getList()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 收缩、展开
      isShowHandle(data) {
        this.tableData = this.tableData.map(item=>{
          if(item.folderId == data.folderId){
            item.show = !item.show;
          }
          return item;
        })
      },

      // 点击父级名称
      handleName(item) {
        let flag = true;
        // this.listQuery.folderName = item.folderName
        const obj = {
          key: `${item.folderName}/`,
          val: item.folderId
        }

        if (item.child != '') {
          this.routerList.forEach(data => {
            if (data.val != obj.val) {
              flag = true;
            } else {
              flag = false;
            }
          })

          if (flag) {
            this.routerList.push(obj)
          }

          this.listQuery.folderId = item.folderId;
          this.listQuery.levelNum = item.levelNum;

          this.listQuery.page = 1;
          this.listQuery.pageSize = 10;

          this.getList()
        }
      },

      // 点击路径上的名称
      handleRouteItem(name) {
        this.listQuery.folderId = name
        this.routerList.forEach((item, index) => {
          if (name === item.val) {
            this.routerList = this.routerList.slice(0, index + 1)
          }
        })
        this.getList()
      },

      // 点击全选展开
      showALLHandle() {
        this.isShowAllText = !this.isShowAllText
        this.tableData.forEach(item => {
          item.show = !item.show
        })
      },

      //跳转新建页面
      goAddFile() {
        this.$router.push({
          path: '/file/addFileType'
        })
      },

      //新建子项
      goAddSonCategory(item) {
        this.$router.push({
          path: '/file/addFileType',
          query: {
            parentId: item.folderId,
            parentIds: item.parentIds,
            levelNum: item.levelNum + 1,
            parentName: item.parentName == null ? item.folderName : item.parentName
          }
        })
      },

      //跳转编辑页面
      handleEdit(item) {
        this.$router.push({
          path: '/file/editFileType',
          query: {
            folderId: item.folderId,
            parentId: item.parentId,
            parentIds: item.parentIds,
            levelNum: item.levelNum,
            folderName: item.folderName
          }
        })
      }

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
    padding: 10px 10px;

    .el-dialog__title {
      color: #fff;
      font-size: 14px;
    }

    .el-dialog__headerbtn {
      top: 15px;
      background: #fff;
      border-radius: 100%;
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-dialog__close {
        font-size: 12px;
        color: #05AAFF;
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
  ul {
    padding: 0;
    margin: 0;
  }

  ul li {
    list-style: none;
  }

  .search-box {
    box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
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
    box-shadow: 0 1px 1px rgba(5, 170, 255, 0.08);

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

  .list-box {
    background: #fff;

    .list-title {
      color: #05AAFF;
      font-size: 16px;
      display: flex;
      border-bottom: 1px solid rgba(68, 68, 68, 0.15);
      padding: 13px 0;

      .item {
        text-align: center;
        width: 25%;

        &:first-child {
          /*padding-left: 88px;*/
        }
      }
    }

    .list-detail {
      .cate-item {
        padding: 0 10px;
        border-bottom: 1px solid rgba(68, 68, 68, .15);

        .person {
          display: flex;
          /*height: 45px;*/
          padding: 10px 0;

          .item {
            /*width: 25%;*/
            display: flex;
            align-items: center;
            flex: 1;
            flex-wrap: wrap;

            .folderName {
              width: 195px;
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            &.title {
              .sanjiao {
                display: inline-block;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-top-color: rgba(68, 68, 68, 0.75);
                cursor: pointer;
                margin-right: 6px;
                margin-top: 6px;
                transition: all 1s ease 0s;

                &.right {
                  transition: 0.2s;
                  transform-origin: 46% 28%;
                  transform: rotateZ(-90deg);
                }

                &.down {
                  transition: 0.2s;
                  transform-origin: 46% 28%;
                  transform: rotateZ(0deg);
                }
              }

              .no-sanjiao {
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

              .type-name {
                width: 195px;
                flex: 1;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                cursor: pointer;
                /*font-weight: bold;*/

                &:hover {
                  color: #05AAFF;
                }
              }
            }

            .table-handle-bar {
              display: flex;
              align-items: center;
              width: 100%;
              flex-wrap: wrap;

              .item-bar {
                font-size: 14px;
                margin-right: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                /*margin-bottom: 10px;*/

                &.add, &.edit {
                  color: #05AAFF;
                }

                &.del {
                  color: #F56C6C;
                }

                &.sort {
                  color: #FFA96A;
                }

                img {
                  vertical-align: baseline;
                  margin-right: 5px;
                }
              }
            }
          }
        }

        .children {
          margin-bottom: 10px;
          background: #E9F8FF;

          .floor {
            .person {
              .item:first-child {
                padding-left: 37px;
              }

              .item {
                .num {
                  width: 24px;
                  height: 24px;
                  background: rgba(145, 229, 161, 1);
                  border-radius: 50%;
                  margin-right: 5px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                }
              }
            }

            &:last-child {
              margin-bottom: 0;
            }
          }

          .floor:nth-child(even) {
            background: #DEE6FF;

            &:hover {
              background: #C5D4FF;
            }
          }

          .floor:nth-child(odd) {
            background: #EFFAFF;

            &:hover {
              background: #CDEEFF;
            }
          }
        }
      }
    }
  }

  .route-list {
    margin-top: 10px;
    background: #fff;
    padding: 10px 20px;
    display: flex;
    font-size: 14px;
    cursor: pointer;

    .item:hover {
      color: #05AAFF;
    }
  }

  .roleChoose {
    border: 1px solid #C0C4CC;
    padding: 10px;
    border-radius: 4px;
  }

  .noMore {
    text-align: center;
    padding: 20px 0;
  }

  .get-more {
    padding: 30px 0;
    text-align: center;
    cursor: pointer;
  }

</style>
