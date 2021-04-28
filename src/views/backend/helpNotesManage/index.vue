<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <!--搜索栏-->
      <div slot="header" class="clearfix headerTop">
        <div class="headerLeft">
          <el-input size="small" class="searchInput" v-model="searchName" placeholder="页面名称或说明对象"
                    @keyup.enter.native="searchHandle" clearable>
            <tip slot="suffix" :name="'页面名称或说明对象'" :pageUrl="'/backend/helpNotes'"/>
          </el-input>

          <el-button size="small" type="primary" icon="el-icon-search" @click="searchHandle">
            搜索
          </el-button>
        </div>
        <div class="headerRig">
          <el-button size="small" type="primary" @click="openAddDialog">
            新建说明对象
            <tip :name="'新建说明对象'" :pageUrl="'/backend/helpNotes'"/>
          </el-button>
        </div>
      </div>

      <!--表格-->
      <div class="materielTable">
        <!--字段/按钮说明-->
        <el-table :data="tableData">
          <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>

          <el-table-column align="center" label="页面名">
            <template slot-scope="scope">
              {{scope.row.tablePageName}}
            </template>
          </el-table-column>

          <el-table-column align="center" label="页面链接">
            <template slot-scope="scope">
              {{scope.row.tablePageEnName}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="说明对象" prop="fieldButtonName"></el-table-column>

          <el-table-column align="center" label="对象解释" prop="explainDesc"></el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="table-handle-group">
                <i title="编辑" class="el-icon-edit" @click="editExplainHandle(scope.row)"></i>
                &nbsp;
                <i title="删除" @click="delExplainHandle(scope.row)" class="el-icon-delete"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>


        <div class="pagination-container">
          <div class="totalText">
            <span>总数：{{ tableTotal }}</span>
            <span>总页数:{{ Math.ceil(tableTotal / tablePageSize) || Math.ceil(tableTotal / 10) }}</span>
            <span>当前页：{{ tablePage || 1 }}</span>
          </div>
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="tablePage" :page-sizes="[10,20,30,50]" :page-size="tablePageSize"
                         layout="prev, pager, next, sizes, jumper" :total="tableTotal">
          </el-pagination>
        </div>

      </div>
    </el-card>

    <!-- 增加/编辑--字段 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="cananlModal"
      v-dialogDrag
    >
      <!--按钮说明--表单-->
      <el-form :model="fieldForm" :rules="rules" ref="buttonForm" label-width="100px">
        <!--页面名称-->
        <el-form-item label="页面名称：" prop="tablePageName">
          <el-input maxlength="100" v-model.trim="fieldForm.tablePageName"/>
        </el-form-item>

        <el-form-item label="页面链接：" prop="tablePageEnName">
          <el-input :disabled="!isEdit" maxlength="100" v-model.trim="fieldForm.tablePageEnName"/>
        </el-form-item>

        <!--按钮名-->
        <el-form-item label="说明对象：" prop="fieldButtonName">
          <el-input :disabled="!isEdit" maxlength="100" v-model.trim="fieldForm.fieldButtonName"/>
        </el-form-item>

        <!--按钮说明-->
        <el-form-item label="对象解释：" prop="explainDesc">
          <el-input maxlength="2000" v-model.trim="fieldForm.explainDesc" class="text-area" type="textarea"/>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button size='small' v-if="isEdit" type="primary" @click="setFormHandle">确 定</el-button>
        <el-button size='small' v-else type="primary" @click="setFormHandle">修 改</el-button>
        <el-button size='small' @click="cananlModal">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryOperationExplain,
    getTableList,
    getTableColumnInfo,
    saveOperationExplain,
    removeOperationExplain,
    updateOperationExplain,
    getPermissionList
  } from '@/api/helpManage'


  export default {
    data() {
      return {
        //搜索名称
        searchName: "",

        //tab栏--数据
        tabList: [
          {label: '字段说明', name: '0'},
          {label: '按钮说明', name: '1'},
        ],

        //表格参数-获取表格数据
        listParams: {
          explainType: 1,
          page: 0,
          pageSize: 10,
        },

        //表格数据
        tableData: [],

        //表格总条数
        tableTotal: 0,
        //表格第几页
        tablePage: 1,
        //表格显示条数
        tablePageSize: 10,

        //判断状态 新增(true)/编辑(false)
        isEdit: null,

        //新建/编辑-配置-弹窗(显示/隐藏)
        dialogVisible: false,

        //配置弹窗--标题
        dialogTitle: "",

        //配置窗口--form表单监听
        rules: {
          tablePageName: [{required: true, message: '请输入页面名', trigger: 'change'}],
          tablePageEnName: [{required: true, message: '请输入页面链接', trigger: 'change'}],
          fieldButtonName: [{required: true, message: '请输入说明对象', trigger: 'blur'}],
          explainDesc: [{required: true, message: '请输入对象解释', trigger: 'blur'}],
        },

        //配置菜单-字段说明-表名select数据
        formList: [],

        //配置菜单-字段说明-字段名select数据
        fieldList: [],

        //配置菜单-按钮说明-页面名称select数据
        pageList: [],

        //配置菜单--字段/按钮说明--提交参数
        fieldForm: {
          page: 0,
          pageSize: 20
        },

      }
    },
    activated() {
      this.getList();
    },
    methods: {
      //获取表格数据
      getList() {
        queryOperationExplain(this.listParams).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.tableTotal = res.data.total;
          }
        })
      },

      //tab-点击
      handleClick() {
        this.listParams.page = 0;
        this.listParams.pageSize = 10;
        this.getList();
      },

      //新建配置--点击
      openAddDialog() {
        this.isEdit = true;
        this.dialogTitle = '新建说明对象';
        this.$nextTick(() => {
          this.$refs.buttonForm.clearValidate();
        });
        this.dialogVisible = true;
      },

      //确定新增提交 0:字段说明 1:按钮说明
      setFormHandle() {
        this.$refs.buttonForm.validate((valid) => {
          if (valid) {
            this.fieldForm.explainType = 1;
            if (this.isEdit) {
              this.saveApi();
            } else {
              this.editApi();
            }
          } else {
            return false;
          }
        });
      },

      //新增--提交接口
      saveApi() {
        saveOperationExplain(this.fieldForm).then(res => {
          if (res.code === 200) {
            this.$message.success('新建成功');
            this.fieldForm = {page: 0, pageSize: 20};
            this.getList();
            this.isEdit = null;
            this.dialogVisible = false;
          }
        })
      },

      //修改--提交接口
      editApi() {
        this.fieldForm.page = 0;
        this.fieldForm.pageSize = 20;
        updateOperationExplain(this.fieldForm).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功');
            this.fieldForm = {page: 0, pageSize: 20};
            this.getList();
            this.isEdit = null;
            this.dialogVisible = false;
          }
        })
      },

      //点击--编辑按钮
      editExplainHandle(data) {
        this.isEdit = false;

        this.fieldForm = JSON.parse(JSON.stringify(data));
        this.$nextTick(() => {
          this.$refs.buttonForm.clearValidate();
        })
        this.dialogTitle = '编辑说明对象';
        this.dialogVisible = true;
      },

      //删除--字段/按钮说明
      delExplainHandle(data) {
        removeOperationExplain({explainId: data.explainId}).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功');
            this.getList();
          }
        })
      },

      //弹窗取消
      cananlModal() {
        this.fieldForm = {page: 0, pageSize: 20};
        this.fieldList = [];
        this.isEdit = null;
        this.dialogVisible = false;
      },

      //搜索点击
      searchHandle() {
        this.listParams.tablePageName = this.searchName;
        this.listParams.page = 0;
        this.listParams.pageSize = 10;
        this.tablePage = 1;
        this.getList()
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.tablePageSize = val;
        this.listParams.pageSize = val;
        this.getList()
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        if (val === 1) {
          this.listParams.page = 0;
        } else {
          this.listParams.page = (val - 1) * 10;
        }
        this.tablePage = val;

        this.getList();
      },

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

  // 弹出框样式设计
  /deep/ .el-dialog__header {
    background: #05AAFF;
    padding: 20px;
    margin-bottom: 20px;

    /deep/ .el-dialog__title {
      color: #fff;
      font-size: 16px;
    }

    /deep/ .el-dialog__headerbtn {
      border-radius: 50%;
      background: #fff;
      padding: 4px;
      font-size: 12px;
      font-weight: 400;

      /deep/ .el-dialog__close {
        color: #05AAFF;
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

  .text-area {
    /deep/ .el-textarea__inner {
      height: 100px;
    }
  }

  .table-handle-group {
    text-align: center;

    i {
      cursor: pointer;

      &:first-child {
        color: #05AAFF;
      }

      &:last-child {
        color: red;
      }
    }


  }

</style>
