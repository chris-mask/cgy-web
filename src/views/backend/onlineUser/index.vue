<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <div class="headerLeft">
          当前在线人数：<span style="color: red;">{{innerUserCount}}</span>人
        </div>
        <div class="headerRig">
          <el-button size='small' type="primary" @click="getOnlineUserList">刷新</el-button>
        </div>
      </div>
      <div class="materielTable">
        <el-table :data="onlineUserList" v-loading="listLoading" border fit highlight-current-row row-key="roleId">
          <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
          <el-table-column align="center" min-width="100px" label="公司名称" prop="companyName">
            <template slot-scope="scope">
              <span>{{scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="登录名称" prop="loginName">
            <template slot-scope="scope">
              <span>{{scope.row.loginName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="用户名称" prop="userName">
            <template slot-scope="scope">
              <span>{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="电话号码" prop="phoneNumber">
            <template slot-scope="scope">
              <span>{{scope.row.phoneNumber}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { queryOnlineUserList } from '@/api/onlineUser'


  export default {
    name: 'index',
    data() {
      return {
        onlineUserList: [],
        innerUserCount: 0,
        listLoading: false
      }
    },
    activated() {
      this.getOnlineUserList()
    },
    methods: {
      // 获取在线用户列表
      getOnlineUserList() {
        this.listLoading = true
        queryOnlineUserList({}).then(res => {
          if (res.code === 200) {
            this.onlineUserList = res.data.innerUserList;
          }
          this.townGetOnlineUserList()
        })
      },
      // 处理两个节点获取不一样的问题， 第二次获取
      townGetOnlineUserList() {
        queryOnlineUserList({}).then(response => {
          if (response.code === 200) {
            let newUserList = response.data.innerUserList
            newUserList.map((el, index) => {
              if (!this.onlineUserList.find(item => item.userId == el.userId)) {
                this.onlineUserList.push(newUserList[index]);
              }
            })
          }
          this.threeGetOnlineUserList()
        })
      },

      // 第三次获取
      threeGetOnlineUserList(){
        queryOnlineUserList({}).then(response => {
          if (response.code === 200) {
            let newUserList = response.data.innerUserList
            newUserList.map((el, index) => {
              if (!this.onlineUserList.find(item => item.userId == el.userId)) {
                this.onlineUserList.push(newUserList[index]);
              }
            })
          }
          this.listLoading = false
          this.innerUserCount = this.onlineUserList.length
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  /deep/ .clearfix:after {
    display: none;
  }

  /deep/ .el-input {
    width: auto;
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
  }

  .headerLeft {
    .searchInput {
      margin-right: 10px;
    }
  }

  .headerRig {
    .choose {
      margin-right: 22px;
    }
  }

  // 修改列表页面表格样式
  /deep/ .el-table {
    border: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }

  /deep/ .el-table--border th,
  /deep/ .el-table th {
    background: #2CB1F5 !important;
    color: #fff;
    font-weight: 400;
    border-right: 1px solid rgba(220, 223, 230, 0.21);
    padding: 7px 0;
  }

  /deep/ .el-table__row:nth-child(even) {
    background: rgb(235, 248, 255) !important;
    border: 1px solid rgba(0, 141, 214, 0.26666666666666666);
  }

  /deep/ .el-table--border td {
    border: none;
    box-sizing: border-box;
  }

  /deep/ .el-table--border td:first-child {
    border-right: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table--border td:last-child {
    border-left: rgb(217, 242, 255) 1px solid !important;
  }

  .spanButton {
    color: #05AAFF;
  }

  .shu {
    margin: 0 10px;
    color: #ccc;
  }

  .col_red {
    color: #FF6B6B !important;
  }

  .col_red:hover {
    opacity: 0.5;
  }

  .col_skyblue {
    color: #05AAFF !important;
  }

  .col_skyblue:hover {
    opacity: 0.5;
  }

  .colUpDown {
    color: #FD903C !important;
  }

  .colUpDown:hover {
    opacity: 0.5;
  }

  // 分页样式
  /deep/ .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  /deep/ .el-pagination__total {
    flex: 1
  }

  .totalText {
    font-size: 14px;
    font-family: 'PingFang SC';
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
  }

  .totalText span {
    margin-right: 20px;
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

  /deep/ .el-table .sort-caret.ascending {
    border-bottom-color: #fff;
  }

  /deep/ .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #409EFF !important;
  }

  /deep/ .el-table .descending .sort-caret.descending {
    border-top-color: #409EFF !important;
  }

  /deep/ .el-table .sort-caret.descending {
    border-top-color: #fff;
  }

  /deep/ .el-table .cell {
    /*text-align: left;*/
  }

  /deep/ .el-table .el-table__expand-icon {
    display: none;
  }

  // 针对本页面项目名称和产品名称单独设置
  .projectName {
    cursor: pointer;

    .showOrHiden {
      display: inline-block;
      color: #333;
      margin-right: 10px;
    }
  }

  .productName {
    padding-left: 24px;
    color: #333;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
      /*text-decoration: underline;*/
    }
  }
</style>
