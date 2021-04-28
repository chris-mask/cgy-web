<!-- 申报账号列表管理页面 -->

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <el-row type="flex" justify="space-between" class="filterList">
          <div class="df">
            <el-input  class="filter-item" v-if="filter_department_list" placeholder="企业名称/联系人/电话" v-model="listQuery.ent_info">
            </el-input>
            <el-button class="filter-item bg_blue" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
        </el-row>
      </el-card>
    </div>

    <el-card class="box-card">
      <el-row :gutter="10"  class="character filterList">
          <el-col :span="3">
            <el-select clearable filterable class="filter-item" @change="handleFilter" v-if="filter_department_list"
                      v-model="listQuery.department" placeholder="部门筛选">
              <el-option v-for="item in filter_department_list" :key="item.biz_id" :label="item.department_name"  :value="item.biz_id">
              </el-option>
            </el-select><span v-else> &nbsp;</span>
          </el-col>
          <el-col :span="3">
            <el-select clearable filterable class="filter-item" @change="handleFilter" v-if="filter_user_list"
                      v-model="listQuery.sys_user" placeholder="员工筛选">
              <el-option v-for="item in filter_user_list" :key="item.biz_id" :label="item.user_name"  :value="item.biz_id">
              </el-option>
            </el-select><span v-else> &nbsp;</span>
          </el-col>
          <el-col :span="3">
            <AreaSelect class="filter-item" v-if="filter_user_list" :emitPath="false" v-on:listenToChildEvent="getArea"></AreaSelect>
          </el-col>
          <el-col :span="15" style="text-align:right">
            <el-button class="filter-item" type="success" v-waves icon="el-icon-edit" @click="handleCreate">创建</el-button>
            <el-button class="filter-item" type="danger" v-waves icon="el-icon-delete" @click="handleDelete">批量删除</el-button>
          </el-col>
        </el-row>
      <el-table :key='tableKey' :data="accountList" ref="policy_table" v-loading="listLoading" border fit highlight-current-row
        style="width: 100%;">
        <el-table-column  label="" width="65" type="selection">
          <!--<template slot-scope="scope">-->
            <!--<span></span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column min-width="100px"  label="企业名称">
          <template slot-scope="scope">
            <span>{{scope.row.enterprise__enterprise_name}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px"  label="官方平台全称">
          <template slot-scope="scope">
            <span>{{scope.row.official_name}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px"  label="官方平台地址">
          <template slot-scope="scope">
            <span>{{scope.row.official_url}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px"  label="管理人账号">
          <template slot-scope="scope">
            <span>{{scope.row.admin_account}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px"  label="管理人密码">
          <template slot-scope="scope">
            <span>{{scope.row.admin_password}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px"  label="申报人账号">
          <template slot-scope="scope">
            <span>{{scope.row.apply_account}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px"  label="申报人密码">
          <template slot-scope="scope">
            <span>{{scope.row.apply_password}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px"  label="其他">
          <template slot-scope="scope">
            <span>{{scope.row.remarks}}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" label="操作" width="230px" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <span class="spanButton col_skyblue" v-if="can_edit" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</span>
            <span class="shu">|</span>
            <span class="spanButton col_red" v-if="can_delete" @click="goDel([scope.row.biz_id])">{{$t('table.delete')}}</span>
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

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="50%"
      >

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm"
               style="margin-bottom: 70px">
        <el-form-item v-if="!is_ent" label="企业名称" prop="enterprise" style="display: inline-block">
          <el-select v-model="ruleForm.enterprise" filterable placeholder="请选择" style="width: 300px" ref="enterprise">
            <el-option
              v-for="item in enterpriseList"
              :key="item.pk"
              :label="item.enterprise_name"
              :value="item.pk">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="官方平台名称" prop="official_name" style="display: inline-block">
          <el-input style="width: 300px" v-model="ruleForm.official_name" ref="official_name"></el-input>
        </el-form-item>

        <el-form-item label="官方平台网址" prop="official_url" style="display: inline-block">
          <el-input type="textarea" :row="2" style="width: 300px" v-model="ruleForm.official_url" ref="official_url"></el-input>
        </el-form-item>

        <el-form-item label="管理人账号" prop="admin_account" style="display: inline-block">
          <el-input style="width: 300px" v-model="ruleForm.admin_account"></el-input>
        </el-form-item>

        <el-form-item label="管理人密码" prop="admin_password" style="display: inline-block">
          <el-input style="width: 300px" v-model="ruleForm.admin_password"></el-input>
        </el-form-item>

        <el-form-item label="申请人账号" prop="apply_account" style="display: inline-block">
          <el-input style="width: 300px" v-model="ruleForm.apply_account"></el-input>
        </el-form-item>

        <el-form-item label="申请人密码" prop="apply_password" style="display: inline-block">
          <el-input style="width: 300px" v-model="ruleForm.apply_password"></el-input>
        </el-form-item>

        <el-form-item label="其它" prop="project_name" style="display: inline-block">
          <el-input type="textarea" :row="2" style="width: 300px" v-model="ruleForm.remarks"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { queryAuth } from '@/utils/auth'
// import AreaSelect from '@/components/AreaSelect/AreaSelect'
// import { getAccount, delAccount, saveAccount } from '@/api/project'

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  components: {
    // AreaSelect
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      count: 1,
      tableKey: 0,
      accountList: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        information_name: undefined,
        sort: '+id',
        type_id: '',
        ent_info: '',
        department: '',
        sys_user: ''
      },
      userList: [],
      dialogVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      is_ent: true,
      ruleForm: {},
      // 用于筛选项过滤的数据
      filter_department_list: [], // 筛选项的部门list
      filter_user_list: [], // 筛选项的用户list
      enterpriseList: [],
      rules: {
        enterprise: [
          { required: true, message: '请输入企业名称', trigger: 'change' }
        ],
        official_name: [
          { required: true, message: '请输入官方平台名称', trigger: 'blur' }
        ],
        official_url: [
          { required: true, message: '请输入官方平台网址', trigger: 'blur' }
        ]
      },
      // 权限控制
      can_edit: queryAuth(this, 'edit', null),
      can_create: queryAuth(this, 'create', null),
      can_delete: queryAuth(this, 'delete', null)
    }
  },
  filters: {
  },
  mounted() {
    this.listQuery = this.$store.state.user_list.apply_accountListQuery
    if (this.id) {
      this.listQuery.biz_id = this.id
    } else if (this.$route.name === '创建企业信息') {
      this.listQuery.biz_id = 0
    } else if (this.$store.state.user.biz_id) {
      this.listQuery.biz_id = this.$store.state.user.biz_id
      this.getList()
    } else {
      this.listQuery.biz_id = null
      this.getList()
    }
  },
  beforeDestroy() {
    this.$store.commit('setApply_accountListQuery', this.listQuery)
  },
  methods: {
    // 判断权限
    judgePermissions() {
      this.can_edit = queryAuth(this, 'edit', '/project/account-mng/list')
      this.can_create = queryAuth(this, 'create', '/project/account-mng/list')
      this.can_delete = queryAuth(this, 'delete', '/project/account-mng/list')
    },
    // 错误提示
    callbackError(error) {
      for (var key in error) {
        this.tempArr = error[key]
        break
      }
      this.$message({
        type: 'error',
        message: this.tempArr[0].message
      })
      this.$refs[this.tempArr[0].field].focus()
    },
    getList() {
      if (this.id || this.$store.state.user.biz_id) {
        this.listQuery.biz_id = this.id || this.$store.state.user.biz_id
      } else if (this.$route.name === '创建企业信息') {
        this.listQuery.biz_id = 0
      } else {
        this.listQuery.biz_id = null
      }
      // getAccount(this.listQuery).then(res => {
      //   if (res.data.code === 1) {
      //     this.accountList = res.data.data
      //     this.total = res.data.recordsTotal
      //     if (this.enterpriseList.length === 0) {
      //       this.enterpriseList = res.data.enterprise_info
      //     }
      //     this.is_ent = res.data.is_ent
      //     this.filter_department_list = res.data.filter_department_list
      //     this.filter_user_list = res.data.filter_user_list
      //   }
      // })
    },
    setForm() {
      this.ruleForm = {
        biz_id: '',
        official_name: '',
        official_url: '',
        admin_account: '',
        admin_password: '',
        apply_account: '',
        apply_password: '',
        remarks: '',
        enterprise: '',
        enterprise__enterprise_name: ''
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleUpdate(data) {
      this.ruleForm = data
      this.ruleForm.enterprise = data.enterprise_id
      this.dialogVisible = true
    },
    handleCreate() {
      this.setForm()
      this.dialogVisible = true
    },
    handleDelete() {
      var del_row = this.$refs.policy_table.selection
      var del_ids = []
      if (del_row.length === 0) {
        this.$notify({
          title: '请选择id',
          type: 'error',
          duration: 2000
        })
        return
      }
      for (var i = 0; i < del_row.length; i++) {
        del_ids.push(del_row[i].biz_id)
      }
      this.goDel(del_ids)
    },
    goDel(data) {
      if (data.length === 0) {
        this.$message.error('请选择要删除的信息')
      }
      this.$confirm('您确定删除吗？').then(_ => {
        // delAccount({ 'ids': data }).then(res => {
        //   if (res.data.code === 1) {
        //     this.$message({
        //       message: '操作成功',
        //       type: 'success'
        //     })
        //     this.getList()
        //   }
        // })
      })
    },
    goChange(data) {
      this.dialogVisible = true
      this.reviewerForm.enterprise_name = data.enterprise__enterprise_name
      this.reviewerForm.project_name = data.notice__policy_project__project_name
      this.reviewerForm.id = data.biz_id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          if (!(this.ruleForm.admin_account && this.ruleForm.admin_password) && !(this.ruleForm.apply_account && this.ruleForm.apply_password)) {
            this.$message({
              type: 'error',
              message: '管理员账号密码和申请人账号密码至少填写一项'
            })
            return
          }
          var form = this.ruleForm
          // saveAccount(form).then(response => {
          //   if (response.data.code === 1) {
          //     this.$message({
          //       message: '操作成功',
          //       type: 'success'
          //     })
          //     this.getList()
          //     this.dialogVisible = false
          //   }
          // })
        } else {
          this.callbackError(error)
          return false
        }
      })
    },
    getArea(val) {
      this.listQuery.areaId = val
    }
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
  /** 状态监控栏需要的样式 **/
  .list_state_filter_item {
    /*margin-top: 10px;*/
    margin-right: 40px;
  }
  .patent_info_content .clearfix:before,
  .patent_info_content .clearfix:after {
    display: table;
    content: "";
  }
  .patent_info_content .clearfix:after {
    clear: both
  }
  .patent_info_content .el-card__header {
    padding: 5px 20px;
    background-color: #eeeeee;
  }
  .patent_info_content .el-card__body {
    padding: 0 10px 5px;
  }
  .patent_info_content .car_title{
    font-size: 12px;
    line-height: 12px;
  }
  .patent_info_content .list_state_filter_item .el-button:hover,.patent_info_content  .list_state_filter_item .el-button:focus,.patent_info_content  .checked{
    color: #0c0c0c;
  }

  /** 状态监控栏需要的样式end **/
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
  </style>
