<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row style="margin-bottom: 20px;">
      <!--搜索-->
      <div>
      </div>

      <el-card class="top-margin-10 padding-0">
        <div>
          <span style="color: #03ADF4; font-weight: bold;">|</span>
          <span style="color: #ABABAB;">搜索到<span style="color:#F9A9A9;">{{total}}</span>条记录</span>
          <a @click="checkAllOrNo" class="padding-5 right-margin-10 blue-border">全选</a>
          <a v-if="can_create" @click="handleCreate" class="padding-5 right-margin-10 blue-border">新增</a>
          <a v-if="can_delete" @click="handleDelete" class="padding-5 right-margin-10 red-border">删除</a>
          <span class="float-right right-margin-10" style="vertical-align:middle;margin-top: -10px;">
            <el-select v-if="order_type_list && order_type_list.length>0" @change='handleFilter' clearable v-model="listQuery.order_type" placeholder="默认排序">
              <el-option v-for="item in order_type_list" :key="item.key" :label="item.val" :value="item.key"></el-option>
            </el-select>
          </span>
        </div>
        <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 20px;"></div>

        <div class="top-margin-10" style="padding-bottom: 20px; border-bottom: 2px solid #F1F0F2; overflow:hidden;" v-for="(item, index) in list">
          <!--内容div-->
          <div class="float-left overflow-x content-font overflow-y" style="width: 90%;">
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="4">
                <input type="checkbox" name="check_biz_ids" :value="item.biz_id" v-model="check_biz_ids"/>
                <div style="display: inline-block" class="project_badge">{{index+1}}</div>
                官方平台名称:{{item.official_name}}
              </el-col>
              <el-col :span="4">
                官方平台网址:{{item.official_url}}
              </el-col>
              <el-col :span="4">
                账号:{{item.admin_account}}
              </el-col>
              <el-col :span="3">
                密码:{{item.admin_password}}
              </el-col>
              <el-col :span="3">
                账号角色:{{item.admin_job}}
              </el-col>
              <el-col :span="3">
                其它(备注):{{item.remarks}}
              </el-col>
            </el-row>
          </div>

          <!--操作div-->
          <div class="float-right right-margin-10 text-align-center overflow-x overflow-y" style="width: 100px;">
            <div class="top-margin-10" style="margin-bottom: 2px;">
              <span v-if="can_edit" class="blue-border" @click="handleUpdate(item)">编辑</span>
            </div>
          </div>
        </div>

        <!--加载更多-->
        <div class="padding-0" style="margin-top: 20px;">
          <div style="text-align: center; height: 40px; line-height: 30px;" @click="loadMore">{{list.length >= total ? '没有更多' : '加载更多'}}</div>
        </div>
      </el-card>
    </el-row>
    <!--弹窗-->
    <el-dialog title="申报账号"  :visible.sync="dialogVisible" width="50%" append-to-body v-dialogDrag>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm"
               style="margin-bottom: 70px">
        <el-form-item label="企业名称" prop="enterprise" style="display: inline-block" v-if="!id">
          <el-select v-model="ruleForm.enterprise" filterable placeholder="请选择" style="width: 300px" ref="enterprise">
            <el-option
              v-for="item in ent_list"
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
          <el-input type="textarea" :row="1" style="width: 300px" v-model="ruleForm.official_url" ref="official_url"></el-input>
        </el-form-item>

        <el-form-item label="账号" prop="admin_account" style="display: inline-block">
          <el-input style="width: 300px" v-model="ruleForm.admin_account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="admin_password" style="display: inline-block">
          <el-input style="width: 300px" v-model="ruleForm.admin_password"></el-input>
        </el-form-item>

        <el-form-item label="账号角色" prop="apply_account" style="display: inline-block">
          <el-input style="width: 300px" v-model="ruleForm.admin_job"></el-input>
        </el-form-item>

        <el-form-item label="其它(备注)" prop="project_name" style="display: inline-block">
          <el-input type="textarea" :row="1" style="width: 300px" v-model="ruleForm.remarks"></el-input>
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
  // import { getAccount, delAccount, saveAccount } from '@/api/project'
  // import { getProvince, getCity, getDistrict, getTown } from '@/api/area'
  // import qs from 'qs'
  import { queryAuth } from '@/utils/auth'

  var initListQuery = {
    page: 1,
    limit: 20
  }
  export default {
    name: 'apply_account_list',
    components: {},
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        search_keyword: null,
        search_type: 'policy',
        hot_search_keyword_list: ['wtf', 'wtf'],
        search_placeholder_list: {},
        search_placeholder: '',
        more_condition: false,
        host: process.env.BASE_API,
        list: [],
        total: 0,
        count: 0,
        listQuery: JSON.parse(JSON.stringify(initListQuery)),
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        isCheckDeleteRecord: false, // 是否查看已删除记录
        isCheckAll: false, // 是否已经全选
        check_biz_ids: [], // 勾选行的biz_id
        select_filter_list: [], // 已选条件
        ent_list: [], // 企业列表
        order_type_list: [], // 排序
        // 弹窗
        dialogVisible: false,
        ruleForm: {},
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
        can_create: queryAuth(this, 'create', '/project/account-mng'),
        can_delete: queryAuth(this, 'delete', '/project/account-mng'),
        can_edit: queryAuth(this, 'edit', '/project/account-mng')
      }
    },
    filters: {},
    mounted() {
      // 企业筛选biz_id
      if (this.$route.query.ent_biz_id) {
        this.id = this.$route.query.ent_biz_id
      }
      this.getListFilter()
      this.getList()
    },
    methods: {
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
      },
      // 开始搜索
      goSearch() {
      },
      // 筛选更多条件
      getMoreCondition() {
        this.more_condition = !this.more_condition
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        var list_query = JSON.parse(JSON.stringify(this.listQuery))
        list_query.ent_biz_id = this.id
        // getAccount(list_query).then(res => {
        //   this.list = res.data.data
        //   this.total = res.data.recordsTotal
        //   this.ent_list = res.data.enterprise_info
        //   this.select_filter_list = res.data.select_filter_list
        // })
      },
      getProvinces() {
        // getProvince({}).then(response => {
        //   this.province_list = response.data.provinces
        // })
      },
      areaSetNull(level) {
        if (level === 3) {
          this.listQuery.city_id = ''
          this.citys = []
        }
        if (level >= 2) {
          this.listQuery.district_id = ''
          this.districts = []
        }
        if (level >= 1) {
          this.listQuery.town_id = ''
          this.towns = []
        }
      },
      changeProvince() {
        this.listQuery.page = 1
        this.areaSetNull(3)
        this.getCitys()
        this.getList()
      },
      getCitys() {
        // getCity({ 'provinceId': this.listQuery.province_id }).then(response => {
        //   this.city_list = response.data.cities
        // })
      },
      changeCity() {
        this.listQuery.page = 1
        this.areaSetNull(2)
        this.getDistricts()
        this.getList()
      },
      getDistricts() {
        // getDistrict({ 'cityId': this.listQuery.city_id }).then(response => {
        //   this.district_list = response.data.districts
        // })
      },
      changeDistrict() {
        this.listQuery.page = 1
        this.areaSetNull(1)
        this.getTowns()
        this.getList()
      },
      changeTown() {
        this.listQuery.page = 1
        this.getList()
      },
      getTowns() {
        // getTown({ 'districtId': this.listQuery.district_id }).then(response => {
        //   this.town_list = response.data.town
        // })
      },
      // 清空已选条件
      clearAllSelect() {
        this.listQuery = JSON.parse(JSON.stringify(initListQuery))
        this.getList()
      },
      // 删除当前已选条件
      clearThisSelect(item) {
        if (item.key in this.listQuery) {
          var cur_list = this.listQuery[item.key]
          if (cur_list instanceof Array && cur_list.indexOf(item.val) !== -1) {
            cur_list.splice(cur_list.indexOf(item.val), 1)
          } else {
            delete this.listQuery[item.key]
          }
        }
        this.getList()
      },
      // 全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.list.forEach(function(item, index) {
            if (_this.check_biz_ids.indexOf(item.biz_id) === -1) {
              _this.check_biz_ids.push(item.biz_id)
            }
            _this.isCheckAll = true
          })
        }
      },
      // 筛选参数
      getListFilter() {
      },
      // 点击加载更多
      loadMore() {
        this.listQuery.page += 1
        this.listLoading = true
        if (this.list.length < this.total) {
          // getAccount(this.listQuery).then(res => {
          //   this.list = this.list.concat(res.data.data)
          // })
        }
      },
      // 处理删除
      handleDelete() {
        if (this.check_biz_ids.length <= 0) {
          this.$message.error('请勾选删除的行!')
          return false
        }
        this.$confirm('您确定删除吗？').then(_ => {
          // delAccount({ ids: this.check_biz_ids }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message.success(res.data.message ? res.data.message : '删除成功！')
          //     this.check_biz_ids = []
          //     this.getList()
          //   }
          // })
        })
      },
      // 查看已经删除记录
      checkDeleteRecord() {
        this.listQuery.is_delete = !this.listQuery.is_delete
        this.getList()
      },
      // 新增
      handleCreate(data) {
        this.ruleForm = {}
        this.dialogVisible = true
        if (this.id) {
          this.ruleForm.ent_biz_id = this.id
        }
      },
      // 查看
      handleCheck(data) {},
      // 编辑
      handleUpdate(data) {
        this.dialogVisible = true
        this.ruleForm = data
        if (this.id) {
          this.ruleForm.ent_biz_id = this.id
        }
      },
      // 提交
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
      // 重定向
      handleRedirect(redirect_url) {
        if (!redirect_url) {
          redirect_url = '/ipr/patent_info/edit'
        }
        const routeUrl = this.$router.resolve({ path: redirect_url })
        window.open(routeUrl.href, '_blank')
      },
      // 搜索tab切换
      handleTabChange() {
        this.search_placeholder = this.search_placeholder_list[this.search_type]
        this.handleFilter()
      },
      // 导出
      handleExport() {
        var list_query = JSON.parse(JSON.stringify(this.listQuery))
        list_query.is_export = true
        list_query.check_biz_ids = this.check_biz_ids
        if (this.id) {
          list_query.ent_biz_id = this.id
        }
        // getAccount(list_query).then(res => {
        //   if (res.data.code === 1) {
        //     window.open(res.data.oss_object_url)
        //   }
        // })
      }
    }
  }
