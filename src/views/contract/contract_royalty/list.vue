<template>
  <div class="app-container copyright_content">
    <el-card class="box-card">
      <el-row :gutter="10" class="filterList character">
        <el-col :span="3">
          <el-input class="filter-item" @keyup.enter.native="handleFilter" placeholder="签订人" v-model="listQuery.business_name">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-input class="filter-item" @keyup.enter.native="handleFilter" placeholder="提成人" v-model="listQuery.royalty_name">
          </el-input>
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
          <el-select @change='handleFilter' filterable clearable class="filter-item" v-model="listQuery.sys_user" placeholder="业务是否已提成">
            <el-option label="已提成"  value="1"> </el-option>
            <el-option label="未提成"  value="2"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select @change='handleFilter' filterable clearable class="filter-item" v-model="listQuery.sys_user" placeholder="经理是否已提成" v-if="read_leader_receive">
            <el-option label="已提成"  value="1"> </el-option>
            <el-option label="未提成"  value="2"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select @change='handleFilter' filterable clearable v-model="listQuery.extra_filter" placeholder="其他">
            <el-option label="本月收入"  value="1"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item bg_blue" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item bg_blue" v-if="can_export_royalty" icon="el-icon-search" @click="handleExport">导出</el-button>
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

        <el-table-column align="center" label="合同原金额">
          <template slot-scope="scope">
            <span>{{scope.row.contract_item__apply_report__policy_project__project_item__subsidy_total}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="批准金额">
          <template slot-scope="scope">
            <span>{{scope.row.approval_money}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="回款金额">
          <template slot-scope="scope">
            <span>{{scope.row.contract_item__back_money_total}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="回款日期">
          <template slot-scope="scope">
            <span>{{scope.row.contract_item__back_money_date}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="业务提成金额">
          <template slot-scope="scope">
            <span>{{scope.row.business_royalty_money}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="业务提成人">
          <template slot-scope="scope">
            <span>{{scope.row.royalty_business__user_name}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="业务已提成">
          <template slot-scope="scope">
            <span v-if="scope.row.business_already_receive">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="业务领取日期">
          <template slot-scope="scope">
            <span>{{scope.row.business_receive_date}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="经理提成金额" v-if="read_leader_receive">
          <template slot-scope="scope">
            <span>{{scope.row.leader_royalty_money}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="经理提成人" v-if="read_leader_receive">
          <template slot-scope="scope">
            <span>{{scope.row.royalty_leader__user_name}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="经理已提成" v-if="read_leader_receive">
          <template slot-scope="scope">
            <span v-if="scope.row.leader_already_receive">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="经理领取日期" v-if="read_leader_receive">
          <template slot-scope="scope">
            <span>{{scope.row.leader_receive_date}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <span class="spanButton col_blue" v-if="can_edit" @click="handleUpdate(scope.row.biz_id)">编辑</span>
            <span class="shu" v-if="can_delete">|</span>
            <span class="spanButton col_red" v-if="can_delete" @click="handleDel(scope.row.biz_id)">删除</span>
            <span class="shu" v-if="can_receive">|</span>
            <span class="spanButton col_blue" v-if="can_receive" @click="handleReceive(scope.row.biz_id)">领款</span>
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
              <span>{{detailForm.title}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="项目名称：" prop="project_name">
              <span>{{detailForm.project_name}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
          <el-form-item label="合同签订人：" prop="sign_user_name">
            <span>{{detailForm.sign_user_name}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="10">
          <el-form-item label="合同原金额：" prop="subsidy_total">
            <span>{{detailForm.subsidy_total}}万元</span>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="回款金额：" prop="back_money_total">
              <span v-if="detailForm.back_money_total">{{detailForm.back_money_total}}万元</span>
              <span v-else>未回款</span>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="回款日期：" prop="back_money_date">
              <span v-if="detailForm.back_money_date">{{detailForm.back_money_date}}</span>
              <span v-else>未回款</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="批准金额：" prop="approval_money">
              <el-input v-model="detailForm.approval_money">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="业务提成金额：" prop="contacts_phone">
              <el-input v-model="detailForm.business_royalty_money" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="业务提成人：" prop="contacts_phone">
              <el-select filterable clearable class="filter-item" v-model="detailForm.royalty_business" placeholder="选择提成人" :disabled="is_edit">
                <el-option v-for="item in user_list" :key="item.id" :label="item.user_name" :value="item.id" > </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="read_leader_receive">
          <el-col :span="10">
            <el-form-item label="经理提成金额：" prop="leader_royalty_money">
              <el-input v-model="detailForm.leader_royalty_money" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="经理提成人：" prop="royalty_leader">
              <el-select filterable clearable class="filter-item" v-model="detailForm.royalty_leader" placeholder="选择提成人" :disabled="is_edit">
                <el-option v-for="item in user_list" :key="item.id" :label="item.user_name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="业务提成签字附件：" prop="receive_img">
            <span><el-image style="width: 60px; height: 60px;white-space: nowrap;" :src="host + detailForm.receive_img"
              fit="fill" :preview-src-list="[host + detailForm.receive_img]"  v-if="is_edit"> </el-image></span>
            <el-dialog v-dialogDrag :visible.sync="dialogVisible" :append-to-body="true" v-if="!is_edit">
              <img width="100%" :src="dialogImageUrl" alt="图片显示失败">
            </el-dialog>
            <el-upload v-if="!is_edit"
              class="upload-demo"
              :action="host + '/core/upload-files/'"
              :on-preview="handlePreview"
              :data="uploadData"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-success="handleAbstractSuccess"
              :file-list="abstractPicList"
              list-type="picture-card">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-row>
        <el-row v-if="read_leader_receive">
          <el-form-item label="经理提成签字附件：" prop="leader_receive_img">
            <span>
              <el-image style="width: 60px; height: 60px;white-space: nowrap;" :src="host + detailForm.leader_receive_img"
                            fit="fill" :preview-src-list="[host + detailForm.leader_receive_img]"  v-if="is_edit"> </el-image>
            </span>
            <el-dialog v-dialogDrag :visible.sync="dialogVisible1" :append-to-body="true" v-if="!is_edit">
              <img width="100%" :src="dialogImageUrl1" alt="图片显示失败">
            </el-dialog>
            <el-upload v-if="!is_edit"
              class="upload-demo"
              :action="host + '/core/upload-files/'"
              :on-preview="handlePreview1"
              :data="uploadData1"
              :on-remove="handleRemove1"
              :before-upload="beforeUpload1"
              :on-success="handleAbstractSuccess1"
              :file-list="abstractPicList1"
              list-type="picture-card">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="bg_blue" @click="handleSubmit">确 定</el-button>
        <el-button @click="userDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { queryAuth } from '@/utils/auth'
  // import { contractRoyaltyList, contractRoyaltyEdit, contractRoyaltySave, contractRoyaltyDelete } from '@/api/contract'
  import qs from 'qs'
  export default {
    name: 'complexTable',
    data() {
      return {
        host: process.env.BASE_API,
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: false,
        read_leader_receive: false,
        user_list: [],
        listQuery: {
          page: 1,
          limit: 10,
          sort: '+id'
        },
        userDialogVisible: false, // 新增/编辑账号弹出框是否显示
        detailForm: {}, // 新增/编辑账号表单对象
        dialogImageUrl: '',
        dialogVisible: false,
        uploadData: { save_path: 'contract/contract_royalty/', allow_type: ['jpg', 'png', 'jpge'] },
        abstractPicList: [], // 业务员领款附图
        dialogImageUrl1: '',
        uploadData1: { save_path: 'contract/contract_royalty/', allow_type: ['jpg', 'png', 'jpge'] },
        abstractPicList1: [],
        dialogVisible1: false,
        is_edit: false,
        is_receive: '2', // 是否领款， 1表示是， 2表示不是
        // 权限控制
        can_edit: queryAuth(this, 'edit', null),
        can_export_royalty: queryAuth(this, 'export_royalty', null),
        can_receive: queryAuth(this, 'royalty_receive', null),
        can_delete: queryAuth(this, 'delete', null)
      }
    },
    watch: {
      // 当弹出框关闭的时候，初始化表单对象
      userDialogVisible: function(newVal) {
        if (!newVal) {
          this.detailForm = {}
          this.abstractPicList = []
          this.abstractPicList1 = []
        }
      }
    },
    mounted() {
      // 其他条件
      if (this.$route.query.extra_filter) {
        this.listQuery.extra_filter = this.$route.query.extra_filter
      }
      this.getList()
    },
    // methods: {
    //   // 错误提示
    //   callbackError(error) {
    //     for (var key in error) {
    //       this.tempArr = error[key]
    //       break
    //     }
    //     this.$message({
    //       type: 'error',
    //       message: this.tempArr[0].message
    //     })
    //   },
    //   // 提交表单
    //   handleSubmit() {
    //     this.detailForm.receive_img = this.handleImgList(this.abstractPicList)
    //     this.detailForm.leader_receive_img = this.handleImgList(this.abstractPicList1)
    //     this.detailForm.is_receive = this.is_receive
    //     this.$refs['detailForm'].validate((valid, error) => {
    //       if (valid) {
    //         contractRoyaltySave(this.detailForm).then(res => {
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
    //     contractRoyaltyList(this.listQuery).then(response => {
    //       if (response.data.code === 1) {
    //         this.list = response.data.data
    //         this.total = response.data.recordsTotal
    //         this.read_leader_receive = response.data.read_leader_receive
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
    //   handleUpdate(biz_id) {
    //     this.is_edit = true
    //     contractRoyaltyEdit({ id: biz_id }).then(res => {
    //       if (res.data.code === 1) {
    //         this.detailForm = res.data.data
    //         this.user_list = res.data.user_list
    //       }
    //     })
    //     this.userDialogVisible = true
    //     this.is_receive = '2'
    //   },
    //   handleReceive(biz_id) {
    //     this.is_edit = false
    //     contractRoyaltyEdit({ id: biz_id }).then(res => {
    //       if (res.data.code === 1) {
    //         this.detailForm = res.data.data
    //         this.user_list = res.data.user_list
    //       }
    //     })
    //     this.userDialogVisible = true
    //     this.is_receive = '1'
    //   },
    //   handleDel(biz_id) {
    //     this.$confirm('您确定删除吗？').then(_ => {
    //       contractRoyaltyDelete({ id: biz_id }).then(res => {
    //         if (res.data.code === 1) {
    //           this.userDialogVisible = false
    //           this.$message.success('删除成功')
    //           this.getList()
    //         }
    //       })
    //     })
    //   },
    //   handlePreview(file) {
    //     this.dialogImageUrl = file.url
    //     this.dialogVisible = true
    //   },
    //   handleRemove(file, fileList) {
    //     this.abstractPicList.splice(this.contains(this.abstractPicList, { 'url': file.url }), 1)
    //   },
    //   beforeUpload(file) {
    //     const isLt2M = file.size / 1024 / 1024 < 2
    //     if (!isLt2M) {
    //       this.$message.error('上传文件大小不能超过 2MB!')
    //       return false
    //     }
    //     return true
    //   },
    //   handleAbstractSuccess(res, file, fileList) {
    //     // 业务员领款附图
    //     if (file.response.code === 1) {
    //       this.abstractPicList.push({ 'url': this.host + file.response.url })
    //     } else {
    //       this.$message.error(file.response.message ? file.response.message : '上传业务提成签字附件失败!')
    //     }
    //   },
    //
    //   handlePreview1(file) {
    //     this.dialogImageUrl1 = file.url
    //     this.dialogVisible1 = true
    //   },
    //   handleRemove1(file, fileList) {
    //     this.abstractPicList1.splice(this.contains(this.abstractPicList1, { 'url': file.url }), 1)
    //   },
    //   beforeUpload1(file) {
    //     const isLt2M = file.size / 1024 / 1024 < 2
    //     if (!isLt2M) {
    //       this.$message.error('上传文件大小不能超过 2MB!')
    //       return false
    //     }
    //     return true
    //   },
    //   handleAbstractSuccess1(res, file, fileList) {
    //     // 业务员领款附图
    //     if (file.response.code === 1) {
    //       this.abstractPicList1.push({ 'url': this.host + file.response.url })
    //     } else {
    //       this.$message.error(file.response.message ? file.response.message : '上传经理提成签字附件失败!')
    //     }
    //   },
    //
    //   // 处理图片格式 返回格式： /xxx/xxx/xxx.png;/xxx/xxx/xxx.png;
    //   handleImgList(imgList) {
    //     var imgListStr = ''
    //     if (imgList.length > 0) {
    //       for (var i = 0; i < imgList.length; i++) {
    //         if (imgList.length - 1 === i) {
    //           imgListStr += imgList[i]['url'].replace(this.host, '')
    //         } else {
    //           imgListStr += imgList[i]['url'].replace(this.host, '') + ';'
    //         }
    //       }
    //     }
    //     return imgListStr
    //   },
    //
    //   // 导出提成 exportContractRoyaltyExcel
    //   handleExport() {
    //     this.listQuery.read_leader_receive = this.read_leader_receive
    //     window.open(this.host + '/contract/export-contract-royalty-excel/?' + qs.stringify(this.listQuery))
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
