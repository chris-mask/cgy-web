<template>
  <div class="app-container copyright_content">
    <el-card class="box-card">
      <el-row :gutter="10" class="filterList character">
        <el-col :span="3">
          <el-select @change='handleFilter' filterable clearable class="filter-item" v-if="user_list"
                     v-model="listQuery.sign_user" placeholder="选择签订人">
            <el-option v-for="item in user_list" :key="item.biz_id" :label="item.user_name"  :value="item.biz_id"></el-option>
          </el-select>&nbsp;
        </el-col>
        <el-col :span="3">
          <el-input class="filter-item" @keyup.enter.native="handleFilter" placeholder="合同名称" v-model="listQuery.title">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-input class="filter-item" @keyup.enter.native="handleFilter" placeholder="项目名称" v-model="listQuery.project_name">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select @keyup.enter.native="handleFilter" filterable clearable class="filter-item" v-model="listQuery.invoice_type" placeholder="选择开票类型">
            <el-option v-for="item in invoice_type_list" :key="item.biz_id" :label="item.dict_value" :value="item.biz_id" > </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item bg_blue" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="success" v-if="can_create" icon="el-icon-edit" @click="handleCreate">创建</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item bg_blue" icon="el-icon-search" v-if="can_export_invoice" @click="handleExport">导出</el-button>
        </el-col>
      </el-row>
      <el-table :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" label="签订人">
          <template slot-scope="scope">
            <span>{{scope.row.contract_item__contract_info__sign_user__user_name}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="合同名称">
          <template slot-scope="scope">
            <span>{{scope.row.contract_item__contract_info__title}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="项目名称">
          <template slot-scope="scope">
            <span>{{scope.row.contract_item__apply_report__policy_project__project_item__project_library__project_name}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="合同补贴金额">
          <template slot-scope="scope">
            <span>{{scope.row.contract_item__apply_report__policy_project__project_item__subsidy_total}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="开票类型">
          <template slot-scope="scope">
            <span>{{scope.row.invoice_type}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="本次开票金额">
          <template slot-scope="scope">
            <span>{{scope.row.this_money}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="本次开票点数">
          <template slot-scope="scope">
            <span>{{scope.row.invoice_point}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="本次开票日期">
          <template slot-scope="scope">
            <span>{{scope.row.this_date}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <span class="spanButton col_blue" v-if="can_edit" @click="handleCheck(scope.row.biz_id)">查看</span>
            <span class="shu" v-if="can_edit">|</span>
            <span class="spanButton col_blue" v-if="can_edit" @click="handleUpdate(scope.row.biz_id)">编辑</span>
            <span class="shu" v-if="can_delete">|</span>
            <span class="spanButton col_red"  v-if="can_delete" @click="handleDel(scope.row.biz_id)">删除</span>
          </template>

        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <div class="totalText">
          <span>总数：{{ total }}</span>
          <span>总页数:{{ Math.ceil(total / listQuery.limit) || Math.ceil(total / 10) }}</span>
          <span>当前页：{{ listQuery.page || 1 }}</span>
        </div>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="prev, pager, next, sizes, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 编辑弹出框 -->
    <el-dialog v-dialogDrag title="编辑" :visible.sync="userDialogVisible" width="900px">
      <el-form :model="detailForm" ref="detailForm" label-width="160px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="合同名称：" prop="title">
              <el-button icon="el-icon-search"  @click="handleSearch()" v-if="!is_check">选择</el-button>
              <span>{{detailForm.contract_info__title}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="项目名称：" prop="project_name">
              <span>{{detailForm.apply_report__policy_project__project_item__project_library__project_name}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
          <el-form-item label="合同签订人：" prop="sign_user_name">
            <span>{{detailForm.contract_info__sign_user__user_name}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="10">
          <el-form-item label="合同补贴金额：" prop="subsidy_total">
            <span>{{detailForm.apply_report__policy_project__project_item__subsidy_total}}万元</span>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="开票点数：" prop="invoice_point">
              <el-input type="number" v-model="detailForm.invoice_point" :disabled="is_check">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="开票金额：" prop="this_money">
              <el-input type="number"  v-model="detailForm.this_money" :disabled="is_check">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="开票类型：" prop="invoice_type">
              <el-select filterable clearable class="filter-item" v-model="detailForm.invoice_type" placeholder="选择开票类型" :disabled="is_check">
                <el-option v-for="item in invoice_type_list" :key="item.biz_id" :label="item.dict_value" :value="item.dict_value"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="开票日期：" prop="this_date">
              <el-date-picker type="date" v-model="detailForm.this_date" placeholder="开票日期" value-format="yyyy-MM-dd" style="width: 300px" :disabled="is_check"> </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="bg_blue" @click="handleSubmit">确 定</el-button>
        <el-button @click="userDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--项目弹出框-->
    <el-dialog v-dialogDrag title="合同列表" :visible.sync="tableVisiable" width="80%">
      <!-- 搜索框 -->
      <div>
        <el-input v-model="listProjectQuery.enterprise_name" style="width: 20%;"  placeholder="企业名称"> </el-input>
        <el-input v-model="listProjectQuery.title" style="width: 20%;"  placeholder="合同名称"> </el-input>
        <el-input v-model="listProjectQuery.project_name" style="width: 20%;"  placeholder="项目名称"> </el-input>
        <el-button class="filter-item bg_blue" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="contract_project_list" border style="width: 100%">
        <el-table-column align="center" label="" width="65" >
          <template slot-scope="scope">
            <el-radio v-model="project_id" :label="scope.$index" @change="getIndex(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.apply_report__enterprise__enterprise_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.apply_report__policy_project__project_item__project_library__project_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同补贴金额" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.apply_report__policy_project__project_item__subsidy_total}} 万元</span>
          </template>
        </el-table-column>
        <el-table-column label="签订人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__sign_user__user_name}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="handleProjectSizeChange" @current-change="handleProjectCurrentChange"
                       :current-page="listProjectQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listProjectQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="projectTotal">
        </el-pagination>
      </div>
      <!-- 按钮 -->
      <div class="table-button">
        <el-button @click="tableVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeItem">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { queryAuth } from '@/utils/auth'
  // import { contractInvoiceList, contractInvoiceEdit, contractInvoiceSave, contractInvoiceDelete, getContractProjectList } from '@/api/contract'
  import qs from 'qs'

  export default {
    name: 'complexTable',
    data() {
      return {
        host: process.env.BASE_API,
        tableKey: 0,
        list: [],
        total: 0,
        project_id: '',
        projectTotal: 0,
        listLoading: false,
        tableVisiable: false,
        user_list: [],
        invoice_type_list: [],
        listQuery: {
          page: 1,
          limit: 10,
          sort: '+id'
        },
        listProjectQuery: {
          page: 1,
          limit: 10,
          sort: '+id'
        },
        userDialogVisible: false, // 新增/编辑账号弹出框是否显示
        detailForm: {}, // 新增/编辑账号表单对象
        currentRow: {},
        is_check: false,
        contract_project_list: [], // 合同项目列表
        // 权限控制
        can_create: queryAuth(this, 'create', null),
        can_edit: queryAuth(this, 'edit', null),
        can_export_invoice: queryAuth(this, 'export_invoice', null),
        can_delete: queryAuth(this, 'delete', null)
      }
    },
    watch: {
      // 当弹出框关闭的时候，初始化表单对象
      userDialogVisible: function(newVal) {
        if (!newVal) {
          this.detailForm = {}
        }
      }
    },
    mounted() {
      this.getList()
    },
    // methods: {
    //   // 提交表单
    //   handleSubmit() {
    //     this.$refs['detailForm'].validate((valid, error) => {
    //       if (valid) {
    //         contractInvoiceSave(this.detailForm).then(res => {
    //           if (res.data.code === 1) {
    //             this.$message({
    //               message: '操作成功',
    //               type: 'success'
    //             })
    //             this.getList()
    //             this.userDialogVisible = false
    //           }
    //         })
    //       } else {
    //         this.callbackError(error)
    //         return false
    //       }
    //     })
    //   },
    //   getList() {
    //     contractInvoiceList(this.listQuery).then(response => {
    //       if (response.data.code === 1) {
    //         this.list = response.data.data
    //         this.total = response.data.recordsTotal
    //         this.user_list = response.data.user_list
    //         this.invoice_type_list = response.data.invoice_type_list
    //       }
    //     })
    //   },
    //   handleFilter() {
    //     this.listQuery.page = 1
    //     this.getList()
    //   },
    //   handleSizeChange(val) {
    //     this.listQuery.limit = val
    //     this.getList()
    //   },
    //   handleCurrentChange(val) {
    //     this.listQuery.page = val
    //     this.getList()
    //   },
    //   handleChannelFilter() {
    //     this.listQuery.page = 1
    //   },
    //   handleCreate() {
    //     this.is_check = false
    //     contractInvoiceEdit().then(res => {
    //       if (res.data.code === 1) {
    //         this.detailForm = res.data.data
    //       }
    //     })
    //     this.userDialogVisible = true
    //   },
    //   handleUpdate(biz_id) {
    //     this.is_check = false
    //     contractInvoiceEdit({ id: biz_id }).then(res => {
    //       if (res.data.code === 1) {
    //         this.detailForm = res.data.data
    //       }
    //     })
    //     this.userDialogVisible = true
    //   },
    //   handleCheck(biz_id) {
    //     this.is_check = true
    //     contractInvoiceEdit({ id: biz_id }).then(res => {
    //       if (res.data.code === 1) {
    //         this.detailForm = res.data.data
    //       }
    //     })
    //     this.userDialogVisible = true
    //   },
    //   handleDel(biz_id) {
    //     this.$confirm('您确定删除吗？').then(_ => {
    //       contractInvoiceDelete({ id: biz_id }).then(res => {
    //         if (res.data.code === 1) {
    //           this.userDialogVisible = false
    //           this.$message.success('删除成功')
    //           this.getList()
    //         }
    //       })
    //     })
    //   },
    //   // 导出发票
    //   handleExport() {
    //     window.open(this.host + '/contract/export-contract-invoice-excel/?' + qs.stringify(this.listQuery))
    //   },
    //   // 获取合同
    //   handleSearch() {
    //     this.tableVisiable = true
    //     getContractProjectList(this.listProjectQuery).then(res => {
    //       if (res.data.code === 1) {
    //         this.contract_project_list = res.data.data
    //         this.projectTotal = res.data.recordsTotal
    //       }
    //     })
    //   },
    //   handleProjectSizeChange(val) {
    //     this.listProjectQuery.limit = val
    //     this.handleSearch()
    //   },
    //   handleProjectCurrentChange(val) {
    //     this.listProjectQuery.page = val
    //     this.handleSearch()
    //   },
    //   getIndex(data) {
    //     this.currentRow = data
    //   },
    //   changeItem() {
    //     this.detailForm.contract_item = this.currentRow.id
    //     this.detailForm.contract_info__title = this.currentRow.contract_info__title
    //     this.detailForm.apply_report__enterprise__enterprise_name = this.currentRow.apply_report__enterprise__enterprise_name
    //     this.detailForm.contract_info__sign_user__user_name = this.currentRow.contract_info__sign_user__user_name
    //     this.detailForm.apply_report__policy_project__project_item__project_library__project_name = this.currentRow.apply_report__policy_project__project_item__project_library__project_name
    //     this.detailForm.apply_report__policy_project__project_item__subsidy_total = this.currentRow.apply_report__policy_project__project_item__subsidy_total
    //     this.tableVisiable = false
    //   }
    // }
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
      margin-bottom: 0!important;
    }
  }
  /deep/ .el-date-editor.el-input {
    width:auto;
  }
  .filterList {
    /deep/ .el-input {
      min-width: 100px;
      max-width: 180px;
      height: 36px;
      margin-right: 10px;
    }
  }
  /deep/ .el-input__inner {
    border-radius: 0;
  }
  // 修改列表页面表格样式
  /deep/ .el-table {
    border: rgb(217, 242, 255) 1px solid!important;
  }
  /deep/ .el-table th.gutter{
    display: table-cell!important;
  }
  /deep/ .el-table--border th {
    background:#2CB1F5!important;
    color: #fff;
    font-weight: 400;
    border-right: 1px solid rgba(220,223,230,0.21);
  }
  /deep/ .el-table__row {
    &:nth-child(even) {
      background:rgb(235, 248, 255)!important;
    }
  }
  /deep/ .el-table--border td {
    border:none;
    box-sizing: border-box;
    &:first-child {
      border-right: rgb(217, 242, 255) 1px solid!important;
    }
    &:last-child {
      border-left: rgb(217, 242, 255) 1px solid!important;
    }
  }
  .spanButton {
    color:#05AAFF;
  }
  .shu {
    margin: 0 10px;
    color:#ccc;
  }
  // 分页样式
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    /deep/ .el-pagination__total {
      flex:1
    }
    .totalText {
      font-size:14px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:20px;
      color:rgba(68,68,68,1);
      span {
        margin-right: 20px;
      }
    }
    /deep/ .el-pagination.is-background .btn-next,
    /deep/ .el-pagination.is-background .btn-prev,
    /deep/ .el-pagination.is-background .el-pager li {
      background: none;
      border:#D5D5D5 1px solid;
      color:#8B8B8B;
      font-size: 12px;
      font-weight: normal;
    }
    /deep/ .el-pagination.is-background .el-pager li.active {
      background:#05AAFF;
      color:#fff;
      border:#05AAFF 1px solid;
    }

    /deep/ .el-card.is-always-shadow,
    /deep/ .el-card.is-hover-shadow:focus,
    /deep/ .el-card.is-hover-shadow:hover {
      box-shadow:0px 2px 6px rgba(68,68,68,0.1)!important;
    }
  }
  // 全局文字颜色和背景颜色的公用样式
  .col_skyblue {
    color:#05AAFF!important;
    &:hover {
      opacity: 0.5;
    }
  }
  .col_green {
    color:rgb(133, 206, 97)!important;
    &:hover {
      opacity: 0.5;
    }
  }
  .col_blue {
    color:#008DD6!important;
    &:hover {
      opacity: 0.5;
    }
  }
  .col_orange {
    color:#FF8527!important;
    &:hover {
      opacity: 0.5;
    }
  }
  .col_red {
    color:#FF6B6B!important;
    &:hover {
      opacity: 0.5;
    }
  }
  .col_black {
    color:rgb(180, 180, 180)!important;
    &:hover {
      opacity: 0.5;
    }
  }
  // 公用背景颜色样式
  .bg_orange {
    background: #FD903C;
    margin-right: 10px; // 单独设置本页面
    color:#fff;
    &:hover {
      background: #FD903C;
      opacity: 0.5;
    }
  }
  .bg_gray {
    background: rgb(180, 180, 180);
    color:#fff;
    &:hover {
      background: rgba(180, 180, 180,.5);
    }
  }
  .bg_blue {
    background: #05AAFF;
    color:#fff;
    &:hover {
      background: #05AAFF;
      opacity: 0.5;
    }
  }
  .character {
    padding-bottom:20px;
    margin-bottom:20px;
    border-bottom:1px solid #eee;
  }
  .control {
    border:none;
    /deep/ .el-card__header {
      border-bottom: none;
      background: rgb(237, 249, 255);
    }
  }
  .df {
    display: flex;
  }
  // 弹出框样式设计
  /deep/ .el-dialog__header {
    background: #05AAFF;
    padding:20px;
    margin-bottom: 20px;
    /deep/ .el-dialog__title {
      color:#fff;
      font-size: 16px;
    }
    /deep/ .el-dialog__headerbtn {
      border-radius: 50%;
      background: #fff;
      padding: 4px;
      font-size: 12px;
      font-weight: 400;
      /deep/ .el-dialog__close {
        color:#05AAFF;
      }
    }
  }
  /deep/ .el-dialog__footer {
    text-align: center;
    /deep/ .el-button {
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }
  }
</style>
