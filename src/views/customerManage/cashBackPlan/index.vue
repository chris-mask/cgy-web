<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="headerTop">
        <el-row type="flex" justify="space-between" class="filterList">
          <div class="df">
            <el-select v-model="value" placeholder="客户名称" clearable filterable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="选择部门" clearable filterable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="选择员工" clearable filterable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button class="filter-item bg_blue" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </div>
          <div class="df">
            <el-button class="filter-item bg_blue" icon="el-icon-folder-add" @click="openAdd">新增</el-button>
            <el-button class="filter-item bg_blue" icon="el-icon-download">导出</el-button>
          </div>
        </el-row>
      </div>
      <el-table
        :data="tableData"
        border
        :default-expand-all="false"
      >
        <!--        <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>-->
        <el-table-column label="客户名称">
          <template slot-scope="scope">
            <span class="spanButton" @click="goDetail(scope.row.flowId)">{{ scope.row.flowName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="签订人">
          <template slot-scope="scope">
            <span>{{ scope.row.timeLimit }}小时</span>
          </template>
        </el-table-column>
        <el-table-column label="合同名称">
          <template slot-scope="scope">
            <span v-html="scope.row.flowDesc">{{ scope.row.flowDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同金额">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计划回款日期">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计划回款金额">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计划回款占比">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="spanButton" @click="goEdit(scope.row.flowId)">查看</span>
            <span class="shu">|</span>
            <span class="spanButton" @click="goEdit(scope.row.flowId)">编辑</span>
            <span class="shu">|</span>
            <span class="spanButton col_red" @click="deleteFlow(scope.row.flowId)">删除</span>
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

    <el-dialog
      title="新增/编辑/查看"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="cashForm" :model="cashForm" :rules="rules" class="demo-ruleForm">
          <el-form-item label="合同名称:" prop="fileDesc">
            <el-select v-model="value" placeholder="请选择合同" clearable filterable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划回款日期:" prop="fileDesc">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择计划回款日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="计划回款金额:" prop="fileDesc">
            <el-input type="number" placeholder="计划回款金额"></el-input>
          </el-form-item>
          <el-form-item label="计划回款占比:" prop="fileDesc">
            <el-input type="number" placeholder="计划回款占比">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        total:0,
        page:0,
        pageSize:20,
        tableData:[],
        dialogVisible: false,
        cashForm:{},
        rules:{}
      }
    },
    methods:{
      //打开新增弹窗
      openAdd(){
        this.dialogVisible = true;
      },
      handleClose(done) {
        this.dialogVisible = !this.dialogVisible;
      }
    }
  }
</script>


<style lang="less" scoped>
  /deep/ .el-form-item {
    display: flex;
    margin-right: 14px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
    display:flex;
  }

  /deep/ .el-form-item__label {
    min-width: 105px;
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
    /*padding: 30px 180px !important;*/
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

  /deep/ .el-select .el-input .el-select__caret{
    line-height: initial;
  }
</style>
