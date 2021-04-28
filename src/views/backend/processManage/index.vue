<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row type="flex" justify="space-between" class="filterList">
        <div class="df">
          <el-input v-model="flowName" @keyup.enter.native="handleSearch" clearable placeholder="请输入流程名称"></el-input>
          <el-button class="filter-item bg_blue" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <div class="df">
          <el-button class="filter-item bg_blue" @click="goAdd" v-if="allowAdd.twoAllow">新增流程</el-button>
        </div>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-table
        :data="tableData"
        border
        :default-expand-all="false"
      >
        <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
        <el-table-column label="流程名称">
          <template slot-scope="scope">
            <span class="spanButton" @click="goDetail(scope.row.flowId)">{{ scope.row.flowName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="限时">
          <template slot-scope="scope">
            <span>{{ scope.row.timeLimit }}小时</span>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <span v-html="scope.row.flowDesc">{{ scope.row.flowDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="spanButton" @click="goEdit(scope.row.flowId)" v-if="allowUpdate.twoAllow">编辑</span>
            <span class="shu">|</span>
            <span class="spanButton col_red" @click="deleteFlow(scope.row.flowId)" v-if="allowDelete.twoAllow">删除</span>
            <span class="shu">|</span>
            <span class="spanButton colUpDown" @click="goUpOrDown(scope.row.flowId,1)" v-if="allowUpDown.twoAllow">上升</span>
            <span class="shu">|</span>
            <span class="spanButton colUpDown" @click="goUpOrDown(scope.row.flowId,2)" v-if="allowUpDown.twoAllow">下降</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <div class="totalText">
          <span>总数：{{ total }}</span>
          <span>总页数:{{ Math.ceil(total / pageSize) || Math.ceil(total / 10) }}</span>
          <span>当前页：{{ page || 1 }}</span>
        </div>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="page" :page-sizes="[10,20,30, 50]" :page-size="pageSize"
                       layout="prev, pager, next, sizes, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {commonDict} from '@/api/utils'
  import {queryFlowInfo,deleteFlowInfo,upOrDown} from '@/api/processManage'

  export default {
    data() {
      return {
        listQuery: {},
        rules: {},
        dialogFormVisible: false,
        addForm: {},
        tableData: [],
        editState: false,
        total: 0,
        pageSize: 10,
        page: 1,
        orderField:'',
        orderType:'',
        flowName:'',

        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:INSERT'),//新增流程
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:UPDATE'),//编辑流程
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:DELETE'),//删除流程
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:LIST'),//流程信息列表
        allowUpDown: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:UPORDOWN'),//上升或者下降
        allowExport: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:EXPORT'),//导出
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:DETAILS'),//流程详情
        allowUploadOrder: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:UPDATEFLOWANDUPDATEORDER'),//修改流程信息并同步覆盖未完成订单
      }
    },
    activated() {
      this.getFlowList()
    },
    methods: {
      goAdd() {
        this.$router.push({
          path: '/backend/process/addProcess'
        })
      },
      handleSearch() {
        this.page = 1;
        this.pageSize = 10;
        this.getFlowList()
      },

      //获取列表
      getFlowList(){
        if(!this.allowGetList.twoAllow){
          this.$message.warning('抱歉，您没有权限获取此列表');
          return;
        }
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          orderField: this.orderField,
          orderType: this.orderType,
          flowName: this.flowName,
        }
        queryFlowInfo(params).then(res=>{
          if(res.code == 200){
            this.tableData = res.data.data;
            this.total = res.data.total;
          }
        })
      },

      //删除流程
      deleteFlow(id){
        this.$confirm('是否确定删除此流程', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFlowInfo({flowId:id}).then(res=>{
            if(res.code == 200){
              this.$message.success('删除成功');
              this.getFlowList();
            }else{
              this.$message.warning(res.message)
            }
          })
        })
      },

      //跳转到编辑页面
      goEdit(id){
        this.$router.push({
          path: '/backend/process/editProcess',
          query:{
            flowId: id
          }
        })
      },

      //跳转详情页面
      goDetail(id){
        this.$router.push({
          path: '/backend/process/processDetail',
          query:{
            flowId: id,
            detail: true
          }
        })
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.getFlowList();
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.page = val
        this.getFlowList();
      },

      goUpOrDown(id,type){
        let params = {
          flowId: id,
          operationType: type
        }
        upOrDown(params).then(res=>{
          if(res.code == 200){
            this.$message.success(res.message);
            this.getFlowList();
          }else{
            this.$message.warning(res.message)
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
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

  .colUpDown {
    color: #FD903C !important;
  }

  .colUpDown:hover {
    opacity: 0.5;
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
</style>
