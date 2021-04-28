<!-- 合同列表 -->

<template>
  <div class="app-container copyright_content">
    <div class="filter-container">
      <el-card class="box-card">
        <el-row type="flex" justify="space-between" class="filterList">
          <div class="df">
              <!--<el-input class="filter-item" @keyup.enter.native="handleFilter" placeholder="合同标题" v-model="listQuery.title">-->
              <!--</el-input>-->
              <el-input class="filter-item" @keyup.enter.native="handleFilter" placeholder="项目名称" v-model="listQuery.project_name">
              </el-input>
              <el-input class="filter-item" @keyup.enter.native="handleFilter" placeholder="企业名称" v-model="listQuery.enterprise_name">
              </el-input>
            <el-button class="filter-item bg_blue" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
        </el-row>
      </el-card>
      <el-row :gutter="12">
        <el-col>
          <el-card shadow="never" class="control">
            <div slot="header" class="clearfix">
              <span class="car_title">合同签署跟踪</span>
            </div>
            <el-badge :value="item.dict_value" :hidden="true" type="warning" :max="99" class="list_state_filter_item" v-for="item in sign_state_list" :key="item.dict_value" >
              <el-button size="small" type="text" :class="item.click_val" @click="changeSinState(item.dict_value, item.click_val)">{{ item.dict_value }}({{item.state_count}})</el-button>
            </el-badge>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="12">
        <el-col>
          <el-card shadow="never" class="control">
            <div slot="header" class="clearfix">
              <span class="car_title">合同履行跟踪</span>
            </div>
            <el-badge  :value="item.dict_value" :hidden="true" type="warning" :max="99" class="list_state_filter_item" v-for="item in perform_state_list" :key="item.dict_value" >
              <el-button size="small" type="text" :class="item.click_val" @click="changePerformState(item.dict_value, item.click_val)">{{ item.dict_value }}({{item.state_count}})</el-button>
            </el-badge>
          </el-card>
        </el-col>
      </el-row>

    </div>
    <el-card class="box-card">
      <el-row :gutter="10">
          <el-col :span="3" v-if="filter_department_list">
            <el-select @change='handleFilter' clearable class="filter-item" @blur="clearUser"
                      v-model="listQuery.department" placeholder="选择部门">
              <el-option v-for="item in filter_department_list" :key="item.biz_id" :label="item.department_name"  :value="item.biz_id"></el-option>
            </el-select>&nbsp;
          </el-col>
          <el-col :span="3" v-if="filter_user_list">
            <el-select @change='handleFilter' filterable clearable class="filter-item"
                      v-model="listQuery.sys_user" placeholder="选择员工">
              <el-option v-for="item in filter_user_list" :key="item.biz_id" :label="item.user_name"  :value="item.biz_id"></el-option>
            </el-select>&nbsp;
          </el-col>
          <el-col :span="3" v-if="filter_user_list">
            <el-select @change='handleFilter' filterable clearable class="filter-item"
                      v-model="listQuery.review_state" placeholder="审批流程">
              <el-option v-for="(value, key) in reviewStateList" :key="value" :value="key" :label="value"></el-option>
            </el-select>&nbsp;
          </el-col>
        <el-col :span="3">
          <el-select @change='handleFilter' filterable clearable class="filter-item"
                     v-model="listQuery.is_channel_contract" placeholder="是否渠道合同">
            <el-option value="0" label="否"></el-option>
            <el-option value="1" label="是"></el-option>
          </el-select>&nbsp;
        </el-col>
          <el-col :span="10" style="text-align:right">
            <el-button class="filter-item bg_blue" v-if="can_create" @click="handleCreate">新增+</el-button>
          </el-col>
        </el-row>
      <el-table :data="list" ref="enterprise_table" v-loading="listLoading" border fit highlight-current-row
              :span-method="arraySpanMethod"  style="width: 100%;"  :tree-props="{children: 'contract_item'}">

        <!--<el-table-column align="center" label="合同标题">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.contract_info__title}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" label="合同编码">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__contract_code}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="企业名称">
          <template slot-scope="scope">
            <span>{{scope.row.enterprise__enterprise_name || scope.row.contract_info__sign_company__enterprise_name}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="项目名称">
          <template slot-scope="scope">
            <span>{{scope.row.project_library__project_name}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="签约公司">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__sign_company__enterprise_name}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="签署状态">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__sign_state}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="履行状态">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__perform_state }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="签订人">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__sign_user__user_name}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="创建日期">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__create_time| parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="签订日期">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__sign_date}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="有效期">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__available_year}} 年</span>
          </template>
        </el-table-column>

        <el-table-column label="合同金额" header-align="center">
          <el-table-column prop="name" label="金额(元)" width="80" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.contract_info__contract_price }}</span>
            </template>
          </el-table-column>

          <el-table-column label="比例" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.contract_info__contract_bill}} %</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="已开发票金额(元)">
          <template slot-scope="scope">
            <span>{{scope.row.contract_info__receive_money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="合同应回款" header-align="center">
          <el-table-column prop="name" label="总计" width="80" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.accounts_receivable_total }}</span>
            </template>
          </el-table-column>

          <el-table-column label="国家" width="80" header-align="center">
            <template slot-scope="scope">
              <!--<span v-if="scope.row.subsidy_type === 1">该项目没有明确的补贴标准，详情请查阅相应政策</span>-->
              <!--<span v-else>{{scope.row.accounts_receivable_country}}</span>-->
              <span>{{scope.row.accounts_receivable_country}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="省级" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.accounts_receivable_province}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="市级" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.accounts_receivable_city}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="区/县" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.accounts_receivable_district}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="镇街" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.accounts_receivable_town}}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="合同回款(元)" header-align="center">
          <el-table-column prop="name" label="总计" width="80" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.back_money_total }}</span>
            </template>
          </el-table-column>

          <el-table-column label="国家" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.back_money_country}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="省级" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.back_money_province}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="市级" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.back_money_city}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="区/县" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.back_money_district}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="镇街" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.back_money_town}}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="合同未回款(元)" header-align="center">
          <el-table-column prop="name" label="总计" width="80" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.no_back_money_total }}</span>
            </template>
          </el-table-column>

          <el-table-column label="国家" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.no_back_money_country}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="省级" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.no_back_money_province}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="市级" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.no_back_money_city}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="区/县" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.no_back_money_district}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="镇街" width="80" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.no_back_money_town}}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="260px" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <span class="spanButton col_skyblue" v-if="can_edit"  @click="handleUpdate(scope.row.contract_info__biz_id)">编辑</span>
            <span class="shu">|</span>
            <span class="spanButton col_skyblue" @click="goOrder(scope.row.enterprise__enterprise_name, scope.row.project_library__project_name)">查看订单</span>

            <span class="shu" v-if="scope.row.can_review">|</span>
            <span class="spanButton col_skyblue" @click="approvalCheck(scope.row)" v-if="scope.row.can_review">审批</span>


            <span class="shu">|</span>
            <span class="spanButton col_skyblue" @click="approvalInfo(scope.row.contract_info__biz_id)">审批流程</span>

            <span class="shu">|</span>
            <span class="spanButton col_skyblue" @click="generateContract(scope.row.biz_id)">生成合同</span>

            <span class="shu" v-if="can_delete">|</span>
            <span class="spanButton col_red" v-if="can_delete" @click="handleDel(scope.row.contract_info__biz_id)">删除</span>
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

    <!--审批流程详情弹框-->
    <el-dialog  title="审批流程(按顺序执行，前流程审核未通过，就不会进入下一流程)" :visible.sync="approvalVisiable"  width="70%" v-dialogDrag>
      <el-table :data="approval_list" border style="width: 100%; margin-top: 20px">
        <el-table-column label="是否审核" min-width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.check">已审核</span>
            <span v-else>未审核</span>
          </template>
        </el-table-column>

        <el-table-column label="是否通过" min-width="80" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.check">未审核</span>
            <span v-else-if="scope.row.check && !scope.row.result">不通过</span>
            <span v-else>通过</span>
          </template>
        </el-table-column>

        <el-table-column label="审核部门名称" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.department_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="审核人名称" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.user_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="审核人时间" min-width="130" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.check">未审核</span>
            <span v-else>{{scope.row.time | parseTime('{y}-{m}-{d} {h}:{m}:{s}')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注">
          <template slot-scope="scope">
            <span v-if="!scope.row.check">未审核</span>
            <span v-else>{{scope.row.remarks}}</span>
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>

    <!-- 审核弹框 -->
    <el-dialog v-dialogDrag title="提交审核结果" width="40%" :visible.sync="approvalCheckVisiable">
      <template>
        <el-form :model="reviewForm" label-width="80px">
          <el-form-item label="审核结果">
            <el-radio-group v-model="reviewForm.report_state">
              <el-radio-button label="审核通过"> </el-radio-button>
              <el-radio-button label="审核不通过"> </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核备注">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="reviewForm.remarks">
            </el-input>
          </el-form-item>
        </el-form>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="approvalCheckVisiable=false">取 消</el-button>
        <el-button type="primary" @click="saveReview">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { queryAuth } from '@/utils/auth'
  // import { contractList, contractDelete, getApprovalInfo, saveReview, generateContract } from '@/api/contract'

  export default {
    name: 'complexTable',
    data() {
      return {
        host: process.env.BASE_API,
        count: 1,
        tableKey: 0,
        list: [],
        total: null,
        listLoading: false,
        approvalVisiable: false,
        approvalCheckVisiable: false,
        temp_enterprise_id: undefined,
        import_temp: '',
        fileList: [],
        review_id: '',
        review_user: '',
        reviewForm: {
          report_state: '审核通过',
          remarks: ''
        },
        reviewStateList: { '0': '全部', '1': '已审批', '2': '待审批', '3': '其他' },
        perform_state_list: [],
        sign_state_list: [],
        approval_list: [],
        listQuery: {
          page: 1,
          limit: 10,
          sort: '+id'
        },

        // 用于区分企业用户/后台用户 的企业信息选择
        filter_enterprise_list: [], // 可选的企业
        sign_company_list: [], // 签约公司列表
        is_enterprise_user: true, // 是否企业用户
        // 用于筛选项过滤的数据
        filter_department_list: [], // 筛选项的部门list
        filter_user_list: [], // 筛选项的用户list
        reviewer_user_list: [], // 可更变的关联评估业务员
        // 权限控制
        can_create: queryAuth(this, 'crate', '/contract/contract-mng/list'),
        can_edit: queryAuth(this, 'edit', null),
        can_delete: queryAuth(this, 'delete', null)
      }
    },
    filters: {
    },
    mounted() {
      const route_list = this.$route.path.split('/')
      const is_channel_route = route_list[route_list.length - 1]
      if (is_channel_route === 'channel-contract-list') {
        this.listQuery.is_channel_contract = '1'
      }
      const route_list1 = this.$route.path.split('/')
      const is_channel_route1 = route_list1[route_list1.length - 1]
      if (is_channel_route1 === 'my-customer-list') {
        this.listQuery.customer_contract = '1'
      }
      if (this.$route.query.review_state) { // 审核流程
        this.listQuery.review_state = this.$route.query.review_state
      }
      // 企业名称
      if (this.$route.query.enterprise_name) {
        this.listQuery.enterprise_name = this.$route.query.enterprise_name
      }
      // 项目标题
      if (this.$route.query.title) {
        this.listQuery.title = this.$route.query.title
      }
      // 项目名称
      if (this.$route.query.project_name) {
        this.listQuery.project_name = this.$route.query.project_name
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
    //   /**
    //    * 补贴金额若项目没固定值则提示用户自己看政策
    //    */
    //   arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //     if (row.subsidy_type === 1) {
    //       if (columnIndex === 5) {
    //         return [1, 6]
    //       } else if (columnIndex > 5 && columnIndex < 11) {
    //         return [0, 0]
    //       }
    //     }
    //   },
    //   getList() {
    //     contractList(this.listQuery).then(response => {
    //       this.list = response.data.data
    //       this.list.forEach(item => {
    //         if (item.contract_item.length !== 0) {
    //           item.contract_item.splice(0, 1)
    //           item.contract_item.map(v => { v.id = v.biz_id })
    //         }
    //       })
    //       this.total = response.data.recordsTotal
    //       this.filter_department_list = response.data.filter_department_list
    //       this.filter_user_list = response.data.filter_user_list
    //       this.filter_enterprise_list = response.data.filter_enterprise_list
    //       this.sign_company_list = response.data.sign_company_list
    //       this.perform_state_list = response.data.perform_state_list
    //       this.sign_state_list = response.data.sign_state_list
    //       this.listLoading = false
    //       this.reviewer_user_list = response.data.reviewer_user_list
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
    //   handleCreate() {
    //     this.$router.push({ 'path': '/contract/contract-mng/create' })
    //   },
    //   handleChannelFilter() {
    //     this.listQuery.page = 1
    //   },
    //   clearUser() {
    //     this.listQuery.sys_user = null
    //   },
    //   handleUpdate(id) {
    //     if (this.listQuery.is_channel_contract) {
    //       this.$router.push({ 'path': '/channel-mng/channel-contrat/channel-contract-edit', 'query': { 'id': id }})
    //     } else {
    //       this.$router.push({ 'path': '/contract/contract-mng/edit', 'query': { 'id': id }})
    //     }
    //   },
    //   goOrder(ent_info, project_name) {
    //     this.$router.push({ 'path': '/project/process-mng/list', 'query': { 'ent_info': ent_info, 'project_name': project_name }})
    //   },
    //   handleDel(id) {
    //     this.$confirm('您确定删除吗？').then(_ => {
    //       contractDelete({ id: id }).then(response => {
    //         if (response.data.code === 1) {
    //           this.$message({
    //             message: '操作成功',
    //             type: 'success'
    //           })
    //           this.getList()
    //         }
    //       })
    //     })
    //   },
    //   changeSinState(state_val, click_val) {
    //     if (click_val === 'checked') {
    //       this.listQuery.sign_state = null
    //     } else {
    //       this.listQuery.sign_state = state_val
    //     }
    //     this.getList()
    //   },
    //   changePerformState(state_val, click_val) {
    //     if (click_val === 'checked') {
    //       this.listQuery.perform_state = null
    //     } else {
    //       this.listQuery.perform_state = state_val
    //     }
    //     this.getList()
    //   },
    //   // 审批流程
    //   approvalInfo(id) {
    //     this.approvalVisiable = true
    //     getApprovalInfo({ id: id }).then(response => {
    //       if (response.data.code === 1) {
    //         this.approval_list = response.data.approval_list
    //       }
    //     })
    //   },
    //   // 审批
    //   approvalCheck(data) {
    //     this.approvalCheckVisiable = true
    //     this.review_id = data.contract_info__biz_id
    //     this.review_user = data.review_user
    //   },
    //   saveReview() {
    //     var form = this.reviewForm
    //     var report_state = this.reviewForm.report_state
    //     if (report_state == '审核不通过') {
    //       this.$message({
    //         message: '审核不通过时必须在备注处添加不通过的原因',
    //         type: 'error'
    //       })
    //       return
    //     }
    //     form.id = this.review_id
    //     form.review_user = this.review_user
    //     this.approvalCheckVisiable = false
    //     saveReview(form).then(response => {
    //       this.reviewForm = {
    //         report_state: '审核通过',
    //         remarks: ''
    //       }
    //       if (response.data.code === 1) {
    //         this.$message({
    //           message: '操作成功',
    //           type: 'success'
    //         })
    //         this.getList()
    //       }
    //     })
    //   },
    //   // 生成合同
    //   generateContract(id) {
    //     generateContract({ id: id }).then(response => {
    //       if (response.data.code === 1) {
    //         window.open(this.host + '/enterprise/download-excel-api?url=' + response.data.path + '&name=' + response.data.name, '_blank')
    //       }
    //     })
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