</script>

<style lang="less" scoped>
  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
  }

  .content-font {
    font-size: 14px;
    font-weight: 400;
  }

  .text-align-center {
    text-align: center;
  }

  .overflow-x {
    overflow-x: hidden;
  }

  .overflow-y {
    overflow-y: hidden;
  }

  .display_inline {
    display: inline;
  }

  .margin-0 {
    margin: 0px;
  }

  .all-width {
    width: 100%;
  }

  .width-50 {
    width: 50px;
  }

  .width-100 {
    width: 100px;
  }

  .width-200 {
    width: 200px;
  }

  .width-300 {
    width: 300px;
  }

  .width-400 {
    width: 400px;
  }

  .width-500 {
    width: 500px;
  }

  .width-600 {
    width: 600px;
  }

  .width-700 {
    width: 700px;
  }

  .width-800 {
    width: 800px;
  }

  .bottom-margin-2 {
    margin-bottom: 2px;
  }

  .bottom-margin-4 {
    margin-bottom: 4px;
  }

  .bottom-margin-5 {
    margin-bottom: 5px;
  }

  .top-margin-10 {
    margin-top: 10px;
  }

  .left-margin-10 {
    margin-left: 10px;
  }

  .right-margin-10 {
    margin-right: 10px;
  }

  .right-margin-20 {
    margin-right: 20px;
  }

  .right-margin-30 {
    margin-right: 30px;
  }

  .padding-0 {
    padding: 0;
  }

  .padding-10 {
    padding: 10px;
  }

  .hot-search {
    width: 48px;
    height: 17px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 17px;
    color: rgba(4, 43, 64, 1);
    opacity: 1;
  }

  .hot-search-kw {
    margin: auto 10px;
    width: 24px;
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: rgba(151, 151, 151, 1);
    opacity: 1;
  }

  .center-items {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 5%;
  }

  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }

  .padding-vertical-5 {
    padding: 5px 0;
  }

  .padding-5 {
    padding: 5px;
  }

  .padding-vertical-10 {
    padding: 10px 0;
  }

  .padding-level-10 {
    padding: 0 10px;
  }

  .search_input {
    width: 600px;
    height: 48px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(5, 170, 255, 0.7294117647058823);
    opacity: 1;
  }

  .bg_blue {
    background: #05AAFF;
    color: #fff;
    &:hover {
      background: #05AAFF;
      opacity: 0.5;
    }
  }

  .bt_blue {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  .bt_purple {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  .bt_font {
    width: 96px;
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }

  .type_bg {
    width: 84px;
    height: 84px;
    background: rgba(145, 229, 161, 1);
    border-radius: 10px;
    opacity: 1;
  }

  .type_font {
    width: 36px;
    height: 50px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 50px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }

  .policy_notice_name {
    height: 24px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 24px;
    color: rgba(68, 68, 68, 1);
    opacity: 1;
  }

  .normal_name {
    width: 70px;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(68, 68, 68, 0.75);
    opacity: 1;
  }

  .red_name {
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(245, 108, 108, 1);
    opacity: 1;
  }

  .can_click {
    width: 42px;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgb(5, 170, 255);
    opacity: 1;
  }

  .project_bg {
    border-radius: 5px;
    padding: 1px 10px;
    width: 100%;
    background: rgba(239, 250, 255, 1);
    opacity: 1;
  }

  .project_badge {
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: rgba(145, 229, 161, 1);
    color: #ffffff;
    border-radius: 50%;
    opacity: 1;
  }

  .edit_bt {
    width: 70px;
    height: 30px;
    background: #ffffff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    border: 1px solid #33B3EE;
    color: #33B3EE;
    opacity: 1;
  }

  .send_sms_bt {
    width: 70px;
    height: 30px;
    background: #ffffff;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    border: 1px solid #FFCBA6;
    color: #FFCBA6;
    opacity: 1;
  }

  .red-border {
    border: 1px solid #ff0000;
    color: #ff0000;
  }

  .blue-border {
    border: 1px solid #33B3EE;
    color: #33B3EE;
  }

  .orange-border {
    border: 1px solid #FFCBA6;
    color: #FFCBA6;
  }

  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 15px;
    position: relative;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9
  }

  input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #05AAFF;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 1px solid #05AAFF;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
  }
</style>
